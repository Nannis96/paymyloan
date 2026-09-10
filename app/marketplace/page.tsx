"use client";

import Link from "next/link";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import { useState } from "react";

function MarketplaceContent() {
  const { t } = useSite();
  const m = t.marketplace;

  // TODO: BACKEND - Esto se sustituira por un GET a la API que devuelva los deals "publicos".
  // La direccion exacta debe venir ofuscada desde el backend (ej. "Austin, TX" en lugar de "123 Main St").
  const [deals] = useState([
    {
      id: "deal_001",
      location: "Austin, TX",
      amount: "$250,000",
      term: "12 meses",
      borrowerScore: "A+",
      type: "Fix & Flip"
    },
    {
      id: "deal_002",
      location: "Memphis, TN",
      amount: "$85,000",
      term: "24 meses",
      borrowerScore: "B+",
      type: "Rental"
    }
  ]);

  return (
    <div className="min-h-screen bg-bg p-6 lg:p-14">
      <div className="mx-auto max-w-[1100px]">
        <header className="mb-10">
          <h1 className="text-[32px] font-black tracking-tight text-ink">{m.title}</h1>
          <p className="text-ink-2">{m.subtitle}</p>
        </header>

        <div className="overflow-x-auto rounded-xl border border-rule bg-surface shadow-sm">
          <table className="w-full min-w-[800px] border-collapse text-left text-[14px]">
            <thead className="border-b border-rule bg-surface-2">
              <tr>
                <th className="px-5 py-4 font-bold text-ink-3">{m.table.address}</th>
                <th className="px-5 py-4 font-bold text-ink-3">{m.table.amount}</th>
                <th className="px-5 py-4 font-bold text-ink-3">{m.table.term}</th>
                <th className="px-5 py-4 font-bold text-ink-3">{m.table.borrowerScore}</th>
                <th className="px-5 py-4 font-bold text-ink-3"></th>
              </tr>
            </thead>
            <tbody className="text-ink-2">
              {deals.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-ink-3">
                    {m.empty}
                  </td>
                </tr>
              ) : (
                deals.map((deal) => (
                  <tr key={deal.id} className="border-b border-rule hover:bg-surface-2 transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-bold text-ink">{deal.location}</div>
                      <div className="text-xs text-ink-3">{deal.type}</div>
                    </td>
                    <td className="px-5 py-4 font-mono font-bold text-accent">{deal.amount}</td>
                    <td className="px-5 py-4">{deal.term}</td>
                    <td className="px-5 py-4">
                      <span className="inline-flex rounded-[4px] border border-amber/30 bg-amber-soft px-2.5 py-1 text-xs font-bold text-amber">
                        {deal.borrowerScore}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Link href={`/marketplace/${deal.id}`} className="inline-flex items-center justify-center rounded-lg bg-ink px-4 py-2 text-xs font-bold text-bg transition-opacity hover:opacity-90">
                        {m.table.action} &rarr;
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function MarketplacePage() {
  return (
    <SiteShell isDashboard={true}>
      <MarketplaceContent />
    </SiteShell>
  );
}