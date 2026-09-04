"use client";

import { useSite } from "../layout/SiteShell";

export default function Marketplace() {
  const { t } = useSite();
  const c = t.comingSoon;

  return (
    <section className="bg-[#f8faff] px-6 py-20 dark:bg-surface-2 lg:px-14">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-4 text-center text-xs font-bold uppercase tracking-widest text-accent">
          {c.eyebrow}
        </div>
        <h2 className="mb-4 text-center text-[44px] font-black leading-tight tracking-[-1.5px] text-ink">
          {c.title1} <em className="not-italic text-accent">{c.title2}</em>
        </h2>
        <p className="mx-auto mb-10 max-w-[640px] text-center text-[18px] text-ink-2">
          {c.desc}
        </p>

        <div className="grid grid-cols-1 gap-7 lg:grid-cols-2">
          {/* Tarjeta 1: Para Prestamistas */}
          <div className="rounded-[14px] border border-blue-200 bg-bg p-8 dark:border-blue-900/40">
            <div className="mb-2.5 text-[11px] font-extrabold uppercase tracking-widest text-accent">
              {c.card1.eyebrow}
            </div>
            <h3 className="mb-3 text-[20px] font-black tracking-[-0.3px] text-ink">
              {c.card1.title}
            </h3>
            <p className="mb-4 text-[15px] leading-relaxed text-ink-2">
              {c.card1.desc}
            </p>
            <ul className="flex flex-col gap-2.5">
              {c.card1.points.map((point, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[14px] text-ink-2">
                  <span className="font-extrabold text-accent">→</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tarjeta 2: Perfiles PML */}
          <div className="rounded-[14px] bg-[#0a0a0a] p-8">
            <div className="mb-2.5 text-[11px] font-extrabold uppercase tracking-widest text-blue-400">
              {c.card2.eyebrow}
            </div>
            <h3 className="mb-3 text-[20px] font-black tracking-[-0.3px] text-white">
              {c.card2.title}
            </h3>
            <p className="mb-5 text-[14px] leading-relaxed text-gray-400">
              {c.card2.desc}
            </p>

            {/* Stats Prestatario */}
            <div className="mb-2 text-[10px] font-extrabold uppercase tracking-widest text-blue-400">
              {c.card2.borrowerLabel}
            </div>
            <div className="mb-4 flex flex-col gap-2">
              {c.card2.borrowerStats.map((stat, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg bg-[#141414] px-4 py-3">
                  <div className="text-[12px] text-gray-400">{stat.label}</div>
                  <div className={`text-[15px] font-extrabold ${i === 1 ? 'text-green-400' : i === 3 ? 'text-amber text-[17px]' : 'text-white'}`}>
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Stats Prestamista */}
            <div className="mb-2 text-[10px] font-extrabold uppercase tracking-widest text-amber">
              {c.card2.lenderLabel}
            </div>
            <div className="flex flex-col gap-2">
              {c.card2.lenderStats.map((stat, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg bg-[#141414] px-4 py-3">
                  <div className="text-[12px] text-gray-400">{stat.label}</div>
                  <div className={`text-[15px] font-extrabold ${i === 2 ? 'text-green-400' : i === 3 ? 'text-amber text-[17px]' : 'text-white'}`}>
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}