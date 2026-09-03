"use client";

import { useSite } from "./SiteShell";

export default function DashboardSplit() {
  const { t } = useSite();
  const d = t.dashboardSplit;

  return (
    <section id="how" className="mx-auto grid max-w-[1100px] grid-cols-1 items-center gap-12 px-6 py-24 lg:grid-cols-2 lg:gap-20 lg:px-14">
      <div className="flex flex-col">
        <div className="mb-3.5 text-xs font-bold uppercase tracking-widest text-accent">
          {d.eyebrow}
        </div>
        <h2 className="mb-5 text-[42px] font-black leading-[1.1] tracking-[-1.5px] text-ink">
          {d.title}
        </h2>
        <p className="mb-4 text-base leading-relaxed text-ink-2">
          {d.desc1}
        </p>
        <p className="text-base leading-relaxed text-ink-2">
          {d.desc2}
        </p>
      </div>
      <div className="flex min-h-[380px] flex-col justify-between rounded-2xl bg-[#0a0a0a] p-8 shadow-xl lg:p-10">
        <div className="mb-7 flex items-center justify-between">
          <div className="text-sm font-bold text-white">{d.mockLogo}</div>
          <div className="rounded-full bg-[#1a3a6b] px-3 py-1 text-[11px] font-semibold text-blue-400">
            {d.mockBadge}
          </div>
        </div>
        <div className="mb-3 rounded-lg bg-[#141414] p-5">
          <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
            {d.mockCard1Label}
          </div>
          <div className="text-[26px] font-black tracking-[-0.5px] text-white">
            {d.mockCard1Value}
          </div>
          <div className="mt-1 text-xs text-blue-400">
            {d.mockCard1Sub}
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex-1 rounded-lg bg-[#141414] p-5">
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              {d.mockCard2Label}
            </div>
            <div className="text-[20px] font-black text-white">{d.mockCard2Value}</div>
          </div>
          <div className="flex-1 rounded-lg bg-[#141414] p-5">
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              {d.mockCard3Label}
            </div>
            <div className="text-[20px] font-black text-blue-400">{d.mockCard3Value}</div>
          </div>
        </div>
      </div>
    </section>
  );
}