"use client";

import { useState, useEffect } from "react";
import { useSite } from "@/app/components/layout/SiteShell";
import { API_ROUTES } from "@/app/lib/endpoints";
import { api, ApiError } from "@/app/lib/apiFetch";
import type { AdminLender } from "@/app/types/api";

// Ficha de un lender: GET /api/admin/lenders/:id (lectura, no pide 2FA).
// Montar con key={lenderId} para que el estado arranque limpio al cambiar de lender.
export function LenderDetailDrawer({ lenderId, onClose }: { lenderId: string; onClose: () => void }) {
  const { t, lang } = useSite();
  const v = t.dashboardAdmin.views.lenders;

  const [lender, setLender] = useState<AdminLender | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let vigente = true;
    api<AdminLender>(API_ROUTES.lenders.adminById(lenderId))
      .then((data) => vigente && setLender(data))
      .catch((err) => {
        if (!vigente) return;
        if (err instanceof ApiError && err.code === "LENDER_NOT_FOUND") setError(v.notFound);
        else setError(err instanceof Error ? err.message : t.dashboardAdmin.errorNetwork);
      });
    return () => { vigente = false; };
  }, [lenderId, v.notFound, t.dashboardAdmin.errorNetwork]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const u = lender?.user;
  const stats = lender
    ? [
        { label: v.borrowers, value: lender.borrowersCount ?? 0 },
        { label: v.activeContracts, value: lender.activeContractsCount ?? 0 },
        { label: v.companies, value: lender.lenderCompanies.length },
      ]
    : [];

  return (
    <div className="fixed inset-0 z-[100] flex justify-end bg-ink/50 backdrop-blur-sm" onClick={onClose}>
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={v.detailTitle}
        onClick={(e) => e.stopPropagation()}
        className="h-full w-full max-w-[480px] overflow-y-auto border-l border-rule bg-surface p-6 shadow-2xl"
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.4px] text-ink-3">{v.detailTitle}</div>
            <h2 className="text-[20px] font-extrabold text-ink">{u?.name ?? "…"}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={v.close}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-2 text-ink transition-colors hover:bg-crit hover:text-white"
          >
            ✕
          </button>
        </div>

        {error ? (
          <div className="rounded-lg bg-crit-soft p-4 text-sm font-medium text-crit">{error}</div>
        ) : !lender || !u ? (
          <div className="py-12 text-center text-[13px] text-ink-3">{t.dashboardAdmin.loading}</div>
        ) : (
          <>
            <dl className="mb-6 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-[13px]">
              <dt className="text-ink-3">{t.adminUsersList.table.email}</dt>
              <dd className="break-all text-ink">{u.email}</dd>
              <dt className="text-ink-3">{t.adminUsersList.table.phone}</dt>
              <dd className="font-mono text-ink">{u.phone || t.adminUsersList.na}</dd>
              <dt className="text-ink-3">{t.adminUsersList.table.status}</dt>
              <dd>
                <span className={`inline-block rounded-lg px-2 py-0.5 text-[10px] font-bold ${u.isActive ? "bg-success-soft text-success" : "border border-amber/30 bg-amber-soft text-amber"}`}>
                  {u.isActive ? t.adminUsersList.active : t.adminUsersList.inactive}
                </span>
              </dd>
              <dt className="text-ink-3">{t.adminUsersList.table.signedUp}</dt>
              <dd className="text-ink">
                {new Date(u.createdAt).toLocaleDateString(lang === "es" ? "es-MX" : "en-US", { month: "short", day: "numeric", year: "numeric" })}
              </dd>
            </dl>

            <div className="mb-6 grid grid-cols-3 gap-3">
              {stats.map((s) => (
                <div key={s.label} className="rounded-lg border border-rule bg-surface-2 p-3 text-center">
                  <div className="text-[22px] font-extrabold text-ink">{s.value}</div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.4px] text-ink-3">{s.label}</div>
                </div>
              ))}
            </div>

            <h3 className="mb-3 text-[13px] font-extrabold text-ink">{v.companies}</h3>
            {lender.lenderCompanies.length === 0 ? (
              <p className="text-[13px] text-ink-3">{v.noCompanies}</p>
            ) : (
              <ul className="flex flex-col gap-3">
                {lender.lenderCompanies.map((c) => (
                  <li key={c.id} className="rounded-lg border border-rule p-4 text-[12px] text-ink-2">
                    <div className="mb-1 flex items-center justify-between gap-2">
                      <strong className="text-[14px] text-ink">{c.companyName}</strong>
                      <span className={`rounded-lg px-2 py-0.5 text-[10px] font-bold ${c.status === "SUSPENDED" ? "bg-crit-soft text-crit" : "bg-success-soft text-success"}`}>
                        {c.status === "SUSPENDED" ? v.suspended : v.active}
                      </span>
                    </div>
                    <div>EIN: <span className="font-mono">{c.ein}</span></div>
                    <div>
                      {[c.addressLine1, c.addressLine2, c.city, c.state, c.postalCode].filter(Boolean).join(", ")}
                    </div>
                    {c.contactPhone && <div className="font-mono">{c.contactPhone}</div>}
                    <div className="mt-1 text-ink-3">{c.isOpenToDeals ? v.openToDeals : v.closedToDeals}</div>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </aside>
    </div>
  );
}
