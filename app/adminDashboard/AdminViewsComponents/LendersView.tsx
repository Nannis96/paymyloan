"use client";

import { useState, useEffect } from "react";
import { useSite } from "@/app/components/layout/SiteShell";
import { API_ROUTES } from "@/app/lib/endpoints";
import { api, toList } from "@/app/lib/apiFetch";
import type { AdminLender } from "@/app/types/api";
import { LenderDetailDrawer } from "./LenderDetailDrawer";

export function LendersView({ users }: { users?: unknown[] }) {
  const { t, lang } = useSite();
  const d = t.dashboardAdmin;
  const v = d.views.lenders;

  const [lenders, setLenders] = useState<AdminLender[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLenders() {
      try {
        // Obtenemos los prestamistas con su informacion enriquecida
        setLenders(toList<AdminLender>(await api<unknown>(API_ROUTES.lenders.adminBase)));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error de red");
      } finally {
        setIsLoading(false);
      }
    }
    fetchLenders();
  }, [d.errorFetch]);

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-[13px] text-ink-3">{d.loading || "Cargando..."}</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-[13px] font-bold text-crit">{error}</div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-300">
      <h1 className="mb-1 text-[22px] font-extrabold text-ink">{v.title}</h1>
      <p className="mb-6 text-[13px] text-ink-3">{v.subtitle}</p>
      
      <div className="overflow-hidden rounded-[10px] border border-rule bg-surface shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface-2 text-[10px] font-bold uppercase tracking-[0.4px] text-ink-3">
              <tr>
                <th className="px-4 py-3">{d.tables.name}</th>
                <th className="px-4 py-3">{d.tables.signedUp}</th>
                <th className="px-4 py-3">{v.companies}</th>
                <th className="px-4 py-3">{d.tables.deals}</th>
                <th className="px-4 py-3">{d.tables.verified}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rule text-[12px] text-ink-2">
              {lenders.length > 0 ? lenders.map((lenderItem, i) => {
                // La API devuelve { id, user, lenderCompanies, borrowersCount, activeContractsCount }
                const u = lenderItem.user;
                const companiesCount = lenderItem.lenderCompanies?.length || 0;
                // La lista no trae activeContractsCount (solo el detalle): "—" en vez de un 0 falso.
                const dealsCount = lenderItem.activeContractsCount ?? "—";

                return (
                  <tr
                    key={lenderItem.id || i}
                    onClick={() => setSelectedId(lenderItem.id)}
                    onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setSelectedId(lenderItem.id)}
                    tabIndex={0}
                    className="cursor-pointer transition-colors hover:bg-surface-2 focus:bg-surface-2 focus:outline-none"
                  >
                    <td className="px-4 py-3 font-bold text-ink">
                      {u?.name || "N/A"}
                      <span className="mt-0.5 block text-[10px] font-normal text-ink-3">{u?.email}</span>
                    </td>
                    <td className="px-4 py-3">
                      {u?.createdAt ? new Date(u.createdAt).toLocaleDateString(lang === "es" ? "es-MX" : "en-US", { month: "short", day: "numeric" }) : "N/A"}
                    </td>
                    <td className="px-4 py-3">{companiesCount}</td>
                    <td className="px-4 py-3">{dealsCount}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block rounded-lg px-2 py-0.5 text-[10px] font-bold ${u?.isActive ? 'bg-success-soft text-success' : 'border border-amber/30 bg-amber-soft text-amber'}`}>
                        {u?.isActive ? d.tables.pillActive : d.tables.pillPending}
                      </span>
                    </td>
                  </tr>
                );
              }) : (
                <tr><td colSpan={5} className="p-6 text-center text-ink-3">{t.adminUsersList.empty}</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedId && <LenderDetailDrawer key={selectedId} lenderId={selectedId} onClose={() => setSelectedId(null)} />}
    </div>
  );
}