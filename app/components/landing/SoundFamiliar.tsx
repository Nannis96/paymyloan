"use client";

import { useSite } from "../layout/SiteShell";

export default function SoundFamiliar() {
  const { t } = useSite();
  const s = t.soundFamiliar;

  return (
    <section className="bg-surface-2 px-6 py-20 lg:px-14">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-3.5 text-xs font-bold uppercase tracking-widest text-accent">
          {s.eyebrow}
        </div>
        <h2 className="mb-12 max-w-[600px] text-[44px] font-black leading-tight tracking-[-1.5px] text-ink">
          {s.title}
        </h2>
        
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {s.cards.map((card, i) => (
            <div key={i} className="rounded-xl border border-rule bg-bg p-7 border-l-[4px] border-l-crit">
              <div className="mb-2 text-[11px] font-bold uppercase tracking-widest text-accent">
                {card.role}
              </div>
              <div className="mb-3 text-[24px]">{card.icon}</div>
              <h3 className="mb-2 text-[17px] font-extrabold text-ink">{card.title}</h3>
              <p className="text-[14px] leading-relaxed text-ink-2">{card.desc}</p>
            </div>
          ))}
          
          {/* Tarjeta final de solucion */}
          <div className="rounded-xl border border-rule bg-bg p-7 border-l-[4px] border-l-accent">
            <div className="mb-3 text-[24px]">{s.solution.icon}</div>
            <h3 className="mb-2 text-[17px] font-extrabold text-accent">{s.solution.title}</h3>
            <p className="text-[14px] leading-relaxed text-ink-2">{s.solution.desc}</p>
          </div>
        </div>
      </div>
    </section>
  );
}