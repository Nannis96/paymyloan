"use client";

import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import { MetricCard } from "@/app/components/ui";
import Link from "next/link";
function LenderDashboardContent() {
  const { t } = useSite();
  const d = t.dashboardLender;

  // NOTA: Estos datos están hardcodeados para el cascarón visual.
  // Posteriormente deberán ser extraídos de la base de datos o estado global tras el login.
  const mockData = {
    settings: {
      isOpenToDeals: true, // Vendrá del perfil del usuario (Lender)
    },
    metrics: {
      capitalDeployed: "$1.2M",
      nextPayments: "$12,400",
      avgInterest: "11.5%",
      activeBorrowers: "8",
    },
    recentPayments: [
      {
        id: "pay_1",
        date: "Sep 01, 2026",
        borrowerName: "Spencer Shadrach",
        property: "123 Main St.",
        total: "$2,500.00",
        principal: "$500.00",
        interest: "$2,000.00"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-bg p-6 lg:p-14">
      <div className="mx-auto max-w-[1100px]">
        
        {/* Cabecera con Título y Controles */}
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
            {/* Toggle de visibilidad */}
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-rule bg-surface px-4 py-2 hover:border-accent transition-colors">
              <div className="relative">
                <input type="checkbox" className="sr-only" defaultChecked={mockData.settings.isOpenToDeals} />
                <div className="block h-6 w-10 rounded-full bg-accent"></div>
                <div className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-accent-ink transition-transform ${mockData.settings.isOpenToDeals ? 'translate-x-4' : ''}`}></div>
              </div>
              <span className="text-sm font-bold text-ink">{d.toggle.open}</span>
            </label>
            
            {/* Botón Marketplace */}
            <button className="inline-flex items-center justify-center rounded-lg bg-accent px-5 py-3 text-sm font-bold text-accent-ink transition-opacity hover:opacity-90">
              {d.actions.marketplace} &rarr;
            </button>
          </div>
        </header>

        {/* Métricas Principales */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          <MetricCard label={d.metrics.capitalDeployed} value={mockData.metrics.capitalDeployed} accent />
          <MetricCard label={d.metrics.nextPayments} value={mockData.metrics.nextPayments} />
          <MetricCard label={d.metrics.avgInterest} value={mockData.metrics.avgInterest} />
          <MetricCard label={d.metrics.activeBorrowers} value={mockData.metrics.activeBorrowers} />
        </div>

        {/* Historial de Pagos y Desglose */}
        <section>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-ink-3">
            {d.recentPayments}
          </h2>
          <div className="overflow-x-auto rounded-xl border border-rule bg-surface">
            <table className="w-full min-w-[700px] border-collapse text-left text-[14px]">
              <thead className="border-b border-rule bg-surface-2">
                <tr>
                  <th className="px-5 py-4 font-bold text-ink-3">{d.table.date}</th>
                  <th className="px-5 py-4 font-bold text-ink-3">{d.table.borrower}</th>
                  <th className="px-5 py-4 font-bold text-ink-3">{d.table.property}</th>
                  <th className="px-5 py-4 font-bold text-ink-3">{d.table.total}</th>
                  <th className="px-5 py-4 font-bold text-ink-3">{d.table.principal}</th>
                  <th className="px-5 py-4 font-bold text-ink-3">{d.table.interest}</th>
                </tr>
              </thead>
              <tbody className="text-ink-2">
                {mockData.recentPayments.map((payment) => (
                  <tr key={payment.id} className="border-b border-rule hover:bg-surface-2 transition-colors">
                    <td className="px-5 py-4">{payment.date}</td>
                    <td className="px-5 py-4 font-medium text-ink">{payment.borrowerName}</td>
                    <td className="px-5 py-4">{payment.property}</td>
                    <td className="px-5 py-4 font-mono font-bold text-ink">{payment.total}</td>
                    <td className="px-5 py-4 font-mono text-ink-3">{payment.principal}</td>
                    <td className="px-5 py-4 font-mono font-medium text-amber">{payment.interest}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-sm text-ink-3">
                    El resto del historial se renderizará aquí.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

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