// app/admin/AdminViewsComponents/AuditLogsView.tsx
"use client";

import { API_ROUTES } from "@/app/lib/endpoints";
import { apiFetch } from "@/app/lib/apiFetch";
import { useState, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight, User, Shield, Cpu, Calendar } from "lucide-react";
import { useSite } from "@/app/components/layout/SiteShell";


export type ActorRole = "ADMIN" | "LENDER" | "BORROWER" | "SYSTEM";

export type LogItem = {
  id: string;
  actorRole: ActorRole;
  actorName: string;
  action: string;
  entityType: string;
  description: string;
  createdAt: string;
};

export function AuditLogsView() {
  const { t } = useSite();
  const a = t.auditLogs;

  const [logs, setLogs] = useState<LogItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados para paginacion y filtros
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState("");
  const [actorRole, setActorRole] = useState("");

  useEffect(() => {
    async function fetchLogs() {
      setIsLoading(true);
      setError(null);
      
      try {

        const params = new URLSearchParams({
          page: String(currentPage),
          pageSize: "20"
        });
        
        if (search) params.set("action", search);
        if (actorRole) params.set("actorRole", actorRole);

        const response = await apiFetch(`${API_ROUTES.auditLogs}?${params.toString()}`);

        if (!response.ok) {
          throw new Error("Error al cargar los registros de auditoria");
        }

        const json = await response.json();
        
        if (json.success) {
          setLogs(json.data.items || []);
          setCurrentPage(json.data.page || 1);
          setTotalPages(json.data.totalPages || 1);
          setTotalCount(json.data.total || 0);
        } else {
          throw new Error(json.error?.message || "Error de la API");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error de red");
      } finally {
        setIsLoading(false);
      }
    }

    fetchLogs();
  }, [currentPage, search, actorRole]);

  const handleFilterChange = (key: string, value: string) => {
    if (key === "search") setSearch(value);
    if (key === "actorRole") setActorRole(value);
    setCurrentPage(1);
  };

  const getActorBadge = (role: ActorRole) => {
    switch (role) {
      case "SYSTEM":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-[4px] bg-purple-500/10 px-2 py-1 text-[11px] font-bold text-purple-500 border border-purple-500/20">
            <Cpu className="h-3 w-3" /> {a.system}
          </span>
        );
      case "ADMIN":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-[4px] bg-accent/10 px-2 py-1 text-[11px] font-bold text-accent border border-accent/20">
            <Shield className="h-3 w-3" /> {a.admins}
          </span>
        );
      case "LENDER":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-[4px] bg-amber-500/10 px-2 py-1 text-[11px] font-bold text-amber-600 border border-amber-500/20">
            <User className="h-3 w-3" /> {a.lenders}
          </span>
        );
      case "BORROWER":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-[4px] bg-green-500/10 px-2 py-1 text-[11px] font-bold text-green-600 border border-green-500/20">
            <User className="h-3 w-3" /> {a.borrowers}
          </span>
        );
      default:
        return <span className="text-[11px] font-bold text-ink-3">{role}</span>;
    }
  };

  return (
    <div className="animate-in fade-in duration-300">
      <div className="mb-[24px]">
        <h1 className="mb-1 text-[22px] font-extrabold text-ink">
          {t.dashboardAdmin.nav.auditLogs}
        </h1>
        <p className="mt-[2px] text-[13px] text-ink-3">
          {t.dashboardAdmin.views.auditLogs?.subtitle}
        </p>
      </div>

      <div className="space-y-6">
        {/* Barra de Filtros */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 rounded-xl border border-rule bg-surface p-4 shadow-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-3" />
            <input
              type="text"
              placeholder={a.searchPlaceholder}
              value={search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="w-full rounded-lg border border-rule bg-surface-2 py-2.5 pl-9 pr-3 text-sm text-ink placeholder:text-ink-3 focus:border-accent focus:bg-surface outline-none transition-colors"
            />
          </div>
          
          <select
            value={actorRole}
            onChange={(e) => handleFilterChange("actorRole", e.target.value)}
            className="rounded-lg border border-rule bg-surface-2 px-3 py-2.5 text-sm text-ink focus:border-accent focus:bg-surface outline-none transition-colors cursor-pointer"
          >
            <option value="">{a.allRoles}</option>
            <option value="SYSTEM">{a.system}</option>
            <option value="ADMIN">{a.admins}</option>
            <option value="LENDER">{a.lenders}</option>
            <option value="BORROWER">{a.borrowers}</option>
          </select>

          <div className="flex items-center justify-end rounded-lg border border-rule bg-surface-2 px-4 py-2.5 text-sm text-ink-3">
            <span>{a.totalRecords}&nbsp;</span>
            <span className="font-bold text-ink">{totalCount}</span>
          </div>
        </div>

        {error && (
          <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-500">
            {error}
          </div>
        )}

        {/* Tabla de Logs */}
        <div className={`overflow-x-auto rounded-xl border border-rule bg-surface shadow-sm transition-opacity duration-200 ${isLoading ? "opacity-50" : "opacity-100"}`}>
          <table className="w-full min-w-[900px] border-collapse text-left text-[14px]">
            <thead className="border-b border-rule bg-surface-2">
              <tr>
                <th className="px-5 py-4 font-bold text-ink-3 text-[10px] uppercase tracking-[0.5px]">{a.dateHour}</th>
                <th className="px-5 py-4 font-bold text-ink-3 text-[10px] uppercase tracking-[0.5px]">{a.actor}</th>
                <th className="px-5 py-4 font-bold text-ink-3 text-[10px] uppercase tracking-[0.5px]">{a.action}</th>
                <th className="px-5 py-4 font-bold text-ink-3 text-[10px] uppercase tracking-[0.5px]">{a.description}</th>
              </tr>
            </thead>
            <tbody className="text-ink-2 divide-y divide-rule">
              {logs.length === 0 && !isLoading ? (
                <tr>
                  <td colSpan={4} className="px-5 py-12 text-center text-[13px] text-ink-3">
                    {a.noRecords}
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-surface-2 transition-colors">
                    <td className="whitespace-nowrap px-5 py-4 text-xs">
                      <div className="flex items-center gap-1.5 text-ink-3">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(log.createdAt).toLocaleString("es-MX")}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4">
                      <div className="space-y-1">
                        <div>{getActorBadge(log.actorRole)}</div>
                        <div className="text-xs font-bold text-ink pl-1">{log.actorName}</div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4">
                      <span className="inline-flex rounded-[4px] border border-rule-strong bg-surface-2 px-2 py-1 font-mono text-[11px] font-bold text-ink">
                        {log.action}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm leading-relaxed">
                      {log.description}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Paginacion */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-rule bg-surface-2 px-5 py-4">
              <span className="text-sm text-ink-3">
                {a.page} <span className="font-bold text-ink">{currentPage}</span> {a.of} <span className="font-bold text-ink">{totalPages}</span>
              </span>
              <div className="flex gap-2">
                <button
                  disabled={currentPage <= 1 || isLoading}
                  onClick={() => setCurrentPage(c => c - 1)}
                  className="inline-flex items-center gap-1 rounded-[4px] border border-rule bg-surface px-3 py-1.5 text-xs font-bold text-ink transition-colors hover:bg-surface-2 hover:text-accent disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-3.5 w-3.5" /> {a.prev}
                </button>
                <button
                  disabled={currentPage >= totalPages || isLoading}
                  onClick={() => setCurrentPage(c => c + 1)}
                  className="inline-flex items-center gap-1 rounded-[4px] border border-rule bg-surface px-3 py-1.5 text-xs font-bold text-ink transition-colors hover:bg-surface-2 hover:text-accent disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {a.next} <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}