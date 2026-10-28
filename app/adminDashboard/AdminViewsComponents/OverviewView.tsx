"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSite } from "@/app/components/layout/SiteShell";
import { formatCurrency, formatShortCurrency } from "./utils";
import { API_ROUTES } from "@/app/lib/endpoints";
import { api } from "@/app/lib/apiFetch";
import type { AdminOverview } from "@/app/types/api";

export function OverviewView() {
  const { t, lang } = useSite();
  const d = t.dashboardAdmin;

  const [overview, setOverview] = useState<AdminOverview | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOverview() {
      try {
        setOverview(await api<AdminOverview>(API_ROUTES.admin.overview));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error de red");
      } finally {
        setIsLoading(false);
      }
    }
    fetchOverview();
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

  // Desestructuracion segura de la respuesta de la API
  const kpis: Partial<AdminOverview["kpis"]> = overview?.kpis || {};
  const revenue: Partial<AdminOverview["revenue"]> = overview?.revenue || {};
  const activeDealsList = overview?.activeDeals || [];
  const needsAttentionList = overview?.needsAttention || [];
  const signupsList = overview?.recentSignups || [];

  // Mapeo de KPIs
  const activeDealsCount = kpis.activeDeals?.count || 0;
  const activeDealsWeek = kpis.activeDeals?.addedLast7d || 0;
  const totalFunded = kpis.totalFunded ? Number(kpis.totalFunded) : 0;
  const latePaymentsCount = kpis.lateContracts || 0;
  const pendingVerificationsCount = kpis.pendingVerifications || 0;

  // Mapeo de Ingresos
  const closingFees = revenue.closingFees ? Number(revenue.closingFees) : 0;
  // null = el back aun no tiene fuente: la tarjeta se oculta en vez de mostrar $0
  const optional = (v?: string | null) => (v == null ? null : Number(v));
  const subscriptions = optional(revenue.subscriptions);
  const interestShare = optional(revenue.interestShare);
  const affiliatePayouts = optional(revenue.affiliatePayouts);
  const net = optional(revenue.net);
  const netRevenue = net ?? (closingFees + (subscriptions ?? 0) + (interestShare ?? 0) - (affiliatePayouts ?? 0));

  // Manejo de fechas
  const today = new Date();
  const currentDate = today.toLocaleDateString(lang === "es" ? "es-MX" : "en-US", { month: "long", day: "numeric", year: "numeric" });
  
  let currentMonthYear = "";
  if (revenue.month) {
    // El formato de revenue.month es "YYYY-MM"
    const [yyyy, mm] = revenue.month.split("-");
    const dateObj = new Date(Number(yyyy), Number(mm) - 1);
    currentMonthYear = dateObj.toLocaleDateString(lang === "es" ? "es-MX" : "en-US", { month: "short", year: "numeric" });
  }

  // Preparacion de la grafica
  const last6MonthsData = revenue.last6Months || [];
  // Evitar division por 0 si no hay datos altos
  const maxMonthRev = Math.max(...last6MonthsData.map((m) => Number(m.total) || 0), 1000);

  return (
    <div className="animate-in fade-in duration-300">
      <h1 className="mb-1 text-[22px] font-extrabold text-ink">{d.title}</h1>
      <p className="mb-6 text-[13px] text-ink-3">{d.subtitle.replace("{date}", currentDate)}</p>
      
      {/* Fila de KPIs */}
      <div className="mb-7 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        <div className="rounded-[10px] border border-rule bg-surface p-5 shadow-sm">
          <div className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.5px] text-ink-3">{d.kpi.activeDeals}</div>
          <div className="text-[24px] font-extrabold tracking-[-0.5px] text-accent">{activeDealsCount}</div>
          <div className="mt-1 text-[11px] font-semibold text-success">{d.kpi.thisWeek.replace("{n}", String(activeDealsWeek))}</div>
        </div>
        
        <div className="rounded-[10px] border border-rule bg-surface p-5 shadow-sm">
          <div className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.5px] text-ink-3">{d.kpi.totalFunded}</div>
          <div className="text-[24px] font-extrabold tracking-[-0.5px] text-ink">{formatShortCurrency(totalFunded)}</div>
          <div className="mt-1 text-[11px] text-ink-3">{d.kpi.allTime}</div>
        </div>
        
        <div className="rounded-[10px] border border-rule bg-surface p-5 shadow-sm">
          <div className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.5px] text-ink-3">{d.kpi.mrr}</div>
          <div className="text-[24px] font-extrabold tracking-[-0.5px] text-success">{formatCurrency(netRevenue)}</div>
          <div className="mt-1 text-[11px] font-semibold text-success">{d.kpi.thisMonth.replace("{n}", String(closingFees))}</div>
        </div>
        
        <div className="rounded-[10px] border border-rule bg-surface p-5 shadow-sm">
          <div className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.5px] text-ink-3">{d.kpi.pendingVerif}</div>
          <div className="text-[24px] font-extrabold tracking-[-0.5px] text-amber">{pendingVerificationsCount}</div>
          <div className="mt-1 text-[11px] text-ink-3">{d.kpi.awaitingReview}</div>
        </div>
        
        <div className="rounded-[10px] border border-rule bg-surface p-5 shadow-sm">
          <div className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.5px] text-ink-3">{d.kpi.latePayments}</div>
          <div className="text-[24px] font-extrabold tracking-[-0.5px] text-crit">{latePaymentsCount}</div>
          <div className="mt-1 text-[11px] text-ink-3">{d.kpi.actionNeeded}</div>
        </div>
      </div>

      {/* Tarjeta de Ingresos y Grafica */}
      <div className="mb-6 rounded-[10px] border border-rule bg-surface p-6 shadow-sm">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h2 className="text-[14px] font-bold text-ink">{d.revenue.title}</h2>
            <div className="mt-0.5 text-[11px] text-ink-3">{d.revenue.sub}</div>
          </div>
          <div className="text-right">
            <div className="text-[28px] font-extrabold tracking-[-0.5px] text-success">{formatCurrency(netRevenue)}</div>
            <div className="mt-0.5 text-[11px] text-ink-3 capitalize">{currentMonthYear}</div>
          </div>
        </div>
        <div className="mb-4 flex flex-wrap gap-5 border-b border-rule pb-6">
          {subscriptions != null && (
            <div className="text-center">
              <div className="text-[10px] font-bold uppercase tracking-[0.4px] text-ink-3">{d.revenue.subscriptions}</div>
              <div className="mt-1 text-[15px] font-extrabold text-ink">{formatCurrency(subscriptions)}</div>
            </div>
          )}
          <div className="text-center">
            <div className="text-[10px] font-bold uppercase tracking-[0.4px] text-ink-3">{d.revenue.closingFees}</div>
            <div className="mt-1 text-[15px] font-extrabold text-ink">{formatCurrency(closingFees)}</div>
          </div>
          {interestShare != null && (
            <div className="text-center">
              <div className="text-[10px] font-bold uppercase tracking-[0.4px] text-ink-3">{d.revenue.interestShare}</div>
              <div className="mt-1 text-[15px] font-extrabold text-ink">{formatCurrency(interestShare)}</div>
            </div>
          )}
          {affiliatePayouts != null && (
            <div className="text-center">
              <div className="text-[10px] font-bold uppercase tracking-[0.4px] text-ink-3">{d.revenue.affiliatePayouts}</div>
              <div className="mt-1 text-[15px] font-extrabold text-crit">{formatCurrency(affiliatePayouts)}</div>
            </div>
          )}
          {net != null && (
            <div className="text-center">
              <div className="text-[10px] font-bold uppercase tracking-[0.4px] text-ink-3">{d.revenue.netRevenue}</div>
              <div className="mt-1 text-[15px] font-extrabold text-success">{formatCurrency(net)}</div>
            </div>
          )}
        </div>
        
        {/* Grafica dinamica */}
        <div className="flex h-[100px] items-end gap-2">
          {last6MonthsData.length > 0 ? last6MonthsData.map((dataPt, i) => {
            const h = Math.max((Number(dataPt.total) / maxMonthRev) * 100, 10);
            const [yyyy, mm] = dataPt.month.split("-");
            const dateObj = new Date(Number(yyyy), Number(mm) - 1);
            const label = dateObj.toLocaleDateString(lang === "es" ? "es-MX" : "en-US", { month: "short" });
            return (
              <div key={i} className="flex flex-1 flex-col items-center gap-1">
                <div className={`w-full rounded-t-sm ${i === last6MonthsData.length - 1 ? 'bg-accent/50' : 'bg-accent'}`} style={{ height: `${h}px` }} />
                <div className="text-[10px] text-ink-3 capitalize">{label}</div>
              </div>
            );
          }) : (
            <div className="flex h-full w-full items-center justify-center text-[11px] text-ink-3">Sin datos para graficar</div>
          )}
        </div>
      </div>

      {/* Disposicion de 2 Columnas */}
      <div className="mb-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
        
        {/* Tabla de Tratos Activos */}
        <div className="overflow-hidden rounded-[10px] border border-rule bg-surface shadow-sm">
          <div className="flex items-center justify-between border-b border-rule p-4">
            <h3 className="text-[13px] font-bold text-ink">{d.tables.activeDeals}</h3>
            <Link href="/adminDashboard/deals" className="text-[12px] font-semibold text-accent hover:underline">{d.tables.viewAll}</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-2 text-[10px] font-bold uppercase tracking-[0.4px] text-ink-3">
                <tr>
                  <th className="px-4 py-2">{d.tables.property}</th>
                  <th className="px-4 py-2">{d.tables.loan}</th>
                  <th className="px-4 py-2">{d.tables.status}</th>
                  <th className="px-4 py-2">{d.tables.nextPayment}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rule text-[12px] text-ink-2">
                {activeDealsList.length > 0 ? activeDealsList.map((deal, i) => (
                  <tr key={deal.contractId || i} className="hover:bg-surface-2 transition-colors">
                    <td className="px-4 py-2.5 font-bold text-ink">{deal.property?.addressLine1 || "N/A"}</td>
                    <td className="px-4 py-2.5">{formatShortCurrency(Number(deal.principalAmount) || 0)}</td>
                    <td className="px-4 py-2.5">
                      <span className={`inline-block rounded-lg px-2 py-0.5 text-[10px] font-bold ${deal.status === 'ACTIVE' ? 'bg-success-soft text-success' : 'bg-crit-soft text-crit'}`}>
                        {deal.status === 'ACTIVE' ? d.tables.pillActive : deal.status === 'DELINQUENT' ? d.tables.pillLate.replace("{n}", String(deal.daysPastDue || 0)) : deal.status}
                      </span>
                    </td>
                    <td className={`px-4 py-2.5 ${deal.status === 'DELINQUENT' ? 'font-bold text-crit' : ''}`}>
                      {deal.status === 'DELINQUENT' ? 'Overdue' : (deal.nextPaymentDueDate ? new Date(deal.nextPaymentDueDate).toLocaleDateString(lang === "es" ? "es-MX" : "en-US", { month: "short", day: "numeric" }) : "N/A")}
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan={4} className="p-4 text-center text-ink-3">No hay tratos activos.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Lista de Alertas / Acciones */}
        <div className="overflow-hidden rounded-[10px] border border-rule bg-surface shadow-sm">
          <div className="flex items-center justify-between border-b border-rule p-4">
            <h3 className="text-[13px] font-bold text-ink">{d.actions.title}</h3>
            <span className="cursor-pointer text-[12px] font-semibold text-accent hover:underline">{d.actions.clearAll}</span>
          </div>
          <ul className="divide-y divide-rule">
            {needsAttentionList.length > 0 ? needsAttentionList.map((item, i) => (
              <li key={i} className="flex cursor-pointer items-start gap-3 p-3 transition-colors hover:bg-surface-2">
                <div className={`mt-1 h-2 w-2 shrink-0 rounded-full ${item.severity === 'red' ? 'bg-crit' : item.severity === 'yellow' ? 'bg-amber' : 'bg-accent'}`}></div>
                <div className="flex-1 text-[12px] text-ink-2">
                  <strong className="font-bold text-ink">{item.title}</strong> {item.detail}
                </div>
                <div className="text-[11px] text-ink-3">
                  {item.occurredAt ? new Date(item.occurredAt).toLocaleDateString(lang === "es" ? "es-MX" : "en-US", { month: "short", day: "numeric" }) : d.actions.today}
                </div>
              </li>
            )) : (
              <li className="p-4 text-center text-[12px] text-ink-3">No hay alertas pendientes.</li>
            )}
          </ul>
        </div>
      </div>

      {/* Tabla de Registros Recientes */}
      <div className="overflow-hidden rounded-[10px] border border-rule bg-surface shadow-sm">
        <div className="flex items-center justify-between border-b border-rule p-4">
          <h3 className="text-[13px] font-bold text-ink">{d.tables.recentSignups}</h3>
          <Link href="/adminDashboard/lenders" className="text-[12px] font-semibold text-accent hover:underline">{d.tables.viewAllUsers}</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface-2 text-[10px] font-bold uppercase tracking-[0.4px] text-ink-3">
              <tr>
                <th className="px-4 py-2">{d.tables.name}</th>
                <th className="px-4 py-2">{d.tables.type}</th>
                <th className="px-4 py-2">{d.tables.signedUp}</th>
                <th className="px-4 py-2">{d.tables.verified}</th>
                <th className="px-4 py-2">{d.tables.deals}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rule text-[12px] text-ink-2">
              {signupsList.length > 0 ? signupsList.map((u, i) => (
                <tr key={u.userId || i} className="transition-colors hover:bg-surface-2">
                  <td className="px-4 py-2.5 font-bold text-ink">{u.name || "N/A"}</td>
                  <td className="px-4 py-2.5 capitalize">{u.role?.toLowerCase() || "-"}</td>
                  <td className="px-4 py-2.5">
                    {u.createdAt ? new Date(u.createdAt).toLocaleDateString(lang === "es" ? "es-MX" : "en-US", { month: "short", day: "numeric" }) : "N/A"}
                  </td>
                  <td className="px-4 py-2.5">
                    <span className={`inline-block rounded-lg px-2 py-0.5 text-[10px] font-bold ${u.verification === "APPROVED" ? 'bg-success-soft text-success' : 'border border-amber/30 bg-amber-soft text-amber'}`}>
                      {u.verification === "APPROVED" ? d.tables.pillActive : d.tables.pillPending}
                    </span>
                  </td>
                  <td className="px-4 py-2.5">{u.dealsCount || 0}</td>
                </tr>
              )) : (
                <tr><td colSpan={5} className="p-4 text-center text-ink-3">No hay registros recientes.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}