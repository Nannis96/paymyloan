"use client";

import { useState, useEffect } from "react";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import { MetricCard } from "@/app/components/ui";
import Link from "next/link";
import PitchDeckModal from "@/app/components/borrower/PitchDeckModal";
import RateLenderModal from "@/app/components/borrower/RateLenderModal";
import NotificationsPanel from "@/app/components/ambos/NotificationsPanel";
import BillingBanner from "@/app/components/borrower/BillingBanner";
import { NeedFundingTable, LoanApprovedTable, CurrentLoansTable, CompletedLoansList } from "@/app/components/borrower/BorrowerTables";
import { API_ROUTES } from "@/app/lib/endpoints";

export interface ContractItem {
  id: string;
  contractNumber: string;
  status: string;
  currentPrincipalBalance: number | string | null;
  property: { addressLine1: string; city: string; state: string };
  lenderCompany?: { companyName: string };
  currentTerms?: { principalAmount: number | string; interestRate: number | string };
  nextPaymentDueDate?: string;
  paidOffAt?: string;
}

export interface LoanRequestItem {
  id: string;
  status: string;
  totalLoanAmountRequested: number | string;
  property: { addressLine1: string; city: string; state: string };
  matchedLenderCompany?: { companyName: string };
}

function BorrowerDashboardContent() {
  const { t } = useSite();
  const d = t.dashboardBorrower;

  const [isPitchModalOpen, setIsPitchModalOpen] = useState(false);
  const [isRateModalOpen, setIsRateModalOpen] = useState(false);
  const [selectedLender, setSelectedLender] = useState("");

  const [contracts, setContracts] = useState<ContractItem[]>([]);
  const [loanRequests, setLoanRequests] = useState<LoanRequestItem[]>([]);
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

        const [contractsRes, requestsRes] = await Promise.all([
          fetch(API_ROUTES.contracts.base, { headers }),
          fetch(API_ROUTES.borrowers.meLoanRequests, { headers })
        ]);

        if (!contractsRes.ok || !requestsRes.ok) {
          if (contractsRes.status === 401 || requestsRes.status === 401) {
            throw new Error(d.errorAuth);
          }
          throw new Error(d.errorFetch);
        }

        const contractsJson = await contractsRes.json();
        const requestsJson = await requestsRes.json();

        if (contractsJson.success) setContracts(contractsJson.data.items || []);
        if (requestsJson.success) setLoanRequests(requestsJson.data.items || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : d.errorNetwork);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDashboardData();
  }, [d.errorAuth, d.errorFetch, d.errorNetwork]);

  const currentLoans = contracts.filter(c => ["ACTIVE", "DELINQUENT"].includes(c.status));
  const completedLoans = contracts.filter(c => c.status === "PAID_OFF");
  const loanApproved = contracts.filter(c => c.status === "PENDING_ACCEPTANCE");
  const needFunding = loanRequests.filter(r => ["DRAFT", "PUBLISHED"].includes(r.status));

  const totalOwed = currentLoans.reduce((sum, c) => sum + Number(c.currentPrincipalBalance || c.currentTerms?.principalAmount || 0), 0);
  const activePropertiesCount = new Set(currentLoans.map(c => c.property.addressLine1)).size;

  const formatCurrency = (amount: number) => {
    return Number(amount).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 });
  };

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
        
        <header className="mb-6">
          <h1 className="text-[32px] font-black tracking-tight text-ink">{d.title}</h1>
          <p className="text-ink-2">{d.subtitle}</p>
        </header>

        {error && (
          <div className="mb-6 rounded-lg border border-red-900/50 bg-red-900/20 px-4 py-3 text-sm text-red-500">
            {error}
          </div>
        )}

        <div className="mb-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          <div className="md:col-span-2">
            <BillingBanner />
          </div>
          <div>
            <NotificationsPanel />
          </div>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard label={d.metrics.totalOwed} value={formatCurrency(totalOwed)} accent />
          <MetricCard label={d.metrics.nextDue} value="N/D" />
          <MetricCard label={d.metrics.properties} value={activePropertiesCount.toString()} />
          <MetricCard label={d.metrics.pmlRating} value="A+" />
        </div>

        <div className="mb-10 flex flex-wrap items-center gap-3">
          <button onClick={() => setIsPitchModalOpen(true)} className="inline-flex items-center justify-center rounded-lg bg-green-600 px-5 py-3 text-sm font-bold text-white shadow-md transition-opacity hover:opacity-90">
            + {d.actions.pitchDeck}
          </button>
          <Link href="/borrower/payments" className="inline-flex items-center justify-center rounded-lg bg-ink px-5 py-3 text-sm font-bold text-bg shadow-sm transition-opacity hover:opacity-90">
            {d.actions.payments}
          </Link>
          <Link href="/contracts" className="inline-flex items-center justify-center rounded-lg border border-accent bg-accent-soft px-5 py-3 text-sm font-bold text-accent transition-colors hover:opacity-80">
            {d.actions.viewContracts}
          </Link>
          <Link href="/apply" className="inline-flex items-center justify-center rounded-lg border border-rule-strong bg-surface px-5 py-3 text-sm font-bold text-ink transition-colors hover:border-accent hover:text-accent">
            {t.vetting.title}
          </Link>
        </div>

        <div className="mb-10 grid grid-cols-1 gap-8 md:grid-cols-2">
          <NeedFundingTable data={needFunding} />
          <LoanApprovedTable data={loanApproved} />
        </div>

        <div className="mb-10 grid grid-cols-1 gap-8 md:grid-cols-2">
          <CurrentLoansTable data={currentLoans} />
          <CompletedLoansList 
            data={completedLoans} 
            onRateLender={(name) => { setSelectedLender(name); setIsRateModalOpen(true); }} 
          />
        </div>

      </div>

      {isPitchModalOpen && <PitchDeckModal onClose={() => setIsPitchModalOpen(false)} />}
      
      {isRateModalOpen && (
        <RateLenderModal 
          onClose={() => setIsRateModalOpen(false)} 
          lenderName={selectedLender} 
          contractId="CTR-009" 
        />
      )}
    </div>
  );
}

export default function BorrowerDashboard() {
  return (
    <SiteShell isDashboard={true}>
      <BorrowerDashboardContent />
    </SiteShell>
  );
}