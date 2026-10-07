"use client";

import { useSite } from "@/app/components/layout/SiteShell";
import LangToggle from "@/app/components/ambos/LangToggle";
import ThemeToggle from "@/app/components/ambos/ThemeToggle";

export default function FeeAgreementView() {
  const { t } = useSite();
  const fa = t.feeAgreement;

  return (
    <div className="min-h-screen bg-bg p-8 font-sans">
      <div className="mx-auto max-w-[640px]">
        {/* Controles superiores (Idioma y Tema) */}
        <div className="mb-4 flex items-center justify-end gap-2">
          <LangToggle className="h-8 min-w-8 rounded-md border border-rule-strong bg-surface px-2 text-xs font-bold text-ink-2 transition-colors hover:border-accent hover:text-accent" />
          <ThemeToggle className="h-8 w-8 rounded-md border border-rule-strong bg-surface text-ink-2 transition-colors hover:border-accent hover:text-accent" iconSize={14} />
        </div>

        {/* Contenedor del Documento */}
        <div className="overflow-hidden rounded-[10px] border border-rule bg-surface shadow-sm">
          
          {/* Header */}
          <div className="flex items-center justify-between bg-brand-dark px-10 py-6">
            <div className="text-[18px] font-black tracking-[-0.3px] text-white">
              PayMy<span className="text-accent">Loan</span>.ai
            </div>
            <div className="text-[10px] font-bold uppercase tracking-[0.8px] text-ink-3">
              {fa.docType}
            </div>
          </div>

          {/* Body */}
          <div className="px-10 py-9">
            <h1 className="mb-1 text-[19px] font-black tracking-[-0.3px] text-ink">
              {fa.title}
            </h1>
            <p className="mb-7 text-[12px] leading-[1.6] text-ink-3">
              {fa.subtitle}
            </p>

            {/* Seccion: Borrower */}
            <div className="mb-6">
              <h2 className="mb-3 border-b-2 border-accent-soft pb-[5px] text-[10px] font-bold uppercase tracking-[0.7px] text-accent">
                {fa.sections.borrower}
              </h2>
              <div className="grid grid-cols-2 gap-2.5">
                <div className="rounded-[7px] bg-bg px-3.5 py-2.5">
                  <div className="mb-[3px] text-[10px] font-bold uppercase tracking-[0.4px] text-ink-3">{fa.borrower.entity}</div>
                  <div className="text-[13px] font-bold text-ink">Memphis Realty LLC</div>
                </div>
                <div className="rounded-[7px] bg-bg px-3.5 py-2.5">
                  <div className="mb-[3px] text-[10px] font-bold uppercase tracking-[0.4px] text-ink-3">{fa.borrower.sig}</div>
                  <div className="text-[13px] font-bold text-ink">Marcus Johnson</div>
                </div>
                <div className="col-span-2 rounded-[7px] bg-bg px-3.5 py-2.5">
                  <div className="mb-[3px] text-[10px] font-bold uppercase tracking-[0.4px] text-ink-3">{fa.borrower.address}</div>
                  <div className="text-[13px] font-bold text-ink">3802 University Cove, Memphis, TN 38127</div>
                </div>
                <div className="rounded-[7px] bg-bg px-3.5 py-2.5">
                  <div className="mb-[3px] text-[10px] font-bold uppercase tracking-[0.4px] text-ink-3">{fa.borrower.date}</div>
                  <div className="text-[13px] font-bold text-ink">September 21, 2026</div>
                </div>
                <div className="rounded-[7px] bg-bg px-3.5 py-2.5">
                  <div className="mb-[3px] text-[10px] font-bold uppercase tracking-[0.4px] text-ink-3">{fa.borrower.dealId}</div>
                  <div className="text-[13px] font-bold text-ink">PML-2026-09-21-3802UCOVE</div>
                </div>
              </div>
            </div>

            {/* Seccion: Platform Fees */}
            <div className="mb-6">
              <h2 className="mb-3 border-b-2 border-accent-soft pb-[5px] text-[10px] font-bold uppercase tracking-[0.7px] text-accent">
                {fa.sections.platformFees}
              </h2>
              <p className="mb-2.5 text-[13px] leading-[1.9] text-ink-2">{fa.platformFees.desc1}</p>
              <p className="mb-3.5 text-[12px] leading-[1.7] text-ink-3">
                {fa.platformFees.desc2Pre}
                <strong className="text-ink">{fa.platformFees.desc2Bold}</strong>
                {fa.platformFees.desc2Post}
              </p>

              <table className="mb-2 w-full border-collapse text-left">
                <thead>
                  <tr>
                    <th className="border-b border-rule bg-bg px-3 py-2 text-[10px] font-bold uppercase tracking-[0.5px] text-ink-3">{fa.platformFees.table.fee}</th>
                    <th className="border-b border-rule bg-bg px-3 py-2 text-[10px] font-bold uppercase tracking-[0.5px] text-ink-3">{fa.platformFees.table.amount}</th>
                    <th className="border-b border-rule bg-bg px-3 py-2 text-[10px] font-bold uppercase tracking-[0.5px] text-ink-3">{fa.platformFees.table.when}</th>
                  </tr>
                </thead>
                <tbody>
                  {fa.platformFees.items.map((item: any, idx: number) => (
                    <tr key={idx} className="border-b border-bg last:border-none">
                      <td className="px-3 py-2.5 text-[13px] font-semibold text-ink">{item.name}</td>
                      <td className="px-3 py-2.5 text-right text-[13px] font-bold text-ink">{item.amt}</td>
                      <td className="px-3 py-2.5 text-[12px] text-ink-3">{item.when}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-1 flex items-center justify-between border-t-2 border-brand-dark px-3 py-3">
                <span className="text-[14px] font-black text-ink">{fa.platformFees.totalDue}</span>
                <span className="text-[20px] font-black text-ink">{fa.platformFees.totalAmt}</span>
              </div>
              
              <p className="mt-2.5 text-[12px] leading-[1.7] text-ink-3">
                {fa.platformFees.note}
              </p>
            </div>

            {/* Seccion: Authorization */}
            <div className="mb-6">
              <h2 className="mb-3 border-b-2 border-accent-soft pb-[5px] text-[10px] font-bold uppercase tracking-[0.7px] text-accent">
                {fa.sections.auth}
              </h2>
              <p className="mb-2.5 text-[13px] leading-[1.9] text-ink-2">{fa.auth.desc1}</p>
              {fa.auth.items.map((item: string, idx: number) => (
                <p key={idx} className="mb-2.5 text-[13px] leading-[1.9] text-ink-2">{item}</p>
              ))}
              <p className="mb-2.5 text-[13px] leading-[1.9] text-ink-2">{fa.auth.desc2}</p>
            </div>

            {/* Seccion: Acknowledgments */}
            <div className="mb-6">
              <h2 className="mb-3 border-b-2 border-accent-soft pb-[5px] text-[10px] font-bold uppercase tracking-[0.7px] text-accent">
                {fa.sections.ack}
              </h2>
              <div className="mb-4 rounded-lg border-[1.5px] border-rule bg-bg px-4 py-3.5">
                {fa.ack.items.map((item: string, idx: number) => (
                  <div key={idx} className="mb-2.5 flex items-start gap-3 last:mb-0">
                    <div className="mt-[1px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[4px] border-2 border-accent bg-accent text-white">
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2 5.5l2.5 2.5L9 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <div className="text-[13px] leading-[1.7] text-ink" dangerouslySetInnerHTML={{ __html: item }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Seccion: Firma */}
            <div className="mt-7 border-t-2 border-rule pt-6">
              <div className="mb-4 text-[10px] font-bold uppercase tracking-[0.6px] text-ink-3">
                {fa.sig.label}
              </div>
              <div className="relative mb-1.5 h-11 border-b-[1.5px] border-brand-dark">
                <span className="absolute bottom-1.5 left-0 text-[12px] font-bold italic text-accent">
                  {fa.sig.esignedBy} Marcus Johnson
                </span>
              </div>
              <div className="text-[13px] font-bold text-ink">Marcus Johnson</div>
              <div className="text-[11px] text-ink-3">Managing Member, Memphis Realty LLC</div>
              <div className="mt-[3px] text-[11px] text-ink-3">{fa.sig.signedAt} September 21, 2026 at 1:47 PM CDT</div>
              <div className="mt-[2px] text-[10px] text-ink-3">{fa.sig.ipAndDoc} PML-FA-2026-09-21-3802UCOVE</div>
            </div>

          </div>

          {/* Controles Flotantes / Accion */}
          <div className="flex flex-col items-start justify-between border-t border-rule-strong bg-accent-soft px-10 py-5 sm:flex-row sm:items-center">
            <div className="mb-4 max-w-[340px] text-[11px] leading-[1.6] text-ink-3 sm:mb-0">
              {fa.action.note}
            </div>
            <button
              onClick={() => alert("Agreement signed. Your deal is now live.")}
              className="w-full rounded-md bg-accent px-7 py-3 font-sans text-[14px] font-bold text-white transition-colors hover:bg-blue-700 sm:w-auto"
            >
              {fa.action.btn}
            </button>
          </div>

          {/* Footer del Doc */}
          <div className="border-t border-rule bg-bg px-10 py-3.5 text-center text-[10px] leading-[1.8] text-ink-3">
            {fa.footer.gen} PML-FA-2026-09-21-3802UCOVE<br />
            {fa.footer.legal}
          </div>

        </div>
      </div>
    </div>
  );
}