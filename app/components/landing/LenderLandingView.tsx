"use client";

import { useSite } from "../layout/SiteShell";
import Link from "next/link";
import { useState } from "react";
import { Check } from "lucide-react";
import RegisterForm from "./RegisterForm";

// === PESTAÑA 0: INFO PRINCIPAL (Stripe Layout) ===
function LenderInfoTab() {
  const { t } = useSite();
  const p = t.prototype;
  const demo = p.lenderInfo.demo;
  const probs = p.lenderInfo.calculator;
  const who = p.lenderInfo.who;
  const diff = p.lenderInfo.diff;

  const [capital, setCapital] = useState(250000);
  const [rate, setRate] = useState(12);

  const formatCurrency = (val: number) => "$" + val.toLocaleString("en-US");
  const monthlyInterest = (capital * (rate / 100)) / 12;
  const annualInterest = monthlyInterest * 12;
  const originationPoints = capital * 0.01;

  return (
    <div className="flex w-full flex-col bg-bg text-ink animate-in fade-in duration-300">
      <section className="mx-auto w-full max-w-[1100px] px-6 py-20 text-center sm:py-28">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-3.5 py-1.5 text-xs font-bold text-accent">
          {p.modes.lender}
        </div>
        <h1 className="mb-5 text-[40px] font-black leading-[1.1] tracking-tight text-ink sm:text-[56px]">
          {demo.ctaTitle1} <span className="text-accent">{demo.ctaTitle2}</span>
        </h1>
        <p className="mx-auto mb-10 max-w-[640px] text-lg text-ink-2">
          {demo.ctaSub}
        </p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/marketplace" className="rounded-lg bg-accent px-8 py-4 text-[15px] font-bold text-accent-ink shadow-[0_4px_14px_rgba(37,99,235,0.3)] transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-[0_6px_20px_rgba(37,99,235,0.35)]">
            {demo.btn1}
          </Link>
          <a href="#how" className="rounded-lg border border-rule-strong bg-surface px-8 py-4 text-[15px] font-bold text-ink transition-all hover:bg-surface-2 hover:border-ink-3">
            {demo.btn2}
          </a>
        </div>
      </section>

      <div className="border-y border-rule bg-surface-2 py-8 px-6">
        <div className="mx-auto flex max-w-[1100px] flex-wrap justify-center gap-x-16 gap-y-8">
          <div className="text-center">
             <div className="mb-1 text-[26px] font-black tracking-tight text-ink">24</div>
             <div className="text-[12px] font-medium text-ink-3">Borrowers looking right now</div>
          </div>
          <div className="text-center">
             <div className="mb-1 text-[26px] font-black tracking-tight text-ink">$2.8M</div>
             <div className="text-[12px] font-medium text-ink-3">Capital requested today</div>
          </div>
          <div className="text-center">
             <div className="mb-1 text-[26px] font-black tracking-tight text-ink">67%</div>
             <div className="text-[12px] font-medium text-ink-3">Average LTV — well-secured</div>
          </div>
          <div className="text-center">
             <div className="mb-1 text-[26px] font-black tracking-tight text-ink">$0</div>
             <div className="text-[12px] font-medium text-ink-3">Cost to lenders. Always free.</div>
          </div>
        </div>
      </div>

      <section className="mx-auto w-full max-w-[1100px] px-6 py-20 sm:py-24">
        <div className="mb-3 text-center text-xs font-bold uppercase tracking-widest text-accent">{who.eyebrow}</div>
        <h2 className="mb-4 text-center text-[32px] font-black tracking-tight text-ink sm:text-[36px]">{who.title}</h2>
        <p className="mx-auto mb-16 max-w-[560px] text-center text-base text-ink-2">{who.subtitle}</p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {who.cards.map((card, i) => (
             <div key={i} className={`rounded-xl border border-rule p-8 ${i === 0 ? "bg-bg" : "bg-surface-2"}`}>
                <div className="mb-4 text-3xl">{card.icon}</div>
                <h3 className="mb-2 text-[18px] font-extrabold text-ink">{card.title}</h3>
                <ul className="mb-6 flex flex-col gap-3">
                  {card.bullets.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-ink-2">
                      <span className="font-bold text-accent">+</span> {b}
                    </li>
                  ))}
                </ul>
             </div>
          ))}
        </div>
      </section>

      <section id="how" className="border-y border-rule bg-surface-2 px-6 py-20">
        <div className="mx-auto grid w-full max-w-[1100px] grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24">
          <div>
            <div className="mb-3 text-xs font-bold uppercase tracking-widest text-accent">{probs.eyebrow}</div>
            <h2 className="mb-4 text-[32px] font-black tracking-tight text-ink sm:text-[36px]">{probs.title}</h2>
            <p className="mb-10 max-w-[560px] text-base text-ink-2">{probs.subtitle}</p>
            <div className="flex flex-col gap-8">
              <div>
                <div className="mb-2 flex justify-between text-[13px] font-bold text-ink-2">
                  <span>{probs.probs[0].title}</span><span className="text-accent">{formatCurrency(capital)}</span>
                </div>
                <input type="range" min="50000" max="2000000" step="25000" value={capital} onChange={(e) => setCapital(Number(e.target.value))} className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-rule-strong accent-accent" />
              </div>
              <div>
                <div className="mb-2 flex justify-between text-[13px] font-bold text-ink-2">
                  <span>{probs.probs[1].title}</span><span className="text-accent">{rate}%</span>
                </div>
                <input type="range" min="8" max="16" step="0.5" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-rule-strong accent-accent" />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-3">
            <div className="flex items-center justify-between rounded-xl border border-rule bg-bg p-5 shadow-sm">
               <div><div className="text-[13px] text-ink-2">Monthly interest income</div></div>
               <div className="text-xl font-black text-accent">{formatCurrency(monthlyInterest)}</div>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-rule bg-bg p-5 shadow-sm">
               <div><div className="text-[13px] text-ink-2">Annual interest income</div></div>
               <div className="text-xl font-black text-ink">{formatCurrency(annualInterest)}</div>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-rule bg-bg p-5 shadow-sm">
               <div><div className="text-[13px] text-ink-2">Origination points (1%)</div></div>
               <div className="text-xl font-black text-ink">{formatCurrency(originationPoints)}</div>
            </div>
            <div className="flex items-center justify-between rounded-xl border-2 border-accent bg-accent-soft p-5 shadow-sm">
               <div><div className="text-[14px] font-bold text-ink">Total year-1 return</div></div>
               <div className="text-[26px] font-black text-accent">{formatCurrency(annualInterest + originationPoints)}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1100px] px-6 py-12 pb-24 pt-24">
        <div className="rounded-2xl border border-rule bg-surface p-8 shadow-sm sm:p-14">
          <h2 className="mb-3 text-center text-[28px] font-black tracking-tight text-ink sm:text-[32px]">{diff.title}</h2>
          <p className="mx-auto mb-12 max-w-[600px] text-center text-[15px] text-ink-2">{diff.subtitle}</p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            <div className="overflow-hidden rounded-xl border border-rule bg-surface-2 shadow-sm">
              <div className="border-b border-rule bg-bg px-6 py-5 text-[15px] font-bold text-ink-3">{diff.table.hC1}</div>
              <div className="flex flex-col">
                {diff.table.rows.map((r, i) => (
                  <div key={i} className="flex items-center gap-3 border-b border-rule px-6 py-4 text-sm last:border-0">
                    <span className="flex-shrink-0 font-bold text-crit">✕</span><span className="text-ink-2">{r.label}: {r.c1}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="overflow-hidden rounded-xl border-2 border-accent bg-surface shadow-[0_8px_30px_rgba(37,99,235,0.12)]">
              <div className="bg-accent px-6 py-5 text-[15px] font-bold text-accent-ink">{diff.table.hPml}</div>
              <div className="flex flex-col">
                {diff.table.rows.map((r, i) => (
                  <div key={i} className="flex items-center gap-3 border-b border-rule px-6 py-4 text-sm font-medium last:border-0">
                    <span className="flex-shrink-0 font-bold text-green-600 dark:text-green-400">✓</span><span className="text-ink">{r.label}: {r.pml}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink px-6 py-24 text-center">
        <div className="mx-auto max-w-[800px]">
          <h2 className="mb-5 text-[32px] font-black leading-tight tracking-tight text-bg sm:text-[40px]">
             {diff.mantra.h1}<span className="text-accent">{diff.mantra.h2}</span>{diff.mantra.h3}<br className="hidden sm:block"/>
             {diff.mantra.h4}<span className="text-accent">{diff.mantra.h5}</span>{diff.mantra.h6}
          </h2>
          <p className="mx-auto mb-10 max-w-[600px] text-base text-ink-3">{diff.mantra.p}</p>
          <div className="flex justify-center">
            <Link href="/apply" className="rounded-lg bg-accent px-8 py-4 text-[15px] font-bold text-accent-ink transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-[0_6px_20px_rgba(37,99,235,0.3)]">
              {demo.btn1}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// === PESTAÑAS ANTIGUAS MODULARIZADAS ===
const LenderMapTab = ({ d }: { d: any }) => (
  <div className="animate-in fade-in duration-300">
    <div className="mb-2 text-[11px] font-bold uppercase tracking-widest text-accent">{d.eyebrow}</div>
    <h2 className="mb-2 text-[26px] font-black text-ink">{d.title}</h2>
    <p className="mb-6 max-w-[600px] text-sm text-ink-2">{d.subtitle}</p>
    <div className="mb-6 flex flex-wrap items-center gap-2 rounded-xl border border-rule bg-surface p-4 shadow-sm">
      <select className="min-w-[120px] flex-1 appearance-none rounded-lg border border-rule bg-surface-2 px-3 py-2.5 text-xs text-ink outline-none focus:border-accent">
        <option>{d.search.type}</option><option>Fix & Flip</option><option>Rental/Hold</option>
      </select>
      <input type="text" placeholder={d.search.locationPh} className="min-w-[120px] flex-1 rounded-lg border border-rule bg-surface-2 px-3 py-2.5 text-xs text-ink outline-none focus:border-accent" />
      <select className="min-w-[120px] flex-1 appearance-none rounded-lg border border-rule bg-surface-2 px-3 py-2.5 text-xs text-ink outline-none focus:border-accent">
        <option>{d.search.score}</option><option>A+</option><option>A</option>
      </select>
      <button className="whitespace-nowrap rounded-lg bg-accent px-5 py-2.5 text-xs font-bold text-accent-ink transition-opacity hover:opacity-90">{d.search.btn}</button>
    </div>
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_340px]">
      <div>
        <h3 className="mb-3 text-sm font-bold text-ink-2">{d.mapTitle}</h3>
        <div className="relative h-[240px] w-full overflow-hidden rounded-xl border border-blue-200 bg-blue-50 dark:border-blue-900/30 dark:bg-[#0c1222]">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "repeating-linear-gradient(0deg, #3b82f6 0, #3b82f6 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #3b82f6 0, #3b82f6 1px, transparent 1px, transparent 40px)" }}></div>
          <div className="absolute left-[35%] top-[40%] h-3.5 w-3.5 rounded-full bg-accent shadow-[0_0_0_3px_white] dark:shadow-[0_0_0_3px_#111]"></div>
          <div className="absolute left-[65%] top-[25%] h-3.5 w-3.5 rounded-full bg-accent shadow-[0_0_0_3px_white] dark:shadow-[0_0_0_3px_#111]"></div>
        </div>
        <div className="mt-3 flex flex-wrap gap-4 text-[11px] text-ink-3">
          <div className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-accent"></span> {d.legendActive}</div>
          <div className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-ink-3"></span> {d.legendFunded}</div>
        </div>
      </div>
      <div>
        <div className="mb-4 rounded-xl border border-rule bg-surface p-5 shadow-sm transition-shadow hover:shadow-md">
          <div className="mb-2.5 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-accent">Fix & Flip</span>
            <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-[10px] font-bold text-green-700 dark:bg-green-900/30 dark:text-green-400">Score A+</span>
          </div>
          <div className="mb-3 text-[15px] font-bold text-ink">7721 Bartlett Rd, Memphis TN</div>
          <div className="mb-3 grid grid-cols-2 gap-y-3 gap-x-2 text-[13px]">
            <div><span className="block text-[10px] text-ink-3">Loan Ask</span><span className="font-bold text-ink">$210,000</span></div>
            <div><span className="block text-[10px] text-ink-3">ARV</span><span className="font-bold text-ink">$310,000</span></div>
            <div><span className="block text-[10px] text-ink-3">LTV</span><span className="font-bold text-green-600 dark:text-green-400">68%</span></div>
          </div>
          <button className="w-full rounded-lg bg-accent py-2.5 text-xs font-bold text-accent-ink transition-opacity hover:opacity-90">{d.btnConnect}</button>
        </div>
      </div>
    </div>
  </div>
);

const LenderDemoTab = ({ demo }: { demo: any }) => (
  <div className="animate-in fade-in duration-300 max-w-[900px] mx-auto">
    <div className="mb-2 text-[11px] font-bold uppercase tracking-widest text-accent">{demo.eyebrow}</div>
    <h2 className="mb-2 text-[26px] font-black text-ink">{demo.title}</h2>
    <p className="mb-8 text-sm text-ink-2">{demo.subtitle}</p>
    <div className="mb-10 overflow-hidden rounded-2xl bg-surface-2 shadow-sm border border-rule">
      <div className="flex h-[400px] sm:h-[500px] w-full flex-col items-center justify-center bg-gradient-to-br from-surface to-accent-soft text-center p-6">
        <button className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-accent text-3xl text-white shadow-[0_0_0_12px_rgba(29,78,216,0.2)] transition-transform hover:scale-105">▶</button>
        <h3 className="mb-2 text-xl font-bold text-ink">{demo.videoTitle}</h3>
        <p className="text-sm text-ink-3">{demo.videoSub}</p>
      </div>
    </div>
    <div className="mb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {demo.benefits.map((ben: any, idx: number) => (
        <div key={idx} className="rounded-xl bg-surface p-5 text-center shadow-sm border border-rule">
          <div className="mb-3 text-3xl">{ben.icon}</div>
          <h4 className="mb-2 text-[13px] font-bold text-ink">{ben.title}</h4>
          <p className="text-[11px] leading-relaxed text-ink-3">{ben.desc}</p>
        </div>
      ))}
    </div>
  </div>
);

