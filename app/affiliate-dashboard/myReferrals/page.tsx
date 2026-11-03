"use client";
import { useSite } from "@/app/components/layout/SiteShell";
import { affText, fmtDate } from "@/app/lib/affiliates";
import { API_ROUTES } from "@/app/lib/endpoints";
import type { AffiliateReferral } from "@/app/types/api";
import { PagedTable, StatusPill, Title } from "../ui";

export default function MyReferralsPage() {
  const { lang } = useSite();
  const a = affText(lang);
  return (
    <div className="max-w-[900px] animate-in fade-in duration-300">
      <Title>{a.referrals}</Title>
      <PagedTable<AffiliateReferral>
        url={API_ROUTES.affiliates.meReferrals}
        cols={[a.name, a.joined, a.status]}
        row={(r) => [r.name, fmtDate(r.joinedAt, lang), <StatusPill key="s" status={r.subscribed ? "PAID" : "PENDING"} label={r.subscribed ? a.yes : a.no} />]}
      />
    </div>
  );
}
