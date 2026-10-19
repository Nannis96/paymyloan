"use client";

import { useState, useEffect } from "react";
import { useSite } from "@/app/components/layout/SiteShell";
import { formatShortCurrency } from "./utils";
import { API_ROUTES } from "@/app/lib/endpoints";
import { api, toList } from "@/app/lib/apiFetch";
import type { Contract } from "@/app/types/api";

export function AllDealsView() {
  const { t, lang } = useSite();
  const d = t.dashboardAdmin;
  const v = d.views.allDeals;

  const [contracts, setContracts] = useState<Contract[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContracts() {
      try {
        setContracts(toList<Contract>(await api<unknown>(`${API_ROUTES.contracts.base}?pageSize=50`)));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error de red");
      } finally {
        setIsLoading(false);
      }
    }
    fetchContracts();
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
                <th className="px-4 py-3">{d.tables.property}</th>
                <th className="px-4 py-3">{d.tables.loan}</th>
                <th className="px-4 py-3">{d.tables.status}</th>
                <th className="px-4 py-3">{d.tables.nextPayment}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rule text-[12px] text-ink-2">
              {contracts.length > 0 ? contracts.map((deal, i) => (
                <tr key={deal.id || i} className="hover:bg-surface-2 transition-colors">
                  <td className="px-4 py-3 font-bold text-ink">{deal.property?.addressLine1 || "N/A"}</td>
                  <td className="px-4 py-3">{formatShortCurrency(Number(deal.currentTerms?.principalAmount) || 0)}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block rounded-lg px-2 py-0.5 text-[10px] font-bold ${deal.status === 'ACTIVE' ? 'bg-success-soft text-success' : deal.status === 'DELINQUENT' ? 'bg-crit-soft text-crit' : 'bg-surface-2 border border-rule-strong text-ink-3'}`}>
                      {deal.status === 'ACTIVE' ? d.tables.pillActive : deal.status === 'DELINQUENT' ? d.tables.pillLate.replace("{n}", "15") : deal.status}
                    </span>
                  </td>
                  <td className={`px-4 py-3 ${deal.status === 'DELINQUENT' ? 'font-bold text-crit' : ''}`}>
                    {deal.status === 'DELINQUENT' ? 'Overdue' : (deal.nextPaymentDueDate ? new Date(deal.nextPaymentDueDate).toLocaleDateString(lang === "es" ? "es-MX" : "en-US", { month: "short", day: "numeric" }) : "N/A")}
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={4} className="p-6 text-center text-ink-3">{t.contractsList.empty}</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}