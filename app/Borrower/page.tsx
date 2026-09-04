"use client";

import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import { MetricCard } from "@/app/components/ui";

function BorrowerDashboardContent() {
  const { t } = useSite();
  const d = t.dashboardBorrower;

  // NOTA: Estos datos están hardcodeados para el cascarón visual.
  // Posteriormente deberán ser extraídos de la base de datos / backend.
  const mockData = {
    metrics: {
      totalOwed: "$450,000",
      nextDue: "$4,500",
      properties: "2",
      pmlRating: "A+",
    }
  };

  return (
    <div className="min-h-screen bg-bg p-6 lg:p-14">
      <div className="mx-auto max-w-[1100px]">
        
        {/* Cabecera */}
        <header className="mb-10">
          <h1 className="text-[32px] font-black tracking-tight text-ink">{d.title}</h1>
          <p className="text-ink-2">{d.subtitle}</p>
        </header>

        {/* Métricas Principales */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <MetricCard label={d.metrics.totalOwed} value={mockData.metrics.totalOwed} accent />
          <MetricCard label={d.metrics.nextDue} value={mockData.metrics.nextDue} />
          <MetricCard label={d.metrics.properties} value={mockData.metrics.properties} />
          <MetricCard label={d.metrics.pmlRating} value={mockData.metrics.pmlRating} />
        </div>

        {/* Acciones Rápidas */}
        <div className="mb-10 flex flex-wrap items-center gap-3">
          <button className="inline-flex items-center justify-center rounded-lg bg-accent px-5 py-3 text-sm font-bold text-accent-ink transition-opacity hover:opacity-90">
            + {d.actions.pitchDeck}
          </button>
          <button className="inline-flex items-center justify-center rounded-lg border border-rule-strong bg-surface px-5 py-3 text-sm font-bold text-ink transition-colors hover:border-accent hover:text-accent">
            {d.actions.payoff}
          </button>
          <button className="inline-flex items-center justify-center rounded-lg border border-rule-strong bg-surface px-5 py-3 text-sm font-bold text-ink transition-colors hover:border-accent hover:text-accent">
            {d.actions.payments}
          </button>
        </div>

        {/* Listado de Préstamos */}
        <section className="mb-10">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-ink-3">
            {d.activeLoans}
          </h2>
          <div className="rounded-xl border border-rule bg-surface p-8 text-center text-ink-2">
            <p>La tabla de préstamos en vivo se renderizará aquí.</p>
          </div>
        </section>

        {/* Documentos */}
        <section>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-ink-3">
            {d.documents}
          </h2>
          <div className="rounded-xl border border-rule bg-surface p-8 text-center text-ink-2">
            <p>Las cartas de compromiso y estados de liquidación generados aparecerán aquí.</p>
          </div>
        </section>

      </div>
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