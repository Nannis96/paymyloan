"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function PayoffRequestPage() {
  return (
    <SiteShell isDashboard={true}>
      <PayoffRequestContent />
    </SiteShell>
  );
}

function PayoffRequestContent() {
  const params = useParams();
  const contractId = params?.id as string;
  const router = useRouter();
  const { t, lang } = useSite();
  const po = t.payoff;
  const cd = t.contractDetail;
  const isEs = lang === "es";

  // Estados
  const [contract, setContract] = useState<any>(null);
  const [balance, setBalance] = useState<any>(null);
  
  // Fecha esperada (por defecto hoy)
  const [expectedDate, setExpectedDate] = useState(() => {
    return new Date().toISOString().split('T')[0];
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Obtener datos del contrato y del balance
  useEffect(() => {
    async function fetchPayoffData() {
      if (!contractId) return;
      try {
        const token = localStorage.getItem("accessToken") || "";
        const headers = { Authorization: `Bearer ${token}` };

        const [contractRes, balanceRes] = await Promise.all([
          fetch(`${BASE_URL}/api/contracts/${contractId}`, { headers }),
          fetch(`${BASE_URL}/api/contracts/${contractId}/balance`, { headers })
        ]);

        const contractJson = await contractRes.json();
        const balanceJson = await balanceRes.json();

        if (!contractJson.success) throw new Error(contractJson.error?.message || "Error al cargar contrato");
        if (!balanceJson.success) throw new Error(balanceJson.error?.message || "Error al cargar saldo");

        setContract(contractJson.data);
        setBalance(balanceJson.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : po.errorNetwork);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPayoffData();
  }, [contractId, po.errorNetwork]);

  const handleGenerate = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      // Simulación de la petición de generación del PDF (la API no expone un POST de payoff directo por ahora)
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert(po.successAlert);
      router.push(`/contracts/${contractId || ''}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : po.errorNetwork);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Formateadores
  const formatCurrency = (val: number | string) => 
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Number(val));
    
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "N/D";
    const cleanDate = dateStr.includes('T') ? dateStr.split('T')[0] : dateStr;
    return new Date(`${cleanDate}T00:00:00`).toLocaleDateString(isEs ? "es-MX" : "en-US", { 
      month: "long", day: "numeric", year: "numeric" 
    });
  };

  // Calculos dinamicos
  const calculatePayoff = () => {
    if (!contract || !balance) return null;

    const principal = Number(balance.principalBalance || contract.currentTerms?.principalAmount || 0);
    const rate = Number(contract.currentTerms?.interestRate || 0);
    const perDiem = (principal * (rate / 100)) / 360;
    
    // Calculo de dias basado en el asOf del backend
    const asOfDate = new Date(balance.asOf || new Date().toISOString());
    const targetDate = new Date(`${expectedDate}T00:00:00`);
    
    const daysOffset = isNaN(targetDate.getTime()) ? 0 : Math.max(0, Math.round((targetDate.getTime() - asOfDate.getTime()) / 86400000));
    const accruedInt = Number(balance.accruedInterestNotYetBilled || 0) + (perDiem * daysOffset);
    const total = principal + accruedInt;

    return { principal, rate, perDiem, daysOffset, accruedInt, total };
  };

  const calc = calculatePayoff();

  if (isLoading) {
    return <div className="p-10 text-center text-[#8898aa]">Cargando datos para liquidacion...</div>;
  }

  if (!contract || !calc) {
    return <div className="p-10 text-center text-red-500">Error al cargar la informacion de liquidacion.</div>;
  }

  const rowClass = "flex justify-between text-[13px] py-[8px] border-b border-[#f6f9fc] last:border-none";
  const rowLabelClass = "text-[#8898aa]";
  const rowValClass = "font-[700] text-[#0a2540]";
  
  const calcRowClass = "flex justify-between text-[13px] py-[7px] border-b border-white/10 last:border-none";
  const calcLabelClass = "text-[#8898aa]";
  const calcValClass = "font-[700] text-white";

  const propertyDisplay = `${contract.property?.addressLine1}, ${contract.property?.city} ${contract.property?.state}`;
  const lenderDisplay = "Prestamista Vinculado"; // Podrias extraerlo si lo necesitas desde las relaciones del contrato

  return (
    <div className="animate-in fade-in duration-300 max-w-[720px]">
      
      <Link 
        href={`/contracts/${contractId || ''}`}
        className="mb-[20px] inline-flex items-center gap-[8px] text-[12px] font-[700] uppercase tracking-wide text-[#8898aa] transition-colors hover:text-[#635bff]"
      >
        <span>&larr;</span> {cd.back}
      </Link>

      <div className="mb-[4px] text-[22px] font-[800] tracking-[-0.3px] text-[#0a2540]">
        {po.title || "Payoff Request"}
      </div>
      <div className="mb-[24px] text-[13px] text-[#8898aa]">
        {contract.property?.addressLine1} • {isEs ? "Genera una carta oficial de liquidacion valida hasta una fecha especifica" : "Generate an official payoff letter good through a specific date"}
      </div>

      {error && (
        <div className="mb-[20px] rounded-[8px] border border-red-900/50 bg-red-900/10 px-[16px] py-[12px] text-[13px] text-red-500">
          {error}
        </div>
      )}

      {/* Loan Summary */}
      <div className="mb-[20px] rounded-[10px] border border-[#e6ebf1] bg-white p-[22px_24px] shadow-sm">
        <div className="mb-[14px] text-[14px] font-[700] text-[#0a2540]">
          {isEs ? "Resumen del prestamo" : "Loan summary"}
        </div>
        <div className={rowClass}>
          <span className={rowLabelClass}>{isEs ? "Propiedad" : "Property"}</span>
          <span className={rowValClass}>{propertyDisplay}</span>
        </div>
        <div className={rowClass}>
          <span className={rowLabelClass}>{isEs ? "Prestamista" : "Lender"}</span>
          <span className={rowValClass}>{lenderDisplay}</span>
        </div>
        <div className={rowClass}>
          <span className={rowLabelClass}>{isEs ? "Saldo de capital actual" : "Current principal balance"}</span>
          <span className={rowValClass}>{formatCurrency(calc.principal)}</span>
        </div>
        <div className={rowClass}>
          <span className={rowLabelClass}>{isEs ? "Tasa" : "Rate"}</span>
          <span className={rowValClass}>{calc.rate}% {isEs ? "(Ano de 360 dias)" : "(360-day year)"}</span>
        </div>
        <div className={rowClass}>
          <span className={rowLabelClass}>{isEs ? "Interes diario (per diem)" : "Daily interest (per diem)"}</span>
          <span className={rowValClass}>{formatCurrency(calc.perDiem)}/{isEs ? "dia" : "day"}</span>
        </div>
        <div className={rowClass}>
          <span className={rowLabelClass}>{isEs ? "Fecha de vencimiento" : "Maturity date"}</span>
          <span className={rowValClass}>{formatDate(contract.currentTerms?.maturityDate)}</span>
        </div>
      </div>

      {/* Date Picker */}
      <div className="mb-[20px] rounded-[10px] border border-[#e6ebf1] bg-white p-[24px] shadow-sm">
        <div className="mb-[4px] text-[15px] font-[700] text-[#0a2540]">
          {isEs ? "Elige la fecha de liquidacion" : "Set your payoff date"}
        </div>
        <div className="mb-[18px] text-[13px] text-[#8898aa]">
          {isEs 
            ? "Elige la fecha en la que planeas liquidar el prestamo. El monto es valido hasta esa fecha — el interes se acumula diariamente si pagas despues."
            : "Choose the date you plan to pay off the loan. The payoff amount is good through that date — interest accrues daily if you pay after."}
        </div>
        
        <div className="grid grid-cols-1 gap-[14px] sm:grid-cols-2">
          <div>
            <label className="mb-[5px] block text-[11px] font-[700] uppercase tracking-[0.4px] text-[#8898aa]">
              {isEs ? "Valido hasta" : "Payoff good through"}
            </label>
            <input 
              type="date" 
              value={expectedDate} 
              onChange={(e) => setExpectedDate(e.target.value)}
              className="w-full rounded-[6px] border border-[#e6ebf1] bg-white p-[9px_12px] font-sans text-[13px] text-[#0a2540] outline-none focus:border-[#635bff]"
            />
          </div>
          <div>
            <label className="mb-[5px] block text-[11px] font-[700] uppercase tracking-[0.4px] text-[#8898aa]">
              {isEs ? "Fecha de corte original" : "Original as-of date"}
            </label>
            <input 
              type="date" 
              value={balance.asOf ? balance.asOf.split('T')[0] : ''} 
              readOnly
              className="w-full rounded-[6px] border border-[#e6ebf1] bg-[#f6f9fc] p-[9px_12px] font-sans text-[13px] text-[#8898aa] outline-none"
            />
          </div>
        </div>
      </div>

      {/* Live Calc Box */}
      <div className="mb-[20px] rounded-[10px] bg-[#0a2540] p-[20px_22px]">
        <div className="mb-[14px] text-[11px] font-[700] uppercase tracking-[0.5px] text-[#8898aa]">
          {isEs ? "Calculo de liquidacion — valido hasta " : "Payoff calculation — good through "} 
          {formatDate(expectedDate)}
        </div>
        
        <div className={calcRowClass}>
          <span className={calcLabelClass}>{isEs ? "Saldo de capital" : "Principal balance"}</span>
          <span className={calcValClass}>{formatCurrency(calc.principal)}</span>
        </div>
        <div className={calcRowClass}>
          <span className={calcLabelClass}>{isEs ? "Tasa diaria (per diem)" : "Per diem rate"}</span>
          <span className={calcValClass}>{formatCurrency(calc.perDiem)}/{isEs ? "dia" : "day"}</span>
        </div>
        <div className={calcRowClass}>
          <span className={calcLabelClass}>{isEs ? `Dias adicionales desde corte al ${expectedDate}` : `Days offset to target date`}</span>
          <span className={calcValClass}>{calc.daysOffset} {isEs ? "dias" : "days"}</span>
        </div>
        <div className={calcRowClass}>
          <span className={calcLabelClass}>{isEs ? "Interes acumulado" : "Interest accrued"}</span>
          <span className={calcValClass}>{formatCurrency(calc.accruedInt)}</span>
        </div>
        
        <div className="mt-[8px] flex items-center justify-between border-t-[2px] border-white/15 pt-[14px]">
          <div>
            <div className="text-[13px] font-[700] text-[#aab7c4]">
              {isEs ? "Monto total de liquidacion" : "Total payoff amount"}
            </div>
          </div>
          <div className="text-[28px] font-[800] tracking-[-0.5px] text-white">
            {formatCurrency(calc.total)}
          </div>
        </div>
      </div>

      <div className="mb-[16px] rounded-[8px] border border-[#e6ebf1] bg-white p-[12px_16px] text-[12px] leading-[1.7] text-[#425466]">
        {isEs 
          ? `Esta liquidacion esta calculada a la tasa original del contrato de ${calc.rate}% usando un ano de 360 dias. Si pagas despues de la fecha indicada, el interes seguira acumulandose a ${formatCurrency(calc.perDiem)} por dia. Contacta a tu prestamista directamente para coordinar las instrucciones de transferencia (wire).` 
          : `This payoff is calculated at the original contract rate of ${calc.rate}% using a 360-day year. If you pay after the target date, interest continues to accrue at ${formatCurrency(calc.perDiem)} per day. Contact your lender directly to arrange wire instructions.`}
      </div>

      <button 
        onClick={handleGenerate}
        disabled={isSubmitting}
        className="mb-[10px] w-full cursor-pointer rounded-[6px] border-none bg-[#635bff] p-[14px] font-sans text-[14px] font-[700] text-white transition-colors hover:bg-[#524ddb] disabled:opacity-50"
      >
        {isSubmitting ? (po.processing || "Procesando...") : (isEs ? "Generar carta oficial (PDF)" : "Generate official payoff letter (PDF)")}
      </button>
    </div>
  );
}