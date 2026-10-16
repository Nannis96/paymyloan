"use client";

import { X, Check } from "lucide-react";
import { useSite } from "../layout/SiteShell";

export default function BeforeAfter() {
  const { t } = useSite();
  const b = t.beforeAfter;

  return (
    <section className="bg-bg px-6 py-20 lg:px-14">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-5 text-center text-[clamp(14px,2.5vw,22px)] font-bold uppercase tracking-widest text-accent">
          {b.eyebrow}
        </div>
        <h2 className="mb-12 text-center text-[40px] font-black leading-tight tracking-[-1.5px] text-ink">
          {b.title}
        </h2>

        <div className="overflow-hidden rounded-2xl border border-rule bg-surface shadow-sm">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b-2 border-rule bg-surface-2">
                <th className="w-1/2 border-r border-rule p-5 text-[15px] font-extrabold text-ink-2 md:p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400">
                      <X size={16} strokeWidth={3} />
                    </span>
                    {b.before.badge}
                  </div>
                </th>
                <th className="w-1/2 p-5 text-[15px] font-extrabold text-ink md:p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400">
                      <Check size={16} strokeWidth={3} />
                    </span>
                    {b.after.badge}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rule">
              {b.before.items.map((item, i) => (
                <tr key={i} className="transition-colors hover:bg-surface-2/50">
                  <td className="border-r border-rule p-5 align-top text-[14px] leading-relaxed text-ink-3 md:p-6">
                    {item}
                  </td>
                  <td className="p-5 align-top text-[14px] font-medium leading-relaxed text-ink md:p-6">
                    <div className="flex items-start gap-3">
                      <Check size={18} className="mt-0.5 shrink-0 text-accent" strokeWidth={2.5} />
                      <span>{b.after.items[i]}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}