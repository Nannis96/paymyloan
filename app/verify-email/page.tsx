"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Hourglass } from "lucide-react";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import ThemeToggle from "@/app/components/ambos/ThemeToggle";
import LangToggle from "@/app/components/ambos/LangToggle";

function VerifyEmailContent() {
  const { t } = useSite();
  const v = t.verifyEmail;
  const searchParams = useSearchParams();
  const stateParam = searchParams?.get("state") || "borrower";
  
  const [email, setEmail] = useState("");

  const handleResend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // TODO: POST /api/auth/resend-verification
    alert(`${v.expired.sentAlert} ${email}`);
  };

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center p-6 bg-bg">
      <div className="relative w-full max-w-[480px] rounded-2xl border border-rule bg-surface p-10 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-12 animate-in fade-in zoom-in-95 duration-300">
        
        {/* Toggles (Idioma y Tema) */}
        <div className="absolute right-4 top-4 flex items-center gap-1">
          <LangToggle className="h-8 min-w-8 rounded-md px-1 text-xs font-bold text-ink-3 hover:bg-surface-2 hover:text-ink" />
          <ThemeToggle iconSize={15} className="h-8 w-8 rounded-md text-ink-3 hover:bg-surface-2 hover:text-ink" />
        </div>

        {/* ESTADO: PRESTATARIO (BORROWER) */}
        {stateParam === "borrower" && (
          <div>
            <div className="mx-auto mb-6 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-success-soft text-success">
              <CheckCircle2 size={36} strokeWidth={2.5} />
            </div>
            <h1 className="mb-2 text-2xl font-extrabold text-ink">{v.borrower.title}</h1>
            <p className="mb-8 text-[15px] leading-relaxed text-ink-3">{v.borrower.sub}</p>
            
            <div className="mb-7 rounded-xl border border-rule bg-surface-2 p-5 text-left">
              <div className="mb-4 text-xs font-bold uppercase tracking-wide text-accent">
                {v.borrower.nextTitle}
              </div>
              {v.borrower.steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 border-b border-rule py-2.5 last:border-0 last:pb-0">
                  <div className="mt-[2px] flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-[11px] font-extrabold text-white">
                    {idx + 1}
                  </div>
                  <div className="text-[13px] leading-relaxed text-ink-2">
                    <strong className="font-bold text-ink">{step.title}</strong> — {step.desc}
                  </div>
                </div>
              ))}
            </div>
            
            <Link href="/borrower" className="mb-3 block w-full rounded-lg bg-accent p-3.5 text-[15px] font-bold text-white transition-colors hover:bg-blue-700">
              {v.borrower.btnPrimary}
            </Link>
            <Link href="/borrower" className="block w-full rounded-lg border-[1.5px] border-rule bg-surface p-3.5 text-[14px] font-semibold text-ink-2 transition-colors hover:border-accent hover:text-accent">
              {v.borrower.btnSecondary}
            </Link>
          </div>
        )}

        {/* ESTADO: PRESTAMISTA (LENDER) */}
        {stateParam === "lender" && (
          <div>
            <div className="mx-auto mb-6 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-success-soft text-success">
              <CheckCircle2 size={36} strokeWidth={2.5} />
            </div>
            <h1 className="mb-2 text-2xl font-extrabold text-ink">{v.lender.title}</h1>
            <p className="mb-6 text-[15px] leading-relaxed text-ink-3">{v.lender.sub}</p>
            
            <div className="mb-7 rounded-lg bg-accent-soft px-4 py-3 text-[13px] font-semibold text-accent">
              {v.lender.badge}
            </div>

            <div className="mb-7 rounded-xl border border-rule bg-surface-2 p-5 text-left">
              <div className="mb-4 text-xs font-bold uppercase tracking-wide text-accent">
                {v.lender.nextTitle}
              </div>
              {v.lender.steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 border-b border-rule py-2.5 last:border-0 last:pb-0">
                  <div className="mt-[2px] flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-[11px] font-extrabold text-white">
                    {idx + 1}
                  </div>
                  <div className="text-[13px] leading-relaxed text-ink-2">
                    <strong className="font-bold text-ink">{step.title}</strong> — {step.desc}
                  </div>
                </div>
              ))}
            </div>
            
            <Link href="/marketplace" className="mb-3 block w-full rounded-lg bg-accent p-3.5 text-[15px] font-bold text-white transition-colors hover:bg-blue-700">
              {v.lender.btnPrimary}
            </Link>
            <Link href="/lender/verify" className="block w-full rounded-lg border-[1.5px] border-rule bg-surface p-3.5 text-[14px] font-semibold text-ink-2 transition-colors hover:border-accent hover:text-accent">
              {v.lender.btnSecondary}
            </Link>
          </div>
        )}

        {/* ESTADO: ENLACE EXPIRADO (EXPIRED) */}
        {stateParam === "expired" && (
          <div>
            <div className="mx-auto mb-6 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-crit-soft text-crit">
              <Hourglass size={32} strokeWidth={2.5} />
            </div>
            <h1 className="mb-2 text-2xl font-extrabold text-crit">{v.expired.title}</h1>
            <p className="mb-8 text-[14px] leading-relaxed text-ink-3">{v.expired.sub}</p>
            
            <form onSubmit={handleResend} className="mb-4">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={v.expired.emailPh}
                className="mb-3 w-full rounded-lg border border-rule-strong bg-bg px-4 py-3.5 text-[14px] text-ink outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/10"
              />
              <button type="submit" className="block w-full rounded-lg bg-accent p-3.5 text-[15px] font-bold text-white transition-colors hover:bg-blue-700">
                {v.expired.btnPrimary}
              </button>
            </form>
            <Link href="/login" className="block w-full rounded-lg border-[1.5px] border-rule bg-surface p-3.5 text-[14px] font-semibold text-ink-2 transition-colors hover:border-accent hover:text-accent">
              {v.expired.btnSecondary}
            </Link>
          </div>
        )}

        {/* ESTADO: YA VERIFICADO (ALREADY) */}
        {stateParam === "already" && (
          <div>
            <div className="mx-auto mb-6 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-success-soft text-success">
              <CheckCircle2 size={36} strokeWidth={2.5} />
            </div>
            <h1 className="mb-2 text-2xl font-extrabold text-ink">{v.already.title}</h1>
            <p className="mb-8 text-[15px] leading-relaxed text-ink-3">{v.already.sub}</p>
            
            <Link href="/login" className="block w-full rounded-lg bg-accent p-3.5 text-[15px] font-bold text-white transition-colors hover:bg-blue-700">
              {v.already.btnPrimary}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <SiteShell isMinimal={true}>
      <Suspense fallback={<div className="min-h-screen bg-bg" />}>
        <VerifyEmailContent />
      </Suspense>
    </SiteShell>
  );
}