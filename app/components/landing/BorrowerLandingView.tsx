"use client";

import Link from "next/link";
import { useSite } from "../layout/SiteShell";
import { Files, CalendarClock, Zap, TrendingUp, Globe, Sparkles } from "lucide-react";

export default function BorrowerLandingView() {
  const { t } = useSite();
  const l = t.prototype.borrowerLanding;

  return (
    <div className="flex w-full flex-col bg-bg text-ink animate-in fade-in duration-300">
      
      {/* HERO */}
      <section className="mx-auto w-full max-w-[1100px] px-6 py-20 text-center lg:py-28">
        <div className="mb-6 inline-block rounded-[20px] border border-[#a5d6a7] bg-success-soft px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.3px] text-success">
          {l.hero.badge}
        </div>
        <h1 className="mb-5 text-[40px] font-black leading-[1.08] tracking-[-1.5px] text-ink sm:text-[54px]">
          {l.hero.title1}
          <br />
          <span className="text-accent">{l.hero.title2}</span>
        </h1>
        <p className="mx-auto mb-9 max-w-[640px] text-[19px] leading-[1.6] text-ink-2">
          {l.hero.sub}
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/register"
            className="inline-block rounded-[7px] bg-accent px-8 py-[14px] text-[16px] font-bold text-white transition-opacity hover:bg-[#524ddb]"
          >
            {l.hero.btn1}
          </Link>
          <Link
            href="/demo"
            className="inline-block rounded-[7px] border border-rule-strong bg-surface px-7 py-[14px] text-[15px] font-semibold text-ink transition-colors hover:border-ink-3"
          >
            {l.hero.btn2}
          </Link>
        </div>
      </section>

      {/* PROOF STRIP */}
      <div className="border-y border-rule bg-surface-2 px-6 py-6">
        <div className="mx-auto flex max-w-[1100px] flex-wrap justify-center gap-10 sm:gap-14">
          {l.proof.items.map((item, idx) => (
            <div key={idx} className="text-center">
              <div className="text-[26px] font-black tracking-[-0.5px] text-ink">{item.val}</div>
              <div className="mt-0.5 text-[12px] font-medium text-ink-3">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES SECTION */}
      <section className="mx-auto w-full max-w-[1100px] px-6 py-20 lg:py-[88px]">
        <div className="mb-3 text-[12px] font-bold uppercase tracking-[1px] text-accent">
          {l.features.label}
        </div>
        <h2 className="mb-4 text-[32px] font-black leading-[1.12] tracking-[-0.8px] text-ink sm:text-[38px]">
          {l.features.title}
        </h2>
        <p className="mb-14 max-w-[580px] text-[17px] leading-[1.6] text-ink-2">
          {l.features.sub}
        </p>
        
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {/* Card 1 */}
          <div className="rounded-xl border border-rule bg-surface p-7">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[10px] bg-accent-soft text-accent">
              <Files size={18} strokeWidth={2.5} />
            </div>
            <div className="mb-2 text-[15px] font-black text-ink">{l.features.cards[0].title}</div>
            <div className="text-[13px] leading-[1.7] text-ink-2">{l.features.cards[0].desc}</div>
          </div>

          {/* Card 2 */}
          <div className="rounded-xl border border-rule bg-surface p-7">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[10px] bg-accent-soft text-accent">
              <CalendarClock size={18} strokeWidth={2.5} />
            </div>
            <div className="mb-2 text-[15px] font-black text-ink">{l.features.cards[1].title}</div>
            <div className="text-[13px] leading-[1.7] text-ink-2">{l.features.cards[1].desc}</div>
          </div>

          {/* Card 3 */}
          <div className="rounded-xl border border-rule bg-surface p-7">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[10px] bg-accent-soft text-accent">
              <Zap size={18} strokeWidth={2.5} />
            </div>
            <div className="mb-2 text-[15px] font-black text-ink">{l.features.cards[2].title}</div>
            <div className="text-[13px] leading-[1.7] text-ink-2">{l.features.cards[2].desc}</div>
          </div>

          {/* Card 4 */}
          <div className="rounded-xl border border-rule bg-surface p-7">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[10px] bg-accent-soft text-accent">
              <TrendingUp size={18} strokeWidth={2.5} />
            </div>
            <div className="mb-2 text-[15px] font-black text-ink">{l.features.cards[3].title}</div>
            <div className="text-[13px] leading-[1.7] text-ink-2">{l.features.cards[3].desc}</div>
          </div>

          {/* Card 5 */}
          <div className="rounded-xl border border-rule bg-surface p-7">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[10px] bg-accent-soft text-accent">
              <Globe size={18} strokeWidth={2.5} />
            </div>
            <div className="mb-2 text-[15px] font-black text-ink">{l.features.cards[4].title}</div>
            <div className="text-[13px] leading-[1.7] text-ink-2">{l.features.cards[4].desc}</div>
          </div>

          {/* Card 6 (AI Highlight) */}
          <div className="rounded-xl border border-accent bg-[#fafafe] p-7 dark:bg-accent-soft/20">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[10px] bg-accent text-white">
              <Sparkles size={18} strokeWidth={2.5} />
            </div>
            <div className="mb-2 text-[15px] font-black text-ink">{l.features.cards[5].title}</div>
            <div className="text-[13px] leading-[1.7] text-ink-2">
              {l.features.cards[5].desc.replace("Coming soon.", "").replace("Próximamente.", "")}
              <span className="font-semibold text-accent">
                {l.features.cards[5].desc.includes("Próximamente") ? " Próximamente." : " Coming soon."}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-y border-rule bg-surface-2 px-6 py-20 lg:py-[88px]">
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-2 text-[12px] font-bold uppercase tracking-[1px] text-accent">
            {l.how.label}
          </div>
          <h2 className="mb-2 text-[32px] font-black leading-[1.12] tracking-[-0.8px] text-ink sm:text-[38px]">
            {l.how.title}
          </h2>
          <p className="m-0 text-[17px] leading-[1.6] text-ink-2">
            {l.how.sub}
          </p>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {l.how.steps.map((step, idx) => (
              <div key={idx} className="rounded-xl border border-rule bg-surface p-7">
                <div className="mb-3.5 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-accent text-[14px] font-black text-white">
                  {idx + 1}
                </div>
                <div className="mb-2 text-[16px] font-bold text-ink">{step.title}</div>
                <div className="text-[13px] leading-[1.65] text-ink-2">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="bg-brand-dark px-6 py-20 text-center">
        <h2 className="mb-[14px] text-[32px] font-black tracking-[-0.6px] text-white sm:text-[38px]">
          {l.cta.title1}<br />{l.cta.title2}
        </h2>
        <p className="mx-auto mb-8 max-w-[500px] text-[16px] text-ink-3">
          {l.cta.sub}
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/register"
            className="inline-block rounded-[7px] bg-accent px-[34px] py-[15px] text-[16px] font-bold text-white transition-opacity hover:bg-[#524ddb]"
          >
            {l.cta.btn1}
          </Link>
          <Link
            href="/demo"
            className="inline-block rounded-[7px] border border-white/20 bg-transparent px-[28px] py-[15px] text-[15px] font-semibold text-white transition-colors hover:border-white/50"
          >
            {l.cta.btn2}
          </Link>
        </div>
      </section>

    </div>
  );
}