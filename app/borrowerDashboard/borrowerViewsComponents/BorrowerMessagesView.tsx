"use client";

import { useState, useRef, useEffect } from "react";
import { useSite } from "@/app/components/layout/SiteShell";
import { api, toList, ApiError } from "@/app/lib/apiFetch";
import { API_ROUTES } from "@/app/lib/endpoints";
import { fetchLatestMessages } from "@/app/lib/messages";
import { MESSAGES_READ_EVENT } from "@/app/lib/useUnreadMessages";
import type { Message, MessageThread } from "@/app/types/api";

const POLL_MS = 8000;
const initials = (name: string) => name.split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();

export default function BorrowerMessagesView() {
  const { t } = useSite();
  const m = t.messaging;

  const [threads, setThreads] = useState<MessageThread[] | null>(null);
  const [threadsError, setThreadsError] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [sendError, setSendError] = useState("");
  const [notAllowed, setNotAllowed] = useState(false);
  const [text, setText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // ponytail: polling cada POLL_MS en vez de push (SSE/WebSocket) hasta que el back lo ofrezca.
  useEffect(() => {
    const load = () =>
      api(API_ROUTES.borrowers.meMessageThreads)
        .then((d) => {
          const list = toList<MessageThread>(d);
          setThreads(list);
          setSelectedId((cur) => cur ?? list[0]?.lenderCompany?.id ?? null);
          setThreadsError("");
        })
        .catch((e) => setThreadsError(e instanceof Error ? e.message : "Error"));
    load();
    const tick = () => !document.hidden && load();
    const id = setInterval(tick, POLL_MS);
    document.addEventListener("visibilitychange", tick); // al volver a la pestana, refresca ya
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", tick);
    };
  }, []);

  // Abrir hilo: historial + marcar leido.
  useEffect(() => {
    if (!selectedId) return;
    setMessages([]);
    setSendError("");
    setNotAllowed(false);
    let lastId = ""; // solo re-render y re-marca leido si llego/salio un mensaje nuevo
    const load = () =>
      fetchLatestMessages(API_ROUTES.borrowers.meMessageThread(selectedId))
        .then(async (list) => {
          const newest = list[list.length - 1]?.id ?? "";
          if (newest === lastId) return;
          lastId = newest;
          setMessages(list);
          await api(API_ROUTES.borrowers.meMessageThreadRead(selectedId), { method: "POST" });
          window.dispatchEvent(new Event(MESSAGES_READ_EVENT));
          setThreads((ts) => ts && ts.map((th) => (th.lenderCompany?.id === selectedId ? { ...th, unreadCount: 0 } : th)));
        })
        .catch((e) => setSendError(e instanceof Error ? e.message : "Error"));
    load();
    const tick = () => !document.hidden && load();
    const id = setInterval(tick, POLL_MS);
    document.addEventListener("visibilitychange", tick); // al volver a la pestana, refresca ya
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", tick);
    };
  }, [selectedId]);

  // Scroll automatico hacia abajo
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    const body = text.trim();
    if (!body || !selectedId) return;

    // Validacion de informacion de contacto (telefonos o correos)
    if (/(\d[\s\-\.]?){7,}/.test(body) || /\S+@\S+\.\S+/.test(body)) {
      setSendError(m.blockedMsg);
      return;
    }

    setSendError("");
    try {
      const msg = await api<Message>(API_ROUTES.borrowers.meMessages, {
        method: "POST",
        body: JSON.stringify({ lenderCompanyId: selectedId, body }),
      });
      setMessages((prev) => [...prev, msg]);
      setText("");
    } catch (e) {
      if (e instanceof ApiError && e.code === "MESSAGING_NOT_ALLOWED") setNotAllowed(true);
      else setSendError(e instanceof Error ? e.message : "Error");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const current = threads?.find((th) => th.lenderCompany?.id === selectedId);
  const lenderName = current?.lenderCompany?.companyName ?? "";

  return (
    <div className="animate-in fade-in duration-300">
      <div className="mb-[16px] text-[20px] font-[800] tracking-[-0.3px] text-ink">
        {m.title}
      </div>

      <div className="flex h-[calc(100vh-160px)] overflow-hidden rounded-[10px] border border-rule bg-surface shadow-sm">
        
        {/* SIDEBAR DE CONVERSACIONES */}
        <div className="hidden w-[300px] shrink-0 flex-col border-r border-rule bg-surface md:flex">
          <div className="border-b border-rule p-[16px_20px] text-[13px] font-[700] text-ink">
            {m.dealThreads}
          </div>
          <div className="flex-1 overflow-y-auto">
            {threadsError && <div className="p-[14px_20px] text-[12px] text-crit">{threadsError}</div>}
            {threads?.length === 0 && <div className="p-[14px_20px] text-[12px] text-ink-3">{m.noThreads}</div>}
            {threads?.map((th) => {
              const id = th.lenderCompany?.id ?? th.lastMessage.lenderCompanyId;
              const active = id === selectedId;
              return (
                <div
                  key={id}
                  onClick={() => setSelectedId(id)}
                  className={`cursor-pointer border-b border-rule border-l-[3px] p-[14px_20px] transition-colors hover:bg-surface-2 ${active ? "bg-accent-soft border-l-accent" : "border-l-transparent"}`}
                >
                  <div className="mb-[4px] flex items-center justify-between">
                    <div className="mb-[2px] text-[13px] font-[700] text-ink">{th.lenderCompany?.companyName ?? id}</div>
                    <div className="text-[11px] text-ink-3">{new Date(th.lastMessage.createdAt).toLocaleDateString()}</div>
                  </div>
                  <div className="flex items-center justify-between gap-[8px]">
                    <div className="overflow-hidden text-ellipsis whitespace-nowrap text-[12px] text-ink-3">{th.lastMessage.body}</div>
                    {th.unreadCount > 0 && <div className="h-[8px] w-[8px] shrink-0 rounded-full bg-accent"></div>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AREA DE CHAT */}
        <div className="flex flex-1 flex-col overflow-hidden bg-bg">
          
          {/* HEADER CHAT */}
          <div className="flex items-center justify-between border-b border-rule bg-surface p-[16px_24px]">
            <div className="flex flex-col">
              <div className="text-[15px] font-[800] text-ink">{lenderName}</div>
            </div>
            <span className="hidden rounded-[12px] bg-accent-soft p-[3px_10px] text-[11px] font-[700] text-accent sm:inline-block">
              {m.activeThread}
            </span>
          </div>

          {/* MENSAJES */}
          <div className="flex flex-1 flex-col gap-[16px] overflow-y-auto p-[24px]">
            {messages.map((msg) => {
              const isMe = msg.senderRole === "BORROWER";
              return (
                <div key={msg.id} className={`flex items-end gap-[10px] ${isMe ? "flex-row-reverse" : ""}`}>
                  <div className={`flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full text-[12px] font-[700] text-white ${isMe ? "bg-accent" : "bg-brand-dark"}`}>
                    {isMe ? "ME" : initials(lenderName)}
                  </div>
                  <div className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                    <div className={`max-w-[420px] whitespace-pre-wrap rounded-[12px] p-[12px_16px] text-[13px] leading-[1.6] ${isMe ? "bg-accent text-white" : "bg-surface-2 text-ink"}`}>
                      {msg.body}
                    </div>
                    <div className={`mt-[4px] px-[4px] text-[11px] text-ink-3 ${isMe ? "text-right" : ""}`}>
                      {new Date(msg.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* AREA DE INPUT */}
          <div className="flex flex-col gap-[10px] border-t border-rule bg-surface p-[16px_24px]">
            {notAllowed ? (
              <div className="rounded-[8px] bg-surface-2 p-[12px_16px] text-[13px] text-ink-3">{m.notAllowed}</div>
            ) : (
            <>
            <div className="flex items-end gap-[10px]">
              <textarea 
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={m.inputPlaceholder}
                className="max-h-[120px] min-h-[44px] flex-1 resize-none rounded-[8px] border-[1.5px] border-rule bg-bg p-[10px_14px] font-sans text-[14px] text-ink outline-none transition-colors focus:border-accent" 
                rows={1}
              />
              <button 
                onClick={handleSend}
                className="h-[44px] shrink-0 cursor-pointer rounded-[8px] border-none bg-accent p-[10px_18px] text-[13px] font-[700] text-accent-ink transition-colors hover:bg-blue-700"
              >
                {m.send}
              </button>
            </div>
            </>
            )}
            {sendError && <div className="text-[12px] text-crit">{sendError}</div>}
            <div className="flex items-center gap-[6px] text-[11px] text-ink-3">
              <span className="font-[600] text-crit">⚠️</span>
              <span>{m.warningNote}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}