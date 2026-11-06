"use client";
import { useSite } from "@/app/components/layout/SiteShell";
import { affText } from "@/app/lib/affiliates";
import { useAff } from "./AffiliateContext";

// Muestra el alta / estado si el usuario aun no es afiliado aprobado; si lo es, el contenido.
export default function Gate({ children }: { children: React.ReactNode }) {
  const { lang } = useSite();
  const a = affText(lang);
  const { me, error, busy, apply } = useAff();

  if (!me) return <div className="text-[13px] text-ink-3">{error ?? a.loading}</div>;
  if (me.status === "APPROVED") return <>{children}</>;

  const s = me.status;
  const msg = s === "PENDING" ? a.pending : s === "REJECTED" ? a.rejected : s === "SUSPENDED" ? a.suspended : s === "INACTIVE" ? a.inactive : null;
  const canApply = !s || s === "REJECTED" || s === "INACTIVE";

  return (
    <div className="max-w-[560px] rounded-[10px] border border-rule bg-surface p-8 shadow-sm">
      <h1 className="mb-2 text-[22px] font-[800] text-ink">{a.joinTitle}</h1>
      {msg ? (
        <p className="mb-2 text-[14px] font-[600] text-ink-2">{msg}</p>
      ) : (
        <p className="mb-4 text-[14px] text-ink-3">{a.joinText}</p>
      )}
      {me.statusReason && <p className="mb-4 text-[13px] text-ink-3">{a.reason}: {me.statusReason}</p>}
      {error && <div className="mb-4 rounded-lg bg-crit-soft p-3 text-[13px] font-medium text-crit">{error}</div>}
      {canApply && (
        <button type="button" disabled={busy} onClick={apply}
          className="rounded-lg bg-accent px-5 py-2.5 text-[13px] font-bold text-accent-ink hover:opacity-90 disabled:opacity-50">
          {s ? a.reapply : a.apply}
        </button>
      )}
    </div>
  );
}
