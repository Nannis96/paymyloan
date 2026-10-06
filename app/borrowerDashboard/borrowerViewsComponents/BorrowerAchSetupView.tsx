"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useSite } from "@/app/components/layout/SiteShell";
import { API_ROUTES } from "@/app/lib/endpoints";

export default function BorrowerAchSetupView() {
  const params = useParams();
  const contractId = params?.id as string;
  const router = useRouter();
  const { lang } = useSite();
  const isEs = lang === "es";

  const [contract, setContract] = useState<any>(null);
  const [schedule, setSchedule] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isBankConnected, setIsBankConnected] = useState(false);
  const [authAgreed, setAuthAgreed] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Fetch contract details and schedule based on API_REFERENCE.md
    async function fetchData() {
      if (!contractId) {
        setIsLoading(false);
        return;
      }
      try {
        const token = localStorage.getItem("accessToken") || "";
        const headers = { Authorization: `Bearer ${token}` };

        const [contractRes, scheduleRes] = await Promise.all([
          fetch(API_ROUTES.contracts.byId(contractId), { headers }),
          fetch(API_ROUTES.contracts.schedule(contractId), { headers })
        ]);

        if (contractRes.ok) {
          const cJson = await contractRes.json();
          if (cJson.success) setContract(cJson.data);
        }

        if (scheduleRes.ok) {
          const sJson = await scheduleRes.json();
          if (sJson.success && Array.isArray(sJson.data)) {
            setSchedule(sJson.data);
          }
        }
      } catch (error) {
        console.error("Error fetching ACH setup data", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [contractId]);

  const handleConnectPlaid = () => {
    // Simula la conexion de Plaid
    setIsBankConnected(true);
  };

  const handleAuthorize = () => {
    if (!authAgreed) return;
    setIsSubmitting(true);
    // Simula el POST a un endpoint de ACH
    setTimeout(() => {
      alert(isEs ? "Pagos automaticos configurados con exito." : "Automatic payments configured successfully.");
      router.push("/borrowerDashboard");
    }, 1500);
  };

  const formatCurrency = (val: number | string) => {
    return Number(val || 0).toLocaleString("en-US", { style: "currency", currency: "USD" });
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString(isEs ? "es-MX" : "en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
  };

  // Mock data fallback if API returns nothing (for UI demonstration based on HTML)
  const principal = contract?.currentTerms?.principalAmount || 115000;
  const rate = contract?.currentTerms?.interestRate || 12;
  const term = contract?.currentTerms?.amortizationTermMonths || 12;
  const monthlyPayment = contract?.currentTerms?.calculatedMonthlyPayment || 1150.00;
  
  const mockSchedule = [
    { id: 1, dueDate: "2026-10-01", principalBalance: 115000, totalDue: 1437.50, notes: isEs ? "Stub + mes 1" : "Stub + month 1" },
    { id: 2, dueDate: "2026-11-01", principalBalance: 115000, totalDue: 1150.00, notes: "" },
    { id: 3, dueDate: "2026-12-01", principalBalance: 115000, totalDue: 1150.00, notes: "" },
    { id: 4, dueDate: "2027-01-01", principalBalance: 135000, totalDue: 1683.33, isDraw: true, notes: "Draw +$20K" },
    { id: 5, dueDate: "2027-02-01", principalBalance: 135000, totalDue: 1350.00, notes: "" }
  ];

  const displaySchedule = schedule.length > 0 ? schedule : mockSchedule;

  if (isLoading) {
    return <div className="p-10 text-center text-[13px] text-ink-3">{isEs ? "Cargando..." : "Loading..."}</div>;
  }

  return (
    <div className="mx-auto max-w-[900px] animate-in fade-in duration-300">
      
      <Link href="/borrowerDashboard" className="mb-[20px] inline-flex items-center gap-[8px] text-[12px] font-[700] uppercase tracking-wide text-ink-3 transition-colors hover:text-accent">
        <span>&larr;</span> {isEs ? "Volver al dashboard" : "Back to dashboard"}
      </Link>

      <div className="mb-[6px] text-[11px] font-[700] uppercase tracking-[0.5px] text-accent">
        {isEs ? "Paso de cierre 4 de 5" : "Closing Step 4 of 5"}
      </div>
      <div className="mb-[6px] text-[28px] font-[900] text-ink">
        {isEs ? "Configurar pagos automáticos" : "Set up automatic payments"}
      </div>
      <div className="mb-[40px] text-[14px] leading-[1.6] text-ink-3">
        {isEs 
          ? "Tu prestamista aceptó los términos. Ahora autoriza el ACH para que los pagos se realicen automáticamente cada mes — sin transferencias manuales ni pagos olvidados." 
          : "Your lender agreed to the terms. Now authorize ACH so payments run automatically each month — no manual transfers, no missed payments."}
      </div>

      {/* STEP 1: CONNECT BANK */}
      <div className="mb-[24px] rounded-[12px] border border-rule bg-surface p-[32px] shadow-sm">
        <div className="mb-[10px] inline-block rounded-[12px] bg-accent px-[10px] py-[3px] text-[11px] font-[800] text-accent-ink">
          {isEs ? "Paso 1 — Conecta tu banco" : "Step 1 — Connect your bank"}
        </div>
        <div className="mb-[4px] text-[17px] font-[800] text-ink">
          {isEs ? "Conecta la cuenta de donde se debitarán los pagos" : "Connect the account payments will pull from"}
        </div>
        <div className="mb-[24px] text-[13px] text-ink-3">
          {isEs 
            ? "Usamos Plaid para verificación bancaria instantánea — toma unos 60 segundos. PML nunca guarda tus credenciales." 
            : "We use Plaid for instant bank verification — takes about 60 seconds. Your credentials are never stored by PML."}
        </div>

        {isBankConnected ? (
          <div className="mb-[20px] flex items-center gap-[14px] rounded-[10px] border-[1.5px] border-success/30 bg-success-soft p-[16px_20px]">
            <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[8px] bg-success text-[16px] font-[900] text-white">
              B
            </div>
            <div>
              <h4 className="mb-[2px] text-[13px] font-[800] text-ink">Bank of America — Checking</h4>
              <p className="text-[12px] text-success">{isEs ? "Cuenta terminada en 4821 · Verificada vía Plaid" : "Account ending in 4821 · Verified via Plaid"}</p>
            </div>
            <span className="ml-auto cursor-pointer text-[12px] font-[600] text-ink-3 hover:text-ink" onClick={() => setIsBankConnected(false)}>
              {isEs ? "Cambiar" : "Change"}
            </span>
          </div>
        ) : (
          <div className="mb-[20px]">
            <div onClick={handleConnectPlaid} className="mb-[12px] flex w-full cursor-pointer items-center gap-[16px] rounded-[10px] border-[1.5px] border-rule bg-surface p-[16px_20px] transition-colors hover:border-accent">
              <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[8px] bg-[#00a67e] text-[18px] font-[900] text-white">
                P
              </div>
              <div>
                <h4 className="mb-[2px] text-[13px] font-[800] text-ink">{isEs ? "Conectar con Plaid — instantáneo" : "Connect with Plaid — instant"}</h4>
                <p className="text-[12px] text-ink-3">{isEs ? "Busca tu banco e inicia sesión seguro. Toma 60 segundos." : "Search your bank and log in securely. Takes 60 seconds."}</p>
              </div>
            </div>
            <div className="my-[16px] flex items-center gap-[12px]">
              <div className="flex-1 h-[1px] bg-rule"></div>
              <div className="text-[12px] font-[600] text-ink-3">{isEs ? "o" : "or"}</div>
              <div className="flex-1 h-[1px] bg-rule"></div>
            </div>
            <div className="cursor-pointer text-center text-[12px] font-[600] text-accent hover:underline">
              {isEs ? "Ingresar número de ruta y cuenta manualmente" : "Enter routing and account number manually"}
            </div>
          </div>
        )}

        <div className="mt-[8px] flex items-center gap-[8px] text-[11px] text-ink-3">
          <div className="h-[8px] w-[8px] rounded-full bg-accent"></div>
          {isEs ? "Pagos procesados de forma segura por Stripe · Encriptación nivel bancario" : "Payments processed securely by Stripe · Bank-level encryption"}
        </div>
      </div>

      {/* STEP 2: PAYMENT SUMMARY */}
      <div className="mb-[24px] rounded-[12px] border border-rule bg-surface p-[32px] shadow-sm">
        <div className="mb-[10px] inline-block rounded-[12px] bg-accent px-[10px] py-[3px] text-[11px] font-[800] text-accent-ink">
          {isEs ? "Paso 2 — Revisa tu calendario de pagos" : "Step 2 — Review your payment schedule"}
        </div>
        <div className="mb-[4px] text-[17px] font-[800] text-ink">
          {isEs ? "Esto es exactamente qué se cobrará y cuándo" : "Here's exactly what gets pulled and when"}
        </div>
        <div className="mb-[24px] text-[13px] text-ink-3">
          {isEs ? "Pagos de solo interés. Tu saldo de capital debe pagarse en su totalidad al vencimiento." : "Interest only payments. Your principal balance is due in full at maturity."}
        </div>

        <div className="mb-[20px] rounded-[10px] border border-rule bg-surface-2 p-[20px_24px]">
          <div className="mb-[14px] text-[13px] font-[800] text-ink">
            {isEs ? "Resumen del préstamo" : "Loan summary"} — {contract?.property?.addressLine1 || "3802 University Cove"}
          </div>
          <div className="flex justify-between border-b border-rule py-[6px] text-[13px]">
            <span className="text-ink-2">{isEs ? "Capital" : "Principal"}</span>
            <span className="font-[700] text-ink">{formatCurrency(principal)}</span>
          </div>
          <div className="flex justify-between border-b border-rule py-[6px] text-[13px]">
            <span className="text-ink-2">{isEs ? "Tasa anual" : "Annual rate"}</span>
            <span className="font-[700] text-ink">{rate}%</span>
          </div>
          <div className="flex justify-between border-b border-rule py-[6px] text-[13px]">
            <span className="text-ink-2">{isEs ? "Plazo" : "Term"}</span>
            <span className="font-[700] text-ink">{term} {isEs ? "meses" : "months"}</span>
          </div>
          <div className="flex justify-between py-[6px] text-[13px] font-[800] text-accent">
            <span className="">{isEs ? "Pago mensual (IO)" : "Monthly IO payment"}</span>
            <span className="">{formatCurrency(monthlyPayment)}</span>
          </div>
        </div>

        <div className="mb-[12px] text-[13px] font-[800] text-ink">{isEs ? "Calendario de pagos completo" : "Full payment schedule"}</div>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr>
                <th className="border-b-[2px] border-rule p-[10px_14px] text-[11px] font-[700] uppercase tracking-[0.4px] text-ink-3">#</th>
                <th className="border-b-[2px] border-rule p-[10px_14px] text-[11px] font-[700] uppercase tracking-[0.4px] text-ink-3">{isEs ? "Vencimiento" : "Due date"}</th>
                <th className="border-b-[2px] border-rule p-[10px_14px] text-[11px] font-[700] uppercase tracking-[0.4px] text-ink-3">{isEs ? "Saldo capital" : "Principal balance"}</th>
                <th className="border-b-[2px] border-rule p-[10px_14px] text-[11px] font-[700] uppercase tracking-[0.4px] text-ink-3">{isEs ? "Monto a pagar" : "Payment amount"}</th>
                <th className="border-b-[2px] border-rule p-[10px_14px] text-[11px] font-[700] uppercase tracking-[0.4px] text-ink-3">{isEs ? "Notas" : "Notes"}</th>
              </tr>
            </thead>
            <tbody>
              {displaySchedule.map((row: any, idx: number) => (
                <tr key={idx} className={`${idx === 0 ? "bg-accent-soft font-[700] text-ink" : "text-ink-2"}`}>
                  <td className="border-b border-surface-2 p-[10px_14px] text-[13px]">{idx + 1}</td>
                  <td className="border-b border-surface-2 p-[10px_14px] text-[13px]">{formatDate(row.dueDate)}</td>
                  <td className="border-b border-surface-2 p-[10px_14px] text-[13px]">{formatCurrency(row.principalBalance || principal)}</td>
                  <td className="border-b border-surface-2 p-[10px_14px] text-[13px]">{formatCurrency(row.totalDue || monthlyPayment)}</td>
                  <td className="border-b border-surface-2 p-[10px_14px] text-[13px]">
                    {row.notes && <span className="text-[11px] text-ink-3">{row.notes}</span>}
                    {row.isDraw && <span className="ml-[6px] rounded-[4px] bg-amber-soft px-[7px] py-[2px] text-[10px] font-[700] text-amber">Draw +$20K</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-[16px] rounded-[8px] border border-amber/30 bg-amber-soft p-[12px_16px] text-[12px] text-amber">
          <strong>{isEs ? "Retiro (Draw) mostrado por ilustración. " : "Draw shown for illustration. "}</strong>
          {isEs 
            ? "Si realizas un retiro, tu pago mensual se recalcula automáticamente. Recibirás un correo con el calendario actualizado el día que se confirme." 
            : "If you take a draw, your monthly payment recalculates automatically. You'll receive an email with your updated schedule the day the draw is confirmed."}
        </div>
      </div>

      {/* STEP 3: AUTHORIZATION */}
      <div className="mb-[24px] rounded-[12px] border border-rule bg-surface p-[32px] shadow-sm">
        <div className="mb-[10px] inline-block rounded-[12px] bg-accent px-[10px] py-[3px] text-[11px] font-[800] text-accent-ink">
          {isEs ? "Paso 3 — Autorizar débito ACH" : "Step 3 — Authorize ACH debit"}
        </div>
        <div className="mb-[14px] text-[17px] font-[800] text-ink">
          {isEs ? "Lee y autoriza el acuerdo de pagos" : "Read and authorize the payment agreement"}
        </div>

        <div className="mb-[24px] rounded-[10px] border-[1.5px] border-rule-strong bg-accent-soft p-[20px_24px]">
          <div className="mb-[10px] text-[13px] font-[800] text-accent">
            {isEs ? "Autorización de Débito ACH (Cumple con Nacha)" : "ACH Debit Authorization (Nacha-compliant)"}
          </div>
          <div className="text-[12px] leading-[1.8] text-ink-2">
            {isEs ? (
              <>
                Yo, <strong>Marcus Johnson</strong>, autorizo a PayMyLoan AI, LLC y a su procesador de pagos (Stripe) a iniciar débitos electrónicos recurrentes ACH desde mi cuenta bancaria en <strong>Bank of America</strong>, con terminación <strong>4821</strong>, en los montos y fechas mostradas en mi calendario de pagos.<br/><br/>
                Entiendo que:<br/>
                — Si realizo un retiro (draw), mi monto de pago se actualizará y seré notificado por correo antes del próximo cobro.<br/>
                — Si un pago es devuelto por fondos insuficientes, se podrá aplicar un cargo por NSF de $25.<br/>
                — Puedo cancelar esta autorización únicamente proporcionando notificación por escrito al menos 5 días hábiles antes del próximo débito programado.<br/><br/>
                Esta autorización permanece vigente hasta que mi préstamo sea pagado en su totalidad o se revoque por escrito.
              </>
            ) : (
              <>
                I, <strong>Marcus Johnson</strong>, authorize PayMyLoan AI, LLC and its payment processor (Stripe) to initiate recurring electronic ACH debit entries from my bank account at <strong>Bank of America</strong>, account ending in <strong>4821</strong>, in the amounts and on the dates shown in my payment schedule above.<br/><br/>
                I understand that:<br/>
                — If I take a draw, my payment amount will be updated and I will be notified by email before the next pull.<br/>
                — If a payment is returned for insufficient funds, a $25 NSF fee may be assessed.<br/>
                — I may cancel this authorization only by providing written notice at least 5 business days before the next scheduled debit.<br/><br/>
                This authorization remains in effect until my loan is paid in full or this agreement is revoked in writing.
              </>
            )}
          </div>
          <div className="mt-[14px] flex items-start gap-[12px]">
            <input 
              type="checkbox" 
              id="auth-agree" 
              className="mt-[1px] h-[16px] w-[16px] shrink-0 accent-accent cursor-pointer"
              checked={authAgreed}
              onChange={(e) => setAuthAgreed(e.target.checked)}
            />
            <label htmlFor="auth-agree" className="text-[12px] font-[600] leading-[1.6] text-ink cursor-pointer">
              {isEs 
                ? "He leído y acepto la Autorización de Débito ACH. Confirmo que la cuenta con terminación 4821 tiene fondos suficientes para los pagos programados." 
                : "I have read and agree to the ACH Debit Authorization above. I confirm the bank account ending in 4821 has sufficient funds for the scheduled payments."}
            </label>
          </div>
        </div>

        <button 
          onClick={handleAuthorize}
          disabled={!authAgreed || !isBankConnected || isSubmitting}
          className="w-full cursor-pointer rounded-[7px] border-none bg-accent p-[12px_28px] font-sans text-[14px] font-[800] text-accent-ink transition-colors hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting 
            ? (isEs ? "Procesando..." : "Processing...") 
            : (isEs ? "Autorizar pagos y proceder al cierre" : "Authorize payments and proceed to closing")}
        </button>
        <div className="mt-[12px] flex items-center justify-center gap-[8px] text-[11px] text-ink-3">
          <div className="h-[8px] w-[8px] rounded-full bg-accent"></div>
          {isEs ? "Autorización registrada con timestamp · Registro Nacha retenido por PayMyLoan" : "Authorization logged with timestamp · Nacha-compliant record retained by PayMyLoan"}
        </div>
      </div>

    </div>
  );
}