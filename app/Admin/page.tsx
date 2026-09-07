"use client";

import Link from "next/link";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import { MetricCard } from "@/app/components/ui";

function AdminDashboardContent() {
  const { t } = useSite();
  const d = t.dashboardAdmin;

  // NOTA: Estos datos están hardcodeados para el cascarón visual.
  // Posteriormente serán calculados o extraídos desde la base de datos.
  const mockData = {
    metrics: {
      activeLoans: "312",
      totalVolume: "$48.2M",
      platformRevenue: "$12,500",
      pendingVerifications: "5",
    }
  };

  return (
    <div className="min-h-screen bg-bg p-6 lg:p-14">
      <div className="mx-auto max-w-[1100px]">
        <header className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-[32px] font-black tracking-tight text-ink">{d.title}</h1>
            <p className="text-ink-2">{d.subtitle}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
               href="/contracts"
               className="inline-flex items-center justify-center rounded-lg border border-rule-strong bg-surface px-5 py-3 text-sm font-bold text-ink transition-colors hover:border-accent hover:text-accent"
            >
              {d.viewContractsBtn}
            </Link>
            <Link
               href="/Admin/users"
               className="inline-flex items-center justify-center rounded-lg bg-accent px-5 py-3 text-sm font-bold text-accent-ink transition-opacity hover:opacity-90"
            >
              {d.viewUsersBtn} &rarr;
            </Link>
          </div>
        </header>
        
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          <MetricCard label={d.metrics.activeLoans} value={mockData.metrics.activeLoans} />
          <MetricCard label={d.metrics.totalVolume} value={mockData.metrics.totalVolume} />
          <MetricCard label={d.metrics.platformRevenue} value={mockData.metrics.platformRevenue} accent />
          <MetricCard label={d.metrics.pendingVerifications} value={mockData.metrics.pendingVerifications} />
        </div>

        <section>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-ink-3">{d.recentActivity}</h2>
          <div className="rounded-xl border border-rule bg-surface p-8 text-center text-ink-2">
            <p>Logs del sistema y nuevas cuentas creadas.</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <SiteShell isDashboard={true}>
      <AdminDashboardContent />
    </SiteShell>
  );
}