"use client";

import Link from "next/link";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import SimpleHeader from "@/app/components/ambos/SimpleHeader";
import ValueGrid from "@/app/components/landing/ValueGrid";
import PainGrid from "@/app/components/landing/PainGrid";
import ComparisonTable from "@/app/components/landing/ComparisonTable";

function CompetitiveContent() {
  const { t } = useSite();
  const cp = t.competitive;

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <SimpleHeader />
      
      <main className="mx-auto w-full max-w-[960px] px-6 py-16">
        
        {/* HERO */}
        <div className="mb-16 text-center">
          <div className="mb-3.5 text-[11px] font-bold uppercase tracking-[1.5px] text-accent">
            {cp.hero.label}
          </div>
          <h1 className="mb-4 text-[40px] font-black leading-[1.15] text-ink">
            {cp.hero.title1}<br />
            <em className="not-italic text-accent">{cp.hero.title2}</em>
          </h1>
          <p className="mx-auto max-w-[600px] text-[17px] leading-[1.7] text-ink-2">
            {cp.hero.sub}
          </p>
        </div>

        {/* NUMBERS / VALUES */}
        <ValueGrid data={cp.values} />

        {/* BEFORE / AFTER */}
        <PainGrid data={cp.pain} />

        {/* COMPARISON TABLE */}
        <ComparisonTable data={cp.comparison} />

        {/* MANTRA STRIP */}
        <div className="mb-12 flex flex-col items-center gap-3 rounded-xl bg-brand-dark p-8 text-center sm:p-10">
          <div className="text-[15px] italic text-white/60">
            {cp.mantra.q1}
          </div>
          <div className="text-[20px] font-extrabold text-white">
            {cp.mantra.main1} <em className="not-italic text-brand-purple">{cp.mantra.main2}</em>
          </div>
          <div className="text-[15px] italic text-white/60">
            {cp.mantra.q2}
          </div>
        </div>

        {/* CTA ROW */}
        <div className="text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/register" 
            className="rounded-md bg-accent px-10 py-4 text-[16px] font-bold text-white transition-colors hover:bg-blue-700 w-full sm:w-auto"
          >
            {cp.cta.lender}
          </Link>
          <Link 
            href="/register" 
            className="rounded-md border-2 border-rule bg-bg px-8 py-3.5 text-[15px] font-semibold text-ink-2 transition-colors hover:border-accent hover:text-accent w-full sm:w-auto"
          >
            {cp.cta.borrower}
          </Link>
        </div>
      </main>
    </div>
  );
}

export default function CompetitivePositioningPage() {
  return (
    <SiteShell isMinimal={true}>
      <CompetitiveContent />
    </SiteShell>
  );
}