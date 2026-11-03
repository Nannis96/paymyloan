"use client";

import { useEffect, useState } from "react";
import { useSite } from "@/app/components/layout/SiteShell";
import { API_ROUTES } from "@/app/lib/endpoints";
import { api, ApiError } from "@/app/lib/apiFetch";
import { affText, fmtCents, fmtDate, fmtTerms } from "@/app/lib/affiliates";
import type { AdminAffiliate, AffiliateCommission, Paginated } from "@/app/types/api";
import { PagedTable, StatusPill } from "@/app/affiliate-dashboard/ui";
import { TwoFactorRequiredBanner } from "./TwoFactorRequiredBanner";

const J = (body: unknown) => ({ method: "POST", body: JSON.stringify(body) });
const inp = "rounded-lg border border-rule bg-surface px-3 py-2 text-[13px] text-ink outline-none focus:border-accent";
const btn = "rounded-lg border border-rule bg-surface px-3 py-1.5 text-[12px] font-bold text-ink hover:text-accent disabled:opacity-40";

// Ejecuta una escritura del admin; devuelve el mensaje de error (o "2FA") y deja al caller refrescar.
function useWrite(onDone: () => void) {
  const [error, setError] = useState<string | null>(null);
  const [need2fa, setNeed2fa] = useState(false);
  const [busy, setBusy] = useState(false);
  const write = async (url: string, init: RequestInit) => {
    setBusy(true); setError(null);
    try { await api(url, init); onDone(); return true; }
    catch (e) {
      if (e instanceof ApiError && e.code === "TWO_FACTOR_REQUIRED") setNeed2fa(true);
      else setError(e instanceof Error ? e.message : "error");
      return false;
    } finally { setBusy(false); }
  };
  const banner = <>
    {need2fa && <TwoFactorRequiredBanner onEnabled={() => setNeed2fa(false)} />}
    {error && <div className="mb-3 rounded-lg bg-crit-soft p-3 text-[13px] text-crit">{error}</div>}
  </>;
  return { write, busy, banner };
}

export function AffiliatesAdminView() {
  const { t, lang } = useSite();
  const v = t.dashboardAdmin.views.affiliates;
  const a = affText(lang);
  const [tab, setTab] = useState<"affiliates" | "commissions">("affiliates");
  return (
    <div className="animate-in fade-in duration-300">
      <h1 className="mb-1 text-[22px] font-extrabold text-ink">{v.title}</h1>
      <p className="mb-4 text-[13px] text-ink-3">{v.subtitle}</p>
      <div className="mb-4 flex gap-2">
        {(["affiliates", "commissions"] as const).map((k) => (
          <button key={k} type="button" onClick={() => setTab(k)}
            className={`rounded-lg px-4 py-2 text-[13px] font-bold ${tab === k ? "bg-accent text-accent-ink" : "border border-rule bg-surface text-ink-2"}`}>
            {k === "affiliates" ? v.title : a.earnings}
          </button>
        ))}
      </div>
      {tab === "affiliates" ? <AffiliatesList /> : <CommissionsList />}
    </div>
  );
}

function AffiliatesList() {
  const { lang } = useSite();
  const a = affText(lang);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [q, setQ] = useState("");
  const [sel, setSel] = useState<string | null>(null);
  const [reload, setReload] = useState(0);
  useEffect(() => { const id = setTimeout(() => setQ(search.trim()), 300); return () => clearTimeout(id); }, [search]);
  return (
    <>
      <div className="mb-4 flex flex-wrap gap-3">
        <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar / Search" className={`${inp} sm:w-[280px]`} />
        <select value={status} onChange={(e) => setStatus(e.target.value)} className={inp} aria-label={a.status}>
          <option value="">{a.all}</option>
          {(["PENDING", "APPROVED", "REJECTED", "SUSPENDED", "INACTIVE"] as const).map((s) => <option key={s} value={s}>{a[s]}</option>)}
        </select>
      </div>
      <PagedTable<AdminAffiliate>
        key={reload}
        url={API_ROUTES.affiliates.adminBase}
        extra={{ ...(status ? { status } : {}), ...(q ? { search: q } : {}) }}
        cols={[a.name, a.status, a.code, a.referralsCount, a.pendingPay, a.paid, ""]}
        row={(r) => [
          <span key="n" className="font-bold text-ink">{r.user?.name}<span className="block text-[10px] font-normal text-ink-3">{r.user?.email}</span></span>,
          <StatusPill key="s" status={r.status ?? ""} label={r.status ? a[r.status] : "—"} />,
          r.code ?? "—", r.referralsCount ?? 0, fmtCents(r.pendingCents), fmtCents(r.paidCents),
          <button key="o" type="button" className={btn} onClick={() => setSel(r.id!)}>Ver</button>,
        ]}
      />
      {sel && <AffiliateDetail key={sel} id={sel} onClose={() => setSel(null)} onChanged={() => setReload((k) => k + 1)} />}
    </>
  );
}

