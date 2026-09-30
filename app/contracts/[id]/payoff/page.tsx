"use client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";

function PayoffRequestContent() {
  const params = useParams();
  const contractId = params?.id as string;
  const router = useRouter();
  const { t, lang } = useSite();
  const po = t.payoff;
  const cd = t.contractDetail;
  const isEs = lang === "es";

  // Estados
  const [expectedDate, setExpectedDate] = useState("2027-10-15");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mocks basados en la maqueta HTML
  const mockData = {
    property: "3802 University Cove, Memphis TN 38127",
    lender: "Moore Capital LLC — Wilson Moore",
    principal: "$115,000",
    rate: "11.5%",
    perDiem: "$367.36",
    maturity: isEs ? "22 de Septiembre, 2027" : "September 22, 2027",
    paymentsMade: "8 of 12",
    today: "2027-09-22",
    daysOffset: 23,
    accruedInt: "$8,449.28",
    total: "$123,449.28"
  };

  const handleGenerate = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      // Simulacion temporal de la peticion
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert(po.successAlert);
      router.push(`/contracts/${contractId || ''}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : po.errorNetwork);
    } finally {
      setIsSubmitting(false);
    }
  };

  const rowClass = "flex justify-between text-[13px] py-[8px] border-b border-[#f6f9fc] last:border-none";
  const rowLabelClass = "text-[#8898aa]";
  const rowValClass = "font-[700] text-[#0a2540]";
  
  const calcRowClass = "flex justify-between text-[13px] py-[7px] border-b border-white/10 last:border-none";
  const calcLabelClass = "text-[#8898aa]";
  const calcValClass = "font-[700] text-white";

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
        3802 University Cove · {isEs ? "Genera una carta oficial de liquidacion valida hasta una fecha especifica" : "Generate an official payoff letter good through a specific date"}
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
          <span className={rowValClass}>{mockData.property}</span>
        </div>
        <div className={rowClass}>
          <span className={rowLabelClass}>{isEs ? "Prestamista" : "Lender"}</span>
          <span className={rowValClass}>{mockData.lender}</span>
        </div>
        <div className={rowClass}>
          <span className={rowLabelClass}>{isEs ? "Saldo de capital" : "Principal balance"}</span>
          <span className={rowValClass}>{mockData.principal}</span>
        </div>
        <div className={rowClass}>
          <span className={rowLabelClass}>{isEs ? "Tasa" : "Rate"}</span>
          <span className={rowValClass}>{mockData.rate} {isEs ? "(Año de 360 dias)" : "(360-day year)"}</span>
        </div>
        <div className={rowClass}>
          <span className={rowLabelClass}>{isEs ? "Interes diario (per diem)" : "Daily interest (per diem)"}</span>
          <span className={rowValClass}>{mockData.perDiem}/{isEs ? "dia" : "day"}</span>
        </div>
        <div className={rowClass}>
          <span className={rowLabelClass}>{isEs ? "Fecha de vencimiento" : "Maturity date"}</span>
          <span className={rowValClass}>{mockData.maturity}</span>
        </div>
        <div className={rowClass}>
          <span className={rowLabelClass}>{isEs ? "Pagos realizados" : "Payments made"}</span>
          <span className={rowValClass}>{mockData.paymentsMade}</span>
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
              {isEs ? "Fecha de hoy" : "Today's date"}
            </label>
            <input 
              type="date" 
              value={mockData.today} 
              readOnly
              className="w-full rounded-[6px] border border-[#e6ebf1] bg-white p-[9px_12px] font-sans text-[13px] text-[#0a2540] outline-none"
            />
          </div>
        </div>
      </div>

      {/* Live Calc Box */}
      <div className="mb-[20px] rounded-[10px] bg-[#0a2540] p-[20px_22px]">
        <div className="mb-[14px] text-[11px] font-[700] uppercase tracking-[0.5px] text-[#8898aa]">
          {isEs ? "Calculo de liquidacion — valido hasta " : "Payoff calculation — good through "} 
          {isEs ? "Octubre 15, 2027" : "October 15, 2027"}
        </div>
        
        <div className={calcRowClass}>
          <span className={calcLabelClass}>{isEs ? "Saldo de capital" : "Principal balance"}</span>
          <span className={calcValClass}>{mockData.principal}</span>
        </div>
        <div className={calcRowClass}>
          <span className={calcLabelClass}>{isEs ? "Tasa diaria (per diem)" : "Per diem rate"}</span>
          <span className={calcValClass}>{mockData.perDiem}/{isEs ? "dia" : "day"} {isEs ? "(año 360)" : "(360-day year)"}</span>
        </div>
        <div className={calcRowClass}>
          <span className={calcLabelClass}>{isEs ? `Dias desde el ultimo corte al ${expectedDate}` : `Days from maturity to Oct 15`}</span>
          <span className={calcValClass}>{mockData.daysOffset} {isEs ? "dias" : "days"}</span>
        </div>
        <div className={calcRowClass}>
          <span className={calcLabelClass}>{isEs ? "Interes acumulado" : "Interest accrued"} ({mockData.daysOffset} × {mockData.perDiem})</span>
          <span className={calcValClass}>{mockData.accruedInt}</span>
        </div>
        <div className={calcRowClass}>
          <span className={calcLabelClass}>{isEs ? "Cargos por atraso pendientes" : "Unpaid late fees"}</span>
          <span className={calcValClass}>$0.00</span>
        </div>

        <div className="mt-[8px] flex items-center justify-between border-t-[2px] border-white/15 pt-[14px]">
          <div>
            <div className="text-[13px] font-[700] text-[#aab7c4]">
              {isEs ? "Monto total de liquidacion" : "Total payoff amount"}
            </div>
            <div className="mt-[2px] text-[11px] text-[#8898aa]">
              {isEs ? "Valido hasta Oct 15, 2027" : "Good through October 15, 2027"}
            </div>
          </div>
          <div className="text-[28px] font-[800] tracking-[-0.5px] text-white">
            {mockData.total}
          </div>
        </div>
      </div>

      <div className="mb-[16px] rounded-[8px] border border-[#e6ebf1] bg-white p-[12px_16px] text-[12px] leading-[1.7] text-[#425466]">
        {isEs 
          ? `Esta liquidacion esta calculada a la tasa original del contrato de ${mockData.rate} usando un año de 360 dias. Si pagas despues de la fecha indicada, el interes seguira acumulandose a ${mockData.perDiem} por dia. Contacta a tu prestamista directamente para coordinar las instrucciones de transferencia (wire).` 
          : `This payoff is calculated at the original contract rate of ${mockData.rate} using a 360-day year. If you pay after the target date, interest continues to accrue at ${mockData.perDiem} per day. Contact your lender directly to arrange wire instructions.`}
      </div>

      <button 
        onClick={handleGenerate}
        disabled={isSubmitting}
        className="mb-[10px] w-full cursor-pointer rounded-[6px] border-none bg-[#635bff] p-[14px] font-sans text-[14px] font-[700] text-white transition-colors hover:bg-[#524ddb] disabled:opacity-50"
      >
        {isSubmitting ? (po.processing || "Procesando...") : (isEs ? "Generar carta oficial (PDF)" : "Generate official payoff letter (PDF)")}
      </button>
      
      <button className="w-full cursor-pointer rounded-[6px] border-[2px] border-[#c7c4ff] bg-white p-[12px] font-sans text-[13px] font-[700] text-[#635bff] transition-colors hover:bg-[#f6f9fc]">
        {isEs ? "Descargar resumen de calculo" : "Download calculation summary"}
      </button>

    </div>
  );
}

export default function PayoffRequestPage() {
  return (
    <SiteShell isDashboard={true}>
      <PayoffRequestContent />
    </SiteShell>
  );
}