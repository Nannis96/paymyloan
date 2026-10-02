"use client";

import { useSite } from "@/app/components/layout/SiteShell";
import { Clock } from "lucide-react";

export default function EarningsPage() {
  const { t } = useSite();
  const title = t.affiliateDashboard.sidebar.earnings;
  const comingSoon = t.affiliateDashboard.comingSoon;

  return (
    <div className="w-full max-w-[1200px] animate-in fade-in duration-300">
      <h1 className="text-[22px] font-[800] tracking-[-0.3px] text-ink mb-8">{title}</h1>
      <div className="rounded-[10px] border border-rule bg-surface p-16 text-center shadow-sm flex flex-col items-center justify-center">
        <Clock className="w-12 h-12 text-ink-3 mb-4 opacity-50" />
        <div className="text-[15px] font-[600] text-ink-2">{comingSoon}</div>
      </div>
    </div>
  );
}