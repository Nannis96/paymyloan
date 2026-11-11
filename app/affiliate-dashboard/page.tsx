"use client";
import { useSite } from "@/app/components/layout/SiteShell";
import { affText, fmtCents } from "@/app/lib/affiliates";
import { useAff } from "./AffiliateContext";
import { CopyField, Stat, Title } from "./ui";

export default function AffiliateDashboardPage() {
  const { lang } = useSite();
  const a = affText(lang);
  const { me } = useAff();
  if (!me) return null;
  return (
    <div className="max-w-[900px] animate-in fade-in duration-300">
      <Title>{a.dashboard}</Title>
      <div className="mb-6 flex flex-wrap gap-4">
        <Stat label={a.referralsCount} value={me.referralsCount ?? 0} />
        <Stat label={a.subscribed} value={me.subscribedCount ?? 0} />
        <Stat label={a.pendingPay} value={fmtCents(me.pendingCents)} />
        <Stat label={a.paid} value={fmtCents(me.paidCents)} />
      </div>
      {me.link && <CopyField label={a.link} value={me.link} />}
    </div>
  );
}
