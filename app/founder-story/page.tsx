"use client";

import Link from "next/link";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import LandingHeader from "@/app/components/landing/LandingHeader";

function FounderStoryContent() {
  const { t } = useSite();
  const fs = t.founderStory;

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <LandingHeader />
      
      {/* HERO */}
      <div className="mx-auto w-full max-w-[760px] px-8 pb-16 pt-20 text-center sm:px-10">
        <div className="mb-4 text-[12px] font-bold uppercase tracking-[0.5px] text-accent">
          {fs.hero.label}
        </div>
        <h1 className="mb-5 text-[40px] font-black leading-[1.1] text-ink sm:text-[48px]">
          {fs.hero.title}
        </h1>
        <p className="mx-auto max-w-[620px] text-[18px] leading-[1.7] text-ink-2">
          {fs.hero.sub}
        </p>
      </div>

      {/* STORY CONTENT */}
      <main className="mx-auto w-full max-w-[680px] px-8 pb-20 sm:px-10">
        
        {/* Section 1 */}
        <div className="mb-6 border-b-2 border-accent-soft pb-3 text-[13px] font-extrabold uppercase tracking-[0.5px] text-accent">
          {fs.sections.s1}
        </div>

        <p className="mb-7 text-[17px] leading-[1.85] text-ink-2">{fs.p1}</p>
        <p className="mb-7 text-[17px] leading-[1.85] text-ink-2">{fs.p2}</p>

        {/* Pain List */}
        <div className="my-8 rounded-[10px] border border-rule bg-surface px-8 py-7">
          <div className="mb-4 text-[13px] font-extrabold uppercase tracking-[0.5px] text-ink-3">
            {fs.painList.title}
          </div>
          {fs.painList.items.map((item, idx) => (
            <div key={idx} className="mb-2.5 flex items-start gap-2.5 text-[15px] leading-[1.5] text-ink-2 last:mb-0">
              <div className="mt-[1px] shrink-0 text-[16px] font-extrabold text-crit">×</div>
              <div>{item}</div>
            </div>
          ))}
        </div>

        <p className="mb-7 text-[17px] leading-[1.85] text-ink-2">
          {fs.p3Pre}
          <strong className="font-bold text-ink">{fs.p3Bold}</strong>
        </p>
        <p className="mb-7 text-[17px] leading-[1.85] text-ink-2">{fs.p4}</p>

        {/* Pull Quote 1 */}
        <div className="my-10 rounded-r-lg border-l-[3px] border-accent bg-accent-soft p-5 pr-7 sm:p-7 sm:pl-6">
          <p className="m-0 text-[18px] font-bold italic leading-[1.5] text-ink sm:text-[20px]">
            {fs.quote1.text}
          </p>
          <cite className="mt-2.5 block text-[13px] font-semibold not-italic text-ink-3">
            {fs.quote1.cite}
          </cite>
        </div>

        <p className="mb-7 text-[17px] leading-[1.85] text-ink-2">{fs.p5}</p>
        <p className="mb-7 text-[17px] leading-[1.85] text-ink-2">{fs.p6}</p>

        {/* Section 2 */}
        <div className="mb-6 mt-12 border-b-2 border-accent-soft pb-3 text-[13px] font-extrabold uppercase tracking-[0.5px] text-accent">
          {fs.sections.s2}
        </div>

        <p className="mb-7 text-[17px] leading-[1.85] text-ink-2">{fs.p7}</p>

        {/* Milestones */}
        <div className="mt-8 flex flex-col gap-8">
          {fs.milestones.map((ms, idx) => (
            <div key={idx} className="flex items-start gap-5">
              <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-[14px] font-black text-white">
                {idx + 1}
              </div>
              <div>
                <h3 className="mb-1.5 text-[17px] font-extrabold text-ink">{ms.title}</h3>
                <p className="m-0 text-[15px] leading-[1.7] text-ink-2">{ms.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pull Quote 2 */}
        <div className="my-10 rounded-r-lg border-l-[3px] border-accent bg-accent-soft p-5 pr-7 sm:p-7 sm:pl-6">
          <p className="m-0 text-[18px] font-bold italic leading-[1.5] text-ink sm:text-[20px]">
            {fs.quote2.text}
          </p>
          <cite className="mt-2.5 block text-[13px] font-semibold not-italic text-ink-3">
            {fs.quote2.cite}
          </cite>
        </div>

        {/* Section 3 */}
        <div className="mb-6 mt-12 border-b-2 border-accent-soft pb-3 text-[13px] font-extrabold uppercase tracking-[0.5px] text-accent">
          {fs.sections.s3}
        </div>

        {/* Solution List */}
        <div className="my-8 rounded-[10px] border border-accent/20 bg-accent-soft px-8 py-7">
          {fs.solutionList.map((item, idx) => (
            <div key={idx} className="mb-2.5 flex items-start gap-2.5 text-[15px] font-semibold leading-[1.5] text-ink last:mb-0">
              <div className="mt-[1px] shrink-0 text-[16px] font-black text-accent">+</div>
              <div>{item}</div>
            </div>
          ))}
        </div>

        <p className="mb-7 text-[17px] leading-[1.85] text-ink-2">{fs.closing1}</p>
        <p className="mb-7 text-[17px] leading-[1.85] text-ink-2">
          <strong className="font-bold text-ink">{fs.closing2}</strong>
        </p>

      </main>

      {/* CTA BAND */}
      <div className="bg-brand-dark px-10 py-16 text-center">
        <h2 className="mb-3 text-[32px] font-black text-white sm:text-[36px]">
          {fs.ctaBand.title}
        </h2>
        <p className="mx-auto mb-8 max-w-[500px] text-[16px] text-white/70">
          {fs.ctaBand.sub}
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link 
            href="/demo" 
            className="w-full rounded-md bg-white px-7 py-3 text-[14px] font-extrabold text-brand-dark transition-colors hover:bg-surface-2 sm:w-auto"
          >
            {fs.ctaBand.btnLight}
          </Link>
          <Link 
            href="/register" 
            className="w-full rounded-md bg-accent px-7 py-3 text-[14px] font-extrabold text-white transition-colors hover:bg-blue-700 sm:w-auto"
          >
            {fs.ctaBand.btnPurple}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function FounderStoryPage() {
  return (
    <SiteShell isMinimal={true}>
      <FounderStoryContent />
    </SiteShell>
  );
}