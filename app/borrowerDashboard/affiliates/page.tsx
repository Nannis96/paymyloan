"use client";
import { useEffect, useState } from "react";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import { apiFetch } from "@/app/lib/apiFetch";
import { API_ROUTES } from "@/app/lib/endpoints";

export default function AffiliatesPage() {
  const { t, lang } = useSite();
  const aff = t.affiliateDashboard; 
  const isEs = lang === "es";
  
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Usamos el endpoint /api/auth/me para obtener los datos del prestatario actual
    async function fetchUser() {
      try {
        const res = await apiFetch(API_ROUTES.auth.me);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data?.user) {
            setUser(json.data.user);
          }
        }
      } catch (error) {
        console.error("Error fetching user data", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUser();
  }, []);

  // Generamos un código de referido basado en el ID del usuario
  const refCode = user?.id ? user.id.substring(0, 8).toUpperCase() : "PML-AFF-000";

  // Mock de la lista de referidos (ya que no hay un endpoint de afiliados en la API actual)
  const mockReferrals = [
    { id: 1, borrower: "Memphis Realty LLC", property: "1144 Oakwood Dr", loan: "$95,000", status: aff.table.status.active, fee: "$237.50", monthly: "$19.79" },
    { id: 2, borrower: "NextGen Flips", property: "4215 Raleigh Ave", loan: "$75,000", status: aff.table.status.pending, fee: "$187.50", monthly: "$0.00" }
  ];

  return (
    <SiteShell isMinimal={true}>
      <div className="max-w-[900px] animate-in fade-in duration-300 pb-12">
        <header className="mb-8">
          <h1 className="text-[28px] font-[900] tracking-tight text-ink">{aff.title}</h1>
          <p className="mt-[4px] text-[14px] text-ink-3">{aff.subtitle}</p>
        </header>

        {/* Tarjetas de Métricas */}
        <div className="mb-6 flex flex-wrap gap-4">
          <div className="flex-1 rounded-xl border border-rule bg-surface p-6 shadow-sm min-w-[200px]">
            <div className="text-[12px] font-bold uppercase tracking-widest text-ink-3 mb-2">{aff.stats.earned.label}</div>
            <div className="text-[24px] font-black text-ink">$237.50</div>
            <div className="text-[12px] text-success font-semibold mt-1">{aff.stats.earned.trend.replace("{amount}", "$237.50")}</div>
          </div>
          <div className="flex-1 rounded-xl border border-rule bg-surface p-6 shadow-sm min-w-[200px]">
            <div className="text-[12px] font-bold uppercase tracking-widest text-ink-3 mb-2">{aff.stats.active.label}</div>
            <div className="text-[24px] font-black text-ink">1</div>
            <div className="text-[12px] text-ink-3 mt-1">{aff.stats.active.sub}</div>
          </div>
          <div className="flex-1 rounded-xl border border-rule bg-surface p-6 shadow-sm min-w-[200px]">
            <div className="text-[12px] font-bold uppercase tracking-widest text-ink-3 mb-2">{aff.stats.pending.label}</div>
            <div className="text-[24px] font-black text-ink">$187.50</div>
            <div className="text-[12px] text-ink-3 mt-1">{aff.stats.pending.sub.replace("{date}", "TBD")}</div>
          </div>
        </div>

        

        {/* Tabla de referidos (Affiliates relacionados) */}
        <div className="rounded-xl border border-rule bg-surface shadow-sm overflow-hidden">
          <div className="border-b border-rule bg-surface-2 p-[16px_24px]">
            <h2 className="text-sm font-bold uppercase tracking-widest text-ink-3">{aff.table.title}</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[14px]">
              <thead className="border-b border-rule bg-surface">
                <tr>
                  {aff.table.cols.map((col: string, idx: number) => (
                    <th key={idx} className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-ink-3">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-rule bg-surface">
                {mockReferrals.map((ref) => (
                  <tr key={ref.id} className="hover:bg-surface-2 transition-colors">
                    <td className="px-6 py-4 font-bold text-ink">{ref.borrower}</td>
                    <td className="px-6 py-4 text-ink-2">{ref.property}</td>
                    <td className="px-6 py-4 font-mono font-semibold text-ink">{ref.loan}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex rounded px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                        ref.status === aff.table.status.active ? 'bg-success-soft text-success' : 'bg-amber-soft text-amber'
                      }`}>
                        {ref.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono text-accent font-semibold">{ref.fee}</td>
                    <td className="px-6 py-4 font-mono text-success font-semibold">{ref.monthly}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </SiteShell>
  );
}