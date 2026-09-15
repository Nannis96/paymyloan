"use client";

import Link from "next/link";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import { MetricCard } from "@/app/components/ui";
import { useState, useEffect } from "react";

// URL base de la API
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

// Interfaces basadas en la base de datos
interface UserItem {
  id: string;
  isActive: boolean;
  role: string;
}

function AdminDashboardContent() {
  const { t } = useSite();
  const d = t.dashboardAdmin;

  const [users, setUsers] = useState<UserItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAdminData() {
      try {
        const token = localStorage.getItem("accessToken") || "";
        const headers = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        };

        // El backend actual permite a los ADMIN consultar /api/users.
        // Las metricas financieras globales requeriran un endpoint dedicado en el futuro
        // (ej. /api/admin/stats) ya que /api/contracts esta restringido a Lender/Borrower.
        const usersRes = await fetch(`${API_URL}/api/users`, { headers });

        if (!usersRes.ok) {
          if (usersRes.status === 401 || usersRes.status === 403) {
            throw new Error(d.errorAuth);
          }
          throw new Error(d.errorFetch);
        }

        const usersJson = await usersRes.json();
        
        if (usersJson.success) {
          setUsers(usersJson.data);
        } else {
          throw new Error(usersJson.error?.message || d.errorFetch);
        }

      } catch (err) {
        setError(err instanceof Error ? err.message : d.errorNetwork);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAdminData();
  }, [d.errorAuth, d.errorFetch, d.errorNetwork]);

  // Procesamiento de metricas
  // Usamos los usuarios inactivos como proxy de "verificaciones pendientes"
  const pendingVerifications = users.filter(u => !u.isActive).length;

  return (
    <div className="min-h-screen bg-bg p-6 lg:p-14">
      <div className="mx-auto max-w-[1100px]">
        <header className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-[32px] font-black tracking-tight text-ink">{d.title}</h1>
            <p className="text-ink-2">{d.subtitle}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
               href="/contracts"
               className="inline-flex items-center justify-center rounded-lg border border-rule-strong bg-surface px-5 py-3 text-sm font-bold text-ink transition-colors hover:border-accent hover:text-accent"
            >
              {d.viewContractsBtn}
            </Link>
            <Link
               href="/admin/users"
               className="inline-flex items-center justify-center rounded-lg bg-accent px-5 py-3 text-sm font-bold text-accent-ink transition-opacity hover:opacity-90"
            >
              {d.viewUsersBtn} &rarr;
            </Link>
          </div>
        </header>

        {error && (
          <div className="mb-6 rounded-lg border border-red-900/50 bg-red-900/20 px-4 py-3 text-sm text-red-500">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="py-12 text-center text-ink-3">{d.loading}</div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-12">
            {/* Estas 3 metricas esperan el endpoint /api/admin/stats del backend */}
            <MetricCard label={d.metrics.activeLoans} value="N/D" />
            <MetricCard label={d.metrics.totalVolume} value="N/D" />
            <MetricCard label={d.metrics.platformRevenue} value="N/D" accent />
            
            {/* Metrica conectada dinamicamente */}
            <MetricCard label={d.metrics.pendingVerifications} value={pendingVerifications.toString()} />
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <SiteShell isDashboard={true}>
      <AdminDashboardContent />
    </SiteShell>
  );
}