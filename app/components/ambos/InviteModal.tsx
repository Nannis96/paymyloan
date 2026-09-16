"use client";

import { useState } from "react";
import { X, Copy, CheckCircle2, Mail } from "lucide-react";
import { useSite } from "./layout/SiteShell";

interface InviteModalProps {
  onClose: () => void;
  dealId?: string; // Opcional: Si se invita a un trato especifico
}

export default function InviteModal({ onClose, dealId }: InviteModalProps) {
  const { t } = useSite();
  const im = t.inviteModal;

  const [email, setEmail] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // TODO: MOCK TEMPORAL. 
  // La URL real debera ser generada por el backend con un token unico de invitacion.
  const inviteLink = dealId 
    ? `https://paymyloan.ai/invite?deal=${dealId}&token=abc123xyz` 
    : `https://paymyloan.ai/invite?user=currentUserId`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // TODO: BACKEND - Llamada a la API para enviar el correo electronico (ej. SendGrid/Resend)
    console.log("Enviando invitacion a:", email, "Enlace:", inviteLink);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-[500px] overflow-hidden rounded-2xl border border-rule bg-surface shadow-2xl">
        
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-surface-2 text-ink transition-colors hover:bg-crit hover:text-white"
        >
          <X size={18} />
        </button>

        <div className="p-6 sm:p-8">
          <h2 className="mb-2 text-2xl font-black tracking-tight text-ink">
            {im.title}
          </h2>
          <p className="mb-6 text-sm leading-relaxed text-ink-2">
            {im.subtitle}
          </p>

          {/* Enlace para copiar */}
          <div className="mb-8">
            <div className="flex items-center rounded-lg border border-rule bg-surface-2 p-1">
              <input
                type="text"
                readOnly
                value={inviteLink}
                className="w-full bg-transparent px-3 text-[13px] text-ink outline-none"
              />
              <button
                type="button"
                onClick={handleCopy}
                className="flex shrink-0 items-center gap-1.5 rounded-md bg-ink px-4 py-2 text-xs font-bold text-bg transition-opacity hover:opacity-90"
              >
                {isCopied ? <CheckCircle2 size={14} className="text-green-400" /> : <Copy size={14} />}
                {isCopied ? im.linkCopied : im.copyLink}
              </button>
            </div>
          </div>

          <div className="relative mb-8 text-center">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-rule"></div>
            </div>
            <span className="relative bg-surface px-4 text-xs font-bold uppercase tracking-widest text-ink-3">
              O
            </span>
          </div>

          {/* Enviar por correo */}
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-green-200 bg-green-50 p-6 text-center dark:border-green-900/40 dark:bg-green-900/10">
              <CheckCircle2 className="mb-2 h-8 w-8 text-green-500" />
              <p className="text-sm font-bold text-green-700 dark:text-green-400">
                {im.successMsg}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSendEmail} className="flex flex-col gap-3">
              <label className="text-[11px] font-bold uppercase tracking-widest text-ink-3">
                {im.emailLabel}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={im.emailPh}
                  required
                  className="w-full rounded-lg border border-rule bg-surface-2 py-3 pl-10 pr-4 text-[14px] text-ink outline-none transition-colors focus:border-accent"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 w-full rounded-lg bg-accent px-5 py-3 text-[14px] font-bold text-accent-ink transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {isSubmitting ? im.sending : im.sendBtn}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}