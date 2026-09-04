"use client";

import { useSite } from "../layout/SiteShell";

export default function BeforeAfter() {
  const { t } = useSite();
  const b = t.beforeAfter;

  return (
    <section className="bg-bg px-6 py-20 lg:px-14">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-4 text-center text-xs font-bold uppercase tracking-widest text-accent">
          {b.eyebrow}
        </div>
        <h2 className="mb-12 text-center text-[40px] font-black leading-tight tracking-[-1.5px] text-ink">
          {b.title}
        </h2>

        <div className="grid grid-cols-1 gap-7 lg:grid-cols-2">
          {/* ANTES */}
          <div className="overflow-hidden rounded-2xl border-2 border-red-100 dark:border-red-900/40">
            <div className="flex items-center gap-2.5 bg-red-500 px-6 py-3.5">
              <span className="text-lg">{b.before.icon}</span>
              <span className="text-base font-extrabold text-white">{b.before.badge}</span>
            </div>
            <img src="/pml_before.png" alt="Stressed investor without PML" className="block w-full" />
            <div className="bg-red-50 p-6 dark:bg-red-950/20">
              <ul className="flex flex-col gap-3">
                {b.before.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[14px] text-ink-2">
                    <span className="mt-[2px] font-extrabold text-red-500">✗</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* DESPUES */}
          <div className="overflow-hidden rounded-2xl border-2 border-green-200 dark:border-green-900/40">
            <div className="flex items-center gap-2.5 bg-green-600 px-6 py-3.5">
              <span className="text-lg">{b.after.icon}</span>
              <span className="text-base font-extrabold text-white">{b.after.badge}</span>
            </div>
            <img src="/pml_after.png" alt="Organized investor with PML" className="block w-full" />
            <div className="bg-green-50 p-6 dark:bg-green-950/20">
              <ul className="flex flex-col gap-3">
                {b.after.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[14px] text-ink-2">
                    <span className="mt-[2px] font-extrabold text-green-600">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}