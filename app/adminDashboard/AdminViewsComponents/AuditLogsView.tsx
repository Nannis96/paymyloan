"use client";

import { API_ROUTES } from "@/app/lib/endpoints";
import { api } from "@/app/lib/apiFetch";
import type { Paginated } from "@/app/types/api";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, User, Cpu, Calendar } from "lucide-react";
import { useSite } from "@/app/components/layout/SiteShell";

// Forma real de GET /api/audit-logs (el back devuelve el AuditLog de Prisma tal cual,
// sin nombre ni rol del actor).
type AuditLog = {
  id: string;
  actorUserId: string | null;
  isSystemActor: boolean;
  systemActorLabel: string | null;
  action: string;
  entityType: string;
  entityId: string | null;
  contractId: string | null;
  metadata: unknown;
  createdAt: string;
};

// Valores que hoy escribe el back (grep de `action:`/`entityType:` en paymyloan-back/src/services).
// El filtro es por igualdad exacta: estas listas solo sugieren, la accion acepta texto libre.
const ACTIONS = [
  "BORROWER_CREATED", "BORROWER_LINKED_TO_LENDER", "BORROWER_UNLINKED_FROM_LENDER", "BORROWER_UPDATED",
  "CONTRACT_ACTIVATED", "CONTRACT_BORROWER_ADDED", "CONTRACT_BORROWER_REMOVED", "CONTRACT_CANCELLED",
  "CONTRACT_CREATED", "CONTRACT_DELETED", "CONTRACT_FEE_ITEM_ADDED", "CONTRACT_FEE_ITEM_REMOVED",
  "CONTRACT_TERMS_ACCEPTED", "CONTRACT_TERMS_PROPOSED", "CONTRACT_TERMS_REJECTED", "CONTRACT_TERMS_SUBMITTED",
  "CONTRACT_UPDATED", "LENDER_COMPANY_CREATED", "LENDER_COMPANY_DELETED", "LENDER_COMPANY_SUSPENDED",
  "LENDER_COMPANY_UPDATED", "LENDER_CREATED", "LENDER_DELETED", "LOAN_QUOTE_SELECTED", "LOAN_QUOTE_SUBMITTED",
  "LOAN_QUOTE_WITHDRAWN", "LOAN_REQUEST_CREATED", "LOAN_REQUEST_PUBLISHED", "LOAN_REQUEST_TARGET_ADDED",
  "LOAN_REQUEST_TARGET_REMOVED", "LOAN_REQUEST_UPDATED", "LOAN_REQUEST_WITHDRAWN", "TRANSACTION_CREATED",
  "TRANSACTION_RETURNED", "TRANSACTION_SUCCEEDED", "USER_ACTIVATED", "USER_DEACTIVATED", "USER_EMAIL_CHANGED",
  "USER_LOGIN_FAILED", "USER_LOGIN_SUCCESS", "USER_PASSWORD_CHANGED", "VERIFICATION_SUBMITTED",
];
const ENTITY_TYPES = [
  "BorrowerProfile", "Contract", "ContractBorrower", "ContractFeeItem", "ContractTerms", "LenderBorrower",
  "LenderCompany", "LoanQuote", "LoanRequest", "LoanRequestLenderTarget", "Transaction", "User", "VerificationRequest",
];

const shortId = (id: string | null) => (id ? `${id.slice(0, 8)}…` : "—");

