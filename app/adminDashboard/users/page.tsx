"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";

// URL base de la API
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

// Interfaz basada en SafeUser del backend
interface UserItem {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: string;
  isActive: boolean;
}

function UsersListContent() {
  const { t } = useSite();
  const u = t.adminUsersList;

  const [users, setUsers] = useState<UserItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const token = localStorage.getItem("accessToken") || "";
        
        const response = await fetch(`${API_URL}/api/users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        });

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            throw new Error(u.errorAuth);
          }
          throw new Error(`HTTP ${response.status}: ${u.errorFetch}`);
        }

        const json = await response.json();
        
        if (json.success) {
          setUsers(json.data);
        } else {
          throw new Error(json.error?.message || u.errorFetch);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : u.errorNetwork);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUsers();
  }, [u.errorAuth, u.errorFetch, u.errorNetwork]);

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

        {error && (
          <div className="mb-6 rounded-lg border border-red-900/50 bg-red-900/20 px-4 py-3 text-sm text-red-500">
            {error}
          </div>
        )}

        <div className="overflow-x-auto rounded-xl border border-rule bg-surface shadow-sm">
          <table className="w-full min-w-[700px] border-collapse text-left text-[14px]">
            <thead className="border-b border-rule bg-surface-2">
              <tr>
                <th className="px-5 py-4 font-bold text-ink-3">{u.table.name}</th>
                <th className="px-5 py-4 font-bold text-ink-3">{u.table.status}</th>
                <th className="px-5 py-4 font-bold text-ink-3">{u.table.email}</th>
                <th className="px-5 py-4 font-bold text-ink-3">{u.table.phone}</th>
                <th className="px-5 py-4 font-bold text-ink-3">{u.table.role}</th>
              </tr>
            </thead>
            <tbody className="text-ink-2">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-ink-3">{u.loading}</td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-ink-3">{u.empty}</td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="border-b border-rule hover:bg-surface-2 transition-colors">
                    <td className="px-5 py-4 font-medium text-ink">
                      <Link href={`/profile/${user.id}`} className="hover:text-accent hover:underline">
                        {user.name}
                      </Link>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex rounded-[4px] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${user.isActive ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'}`}>
                        {user.isActive ? u.active : u.inactive}
                      </span>
                    </td>
                    <td className="px-5 py-4">{user.email}</td>
                    <td className="px-5 py-4 font-mono">{user.phone || u.na}</td>
                    <td className="px-5 py-4">
                      <span className="inline-flex rounded-[4px] border border-rule bg-surface-2 px-2.5 py-1 text-xs font-bold text-ink capitalize">
                        {user.role.toLowerCase()}
                      </span>
                    </td>
                  </tr>
                ))
              )}
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