"use client";
import { useSite } from "@/app/components/layout/SiteShell";
import { affText, fmtTerms } from "@/app/lib/affiliates";
import { useAff } from "../AffiliateContext";
import { Stat, Title } from "../ui";

export default function AccountPage() {
  const { lang } = useSite();
  const a = affText(lang);
  const { me, busy, error, deactivate } = useAff();
  return (
    <div className="max-w-[700px] animate-in fade-in duration-300">
      <Title>{a.account}</Title>
      <div className="mb-6 flex flex-wrap gap-4">
        <Stat label={a.terms} value={fmtTerms(me?.commissionType, me?.commissionValue)} />
        <Stat label={a.delay} value={me?.payoutDelayDays ? `${me.payoutDelayDays} ${a.days}` : a.immediate} />
      </div>
      {error && <div className="mb-4 rounded-lg bg-crit-soft p-3 text-[13px] text-crit">{error}</div>}
      <button type="button" disabled={busy} onClick={() => window.confirm(a.deactivateConfirm) && deactivate()}
        className="rounded-lg border border-crit px-4 py-2 text-[13px] font-bold text-crit hover:bg-crit-soft disabled:opacity-50">
        {a.deactivate}
      </button>
    </div>
  );
}