type Detail = AdminAffiliate & { referrals?: { name: string; joinedAt: string; subscribed: boolean }[]; commissions?: AffiliateCommission[] };

function AffiliateDetail({ id, onClose, onChanged }: { id: string; onClose: () => void; onChanged: () => void }) {
  const { lang } = useSite();
  const a = affText(lang);
  const [d, setD] = useState<Detail | null>(null);
  const [rk, setRk] = useState(0);
  const { write, busy, banner } = useWrite(() => { setRk((k) => k + 1); onChanged(); });
  const [type, setType] = useState("");
  const [value, setValue] = useState("");
  const [delay, setDelay] = useState("");
  const [reason, setReason] = useState("");
  const [manual, setManual] = useState({ amount: "", note: "" });
  useEffect(() => { api<Detail>(API_ROUTES.affiliates.adminById(id)).then(setD).catch(() => {}); }, [id, rk]);

  const terms = () => (type && value ? { commissionType: type, commissionValue: Number(value), ...(delay ? { payoutDelayDays: Number(delay) } : {}) } : {});
  const st = d?.status;
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40" onClick={onClose}>
      <div className="h-full w-full max-w-[520px] overflow-y-auto bg-surface p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h2 className="text-[18px] font-extrabold text-ink">{d?.user?.name ?? a.loading}</h2>
            <p className="text-[12px] text-ink-3">{d?.user?.email}</p>
          </div>
          <button type="button" onClick={onClose} className={btn}>✕</button>
        </div>
        {banner}
        {d && <>
          <div className="mb-4 grid grid-cols-2 gap-3 text-[12px] text-ink-2">
            <div>{a.status}: <StatusPill status={st ?? ""} label={st ? a[st] : "—"} /></div>
            <div>{a.code}: <strong>{d.code ?? "—"}</strong></div>
            <div>{a.terms}: <strong>{fmtTerms(d.commissionType, d.commissionValue)}</strong></div>
            <div>{a.delay}: <strong>{d.payoutDelayDays ?? a.immediate}</strong></div>
            <div>{a.pendingPay}: <strong>{fmtCents(d.pendingCents)}</strong></div>
            <div>{a.paid}: <strong>{fmtCents(d.paidCents)}</strong></div>
          </div>
          {d.statusReason && <p className="mb-3 text-[12px] text-ink-3">{a.reason}: {d.statusReason}</p>}

          <div className="mb-4 rounded-lg border border-rule p-3">
            <div className="mb-2 text-[11px] font-bold uppercase text-ink-3">{a.terms}</div>
            <div className="flex flex-wrap gap-2">
              <select value={type} onChange={(e) => setType(e.target.value)} className={inp}>
                <option value="">—</option><option value="PERCENT">%</option><option value="FIXED">USD</option>
              </select>
              <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="10" inputMode="decimal" className={`${inp} w-24`} />
              <input value={delay} onChange={(e) => setDelay(e.target.value)} placeholder={a.days} inputMode="numeric" className={`${inp} w-24`} />
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {(st === "PENDING" || st === "REJECTED" || st === "SUSPENDED") &&
                <button type="button" disabled={busy} className={btn} onClick={() => write(API_ROUTES.affiliates.adminAction(id, "approve"), J(terms()))}>Aprobar / Approve</button>}
              {st === "APPROVED" && type && value &&
                <button type="button" disabled={busy} className={btn} onClick={() => write(API_ROUTES.affiliates.adminTerms(id), { method: "PATCH", body: JSON.stringify({ commissionType: type, commissionValue: Number(value), payoutDelayDays: delay ? Number(delay) : null }) })}>Guardar / Save</button>}
            </div>
          </div>

          {(st === "PENDING" || st === "APPROVED") && (
            <div className="mb-4 rounded-lg border border-rule p-3">
              <input value={reason} onChange={(e) => setReason(e.target.value)} placeholder={a.reason} className={`${inp} mb-2 w-full`} />
              <div className="flex gap-2">
                {st === "PENDING" && <button type="button" disabled={busy || !reason} className={btn} onClick={() => write(API_ROUTES.affiliates.adminAction(id, "reject"), J({ reason }))}>Rechazar / Reject</button>}
                {st === "APPROVED" && <button type="button" disabled={busy || !reason} className={btn} onClick={() => write(API_ROUTES.affiliates.adminAction(id, "suspend"), J({ reason }))}>Suspender / Suspend</button>}
              </div>
            </div>
          )}

          {d.code && (
            <div className="mb-4 rounded-lg border border-rule p-3">
              <div className="mb-2 text-[11px] font-bold uppercase text-ink-3">Manual</div>
              <div className="flex flex-wrap gap-2">
                <input value={manual.amount} onChange={(e) => setManual({ ...manual, amount: e.target.value })} placeholder="USD" inputMode="decimal" className={`${inp} w-24`} />
                <input value={manual.note} onChange={(e) => setManual({ ...manual, note: e.target.value })} placeholder="Nota / Note" className={`${inp} flex-1`} />
                <button type="button" disabled={busy || !manual.amount || !manual.note} className={btn}
                  onClick={async () => { if (await write(API_ROUTES.affiliates.adminManualCommission(id), J({ amountCents: Math.round(Number(manual.amount) * 100), note: manual.note }))) setManual({ amount: "", note: "" }); }}>+</button>
              </div>
            </div>
          )}

          <div className="text-[11px] font-bold uppercase text-ink-3">{a.referrals} ({d.referrals?.length ?? 0})</div>
          <ul className="mb-4 text-[12px] text-ink-2">
            {d.referrals?.map((r, i) => <li key={i}>{r.name} · {fmtDate(r.joinedAt, lang)} · {r.subscribed ? a.yes : a.no}</li>)}
          </ul>
        </>}
      </div>
    </div>
  );
}

