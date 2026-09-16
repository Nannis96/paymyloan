"use client";

import Link from "next/link";
import { useSite } from "@/app/components/layout/SiteShell";

const formatCurrency = (amount: number | string | null | undefined) => {
  if (amount == null) return "N/D";
  return Number(amount).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 });
};

const formatDate = (dateString: string | undefined, lang: string) => {
  if (!dateString) return "N/D";
  return new Date(dateString).toLocaleDateString(lang === "es" ? "es-MX" : "en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });
};

const getPrimaryBorrowerName = (borrowers: any[], d: any) => {
  if (!borrowers || borrowers.length === 0) return d.unassigned;
  const primary = borrowers.find((b: any) => b.isPrimary) || borrowers[0];
  return primary?.borrowerProfile?.user?.name || d.borrowerFallback;
};

export function CommitmentLettersTable({ data }: { data: any[] }) {
  const { t } = useSite();
  const d = t.dashboardLender;
  
  return (
    <section>
      <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-ink-3">{d.sections.commitmentLetters}</h2>
      <div className="overflow-x-auto rounded-xl border border-rule bg-surface shadow-sm">
        <table className="w-full text-left text-[14px]">
          <thead className="border-b border-rule bg-surface-2">
            <tr>
              <th className="px-4 py-3 font-bold text-ink-3">{d.tableHeaders.borrower}</th>
              <th className="px-4 py-3 font-bold text-ink-3">{d.tableHeaders.amount}</th>
              <th className="px-4 py-3 font-bold text-ink-3">{d.tableHeaders.status}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-rule text-ink-2">
            {data.length === 0 ? (
              <tr><td colSpan={3} className="px-4 py-6 text-center text-ink-3">{d.emptyCommitments}</td></tr>
            ) : (
              data.map((cl) => (
                <tr key={cl.id} className="transition-colors hover:bg-surface-2">
                  <td className="px-4 py-3">
                    <Link href={`/contracts/${cl.id}`} className="font-medium text-ink hover:underline">
                      {getPrimaryBorrowerName(cl.borrowers, d)}
                    </Link>
                    <div className="text-[11px] text-ink-3">{cl.property.addressLine1}</div>
                  </td>
                  <td className="px-4 py-3 font-mono font-bold">{formatCurrency(cl.currentTerms?.principalAmount)}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-[4px] border px-2 py-0.5 text-[10px] font-bold ${cl.status === 'PENDING_ACCEPTANCE' ? 'border-amber/30 bg-amber-soft text-amber' : 'border-gray-200 bg-gray-100 text-gray-700'}`}>
                      {cl.status}
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

export function UpcomingClosingsTable({ data }: { data: any[] }) {
  const { t } = useSite();
  const d = t.dashboardLender;
  return (
    <section>
      <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-ink-3">{d.sections.upcomingClosings}</h2>
      <div className="overflow-x-auto rounded-xl border border-rule bg-surface shadow-sm">
        <table className="w-full text-left text-[14px]">
          <thead className="border-b border-rule bg-surface-2">
            <tr>
              <th className="px-4 py-3 font-bold text-ink-3">{d.tableHeaders.type}</th>
              <th className="px-4 py-3 font-bold text-ink-3">{d.tableHeaders.date}</th>
              <th className="px-4 py-3 font-bold text-ink-3">{d.tableHeaders.action}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-rule text-ink-2">
            <tr><td colSpan={3} className="px-4 py-6 text-center text-ink-3">{d.emptyClosings}</td></tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function ActiveLoansTable({ data }: { data: any[] }) {
  const { t } = useSite();
  const d = t.dashboardLender;
  
  return (
    <section>
      <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-ink-3">{d.sections.activeLoans}</h2>
      <div className="overflow-x-auto rounded-xl border border-rule bg-surface shadow-sm">
        <table className="w-full text-left text-[14px]">
          <thead className="border-b border-rule bg-surface-2">
            <tr>
              <th className="px-4 py-3 font-bold text-ink-3">{d.tableHeaders.loan}</th>
              <th className="px-4 py-3 font-bold text-ink-3">{d.tableHeaders.rateBalance}</th>
              <th className="px-4 py-3 font-bold text-ink-3">{d.tableHeaders.status}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-rule text-ink-2">
            {data.length === 0 ? (
              <tr><td colSpan={3} className="px-4 py-6 text-center text-ink-3">{d.emptyLoans}</td></tr>
            ) : (
              data.map((al) => (
                <tr key={al.id} className="transition-colors hover:bg-surface-2">
                  <td className="px-4 py-3">
                    <Link href={`/contracts/${al.id}`} className="font-medium text-ink hover:underline">
                      {getPrimaryBorrowerName(al.borrowers, d)}
                    </Link>
                    <div className="text-[11px] text-ink-3">{al.property.addressLine1}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-bold text-accent">{Number(al.currentTerms?.interestRate || 0)}%</div>
                    <div className="font-mono text-xs text-ink-3">{formatCurrency(al.currentPrincipalBalance || al.currentTerms?.principalAmount)}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-[4px] border px-2 py-0.5 text-[10px] font-bold ${al.status === 'ACTIVE' ? 'border-green-200 bg-green-50 text-green-700 dark:border-green-900/40 dark:bg-green-900/10 dark:text-green-400' : 'border-red-200 bg-red-50 text-red-700'}`}>
                      {al.status}
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

export function RecentPaymentsTable({ data }: { data: any[] }) {
  const { t } = useSite();
  const d = t.dashboardLender;
  
  return (
    <section>
      <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-ink-3">{d.recentPayments}</h2>
      <div className="overflow-x-auto rounded-xl border border-rule bg-surface shadow-sm">
        <table className="w-full text-left text-[14px]">
          <thead className="border-b border-rule bg-surface-2">
            <tr>
              <th className="px-4 py-3 font-bold text-ink-3">{d.table.date}</th>
              <th className="px-4 py-3 font-bold text-ink-3">{d.table.borrower}</th>
              <th className="px-4 py-3 font-bold text-ink-3">{d.table.total}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-rule text-ink-2">
            <tr><td colSpan={3} className="px-4 py-6 text-center text-ink-3">{d.emptyPayments}</td></tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}