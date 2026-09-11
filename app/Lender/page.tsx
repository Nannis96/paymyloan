"use client";

import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import { MetricCard } from "@/app/components/ui";
import Link from "next/link";
import { Bell } from "lucide-react";

function LenderDashboardContent() {
  const { t } = useSite();
  const d = t.dashboardLender;
  const n = t.notifications;

  const mockData = {
    settings: {
      isOpenToDeals: true,
    },
    metrics: {
      availableCapital: "$500K",
      capitalDeployed: "$1.2M",
      nextPayments: "$12,400",
      avgInterest: "11.5%",
      activeBorrowers: "8",
    },
    notifications: [
      { id: 1, text: "Recibiste un pago de $2,500 de Liam Brown.", time: "Ayer", type: "success" },
      { id: 2, text: "Solicitud de payoff generada para 123 Main St.", time: "Hace 2 dias", type: "info" }
    ],
    recentPayments: [
      {
        id: "pay_1",
        date: "Sep 01, 2026",
        borrowerName: "Liam Brown",
        property: "123 Main St.",
        total: "$2,500.00",
        principal: "$500.00",
        interest: "$2,000.00"
      }
    ],
    commitmentLetters: [
      { id: "CL-001", borrower: "Sarah Jenkins", property: "456 Oak Ave, Nashville", amount: "$150,000", status: "Pendiente de firma" },
      { id: "CL-002", borrower: "Mike Torres", property: "789 Pine Ln, Austin", amount: "$320,000", status: "Aceptada" }
    ],
    upcomingClosings: [
      { id: "UC-001", type: "Cierre Inicial", property: "789 Pine Ln, Austin", date: "Sep 15, 2026", action: "Verificar Wire" },
      { id: "UC-002", type: "Payoff (Liquidacion)", property: "105 Maple Dr, Dallas", date: "Sep 20, 2026", action: "Generar Carta" }
    ],
    activeLoans: [
      { id: "AL-001", borrower: "Liam Brown", property: "123 Main St.", rate: "12%", balance: "$250,000", status: "Al dia" },
      { id: "AL-002", borrower: "Mike Torres", property: "789 Pine Ln", rate: "10.5%", balance: "$320,000", status: "Fondeado" }
    ]
  };

  return (
    <div className="min-h-screen bg-bg p-6 lg:p-14">
      <div className="mx-auto max-w-[1100px]">
        
        <header className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h1 className="text-[32px] font-black tracking-tight text-ink">{d.title}</h1>
            <p className="text-ink-2">{d.subtitle}</p>
          </div>
          
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
                href="/contracts"
                className="inline-flex items-center justify-center rounded-lg border border-rule-strong bg-surface px-5 py-3 text-sm font-bold text-ink transition-colors hover:border-accent hover:text-accent"
            >
              {d.actions.viewContracts}
            </Link>
            
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-rule bg-surface px-4 py-2 hover:border-accent transition-colors">
              <div className="relative">
                <input type="checkbox" className="sr-only" defaultChecked={mockData.settings.isOpenToDeals} />
                <div className="block h-6 w-10 rounded-full bg-accent"></div>
                <div className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-accent-ink transition-transform ${mockData.settings.isOpenToDeals ? 'translate-x-4' : ''}`}></div>
              </div>
              <span className="text-sm font-bold text-ink">{d.toggle.open}</span>
            </label>
            
            <Link href="/marketplace" className="inline-flex items-center justify-center rounded-lg bg-accent px-5 py-3 text-sm font-bold text-accent-ink transition-opacity hover:opacity-90">
              {d.actions.marketplace} &rarr;
            </Link>
          </div>
        </header>

        {/* Panel de Notificaciones (Lender) */}
        <div className="mb-10 rounded-xl border border-rule bg-surface p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4 border-b border-rule pb-3">
            <h3 className="text-[12px] font-bold uppercase tracking-widest text-accent flex items-center gap-1.5"><Bell size={14}/> {n.title}</h3>
            <button className="text-[10px] font-bold text-ink-3 hover:text-ink">{n.markRead}</button>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            {mockData.notifications.length === 0 ? (
              <p className="text-sm text-ink-3">{n.empty}</p>
            ) : (
              mockData.notifications.map(notif => (
                <div key={notif.id} className="flex-1 rounded-lg bg-surface-2 p-3 border border-rule text-sm">
                  <div className="font-medium text-ink mb-1">{notif.text}</div>
                  <div className="text-[11px] text-ink-3">{notif.time}</div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          <div className="rounded-xl border border-rule bg-surface p-6 shadow-sm border-t-[3px] border-t-accent">
            <div className="mb-2 text-[11px] font-extrabold uppercase tracking-widest text-accent">
              {d.metrics.availableCapital}
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black tracking-tight text-ink">{mockData.metrics.availableCapital}</span>
              <span className="text-lg font-medium text-ink-3">/ {mockData.metrics.capitalDeployed}</span>
            </div>
          </div>
          <MetricCard label={d.metrics.nextPayments} value={mockData.metrics.nextPayments} />
          <MetricCard label={d.metrics.avgInterest} value={mockData.metrics.avgInterest} />
          <MetricCard label={d.metrics.activeBorrowers} value={mockData.metrics.activeBorrowers} />
        </div>

        {/* Seccion 1: Cartas de Compromiso y Cierres */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <section>
            <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-ink-3">
              {d.sections.commitmentLetters}
            </h2>
            <div className="overflow-x-auto rounded-xl border border-rule bg-surface shadow-sm">
              <table className="w-full text-left text-[14px]">
                <thead className="border-b border-rule bg-surface-2">
                  <tr>
                    <th className="px-4 py-3 font-bold text-ink-3">{d.tableHeaders.borrower}</th>
                    <th className="px-4 py-3 font-bold text-ink-3">{d.tableHeaders.amount}</th>
                    <th className="px-4 py-3 font-bold text-ink-3">{d.tableHeaders.status}</th>
                  </tr>
                </thead>
                <tbody className="text-ink-2 divide-y divide-rule">
                  {mockData.commitmentLetters.map((cl) => (
                    <tr key={cl.id} className="hover:bg-surface-2 transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-medium text-ink">{cl.borrower}</div>
                        <div className="text-[11px] text-ink-3">{cl.property}</div>
                      </td>
                      <td className="px-4 py-3 font-mono font-bold">{cl.amount}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex rounded-[4px] border px-2 py-0.5 text-[10px] font-bold ${cl.status === 'Aceptada' ? 'bg-green-100 border-green-200 text-green-700 dark:bg-green-900/30 dark:border-green-800 dark:text-green-400' : 'bg-amber-soft border-amber/30 text-amber'}`}>
                          {cl.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-ink-3">
              {d.sections.upcomingClosings}
            </h2>
            <div className="overflow-x-auto rounded-xl border border-rule bg-surface shadow-sm">
              <table className="w-full text-left text-[14px]">
                <thead className="border-b border-rule bg-surface-2">
                  <tr>
                    <th className="px-4 py-3 font-bold text-ink-3">{d.tableHeaders.type}</th>
                    <th className="px-4 py-3 font-bold text-ink-3">{d.tableHeaders.date}</th>
                    <th className="px-4 py-3 font-bold text-ink-3">{d.tableHeaders.action}</th>
                  </tr>
                </thead>
                <tbody className="text-ink-2 divide-y divide-rule">
                  {mockData.upcomingClosings.map((uc) => (
                    <tr key={uc.id} className="hover:bg-surface-2 transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-medium text-ink">{uc.type}</div>
                        <div className="text-[11px] text-ink-3">{uc.property}</div>
                      </td>
                      <td className="px-4 py-3 text-sm">{uc.date}</td>
                      <td className="px-4 py-3">
                        <button className="text-xs font-bold text-accent hover:underline">{uc.action}</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Seccion 2: Prestamos Activos y Ultimos Pagos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <section>
            <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-ink-3">
              {d.sections.activeLoans}
            </h2>
            <div className="overflow-x-auto rounded-xl border border-rule bg-surface shadow-sm">
              <table className="w-full text-left text-[14px]">
                <thead className="border-b border-rule bg-surface-2">
                  <tr>
                    <th className="px-4 py-3 font-bold text-ink-3">{d.tableHeaders.loan}</th>
                    <th className="px-4 py-3 font-bold text-ink-3">{d.tableHeaders.rateBalance}</th>
                    <th className="px-4 py-3 font-bold text-ink-3">{d.tableHeaders.status}</th>
                  </tr>
                </thead>
                <tbody className="text-ink-2 divide-y divide-rule">
                  {mockData.activeLoans.map((al) => (
                    <tr key={al.id} className="hover:bg-surface-2 transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-medium text-ink">{al.borrower}</div>
                        <div className="text-[11px] text-ink-3">{al.property}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-bold text-accent">{al.rate}</div>
                        <div className="font-mono text-xs text-ink-3">{al.balance}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex rounded-[4px] border border-green-200 bg-green-50 px-2 py-0.5 text-[10px] font-bold text-green-700 dark:border-green-900/40 dark:bg-green-900/10 dark:text-green-400">
                          {al.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-ink-3">
              {d.recentPayments}
            </h2>
            <div className="overflow-x-auto rounded-xl border border-rule bg-surface shadow-sm">
              <table className="w-full text-left text-[14px]">
                <thead className="border-b border-rule bg-surface-2">
                  <tr>
                    <th className="px-4 py-3 font-bold text-ink-3">{d.table.date}</th>
                    <th className="px-4 py-3 font-bold text-ink-3">{d.table.borrower}</th>
                    <th className="px-4 py-3 font-bold text-ink-3">{d.table.total}</th>
                  </tr>
                </thead>
                <tbody className="text-ink-2 divide-y divide-rule">
                  {mockData.recentPayments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-surface-2 transition-colors">
                      <td className="px-4 py-3 text-sm">{payment.date}</td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-ink">{payment.borrowerName}</div>
                        <div className="text-[11px] text-ink-3">{d.labels.cap} {payment.principal} | {d.labels.int} <span className="text-amber">{payment.interest}</span></div>
                      </td>
                      <td className="px-4 py-3 font-mono font-bold text-ink">{payment.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default function LenderDashboard() {
  return (
    <SiteShell isDashboard={true}>
      <LenderDashboardContent />
    </SiteShell>
  );
}