"use client";

import { useState, useEffect } from "react";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import { MetricCard } from "@/app/components/ui";
import Link from "next/link";
import NotificationsPanel from "@/app/components/ambos/NotificationsPanel";
import { CommitmentLettersTable, UpcomingClosingsTable, ActiveLoansTable, RecentPaymentsTable } from "@/app/components/lender/LenderTables";
import { API_ROUTES } from "@/app/lib/endpoints";

export interface LenderProfileData {
  borrowersCount: number;
  activeContractsCount: number;
  lenderCompanies: {
    id: string;
    companyName: string;
    isOpenToDeals: boolean;
  }[];
}

export interface ContractBorrowerData {
  borrowerProfile: { user?: { name: string } };
  isPrimary: boolean;
}

export interface ContractItem {
  id: string;
  contractNumber: string;
  status: string;
  currentPrincipalBalance: number | string | null;
  property: { addressLine1: string; city: string; state: string };
  currentTerms?: { principalAmount: number | string; interestRate: number | string; calculatedMonthlyPayment: number | string | null; };
  nextPaymentDueDate?: string;
  borrowers?: ContractBorrowerData[];
}

function LenderDashboardContent() {
  const { t } = useSite();
  const d = t.dashboardLender;

  const [lenderProfile, setLenderProfile] = useState<LenderProfileData | null>(null);
  const [contracts, setContracts] = useState<ContractItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const token = localStorage.getItem("accessToken") || "";
        const headers = { "Content-Type": "application/json", "Authorization": `Bearer ${token}` };

        const [profileRes, contractsRes] = await Promise.all([
          fetch(API_ROUTES.lenders.me, { headers }),
          fetch(API_ROUTES.contracts.base, { headers })
        ]);

        if (!profileRes.ok || !contractsRes.ok) {
          if (profileRes.status === 401 || contractsRes.status === 401) throw new Error(d.errorAuth);
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

  const formatCurrency = (amount: number) => {
    return Number(amount).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 });
  };

  const commitmentLetters = contracts.filter(c => ["DRAFT", "PENDING_ACCEPTANCE"].includes(c.status));
  const activeLoans = contracts.filter(c => ["ACTIVE", "DELINQUENT"].includes(c.status));

  const capitalDeployed = activeLoans.reduce((sum, c) => sum + Number(c.currentPrincipalBalance || c.currentTerms?.principalAmount || 0), 0);
  const avgInterest = activeLoans.length > 0 
    ? (activeLoans.reduce((sum, c) => sum + Number(c.currentTerms?.interestRate || 0), 0) / activeLoans.length).toFixed(2)
    : "0.00";

  const isOpenToDeals = lenderProfile?.lenderCompanies?.[0]?.isOpenToDeals ?? false;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg p-6 lg:p-14">
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
            <Link href="/contracts" className="inline-flex items-center justify-center rounded-lg border border-rule-strong bg-surface px-5 py-3 text-sm font-bold text-ink transition-colors hover:border-accent hover:text-accent">
              {d.actions.viewContracts}
            </Link>
            
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-rule bg-surface px-4 py-2 transition-colors hover:border-accent">
              <div className="relative">
                <input type="checkbox" className="sr-only" checked={isOpenToDeals} readOnly />
                <div className={`block h-6 w-10 rounded-full transition-colors ${isOpenToDeals ? 'bg-accent' : 'bg-rule-strong'}`}></div>
                <div className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-accent-ink transition-transform ${isOpenToDeals ? 'translate-x-4' : ''}`}></div>
              </div>
              <span className="text-sm font-bold text-ink">
                {isOpenToDeals ? d.toggle.open : d.toggle.closed}
              </span>
            </label>
            
            <Link href="/marketplace" className="inline-flex items-center justify-center rounded-lg bg-accent px-5 py-3 text-sm font-bold text-accent-ink shadow-sm transition-opacity hover:opacity-90">
              {d.actions.marketplace} &rarr;
            </Link>
          </div>
        </header>

        {error && (
          <div className="mb-6 rounded-lg border border-red-900/50 bg-red-900/20 px-4 py-3 text-sm text-red-500">
            {error}
          </div>
        )}

        <div className="mb-10">
          <NotificationsPanel />
        </div>

        <div className="mb-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-rule border-t-[3px] border-t-accent bg-surface p-6 shadow-sm">
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

        <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <CommitmentLettersTable data={commitmentLetters} />
          <UpcomingClosingsTable data={[]} />
        </div>

        <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <ActiveLoansTable data={activeLoans} />
          <RecentPaymentsTable data={[]} />
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