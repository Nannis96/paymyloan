"use client";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import Link from "next/link";

export default function SupportPage() {
  const { lang } = useSite();
  const isEs = lang === "es";

  return (
    <SiteShell isMinimal={true}>
      <div className="flex h-[70vh] flex-col items-center justify-center animate-in fade-in duration-300">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent-soft text-accent">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
        </div>
        <h1 className="text-[28px] font-[900] tracking-tight text-ink mb-3">
          {isEs ? "Próximamente" : "Coming Soon"}
        </h1>
        <p className="text-[15px] text-ink-3 mb-8 text-center max-w-[400px] leading-relaxed">
          {isEs 
            ? "Estamos trabajando duro juntando la información que pueda ser de mayor ayuda para ti. ¡Estará disponible muy pronto!" 
            : "We're working hard to gather the information that may be most helpful for you. It will be available very soon!"}
        </p>
        <Link 
          href="/borrowerDashboard" 
          className="rounded-lg bg-accent px-6 py-3 text-[14px] font-bold text-white transition-colors hover:bg-blue-700 shadow-sm"
        >
          {isEs ? "Volver al Dashboard" : "Back to Dashboard"}
        </Link>
      </div>
    </SiteShell>
  );
}