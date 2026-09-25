"use client";

import { useState } from "react";
import Link from "next/link";
import { useSite } from "../layout/SiteShell";

const LENDER_ICONS = [
  <svg key="1" width="18" height="18" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="7" r="4" stroke="currentColor" strokeWidth="1.5"/><path d="M3 17c0-3.314 3.134-6 7-6s7 2.686 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  <svg key="2" width="18" height="18" viewBox="0 0 20 20" fill="none"><rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M7 10h6M7 7h6M7 13h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  <svg key="3" width="18" height="18" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M10 6v4l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  <svg key="4" width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M4 12h12M4 8h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/></svg>,
  <svg key="5" width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  <svg key="6" width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M10 3v4M10 13v4M3 10h4M13 10h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
];

const BORROWER_ICONS = [
  <svg key="1" width="18" height="18" viewBox="0 0 20 20" fill="none"><rect x="2" y="6" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M6 6V5a4 4 0 0 1 8 0v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  <svg key="2" width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M3 14l4-4 4 4 6-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  <svg key="3" width="18" height="18" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M10 6v4l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  <svg key="4" width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M4 12h12M4 8h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/></svg>,
  <svg key="5" width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  <svg key="6" width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M10 3v4M10 13v4M3 10h4M13 10h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
];

export default function WhyPml() {
  const { t } = useSite();
  const [role, setRole] = useState<"lender" | "borrower">("lender");
  const w = t.whyPml;

  const data = role === "lender" ? w.lender : w.borrower;
  const icons = role === "lender" ? LENDER_ICONS : BORROWER_ICONS;

  return (
    <div className="flex w-full flex-col bg-bg animate-in fade-in duration-300 pb-20">
      
      {/* WHO ARE YOU */}
      <div className="pt-[72px] px-6 text-center sm:px-12">
        <div className="mb-3 text-[12px] font-bold uppercase tracking-[1px] text-accent">
          {w.hero.eyebrow}
        </div>
        <div className="mb-2 text-[40px] font-black tracking-[-0.8px] text-ink">
          {w.hero.title}
        </div>
        <div className="mb-9 text-base text-ink-2">
          {w.hero.subtitle}
        </div>
        <div className="inline-flex rounded-xl border border-rule bg-surface-2 p-1.5">
          <button
            onClick={() => setRole("lender")}
            className={`rounded-lg px-10 py-[14px] text-[15px] font-bold transition-all ${
              role === "lender"
                ? "bg-accent text-white shadow-[0_2px_8px_rgba(99,91,255,0.3)]"
                : "bg-transparent text-ink-3 hover:text-ink"
            }`}
          >
            {w.roles.lender}
          </button>
          <button
            onClick={() => setRole("borrower")}
            className={`rounded-lg px-10 py-[14px] text-[15px] font-bold transition-all ${
              role === "borrower"
                ? "bg-accent text-white shadow-[0_2px_8px_rgba(99,91,255,0.3)]"
                : "bg-transparent text-ink-3 hover:text-ink"
            }`}
          >
            {w.roles.borrower}
          </button>
        </div>
      </div>

      {/* CONTENT PANEL */}
      <div className="mx-auto w-full max-w-[1100px] px-6 pt-16 sm:px-12">
        
        {/* Hero Band */}
        <div className="mb-16 text-center animate-in fade-in zoom-in-95 duration-300" key={`hero-${role}`}>
          <div
            className={`mb-4 inline-block rounded-[20px] px-[14px] py-1 text-[12px] font-bold border ${
              role === "lender"
                ? "border-[#c7c4ff] bg-[#f0efff] text-accent"
                : "border-[#a5d6a7] bg-[#e8f5e9] text-[#2e7d32]"
            }`}
          >
            {data.hero.badge}
          </div>
          <h2 className="mb-[14px] text-[38px] font-black leading-[1.15] tracking-[-0.8px] text-ink">
            {data.hero.title1}
            <br />
            <span className="text-accent">{data.hero.title2}</span>
          </h2>
          <p className="mx-auto max-w-[620px] text-[17px] leading-[1.65] text-ink-2">
            {data.hero.subtitle}
          </p>
        </div>

        {/* Feature Grid */}
        <div className="mb-12 grid grid-cols-1 gap-5 md:grid-cols-2 animate-in fade-in slide-in-from-bottom-4 duration-500" key={`grid-${role}`}>
          {data.cards.map((card, i) => (
            <div key={i} className="rounded-xl border border-rule bg-surface p-7 pb-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[10px] bg-accent-soft text-accent">
                {icons[i]}
              </div>
              <h3 className="mb-2 text-[16px] font-black tracking-[-0.2px] text-ink">
                {card.title}
              </h3>
              <p className="mb-3.5 text-[13px] leading-[1.7] text-ink-2">
                {card.desc}
              </p>
              <div className="flex flex-col gap-[7px]">
                {card.points.map((point, j) => (
                  <div key={j} className="flex items-start gap-[9px] text-[12px] leading-[1.5] text-ink-2">
                    <div className="mt-[5px] h-[5px] w-[5px] shrink-0 rounded-full bg-accent"></div>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Mantra */}
        <div className="mb-12 rounded-xl border border-rule bg-surface-2 p-7 text-center sm:p-8 animate-in fade-in duration-700" key={`mantra-${role}`}>
          <div className="mb-1.5 text-[18px] font-bold italic text-ink">
            {data.mantra.quote}
          </div>
          <div className="text-[12px] font-semibold uppercase tracking-[0.5px] text-ink-3">
            {data.mantra.author}
          </div>
        </div>

        {/* CTA Band */}
        <div className="flex flex-col items-center justify-between gap-6 rounded-[14px] bg-brand-dark px-8 py-10 md:flex-row md:px-11 animate-in fade-in duration-700" key={`cta-${role}`}>
          <div className="text-center md:text-left">
            <div className="mb-1.5 text-[20px] font-black text-white">
              {data.cta.title}
            </div>
            <div className="text-[14px] text-ink-3">
              {data.cta.subtitle}
            </div>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row md:ml-10">
            <Link
              href={role === "lender" ? "/marketplace" : "/borrower/lenders"}
              className="whitespace-nowrap rounded-[7px] border border-white/20 bg-transparent px-6 py-[13px] text-center text-[14px] font-semibold text-white transition-colors hover:border-white/50"
            >
              {data.cta.btnGhost}
            </Link>
            <Link
              href="/register"
              className="whitespace-nowrap rounded-[7px] bg-accent px-7 py-[13px] text-center text-[14px] font-bold text-white transition-colors hover:bg-[#524ddb]"
            >
              {data.cta.btnPrimary}
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}