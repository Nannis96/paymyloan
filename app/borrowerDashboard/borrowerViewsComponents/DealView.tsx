"use client";

import { useSite } from "@/app/components/layout/SiteShell";
import LangToggle from "@/app/components/ambos/LangToggle";
import ThemeToggle from "@/app/components/ambos/ThemeToggle";
import Link from "next/link";

export default function DealView() {
  const { t } = useSite();
  const dp = t.dealPage;

  return (
    <div className="min-h-screen bg-bg font-sans">
      {/* Main Content */}
      <div className="mx-auto max-w-[800px] px-6 py-8 pb-20">
        <Link
          href="/borrowerDashboard"
          className="mb-6 inline-block text-[13px] font-semibold text-ink-3 transition-colors hover:text-accent"
        >
          {dp.back}
        </Link>

        {/* Header */}
        <div className="mb-6">
          <div className="text-[22px] font-black tracking-tight text-ink">3802 University Cove, Memphis TN 38127</div>
          <div className="mt-2 flex flex-wrap items-center gap-3.5">
            <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-bold text-accent">{dp.badges.bridge}</span>
            <span className="rounded-full bg-success-soft px-2.5 py-1 text-[11px] font-bold text-success">{dp.badges.verified}</span>
            <span className="text-xs text-ink-3">{dp.posted}</span>
          </div>
        </div>

        {/* Two Columns */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_280px]">
          
          {/* Left Column */}
          <div>
            {/* Key Numbers */}
            <div className="mb-3.5 overflow-hidden rounded-[10px] border border-rule bg-surface">
              <div className="border-b border-rule px-5 py-3.5">
                <div className="text-[13px] font-bold text-ink">{dp.cards.numbers}</div>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-3 gap-3">
                  <Metric label={dp.metrics.requested} value="$115K" valueColor="text-accent" />
                  <Metric label={dp.metrics.price} value="$85K" />
                  <Metric label={dp.metrics.rehab} value="$30K" />
                  <Metric label={dp.metrics.arv} value="$165K" />
                  <Metric label={dp.metrics.profit} value="$20K+" valueColor="text-success" />
                  <Metric label={dp.metrics.ltv} value="66.7%" valueColor="text-accent" />
                </div>
                <div className="mt-3.5 flex items-center gap-2.5">
                  <span className="w-8 text-xs font-semibold text-ink-2">LTV</span>
                  <div className="flex-1 h-2 overflow-hidden rounded-full bg-rule">
                    <div className="h-full w-[66.7%] rounded-full bg-accent"></div>
                  </div>
                  <span className="w-10 text-right text-xs font-bold text-accent">66.7%</span>
                </div>
              </div>
            </div>

            {/* Deal Details */}
            <div className="mb-3.5 overflow-hidden rounded-[10px] border border-rule bg-surface">
              <div className="border-b border-rule px-5 py-3.5">
                <div className="text-[13px] font-bold text-ink">{dp.cards.details}</div>
              </div>
              <div className="p-5">
                <DetailRow label={dp.details.typeLabel} value={dp.details.typeVal} />
                <DetailRow label={dp.details.termLabel} value={dp.details.termVal} />
                <DetailRow label={dp.details.rateLabel} value={dp.details.rateVal} />
                <DetailRow label={dp.details.propTypeLabel} value={dp.details.propTypeVal} />
                <DetailRow label={dp.details.bedsLabel} value={dp.details.bedsVal} />
                <DetailRow label={dp.details.sqftLabel} value={dp.details.sqftVal} />
                <DetailRow label={dp.details.exitLabel} value={dp.details.exitVal} />
                <DetailRow label={dp.details.holdbackLabel} value={dp.details.holdbackVal} />
                <DetailRow label={dp.details.closeLabel} value={dp.details.closeVal} />
              </div>
            </div>

            {/* Borrower */}
            <div className="mb-3.5 overflow-hidden rounded-[10px] border border-rule bg-surface">
              <div className="border-b border-rule px-5 py-3.5">
                <div className="text-[13px] font-bold text-ink">{dp.cards.borrower}</div>
              </div>
              <div className="flex items-center gap-3 p-5">
                <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-brand-dark text-sm font-bold text-white">MR</div>
                <div>
                  <div className="text-[13px] font-bold text-ink">Memphis Realty LLC</div>
                  <div className="mt-0.5 text-[11px] text-ink-3">{dp.borrower.memberSince}</div>
                  <div className="mt-1.5 flex gap-1.5">
                    <span className="rounded-lg bg-success-soft px-2 py-0.5 text-[10px] font-bold text-success">{dp.borrower.closed}</span>
                    <span className="rounded-lg bg-accent-soft px-2 py-0.5 text-[10px] font-bold text-accent">{dp.borrower.bizVerified}</span>
                    <span className="rounded-lg bg-accent-soft px-2 py-0.5 text-[10px] font-bold text-accent">{dp.borrower.idVerified}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Sticky Offer Panel) */}
          <div>
            <div className="sticky top-[68px] rounded-[10px] border border-rule bg-surface p-5">
              <div className="mb-1 text-sm font-black text-ink">{dp.offer.title}</div>
              <div className="mb-4 text-xs text-ink-3">{dp.offer.sub}</div>
              <OfferRow label={dp.metrics.requested} value="$115,000" />
              <OfferRow label={dp.metrics.arv} value="$165,000" />
              <OfferRow label={dp.metrics.ltv} value="66.7%" />
              <OfferRow label={dp.offer.maxRateLabel} value="14%" />
              <OfferRow label={dp.offer.termLabel} value="12 months" />
              
              <button 
                onClick={() => alert("Opening offer form...")}
                className="mt-4 w-full cursor-pointer rounded-md bg-accent p-3 text-sm font-bold text-white transition-colors hover:bg-blue-700"
              >
                {dp.offer.makeOffer}
              </button>
              <button className="mt-2 w-full cursor-pointer rounded-md border border-rule bg-surface p-[9px] text-[13px] font-semibold text-ink-2 transition-colors hover:bg-surface-2">
                {dp.offer.saveDeal}
              </button>
              <div className="mt-2.5 text-center text-[11px] text-ink-3">{dp.offer.count}</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// Helpers para mantener el código limpio
function Metric({ label, value, valueColor = "text-ink" }: { label: string; value: string; valueColor?: string }) {
  return (
    <div className="rounded-lg border border-rule bg-surface-2 px-3.5 py-3">
      <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.5px] text-ink-3">{label}</div>
      <div className={`text-[18px] font-black ${valueColor}`}>{value}</div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-surface-2 py-[7px] text-[13px] last:border-0">
      <span className="text-ink-3">{label}</span>
      <span className="font-semibold text-ink">{value}</span>
    </div>
  );
}

function OfferRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-surface-2 py-1.5 text-[13px] last:mb-0 last:border-0">
      <span className="text-ink-3">{label}</span>
      <span className="font-bold text-ink">{value}</span>
    </div>
  );
}