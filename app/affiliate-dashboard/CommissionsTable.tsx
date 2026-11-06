"use client";
import { useState } from "react";
import { useSite } from "@/app/components/layout/SiteShell";
import { affText, fmtCents, fmtDate } from "@/app/lib/affiliates";
import { API_ROUTES } from "@/app/lib/endpoints";
import type { AffiliateCommission } from "@/app/types/api";
import { PagedTable, StatusPill } from "./ui";

// Comisiones propias; `fixed` fuerza un estado (Pagos = solo PAID) y oculta el filtro.
export default function CommissionsTable({ fixed }: { fixed?: "PAID" }) {
  const { lang } = useSite();
  const a = affText(lang);
  const [status, setStatus] = useState("");
  const st = fixed ?? status;
  return (
    <>
      {!fixed && (
        <select value={status} onChange={(e) => setStatus(e.target.value)} aria-label={a.status}
          className="mb-4 rounded-lg border border-rule bg-surface px-3 py-2 text-[13px] text-ink">
          <option value="">{a.all}</option>
          {(["PENDING", "PAID", "VOID"] as const).map((s) => <option key={s} value={s}>{a[s]}</option>)}
        </select>
      )}
      <PagedTable<AffiliateCommission>
        url={API_ROUTES.affiliates.meCommissions}
        extra={st ? { status: st } : {}}
        cols={fixed ? [a.paidAt, a.amount, a.ref] : [a.joined, a.base, a.amount, a.status, a.payableAt]}
        row={(c) => fixed
          ? [fmtDate(c.paidAt, lang), fmtCents(c.amountCents, c.currency), c.paymentReference ?? "—"]
          : [fmtDate(c.createdAt, lang), fmtCents(c.baseAmountCents, c.currency), fmtCents(c.amountCents, c.currency),
             <StatusPill key="s" status={c.status} label={a[c.status]} />, fmtDate(c.payableAt, lang)]}
      />
    </>
  );
}
