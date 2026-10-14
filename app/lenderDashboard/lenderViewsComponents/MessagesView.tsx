"use client";

import { useState, useRef, useEffect } from "react";
import { useSite } from "@/app/components/layout/SiteShell";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

// Interfaces basadas en la API de Mensajeria
interface Message {
  id: string;
  body: string;
  sender: "LENDER" | "BORROWER" | "SYSTEM";
  createdAt: string;
  // Campos locales simulados para la UI si enviaran archivos (aun no en API)
  attachmentName?: string;
  isImage?: boolean;
  attachmentUrl?: string;
  isWarning?: boolean;
}

interface Thread {
  borrowerProfileId?: string; // Cuando lo ve el Lender
  lenderCompanyId?: string;   // Cuando lo ve el Borrower
  borrowerProfile?: {
    id: string;
    user?: { name: string };
  };
  lastMessage: Message;
  unreadCount: number;
}

export default function MessagesView() {
  const { t, lang } = useSite();
  const m = t.messaging;
  
  const [threads, setThreads] = useState<Thread[]>([]);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  
  const [isLoadingThreads, setIsLoadingThreads] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Cargar lista de conversaciones (Threads)
  useEffect(() => {
    async function fetchThreads() {
      try {
        const token = localStorage.getItem("accessToken") || "";
        const res = await fetch(`${BASE_URL}/api/lenders/me/messages/threads`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const json = await res.json();
        if (json.success && json.data) {
          setThreads(json.data);
          // Si hay hilos y no hay ninguno activo, seleccionamos el primero
          if (json.data.length > 0 && !activeThreadId) {
            setActiveThreadId(json.data[0].borrowerProfileId || json.data[0].borrowerProfile?.id);
          }
        }
      } catch (err) {
        console.error("Error fetching threads:", err);
      } finally {
        setIsLoadingThreads(false);
      }
    }
    fetchThreads();
  }, []);

  // Cargar mensajes del hilo activo y marcar como leidos
  useEffect(() => {
    if (!activeThreadId) return;

    async function fetchMessages() {
      setIsLoadingMessages(true);
      try {
        const token = localStorage.getItem("accessToken") || "";
        
        // 1. Marcar como leidos
        await fetch(`${BASE_URL}/api/lenders/me/messages/threads/${activeThreadId}/read`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` }
        });

        // 2. Obtener historial (paginado en API, tomamos items)
        const res = await fetch(`${BASE_URL}/api/lenders/me/messages/threads/${activeThreadId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const json = await res.json();
        
        if (json.success && json.data?.items) {
          setMessages(json.data.items);
        }
      } catch (err) {
        console.error("Error fetching messages:", err);
      } finally {
        setIsLoadingMessages(false);
      }
    }
    fetchMessages();
  }, [activeThreadId]);

  // Scroll automatico hacia abajo
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!text.trim() || !activeThreadId) return;

    // Validacion local de info de contacto
    const phonePattern = /(\d[\s\-\.]?){7,}/;
    const emailPattern = /\S+@\S+\.\S+/;
    
    if (phonePattern.test(text) || emailPattern.test(text)) {
      setMessages(prev => [...prev, { 
        id: `sys-${Date.now()}`, 
        sender: "SYSTEM", 
        body: m.blockedMsg, 
        isWarning: true, 
        createdAt: new Date().toISOString() 
      }]);
      setText("");
      return;
    }

    const currentText = text;
    setText(""); // Limpieza optimista

    try {
      const token = localStorage.getItem("accessToken") || "";
      const res = await fetch(`${BASE_URL}/api/lenders/me/messages`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          borrowerProfileId: activeThreadId,
          body: currentText
        })
      });
      const json = await res.json();
      
      if (json.success && json.data) {
        setMessages(prev => [...prev, json.data]);
        
        // Actualizamos el ultimo mensaje en el thread local
        setThreads(prev => prev.map(t => {
          const tId = t.borrowerProfileId || t.borrowerProfile?.id;
          if (tId === activeThreadId) {
            return { ...t, lastMessage: json.data };
          }
          return t;
        }));
      }
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Logica visual de adjuntos (Nota: La API aun no soporta archivos en mensajes)
  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const isImage = file.type.startsWith("image/");
      const url = URL.createObjectURL(file);
      
      setMessages(prev => [...prev, {
        id: `local-${Date.now()}`,
        sender: "LENDER",
        body: "",
        createdAt: new Date().toISOString(),
        attachmentName: file.name,
        isImage,
        attachmentUrl: url
      }]);
      
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const activeThreadData = threads.find(t => (t.borrowerProfileId || t.borrowerProfile?.id) === activeThreadId);
  const activeBorrowerName = activeThreadData?.borrowerProfile?.user?.name || "Prestatario";

  // Formateador de fechas
  const formatTime = (isoString: string) => {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleTimeString(lang === "es" ? "es-MX" : "en-US", { hour: '2-digit', minute: '2-digit' });
  };

  const formatThreadDate = (isoString: string) => {
    if (!isoString) return "";
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString(lang === "es" ? "es-MX" : "en-US", { month: "short", day: "numeric" });
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
            {isLoadingThreads ? (
              <div className="p-6 text-center text-sm text-[#8898aa]">Cargando...</div>
            ) : threads.length === 0 ? (
              <div className="p-6 text-center text-sm text-[#8898aa]">Sin conversaciones</div>
            ) : (
              threads.map((thread) => {
                const tId = thread.borrowerProfileId || thread.borrowerProfile?.id;
                const isActive = activeThreadId === tId;
                const name = thread.borrowerProfile?.user?.name || "Prestatario";
                
                return (
                  <div 
                    key={tId}
                    onClick={() => setActiveThreadId(tId || null)}
                    className={`cursor-pointer border-b border-[#f0f4f8] p-[14px_20px] transition-colors hover:bg-[#f8f9ff] ${
                      isActive ? "bg-[#f0efff] border-l-[3px] border-l-[#635bff]" : "border-l-[3px] border-l-transparent"
                    }`}
                  >
                    <div className="mb-[4px] flex items-center justify-between">
                      <div className="text-[13px] font-[700] text-[#0a2540] mb-[2px]">{name}</div>
                      <div className="text-[11px] text-[#aab7c4]">{formatThreadDate(thread.lastMessage?.createdAt)}</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-[12px] text-[#8898aa] overflow-hidden text-ellipsis whitespace-nowrap">
                        {thread.lastMessage?.body || "..."}
                      </div>
                      {thread.unreadCount > 0 && !isActive && (
                        <div className="h-[8px] w-[8px] shrink-0 rounded-full bg-[#635bff]"></div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* AREA DE CHAT */}
        <div className="flex flex-1 flex-col overflow-hidden">
          
          <div className="flex items-center justify-between border-b border-[#e6ebf1] bg-white p-[16px_24px]">
            <div className="flex flex-col">
              <div className="text-[15px] font-[800] text-[#0a2540]">{activeBorrowerName}</div>
              <div className="mt-[2px] text-[12px] text-[#8898aa]">{m.status}</div>
            </div>
            <span className="rounded-[12px] bg-[#f0efff] p-[3px_10px] text-[11px] font-[700] text-[#635bff] hidden sm:inline-block">
              {m.activeThread}
            </span>
          </div>

          <div className="flex flex-1 flex-col gap-[16px] overflow-y-auto p-[24px]">
            {isLoadingMessages ? (
              <div className="text-center text-sm text-[#8898aa]">Cargando mensajes...</div>
            ) : !activeThreadId ? (
              <div className="text-center text-sm text-[#8898aa]">Selecciona una conversacion</div>
            ) : messages.length === 0 ? (
              <div className="text-center text-sm text-[#8898aa]">Escribe el primer mensaje</div>
            ) : (
              messages.map((msg) => {
                // Si el mensaje es del sistema, se muestra centrado
                if (msg.sender === "SYSTEM" || msg.isWarning) {
                  return (
                    <div key={msg.id} className="text-center">
                      <div className={`inline-block rounded-[20px] p-[6px_16px] text-[12px] font-[500] ${msg.isWarning ? "bg-[#fff3cd] text-[#856404] border border-[#ffc107]" : "bg-[#f0f4f8] text-[#8898aa]"}`}>
                        {msg.body}
                      </div>
                    </div>
                  );
                }

                // El lender lo ve desde su perspectiva (isMe = true si sender es LENDER)
                const isMe = msg.sender === "LENDER";
                const avatar = isMe ? "MI" : activeBorrowerName.substring(0, 2).toUpperCase();
                
                return (
                  <div key={msg.id} className={`flex items-end gap-[10px] ${isMe ? "flex-row-reverse" : ""}`}>
                    <div className={`flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full text-[12px] font-[700] text-white ${!isMe ? "bg-[#0a2540]" : "bg-[#635bff]"}`}>
                      {avatar}
                    </div>
                    <div className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                      <div className={`max-w-[420px] rounded-[12px] p-[12px_16px] text-[13px] leading-[1.6] ${isMe ? "bg-[#635bff] text-white" : "bg-[#f0f4f8] text-[#0a2540]"}`}>
                        
                        {msg.body && <div>{msg.body}</div>}
                        
                        {/* Seccion de UI para adjuntos (simulada por ahora) */}
                        {msg.attachmentName && !msg.isImage && (
                          <div className={`mt-[8px] flex items-center gap-[10px] rounded-[8px] border p-[10px_14px] text-[12px] ${isMe ? "border-white/20 bg-white/10 text-white" : "border-[#e6ebf1] bg-white text-[#425466]"}`}>
                            <span className="text-[18px]">📄</span> 
                            <span>{msg.attachmentName}</span>
                            <span className={`ml-auto cursor-pointer ${isMe ? "text-[#c7c4ff]" : "text-[#635bff]"}`}>{m.view}</span>
                          </div>
                        )}
                        
                        {msg.isImage && msg.attachmentUrl && (
                          <div className="p-[4px]">
                            <img src={msg.attachmentUrl} alt={msg.attachmentName} className="max-h-[200px] max-w-[260px] rounded-[6px] block" />
                            <div className={`mt-[4px] text-[11px] ${isMe ? "text-white/60" : "text-[#8898aa]"}`}>{msg.attachmentName}</div>
                          </div>
                        )}
                      </div>
                      <div className={`mt-[4px] px-[4px] text-[11px] text-[#aab7c4] ${isMe ? "text-right" : ""}`}>
                        {formatTime(msg.createdAt)}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* AREA DE INPUT */}
          <div className="flex flex-col gap-[10px] border-t border-[#e6ebf1] bg-white p-[16px_24px]">
            <div className="flex items-end gap-[10px]">
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="h-[44px] cursor-pointer rounded-[8px] border-none bg-[#f0f4f8] p-[10px_14px] text-[13px] text-[#425466] hover:bg-[#e6ebf1] transition-colors" 
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
                className="min-h-[44px] max-h-[120px] flex-1 resize-none rounded-[8px] border-[1.5px] border-[#e6ebf1] p-[10px_14px] font-sans text-[14px] outline-none transition-colors focus:border-[#635bff]" 
                rows={1}
                disabled={!activeThreadId}
              />
              <button 
                onClick={handleSend}
                disabled={!activeThreadId}
                className="h-[44px] shrink-0 cursor-pointer rounded-[8px] border-none bg-[#635bff] p-[10px_18px] text-[13px] font-[700] text-white hover:bg-[#524ddb] transition-colors disabled:opacity-50"
              >
                {m.send}
              </button>
            </div>
            <div className="flex items-center gap-[6px] text-[11px] text-[#aab7c4]">
              <span className="font-[600] text-[#c62626]">🔒</span>
              <span>{m.warningNote}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}