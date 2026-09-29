"use client";
import { useSite } from "@/app/components/layout/SiteShell";

export default function ActiveLoansView() {
  const { t } = useSite();
  const title = (t.dashboardLender.mimic as any).sidebar?.active || "Active Loans";

  return (
    <div className="animate-in fade-in duration-300">
      <div className="mb-[4px] text-[20px] font-[800] tracking-[-0.3px] text-[#0a2540]">{title}</div>
      <div className="rounded-[10px] border border-[#e6ebf1] bg-white p-[40px] text-center text-[#8898aa] mt-[24px]">
        No data to display.
      </div>
    </div>
  );
}