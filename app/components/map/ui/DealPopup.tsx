"use client";
import Link from 'next/link';

export default function DealPopup({ deal, t }: { deal: any, t: any }) {
  const typeStr = deal.projectType?.includes("FLIP") ? "Bridge" : "Slow flip";
  const arv = Number(deal.property?.afterRepairValue || 0);
  const req = Number(deal.totalLoanAmountRequested || 0);
  const ltv = arv > 0 ? Math.round((req / arv) * 100) : 0;

  const formatMoney = (val: number) => `$${val.toLocaleString("en-US")}`;
  const dc = t?.uiComponents?.dealCard;

  return (
    <div className="flex min-w-[220px] flex-col gap-2 font-sans">
      <div className="text-[10px] font-bold uppercase tracking-wider text-accent">
        {typeStr} • {dc?.ltv || "LTV"} {ltv}%
      </div>
      <h3 className="text-sm font-black text-ink m-0 leading-tight">
        {deal.property?.addressLine1 || "Ubicacion oculta"}
      </h3>
      <p className="text-xs text-ink-3 m-0">{deal.property?.city}, {deal.property?.state}</p>
      
      <div className="my-2 grid grid-cols-2 gap-2 border-y border-rule py-2">
        <div>
          <div className="text-[9px] font-bold uppercase text-ink-3">{dc?.loanRequest || "Monto"}</div>
          <div className="text-xs font-bold text-ink">{formatMoney(req)}</div>
        </div>
        <div>
          <div className="text-[9px] font-bold uppercase text-ink-3">{dc?.arv || "ARV"}</div>
          <div className="text-xs font-bold text-ink">{arv > 0 ? formatMoney(arv) : "N/D"}</div>
        </div>
      </div>
      
      <Link 
        href={`/marketplace/${deal.id}`}
        className="block w-full rounded bg-accent py-1.5 text-center text-xs font-bold text-white transition-colors hover:bg-blue-700 no-underline"
      >
        {t?.marketplace?.table?.action || "Ver Detalles"}
      </Link>
    </div>
  );
}