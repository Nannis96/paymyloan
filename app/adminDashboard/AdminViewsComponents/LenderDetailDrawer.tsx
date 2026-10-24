"use client";

import { useState, useEffect } from "react";
import { useSite } from "@/app/components/layout/SiteShell";
import { API_ROUTES } from "@/app/lib/endpoints";
import { api, ApiError } from "@/app/lib/apiFetch";
import type { AdminLender, LenderCompany } from "@/app/types/api";
import { TwoFactorRequiredBanner } from "./TwoFactorRequiredBanner";

// Ficha de un lender: GET /api/admin/lenders/:id (lectura, no pide 2FA) + CRUD de
// sus empresas (escrituras, piden 2FA). Montar con key={lenderId} para que el
// estado arranque limpio al cambiar de lender. onChanged avisa a la lista.
export function LenderDetailDrawer({ lenderId, onClose, onChanged }: { lenderId: string; onClose: () => void; onChanged: () => void }) {
  const { t, lang } = useSite();
  const v = t.dashboardAdmin.views.lenders;

  const [lender, setLender] = useState<AdminLender | null>(null);
  const [error, setError] = useState<string | null>(null);
  // null = sin formulario; "new" = alta; LenderCompany = edicion de esa empresa.
  const [editing, setEditing] = useState<"new" | LenderCompany | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [need2fa, setNeed2fa] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

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
  }, [lenderId, reloadKey, v.notFound, t.dashboardAdmin.errorNetwork]);

  function afterChange() {
    setEditing(null);
    setReloadKey((k) => k + 1);
    onChanged();
  }

  async function deleteCompany(c: LenderCompany) {
    if (!window.confirm(v.deleteCompanyConfirm.replace("{name}", c.companyName))) return;
    setBusyId(c.id);
    setActionError(null);
    try {
      await api(API_ROUTES.lenders.adminCompanyById(lenderId, c.id), { method: "DELETE" });
      afterChange();
    } catch (err) {
      setActionError(companyErrorMessage(err));
    } finally {
      setBusyId(null);
    }
  }

  // null = no hay texto que mostrar (TWO_FACTOR_REQUIRED se muestra como banner).
  function companyErrorMessage(err: unknown): string | null {
    if (err instanceof ApiError) {
      if (err.code === "TWO_FACTOR_REQUIRED") {
        setNeed2fa(true);
        return null;
      }
      if (err.code === "LENDER_HAS_ACTIVE_CONTRACTS") return v.errorActiveContracts;
      if (err.code === "LENDER_COMPANY_NOT_FOUND") return v.errorCompanyNotFound;
    }
    return err instanceof Error ? err.message : t.dashboardAdmin.errorNetwork;
  }

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

            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-[13px] font-extrabold text-ink">{v.companies}</h3>
              {editing === null && (
                <button
                  type="button"
                  onClick={() => { setActionError(null); setEditing("new"); }}
                  className="rounded-lg bg-accent px-3 py-1.5 text-xs font-bold text-accent-ink transition-opacity hover:opacity-90"
                >
                  + {v.addCompany}
                </button>
              )}
            </div>

            {need2fa && <TwoFactorRequiredBanner onEnabled={() => setNeed2fa(false)} />}

            {actionError && (
              <div className="mb-3 rounded-lg bg-crit-soft p-3 text-[13px] font-medium text-crit">{actionError}</div>
            )}

            {editing !== null ? (
              <CompanyForm
                key={editing === "new" ? "new" : editing.id}
                lenderId={lenderId}
                company={editing === "new" ? null : editing}
                onCancel={() => setEditing(null)}
                onSaved={afterChange}
                errorMessage={companyErrorMessage}
              />
            ) : lender.lenderCompanies.length === 0 ? (
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
                    <div className="mt-3 flex gap-2">
                      <button
                        type="button"
                        onClick={() => { setActionError(null); setEditing(c); }}
                        className="rounded-lg border border-rule px-3 py-1.5 text-xs font-bold text-ink-2 transition-colors hover:border-accent hover:text-accent"
                      >
                        {t.adminUsersList.edit}
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteCompany(c)}
                        disabled={busyId === c.id}
                        className="rounded-lg border border-rule px-3 py-1.5 text-xs font-bold text-ink-2 transition-colors hover:border-crit hover:text-crit disabled:opacity-50"
                      >
                        {busyId === c.id ? "..." : t.adminUsersList.delete}
                      </button>
                    </div>
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

const FIELDS = ["companyName", "ein", "contactPhone", "addressLine1", "addressLine2", "city", "state", "postalCode"] as const;
type Field = (typeof FIELDS)[number];
const OPTIONAL: Field[] = ["contactPhone", "addressLine2"];

// Alta (POST) o edicion (PATCH, solo lo que cambio) de una empresa del lender.
// El back no acepta null: un opcional vacio no se envia (no se puede borrar).
function CompanyForm({
  lenderId,
  company,
  onCancel,
  onSaved,
  errorMessage,
}: {
  lenderId: string;
  company: LenderCompany | null;
  onCancel: () => void;
  onSaved: () => void;
  errorMessage: (err: unknown) => string | null;
}) {
  const { t } = useSite();
  const v = t.dashboardAdmin.views.lenders;
  const f = v.form;

  const [values, setValues] = useState<Record<Field, string>>(() =>
    Object.fromEntries(FIELDS.map((k) => [k, company?.[k] ?? ""])) as Record<Field, string>
  );
  const [status, setStatus] = useState(company?.status ?? "ACTIVE");
  const [isOpenToDeals, setIsOpenToDeals] = useState(company?.isOpenToDeals ?? true);
  const [einError, setEinError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const body: Record<string, string | boolean> = {};
    for (const k of FIELDS) {
      const val = values[k].trim();
      if (!val && OPTIONAL.includes(k)) continue;
      if (!company || val !== (company[k] ?? "")) body[k] = k === "state" ? val.toUpperCase() : val;
    }
    if (company) {
      if (status !== (company.status ?? "ACTIVE")) body.status = status;
      if (isOpenToDeals !== (company.isOpenToDeals ?? true)) body.isOpenToDeals = isOpenToDeals;
      if (Object.keys(body).length === 0) return onCancel();
    }

    setSaving(true);
    setError(null);
    setEinError(null);
    try {
      await api(
        company ? API_ROUTES.lenders.adminCompanyById(lenderId, company.id) : API_ROUTES.lenders.adminCompanies(lenderId),
        { method: company ? "PATCH" : "POST", body: JSON.stringify(body) }
      );
      onSaved();
    } catch (err) {
      if (err instanceof ApiError && err.code === "EIN_TAKEN") setEinError(v.errorEinTaken);
      else setError(errorMessage(err));
    } finally {
      setSaving(false);
    }
  }

  const input = "w-full rounded-lg border border-rule bg-surface-2 px-3 py-2 text-[13px] text-ink outline-none focus:border-accent";
  const label = "mb-1 block text-[11px] font-bold text-ink-3";
  const set = (k: Field) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [k]: e.target.value });
    if (k === "ein") setEinError(null);
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-3 rounded-lg border border-rule p-4">
      <h4 className="text-[14px] font-extrabold text-ink">{company ? v.editCompany : v.addCompany}</h4>
      {error && <div className="rounded-lg bg-crit-soft p-3 text-[13px] font-medium text-crit">{error}</div>}

      <div>
        <label className={label}>{f.companyName}</label>
        <input required maxLength={200} value={values.companyName} onChange={set("companyName")} className={input} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={label}>EIN</label>
          <input
            required
            pattern="\d{2}-\d{7}"
            title={f.einHint}
            placeholder="12-3456789"
            value={values.ein}
            onChange={set("ein")}
            aria-invalid={!!einError}
            className={`${input} font-mono ${einError ? "border-red-500" : ""}`}
          />
          {einError && <span className="mt-1 block text-xs text-red-500">{einError}</span>}
        </div>
        <div>
          <label className={label}>{f.contactPhone}</label>
          <input type="tel" inputMode="numeric" pattern="\d{10}" maxLength={10} title={t.adminUsersList.phoneHint} value={values.contactPhone} onChange={set("contactPhone")} className={`${input} font-mono`} />
        </div>
      </div>
      <div>
        <label className={label}>{f.addressLine1}</label>
        <input required maxLength={200} value={values.addressLine1} onChange={set("addressLine1")} className={input} />
      </div>
      <div>
        <label className={label}>{f.addressLine2}</label>
        <input maxLength={200} value={values.addressLine2} onChange={set("addressLine2")} className={input} />
      </div>
      <div className="grid grid-cols-[1fr_70px_100px] gap-3">
        <div>
          <label className={label}>{f.city}</label>
          <input required maxLength={120} value={values.city} onChange={set("city")} className={input} />
        </div>
        <div>
          <label className={label}>{f.state}</label>
          <input required pattern="[A-Za-z]{2}" maxLength={2} title={f.stateHint} placeholder="TX" value={values.state} onChange={set("state")} className={`${input} uppercase`} />
        </div>
        <div>
          <label className={label}>{f.postalCode}</label>
          <input required maxLength={20} value={values.postalCode} onChange={set("postalCode")} className={input} />
        </div>
      </div>

      {company && (
        <div className="grid grid-cols-2 items-end gap-3">
          <div>
            <label className={label}>{t.adminUsersList.table.status}</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className={`${input} cursor-pointer`}>
              <option value="ACTIVE">{v.active}</option>
              <option value="SUSPENDED">{v.suspended}</option>
            </select>
          </div>
          <label className="flex cursor-pointer items-center gap-2 pb-2 text-[13px] text-ink">
            <input type="checkbox" checked={isOpenToDeals} onChange={(e) => setIsOpenToDeals(e.target.checked)} />
            {v.openToDeals}
          </label>
        </div>
      )}
      {company && <p className="text-[10px] text-ink-3">{f.optionalHint}</p>}

      <div className="mt-1 flex gap-3">
        <button type="button" onClick={onCancel} className="flex-1 rounded-lg border border-rule px-4 py-2.5 text-sm font-bold text-ink hover:bg-surface-2">
          {t.adminUsersList.cancel}
        </button>
        <button type="submit" disabled={saving} className="flex-1 rounded-lg bg-accent px-4 py-2.5 text-sm font-bold text-accent-ink transition-opacity hover:opacity-90 disabled:opacity-50">
          {saving ? "..." : t.adminUsersList.save}
        </button>
      </div>
    </form>
  );
}
