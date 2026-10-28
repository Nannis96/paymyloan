"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSite } from "@/app/components/layout/SiteShell";
import { ChevronLeft } from "lucide-react";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function ActiveLoanDetailView() {
  const params = useParams();
  const router = useRouter();
  const { lang } = useSite();
  const isEs = lang === "es";

  const [contract, setContract] = useState<any>(null);
  const [schedule, setSchedule] = useState<any[]>([]);
  const [balance, setBalance] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLoanDetails() {
      if (!params?.id) return;
      try {
        const token = localStorage.getItem("accessToken") || "";
        const headers = { Authorization: `Bearer ${token}` };

        // Llamadas simultaneas a los 3 endpoints de lectura del contrato
        const [contractRes, scheduleRes, balanceRes] = await Promise.all([
          fetch(`${BASE_URL}/api/contracts/${params.id}`, { headers }),
          fetch(`${BASE_URL}/api/contracts/${params.id}/schedule`, { headers }),
          fetch(`${BASE_URL}/api/contracts/${params.id}/balance`, { headers })
        ]);

        const contractJson = await contractRes.json();
        const scheduleJson = await scheduleRes.json();
        const balanceJson = await balanceRes.json();

        if (contractJson.success) {
          setContract(contractJson.data);
          if (scheduleJson.success) setSchedule(scheduleJson.data || []);
          if (balanceJson.success) setBalance(balanceJson.data);
        } else {
          setError(contractJson.error?.message || (isEs ? "Error al cargar el contrato" : "Failed to load contract"));
        }
      } catch (err) {
        setError(isEs ? "Error de red" : "Network error");
      } finally {
        setIsLoading(false);
      }
    }
    fetchLoanDetails();
  }, [params?.id, isEs]);

  const formatCurrency = (val: number | string | null | undefined) => {
    if (val == null) return "$0.00";
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Number(val));
  };

  const formatDate = (dateStr: string | null | undefined) => {
    if (!dateStr) return "N/D";
    const cleanDate = dateStr.includes('T') ? dateStr.split('T')[0] : dateStr;
    const d = new Date(`${cleanDate}T00:00:00`);
    return d.toLocaleDateString(isEs ? "es-MX" : "en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const getStatusStyle = (status: string) => {
    const s = status?.toLowerCase() || '';
    if (s === 'paid' || s === 'succeeded') return "bg-success-soft text-success";
    if (s === 'late' || s === 'delinquent') return "bg-crit-soft text-crit";
    if (s === 'pending') return "bg-accent-soft text-accent";
    return "bg-surface-2 text-ink-3";
  };

  if (isLoading) {
    return <div className="p-10 text-center text-sm text-ink-3">{isEs ? "Cargando detalles del prestamo..." : "Loading loan details..."}</div>;
  }

  if (error || !contract) {
    return <div className="p-10 text-center text-sm text-crit">{error || "Contrato no encontrado"}</div>;
  }

  const terms = contract.currentTerms || {};
  const property = contract.property || {};
  const primaryBorrower = contract.borrowers?.find((b: any) => b.isPrimary)?.borrowerProfile?.user?.name || (isEs ? "Prestatario" : "Borrower");
  
  // Utilizar el balance calculado por el backend si existe, o el original del contrato
  const currentPrincipal = balance?.principalBalance || terms.principalAmount;

  return (
    <div className="animate-in fade-in duration-300">
      <Link
        href="/lenderDashboard/active-loans"
        className="mb-6 inline-flex items-center gap-2 rounded-md border border-rule bg-surface px-3 py-1.5 text-[13px] font-semibold text-ink-2 transition-colors hover:border-ink-3 hover:text-ink no-underline"
      >
        <ChevronLeft size={16} />
        {isEs ? "Volver a prestamos activos" : "Back to active loans"}
      </Link>
      
      <div className="mb-2 flex flex-col sm:flex-row sm:items-start justify-between">
        <div>
          <h1 className="text-[24px] font-black tracking-tight text-ink">{property.addressLine1}</h1>
          <p className="text-[14px] text-ink-3">{property.city}, {property.state} {property.postalCode} • REF: {contract.contractNumber}</p>
        </div>
        <div className="mt-2 sm:mt-0">
          <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-bold uppercase tracking-wider ${contract.status === 'ACTIVE' ? 'bg-success-soft text-success' : contract.status === 'DELINQUENT' ? 'bg-crit-soft text-crit' : 'bg-surface-2 text-ink-3'}`}>
            {contract.status}
          </span>
        </div>
      </div>

      <p className="mb-8 text-sm font-semibold text-ink-2">
        {isEs ? "Prestatario:" : "Borrower:"} <span className="text-ink">{primaryBorrower}</span>
      </p>

      {/* Tarjetas de Resumen */}
      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-rule bg-surface p-4 shadow-sm">
          <div className="mb-1 text-[11px] font-bold uppercase tracking-widest text-ink-3">{isEs ? "Capital Restante" : "Principal Balance"}</div>
          <div className="text-[20px] font-extrabold text-ink">{formatCurrency(currentPrincipal)}</div>
        </div>
        <div className="rounded-xl border border-rule bg-surface p-4 shadow-sm">
          <div className="mb-1 text-[11px] font-bold uppercase tracking-widest text-ink-3">{isEs ? "Pago Mensual" : "Monthly Payment"}</div>
          <div className="text-[20px] font-extrabold text-accent">{formatCurrency(terms.calculatedMonthlyPayment)}</div>
          <div className="text-[10px] text-ink-3">{terms.interestRate}% {isEs ? "Interes" : "Interest"}</div>
        </div>
        <div className="rounded-xl border border-rule bg-surface p-4 shadow-sm">
          <div className="mb-1 text-[11px] font-bold uppercase tracking-widest text-ink-3">{isEs ? "Proximo Vencimiento" : "Next Payment Due"}</div>
          <div className="text-[20px] font-extrabold text-ink">{formatDate(balance?.nextPaymentDueDate || contract.nextPaymentDueDate)}</div>
        </div>
        <div className="rounded-xl border border-rule bg-surface p-4 shadow-sm">
          <div className="mb-1 text-[11px] font-bold uppercase tracking-widest text-ink-3">{isEs ? "Vencimiento Final" : "Maturity Date"}</div>
          <div className="text-[20px] font-extrabold text-amber">{formatDate(terms.maturityDate)}</div>
        </div>
      </div>

      {/* Historial de Pagos */}
      <div className="overflow-hidden rounded-xl border border-rule bg-surface shadow-sm">
        <div className="border-b border-rule bg-surface-2 p-4">
          <h2 className="text-[15px] font-bold text-ink">{isEs ? "Calendario de Pagos" : "Payment Schedule"}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse text-left">
            <thead>
              <tr className="border-b border-rule">
                <th className="p-4 text-[11px] font-bold uppercase tracking-widest text-ink-3">#</th>
                <th className="p-4 text-[11px] font-bold uppercase tracking-widest text-ink-3">{isEs ? "Fecha Venc." : "Due Date"}</th>
                <th className="p-4 text-[11px] font-bold uppercase tracking-widest text-ink-3">{isEs ? "Monto" : "Amount"}</th>
                <th className="p-4 text-[11px] font-bold uppercase tracking-widest text-ink-3">{isEs ? "Pagado" : "Paid"}</th>
                <th className="p-4 text-[11px] font-bold uppercase tracking-widest text-ink-3">{isEs ? "Estado" : "Status"}</th>
              </tr>
            </thead>
            <tbody>
              {schedule.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-sm text-ink-3">
                    {isEs ? "No hay calendario disponible." : "No schedule available."}
                  </td>
                </tr>
              ) : (
                schedule.map((row: any) => (
                  <tr key={row.id} className="border-b border-rule transition-colors hover:bg-surface-2 last:border-0">
                    <td className="p-4 text-[13px] font-semibold text-ink-2">{row.sequenceNumber}</td>
                    <td className="p-4 text-[13px] text-ink-2">{formatDate(row.dueDate)}</td>
                    <td className="p-4 text-[13px] font-bold text-ink">{formatCurrency(row.totalDue)}</td>
                    <td className="p-4 text-[13px] text-ink-2">{formatCurrency(row.amountPaid)}</td>
                    <td className="p-4">
                      <span className={`inline-block rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${getStatusStyle(row.status)}`}>
                        {row.status}
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