const LenderProblemsTab = ({ probs }: { probs: any }) => (
  <div className="animate-in fade-in duration-300">
    <div className="mb-2 text-[11px] font-bold uppercase tracking-widest text-accent">{probs.eyebrow}</div>
    <h2 className="mb-2 text-[26px] font-black text-ink">{probs.title}</h2>
    <p className="mb-8 max-w-[600px] text-sm text-ink-2">{probs.subtitle}</p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {probs.probs.map((prob: any, idx: number) => (
        <div key={idx} className={`rounded-xl bg-surface p-6 shadow-sm border border-rule transition-colors hover:border-accent ${prob.gold ? 'md:col-span-2 bg-gradient-to-br from-surface to-amber-soft/40' : ''}`}>
          <div className="mb-4 flex items-center gap-4">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-2xl ${prob.gold ? 'bg-amber/10 border border-amber/30' : 'bg-surface-2'}`}>{prob.icon}</div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-ink-3">Problem {prob.num}</div>
              <div className="text-[15px] font-bold text-ink">{prob.title}</div>
            </div>
          </div>
          {prob.pain && (
            <div className={`mb-3 rounded-r-lg border-l-4 p-3 text-xs italic leading-relaxed ${prob.gold ? 'border-amber bg-amber/10 text-amber' : 'border-crit bg-crit/10 text-crit'}`}>
              {prob.pain}
            </div>
          )}
          <div className="text-xs leading-relaxed text-ink-2">
            <strong className={prob.gold ? "text-amber" : "text-green-600 dark:text-green-400"}>PML:</strong> {prob.solution}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const LenderWhoTab = ({ who }: { who: any }) => (
  <div className="animate-in fade-in duration-300">
    <div className="mb-2 text-[11px] font-bold uppercase tracking-widest text-accent">{who.eyebrow}</div>
    <h2 className="mb-2 text-[26px] font-black text-ink">{who.title}</h2>
    <p className="mb-8 max-w-[600px] text-sm text-ink-2">{who.subtitle}</p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {who.cards.map((card: any, idx: number) => (
        <div key={idx} className="rounded-xl bg-surface p-8 text-center shadow-sm border border-rule hover:border-accent transition-colors">
          <div className="mb-4 text-4xl">{card.icon}</div>
          <h3 className="mb-5 text-[17px] font-black text-ink">{card.title}</h3>
          <ul className="mb-8 flex flex-col gap-3 text-left">
            {card.bullets.map((bullet: string, bIdx: number) => (
              <li key={bIdx} className="flex items-start gap-2 border-b border-rule pb-3 text-xs text-ink-2">
                <Check className="mt-0.5 h-3 w-3 shrink-0 text-accent" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          <button className="w-full rounded-lg bg-accent px-4 py-2.5 text-[13px] font-bold text-accent-ink transition-opacity hover:opacity-90">{card.btn}</button>
        </div>
      ))}
    </div>
  </div>
);

const LenderDiffTab = ({ diff }: { diff: any }) => (
  <div className="animate-in fade-in duration-300">
    <div className="mb-2 text-[11px] font-bold uppercase tracking-widest text-accent">{diff.eyebrow}</div>
    <h2 className="mb-2 text-[26px] font-black text-ink">{diff.title}</h2>
    <p className="mb-8 max-w-[600px] text-sm text-ink-2">{diff.subtitle}</p>
    <div className="mb-10 overflow-x-auto rounded-xl border border-rule bg-surface shadow-sm">
      <table className="w-full min-w-[700px] border-collapse text-left text-xs sm:text-sm">
        <thead className="border-b-2 border-rule bg-surface-2">
          <tr>
            <th className="px-5 py-4 font-bold text-ink-3 w-1/3"></th>
            <th className="px-5 py-4 font-black text-accent bg-accent-soft">{diff.table.hPml}</th>
            <th className="px-5 py-4 font-bold text-ink-3">{diff.table.hC1}</th>
            <th className="px-5 py-4 font-bold text-ink-3">{diff.table.hC2}</th>
            <th className="px-5 py-4 font-bold text-ink-3">{diff.table.hC3}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-rule text-ink-2">
          {diff.table.rows.map((row: any, idx: number) => (
            <tr key={idx}>
              <td className="px-5 py-3 font-medium">{row.label}</td>
              <td className="px-5 py-3 font-bold text-green-600 bg-accent-soft dark:text-green-400">{row.pml}</td>
              <td className="px-5 py-3">{row.c1}</td>
              <td className="px-5 py-3">{row.c2}</td>
              <td className="px-5 py-3">{row.c3}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// === CONTENEDOR PRINCIPAL ===
export default function LenderLandingView() {
  const { t, activeTab } = useSite();
  const p = t.prototype;

  if (activeTab === 0) return <LenderInfoTab />;

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-start bg-bg mx-auto max-w-[1400px]">
      <div className="flex-1 px-4 py-8 lg:px-8 overflow-hidden min-w-0">
        {activeTab === 1 && <LenderMapTab d={p.lenderDeals} />}
        {activeTab === 2 && <LenderDemoTab demo={p.lenderDemo} />}
        {activeTab === 3 && <LenderProblemsTab probs={p.lenderProblems} />}
        {activeTab === 4 && <LenderWhoTab who={p.lenderWho} />}
        {activeTab === 5 && <LenderDiffTab diff={p.lenderDiff} />}
      </div>
      <aside className="sticky top-[80px] hidden w-[320px] shrink-0 py-8 pr-8 lg:block">
        <div className="rounded-2xl border border-rule bg-surface p-6 shadow-xl">
          <h3 className="mb-1 text-lg font-black text-ink">{p.sidebar.title}</h3>
          <p className="mb-5 text-[13px] text-ink-3">{p.sidebar.subLender}</p>
          <div className="mb-4">
            <RegisterForm idPrefix="sb-ld" initialIntent="lender" isCompact={true} />
          </div>
          <div className="relative mb-3 mt-6 text-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-rule-strong"></div></div>
            <span className="relative bg-surface px-3 text-xs text-ink-3">{p.sidebar.or}</span>
          </div>
          <Link href="/login" className="mb-4 flex w-full items-center justify-center rounded-lg border border-rule-strong bg-surface-2 px-4 py-3 text-sm font-bold text-ink hover:bg-rule transition-colors">
            {p.sidebar.btnSignIn}
          </Link>
          <p className="text-center text-[11px] text-ink-3 mb-6">{p.sidebar.noteLender}</p>
          <div className="border-t border-rule-strong pt-5 text-center">
            <p className="mb-1 text-[13px] text-ink-2">{p.sidebar.postLenderQ}</p>
            <Link href="#" className="text-sm font-bold text-accent hover:text-ink transition-colors">
              {p.sidebar.postLenderA}
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}