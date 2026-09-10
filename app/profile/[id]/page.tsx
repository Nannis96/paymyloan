"use client";

import { useParams } from "next/navigation";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import { MetricCard } from "@/app/components/ui";

function ProfileContent() {
  const params = useParams();
  const { t } = useSite();
  const pr = t.profile;

  // TODO: BACKEND - Hacer fetch del perfil publico usando params.id
  // La respuesta debe dictar si es 'borrower' o 'lender' e incluir su calificacion (rating).
  const mockProfile = {
    id: params.id,
    name: "John Smith",
    type: "borrower", // o "lender"
    rating: "A+",
    totalLoans: "12",
    onTimeRate: "98%",
    totalVolume: "$1.2M",
    history: []
  };

  return (
    <div className="min-h-screen bg-bg p-6 lg:p-14">
      <div className="mx-auto max-w-[1100px]">
        
        <header className="mb-10 flex flex-col items-center border-b border-rule pb-10 text-center">
          <div className="mb-4 inline-flex items-center justify-center rounded-full bg-surface-2 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-accent border border-rule">
            {mockProfile.type === "borrower" ? pr.borrower : pr.lender}
          </div>
          <h1 className="text-[38px] font-black tracking-tight text-ink">{mockProfile.name}</h1>
          <p className="mt-2 text-lg text-ink-3">ID: {mockProfile.id}</p>
        </header>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-14">
          <MetricCard label={pr.stats.rating} value={mockProfile.rating} accent />
          <MetricCard label={pr.stats.totalLoans} value={mockProfile.totalLoans} />
          <MetricCard label={pr.stats.onTime} value={mockProfile.onTimeRate} />
          <MetricCard label={pr.stats.totalVolume} value={mockProfile.totalVolume} />
        </div>

        <section>
          <h2 className="mb-6 text-sm font-bold uppercase tracking-widest text-ink-3">
            {pr.history}
          </h2>
          <div className="rounded-xl border border-rule bg-surface p-12 text-center text-ink-2 shadow-sm">
            {mockProfile.history.length === 0 ? (
              <p>{pr.emptyHistory}</p>
            ) : (
              <p>{pr.mapHistory}</p>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <SiteShell isDashboard={true}>
      <ProfileContent />
    </SiteShell>
  );
}