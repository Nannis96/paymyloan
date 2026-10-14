"use client";

import { useState, useRef, useEffect } from "react";
import { useSite } from "@/app/components/layout/SiteShell";

export default function BorrowerMessagesView() {
  const { t } = useSite();
  const m = t.messaging;

  const [threads, setThreads] = useState<any[]>([]);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [activeThreadName, setActiveThreadName] = useState<string>("Chat");
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll automatico hacia abajo
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Cargar usuario y luego hilos de conversacion
  useEffect(() => {
    const fetchUserAndThreads = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      try {
        // Obtener usuario actual para identificar mensajes propios
        const userRes = await fetch("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const userJson = await userRes.json();
        if (userJson.success && userJson.data.user) {
          setCurrentUserId(userJson.data.user.id);
        }

        // Obtener hilos
        fetchThreads(token);
      } catch (e) {
        console.error("Error inicializando mensajeria:", e);
      }
    };
    fetchUserAndThreads();
  }, []);

  const fetchThreads = async (token: string) => {
    try {
      const res = await fetch("/api/borrowers/me/messages/threads", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const json = await res.json();
      if (json.success) {
        setThreads(json.data || []);
      }
    } catch (error) {
      console.error("Error obteniendo hilos:", error);
    }
  };

  const fetchMessages = async (lenderCompanyId: string, companyName: string) => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    setActiveThreadId(lenderCompanyId);
    setActiveThreadName(companyName);

    try {
      const res = await fetch(`/api/borrowers/me/messages/threads/${lenderCompanyId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const json = await res.json();
      if (json.success && json.data.items) {
        setMessages(json.data.items);
        markAsRead(lenderCompanyId, token);
      }
    } catch (error) {
      console.error("Error obteniendo mensajes:", error);
    }
  };

  const markAsRead = async (lenderCompanyId: string, token: string) => {
    try {
      await fetch(`/api/borrowers/me/messages/threads/${lenderCompanyId}/read`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      });
      // Actualizar contador local
      setThreads(prev => 
        prev.map(th => 
          th.lenderCompany?.id === lenderCompanyId ? { ...th, unreadCount: 0 } : th
        )
      );
    } catch (error) {
      console.error("Error marcando como leido:", error);
    }
  };

  const handleSend = async () => {
    if (!text.trim() || !activeThreadId) return;

    // Filtro local para informacion de contacto
    const phonePattern = /(\d[\s\-\.]?){7,}/;
    const emailPattern = /\S+@\S+\.\S+/;
    
    if (phonePattern.test(text) || emailPattern.test(text)) {
      setMessages(prev => [
        ...prev, 
        { id: Date.now(), isWarning: true, body: m.blockedMsg, createdAt: new Date().toISOString(), type: "sys" }
      ]);
      setText("");
      return;
    }

    const token = localStorage.getItem("accessToken");
    if (!token) return;

    const payload = { lenderCompanyId: activeThreadId, body: text.trim() };
    setText(""); // Limpiar rapido para UI responsiva

    try {
      const res = await fetch("/api/borrowers/me/messages", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (json.success) {
        setMessages(prev => [...prev, json.data]);
        fetchThreads(token); // Actualizar lastMessage en la barra lateral
      }
    } catch (error) {
      console.error("Error enviando mensaje:", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Mantenemos la logica visual de archivos (API actual solo soporta body string)
  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const isImage = file.type.startsWith("image/");
      const url = URL.createObjectURL(file);
      
      setMessages(prev => [...prev, {
        id: Date.now(),
        senderUserId: currentUserId,
        body: `[Archivo adjunto: ${file.name}]`,
        createdAt: new Date().toISOString(),
        attachmentName: file.name,
        isImage,
        attachmentUrl: url
      }]);
      
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    if (date.toDateString() === today.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

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
            {threads.length === 0 && (
              <div className="p-[20px] text-center text-[12px] text-ink-3">
                No hay conversaciones activas
              </div>
            )}
            {threads.map((th) => {
              const isActive = activeThreadId === th.lenderCompany?.id;
              return (
                <div 
                  key={th.lenderCompany?.id}
                  onClick={() => fetchMessages(th.lenderCompany?.id, th.lenderCompany?.companyName)}
                  className={`cursor-pointer border-b border-rule p-[14px_20px] transition-colors hover:bg-surface-2 border-l-[3px] ${
                    isActive ? "bg-accent-soft border-l-accent" : "border-l-transparent"
                  }`}
                >
                  <div className="mb-[4px] flex items-center justify-between">
                    <div className="text-[13px] font-[700] text-ink mb-[2px]">
                      {th.lenderCompany?.companyName || "Lender"}
                    </div>
                    <div className="text-[11px] text-ink-3">
                      {th.lastMessage ? formatTime(th.lastMessage.createdAt) : ""}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className={`text-[12px] overflow-hidden text-ellipsis whitespace-nowrap ${th.unreadCount > 0 ? "font-[700] text-ink" : "text-ink-3"}`}>
                      {th.lastMessage?.body || "Conversacion iniciada"}
                    </div>
                    {th.unreadCount > 0 && (
                      <div className="h-[8px] w-[8px] shrink-0 rounded-full bg-accent"></div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AREA DE CHAT */}
        <div className="flex flex-1 flex-col overflow-hidden bg-bg">
          {!activeThreadId ? (
            <div className="flex flex-1 items-center justify-center text-[13px] text-ink-3">
              Selecciona una conversacion para ver los mensajes.
            </div>
          ) : (
            <>
              {/* HEADER CHAT */}
              <div className="flex items-center justify-between border-b border-rule bg-surface p-[16px_24px]">
                <div className="flex flex-col">
                  <div className="text-[15px] font-[800] text-ink">{activeThreadName}</div>
                  <div className="mt-[2px] text-[12px] text-ink-3">Conectado via Marketplace</div>
                </div>
                <span className="hidden rounded-[12px] bg-accent-soft p-[3px_10px] text-[11px] font-[700] text-accent sm:inline-block">
                  {m.activeThread}
                </span>
              </div>

              {/* MENSAJES */}
              <div className="flex flex-1 flex-col gap-[16px] overflow-y-auto p-[24px]">
                {messages.length === 0 && (
                  <div className="text-center text-[12px] text-ink-3 mt-[20px]">
                    No hay mensajes en este hilo todavia.
                  </div>
                )}
                {messages.map((msg) => {
                  if (msg.type === "sys" || msg.isWarning) {
                    return (
                      <div key={msg.id} className="text-center">
                        <div className={`inline-block rounded-[20px] p-[6px_16px] text-[12px] font-[500] ${msg.isWarning ? "bg-amber-soft text-amber border border-amber/20" : "bg-surface-2 text-ink-3"}`}>
                          {msg.body}
                        </div>
                      </div>
                    );
                  }

                  const isMe = msg.senderUserId === currentUserId;
                  const avatar = isMe ? "ME" : activeThreadName.substring(0, 2).toUpperCase();
                  
                  return (
                    <div key={msg.id} className={`flex items-end gap-[10px] ${isMe ? "flex-row-reverse" : ""}`}>
                      <div className={`flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full text-[12px] font-[700] text-white ${isMe ? "bg-accent" : "bg-brand-dark"}`}>
                        {avatar}
                      </div>
                      <div className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                        <div className={`max-w-[420px] rounded-[12px] p-[12px_16px] text-[13px] leading-[1.6] ${isMe ? "bg-accent text-white" : "bg-surface-2 text-ink"}`}>
                          
                          {msg.body && <div>{msg.body}</div>}
                          
                          {msg.attachmentName && !msg.isImage && (
                            <div className={`mt-[8px] flex items-center gap-[10px] rounded-[8px] border p-[10px_14px] text-[12px] ${isMe ? "border-white/20 bg-white/10 text-white" : "border-rule bg-surface text-ink-2"}`}>
                              <span className="text-[18px]">📄</span> 
                              <span>{msg.attachmentName}</span>
                              <span className={`ml-auto cursor-pointer ${isMe ? "text-white/80" : "text-accent"}`}>{m.view}</span>
                            </div>
                          )}
                          
                          {msg.isImage && msg.attachmentUrl && (
                            <div className="p-[4px]">
                              <img src={msg.attachmentUrl} alt={msg.attachmentName} className="block max-h-[200px] max-w-[260px] rounded-[6px]" />
                              <div className={`mt-[4px] text-[11px] ${isMe ? "text-white/60" : "text-ink-3"}`}>{msg.attachmentName}</div>
                            </div>
                          )}
                        </div>
                        <div className={`mt-[4px] px-[4px] text-[11px] text-ink-3 ${isMe ? "text-right" : ""}`}>
                          {formatTime(msg.createdAt)}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* AREA DE INPUT */}
              <div className="flex flex-col gap-[10px] border-t border-rule bg-surface p-[16px_24px]">
                <div className="flex items-end gap-[10px]">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="h-[44px] cursor-pointer rounded-[8px] border-none bg-surface-2 p-[10px_14px] text-[13px] text-ink-2 transition-colors hover:bg-rule"
                    title="Attach file or image"
                  >
                    📎
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
                    className="hidden"
                    onChange={handleFiles}
                  />
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
                    disabled={!text.trim()}
                    className="h-[44px] shrink-0 cursor-pointer rounded-[8px] border-none bg-accent p-[10px_18px] text-[13px] font-[700] text-accent-ink transition-colors hover:bg-blue-700 disabled:opacity-50"
                  >
                    {m.send}
                  </button>
                </div>
                <div className="flex items-center gap-[6px] text-[11px] text-ink-3">
                  <span className="font-[600] text-crit">⚠</span>
                  <span>{m.warningNote}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}