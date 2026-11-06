"use client";
import { useEffect, useState } from "react";
import { api, ApiError } from "@/app/lib/apiFetch";
import type { Paginated } from "@/app/types/api";
import { useSite } from "@/app/components/layout/SiteShell";
import { affText } from "@/app/lib/affiliates";

export function Title({ children }: { children: React.ReactNode }) {
  return <h1 className="mb-6 text-[22px] font-[800] tracking-[-0.3px] text-ink">{children}</h1>;
}

export function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="min-w-[180px] flex-1 rounded-xl border border-rule bg-surface p-5 shadow-sm">
      <div className="mb-2 text-[11px] font-bold uppercase tracking-widest text-ink-3">{label}</div>
      <div className="text-[24px] font-black text-ink">{value}</div>
    </div>
  );
}

export function CopyField({ label, value }: { label: string; value: string }) {
  const { lang } = useSite();
  const a = affText(lang);
  const [ok, setOk] = useState(false);
  return (
    <div className="mb-4">
      <div className="mb-1 text-[11px] font-bold uppercase tracking-widest text-ink-3">{label}</div>
      <div className="flex gap-2">
        <input readOnly value={value} className="w-full rounded-lg border border-rule bg-surface-2 px-3 py-2 text-[13px] text-ink" />
        <button type="button" onClick={() => { void navigator.clipboard.writeText(value); setOk(true); setTimeout(() => setOk(false), 1500); }}
          className="shrink-0 rounded-lg bg-accent px-4 text-[12px] font-bold text-accent-ink hover:opacity-90">
          {ok ? a.copied : a.copy}
        </button>
      </div>
    </div>
  );
}

// Tabla paginada sobre un endpoint de lista; `extra` son query params (ej. status).
export function PagedTable<T>({ url, extra = {}, cols, row }: {
  url: string; extra?: Record<string, string>;
  cols: string[]; row: (item: T) => React.ReactNode[];
}) {
  const { lang } = useSite();
  const a = affText(lang);
  const [page, setPage] = useState(1);
  const [data, setData] = useState<Paginated<T> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const key = JSON.stringify(extra);
  useEffect(() => { setPage(1); }, [key]);
  useEffect(() => {
    let vigente = true;
    const q = new URLSearchParams({ page: String(page), pageSize: "20", ...extra });
    api<Paginated<T>>(`${url}?${q}`)
      .then((d) => vigente && (setData(d), setError(null)))
      .catch((e) => {
        if (!vigente) return;
        // 404 = sin datos / modulo no disponible: lista vacia, no error.
        if (e instanceof ApiError && e.status === 404) { setData({ items: [], page: 1, pageSize: 20, total: 0, totalPages: 1 }); setError(null); }
        else setError(e instanceof Error ? e.message : "error");
      });
    return () => { vigente = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, page, key]);

  const items = data?.items ?? [];
  const pages = Math.max(1, data?.totalPages ?? 1);
  return (
    <div className="overflow-hidden rounded-[10px] border border-rule bg-surface shadow-sm">
      {error && <div className="bg-crit-soft p-3 text-[13px] text-crit">{error}</div>}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-surface-2 text-[10px] font-bold uppercase tracking-[0.4px] text-ink-3">
            <tr>{cols.map((c) => <th key={c} className="px-4 py-3">{c}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-rule text-[12px] text-ink-2">
            {!data ? <tr><td colSpan={cols.length} className="p-6 text-center text-ink-3">{a.loading}</td></tr>
              : items.length === 0 ? <tr><td colSpan={cols.length} className="p-6 text-center text-ink-3">{a.empty}</td></tr>
              : items.map((it, i) => <tr key={i}>{row(it).map((c, j) => <td key={j} className="px-4 py-3">{c}</td>)}</tr>)}
          </tbody>
        </table>
      </div>
      {pages > 1 && (
        <div className="flex items-center justify-between border-t border-rule bg-surface-2 px-4 py-3 text-[12px] text-ink-3">
          <span>{page} / {pages}</span>
          <div className="flex gap-2">
            <button type="button" disabled={page <= 1} onClick={() => setPage(page - 1)} className="rounded-[4px] border border-rule bg-surface px-3 py-1.5 font-bold text-ink disabled:opacity-40">{a.prev}</button>
            <button type="button" disabled={page >= pages} onClick={() => setPage(page + 1)} className="rounded-[4px] border border-rule bg-surface px-3 py-1.5 font-bold text-ink disabled:opacity-40">{a.next}</button>
          </div>
        </div>
      )}
    </div>
  );
}

export function StatusPill({ status, label }: { status: string; label: string }) {
  const cls = status === "PAID" || status === "APPROVED" ? "bg-success-soft text-success"
    : status === "VOID" || status === "REJECTED" || status === "SUSPENDED" ? "bg-crit-soft text-crit"
    : "border border-amber/30 bg-amber-soft text-amber";
  return <span className={`inline-block rounded-lg px-2 py-0.5 text-[10px] font-bold ${cls}`}>{label}</span>;
}
