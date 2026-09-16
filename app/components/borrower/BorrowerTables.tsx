"use client";

import Link from "next/link";
import { useSite } from "@/app/components/layout/SiteShell";

// Helpers locales para formateo
const formatCurrency = (amount: number | string | null | undefined) => {
  if (amount == null) return "N/D";
  return Number(amount).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 });
};

const formatDate = (dateString: string | undefined, lang: string) => {
  if (!dateString) return "N/D";
  return new Date(dateString).toLocaleDateString(lang === "es" ? "es-MX" : "en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });
};

export function NeedFundingTable({ data }: { data: any[] }) {
  const { t } = useSite();
  const d = t.dashboardBorrower;
  
  return (
    <section>
      <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-ink-3">{d.needFunding}</h2>
      <div className="overflow-x-auto rounded-xl border border-rule bg-surface shadow-sm">
        <table className="w-full text-left text-[14px]">
          <thead className="border-b border-rule bg-surface-2">
            <tr>
              <th className="px-4 py-3 font-bold text-ink-3">{d.tableHeaders?.property}</th>
              <th className="px-4 py-3 font-bold text-ink-3">{d.tableHeaders?.amount}</th>
              <th className="px-4 py-3 font-bold text-ink-3">{d.tableHeaders?.status}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-rule text-ink-2">
            {data.length === 0 ? (
              <tr><td colSpan={3} className="px-4 py-6 text-center text-ink-3">{d.emptyNeedFunding}</td></tr>
            ) : (
              data.map((nf) => (
                <tr key={nf.id} className="transition-colors hover:bg-surface-2">
                  <td className="px-4 py-3 font-medium text-ink">{nf.property.addressLine1}</td>
                  <td className="px-4 py-3 font-mono font-bold text-accent">{formatCurrency(nf.totalLoanAmountRequested)}</td>
                  <td className="px-4 py-3 text-[11px] uppercase tracking-wider text-ink-3">{nf.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function LoanApprovedTable({ data }: { data: any[] }) {
  const { t } = useSite();
  const d = t.dashboardBorrower;
  
  return (
    <section>
      <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-ink-3">{d.loanApproved}</h2>
      <div className="overflow-x-auto rounded-xl border border-rule bg-surface shadow-sm">
        <table className="w-full text-left text-[14px]">
          <thead className="border-b border-rule bg-surface-2">
            <tr>
              <th className="px-4 py-3 font-bold text-ink-3">{d.tableHeaders?.property}</th>
              <th className="px-4 py-3 font-bold text-ink-3">{d.tableHeaders?.lender}</th>
              <th className="px-4 py-3 font-bold text-ink-3">{d.tableHeaders?.status}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-rule text-ink-2">
            {data.length === 0 ? (
              <tr><td colSpan={3} className="px-4 py-6 text-center text-ink-3">{d.emptyApproved}</td></tr>
            ) : (
              data.map((la) => (
                <tr key={la.id} className="transition-colors hover:bg-surface-2">
                  <td className="px-4 py-3">
                    <div className="font-medium text-ink">{la.property.addressLine1}</div>
                    <div className="font-mono text-[11px] font-bold text-ink-3">{formatCurrency(la.currentTerms?.principalAmount)}</div>
                  </td>
                  <td className="px-4 py-3 text-sm">{la.lenderCompany?.companyName || d.lenderFallback}</td>
                  <td className="px-4 py-3">
                    <Link href={`/contracts/${la.id}/commitment`} className="inline-flex rounded-[4px] border border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700 hover:underline">
                      {d.reviewCommitment} &rarr;
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function CurrentLoansTable({ data }: { data: any[] }) {
  const { t, lang } = useSite();
  const d = t.dashboardBorrower;

  return (
    <section>
      <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-ink-3">{d.currentLoans}</h2>
      <div className="overflow-x-auto rounded-xl border border-rule bg-surface shadow-sm">
        <table className="w-full text-left text-[14px]">
          <thead className="border-b border-rule bg-surface-2">
            <tr>
              <th className="px-4 py-3 font-bold text-ink-3">{d.tableHeaders?.property}</th>
              <th className="px-4 py-3 font-bold text-ink-3">{d.tableHeaders?.amount}</th>
              <th className="px-4 py-3 font-bold text-ink-3">{d.tableHeaders?.date}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-rule text-ink-2">
            {data.length === 0 ? (
              <tr><td colSpan={3} className="px-4 py-6 text-center text-ink-3">{d.emptyActive}</td></tr>
            ) : (
              data.map((cl) => (
                <tr key={cl.id} className="transition-colors hover:bg-surface-2">
                  <td className="px-4 py-3">
                    <Link href={`/contracts/${cl.id}`} className="font-medium text-ink hover:underline">{cl.property.addressLine1}</Link>
                    <div className="text-[11px] text-ink-3">{cl.lenderCompany?.companyName || d.lenderFallback}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className={`font-mono font-bold ${cl.status === "DELINQUENT" ? "text-red-500" : "text-ink"}`}>
                      {formatCurrency(cl.currentPrincipalBalance || cl.currentTerms?.principalAmount)}
                    </div>
                    <div className="text-[11px] font-bold text-accent">{Number(cl.currentTerms?.interestRate || 0)}%</div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className={cl.status === "DELINQUENT" ? "rounded bg-red-500/10 px-2 py-1 font-bold text-red-500" : ""}>
                      {cl.status === "DELINQUENT" ? "Atrasado" : formatDate(cl.nextPaymentDueDate, lang)}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function CompletedLoansList({ data, onRateLender }: { data: any[], onRateLender: (lenderName: string) => void }) {
  const { t, lang } = useSite();
  const d = t.dashboardBorrower;

  return (
    <section>
      <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-ink-3">{d.completedLoans}</h2>
      <div className="overflow-hidden rounded-xl border border-rule bg-surface p-2 shadow-sm">
        {data.length === 0 ? (
          <div className="p-6 text-center text-sm text-ink-3">{d.emptyCompleted}</div>
        ) : (
          data.map(loan => (
            <div key={loan.id} className="mb-2 flex flex-col justify-between gap-4 rounded-lg border border-rule bg-surface-2 p-4 last:mb-0 sm:flex-row sm:items-center">
              <div>
                <div className="text-sm font-bold text-ink">{loan.property.addressLine1}</div>
                <div className="text-xs text-ink-3">{d.paidOff} {formatDate(loan.paidOffAt, lang)} | {loan.lenderCompany?.companyName || d.lenderFallback}</div>
              </div>
              <button
                onClick={() => onRateLender(loan.lenderCompany?.companyName || "")}
                className="shrink-0 rounded-lg bg-ink px-4 py-2 text-xs font-bold text-bg hover:opacity-90"
              >
                {t.rateLender?.title || "Calificar"}
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}