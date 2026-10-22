"use client";

import { API_ROUTES } from "@/app/lib/endpoints";
import { apiFetch, cerrarSesion } from "@/app/lib/apiFetch";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useSite } from "@/app/components/layout/SiteShell";
import DocumentVault from "@/app/components/ambos/DocumentVault";


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
    maturityDate?: string;
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

  // Modal Cancelacion
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [isCanceling, setIsCanceling] = useState(false);

  useEffect(() => {
    async function fetchContractDetails() {
      if (!contractId) return;

      try {
        // Obtenemos los detalles del contrato
        const contractRes = await apiFetch(API_ROUTES.contracts.byId(contractId));
        
        if (!contractRes.ok) {
          if (contractRes.status === 401 || contractRes.status === 403) {
            cerrarSesion();
            return;
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
          const scheduleRes = await apiFetch(API_ROUTES.contracts.schedule(contractId));
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
      case 'late': return 'text-red-600 font-black flex items-center gap-1 bg-red-100 px-2 py-0.5 rounded';
      case 'partially_paid': return 'text-blue-500';
      default: return 'text-ink';
    }
  };

  const handleConfirmCancel = async () => {
    if (!cancelReason.trim()) {
      alert(lang === "es" ? "Por favor ingresa un motivo." : "Please enter a reason.");
      return;
    }
    setIsCanceling(true);
    try {
      const token = localStorage.getItem("accessToken") || "";
      const res = await fetch(API_ROUTES.contracts.byId(contractId) + "/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ reason: cancelReason })
      });
      const json = await res.json();
      if (json.success) {
        alert(lang === "es" ? "Contrato cancelado exitosamente." : "Contract canceled successfully.");
        setContract(prev => prev ? { ...prev, status: "CANCELLED" } : null);
        setIsCancelModalOpen(false);
        setCancelReason("");
      } else {
        alert(json.error?.message || (lang === "es" ? "Error al cancelar" : "Error canceling contract"));
      }
    } catch (err) {
      alert(lang === "es" ? "Error de red" : "Network error");
    } finally {
      setIsCanceling(false);
    }
  };

  // Determina si el contrato esta activo y vence en <= 60 dias
  const isWithin60Days = () => {
  if (contract?.status !== "ACTIVE" && contract?.status !== "DELINQUENT") return false;
  if (!contract?.currentTerms?.maturityDate) return false;

  const maturity = new Date(contract.currentTerms.maturityDate);
  const today = new Date();
  const diffTime = maturity.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays <= 60;
  };

  const isLatePayment = () => {
  return ["DELINQUENT", "RETURNED_PAYMENT", "LATE"].includes(contract?.status || "");
  };


  // Logica de paginacion local (el backend podria paginar en un futuro)
  const totalPages = Math.max(1, Math.ceil(payments.length / itemsPerPage));
  const currentPayments = payments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleMarkAsPaid = async (payment: PaymentData) => {
    const confirmMsg = lang === "es" ? `¿Registrar pago por ${formatCurrency(payment.totalDue)}?` : `Log payment for ${formatCurrency(payment.totalDue)}?`;
    if (!window.confirm(confirmMsg)) return;

    try {
      const token = localStorage.getItem("accessToken") || "";
      const res = await fetch(`${API_ROUTES.contracts.byId(contractId)}/payments/manual`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          amount: Number(payment.totalDue),
          method: "MANUAL",
          occurredAt: new Date().toISOString()
        })
      });
      
      const json = await res.json();
      if (json.success) {
        alert(lang === "es" ? "Pago registrado exitosamente" : "Payment registered successfully");
        // Refrescamos el estado localmente para reflejar el cambio sin recargar la página
        setPayments(prev => prev.map(p => p.id === payment.id ? { ...p, status: "PAID" } : p));
      } else {
        alert(json.error?.message || (lang === "es" ? "Error al registrar el pago" : "Error registering payment"));
      }
    } catch (err) {
      console.error(err);
      alert(lang === "es" ? "Error de red" : "Network error");
    }
  };

  const handleExportCSV = () => {
    if (!payments || payments.length === 0) {
      alert(lang === "es" ? "No hay pagos para exportar." : "No payments to export.");
      return;
    }

    const headers = [
      "Sequence",
      "Due Date",
      "Status",
      "Total Due",
      "Principal",
      "Interest",
      "Remaining Balance"
    ];

    const csvRows = payments.map(p => {
      const cleanDate = p.dueDate ? p.dueDate.split('T')[0] : "N/D";
      return [
        p.sequenceNumber,
        cleanDate,
        p.status,
        Number(p.totalDue).toFixed(2),
        Number(p.principalDue).toFixed(2),
        Number(p.interestDue).toFixed(2),
        Number(p.projectedRemainingBalance).toFixed(2)
      ].join(",");
    });

    const csvContent = [headers.join(","), ...csvRows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = url;
    link.download = `CPA_Report_${contract?.contractNumber || contractId}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="flex p-10 items-center justify-center">
        <p className="text-ink-3">{cd.loading}</p>
      </div>
    );
  }

  if (error || !contract) {
    return (
      <div className="animate-in fade-in duration-300 flex flex-col items-center justify-center py-12">
        <p className="text-crit mb-4">{error || cd.errorNotFound}</p>
        <Link href="/lenderDashboard/contracts" className="text-accent font-bold">&larr; {cd.back}</Link>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-300">
      <div className="w-full">
        
        <Link
          href="/lenderDashboard/contracts"
          className="mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-ink-3 transition-colors hover:text-accent"
        >
          <span>&larr;</span> {cd.back}
        </Link>
        <header className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="text-[28px] font-[900] tracking-tight text-ink">{cd.title}: {contract.contractNumber}</h1>
            <p className="mt-[4px] text-[14px] text-ink-3">{cd.subtitle}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href={`/lenderDashboard/contracts/${contract.id}/issue-commitment`} className="inline-flex items-center justify-center rounded-lg border border-accent bg-accent-soft px-4 py-2 text-sm font-bold text-accent transition-colors hover:opacity-80">
              {t.issueCommitment.title}
            </Link>
            {/* Este boton lleva a la vista del PDF */}
            <Link href={`/lenderDashboard/contracts/${contract.id}/commitment-doc`} className="inline-flex items-center justify-center rounded-lg border border-accent bg-accent-soft px-4 py-2 text-sm font-bold text-accent transition-colors hover:opacity-80">
              {t.commitmentLetter.title}
            </Link>
            <Link href={`/lenderDashboard/contracts/${contract.id}/payoff`} className="inline-flex items-center justify-center rounded-lg bg-accent px-4 py-2 text-sm font-bold text-accent-ink transition-opacity hover:opacity-90">
              {t.dashboardBorrower.actions.payoff}
            </Link>

            <Link href={`/lenderDashboard/contracts/${contract.id}/draws`} className="inline-flex items-center justify-center rounded-lg border border-rule-strong bg-surface px-4 py-2 text-sm font-bold text-ink transition-colors hover:border-accent hover:text-accent shadow-sm">
              {t.dashboardBorrower.actions.drawRequest}
            </Link>

            {/* Boton dinamico para pagos atrasados (Siempre activo para testing DEV) */}
            <Link 
              href={`/lenderDashboard/contracts/${contract.id}/missed-payment`} 
              className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-bold shadow-sm transition-all bg-crit text-white hover:opacity-90"
            >
              {t.dashboardBorrower.actions.resolveLate}
            </Link>
            
            {["ACTIVE", "PENDING_ACCEPTANCE", "DELINQUENT"].includes(contract.status) && (
              <button 
                onClick={() => setIsCancelModalOpen(true)}
                className="inline-flex items-center justify-center rounded-lg border border-crit bg-crit-soft px-4 py-2 text-sm font-bold text-crit transition-colors hover:bg-crit hover:text-white shadow-sm cursor-pointer"
              >
                {lang === "es" ? "Cancelar Contrato" : "Cancel Contract"}
              </button>
            )}
          </div>
        </header>

        <div className="mb-8 flex flex-col justify-between gap-4 rounded-xl border p-5 md:flex-row md:items-center transition-colors border-amber/30 bg-amber-soft">
          <div>
            <h3 className="text-[15px] font-bold text-amber">
              {t.extensionRequest.maturityBanner.title.replace("{date}", formatDate(contract?.currentTerms?.maturityDate || ""))}
            </h3>
            <p className="mt-1 text-[13px] text-ink-2">
              {t.extensionRequest.maturityBanner.sub}
            </p>
          </div>
          <Link
            href={`/lenderDashboard/contracts/${contract.id}/extension-request`}
            className="shrink-0 whitespace-nowrap rounded-lg px-5 py-2.5 text-sm font-bold shadow-sm transition-all bg-amber text-white hover:opacity-90"
          >
            {t.dashboardBorrower.actions.extensionRequest}
          </Link>
        </div>

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
              onClick={handleExportCSV}
              className="inline-flex items-center justify-center rounded-lg border border-rule-strong bg-surface px-4 py-2 text-xs font-bold text-ink transition-colors hover:border-accent hover:text-accent shadow-sm cursor-pointer"
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
                  <th className="px-5 py-4 font-bold text-ink-3">{lang === "es" ? "Acción" : "Action"}</th>
                </tr>
              </thead>
              <tbody className="text-ink-2">
                {currentPayments.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-5 py-8 text-center text-ink-3">
                      {cd.emptyPayments}
                    </td>
                  </tr>
                ) : (
                  currentPayments.map((payment) => {
                    const isPayable = ["PENDING", "PARTIALLY_PAID", "LATE", "DELINQUENT"].includes((payment.status || "").toUpperCase());
                    return (
                      <tr key={payment.id} className="border-b border-rule hover:bg-surface-2 transition-colors">
                        <td className="px-5 py-4">{formatDate(payment.dueDate)}</td>
                        <td className={`px-5 py-4 font-bold uppercase text-[11px] tracking-wider ${getStatusStyle(payment.status)}`}>
                          {cd.paymentStatus[payment.status.toLowerCase() as keyof typeof cd.paymentStatus] || payment.status}
                        </td>
                        <td className="px-5 py-4 font-mono font-bold text-ink">{formatCurrency(payment.totalDue)}</td>
                        <td className="px-5 py-4 font-mono">{formatCurrency(payment.principalDue)}</td>
                        <td className="px-5 py-4 font-mono text-amber">{formatCurrency(payment.interestDue)}</td>
                        <td className="px-5 py-4 font-mono font-bold text-ink">{formatCurrency(payment.projectedRemainingBalance)}</td>
                        <td className="px-5 py-4">
                          {isPayable && (
                            <button 
                              onClick={() => handleMarkAsPaid(payment)}
                              className="rounded border border-rule bg-surface px-3 py-1.5 text-[11px] font-bold text-accent transition-colors hover:bg-accent-soft cursor-pointer"
                            >
                              {lang === "es" ? "Registrar Pago" : "Mark Paid"}
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })
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

      {/* Modal de Cancelación */}
      {isCancelModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-[400px] rounded-2xl bg-surface p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">
            <h3 className="mb-2 text-lg font-black tracking-tight text-ink">
              {lang === "es" ? "¿Cancelar contrato?" : "Cancel contract?"}
            </h3>
            <p className="mb-4 text-sm text-ink-3">
              {lang === "es" 
                ? "Esta acción detendrá el contrato y los pagos futuros, pero mantendrá el historial. Requiere un motivo para auditoría." 
                : "This action stops the contract and future payments, but keeps the history. Requires a reason for audit."}
            </p>
            <textarea
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              placeholder={lang === "es" ? "Motivo de cancelación..." : "Reason for cancellation..."}
              className="mb-4 h-[80px] w-full resize-none rounded-md border border-rule px-3 py-2 text-[13px] text-ink outline-none transition-colors focus:border-crit"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsCancelModalOpen(false)}
                disabled={isCanceling}
                className="cursor-pointer rounded-md border border-rule bg-surface px-4 py-2 text-sm font-semibold text-ink-2 transition-colors hover:bg-surface-2"
              >
                {lang === "es" ? "Cerrar" : "Close"}
              </button>
              <button
                onClick={handleConfirmCancel}
                disabled={isCanceling || !cancelReason.trim()}
                className="cursor-pointer rounded-md bg-crit px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-red-700 disabled:opacity-50"
              >
                {isCanceling ? (lang === "es" ? "Cancelando..." : "Canceling...") : (lang === "es" ? "Confirmar Cancelación" : "Confirm Cancellation")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ContractDetailPage() {
  return <ContractDetailContent />;
}