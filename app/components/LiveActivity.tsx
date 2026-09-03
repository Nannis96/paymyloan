"use client";

import { useSite } from "./SiteShell";

export default function LiveActivity() {
  const { t } = useSite();
  const l = t.liveActivity;

  return (
    <section className="bg-[#0a0a0a] px-6 py-20 lg:px-14">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-3.5 text-center text-xs font-bold uppercase tracking-widest text-accent">
          {l.eyebrow}
        </div>
        <h2 className="mb-3 text-center text-[44px] font-black leading-tight tracking-[-1.5px] text-white">
          {l.title1} <em className="not-italic text-accent">{l.title2}</em>
        </h2>
        <p className="mx-auto mb-12 max-w-[520px] text-center text-[17px] text-ink-3">
          {l.desc}
        </p>

        {/* STATS ROW */}
        <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Requested */}
          <div className="rounded-2xl border-t-[3px] border-t-accent bg-[#141414] p-7 text-center">
            <div className="mb-2.5 text-[11px] font-extrabold uppercase tracking-widest text-accent">
              {l.stats.requested.label}
            </div>
            <div className="text-[48px] font-black tracking-[-2px] text-white leading-none">
              {l.stats.requested.value}
            </div>
            <div className="mt-1.5 text-xs text-ink-3">{l.stats.requested.desc}</div>
            <div className="mt-3 flex justify-center gap-1.5">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-accent"></span>
              <span className="text-[11px] font-bold text-accent">{l.stats.requested.live}</span>
            </div>
          </div>

          {/* Current */}
          <div className="rounded-2xl border-t-[3px] border-t-amber bg-[#141414] p-7 text-center">
            <div className="mb-2.5 text-[11px] font-extrabold uppercase tracking-widest text-amber">
              {l.stats.current.label}
            </div>
            <div className="text-[48px] font-black tracking-[-2px] text-white leading-none">
              {l.stats.current.value}
            </div>
            <div className="mt-1.5 text-xs text-ink-3">{l.stats.current.desc}</div>
            <div className="mt-3">
              <div className="h-1 overflow-hidden rounded-sm bg-[#222]">
                <div className="h-full w-[73%] rounded-sm bg-amber"></div>
              </div>
              <div className="mt-1 text-[10px] text-ink-3">{l.stats.current.metric}</div>
            </div>
          </div>

          {/* Closed */}
          <div className="rounded-2xl border-t-[3px] border-t-green-400 bg-[#141414] p-7 text-center">
            <div className="mb-2.5 text-[11px] font-extrabold uppercase tracking-widest text-green-400">
              {l.stats.closed.label}
            </div>
            <div className="text-[48px] font-black tracking-[-2px] text-white leading-none">
              {l.stats.closed.value}
            </div>
            <div className="mt-1.5 text-xs text-ink-3">{l.stats.closed.desc}</div>
            <div className="mt-3">
              <div className="text-[11px] font-bold text-green-400">{l.stats.closed.metric}</div>
            </div>
          </div>
        </div>

        {/* MAP PLACEHOLDER */}
        <div className="relative overflow-hidden rounded-2xl bg-[#141414] p-8">
          <div className="mb-4 text-[12px] font-extrabold uppercase tracking-widest text-ink-3">
            {l.map.title}
          </div>
          <div className="relative flex h-[280px] items-center justify-center rounded-xl bg-[#111]">
            <svg
              viewBox="0 0 960 600"
              className="h-full w-full opacity-15"
              style={{ fill: "none", stroke: "#2563eb", strokeWidth: 1.5 }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M120,180 L180,120 L280,110 L380,100 L480,95 L580,100 L680,110 L780,130 L860,160 L880,220 L870,300 L820,380 L740,440 L640,480 L540,490 L440,485 L340,470 L240,440 L160,390 L120,320 L110,250 Z" />
              <path d="M160,390 L140,480 L220,500 L260,460 L240,440 Z" />
              <path d="M120,180 L80,200 L60,280 L90,340 L120,320 Z" />
            </svg>
            
            {/* Deal dots */}
            <div className="absolute left-[55%] top-[30%] h-3 w-3 rounded-full bg-accent shadow-[0_0_12px_#2563eb]"></div>
            <div className="absolute left-[48%] top-[45%] h-2.5 w-2.5 rounded-full bg-amber shadow-[0_0_10px_#F0C000]"></div>
            <div className="absolute left-[35%] top-[38%] h-3.5 w-3.5 rounded-full bg-green-400 shadow-[0_0_14px_#4ade80]"></div>
            <div className="absolute left-[62%] top-[52%] h-2 w-2 rounded-full bg-accent shadow-[0_0_8px_#2563eb]"></div>
            <div className="absolute left-[72%] top-[28%] h-2.5 w-2.5 rounded-full bg-amber shadow-[0_0_10px_#F0C000]"></div>
            <div className="absolute left-[40%] top-[60%] h-2 w-2 rounded-full bg-green-400 shadow-[0_0_8px_#4ade80]"></div>
            <div className="absolute left-[25%] top-[42%] h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_10px_#2563eb]"></div>
            <div className="absolute left-[80%] top-[35%] h-2 w-2 rounded-full bg-green-400 shadow-[0_0_8px_#4ade80]"></div>

            {/* Legend */}
            <div className="absolute bottom-4 right-4 flex gap-3.5">
              <div className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 rounded-full bg-accent"></span>
                <span className="text-[10px] text-ink-3">{l.map.legendRequested}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 rounded-full bg-amber"></span>
                <span className="text-[10px] text-ink-3">{l.map.legendCurrent}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 rounded-full bg-green-400"></span>
                <span className="text-[10px] text-ink-3">{l.map.legendClosed}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}