"use client";

import Link from "next/link";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";

function UsersListContent() {
  const { t } = useSite();
  const u = t.adminUsersList;

  // Datos mockeados de usuarios, como lo hara el backend
  const mockUsers = [
    {
      id: "usr_1",
      name: "Ana Garcia",
      type: "Usuario",
      email: "ana@example.com",
      phone: "555-0100",
      role: "Admin"
    },
    {
      id: "usr_2",
      name: "John Smith",
      type: "Usuario",
      email: "john.s@example.com",
      phone: "555-0101",
      role: "Lender"
    },
    {
      id: "usr_3",
      name: "Maria Lopez",
      type: "Usuario",
      email: "maria.l@example.com",
      phone: "555-0102",
      role: "Borrower"
    }
  ];

  return (
    <div className="min-h-screen bg-bg p-6 lg:p-14">
      <div className="mx-auto max-w-[1100px]">
        
        <Link
           href="/Admin"
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
             href="/Admin/add-user"
             className="inline-flex items-center justify-center rounded-lg bg-accent px-5 py-3 text-sm font-bold text-accent-ink transition-opacity hover:opacity-90"
          >
            + {u.addUserBtn}
          </Link>
        </header>

        <div className="overflow-x-auto rounded-xl border border-rule bg-surface shadow-sm">
          <table className="w-full min-w-[700px] border-collapse text-left text-[14px]">
            <thead className="border-b border-rule bg-surface-2">
              <tr>
                <th className="px-5 py-4 font-bold text-ink-3">{u.table.name}</th>
                <th className="px-5 py-4 font-bold text-ink-3">{u.table.type}</th>
                <th className="px-5 py-4 font-bold text-ink-3">{u.table.email}</th>
                <th className="px-5 py-4 font-bold text-ink-3">{u.table.phone}</th>
                <th className="px-5 py-4 font-bold text-ink-3">{u.table.role}</th>
              </tr>
            </thead>
            <tbody className="text-ink-2">
              {mockUsers.map((user) => (
                <tr key={user.id} className="border-b border-rule hover:bg-surface-2 transition-colors">
                  <td className="px-5 py-4 font-medium text-ink">{user.name}</td>
                  <td className="px-5 py-4">{user.type}</td>
                  <td className="px-5 py-4">{user.email}</td>
                  <td className="px-5 py-4 font-mono">{user.phone}</td>
                  <td className="px-5 py-4">
                    <span className="inline-flex rounded-[4px] border border-rule bg-surface-2 px-2.5 py-1 text-xs font-bold text-ink">
                      {user.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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