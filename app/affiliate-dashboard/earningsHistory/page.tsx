"use client";
import { useSite } from "@/app/components/layout/SiteShell";
import { affText } from "@/app/lib/affiliates";
import CommissionsTable from "../CommissionsTable";
import { Title } from "../ui";

export default function EarningsHistoryPage() {
  const { lang } = useSite();
  return (
    <div className="max-w-[900px] animate-in fade-in duration-300">
      <Title>{affText(lang).earnings}</Title>
      <CommissionsTable />
    </div>
  );
}
