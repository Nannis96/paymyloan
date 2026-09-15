"use client";

import { useState, useEffect } from "react";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import { MetricCard } from "@/app/components/ui";
import Link from "next/link";
import PitchDeckModal from "@/app/components/PitchDeckModal";
import RateLenderModal from "@/app/components/RateLenderModal";
import { Bell } from "lucide-react";

// URL base de la API
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

// Interfaces basadas en la base de datos
interface ContractItem {
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

interface LoanRequestItem {
  id: string;
  status: string;
  totalLoanAmountRequested: number | string;
  property: { addressLine1: string; city: string; state: string };
  matchedLenderCompany?: { companyName: string };
}

function BorrowerDashboardContent() {
  const { t, lang } = useSite();
  const d = t.dashboardBorrower;
  const n = t.notifications;

  const [isPitchModalOpen, setIsPitchModalOpen] = useState(false);
  const [isRateModalOpen, setIsRateModalOpen] = useState(false);
  const [selectedLender, setSelectedLender] = useState("");

  // Estados de datos reales
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

        // Hacemos fetch a los contratos y a los loan requests del borrower
        const [contractsRes, requestsRes] = await Promise.all([
          fetch(`${API_URL}/api/contracts`, { headers }),
          fetch(`${API_URL}/api/borrowers/me/loan-requests`, { headers })
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

  // Formateadores
  const formatCurrency = (amount: number | string | null | undefined) => {
    if (amount == null) return "N/D";
    return Number(amount).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 });
  };
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/D";
    return new Date(dateString).toLocaleDateString(lang === "es" ? "es-MX" : "en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });
  };

  // --- PROCESAMIENTO DE DATOS ---
  // 1. Current Loans (Activos o Delincuentes)
  const currentLoans = contracts.filter(c => ["ACTIVE", "DELINQUENT"].includes(c.status));
  
  // 2. Completed Loans (Pagados)
  const completedLoans = contracts.filter(c => c.status === "PAID_OFF");
  
  // 3. Loan Approved (Contratos en Pending Acceptance generados tras un Match)
  const loanApproved = contracts.filter(c => c.status === "PENDING_ACCEPTANCE");
  
  // 4. Need Funding (Solicitudes en borrador o publicadas en el marketplace)
  const needFunding = loanRequests.filter(r => ["DRAFT", "PUBLISHED"].includes(r.status));

  // Calculo de metricas dinamicas
  const totalOwed = currentLoans.reduce((sum, c) => sum + Number(c.currentPrincipalBalance || c.currentTerms?.principalAmount || 0), 0);
  const activePropertiesCount = new Set(currentLoans.map(c => c.property.addressLine1)).size;

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
        
        <header className="mb-6">
          <h1 className="text-[32px] font-black tracking-tight text-ink">{d.title}</h1>
          <p className="text-ink-2">{d.subtitle}</p>
        </header>

        {error && (
          <div className="mb-6 rounded-lg border border-red-900/50 bg-red-900/20 px-4 py-3 text-sm text-red-500">
            {error}
          </div>
        )}

        {/* Notificaciones y Suscripcion en la parte superior */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          <div className="md:col-span-2 flex flex-col items-start justify-between gap-4 rounded-xl border border-amber/30 bg-amber-soft p-5 sm:flex-row sm:items-center">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-amber">
                {t.billing?.bannerTitle || "Prueba Gratuita"}
              </div>
              <div className="text-sm font-medium text-ink-2 mt-1">
                {t.billing?.bannerText || "Te quedan X dias..."}
              </div>
            </div>
            <Link href="/billing" className="shrink-0 rounded-lg bg-amber px-4 py-2 text-xs font-bold text-bg transition-opacity hover:opacity-90 shadow-sm">
              {t.billing?.bannerCta || "Activar Suscripcion"}
            </Link>
          </div>
          <div className="rounded-xl border border-rule bg-surface p-5 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-accent flex items-center gap-1.5"><Bell size={14}/> {n.title}</h3>
              <button className="text-[10px] font-bold text-ink-3 hover:text-ink">{n.markRead}</button>
            </div>
            <div className="flex flex-col gap-2 overflow-y-auto max-h-[80px]">
              <p className="text-xs text-ink-3">{n.empty}</p>
            </div>
          </div>
        </div>

        {/* Metricas */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <MetricCard label={d.metrics.totalOwed} value={formatCurrency(totalOwed)} accent />
          <MetricCard label={d.metrics.nextDue} value="N/D" />
          <MetricCard label={d.metrics.properties} value={activePropertiesCount.toString()} />
          <MetricCard label={d.metrics.pmlRating} value="A+" />
        </div>

        {/* Acciones */}
        <div className="mb-10 flex flex-wrap items-center gap-3">
          <button onClick={() => setIsPitchModalOpen(true)} className="inline-flex items-center justify-center rounded-lg bg-accent px-5 py-3 text-sm font-bold text-accent-ink transition-opacity hover:opacity-90">
            + {d.actions.pitchDeck}
          </button>
          <Link href="/borrower/payments" className="inline-flex items-center justify-center rounded-lg bg-ink px-5 py-3 text-sm font-bold text-bg transition-opacity hover:opacity-90 shadow-sm">
            {d.actions.payments}
          </Link>
          <Link href="/contracts" className="inline-flex items-center justify-center rounded-lg border border-accent bg-accent-soft px-5 py-3 text-sm font-bold text-accent transition-colors hover:opacity-80">
            {d.actions.viewContracts}
          </Link>
          <Link href="/apply" className="inline-flex items-center justify-center rounded-lg border border-rule-strong bg-surface px-5 py-3 text-sm font-bold text-ink transition-colors hover:border-accent hover:text-accent">
            {t.vetting.title}
          </Link>
        </div>

        {/* Tablas (Need Funding & Loan Approved) */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 mb-10">
          <section>
            <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-ink-3">{d.needFunding}</h2>
            <div className="overflow-x-auto rounded-xl border border-rule bg-surface shadow-sm">
              <table className="w-full text-left text-[14px]">
                <thead className="border-b border-rule bg-surface-2">
                  <tr>
                    <th className="px-4 py-3 font-bold text-ink-3">{d.tableHeaders?.property}</th>
                    <th className="px-4 py-3 font-bold text-ink-3">{d.tableHeaders?.amount}</th>
                    <th className="px-4 py-3 font-bold text-ink-3">{d.tableHeaders?.status}</th>
                  </tr>
                </thead>
                <tbody className="text-ink-2 divide-y divide-rule">
                  {needFunding.length === 0 ? (
                    <tr><td colSpan={3} className="px-4 py-6 text-center text-ink-3">{d.emptyNeedFunding}</td></tr>
                  ) : (
                    needFunding.map((nf) => (
                      <tr key={nf.id} className="hover:bg-surface-2 transition-colors">
                        <td className="px-4 py-3 font-medium text-ink">{nf.property.addressLine1}</td>
                        <td className="px-4 py-3 font-mono font-bold text-accent">{formatCurrency(nf.totalLoanAmountRequested)}</td>
                        <td className="px-4 py-3 text-[11px] uppercase tracking-wider text-ink-3">{nf.status}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
          
          <section>
            <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-ink-3">{d.loanApproved}</h2>
            <div className="overflow-x-auto rounded-xl border border-rule bg-surface shadow-sm">
              <table className="w-full text-left text-[14px]">
                <thead className="border-b border-rule bg-surface-2">
                  <tr>
                    <th className="px-4 py-3 font-bold text-ink-3">{d.tableHeaders?.property}</th>
                    <th className="px-4 py-3 font-bold text-ink-3">{d.tableHeaders?.lender}</th>
                    <th className="px-4 py-3 font-bold text-ink-3">{d.tableHeaders?.status}</th>
                  </tr>
                </thead>
                <tbody className="text-ink-2 divide-y divide-rule">
                  {loanApproved.length === 0 ? (
                    <tr><td colSpan={3} className="px-4 py-6 text-center text-ink-3">{d.emptyApproved}</td></tr>
                  ) : (
                    loanApproved.map((la) => (
                      <tr key={la.id} className="hover:bg-surface-2 transition-colors">
                        <td className="px-4 py-3">
                          <div className="font-medium text-ink">{la.property.addressLine1}</div>
                          <div className="text-[11px] text-ink-3 font-mono font-bold text-ink">{formatCurrency(la.currentTerms?.principalAmount)}</div>
                        </td>
                        <td className="px-4 py-3 text-sm">{la.lenderCompany?.companyName || d.lenderFallback}</td>
                        <td className="px-4 py-3">
                          <Link href={`/contracts/${la.id}/commitment`} className="inline-flex rounded-[4px] border border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700 hover:underline">
                            {d.reviewCommitment} &rarr;
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Current Loans & Completed Loans */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 mb-10">
          <section>
            <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-ink-3">{d.currentLoans}</h2>
            <div className="overflow-x-auto rounded-xl border border-rule bg-surface shadow-sm">
              <table className="w-full text-left text-[14px]">
                <thead className="border-b border-rule bg-surface-2">
                  <tr>
                    <th className="px-4 py-3 font-bold text-ink-3">{d.tableHeaders?.property}</th>
                    <th className="px-4 py-3 font-bold text-ink-3">{d.tableHeaders?.amount}</th>
                    <th className="px-4 py-3 font-bold text-ink-3">{d.tableHeaders?.date}</th>
                  </tr>
                </thead>
                <tbody className="text-ink-2 divide-y divide-rule">
                  {currentLoans.length === 0 ? (
                    <tr><td colSpan={3} className="px-4 py-6 text-center text-ink-3">{d.emptyActive}</td></tr>
                  ) : (
                    currentLoans.map((cl) => (
                      <tr key={cl.id} className="hover:bg-surface-2 transition-colors">
                        <td className="px-4 py-3">
                          <Link href={`/contracts/${cl.id}`} className="font-medium text-ink hover:underline">{cl.property.addressLine1}</Link>
                          <div className="text-[11px] text-ink-3">{cl.lenderCompany?.companyName || d.lenderFallback}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-bold text-ink font-mono">{formatCurrency(cl.currentPrincipalBalance || cl.currentTerms?.principalAmount)}</div>
                          <div className="text-[11px] text-accent font-bold">{Number(cl.currentTerms?.interestRate || 0)}%</div>
                        </td>
                        <td className="px-4 py-3 text-sm">{formatDate(cl.nextPaymentDueDate)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-ink-3">{d.completedLoans}</h2>
            <div className="rounded-xl border border-rule bg-surface p-2 shadow-sm overflow-hidden">
              {completedLoans.length === 0 ? (
                <div className="p-6 text-center text-ink-3 text-sm">{d.emptyCompleted}</div>
              ) : (
                completedLoans.map(loan => (
                  <div key={loan.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-surface-2 rounded-lg border border-rule gap-4 mb-2 last:mb-0">
                    <div>
                      <div className="text-sm font-bold text-ink">{loan.property.addressLine1}</div>
                      <div className="text-xs text-ink-3">{d.paidOff} {formatDate(loan.paidOffAt)} | {loan.lenderCompany?.companyName || d.lenderFallback}</div>
                    </div>
                    <button 
                      onClick={() => { setSelectedLender(loan.lenderCompany?.companyName || ""); setIsRateModalOpen(true); }}
                      className="shrink-0 text-xs font-bold bg-ink text-bg px-4 py-2 rounded-lg hover:opacity-90"
                    >
                      {t.rateLender?.title || "Calificar"}
                    </button>
                  </div>
                ))
              )}
            </div>
          </section>
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