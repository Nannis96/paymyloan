"use client";

import { useSite } from "@/app/components/layout/SiteShell";

export function LendersView({ users }: { users: any[] }) {
  const { t, lang } = useSite();
  const d = t.dashboardAdmin;
  const v = d.views.lenders;
  
  const lenders = users.filter(u => u.role === "LENDER");

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
                <th className="px-4 py-3">{d.tables.verified}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rule text-[12px] text-ink-2">
              {lenders.length > 0 ? lenders.map((u, i) => (
                <tr key={u.id || i} className="hover:bg-surface-2 transition-colors">
                  <td className="px-4 py-3 font-bold text-ink">{u.name}</td>
                  <td className="px-4 py-3">{u.createdAt ? new Date(u.createdAt).toLocaleDateString(lang === "es" ? "es-MX" : "en-US", { month: "short", day: "numeric" }) : "N/A"}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block rounded-lg px-2 py-0.5 text-[10px] font-bold ${u.isActive ? 'bg-success-soft text-success' : 'bg-amber-soft border border-amber/30 text-amber'}`}>
                      {u.isActive ? d.tables.pillActive : d.tables.pillPending}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={3} className="p-6 text-center text-ink-3">{t.adminUsersList.empty}</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}