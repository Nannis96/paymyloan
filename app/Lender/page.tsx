"use client";

import { useState, useEffect } from "react";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import { MetricCard } from "@/app/components/ui";
import Link from "next/link";
import { Bell } from "lucide-react";

// URL base de la API
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

// Interfaces basadas en la base de datos
interface LenderProfileData {
  borrowersCount: number;
  activeContractsCount: number;
  lenderCompanies: {
    id: string;
    companyName: string;
    isOpenToDeals: boolean;
  }[];
}

interface ContractBorrowerData {
  borrowerProfile: {
    user?: { name: string };
  };
  isPrimary: boolean;
}

interface ContractItem {
  id: string;
  contractNumber: string;
  status: string;
  currentPrincipalBalance: number | string | null;
  property: { addressLine1: string; city: string; state: string };
  currentTerms?: { 
    principalAmount: number | string; 
    interestRate: number | string;
    calculatedMonthlyPayment: number | string | null;
  };
  nextPaymentDueDate?: string;
  borrowers?: ContractBorrowerData[];
}

function LenderDashboardContent() {
  const { t, lang } = useSite();
  const d = t.dashboardLender;
  const n = t.notifications;

  // Estados de datos reales
  const [lenderProfile, setLenderProfile] = useState<LenderProfileData | null>(null);
  const [contracts, setContracts] = useState<ContractItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const token = localStorage.getItem("accessToken") || "";
        const headers = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        };

        const [profileRes, contractsRes] = await Promise.all([
          fetch(`${API_URL}/api/lenders/me`, { headers }),
          fetch(`${API_URL}/api/contracts`, { headers })
        ]);

        if (!profileRes.ok || !contractsRes.ok) {
          if (profileRes.status === 401 || contractsRes.status === 401) {
            throw new Error(d.errorAuth);
          }
          throw new Error(d.errorFetch);
        }

        const profileJson = await profileRes.json();
        const contractsJson = await contractsRes.json();

        if (profileJson.success) setLenderProfile(profileJson.data);
        if (contractsJson.success) setContracts(contractsJson.data.items || []);

      } catch (err) {
        setError(err instanceof Error ? err.message : d.errorNetwork);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDashboardData();
  }, [d.errorAuth, d.errorFetch, d.errorNetwork]);

  // Formateadores
  const formatCurrency = (amount: number | string | null | undefined) => {
    if (amount == null) return "N/D";
    return Number(amount).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 });
  };
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/D";
    return new Date(dateString).toLocaleDateString(lang === "es" ? "es-MX" : "en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });
  };

  const getPrimaryBorrowerName = (borrowers?: ContractBorrowerData[]) => {
    if (!borrowers || borrowers.length === 0) return d.unassigned;
    const primary = borrowers.find(b => b.isPrimary) || borrowers[0];
    return primary?.borrowerProfile?.user?.name || d.borrowerFallback;
  };

  // --- PROCESAMIENTO DE DATOS ---
  // 1. Cartas de Compromiso (Borradores o pendientes de aceptacion)
  const commitmentLetters = contracts.filter(c => ["DRAFT", "PENDING_ACCEPTANCE"].includes(c.status));
  
  // 2. Prestamos Activos (Retorno)
  const activeLoans = contracts.filter(c => ["ACTIVE", "DELINQUENT"].includes(c.status));
  
  // Metricas
  const capitalDeployed = activeLoans.reduce((sum, c) => sum + Number(c.currentPrincipalBalance || c.currentTerms?.principalAmount || 0), 0);
  
  const avgInterest = activeLoans.length > 0 
    ? (activeLoans.reduce((sum, c) => sum + Number(c.currentTerms?.interestRate || 0), 0) / activeLoans.length).toFixed(2)
    : "0.00";

  // Determinar si la empresa principal esta abierta a negocios
  const isOpenToDeals = lenderProfile?.lenderCompanies?.[0]?.isOpenToDeals ?? false;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg p-6 lg:p-14 flex items-center justify-center">
        <p className="text-ink-3">{d.loading}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg p-6 lg:p-14">
      <div className="mx-auto max-w-[1100px]">
        
        <header className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h1 className="text-[32px] font-black tracking-tight text-ink">{d.title}</h1>
            <p className="text-ink-2">{d.subtitle}</p>
          </div>
          
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
                href="/contracts"
                className="inline-flex items-center justify-center rounded-lg border border-rule-strong bg-surface px-5 py-3 text-sm font-bold text-ink transition-colors hover:border-accent hover:text-accent"
            >
              {d.actions.viewContracts}
            </Link>
            
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-rule bg-surface px-4 py-2 hover:border-accent transition-colors">
              <div className="relative">
                <input type="checkbox" className="sr-only" checked={isOpenToDeals} readOnly />
                <div className={`block h-6 w-10 rounded-full transition-colors ${isOpenToDeals ? 'bg-accent' : 'bg-rule-strong'}`}></div>
                <div className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-accent-ink transition-transform ${isOpenToDeals ? 'translate-x-4' : ''}`}></div>
              </div>
              <span className="text-sm font-bold text-ink">
                {isOpenToDeals ? d.toggle.open : d.toggle.closed}
              </span>
            </label>
            
            <Link href="/marketplace" className="inline-flex items-center justify-center rounded-lg bg-accent px-5 py-3 text-sm font-bold text-accent-ink transition-opacity hover:opacity-90">
              {d.actions.marketplace} &rarr;
            </Link>
          </div>
        </header>

        {error && (
          <div className="mb-6 rounded-lg border border-red-900/50 bg-red-900/20 px-4 py-3 text-sm text-red-500">
            {error}
          </div>
        )}

        {/* Panel de Notificaciones (Lender) */}
        <div className="mb-10 rounded-xl border border-rule bg-surface p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4 border-b border-rule pb-3">
            <h3 className="text-[12px] font-bold uppercase tracking-widest text-accent flex items-center gap-1.5"><Bell size={14}/> {n.title}</h3>
            <button className="text-[10px] font-bold text-ink-3 hover:text-ink">{n.markRead}</button>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <p className="text-sm text-ink-3">{n.empty}</p>
          </div>
        </div>

        {/* Metricas */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          <div className="rounded-xl border border-rule bg-surface p-6 shadow-sm border-t-[3px] border-t-accent">
            <div className="mb-2 text-[11px] font-extrabold uppercase tracking-widest text-accent">
              {d.metrics.availableCapital}
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black tracking-tight text-ink">N/D</span>
              <span className="text-lg font-medium text-ink-3">/ {formatCurrency(capitalDeployed)}</span>
            </div>
          </div>
          <MetricCard label={d.metrics.nextPayments} value="N/D" />
          <MetricCard label={d.metrics.avgInterest} value={`${avgInterest}%`} />
          <MetricCard label={d.metrics.activeBorrowers} value={lenderProfile?.borrowersCount?.toString() || "0"} />
        </div>

        {/* Seccion 1: Cartas de Compromiso y Cierres */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <section>
            <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-ink-3">
              {d.sections.commitmentLetters}
            </h2>
            <div className="overflow-x-auto rounded-xl border border-rule bg-surface shadow-sm">
              <table className="w-full text-left text-[14px]">
                <thead className="border-b border-rule bg-surface-2">
                  <tr>
                    <th className="px-4 py-3 font-bold text-ink-3">{d.tableHeaders.borrower}</th>
                    <th className="px-4 py-3 font-bold text-ink-3">{d.tableHeaders.amount}</th>
                    <th className="px-4 py-3 font-bold text-ink-3">{d.tableHeaders.status}</th>
                  </tr>
                </thead>
                <tbody className="text-ink-2 divide-y divide-rule">
                  {commitmentLetters.length === 0 ? (
                    <tr><td colSpan={3} className="px-4 py-6 text-center text-ink-3">{d.emptyCommitments}</td></tr>
                  ) : (
                    commitmentLetters.map((cl) => (
                      <tr key={cl.id} className="hover:bg-surface-2 transition-colors">
                        <td className="px-4 py-3">
                          <Link href={`/contracts/${cl.id}`} className="font-medium text-ink hover:underline">
                            {getPrimaryBorrowerName(cl.borrowers)}
                          </Link>
                          <div className="text-[11px] text-ink-3">{cl.property.addressLine1}</div>
                        </td>
                        <td className="px-4 py-3 font-mono font-bold">{formatCurrency(cl.currentTerms?.principalAmount)}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex rounded-[4px] border px-2 py-0.5 text-[10px] font-bold ${cl.status === 'PENDING_ACCEPTANCE' ? 'bg-amber-soft border-amber/30 text-amber' : 'bg-gray-100 border-gray-200 text-gray-700'}`}>
                            {cl.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-ink-3">
              {d.sections.upcomingClosings}
            </h2>
            <div className="overflow-x-auto rounded-xl border border-rule bg-surface shadow-sm">
              <table className="w-full text-left text-[14px]">
                <thead className="border-b border-rule bg-surface-2">
                  <tr>
                    <th className="px-4 py-3 font-bold text-ink-3">{d.tableHeaders.type}</th>
                    <th className="px-4 py-3 font-bold text-ink-3">{d.tableHeaders.date}</th>
                    <th className="px-4 py-3 font-bold text-ink-3">{d.tableHeaders.action}</th>
                  </tr>
                </thead>
                <tbody className="text-ink-2 divide-y divide-rule">
                  <tr><td colSpan={3} className="px-4 py-6 text-center text-ink-3">{d.emptyClosings}</td></tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Seccion 2: Prestamos Activos y Ultimos Pagos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <section>
            <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-ink-3">
              {d.sections.activeLoans}
            </h2>
            <div className="overflow-x-auto rounded-xl border border-rule bg-surface shadow-sm">
              <table className="w-full text-left text-[14px]">
                <thead className="border-b border-rule bg-surface-2">
                  <tr>
                    <th className="px-4 py-3 font-bold text-ink-3">{d.tableHeaders.loan}</th>
                    <th className="px-4 py-3 font-bold text-ink-3">{d.tableHeaders.rateBalance}</th>
                    <th className="px-4 py-3 font-bold text-ink-3">{d.tableHeaders.status}</th>
                  </tr>
                </thead>
                <tbody className="text-ink-2 divide-y divide-rule">
                  {activeLoans.length === 0 ? (
                    <tr><td colSpan={3} className="px-4 py-6 text-center text-ink-3">{d.emptyLoans}</td></tr>
                  ) : (
                    activeLoans.map((al) => (
                      <tr key={al.id} className="hover:bg-surface-2 transition-colors">
                        <td className="px-4 py-3">
                          <Link href={`/contracts/${al.id}`} className="font-medium text-ink hover:underline">
                            {getPrimaryBorrowerName(al.borrowers)}
                          </Link>
                          <div className="text-[11px] text-ink-3">{al.property.addressLine1}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-bold text-accent">{Number(al.currentTerms?.interestRate || 0)}%</div>
                          <div className="font-mono text-xs text-ink-3">{formatCurrency(al.currentPrincipalBalance || al.currentTerms?.principalAmount)}</div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex rounded-[4px] border px-2 py-0.5 text-[10px] font-bold ${al.status === 'ACTIVE' ? 'border-green-200 bg-green-50 text-green-700 dark:border-green-900/40 dark:bg-green-900/10 dark:text-green-400' : 'border-red-200 bg-red-50 text-red-700'}`}>
                            {al.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-ink-3">
              {d.recentPayments}
            </h2>
            <div className="overflow-x-auto rounded-xl border border-rule bg-surface shadow-sm">
              <table className="w-full text-left text-[14px]">
                <thead className="border-b border-rule bg-surface-2">
                  <tr>
                    <th className="px-4 py-3 font-bold text-ink-3">{d.table.date}</th>
                    <th className="px-4 py-3 font-bold text-ink-3">{d.table.borrower}</th>
                    <th className="px-4 py-3 font-bold text-ink-3">{d.table.total}</th>
                  </tr>
                </thead>
                <tbody className="text-ink-2 divide-y divide-rule">
                  <tr><td colSpan={3} className="px-4 py-6 text-center text-ink-3">{d.emptyPayments}</td></tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>

      </div>
    </div>
  );
}

export default function LenderDashboard() {
  return (
    <SiteShell isDashboard={true}>
      <LenderDashboardContent />
    </SiteShell>
  );
}