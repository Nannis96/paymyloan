"use client";

import { useSite } from "./SiteShell";

export default function PmlHero() {
  const { t, lang } = useSite();
  const h = t.pmlHero;

  return (
    <section className="mx-auto max-w-[1100px] px-6 pt-20 pb-24 lg:px-14 lg:pt-28 lg:pb-32">
      <div className="mb-7 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3.5 py-1.5 text-[13px] font-semibold text-accent">
        <span className="text-[10px]">●</span> {h.badge}
      </div>
      <p className="mb-4 text-[13px] font-bold tracking-[0.3px] text-accent">
        {h.subtitle}
      </p>
      <h1 className="mb-6 max-w-[800px] text-[clamp(40px,6vw,68px)] font-black leading-none tracking-tight text-ink">
        {h.title1}<br />{h.title2.replace("payoff.", "").replace("al pago final.", "")} <em className="not-italic text-accent">{lang === "es" ? "pago final." : "payoff."}</em><br />{h.title3}
      </h1>
      <p className="-mt-2 mb-10 text-[13px] font-medium text-ink-3">
        {h.by}
      </p>
      <p className="mb-10 max-w-[560px] text-xl font-normal leading-relaxed text-ink-2">
        {h.desc}
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <a 
          href="#early-access" 
          className="rounded-[10px] bg-accent px-8 py-4 text-base font-bold text-accent-ink no-underline transition-opacity hover:opacity-90"
        >
          {h.cta1}
        </a>
        <a 
          href="#how" 
          className="flex items-center gap-1.5 text-[15px] font-semibold text-ink no-underline hover:opacity-80"
        >
          {h.cta2} <span>→</span>
        </a>
      </div>
    </section>
  );
}