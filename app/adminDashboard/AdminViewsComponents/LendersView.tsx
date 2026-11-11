"use client";

import { useState, useEffect } from "react";
import { useSite } from "@/app/components/layout/SiteShell";
import { API_ROUTES } from "@/app/lib/endpoints";
import { api } from "@/app/lib/apiFetch";
import type { AdminLender, Paginated } from "@/app/types/api";
import { LenderDetailDrawer } from "./LenderDetailDrawer";

const PAGE_SIZE = 20;

export function LendersView() {
  const { t, lang } = useSite();
  const d = t.dashboardAdmin;
  const v = d.views.lenders;

  const [lenders, setLenders] = useState<AdminLender[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  // Espera 300 ms tras la ultima tecla antes de buscar, y vuelve a la pagina 1.
  useEffect(() => {
    const id = setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 300);
    return () => clearTimeout(id);
  }, [searchInput]);

  useEffect(() => {
    let vigente = true;
    const params = new URLSearchParams({ page: String(page), pageSize: String(PAGE_SIZE) });
    if (search) params.set("search", search);
    api<Paginated<AdminLender>>(`${API_ROUTES.lenders.adminBase}?${params}`)
      .then((data) => {
        if (!vigente) return;
        setLenders(data.items ?? []);
        setTotalPages(Math.max(1, data.totalPages ?? 1));
        setTotal(data.total ?? 0);
        setError(null);
      })
      .catch((err) => vigente && setError(err instanceof Error ? err.message : d.errorNetwork))
      .finally(() => vigente && setIsLoading(false));
    return () => { vigente = false; };
  }, [page, search, reloadKey, d.errorNetwork]);

  return (
    <div className="animate-in fade-in duration-300">
      <h1 className="mb-1 text-[22px] font-extrabold text-ink">{v.title}</h1>
      <p className="mb-6 text-[13px] text-ink-3">{v.subtitle}</p>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder={v.searchPlaceholder}
          aria-label={v.searchPlaceholder}
          className="w-full rounded-lg border border-rule bg-surface px-3 py-2 text-[13px] text-ink outline-none focus:border-accent sm:max-w-[320px]"
        />
        <span className="text-[12px] text-ink-3">{t.auditLogs.totalRecords} <strong className="text-ink">{total}</strong></span>
      </div>

      {error && <div className="mb-4 rounded-lg bg-crit-soft p-3 text-[13px] font-medium text-crit">{error}</div>}
      
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
              {isLoading ? (
                <tr><td colSpan={5} className="p-6 text-center text-ink-3">{d.loading}</td></tr>
              ) : lenders.length > 0 ? lenders.map((lenderItem, i) => {
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

        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-rule bg-surface-2 px-4 py-3">
            <span className="text-[12px] text-ink-3">
              {t.auditLogs.page} <strong className="text-ink">{page}</strong> {t.auditLogs.of} <strong className="text-ink">{totalPages}</strong>
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={page <= 1 || isLoading}
                onClick={() => setPage((p) => p - 1)}
                className="rounded-[4px] border border-rule bg-surface px-3 py-1.5 text-xs font-bold text-ink transition-colors hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
              >
                {t.auditLogs.prev}
              </button>
              <button
                type="button"
                disabled={page >= totalPages || isLoading}
                onClick={() => setPage((p) => p + 1)}
                className="rounded-[4px] border border-rule bg-surface px-3 py-1.5 text-xs font-bold text-ink transition-colors hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
              >
                {t.auditLogs.next}
              </button>
            </div>
          </div>
        )}
      </div>

      {selectedId && <LenderDetailDrawer
          key={selectedId}
          lenderId={selectedId}
          onClose={() => setSelectedId(null)}
          onChanged={() => setReloadKey((k) => k + 1)}
        />}
    </div>
  );
}