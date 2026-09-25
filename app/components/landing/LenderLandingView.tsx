"use client";

import { useSite } from "../layout/SiteShell";
import Link from "next/link";
import { useState } from "react";
import { CheckCircle2, Search, TrendingUp, Zap } from "lucide-react";

export default function LenderLandingView() {
  const { t, lang } = useSite();
  const l = t.prototype.lenderLanding;

  // Calculadora State
  const [capital, setCapital] = useState(250000);
  const [rate, setRate] = useState(12);
  const [loans, setLoans] = useState(3);

  const formatCurrency = (val: number) =>
    "$" + val.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  const monthlyInterest = (capital * (rate / 100)) / 12;
  const annualInterest = monthlyInterest * 12;

  return (
    <div className="flex w-full flex-col bg-bg text-ink animate-in fade-in duration-300">
      
      {/* HERO */}
      <section className="mx-auto w-full max-w-[1100px] px-6 py-20 text-center lg:py-28">
        <div className="mb-6 inline-block rounded-[20px] border border-accent/20 bg-accent-soft px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.3px] text-accent">
          {l.hero.badge}
        </div>
        <h1 className="mb-5 text-[40px] font-black leading-[1.08] tracking-[-1.5px] text-ink sm:text-[54px]">
          {l.hero.title1}
          <span className="text-accent">{l.hero.title2}</span>
        </h1>
        <p className="mx-auto mb-9 max-w-[640px] text-[19px] leading-[1.6] text-ink-2">
          {l.hero.sub}
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/marketplace"
            className="inline-block rounded-[7px] bg-accent px-8 py-[14px] text-[16px] font-bold text-white transition-opacity hover:bg-[#524ddb]"
          >
            {l.hero.btn1}
          </Link>
          <Link
            href="/register"
            className="inline-block rounded-[7px] border border-rule-strong bg-surface px-7 py-[14px] text-[15px] font-semibold text-ink transition-colors hover:border-ink-3"
          >
            {l.hero.btn2}
          </Link>
        </div>
      </section>

      {/* FEATURE RIBBON */}
      <div className="border-y border-rule bg-surface-2 px-6 py-7">
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-5 text-center text-[11px] font-bold uppercase tracking-[1px] text-accent">
            {l.ribbon.title}
          </div>
          <div className="grid grid-cols-2 gap-y-6 md:grid-cols-4 lg:grid-cols-7">
            {l.ribbon.items.map((item, idx) => (
              <div
                key={idx}
                className="border-r border-rule px-3 text-center last:border-0"
              >
                <div className="mb-1.5 text-[13px] font-black text-accent">{item.short}</div>
                <div className="mb-[3px] text-[12px] font-bold text-ink">{item.title}</div>
                <div className="text-[11px] leading-[1.4] text-ink-3">{item.desc}</div>
              </div>
            ))}
          </div>
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

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Feature 1 */}
          <div className="rounded-xl border border-rule bg-surface p-8">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[10px] bg-accent-soft text-accent">
              <CheckCircle2 size={18} strokeWidth={2.5} />
            </div>
            <div className="mb-2.5 text-[16px] font-black text-ink">{l.features.cards[0].title}</div>
            <div className="text-[14px] leading-[1.75] text-ink-2">{l.features.cards[0].desc}</div>
          </div>

          {/* Feature 2 */}
          <div className="rounded-xl border border-rule bg-surface p-8">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[10px] bg-accent-soft text-accent">
              <TrendingUp size={18} strokeWidth={2.5} />
            </div>
            <div className="mb-2.5 text-[16px] font-black text-ink">{l.features.cards[1].title}</div>
            <div className="text-[14px] leading-[1.75] text-ink-2">{l.features.cards[1].desc}</div>
          </div>

          {/* Feature 3 */}
          <div className="rounded-xl border border-rule bg-surface p-8">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[10px] bg-accent-soft text-accent">
              <Search size={18} strokeWidth={2.5} />
            </div>
            <div className="mb-2.5 text-[16px] font-black text-ink">{l.features.cards[2].title}</div>
            <div className="text-[14px] leading-[1.75] text-ink-2">{l.features.cards[2].desc}</div>
          </div>

          {/* Feature 4 (AI Highlight) */}
          <div className="rounded-xl border-2 border-accent bg-surface-2 p-8 dark:bg-surface-2/50">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[10px] bg-accent text-white">
              <Zap size={18} strokeWidth={2.5} />
            </div>
            <div className="mb-2.5 text-[16px] font-black text-ink">{l.features.cards[3].title}</div>
            <div className="text-[14px] leading-[1.75] text-ink-2">
              {l.features.cards[3].desc.replace("Coming soon.", "").replace("Próximamente.", "")}
              <span className="font-semibold text-accent">
                {lang === "es" ? " Próximamente." : " Coming soon."}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-y border-rule bg-surface-2 px-6 py-20 lg:py-[88px]">
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-3 text-[12px] font-bold uppercase tracking-[1px] text-accent">
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

      {/* EARNINGS CALC */}
      <section className="mx-auto w-full max-w-[1100px] px-6 py-20 lg:py-[88px]">
        <div className="rounded-2xl border border-rule bg-surface-2 p-8 lg:p-12">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-2 text-[28px] font-black tracking-[-0.5px] text-ink">
                {l.calc.title}
              </h2>
              <p className="mb-7 text-[15px] leading-[1.6] text-ink-2">
                {l.calc.sub}
              </p>

              <div className="mb-5">
                <div className="mb-2 flex justify-between text-[13px] font-semibold text-ink-2">
                  <span>{l.calc.cap}</span>
                  <span className="text-accent">{formatCurrency(capital)}</span>
                </div>
                <input
                  type="range"
                  min="50000"
                  max="2000000"
                  step="25000"
                  value={capital}
                  onChange={(e) => setCapital(Number(e.target.value))}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-rule-strong accent-accent"
                />
              </div>

              <div className="mb-5">
                <div className="mb-2 flex justify-between text-[13px] font-semibold text-ink-2">
                  <span>{l.calc.rate}</span>
                  <span className="text-accent">{rate}%</span>
                </div>
                <input
                  type="range"
                  min="8"
                  max="16"
                  step="0.5"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-rule-strong accent-accent"
                />
              </div>

              <div className="mb-5">
                <div className="mb-2 flex justify-between text-[13px] font-semibold text-ink-2">
                  <span>{l.calc.loans}</span>
                  <span className="text-accent">
                    {loans} {loans === 1 && lang === "en" ? "loan" : l.calc.loansSuffix}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="1"
                  value={loans}
                  onChange={(e) => setLoans(Number(e.target.value))}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-rule-strong accent-accent"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between rounded-xl border border-rule bg-surface px-[18px] py-[14px]">
                <div>
                  <div className="text-[13px] text-ink-2">{l.calc.mo}</div>
                  <div className="mt-[1px] text-[11px] text-ink-3">{l.calc.moSub}</div>
                </div>
                <div className="text-[18px] font-black text-accent">{formatCurrency(monthlyInterest)}</div>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-rule bg-surface px-[18px] py-[14px]">
                <div>
                  <div className="text-[13px] text-ink-2">{l.calc.yr}</div>
                  <div className="mt-[1px] text-[11px] text-ink-3">{l.calc.yrSub}</div>
                </div>
                <div className="text-[18px] font-black text-ink">{formatCurrency(annualInterest)}</div>
              </div>

              <div className="flex items-center justify-between rounded-xl border-2 border-accent bg-surface px-[18px] py-[14px]">
                <div>
                  <div className="text-[13px] font-bold text-ink">{l.calc.total}</div>
                  <div className="mt-[1px] text-[11px] text-ink-3">{l.calc.totalSub}</div>
                </div>
                <div className="text-[22px] font-black text-accent">{formatCurrency(annualInterest)}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="bg-brand-dark px-6 py-20 text-center">
        <h2 className="mb-[14px] text-[32px] font-black tracking-[-0.6px] text-white sm:text-[38px]">
          {l.cta.title}
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
            href="/marketplace"
            className="inline-block rounded-[7px] border border-white/20 bg-transparent px-[28px] py-[15px] text-[15px] font-semibold text-white transition-colors hover:border-white/50"
          >
            {l.cta.btn2}
          </Link>
        </div>
      </section>
    </div>
  );
}