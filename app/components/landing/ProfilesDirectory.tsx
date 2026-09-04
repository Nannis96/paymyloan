"use client";

import { useSite } from "../layout/SiteShell";

export default function ProfilesDirectory() {
  const { t } = useSite();
  const p = t.profilesDirectory;

  return (
    <section className="bg-surface-2 px-6 py-20 lg:px-14">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-3.5 text-center text-xs font-bold uppercase tracking-widest text-accent">
          {p.eyebrow}
        </div>
        <h2 className="mb-4 text-center text-[44px] font-black leading-[1.1] tracking-[-1.5px] text-ink">
          {p.title1} <em className="not-italic text-accent">{p.title2}</em>
        </h2>
        <p className="mx-auto mb-12 max-w-[620px] text-center text-lg text-ink-2">
          {p.desc}
        </p>
        
        <div className="grid grid-cols-1 gap-7 lg:grid-cols-2">
          {/* BORROWER PROFILE */}
          <div className="overflow-hidden rounded-2xl border border-rule shadow-sm">
            <div className="bg-[#0a0a0a] px-6 py-4">
              <div className="mb-1 text-[11px] font-extrabold uppercase tracking-widest text-blue-400">
                {p.borrower.badge}
              </div>
              <div className="text-lg font-black text-white">{p.borrower.name}</div>
              <div className="mt-0.5 text-xs text-gray-400">{p.borrower.location}</div>
            </div>
            <div className="flex flex-col gap-2.5 bg-bg p-6">
              <div className="flex items-center justify-between rounded-lg bg-surface px-4 py-3 border border-rule">
                <span className="text-[13px] text-ink-2">{p.borrower.stat1Label}</span>
                <span className="text-sm font-extrabold text-ink">{p.borrower.stat1Value}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-surface px-4 py-3 border border-rule">
                <span className="text-[13px] text-ink-2">{p.borrower.stat2Label}</span>
                <span className="text-sm font-extrabold text-green-600">{p.borrower.stat2Value}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-[#0a0a0a] px-4 py-3">
                <span className="text-[13px] text-gray-400">{p.borrower.stat3Label}</span>
                <span className="text-lg font-black text-amber">{p.borrower.stat3Value}</span>
              </div>
            </div>
          </div>

          {/* LENDER DIRECTORY */}
          <div className="overflow-hidden rounded-2xl border border-rule shadow-sm">
            <div className="bg-accent px-6 py-4">
              <div className="mb-1 text-[11px] font-extrabold uppercase tracking-widest text-blue-200">
                {p.lender.badge}
              </div>
              <div className="text-lg font-black text-white">{p.lender.title}</div>
              <div className="mt-0.5 text-xs text-blue-200">{p.lender.subtitle}</div>
            </div>
            <div className="flex flex-col gap-2.5 bg-bg p-4 px-6">
              <div className="flex items-center justify-between rounded-xl border border-rule p-3.5">
                <div>
                  <div className="text-[13px] font-extrabold text-ink">{p.lender.lender1Name}</div>
                  <div className="mt-0.5 text-[11px] text-ink-3">{p.lender.lender1Desc}</div>
                </div>
                <div className="text-right">
                  <div className="text-base font-black text-amber">A+</div>
                  <div className="text-[10px] text-ink-3">{p.lender.lender1Deals}</div>
                </div>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-rule p-3.5">
                <div>
                  <div className="text-[13px] font-extrabold text-ink">{p.lender.lender2Name}</div>
                  <div className="mt-0.5 text-[11px] text-ink-3">{p.lender.lender2Desc}</div>
                </div>
                <div className="text-right">
                  <div className="text-base font-black text-amber">A</div>
                  <div className="text-[10px] text-ink-3">{p.lender.lender2Deals}</div>
                </div>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-rule p-3.5">
                <div>
                  <div className="text-[13px] font-extrabold text-ink">{p.lender.lender3Name}</div>
                  <div className="mt-0.5 text-[11px] text-ink-3">{p.lender.lender3Desc}</div>
                </div>
                <div className="text-right">
                  <div className="text-base font-black text-blue-400">B+</div>
                  <div className="text-[10px] text-ink-3">{p.lender.lender3Deals}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
