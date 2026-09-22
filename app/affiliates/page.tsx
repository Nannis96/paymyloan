"use client";

import { useState } from "react";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import { MetricCard } from "@/app/components/ui";

export default function AffiliatesPage() {
  return (
    <SiteShell isDashboard={true}>
      <AffiliatesContent />
    </SiteShell>
  );
}

function AffiliatesContent() {
  const { t } = useSite();
  const a = t.affiliates;

  const [copied, setCopied] = useState(false);

  // Mock data para UI
  const refCode = "PML-AFF-0091";
  const refUrl = `https://paymyloan.ai/portal/?ref=${refCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(refUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-[860px] pb-24 pt-6">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-1.5 text-[22px] font-bold tracking-tight text-ink">{a.title}</h1>
        <p className="text-[14px] text-ink-3">{a.subtitle}</p>
      </div>

      {/* Stats Strip */}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <MetricCard 
          label={a.metrics.totalEarned} 
          value="$795.58" 
          trendText={a.metrics.earnedSub} 
          trendUp={true} 
          accent 
        />
        <MetricCard 
          label={a.metrics.activeRef} 
          value="3" 
          subtext={a.metrics.refSub} 
        />
        <MetricCard 
          label={a.metrics.monthlyRes} 
          value="$91.16" 
          subtext={a.metrics.resSub} 
        />
        <MetricCard 
          label={a.metrics.nextPayout} 
          value="Oct 1" 
          subtext={a.metrics.payoutSub} 
        />
      </div>

      {/* Link Card */}
      <div className="mb-5 rounded-xl border border-rule bg-surface p-6 shadow-sm sm:p-7">
        <h2 className="mb-1 text-[15px] font-bold text-ink">{a.link.title}</h2>
        <p className="mb-5 text-[13px] text-ink-3">{a.link.sub}</p>
        
        <div className="mb-3 flex overflow-hidden rounded-lg border border-rule bg-surface-2 p-1">
          <input 
            type="text" 
            value={refUrl} 
            readOnly 
            className="flex-1 bg-transparent px-3 font-mono text-[13px] text-ink-2 outline-none"
          />
          <button 
            onClick={handleCopy}
            className="shrink-0 rounded-md bg-accent px-5 py-2.5 text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
          >
            {copied ? a.link.copied : a.link.copyBtn}
          </button>
        </div>
        
        <div className="text-[12px] text-ink-3">
          <strong className="font-semibold text-ink">{a.link.hint.split('{code}')[0]} {refCode}</strong>
          {a.link.hint.split('{code}')[1]}
        </div>
      </div>

      {/* How it Works Grid */}
      <div className="mb-5 rounded-xl border border-rule bg-surface p-6 shadow-sm sm:p-7">
        <h2 className="mb-1 text-[15px] font-bold text-ink">{a.how.title}</h2>
        <p className="mb-5 text-[13px] text-ink-3">{a.how.sub}</p>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {a.how.steps.map((step, idx) => (
            <div key={idx} className="rounded-lg border border-rule bg-surface-2 p-[18px]">
              <div className="mb-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-accent text-[13px] font-bold text-white">
                {idx + 1}
              </div>
              <div className="mb-1 text-[13px] font-bold text-ink">{step.title}</div>
              <div className="text-[12px] leading-relaxed text-ink-3">{step.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Earnings Table */}
      <div className="rounded-xl border border-rule bg-surface p-6 shadow-sm sm:p-7">
        <h2 className="mb-1 text-[15px] font-bold text-ink">{a.table.title}</h2>
        <p className="mb-5 text-[13px] text-ink-3">{a.table.sub}</p>
        
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px] text-left text-[13px]">
            <thead>
              <tr className="border-b border-rule">
                <th className="pb-2 text-[11px] font-semibold uppercase tracking-wider text-ink-3">{a.table.col1}</th>
                <th className="pb-2 text-[11px] font-semibold uppercase tracking-wider text-ink-3">{a.table.col2}</th>
                <th className="pb-2 text-[11px] font-semibold uppercase tracking-wider text-ink-3">{a.table.col3}</th>
                <th className="pb-2 text-[11px] font-semibold uppercase tracking-wider text-ink-3">{a.table.col4}</th>
              </tr>
            </thead>
            <tbody className="text-ink">
              {a.table.rows.map((row, idx) => (
                <tr key={idx} className="border-b border-rule last:border-0">
                  <td className="py-3">{row[0]}</td>
                  <td className="py-3">{row[1]}</td>
                  <td className="py-3 font-bold text-accent">{row[2]}</td>
                  <td className="py-3">{row[3]}</td>
                </tr>
              ))}
              <tr className="border-t border-rule bg-surface-2/50">
                <td className="py-3 font-bold text-ink">{a.table.totalRow}</td>
                <td className="py-3 font-bold text-ink">$182.33 / {t.submitDeal.financials.mo.replace('/ ', '')}</td>
                <td className="py-3 text-[14px] font-bold text-accent">$45.58 / {t.submitDeal.financials.mo.replace('/ ', '')}</td>
                <td className="py-3">Mensual</td>
              </tr>
              <tr>
                <td colSpan={2} className="pt-3 font-bold text-ink">{a.table.totalYear}</td>
                <td colSpan={2} className="pt-3 text-[14px] font-bold text-accent">~$797.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}