export function AuditLogsView() {
  const { t, lang } = useSite();
  const a = t.auditLogs;

  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [actionInput, setActionInput] = useState("");
  const [action, setAction] = useState("");
  const [entityType, setEntityType] = useState("");

  // Espera 400 ms tras la ultima tecla: el back compara la accion exacta.
  useEffect(() => {
    const id = setTimeout(() => {
      setAction(actionInput.trim().toUpperCase());
      setCurrentPage(1);
    }, 400);
    return () => clearTimeout(id);
  }, [actionInput]);

  useEffect(() => {
    let vigente = true;
    const params = new URLSearchParams({ page: String(currentPage), pageSize: "20" });
    if (action) params.set("action", action);
    if (entityType) params.set("entityType", entityType);

    api<Paginated<AuditLog>>(`${API_ROUTES.auditLogs}?${params}`)
      .then((data) => {
        if (!vigente) return;
        setLogs(data.items || []);
        setTotalPages(Math.max(1, data.totalPages || 1));
        setTotalCount(data.total || 0);
        setError(null);
      })
      .catch((err) => vigente && setError(err instanceof Error ? err.message : t.dashboardAdmin.errorNetwork))
      .finally(() => vigente && setIsLoading(false));
    return () => { vigente = false; };
  }, [currentPage, action, entityType, t.dashboardAdmin.errorNetwork]);

  const metadataText = (m: unknown) => {
    if (m == null) return "";
    const s = typeof m === "string" ? m : JSON.stringify(m);
    return s.length > 120 ? `${s.slice(0, 120)}…` : s;
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
        <div className="rounded-xl border border-rule bg-surface p-4 shadow-sm">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <input
              type="search"
              list="audit-actions"
              placeholder={a.searchPlaceholder}
              aria-label={a.action}
              value={actionInput}
              onChange={(e) => setActionInput(e.target.value)}
              className="w-full rounded-lg border border-rule bg-surface-2 px-3 py-2.5 font-mono text-sm text-ink placeholder:font-sans placeholder:text-ink-3 focus:border-accent focus:bg-surface outline-none transition-colors"
            />
            <datalist id="audit-actions">
              {ACTIONS.map((x) => <option key={x} value={x} />)}
            </datalist>

            <select
              value={entityType}
              aria-label={a.entity}
              onChange={(e) => { setEntityType(e.target.value); setCurrentPage(1); }}
              className="rounded-lg border border-rule bg-surface-2 px-3 py-2.5 text-sm text-ink focus:border-accent focus:bg-surface outline-none transition-colors cursor-pointer"
            >
              <option value="">{a.allEntities}</option>
              {ENTITY_TYPES.map((x) => <option key={x} value={x}>{x}</option>)}
            </select>

            <div className="flex items-center justify-end rounded-lg border border-rule bg-surface-2 px-4 py-2.5 text-sm text-ink-3">
              <span>{a.totalRecords}&nbsp;</span>
              <span className="font-bold text-ink">{totalCount}</span>
            </div>
          </div>
          <p className="mt-3 text-[11px] text-ink-3">{a.filtersNote}</p>
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
                <th className="px-5 py-4 font-bold text-ink-3 text-[10px] uppercase tracking-[0.5px]">{a.entity}</th>
                <th className="px-5 py-4 font-bold text-ink-3 text-[10px] uppercase tracking-[0.5px]">{a.metadata}</th>
              </tr>
            </thead>
            <tbody className="text-ink-2 divide-y divide-rule">
              {logs.length === 0 && !isLoading ? (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-[13px] text-ink-3">
                    {a.noRecords}
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-surface-2 transition-colors">
                    <td className="whitespace-nowrap px-5 py-4 text-xs">
                      <div className="flex items-center gap-1.5 text-ink-3">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(log.createdAt).toLocaleString(lang === "es" ? "es-MX" : "en-US")}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4">
                      {log.isSystemActor ? (
                        <span className="inline-flex items-center gap-1.5 rounded-[4px] bg-purple-500/10 px-2 py-1 text-[11px] font-bold text-purple-500 border border-purple-500/20">
                          <Cpu className="h-3 w-3" /> {log.systemActorLabel || a.system}
                        </span>
                      ) : (
                        <span title={log.actorUserId ?? undefined} className="inline-flex items-center gap-1.5 rounded-[4px] bg-accent/10 px-2 py-1 font-mono text-[11px] font-bold text-accent border border-accent/20">
                          <User className="h-3 w-3" /> {shortId(log.actorUserId)}
                        </span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4">
                      <span className="inline-flex rounded-[4px] border border-rule-strong bg-surface-2 px-2 py-1 font-mono text-[11px] font-bold text-ink">
                        {log.action}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-xs">
                      <div className="font-bold text-ink">{log.entityType}</div>
                      <div title={log.entityId ?? undefined} className="font-mono text-ink-3">{shortId(log.entityId)}</div>
                    </td>
                    <td className="px-5 py-4 font-mono text-[11px] leading-relaxed text-ink-3 break-all">
                      {metadataText(log.metadata)}
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
