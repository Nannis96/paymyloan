"use client";

import { useState } from "react";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import { MetricCard } from "@/app/components/ui";
import Link from "next/link";
import PitchDeckModal from "@/app/components/PitchDeckModal";
import RateLenderModal from "@/app/components/RateLenderModal";
import { Bell } from "lucide-react";

function BorrowerDashboardContent() {
  const { t } = useSite();
  const d = t.dashboardBorrower;
  const n = t.notifications;

  const [isPitchModalOpen, setIsPitchModalOpen] = useState(false);
  const [isRateModalOpen, setIsRateModalOpen] = useState(false);
  const [selectedLender, setSelectedLender] = useState("");

  const mockData = {
    metrics: {
      totalOwed: "$450,000",
      nextDue: "$4,500",
      properties: "2",
      pmlRating: "A+",
    },
    notifications: [
      { id: 1, text: "Pago automatico procesado por $4,500.", time: "Hace 2 horas", type: "success" },
      { id: 2, text: "Consulta de NextGen Growth LLC sobre tu Pitch Deck.", time: "Ayer", type: "info" }
    ],
    upcomingClosings: [
      { id: "UC-01", property: "105 Maple Dr", type: "Payoff", date: "Sep 20, 2026", status: "Esperando cierre" }
    ],
    needFunding: [
      { id: "NF-01", property: "88 Maple Dr", amount: "$150,000", status: "Publicado" }
    ],
    loanApproved: [
      { id: "LA-01", property: "456 Oak Ave", amount: "$320,000", lender: "NextGen Growth LLC", status: "Firma Pendiente" }
    ],
    currentLoans: [
      { id: "AL-01", property: "123 Main St", lender: "Private Capital Group", balance: "$250,000", rate: "12%", nextPayment: "Oct 1, 2026" }
    ],
    completedLoans: [
      { id: "CTR-009", lender: "Private Capital Group", property: "105 Maple Dr", payoffDate: "12 Ago 2026" }
    ]
  };

  return (
    <div className="min-h-screen bg-bg p-6 lg:p-14">
      <div className="mx-auto max-w-[1100px]">
        
        <header className="mb-6">
          <h1 className="text-[32px] font-black tracking-tight text-ink">{d.title}</h1>
          <p className="text-ink-2">{d.subtitle}</p>
        </header>

        {/* Notificaciones y Suscripcion en la parte superior */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          <div className="md:col-span-2 flex flex-col items-start justify-between gap-4 rounded-xl border border-amber/30 bg-amber-soft p-5 sm:flex-row sm:items-center">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-amber">
                {t.billing?.bannerTitle || "Prueba Gratuita"}
              </div>
              <div className="text-sm font-medium text-ink-2 mt-1">
                {t.billing?.bannerText || "Te quedan X dias..."}
              </div>
            </div>
            <Link href="/billing" className="shrink-0 rounded-lg bg-amber px-4 py-2 text-xs font-bold text-bg transition-opacity hover:opacity-90 shadow-sm">
              {t.billing?.bannerCta || "Activar Suscripcion"}
            </Link>
          </div>

          <div className="rounded-xl border border-rule bg-surface p-5 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-accent flex items-center gap-1.5"><Bell size={14}/> {n.title}</h3>
              <button className="text-[10px] font-bold text-ink-3 hover:text-ink">{n.markRead}</button>
            </div>
            <div className="flex flex-col gap-2 overflow-y-auto max-h-[80px]">
              {mockData.notifications.length === 0 ? (
                <p className="text-xs text-ink-3">{n.empty}</p>
              ) : (
                mockData.notifications.map(notif => (
                  <div key={notif.id} className="text-xs border-l-2 border-accent pl-2 text-ink-2">
                    <span className="block font-medium text-ink">{notif.text}</span>
                    <span className="text-[10px] text-ink-3">{notif.time}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Metricas */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <MetricCard label={d.metrics.totalOwed} value={mockData.metrics.totalOwed} accent />
          <MetricCard label={d.metrics.nextDue} value={mockData.metrics.nextDue} />
          <MetricCard label={d.metrics.properties} value={mockData.metrics.properties} />
          <MetricCard label={d.metrics.pmlRating} value={mockData.metrics.pmlRating} />
        </div>

        {/* Acciones */}
        <div className="mb-10 flex flex-wrap items-center gap-3">
          <button onClick={() => setIsPitchModalOpen(true)} className="inline-flex items-center justify-center rounded-lg bg-accent px-5 py-3 text-sm font-bold text-accent-ink transition-opacity hover:opacity-90">
            + {d.actions.pitchDeck}
          </button>
          <Link href="/borrower/payments" className="inline-flex items-center justify-center rounded-lg bg-ink px-5 py-3 text-sm font-bold text-bg transition-opacity hover:opacity-90 shadow-sm">
            {d.actions.payments}
          </Link>
          <Link href="/contracts" className="inline-flex items-center justify-center rounded-lg border border-accent bg-accent-soft px-5 py-3 text-sm font-bold text-accent transition-colors hover:opacity-80">
            {d.actions.viewContracts}
          </Link>
          <Link href="/contracts/CTR-001/payoff" className="inline-flex items-center justify-center rounded-lg border border-rule-strong bg-surface px-5 py-3 text-sm font-bold text-ink transition-colors hover:border-accent hover:text-accent">
            {d.actions.payoff}
          </Link>
          <Link href="/apply" className="inline-flex items-center justify-center rounded-lg border border-rule-strong bg-surface px-5 py-3 text-sm font-bold text-ink transition-colors hover:border-accent hover:text-accent">
            {t.vetting.title}
          </Link>
        </div>

        {/* Tracking */}
        <section className="mb-10">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-accent">{d.trackerTitle}</h2>
          <div className="overflow-x-auto rounded-xl border border-rule bg-surface shadow-sm">
            <table className="w-full text-left text-[14px]">
              <thead className="border-b border-rule bg-surface-2">
                <tr>
                  <th className="px-5 py-3 font-bold text-ink-3">{d.tableHeaders?.property}</th>
                  <th className="px-5 py-3 font-bold text-ink-3">{d.tableHeaders?.status}</th>
                  <th className="px-5 py-3 font-bold text-ink-3">{d.tableHeaders?.date}</th>
                </tr>
              </thead>
              <tbody className="text-ink-2 divide-y divide-rule">
                {mockData.upcomingClosings.map(closing => (
                  <tr key={closing.id} className="hover:bg-surface-2 transition-colors">
                    <td className="px-5 py-3">
                      <div className="font-medium text-ink">{closing.property}</div>
                      <div className="text-[11px] text-ink-3">{closing.type}</div>
                    </td>
                    <td className="px-5 py-3">
                      <span className="inline-flex rounded-[4px] border border-amber/30 bg-amber-soft px-2 py-0.5 text-[10px] font-bold text-amber">
                        {closing.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-sm">{closing.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Tablas (Need Funding & Loan Approved) */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 mb-10">
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
                <tbody className="text-ink-2 divide-y divide-rule">
                  {mockData.needFunding.map((nf) => (
                    <tr key={nf.id} className="hover:bg-surface-2 transition-colors">
                      <td className="px-4 py-3 font-medium text-ink">{nf.property}</td>
                      <td className="px-4 py-3 font-mono font-bold text-accent">{nf.amount}</td>
                      <td className="px-4 py-3 text-[11px] uppercase tracking-wider text-ink-3">{nf.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          
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
                <tbody className="text-ink-2 divide-y divide-rule">
                  {mockData.loanApproved.map((la) => (
                    <tr key={la.id} className="hover:bg-surface-2 transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-medium text-ink">{la.property}</div>
                        <div className="text-[11px] text-ink-3 font-mono font-bold text-ink">{la.amount}</div>
                      </td>
                      <td className="px-4 py-3 text-sm">{la.lender}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex rounded-[4px] border border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700 dark:border-blue-900/40 dark:bg-blue-900/10 dark:text-blue-400">
                          {la.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Current Loans & Completed Loans */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 mb-10">
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
                <tbody className="text-ink-2 divide-y divide-rule">
                  {mockData.currentLoans.map((cl) => (
                    <tr key={cl.id} className="hover:bg-surface-2 transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-medium text-ink">{cl.property}</div>
                        <div className="text-[11px] text-ink-3">{cl.lender}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-bold text-ink font-mono">{cl.balance}</div>
                        <div className="text-[11px] text-accent font-bold">{cl.rate}</div>
                      </td>
                      <td className="px-4 py-3 text-sm">{cl.nextPayment}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-ink-3">{d.completedLoans}</h2>
            <div className="rounded-xl border border-rule bg-surface p-2 shadow-sm overflow-hidden">
              {mockData.completedLoans.map(loan => (
                <div key={loan.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-surface-2 rounded-lg border border-rule gap-4">
                  <div>
                    <div className="text-sm font-bold text-ink">{loan.property}</div>
                    <div className="text-xs text-ink-3">Liquidado: {loan.payoffDate} | {loan.lender}</div>
                  </div>
                  <button 
                    onClick={() => { setSelectedLender(loan.lender); setIsRateModalOpen(true); }}
                    className="shrink-0 text-xs font-bold bg-ink text-bg px-4 py-2 rounded-lg hover:opacity-90"
                  >
                    {t.rateLender?.title || "Calificar"}
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

      </div>

      {isPitchModalOpen && <PitchDeckModal onClose={() => setIsPitchModalOpen(false)} />}
      
      {isRateModalOpen && (
        <RateLenderModal 
          onClose={() => setIsRateModalOpen(false)} 
          lenderName={selectedLender} 
          contractId="CTR-009" 
        />
      )}
    </div>
  );
}

export default function BorrowerDashboard() {
  return (
    <SiteShell isDashboard={true}>
      <BorrowerDashboardContent />
    </SiteShell>
  );
}