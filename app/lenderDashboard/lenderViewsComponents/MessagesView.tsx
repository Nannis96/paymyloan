"use client";
import { useState, useRef, useEffect } from "react";
import { useSite } from "@/app/components/layout/SiteShell";
import { api, toList, ApiError } from "@/app/lib/apiFetch";
import { API_ROUTES } from "@/app/lib/endpoints";
import type { Message, MessageThread } from "@/app/types/api";

const initials = (name: string) => name.split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
// Un hilo es (borrower, empresa del lender): un lender con varias empresas tiene varios.
const threadKey = (th: MessageThread) =>
  `${th.borrowerProfile?.id ?? th.lastMessage.borrowerProfileId}:${th.lastMessage.lenderCompanyId}`;

export default function MessagesView() {
  const { t } = useSite();
  const m = t.messaging;
  
  const [threads, setThreads] = useState<MessageThread[] | null>(null);
  const [threadsError, setThreadsError] = useState("");
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [sendError, setSendError] = useState("");
  const [notAllowed, setNotAllowed] = useState(false);
  const [text, setText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const current = threads?.find((th) => threadKey(th) === selectedKey);
  const borrowerId = current?.borrowerProfile?.id ?? current?.lastMessage.borrowerProfileId;
  const lenderCompanyId = current?.lastMessage.lenderCompanyId;
  const borrowerName = current?.borrowerProfile?.user?.name ?? "";

  useEffect(() => {
    api(API_ROUTES.lenders.meMessageThreads)
      .then((d) => {
        const list = toList<MessageThread>(d);
        setThreads(list);
        setSelectedKey((cur) => cur ?? (list[0] ? threadKey(list[0]) : null));
      })
      .catch((e) => setThreadsError(e instanceof Error ? e.message : "Error"));
  }, []);

  // Abrir hilo: historial + marcar leido. lenderCompanyId siempre explicito (el back lo exige con >1 empresa).
  // ponytail: solo la primera pagina del historial; paginar si los hilos crecen.
  useEffect(() => {
    if (!borrowerId || !lenderCompanyId) return;
    const qs = `?lenderCompanyId=${encodeURIComponent(lenderCompanyId)}`;
    setMessages([]);
    setSendError("");
    setNotAllowed(false);
    api(API_ROUTES.lenders.meMessageThread(borrowerId) + qs)
      .then(async (d) => {
        setMessages(toList<Message>(d));
        await api(API_ROUTES.lenders.meMessageThreadRead(borrowerId) + qs, { method: "POST" });
        setThreads((ts) => ts && ts.map((th) => (threadKey(th) === selectedKey ? { ...th, unreadCount: 0 } : th)));
      })
      .catch((e) => setSendError(e instanceof Error ? e.message : "Error"));
  }, [borrowerId, lenderCompanyId, selectedKey]);

  // Scroll automatico hacia abajo
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    const body = text.trim();
    if (!body || !borrowerId || !lenderCompanyId) return;

    // Validacion de info de contacto
    if (/(\d[\s\-\.]?){7,}/.test(body) || /\S+@\S+\.\S+/.test(body)) {
      setSendError(m.blockedMsg);
      return;
    }

    setSendError("");
    try {
      const msg = await api<Message>(API_ROUTES.lenders.meMessages, {
        method: "POST",
        body: JSON.stringify({ borrowerProfileId: borrowerId, lenderCompanyId, body }),
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

  return (
    <div className="animate-in fade-in duration-300">
      <div className="mb-[16px] text-[20px] font-[800] tracking-[-0.3px] text-[#0a2540]">
        {m.title}
      </div>

      <div className="flex h-[calc(100vh-160px)] overflow-hidden rounded-[10px] border border-[#e6ebf1] bg-white">
        
        {/* SIDEBAR DE CONVERSACIONES */}
        <div className="flex w-[300px] shrink-0 flex-col border-r border-[#e6ebf1] bg-white hidden md:flex">
          <div className="border-b border-[#e6ebf1] p-[16px_20px] text-[13px] font-[700] text-[#0a2540]">
            {m.dealThreads}
          </div>
          <div className="flex-1 overflow-y-auto">
            {threadsError && <div className="p-[14px_20px] text-[12px] text-[#df1b41]">{threadsError}</div>}
            {threads?.length === 0 && <div className="p-[14px_20px] text-[12px] text-[#8898aa]">{m.noThreads}</div>}
            {threads?.map((th) => {
              const id = th.borrowerProfile?.id ?? th.lastMessage.borrowerProfileId;
              const active = threadKey(th) === selectedKey;
              return (
                <div
                  key={threadKey(th)}
                  onClick={() => setSelectedKey(threadKey(th))}
                  className={`cursor-pointer border-b border-[#f0f4f8] border-l-[3px] p-[14px_20px] transition-colors hover:bg-[#f8f9ff] ${active ? "bg-[#f0efff] border-l-[#635bff]" : "border-l-transparent"}`}
                >
                  <div className="mb-[4px] flex items-center justify-between">
                    <div className="mb-[2px] text-[13px] font-[700] text-[#0a2540]">{th.borrowerProfile?.user?.name ?? id}</div>
                    <div className="text-[11px] text-[#aab7c4]">{new Date(th.lastMessage.createdAt).toLocaleDateString()}</div>
                  </div>
                  <div className="flex items-center justify-between gap-[8px]">
                    <div className="overflow-hidden text-ellipsis whitespace-nowrap text-[12px] text-[#8898aa]">{th.lastMessage.body}</div>
                    {th.unreadCount > 0 && <div className="h-[8px] w-[8px] shrink-0 rounded-full bg-[#635bff]"></div>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AREA DE CHAT */}
        <div className="flex flex-1 flex-col overflow-hidden">
          
          <div className="flex items-center justify-between border-b border-[#e6ebf1] bg-white p-[16px_24px]">
            <div className="flex flex-col">
              <div className="text-[15px] font-[800] text-[#0a2540]">{borrowerName}</div>
            </div>
            <span className="rounded-[12px] bg-[#f0efff] p-[3px_10px] text-[11px] font-[700] text-[#635bff] hidden sm:inline-block">
              {m.activeThread}
            </span>
          </div>

          <div className="flex flex-1 flex-col gap-[16px] overflow-y-auto p-[24px]">
            {messages.map((msg) => {
              const isMe = msg.senderRole === "LENDER";
              return (
                <div key={msg.id} className={`flex items-end gap-[10px] ${isMe ? "flex-row-reverse" : ""}`}>
                  <div className={`flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full text-[12px] font-[700] text-white ${isMe ? "bg-[#635bff]" : "bg-[#0a2540]"}`}>
                    {isMe ? "ME" : initials(borrowerName)}
                  </div>
                  <div className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                    <div className={`max-w-[420px] whitespace-pre-wrap rounded-[12px] p-[12px_16px] text-[13px] leading-[1.6] ${isMe ? "bg-[#635bff] text-white" : "bg-[#f0f4f8] text-[#0a2540]"}`}>
                      {msg.body}
                    </div>
                    <div className={`mt-[4px] px-[4px] text-[11px] text-[#aab7c4] ${isMe ? "text-right" : ""}`}>
                      {new Date(msg.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* ÁREA DE INPUT */}
          <div className="flex flex-col gap-[10px] border-t border-[#e6ebf1] bg-white p-[16px_24px]">
            {notAllowed ? (
              <div className="rounded-[8px] bg-[#f0f4f8] p-[12px_16px] text-[13px] text-[#8898aa]">{m.notAllowed}</div>
            ) : (
            <>
            <div className="flex items-end gap-[10px]">
              <textarea 
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={m.inputPlaceholder}
                className="min-h-[44px] max-h-[120px] flex-1 resize-none rounded-[8px] border-[1.5px] border-[#e6ebf1] p-[10px_14px] font-sans text-[14px] outline-none transition-colors focus:border-[#635bff]" 
                rows={1}
              />
              <button 
                onClick={handleSend}
                className="h-[44px] shrink-0 cursor-pointer rounded-[8px] border-none bg-[#635bff] p-[10px_18px] text-[13px] font-[700] text-white hover:bg-[#524ddb] transition-colors"
              >
                {m.send}
              </button>
            </div>
            </>
            )}
            {sendError && <div className="text-[12px] text-[#df1b41]">{sendError}</div>}
            <div className="flex items-center gap-[6px] text-[11px] text-[#aab7c4]">
              <span className="font-[600] text-[#c62626]">⚠️</span>
              <span>{m.warningNote}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}