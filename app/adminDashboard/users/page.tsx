"use client";

import Link from "next/link";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import { UsersTable } from "../AdminViewsComponents/UsersTable";

function UsersListContent() {
  const { t } = useSite();
  const u = t.adminUsersList;

  return (
    <div className="min-h-screen bg-bg p-6 lg:p-14">
      <div className="mx-auto max-w-[1100px]">
                 
        <Link
           href="/admin"
           className="mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-ink-3 transition-colors hover:text-accent"
        >
          <span>&larr;</span> {u.back}
        </Link>

        <header className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-[32px] font-black tracking-tight text-ink">{u.title}</h1>
            <p className="text-ink-2">{u.subtitle}</p>
          </div>
          <Link
             href="/admin/add-user"
             className="inline-flex items-center justify-center rounded-lg bg-accent px-5 py-3 text-sm font-bold text-accent-ink transition-opacity hover:opacity-90"
          >
            + {u.addUserBtn}
          </Link>
        </header>

        <UsersTable />
      </div>
    </div>
  );
}

export default function UsersListPage() {
  return (
    <SiteShell isDashboard={true}>
      <UsersListContent />
    </SiteShell>
  );
}
