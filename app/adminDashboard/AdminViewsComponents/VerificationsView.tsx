"use client";

import { useState, useEffect } from "react";
import { useSite } from "@/app/components/layout/SiteShell";
import { API_ROUTES } from "@/app/lib/endpoints";
import { api, ApiError, toList } from "@/app/lib/apiFetch";
import type { VerificationRequest } from "@/app/types/api";
import { TwoFactorRequiredBanner } from "./TwoFactorRequiredBanner";

// El KPI "verificaciones pendientes" de Overview no necesita aviso: Overview se
// vuelve a montar (y a pedir /admin/overview) cada vez que se cambia de pestaña.
export function VerificationsView() {
  const { t, lang } = useSite();
  const v = t.dashboardAdmin.views.verifications;

  const [verifications, setVerifications] = useState<VerificationRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [need2fa, setNeed2fa] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState("PENDING");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let vigente = true;
    api<unknown>(`${API_ROUTES.admin.verifications}?status=${statusFilter}`)
      .then((data) => {
        if (!vigente) return;
        setVerifications(toList<VerificationRequest>(data));
        setError(null);
      })
      .catch((err) => vigente && setError(err instanceof Error ? err.message : t.dashboardAdmin.errorNetwork))
      .finally(() => vigente && setIsLoading(false));
    return () => { vigente = false; };
  }, [statusFilter, reloadKey, t.dashboardAdmin.errorNetwork]);

  const handleAction = async (req: VerificationRequest, action: "approve" | "reject") => {
    let body: string | undefined;
    if (action === "approve") {
      if (!window.confirm(v.approveConfirm.replace("{name}", req.entityName))) return;
    } else {
      // El back exige `reason` al rechazar; se le muestra al solicitante.
      const reason = window.prompt(v.rejectPrompt.replace("{name}", req.entityName))?.trim();
      if (!reason) return;
      body = JSON.stringify({ reason });
    }

    setBusyId(req.id);
    setError(null);
    setNotice(null);
    try {
      const url = action === "approve" ? API_ROUTES.admin.approveVerification(req.id) : API_ROUTES.admin.rejectVerification(req.id);
      await api(url, { method: "POST", body });
      setReloadKey((k) => k + 1);
    } catch (err) {
      if (err instanceof ApiError && err.code === "TWO_FACTOR_REQUIRED") setNeed2fa(true);
      else if (err instanceof ApiError && err.code === "VERIFICATION_NOT_PENDING") {
        setNotice(v.alreadyReviewed);
        setReloadKey((k) => k + 1);
      } else setError(err instanceof Error ? err.message : t.dashboardAdmin.errorNetwork);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="animate-in fade-in duration-300">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="mb-1 text-[22px] font-extrabold text-ink">{v.title}</h1>
          <p className="text-[13px] text-ink-3">{v.subtitle}</p>
        </div>
        <select
          value={statusFilter}
          onChange={(e) => { setIsLoading(true); setStatusFilter(e.target.value); }}
          className="cursor-pointer rounded-lg border border-rule bg-surface-2 px-4 py-2 text-[13px] font-bold text-ink outline-none transition-colors focus:border-accent focus:bg-surface"
        >
          <option value="PENDING">{v.statuses.PENDING}</option>
          <option value="APPROVED">{v.statuses.APPROVED}</option>
          <option value="REJECTED">{v.statuses.REJECTED}</option>
        </select>
      </div>

      {need2fa && <TwoFactorRequiredBanner onEnabled={() => setNeed2fa(false)} />}
      {notice && <div className="mb-4 rounded-lg border border-amber/30 bg-amber-soft p-4 text-sm text-ink">{notice}</div>}
      {error && <div className="mb-4 rounded-lg bg-crit-soft p-4 text-sm font-medium text-crit">{error}</div>}

      <div className="overflow-hidden rounded-[10px] border border-rule bg-surface shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface-2 text-[10px] font-bold uppercase tracking-[0.4px] text-ink-3">
              <tr>
                <th className="px-4 py-3">{v.table.entity}</th>
                <th className="px-4 py-3">{v.table.type}</th>
                <th className="px-4 py-3">{v.table.role}</th>
                <th className="px-4 py-3">{v.table.submittedBy}</th>
                <th className="px-4 py-3">{v.table.date}</th>
                <th className="px-4 py-3 text-right">{v.table.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rule text-[12px] text-ink-2">
              {isLoading ? (
                <tr><td colSpan={6} className="p-6 text-center text-ink-3">{t.dashboardAdmin.loading}</td></tr>
              ) : verifications.length > 0 ? (
                verifications.map((req) => (
                  <tr key={req.id} className="transition-colors hover:bg-surface-2">
                    <td className="px-4 py-3 font-bold text-ink">
                      {req.entityName}
                      <span className="mt-0.5 block text-[10px] font-normal text-ink-3">EIN: {req.ein || "N/A"}</span>
                    </td>
                    <td className="px-4 py-3">{req.entityType}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block rounded-lg px-2 py-0.5 text-[10px] font-bold ${req.subject === 'LENDER' ? 'bg-amber-soft text-amber' : 'bg-success-soft text-success'}`}>
                        {req.subject}
                      </span>
                    </td>
                    <td className="px-4 py-3">{req.submittedByUser?.name || "N/A"}</td>
                    <td className="px-4 py-3">
                      {new Date(req.createdAt).toLocaleDateString(lang === "es" ? "es-MX" : "en-US", { month: "short", day: "numeric" })}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {req.status === "PENDING" ? (
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleAction(req, "reject")}
                            disabled={busyId === req.id}
                            className="rounded border border-crit px-3 py-1 text-[11px] font-bold text-crit transition-colors hover:bg-crit hover:text-white disabled:opacity-50"
                          >
                            {v.reject}
                          </button>
                          <button
                            onClick={() => handleAction(req, "approve")}
                            disabled={busyId === req.id}
                            className="rounded bg-success px-3 py-1 text-[11px] font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                          >
                            {busyId === req.id ? "..." : v.approve}
                          </button>
                        </div>
                      ) : (
                        <div>
                          <span className={`font-bold ${req.status === 'APPROVED' ? 'text-success' : 'text-crit'}`}>
                            {v.statuses[req.status as keyof typeof v.statuses] ?? req.status}
                          </span>
                          {req.status === "REJECTED" && req.rejectionReason && (
                            <span className="mt-0.5 block max-w-[260px] text-[11px] text-ink-3 ml-auto">
                              {v.reasonLabel} {req.rejectionReason}
                            </span>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={6} className="p-6 text-center text-ink-3">{v.empty}</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
