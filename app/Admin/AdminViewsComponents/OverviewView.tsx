"use client";

import { useSite } from "@/app/components/layout/SiteShell";
import { formatCurrency, formatShortCurrency } from "./utils";

export function OverviewView({ contracts, users, setActiveTab }: { contracts: any[], users: any[], setActiveTab: (t: string) => void }) {
  const { t, lang } = useSite();
  const d = t.dashboardAdmin;

  // Calculo de KPIs
  const activeDealsList = contracts.filter(c => ["ACTIVE", "DELINQUENT"].includes(c.status));
  const activeDealsCount = activeDealsList.length;
  const totalFunded = contracts.reduce((sum, c) => sum + Number(c.currentTerms?.principalAmount || 0), 0);
  const latePaymentsCount = contracts.filter(c => c.status === "DELINQUENT").length;
  const pendingVerificationsCount = users.filter(u => !u.isActive).length;

  // Fechas y Mocks
  const today = new Date();
  const currentDate = today.toLocaleDateString(lang === "es" ? "es-MX" : "en-US", { month: "long", day: "numeric", year: "numeric" });
  const currentMonthYear = today.toLocaleDateString(lang === "es" ? "es-MX" : "en-US", { month: "short", year: "numeric" });

  const last6Months = Array.from({ length: 6 }).map((_, i) => {
    const dt = new Date();
    dt.setMonth(dt.getMonth() - (5 - i));
    return dt.toLocaleDateString(lang === "es" ? "es-MX" : "en-US", { month: "short" });
  });

  const chartData = [40, 55, 50, 70, 80, 95];
  const mockMrr = 7240;
  const mockRevenue = {
    subscriptions: 4851,
    closingFees: 1725,
    interestShare: 664,
    affiliatePayouts: -1810,
    net: 5430
  };

  return (
    <div className="animate-in fade-in duration-300">
      <h1 className="mb-1 text-[22px] font-extrabold text-ink">{d.title}</h1>
      <p className="mb-6 text-[13px] text-ink-3">{d.subtitle.replace("{date}", currentDate)}</p>

      {/* KPI Row */}
      <div className="mb-7 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        <div className="rounded-[10px] border border-rule bg-surface p-5 shadow-sm">
          <div className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.5px] text-ink-3">{d.kpi.activeDeals}</div>
          <div className="text-[24px] font-extrabold tracking-[-0.5px] text-accent">{activeDealsCount || 34}</div>
          <div className="mt-1 text-[11px] font-semibold text-success">{d.kpi.thisWeek.replace("{n}", "3")}</div>
        </div>
        <div className="rounded-[10px] border border-rule bg-surface p-5 shadow-sm">
          <div className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.5px] text-ink-3">{d.kpi.totalFunded}</div>
          <div className="text-[24px] font-extrabold tracking-[-0.5px] text-ink">{totalFunded ? formatShortCurrency(totalFunded) : "$3.8M"}</div>
          <div className="mt-1 text-[11px] text-ink-3">{d.kpi.allTime}</div>
        </div>
        <div className="rounded-[10px] border border-rule bg-surface p-5 shadow-sm">
          <div className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.5px] text-ink-3">{d.kpi.mrr}</div>
          <div className="text-[24px] font-extrabold tracking-[-0.5px] text-success">{formatCurrency(mockMrr)}</div>
          <div className="mt-1 text-[11px] font-semibold text-success">{d.kpi.thisMonth.replace("{n}", "420")}</div>
        </div>
        <div className="rounded-[10px] border border-rule bg-surface p-5 shadow-sm">
          <div className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.5px] text-ink-3">{d.kpi.pendingVerif}</div>
          <div className="text-[24px] font-extrabold tracking-[-0.5px] text-amber">{pendingVerificationsCount || 7}</div>
          <div className="mt-1 text-[11px] text-ink-3">{d.kpi.awaitingReview}</div>
        </div>
        <div className="rounded-[10px] border border-rule bg-surface p-5 shadow-sm">
          <div className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.5px] text-ink-3">{d.kpi.latePayments}</div>
          <div className="text-[24px] font-extrabold tracking-[-0.5px] text-crit">{latePaymentsCount || 3}</div>
          <div className="mt-1 text-[11px] text-ink-3">{d.kpi.actionNeeded}</div>
        </div>
      </div>

      {/* Revenue Card (Mock) */}
      <div className="mb-6 rounded-[10px] border border-rule bg-surface p-6 shadow-sm">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h2 className="text-[14px] font-bold text-ink">{d.revenue.title}</h2>
            <div className="mt-0.5 text-[11px] text-ink-3">{d.revenue.sub}</div>
          </div>
          <div className="text-right">
            <div className="text-[28px] font-extrabold tracking-[-0.5px] text-success">{formatCurrency(mockMrr)}</div>
            <div className="mt-0.5 text-[11px] text-ink-3 capitalize">{currentMonthYear}</div>
          </div>
        </div>
        <div className="mb-4 flex flex-wrap gap-5 border-b border-rule pb-6">
          <div className="text-center">
            <div className="text-[10px] font-bold uppercase tracking-[0.4px] text-ink-3">{d.revenue.subscriptions}</div>
            <div className="mt-1 text-[15px] font-extrabold text-ink">{formatCurrency(mockRevenue.subscriptions)}</div>
          </div>
          <div className="text-center">
            <div className="text-[10px] font-bold uppercase tracking-[0.4px] text-ink-3">{d.revenue.closingFees}</div>
            <div className="mt-1 text-[15px] font-extrabold text-ink">{formatCurrency(mockRevenue.closingFees)}</div>
          </div>
          <div className="text-center">
            <div className="text-[10px] font-bold uppercase tracking-[0.4px] text-ink-3">{d.revenue.interestShare}</div>
            <div className="mt-1 text-[15px] font-extrabold text-ink">{formatCurrency(mockRevenue.interestShare)}</div>
          </div>
          <div className="text-center">
            <div className="text-[10px] font-bold uppercase tracking-[0.4px] text-ink-3">{d.revenue.affiliatePayouts}</div>
            <div className="mt-1 text-[15px] font-extrabold text-crit">{formatCurrency(mockRevenue.affiliatePayouts)}</div>
          </div>
          <div className="text-center">
            <div className="text-[10px] font-bold uppercase tracking-[0.4px] text-ink-3">{d.revenue.netRevenue}</div>
            <div className="mt-1 text-[15px] font-extrabold text-success">{formatCurrency(mockRevenue.net)}</div>
          </div>
        </div>
        
        {/* Chart Mock */}
        <div className="flex h-[100px] items-end gap-2">
          {chartData.map((h, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1">
              <div className={`w-full rounded-t-sm ${i === 5 ? 'bg-accent/50' : 'bg-accent'}`} style={{ height: `${h}px` }} />
              <div className="text-[10px] text-ink-3 capitalize">{last6Months[i]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 2 Column Layout: Active Deals & Needs Attention */}
      <div className="mb-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Active Deals Table */}
        <div className="overflow-hidden rounded-[10px] border border-rule bg-surface shadow-sm">
          <div className="flex items-center justify-between border-b border-rule p-4">
            <h3 className="text-[13px] font-bold text-ink">{d.tables.activeDeals}</h3>
            <span onClick={() => setActiveTab("allDeals")} className="cursor-pointer text-[12px] font-semibold text-accent hover:underline">{d.tables.viewAll}</span>
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
                {activeDealsList.length > 0 ? activeDealsList.slice(0, 5).map((deal: any, i) => (
                  <tr key={deal.id || i} className="hover:bg-surface-2 transition-colors">
                    <td className="px-4 py-2.5 font-bold text-ink">{deal.property?.addressLine1 || "3802 University Cove"}</td>
                    <td className="px-4 py-2.5">{formatShortCurrency(Number(deal.currentTerms?.principalAmount) || 115000)}</td>
                    <td className="px-4 py-2.5">
                      <span className={`inline-block rounded-lg px-2 py-0.5 text-[10px] font-bold ${deal.status === 'ACTIVE' ? 'bg-success-soft text-success' : 'bg-crit-soft text-crit'}`}>
                        {deal.status === 'ACTIVE' ? d.tables.pillActive : d.tables.pillLate.replace("{n}", "15")}
                      </span>
                    </td>
                    <td className={`px-4 py-2.5 ${deal.status === 'DELINQUENT' ? 'font-bold text-crit' : ''}`}>
                      {deal.status === 'DELINQUENT' ? 'Overdue' : (deal.nextPaymentDueDate ? new Date(deal.nextPaymentDueDate).toLocaleDateString(lang === "es" ? "es-MX" : "en-US", { month: "short", day: "numeric" }) : "Nov 1")}
                    </td>
                  </tr>
                )) : (
                  // Mock data fallback if DB is empty
                  <tr className="hover:bg-surface-2 transition-colors">
                    <td className="px-4 py-2.5 font-bold text-ink">3802 University Cove</td>
                    <td className="px-4 py-2.5">$115K</td>
                    <td className="px-4 py-2.5"><span className="inline-block rounded-lg bg-success-soft px-2 py-0.5 text-[10px] font-bold text-success">{d.tables.pillActive}</span></td>
                    <td className="px-4 py-2.5">Nov 1</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Items List */}
        <div className="overflow-hidden rounded-[10px] border border-rule bg-surface shadow-sm">
          <div className="flex items-center justify-between border-b border-rule p-4">
            <h3 className="text-[13px] font-bold text-ink">{d.actions.title}</h3>
            <span className="cursor-pointer text-[12px] font-semibold text-accent hover:underline">{d.actions.clearAll}</span>
          </div>
          <ul className="divide-y divide-rule">
            <li className="flex cursor-pointer items-start gap-3 p-3 hover:bg-surface-2 transition-colors">
              <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-crit"></div>
              <div className="flex-1 text-[12px] text-ink-2">
                <strong className="font-bold text-ink">5521 Germantown Rd</strong> {d.actions.items[0].text.replace("{n}", "15")}
              </div>
              <div className="text-[11px] text-ink-3">{d.actions.today}</div>
            </li>
            <li className="flex cursor-pointer items-start gap-3 p-3 hover:bg-surface-2 transition-colors">
              <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-crit"></div>
              <div className="flex-1 text-[12px] text-ink-2">
                <strong className="font-bold text-ink">3 verifications pending</strong> {d.actions.items[1].text}
              </div>
              <div className="text-[11px] text-ink-3">{d.actions.today}</div>
            </li>
            <li className="flex cursor-pointer items-start gap-3 p-3 hover:bg-surface-2 transition-colors">
              <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber"></div>
              <div className="flex-1 text-[12px] text-ink-2">
                <strong className="font-bold text-ink">Johnson Flips LLC</strong> {d.actions.items[2].text}
              </div>
              <div className="text-[11px] text-ink-3">Sept 20</div>
            </li>
          </ul>
        </div>
      </div>

      {/* Recent Signups */}
      <div className="overflow-hidden rounded-[10px] border border-rule bg-surface shadow-sm">
        <div className="flex items-center justify-between border-b border-rule p-4">
          <h3 className="text-[13px] font-bold text-ink">{d.tables.recentSignups}</h3>
          <span onClick={() => setActiveTab("lenders")} className="cursor-pointer text-[12px] font-semibold text-accent hover:underline">{d.tables.viewAllUsers}</span>
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
                <th className="px-4 py-2">{d.tables.revenue}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rule text-[12px] text-ink-2">
              {users.length > 0 ? users.slice(0, 5).map((u: any, i) => (
                <tr key={u.id || i} className="hover:bg-surface-2 transition-colors">
                  <td className="px-4 py-2.5 font-bold text-ink">{u.name || "Marcus Johnson"}</td>
                  <td className="px-4 py-2.5 capitalize">{u.role?.toLowerCase() || "Borrower"}</td>
                  <td className="px-4 py-2.5">
                    {u.createdAt ? new Date(u.createdAt).toLocaleDateString(lang === "es" ? "es-MX" : "en-US", { month: "short", day: "numeric" }) : "Sept 20"}
                  </td>
                  <td className="px-4 py-2.5">
                    <span className={`inline-block rounded-lg px-2 py-0.5 text-[10px] font-bold ${u.isActive ? 'bg-success-soft text-success' : 'bg-amber-soft border border-amber/30 text-amber'}`}>
                      {u.isActive ? d.tables.pillActive : d.tables.pillPending}
                    </span>
                  </td>
                  <td className="px-4 py-2.5">1</td>
                  <td className="px-4 py-2.5 font-bold text-success">{formatCurrency(1249)}</td>
                </tr>
              )) : (
                <tr className="hover:bg-surface-2 transition-colors">
                  <td className="px-4 py-2.5 font-bold text-ink">Marcus Johnson</td>
                  <td className="px-4 py-2.5">Borrower</td>
                  <td className="px-4 py-2.5">Sept 20</td>
                  <td className="px-4 py-2.5"><span className="inline-block rounded-lg bg-success-soft px-2 py-0.5 text-[10px] font-bold text-success">{d.tables.pillActive}</span></td>
                  <td className="px-4 py-2.5">1</td>
                  <td className="px-4 py-2.5 font-bold text-success">$1,249</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}