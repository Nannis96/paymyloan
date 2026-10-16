"use client";

import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import LandingHeader from "@/app/components/landing/LandingHeader";

function DemoContent() {
  const { lang } = useSite();
  const isEs = lang === "es";

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <LandingHeader />
      <main className="mx-auto flex w-full max-w-[900px] flex-col items-center px-6 py-20 text-center">
        <h1 className="mb-4 text-[40px] font-black tracking-tight text-ink">
          PayMyLoan.ai Demo
        </h1>
        <p className="mb-10 text-[18px] text-ink-2">
          {isEs 
            ? "Descubre como nuestra plataforma revoluciona los prestamos privados." 
            : "Discover how our platform revolutionizes private lending."}
        </p>
        
        <div className="relative w-full overflow-hidden rounded-2xl border border-rule bg-surface-2 shadow-lg" style={{ paddingTop: '56.25%' }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3 text-ink-3">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polygon points="10 8 16 12 10 16 10 8"></polygon>
              </svg>
              <p className="font-semibold">
                {isEs ? "Video de demostracion proximamente..." : "Demo video coming soon..."}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function DemoPage() {
  return (
    <SiteShell isMinimal={true}>
      <DemoContent />
    </SiteShell>
  );
}