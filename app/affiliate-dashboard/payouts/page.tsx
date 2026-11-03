"use client";
import { useSite } from "@/app/components/layout/SiteShell";
import { affText, fmtCents } from "@/app/lib/affiliates";
import { useAff } from "../AffiliateContext";
import CommissionsTable from "../CommissionsTable";
import { Stat, Title } from "../ui";

export default function PayoutsPage() {
  const { lang } = useSite();
  const a = affText(lang);
  const { me } = useAff();
  return (
    <div className="max-w-[900px] animate-in fade-in duration-300">
      <Title>{a.payouts}</Title>
      <div className="mb-6 flex flex-wrap gap-4">
        <Stat label={a.pendingPay} value={fmtCents(me?.pendingCents)} />
        <Stat label={a.paid} value={fmtCents(me?.paidCents)} />
      </div>
      <CommissionsTable fixed="PAID" />
    </div>
  );
}
