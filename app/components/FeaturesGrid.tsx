"use client";

import { useSite } from "./SiteShell";

export default function FeaturesGrid() {
  const { t } = useSite();
  const f = t.featuresGrid;

  return (
    <section id="features" className="mx-auto max-w-[1100px] px-6 py-24 lg:px-14">
      <div className="mb-3.5 text-xs font-bold uppercase tracking-widest text-accent">
        {f.eyebrow}
      </div>
      <h2 className="mb-14 max-w-[500px] text-[44px] font-black leading-[1.1] tracking-[-1.5px] text-ink">
        {f.title}
      </h2>
      <div className="grid overflow-hidden rounded-2xl border border-rule bg-rule gap-[2px] sm:grid-cols-2">
        {f.items.map((item, i) => (
          <div key={i} className="bg-bg p-10">
            <div className="mb-5 text-[11px] font-bold tracking-widest text-ink-3">
              {item.label}
            </div>
            <h3 className="mb-2.5 text-xl font-extrabold tracking-tight text-ink">
              {item.title}
            </h3>
            <p className="text-[15px] leading-relaxed text-ink-2">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}