"use client";

import { useSite } from "@/app/components/layout/SiteShell";
import { UsersTable } from "./UsersTable";

export function BorrowersView() {
  const { t } = useSite();
  const v = t.dashboardAdmin.views.borrowers;

  return (
    <div className="animate-in fade-in duration-300">
      <h1 className="mb-1 text-[22px] font-extrabold text-ink">{v.title}</h1>
      <p className="mb-6 text-[13px] text-ink-3">{v.subtitle}</p>
      <UsersTable role="BORROWER" />
    </div>
  );
}
