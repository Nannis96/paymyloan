"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useSite } from "@/app/components/layout/SiteShell";

export function PaymentsTable({ dict, upcoming, recent }: { dict: any, upcoming: any[], recent: any[] }) {
  const { lang } = useSite();
  const isEs = lang === "es";

  return (
    <div className="bg-surface border border-rule-strong rounded-xl shadow-card flex flex-col">
      <div className="flex justify-between items-center p-5 border-b border-rule">
        <h2 className="font-bold text-lg text-ink">{dict.managePayments.title}</h2>
        <Link href="/borrowerDashboard/payments" className="text-sm font-bold text-accent hover:underline">
          {dict.dashboardBorrower.actions.payments} 
        </Link>
      </div>
      <div className="p-5">
        <h3 className="eyebrow text-ink-3 mb-4">{isEs ? "Proximos" : "Upcoming"}</h3>
        <div className="flex flex-col gap-4">
          {upcoming.map((payment, i) => (
            <div key={i} className="flex items-center justify-between border-b border-rule pb-4 last:border-0 last:pb-0">
              <div className="flex items-center gap-3">
                <div className="bg-surface-2 p-2 border border-rule rounded-md text-ink-2">💳</div>
                <div>
                  <p className="font-bold text-sm text-ink">{payment.property}</p>
                  <p className="text-xs text-ink-2">{payment.lender} • {payment.interest}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="eyebrow text-ink-3">{isEs ? "VENCE" : "DUE"}</p>
                <p className="text-sm text-ink-2">{payment.dueDate}</p>
              </div>
              <div className="font-bold text-ink">{payment.amount}</div>
              <Link href="/borrowerDashboard/payments" className="px-3 py-1.5 text-sm font-bold border border-rule-strong rounded-md hover:bg-surface-2 transition-colors text-ink no-underline">
                {isEs ? "Registrar" : "Log payment"}
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="p-5 bg-surface-2 border-t border-rule rounded-b-xl">
        <h3 className="eyebrow text-ink-3 mb-4">{isEs ? "Pagos Recientes" : "Recent Payments"}</h3>
        <div className="flex flex-col gap-4">
          {recent.map((payment, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-success-soft text-success p-2 rounded-full">✅</div>
                <div>
                  <p className="font-bold text-sm text-ink">{payment.property}</p>
                  <p className="text-xs text-ink-2">{payment.lender} • {payment.interest}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <p className="font-bold text-ink">{payment.amount}</p>
                <span className="px-2 py-1 text-xs font-bold bg-success-soft text-success rounded-md">Paid</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}