"use client";

import { useSite } from "./SiteShell";

// Definimos los colores estéticos de Tailwind para cada tarjeta en orden
const CARD_COLORS = [
  { text: "text-accent", border: "border-t-accent" },
  { text: "text-amber", border: "border-t-amber" },
  { text: "text-purple-500", border: "border-t-purple-500" },
  { text: "text-green-600", border: "border-t-green-600" },
  { text: "text-red-500", border: "border-t-red-500" },
  { text: "text-cyan-600", border: "border-t-cyan-600" },
];

export default function WhoItHelps() {
  const { t } = useSite();
  const w = t.whoItHelps;

  return (
    <>
      <section className="bg-surface py-20 px-6 lg:px-14">
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-4 text-center text-xs font-bold uppercase tracking-widest text-accent">
            {w.eyebrow}
          </div>
          <h2 className="mb-4 text-center text-[44px] font-black leading-[1.1] tracking-[-1.5px] text-ink">
            {w.title1} <em className="not-italic text-accent">{w.title2}</em>
          </h2>
          <p className="mx-auto mb-12 max-w-[620px] text-center text-lg text-ink-2">
            {w.lead}
          </p>
          
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {w.cards.map((card, i) => {
              const color = CARD_COLORS[i % CARD_COLORS.length];
              return (
                <div key={card.role} className={`rounded-[14px] border border-rule bg-bg p-7 border-t-[3px] ${color.border}`}>
                  <div className="mb-3 text-[28px]">{card.icon}</div>
                  <div className={`mb-1.5 text-[11px] font-extrabold uppercase tracking-widest ${color.text}`}>
                    {card.role}
                  </div>
                  <h3 className="mb-2.5 text-base font-black text-ink">{card.title}</h3>
                  <ul className="flex flex-col gap-2">
                    {card.points.map((point, j) => (
                      <li key={j} className="flex gap-2 text-[13px] text-ink-2">
                        <span className={`font-extrabold ${color.text}`}>→</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Franja de Estadísticas */}
      <div className="mx-auto flex max-w-[1100px] flex-wrap justify-between gap-8 border-y border-rule px-6 py-8 lg:px-14">
        {w.stats.map((stat, i) => (
          <div key={i} className="flex flex-col gap-1">
            <div className="text-[32px] font-black tracking-tight text-ink">{stat.value}</div>
            <div className="text-[13px] font-medium text-ink-3">{stat.label}</div>
          </div>
        ))}
      </div>
    </>
  );
}