"use client";

import { useState, useRef, useEffect } from "react";
import { useSite } from "@/app/components/layout/SiteShell";

type Message = {
  id: number;
  type: "sys" | "msg";
  isWarning?: boolean;
  sender?: "me" | "other";
  avatar?: string;
  isLender?: boolean;
  text: string;
  time?: string;
  attachmentName?: string;
  isImage?: boolean;
  attachmentUrl?: string;
};

export default function BorrowerMessagesView() {
  const { t } = useSite();
  const m = t.messaging;
  
  const [text, setText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Conversacion inicial de mock basada en la plantilla
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, type: "sys", text: `${m.offerAccepted} — Sep 20, 2026 at 2:14 PM` },
    { id: 2, type: "msg", sender: "other", avatar: "JR", isLender: true, text: "Congrats on getting this one locked in. Looking forward to closing. Let me know when you have a date from title.", time: "Sep 20 · 2:18 PM" },
    { id: 3, type: "msg", sender: "me", avatar: "MJ", isLender: false, text: "Thanks! I'm working with Memphis Title Group. Should have a date by end of week.", time: "Sep 20 · 3:42 PM" },
    { id: 4, type: "sys", text: `${m.achAuth} — Sep 21, 2026 at 10:05 AM` },
    { id: 5, type: "msg", sender: "other", avatar: "JR", isLender: true, text: "Got the ACH confirmation — perfect. Here's my wire instructions for the payoff when the time comes. Call me before wiring — don't rely on this doc alone.", time: "Sep 21 · 11:20 AM", attachmentName: "wire_instructions_reference.pdf" },
    { id: 6, type: "msg", sender: "me", avatar: "MJ", isLender: false, text: "Got it. I'll call you before any wire. Title confirmed closing for Sep 29.", time: "Sep 22 · 9:14 AM" },
    { id: 7, type: "sys", text: `${m.readyToClose} — Sep 22, 2026 at 9:30 AM` },
    { id: 8, type: "msg", sender: "other", avatar: "JR", isLender: true, text: "Let me know when title confirms and I'll wire same day.", time: "Sep 22 · 9:47 AM · 2 min ago" },
  ]);

  // Scroll automatico hacia abajo
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!text.trim()) return;

    // Validacion de informacion de contacto (telefonos o correos)
    const phonePattern = /(\d[\s\-\.]?){7,}/;
    const emailPattern = /\S+@\S+\.\S+/;
    
    if (phonePattern.test(text) || emailPattern.test(text)) {
      setMessages(prev => [...prev, { id: Date.now(), type: "sys", text: m.blockedMsg, isWarning: true }]);
      setText("");
      return;
    }

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { 
      id: Date.now(), 
      type: "msg", 
      sender: "me", 
      avatar: "MJ", 
      isLender: false,
      text: text.trim(), 
      time: `${m.justNow} · ${now}` 
    }]);
    setText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const isImage = file.type.startsWith("image/");
      const url = URL.createObjectURL(file);
      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      setMessages(prev => [...prev, {
        id: Date.now(),
        type: "msg",
        sender: "me",
        avatar: "MJ",
        isLender: false,
        text: "",
        time: `${m.justNow} · ${now}`,
        attachmentName: file.name,
        isImage,
        attachmentUrl: url
      }]);
      
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
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
            {/* Hilo activo */}
            <div className="cursor-pointer border-b border-rule bg-accent-soft border-l-[3px] border-l-accent p-[14px_20px] transition-colors hover:bg-surface-2">
              <div className="mb-[4px] flex items-center justify-between">
                <div className="text-[13px] font-[700] text-ink mb-[2px]">1847 Oak Ridge Ln</div>
                <div className="text-[11px] text-ink-3">2m ago</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-[12px] text-ink-3 overflow-hidden text-ellipsis whitespace-nowrap">Let me know when title confirms...</div>
                <div className="h-[8px] w-[8px] shrink-0 rounded-full bg-accent"></div>
              </div>
            </div>
            {/* Hilo inactivo 1 */}
            <div className="cursor-pointer border-b border-rule p-[14px_20px] border-l-[3px] border-l-transparent transition-colors hover:bg-surface-2">
              <div className="mb-[4px] flex items-center justify-between">
                <div className="text-[13px] font-[700] text-ink mb-[2px]">3221 Poplar Ave</div>
                <div className="text-[11px] text-ink-3">Yesterday</div>
              </div>
              <div className="text-[12px] text-ink-3 overflow-hidden text-ellipsis whitespace-nowrap">Offer accepted — next steps sent</div>
            </div>
            {/* Hilo inactivo 2 */}
            <div className="cursor-pointer border-b border-rule p-[14px_20px] border-l-[3px] border-l-transparent transition-colors hover:bg-surface-2">
              <div className="mb-[4px] flex items-center justify-between">
                <div className="text-[13px] font-[700] text-ink mb-[2px]">5508 Ridgeway Dr</div>
                <div className="text-[11px] text-ink-3">Sep 18</div>
              </div>
              <div className="text-[12px] text-ink-3 overflow-hidden text-ellipsis whitespace-nowrap">Payoff wired this morning</div>
            </div>
          </div>
        </div>

        {/* AREA DE CHAT */}
        <div className="flex flex-1 flex-col overflow-hidden bg-bg">
          
          {/* HEADER CHAT */}
          <div className="flex items-center justify-between border-b border-rule bg-surface p-[16px_24px]">
            <div className="flex flex-col">
              <div className="text-[15px] font-[800] text-ink">1847 Oak Ridge Ln, Memphis TN 38117</div>
              <div className="mt-[2px] text-[12px] text-ink-3">Loan: $185,000 · 10% · 9 months · {m.status}</div>
            </div>
            <span className="hidden rounded-[12px] bg-accent-soft p-[3px_10px] text-[11px] font-[700] text-accent sm:inline-block">
              {m.activeThread}
            </span>
          </div>

          {/* MENSAJES */}
          <div className="flex flex-1 flex-col gap-[16px] overflow-y-auto p-[24px]">
            {messages.map((msg) => {
              if (msg.type === "sys") {
                return (
                  <div key={msg.id} className="text-center">
                    <div className={`inline-block rounded-[20px] p-[6px_16px] text-[12px] font-[500] ${msg.isWarning ? "bg-amber-soft text-amber border border-amber/20" : "bg-surface-2 text-ink-3"}`}>
                      {msg.text}
                    </div>
                  </div>
                );
              }

              const isMe = msg.sender === "me";
              
              return (
                <div key={msg.id} className={`flex items-end gap-[10px] ${isMe ? "flex-row-reverse" : ""}`}>
                  <div className={`flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full text-[12px] font-[700] text-white ${msg.isLender ? "bg-brand-dark" : "bg-accent"}`}>
                    {msg.avatar}
                  </div>
                  <div className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                    <div className={`max-w-[420px] rounded-[12px] p-[12px_16px] text-[13px] leading-[1.6] ${isMe ? "bg-accent text-white" : "bg-surface-2 text-ink"}`}>
                      
                      {msg.text && <div>{msg.text}</div>}
                      
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
                      {msg.time}
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
                className="h-[44px] shrink-0 cursor-pointer rounded-[8px] border-none bg-accent p-[10px_18px] text-[13px] font-[700] text-accent-ink transition-colors hover:bg-blue-700"
              >
                {m.send}
              </button>
            </div>
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