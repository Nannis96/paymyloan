"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Camera, Calendar as CalIcon, FileText, MessageSquare, Bell } from "lucide-react";
import DashboardShell from "@/app/components/layout/DashboardShell";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
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

export interface ContractItem {
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
  borrowers?: { borrowerProfile: { user?: { name: string } }; isPrimary: boolean }[];
}

function LenderDashboardContent() {
  const { t, lang } = useSite();
  const [isAlertVisible, setIsAlertVisible] = useState(true);

  // Estados para datos reales
  const [lenderProfile, setLenderProfile] = useState<LenderProfileData | null>(null);
  const [contracts, setContracts] = useState<ContractItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // MOCK DATA (En ingles como solicitaste para la UI placeholder)
  const recentActivity = [
    { id: 1, text: "Term sheet accepted by Marcus R. — 7721 Bartlett Rd", time: "Today · 2:14 PM", color: "bg-green-500/20 text-green-500", icon: "✓" },
    { id: 2, text: "New deal match in Memphis — 3bd/2ba Fix & Flip", time: "Today · 11:30 AM", color: "bg-amber-500/20 text-amber-500", icon: "👀" },
    { id: 3, text: "Commitment letter generated — 3204 Shelby Dr", time: "Yesterday · 4:00 PM", color: "bg-blue-500/20 text-blue-500", icon: "📄" },
    { id: 4, text: "ACH Payment received — $1,333 Venable (Sept)", time: "Sept 1 · 12:00 AM", color: "bg-green-500/20 text-green-500", icon: "💵" },
  ];

  const pipeline = [
    { id: 1, borrower: "Marcus R. — 7721 Bartlett", stage: "Term Sheet Accepted ✅", progress: 90, color: "bg-green-500" },
    { id: 2, borrower: "Sarah Jenkins — Shelby Dr", stage: "Underwriting / Review", progress: 40, color: "bg-amber-500" },
    { id: 3, borrower: "David Webb — 38127 Area", stage: "Requested Profile", progress: 20, color: "bg-blue-500" },
  ];

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
          throw new Error("Failed to load dashboard data.");
        }

        const profileJson = await profileRes.json();
        const contractsJson = await contractsRes.json();

        if (profileJson.success) setLenderProfile(profileJson.data);
        if (contractsJson.success) setContracts(contractsJson.data.items || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Network error");
      } finally {
        setIsLoading(false);
      }
    }
    fetchDashboardData();
  }, []);

  // Procesamiento de metricas
  const activeLoans = contracts.filter(c => ["ACTIVE", "DELINQUENT"].includes(c.status));
  const commitmentLetters = contracts.filter(c => ["DRAFT", "PENDING_ACCEPTANCE"].includes(c.status));
  const capitalDeployed = activeLoans.reduce((sum, c) => sum + Number(c.currentPrincipalBalance || c.currentTerms?.principalAmount || 0), 0);
  
  const isOpenToDeals = lenderProfile?.lenderCompanies?.[0]?.isOpenToDeals ?? false;

  const formatCurrency = (amount: number | string | null | undefined) => {
    if (amount == null) return "N/D";
    return Number(amount).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 });
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "N/D";
    return new Date(dateString).toLocaleDateString(lang === "es" ? "es-MX" : "en-US", { month: "short", day: "numeric" });
  };

  const getPrimaryBorrower = (borrowers?: any[]) => {
    if (!borrowers || borrowers.length === 0) return "Unassigned";
    const primary = borrowers.find(b => b.isPrimary) || borrowers[0];
    return primary?.borrowerProfile?.user?.name || "Borrower";
  };

  if (isLoading) {
    return (
      <DashboardShell>
        <div className="flex min-h-[50vh] items-center justify-center text-ink-3">Loading lender dashboard...</div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      {/* Header */}
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <div className="mb-1 text-[11px] font-bold uppercase tracking-widest text-ink-3">
            {new Date().toLocaleDateString(lang === "es" ? "es-MX" : "en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
          <h1 className="text-[24px] font-black uppercase tracking-tight text-ink">
            Welcome, Lender 👋
          </h1>
          <p className="mt-1 text-[13px] text-ink-2">
            Here's what's happening with your deployed capital today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-rule bg-surface px-3 py-2 transition-colors hover:border-accent">
            <div className="relative">
              <input type="checkbox" className="sr-only" checked={isOpenToDeals} readOnly />
              <div className={`block h-5 w-9 rounded-full transition-colors ${isOpenToDeals ? 'bg-accent' : 'bg-rule-strong'}`}></div>
              <div className={`absolute left-1 top-1 h-3 w-3 rounded-full bg-accent-ink transition-transform ${isOpenToDeals ? 'translate-x-4' : ''}`}></div>
            </div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-ink">
              {isOpenToDeals ? "Open to Deals" : "Closed"}
            </span>
          </label>
          <Link href="/marketplace" className="rounded-lg bg-accent px-5 py-2.5 text-[13px] font-bold text-accent-ink transition-opacity hover:opacity-90">
            Browse Marketplace
          </Link>
        </div>
      </div>

      {/* Gold Alert Banner */}
      {isAlertVisible && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-amber/30 bg-amber/10 p-4">
          <Bell className="h-5 w-5 text-amber shrink-0" />
          <div className="text-[13px] text-ink-2">
            <strong className="text-amber">Action Required:</strong> Marcus R. accepted your term sheet for 7721 Bartlett. Signature required to generate commitment letter.
          </div>
          <button onClick={() => setIsAlertVisible(false)} className="ml-auto text-[11px] font-bold text-ink-3 hover:text-ink">
            Dismiss ×
          </button>
        </div>
      )}

      {error && (
        <div className="mb-6 rounded-lg border border-red-900/50 bg-red-900/20 px-4 py-3 text-sm text-red-500">
          {error}
        </div>
      )}

      {/* Stats Row */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="relative overflow-hidden rounded-xl border border-rule bg-surface p-5 border-t-4 border-t-green-500">
          <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-ink-3">Capital Deployed</div>
          <div className="mb-1 text-[26px] font-black text-ink">{formatCurrency(capitalDeployed)}</div>
          <div className="text-[11px] text-ink-3">{activeLoans.length} active loans</div>
        </div>
        <div className="relative overflow-hidden rounded-xl border border-rule bg-surface p-5 border-t-4 border-t-amber-500">
          <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-ink-3">Pending Commitments</div>
          <div className="mb-1 text-[26px] font-black text-ink">{commitmentLetters.length}</div>
          <div className="text-[11px] text-ink-3">Awaiting signatures</div>
        </div>
        <div className="relative overflow-hidden rounded-xl border border-rule bg-surface p-5 border-t-4 border-t-blue-500">
          <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-ink-3">Active Borrowers</div>
          <div className="mb-1 text-[26px] font-black text-ink">{lenderProfile?.borrowersCount || 0}</div>
          <div className="text-[11px] text-ink-3">Connected in portal</div>
        </div>
        <div className="relative overflow-hidden rounded-xl border border-rule bg-surface p-5 border-t-4 border-t-rule-strong">
          <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-ink-3">Total Volume (YTD)</div>
          <div className="mb-1 text-[26px] font-black text-ink">N/A</div>
          <div className="text-[11px] text-ink-3 font-bold text-green-500">Calculating...</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <button className="flex flex-col items-center justify-center rounded-xl border border-rule bg-surface p-4 text-center transition-all hover:border-accent hover:bg-accent/5">
          <FileText className="mb-2 h-5 w-5 text-ink-2" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-ink-3">Generate Docs</span>
        </button>
        <button className="flex flex-col items-center justify-center rounded-xl border border-rule bg-surface p-4 text-center transition-all hover:border-accent hover:bg-accent/5">
          <CalIcon className="mb-2 h-5 w-5 text-ink-2" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-ink-3">View Schedule</span>
        </button>
        <Link href="/contracts" className="flex flex-col items-center justify-center rounded-xl border border-rule bg-surface p-4 text-center transition-all hover:border-accent hover:bg-accent/5">
          <Camera className="mb-2 h-5 w-5 text-ink-2" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-ink-3">Draw Requests</span>
        </Link>
        <button className="flex flex-col items-center justify-center rounded-xl border border-rule bg-surface p-4 text-center transition-all hover:border-accent hover:bg-accent/5">
          <MessageSquare className="mb-2 h-5 w-5 text-ink-2" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-ink-3">Message Borrower</span>
        </button>
      </div>

      {/* Grid 1: Active Loans & Activity */}
      <div className="mb-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Active Loans Card */}
        <div className="rounded-xl border border-rule bg-surface p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-ink-3">My Active Loans</h3>
            <Link href="/contracts" className="text-[12px] font-bold text-accent hover:underline">View All →</Link>
          </div>
          <div className="flex flex-col gap-1">
            {activeLoans.length === 0 ? (
              <p className="text-sm text-ink-3 py-4 text-center">No active loans found.</p>
            ) : (
              activeLoans.slice(0, 4).map((loan) => (
                <div key={loan.id} className="flex items-center justify-between border-b border-rule py-3 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-rule bg-surface-2 text-[16px]">
                      🏡
                    </div>
                    <div>
                      <div className="text-[13px] font-bold text-ink">{loan.property.addressLine1}</div>
                      <div className="text-[11px] text-ink-3 mt-0.5">{getPrimaryBorrower(loan.borrowers)} · {loan.currentTerms?.interestRate}%</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest ${loan.status === 'ACTIVE' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                      {loan.status}
                    </span>
                    <div className="mt-1 text-[12px] font-bold text-ink-2">{formatCurrency(loan.currentPrincipalBalance)}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Activity Card */}
        <div className="rounded-xl border border-rule bg-surface p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-ink-3">Recent Activity</h3>
            <span className="text-[12px] font-bold text-accent cursor-pointer hover:underline">All →</span>
          </div>
          <div className="flex flex-col gap-1">
            {recentActivity.map((act) => (
              <div key={act.id} className="flex gap-3 border-b border-rule py-3 last:border-0">
                <div className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-black ${act.color}`}>
                  {act.icon}
                </div>
                <div>
                  <div className="text-[12px] text-ink-2 leading-relaxed">{act.text}</div>
                  <div className="text-[10px] text-ink-3 mt-1">{act.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid 2: Pipeline */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="rounded-xl border border-rule bg-surface p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-ink-3">Underwriting Pipeline</h3>
            <span className="text-[12px] font-bold text-accent cursor-pointer hover:underline">Manage →</span>
          </div>
          <div className="flex flex-col gap-3">
            {pipeline.map((item) => (
              <div key={item.id} className="mb-1">
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-[12px] font-bold text-ink">{item.borrower}</span>
                  <span className="text-[10px] text-ink-3">{item.stage}</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-2 border border-rule">
                  <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.progress}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

export default function LenderDashboard() {
  return (
    <SiteShell isMinimal={true}>
      <LenderDashboardContent />
    </SiteShell>
  );
}