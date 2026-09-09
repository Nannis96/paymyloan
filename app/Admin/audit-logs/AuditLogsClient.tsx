"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Search, ChevronLeft, ChevronRight, User, Shield, Cpu, Calendar } from "lucide-react";

// Tipos adaptados a PayMyLoan
export type ActorRole = "ADMIN" | "LENDER" | "BORROWER" | "SYSTEM";

export type LogItem = {
  id: string;
  actorRole: ActorRole;
  actorName: string;
  action: string;
  entityType: string;
  description: string;
  createdAt: string; // Para este ejemplo simplificamos a string ISO
};

interface Props {
  logs: LogItem[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
  currentFilters: {
    actorRole: string;
    search: string;
  };
}

export function AuditLogsClient({ logs, currentPage, totalPages, totalCount, currentFilters }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    
    params.set("page", "1"); // Resetear a pág 1 al buscar
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const getActorBadge = (role: ActorRole) => {
    switch (role) {
      case "SYSTEM": // Ideal para eventos de Webhooks / API
        return (
          <span className="inline-flex items-center gap-1.5 rounded-[4px] bg-purple-500/10 px-2 py-1 text-[11px] font-bold text-purple-500 border border-purple-500/20">
            <Cpu className="h-3 w-3" /> Sistema / API
          </span>
        );
      case "ADMIN":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-[4px] bg-accent-soft px-2 py-1 text-[11px] font-bold text-accent border border-accent/20">
            <Shield className="h-3 w-3" /> Admin
          </span>
        );
      case "LENDER":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-[4px] bg-amber-soft px-2 py-1 text-[11px] font-bold text-amber border border-amber/20">
            <User className="h-3 w-3" /> Prestamista
          </span>
        );
      case "BORROWER":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-[4px] bg-green-500/10 px-2 py-1 text-[11px] font-bold text-green-600 border border-green-500/20">
            <User className="h-3 w-3" /> Prestatario
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Barra de Filtros */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 rounded-xl border border-rule bg-surface p-4 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-3" />
          <input
            type="text"
            placeholder="Buscar por acción o descripción..."
            defaultValue={currentFilters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="w-full rounded-lg border border-rule bg-surface-2 py-2.5 pl-9 pr-3 text-sm text-ink placeholder:text-ink-3 focus:border-accent focus:outline-none transition-colors"
          />
        </div>
        
        <select
          value={currentFilters.actorRole}
          onChange={(e) => handleFilterChange("actorRole", e.target.value)}
          className="rounded-lg border border-rule bg-surface-2 px-3 py-2.5 text-sm text-ink focus:border-accent focus:outline-none transition-colors cursor-pointer"
        >
          <option value="">Todos los Roles</option>
          <option value="SYSTEM">Sistema / Webhooks</option>
          <option value="ADMIN">Administradores</option>
          <option value="LENDER">Prestamistas</option>
          <option value="BORROWER">Prestatarios</option>
        </select>

        <div className="flex items-center justify-end rounded-lg border border-rule-strong bg-surface-2 px-4 py-2.5 text-sm text-ink-3">
          <span>Total de registros:&nbsp;</span>
          <span className="font-bold text-ink">{totalCount}</span>
        </div>
      </div>

      {/* Tabla de Logs */}
      <div className={`overflow-x-auto rounded-xl border border-rule bg-surface shadow-sm transition-opacity duration-200 ${isPending ? "opacity-50" : "opacity-100"}`}>
        <table className="w-full min-w-[900px] border-collapse text-left text-[14px]">
          <thead className="border-b border-rule bg-surface-2">
            <tr>
              <th className="px-5 py-4 font-bold text-ink-3 text-xs uppercase tracking-wider">Fecha / Hora</th>
              <th className="px-5 py-4 font-bold text-ink-3 text-xs uppercase tracking-wider">Actor</th>
              <th className="px-5 py-4 font-bold text-ink-3 text-xs uppercase tracking-wider">Acción</th>
              <th className="px-5 py-4 font-bold text-ink-3 text-xs uppercase tracking-wider">Descripción del Evento</th>
            </tr>
          </thead>
          <tbody className="text-ink-2 divide-y divide-rule">
            {logs.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-5 py-12 text-center text-ink-3">
                  No se encontraron registros de auditoría.
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

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-rule bg-surface-2 px-5 py-4">
            <span className="text-sm text-ink-3">
              Página <span className="font-bold text-ink">{currentPage}</span> de <span className="font-bold text-ink">{totalPages}</span>
            </span>
            <div className="flex gap-2">
              <button
                disabled={currentPage <= 1 || isPending}
                onClick={() => handlePageChange(currentPage - 1)}
                className="inline-flex items-center gap-1 rounded-[4px] border border-rule bg-surface px-3 py-1.5 text-xs font-bold text-ink transition-colors hover:bg-surface-2 hover:text-accent disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-3.5 w-3.5" /> Anterior
              </button>
              <button
                disabled={currentPage >= totalPages || isPending}
                onClick={() => handlePageChange(currentPage + 1)}
                className="inline-flex items-center gap-1 rounded-[4px] border border-rule bg-surface px-3 py-1.5 text-xs font-bold text-ink transition-colors hover:bg-surface-2 hover:text-accent disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Siguiente <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}