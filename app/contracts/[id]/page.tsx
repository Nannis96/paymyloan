"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import DocumentVault from "@/app/components/DocumentVault";

// URL base de la API. Toma la variable de entorno o usa localhost:4000 por defecto
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

// Interfaces basadas en la respuesta del backend
interface ContractData {
  id: string;
  contractNumber: string;
  status: string;
  property: {
    addressLine1: string;
    city: string;
    state: string;
  };
  currentTerms?: {
    principalAmount: number | string;
    interestRate: number | string;
    amortizationTermMonths: number;
    structure: string;
    calculatedMonthlyPayment: number | string | null;
  };
}

interface PaymentData {
  id: string;
  sequenceNumber: number;
  dueDate: string;
  status: string;
  totalDue: number | string;
  principalDue: number | string;
  interestDue: number | string;
  projectedRemainingBalance: number | string;
}

function ContractDetailContent() {
  const params = useParams();
  const contractId = params?.id as string;
  
  const { t, lang } = useSite();
  const cd = t.contractDetail;

  const [contract, setContract] = useState<ContractData | null>(null);
  const [payments, setPayments] = useState<PaymentData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Paginacion
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    async function fetchContractDetails() {
      if (!contractId) return;

      try {
        const token = localStorage.getItem("accessToken") || "";
        const headers = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        };

        // Obtenemos los detalles del contrato
        const contractRes = await fetch(`${API_URL}/api/contracts/${contractId}`, { headers });
        
        if (!contractRes.ok) {
          if (contractRes.status === 401 || contractRes.status === 403) {
            throw new Error(cd.errorAuth);
          }
          throw new Error(`HTTP ${contractRes.status}: ${cd.errorFetch}`);
        }
        
        const contractJson = await contractRes.json();
        if (contractJson.success) {
          setContract(contractJson.data);
        } else {
          throw new Error(contractJson.error?.message || cd.errorFetch);
        }

        // Intentamos cargar el calendario de pagos (schedule) si el endpoint existe
        try {
          const scheduleRes = await fetch(`${API_URL}/api/contracts/${contractId}/schedule`, { headers });
          if (scheduleRes.ok) {
            const scheduleJson = await scheduleRes.json();
            if (scheduleJson.success && Array.isArray(scheduleJson.data)) {
              setPayments(scheduleJson.data);
            }
          }
        } catch (scheduleErr) {
          console.error("No se pudo cargar el historial de pagos", scheduleErr);
        }

      } catch (err) {
        setError(err instanceof Error ? err.message : cd.errorNetwork);
      } finally {
        setIsLoading(false);
      }
    }

    fetchContractDetails();
  }, [contractId, cd.errorAuth, cd.errorFetch, cd.errorNetwork]);

  // Formateadores
  const formatCurrency = (amount: number | string | null | undefined) => {
    if (amount == null) return "N/D";
    return Number(amount).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/D";
    return new Date(dateString).toLocaleDateString(lang === "es" ? "es-MX" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "UTC"
    });
  };

  const getStatusStyle = (status: string) => {
    switch(status?.toLowerCase()) {
      case 'paid': return 'text-green-600 dark:text-green-400';
      case 'pending': return 'text-amber';
      case 'late': return 'text-red-500';
      case 'partially_paid': return 'text-blue-500';
      default: return 'text-ink';
    }
  };

  // Logica de paginacion local (el backend podria paginar en un futuro)
  const totalPages = Math.max(1, Math.ceil(payments.length / itemsPerPage));
  const currentPayments = payments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg p-6 lg:p-14 flex items-center justify-center">
        <p className="text-ink-3">{cd.loading}</p>
      </div>
    );
  }

  if (error || !contract) {
    return (
      <div className="min-h-screen bg-bg p-6 lg:p-14 flex flex-col items-center justify-center">
        <p className="text-crit mb-4">{error || cd.errorNotFound}</p>
        <Link href="/contracts" className="text-accent font-bold">&larr; {cd.back}</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg p-6 lg:p-14">
      <div className="mx-auto max-w-[1100px]">
        
        <Link
          href="/contracts"
          className="mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-ink-3 transition-colors hover:text-accent"
        >
          <span>&larr;</span> {cd.back}
        </Link>

        <header className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="text-[32px] font-black tracking-tight text-ink">{cd.title}: {contract.contractNumber}</h1>
            <p className="text-ink-2">{cd.subtitle}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href={`/contracts/${contract.id}/issue-commitment`} className="inline-flex items-center justify-center rounded-lg border border-accent bg-accent-soft px-4 py-2 text-sm font-bold text-accent transition-colors hover:opacity-80">
              {t.issueCommitment.title}
            </Link>
            <Link href={`/contracts/${contract.id}/commitment`} className="inline-flex items-center justify-center rounded-lg border border-accent bg-accent-soft px-4 py-2 text-sm font-bold text-accent transition-colors hover:opacity-80">
              {t.commitmentLetter.title}
            </Link>
            <Link href={`/contracts/${contract.id}/payoff`} className="inline-flex items-center justify-center rounded-lg bg-accent px-4 py-2 text-sm font-bold text-accent-ink transition-opacity hover:opacity-90">
              {t.dashboardBorrower.actions.payoff}
            </Link>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Box Partes Involucradas */}
          <div className="rounded-xl border border-rule bg-surface p-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-accent mb-4">{cd.parties}</h2>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between border-b border-rule pb-2">
                <span className="text-ink-3">{cd.labels.lender}</span>
                <span className="font-bold text-ink">{cd.lenderFallback}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-ink-3">{cd.labels.borrower}</span>
                <span className="font-bold text-ink">{cd.borrowerFallback}</span>
              </div>
            </div>
          </div>

          {/* Box Terminos Financieros */}
          <div className="rounded-xl border border-rule bg-surface p-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-accent mb-4">{cd.financials}</h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              <div>
                <div className="text-ink-3 mb-1">{cd.labels.amount}</div>
                <div className="font-bold text-ink">
                  {formatCurrency(contract.currentTerms?.principalAmount)}
                </div>
              </div>
              <div>
                <div className="text-ink-3 mb-1">{cd.labels.term}</div>
                <div className="font-bold text-ink">
                  {contract.currentTerms?.amortizationTermMonths ? `${contract.currentTerms.amortizationTermMonths} ${cd.months}` : "N/D"}
                </div>
              </div>
              <div>
                <div className="text-ink-3 mb-1">{cd.labels.interest}</div>
                <div className="font-bold text-ink">
                  {contract.currentTerms?.interestRate ? `${Number(contract.currentTerms.interestRate)}%` : "N/D"}
                </div>
              </div>
              <div>
                <div className="text-ink-3 mb-1">{cd.labels.rent}</div>
                <div className="font-bold text-accent">
                  {formatCurrency(contract.currentTerms?.calculatedMonthlyPayment)}
                </div>
              </div>
              <div className="col-span-2 mt-1 border-t border-rule pt-3">
                <div className="text-ink-3 mb-1">{cd.labels.loanType}</div>
                <div className="font-bold text-ink capitalize">
                  {contract.currentTerms?.structure?.replace(/_/g, " ") || cd.noTerms}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Boveda de Documentos */}
        <DocumentVault contractId={contract.id} />

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-widest text-ink-3">{cd.breakdownTitle}</h2>
            <button 
              onClick={() => alert(cd.generateReportAlert)}
              className="inline-flex items-center justify-center rounded-lg border border-rule-strong bg-surface px-4 py-2 text-xs font-bold text-ink transition-colors hover:border-accent hover:text-accent shadow-sm"
            >
              {cd.exportReport} &darr;
            </button>
          </div>

          <div className="overflow-x-auto rounded-t-xl border border-rule bg-surface">
            <table className="w-full min-w-[800px] border-collapse text-left text-[14px]">
              <thead className="border-b border-rule bg-surface-2">
                <tr>
                  <th className="px-5 py-4 font-bold text-ink-3">{cd.table.date}</th>
                  <th className="px-5 py-4 font-bold text-ink-3">{cd.table.status}</th>
                  <th className="px-5 py-4 font-bold text-ink-3">{cd.table.totalOwed}</th>
                  <th className="px-5 py-4 font-bold text-ink-3">{cd.table.principal}</th>
                  <th className="px-5 py-4 font-bold text-ink-3">{cd.table.interest}</th>
                  <th className="px-5 py-4 font-bold text-ink-3">{cd.table.balance}</th>
                </tr>
              </thead>
              <tbody className="text-ink-2">
                {currentPayments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-8 text-center text-ink-3">
                      {cd.emptyPayments}
                    </td>
                  </tr>
                ) : (
                  currentPayments.map((payment) => (
                    <tr key={payment.id} className="border-b border-rule hover:bg-surface-2 transition-colors">
                      <td className="px-5 py-4">{formatDate(payment.dueDate)}</td>
                      <td className={`px-5 py-4 font-bold uppercase text-[11px] tracking-wider ${getStatusStyle(payment.status)}`}>
                        {cd.paymentStatus[payment.status.toLowerCase() as keyof typeof cd.paymentStatus] || payment.status}
                      </td>
                      <td className="px-5 py-4 font-mono font-bold text-ink">{formatCurrency(payment.totalDue)}</td>
                      <td className="px-5 py-4 font-mono">{formatCurrency(payment.principalDue)}</td>
                      <td className="px-5 py-4 font-mono text-amber">{formatCurrency(payment.interestDue)}</td>
                      <td className="px-5 py-4 font-mono font-bold text-ink">{formatCurrency(payment.projectedRemainingBalance)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          {/* Paginacion */}
          {payments.length > 0 && (
            <div className="flex items-center justify-between border-x border-b border-rule bg-surface-2 p-4 rounded-b-xl">
              <span className="text-sm text-ink-3">
                {cd.pagination.page} {currentPage} {cd.pagination.of} {totalPages}
              </span>
              <div className="flex gap-2">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="rounded border border-rule bg-surface px-3 py-1.5 text-xs font-bold text-ink transition-colors hover:bg-surface-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {cd.pagination.prev}
                </button>
                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="rounded border border-rule bg-surface px-3 py-1.5 text-xs font-bold text-ink transition-colors hover:bg-surface-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {cd.pagination.next}
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default function ContractDetailPage() {
  return (
    <SiteShell isDashboard={true}>
      <ContractDetailContent />
    </SiteShell>
  );
}