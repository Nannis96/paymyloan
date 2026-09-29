"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Camera, Calendar as CalIcon, FileText, MessageSquare, Bell } from "lucide-react";
import DashboardShell from "@/app/components/layout/DashboardShell";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import { API_ROUTES } from "@/app/lib/endpoints";

// Interfaces basadas en tu modelo
interface ContractItem {
  id: string;
  status: string;
  currentPrincipalBalance: number | string | null;
  property: { addressLine1: string; city: string; state: string };
  lenderCompany?: { companyName: string };
  currentTerms?: { principalAmount: number | string; interestRate: number | string };
  nextPaymentDueDate?: string;
}

interface LoanRequestItem {
  id: string;
  status: string;
  totalLoanAmountRequested: number | string;
  property: { addressLine1: string; city: string; state: string };
}

function BorrowerDashboardContent() {
  const { t, lang } = useSite();
  const [isAlertVisible, setIsAlertVisible] = useState(true);
  
  // Estados para datos reales
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

        // Fetch simultáneo a las rutas reales de tu backend
        const [contractsRes, requestsRes] = await Promise.all([
          fetch(API_ROUTES.contracts.base, { headers }),
          fetch(API_ROUTES.borrowers.meLoanRequests, { headers })
        ]);

        if (!contractsRes.ok || !requestsRes.ok) {
          throw new Error("Error al obtener los datos del dashboard.");
        }

        const contractsJson = await contractsRes.json();
        const requestsJson = await requestsRes.json();

        if (contractsJson.success) setContracts(contractsJson.data.items || []);
        if (requestsJson.success) setLoanRequests(requestsJson.data.items || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error de red");
      } finally {
        setIsLoading(false);
      }
    }
    fetchDashboardData();
  }, []);

  // Procesamiento de métricas en el cliente basado en la data real
  const activeLoans = contracts.filter(c => ["ACTIVE", "DELINQUENT"].includes(c.status));
  const activeRequests = loanRequests.filter(r => ["PUBLISHED"].includes(r.status));
  const pendingFunding = loanRequests.filter(r => ["PENDING_ACCEPTANCE"].includes(r.status));
  
  const totalOwed = activeLoans.reduce((sum, c) => sum + Number(c.currentPrincipalBalance || c.currentTerms?.principalAmount || 0), 0);
  const totalFundingPipeline = pendingFunding.reduce((sum, r) => sum + Number(r.totalLoanAmountRequested || 0), 0);

  const formatCurrency = (amount: number | string | null | undefined) => {
    if (amount == null) return "N/D";
    return Number(amount).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 });
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "N/D";
    return new Date(dateString).toLocaleDateString(lang === "es" ? "es-MX" : "en-US", { month: "short", day: "numeric" });
  };

  if (isLoading) {
    return (
      <DashboardShell>
        <div className="flex min-h-[50vh] items-center justify-center text-ink-3">Cargando tu dashboard...</div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <div className="mb-1 text-[11px] font-bold uppercase tracking-widest text-ink-3">
            {new Date().toLocaleDateString(lang === "es" ? "es-MX" : "en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
          <h1 className="text-[24px] font-black uppercase tracking-tight text-ink">
            Welcome 👋
          </h1>
          <p className="mt-1 text-[13px] text-ink-2">
            Here’s a quick overview of your current loans and requests.
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/borrower/payments" className="rounded-lg border border-rule bg-surface px-4 py-2.5 text-[13px] font-bold text-ink-2 transition-colors hover:border-accent hover:text-ink">
            Manage Payments
          </Link>
          <Link href="/apply" className="rounded-lg bg-accent px-5 py-2.5 text-[13px] font-bold text-accent-ink transition-opacity hover:opacity-90">
            ➕ Submit New Deal
          </Link>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-900/50 bg-red-900/20 px-4 py-3 text-sm text-red-500">
          {error}
        </div>
      )}

      {/* Stats Row con Data Real */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="relative overflow-hidden rounded-xl border border-rule bg-surface p-5 border-t-4 border-t-green-500">
          <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-ink-3">Tratos Publicados</div>
          <div className="mb-1 text-[26px] font-black text-ink">{activeRequests.length}</div>
          <div className="text-[11px] text-ink-3">En el mercado</div>
        </div>
        <div className="relative overflow-hidden rounded-xl border border-rule bg-surface p-5 border-t-4 border-t-accent">
          <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-ink-3">En Proceso (Pipeline)</div>
          <div className="mb-1 text-[26px] font-black text-ink">{formatCurrency(totalFundingPipeline)}</div>
          <div className="text-[11px] text-ink-3">{pendingFunding.length} tratos en revisión</div>
        </div>
        <div className="relative overflow-hidden rounded-xl border border-rule bg-surface p-5 border-t-4 border-t-blue-500">
          <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-ink-3">Saldo Vigente</div>
          <div className="mb-1 text-[26px] font-black text-ink">{formatCurrency(totalOwed)}</div>
          <div className="text-[11px] text-ink-3">{activeLoans.length} préstamos activos</div>
        </div>
        <div className="relative overflow-hidden rounded-xl border border-rule bg-surface p-5 border-t-4 border-t-rule-strong">
          <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-ink-3">PML Score</div>
          <div className="mb-1 text-[26px] font-black text-ink">N/A</div>
          <div className="text-[11px] text-ink-3 font-bold">Calculando historial...</div>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {/* Acciones rápidas... */}
      </div>

      {/* Listas Renderizadas con Data Real */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        
        <div className="rounded-xl border border-rule bg-surface p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-ink-3">Mis Solicitudes Activas</h3>
            <span className="text-[12px] font-bold text-accent cursor-pointer hover:underline">Ver Todas →</span>
          </div>
          <div className="flex flex-col gap-1">
            {loanRequests.length === 0 ? (
              <p className="text-sm text-ink-3 py-4 text-center">No tienes tratos publicados.</p>
            ) : (
              loanRequests.map((deal) => (
                <div key={deal.id} className="flex items-center justify-between border-b border-rule py-3 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-rule bg-surface-2 text-[16px]">🏠</div>
                    <div>
                      <div className="text-[13px] font-bold text-ink">{deal.property.addressLine1}</div>
                      <div className="text-[11px] text-ink-3 mt-0.5">{deal.property.city}, {deal.property.state}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block rounded-full bg-blue-500/10 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-blue-500">
                      {deal.status}
                    </span>
                    <div className="mt-1 text-[12px] font-bold text-ink-2">{formatCurrency(deal.totalLoanAmountRequested)}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-xl border border-rule bg-surface p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-ink-3">Préstamos Actuales</h3>
          </div>
          <div className="flex flex-col gap-1">
            {activeLoans.length === 0 ? (
              <p className="text-sm text-ink-3 py-4 text-center">No tienes préstamos activos.</p>
            ) : (
              activeLoans.map((loan) => (
                <div key={loan.id} className="flex items-center justify-between border-b border-rule py-3 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-rule bg-surface-2 text-[16px]">💰</div>
                    <div>
                      <div className="text-[13px] font-bold text-ink">{loan.property.addressLine1}</div>
                      <div className="text-[11px] text-ink-3 mt-0.5">Vence: {formatDate(loan.nextPaymentDueDate)}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[13px] font-bold text-ink">{formatCurrency(loan.currentPrincipalBalance || loan.currentTerms?.principalAmount)}</div>
                    <div className="text-[11px] text-ink-3">{loan.lenderCompany?.companyName || "Prestamista"}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </DashboardShell>
  );
}

export default function BorrowerDashboard() {
  return (
    <SiteShell isMinimal={true}>
      <BorrowerDashboardContent />
    </SiteShell>
  );
}