function CommissionsList() {
  const { lang } = useSite();
  const a = affText(lang);
  const [status, setStatus] = useState("");
  const [payable, setPayable] = useState(false);
  const [reload, setReload] = useState(0);
  const { write, busy, banner } = useWrite(() => setReload((k) => k + 1));

  async function markPaid(c: AffiliateCommission) {
    const ref = window.prompt(a.ref) ?? undefined;
    if (ref === undefined) return;
    const url = API_ROUTES.affiliates.adminCommissionAction(c.id, "mark-paid");
    const body = { paymentReference: ref || undefined };
    try {
      await api(url, J(body));
      setReload((k) => k + 1);
    } catch (e) {
      if (e instanceof ApiError && e.code === "AFFILIATE_COMMISSION_NOT_PAYABLE_YET") {
        if (window.confirm(`${e.message}\n\nForce?`)) await write(url, J({ ...body, force: true }));
      } else await write(url, J(body)); // reintenta para reutilizar el manejo de 2FA / error
    }
  }

  return (
    <>
      {banner}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <select value={status} onChange={(e) => setStatus(e.target.value)} className={inp} aria-label={a.status}>
          <option value="">{a.all}</option>
          {(["PENDING", "PAID", "VOID"] as const).map((s) => <option key={s} value={s}>{a[s]}</option>)}
        </select>
        <label className="flex items-center gap-2 text-[13px] text-ink-2">
          <input type="checkbox" checked={payable} onChange={(e) => setPayable(e.target.checked)} /> {a.payableAt} ≤ hoy / today
        </label>
      </div>
      <PagedTable<AffiliateCommission>
        key={reload}
        url={API_ROUTES.affiliates.adminCommissions}
        extra={{ ...(status ? { status } : {}), ...(payable ? { payable: "true" } : {}) }}
        cols={[a.joined, a.base, a.amount, a.status, a.payableAt, ""]}
        row={(c) => [
          fmtDate(c.createdAt, lang), fmtCents(c.baseAmountCents, c.currency), fmtCents(c.amountCents, c.currency),
          <StatusPill key="s" status={c.status} label={a[c.status]} />, fmtDate(c.payableAt, lang),
          c.status === "PENDING" ? (
            <span key="a" className="flex gap-2">
              <button type="button" disabled={busy} className={btn} onClick={() => markPaid(c)}>{a.PAID}</button>
              <button type="button" disabled={busy} className={btn} onClick={() => {
                const d = window.prompt("YYYY-MM-DD", c.payableAt?.slice(0, 10) ?? "");
                if (d) write(API_ROUTES.affiliates.adminCommissionById(c.id), { method: "PATCH", body: JSON.stringify({ payableAt: new Date(d).toISOString() }) });
              }}>{a.payableAt}</button>
              <button type="button" disabled={busy} className={btn} onClick={() => {
                const note = window.prompt("Nota / Note");
                if (note) write(API_ROUTES.affiliates.adminCommissionAction(c.id, "void"), J({ note }));
              }}>{a.VOID}</button>
            </span>
          ) : null,
        ]}
      />
    </>
  );
}
