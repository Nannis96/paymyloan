"use client";
import { useState } from "react";
import { useSite } from "@/app/components/layout/SiteShell";

export default function PaymentsView() {
  const { lang } = useSite();
  const isEs = lang === "es";

  const [activeLoan, setActiveLoan] = useState<"loan1" | "loan2">("loan1");
  const [payoffDate, setPayoffDate] = useState("2027-09-22");

  // Mocks de datos
  const loans = {
    loan1: {
      id: "loan1",
      address: "3802 University Cove",
      principal: 115000,
      rate: 0.12,
      startDate: "2026-09-22",
      maturityDate: "2027-09-22",
      monthlyPayment: 1150,
      totalInterest: 13800
    },
    loan2: {
      id: "loan2",
      address: "1144 Oakwood Dr",
      principal: 95000,
      rate: 0.12,
      startDate: "2026-08-03",
      maturityDate: "2027-08-03",
      monthlyPayment: 950,
      totalInterest: 11400
    }
  };

  const currentLoan = loans[activeLoan];

  // Calculo en vivo del Payoff
  const calculatePayoff = () => {
    // Usamos T00:00:00 para normalizar las fechas sin problemas de zona horaria local
    const start = new Date(`${currentLoan.startDate}T00:00:00`);
    const end = new Date(`${payoffDate}T00:00:00`);
    
    // Evitar dias negativos si eligen una fecha pasada
    const days = isNaN(end.getTime()) ? 0 : Math.max(0, Math.round((end.getTime() - start.getTime()) / 86400000));
    const perDiem = (currentLoan.principal * currentLoan.rate) / 360;
    const interestAccrued = perDiem * days;
    const total = currentLoan.principal + interestAccrued;

    return { days, perDiem, interestAccrued, total };
  };

  const calc = calculatePayoff();

  // Formateador
  const formatCurrency = (val: number) => 
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);

  const formatShortDate = (dateStr: string) => {
    const d = new Date(`${dateStr}T00:00:00`);
    return d.toLocaleDateString(isEs ? "es-MX" : "en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  // Generador de tabla simulada (12 meses para el ejemplo del HTML)
  const scheduleRows = Array.from({ length: 12 }).map((_, i) => {
    const d = new Date("2026-10-01T00:00:00");
    d.setMonth(d.getMonth() + i);
    
    const isFirst = i === 0;
    
    return {
      num: i + 1,
      date: d.toLocaleDateString(isEs ? "es-MX" : "en-US", { month: "short", day: "numeric", year: "numeric" }),
      amount: currentLoan.monthlyPayment,
      statusLabel: isFirst ? (isEs ? `Vence ${d.toLocaleDateString(isEs ? "es-MX" : "en-US", { month: "short", day: "numeric"})}` : `Due ${d.toLocaleDateString("en-US", { month: "short", day: "numeric"})}`) : (isEs ? "Proximo" : "Upcoming"),
      isFirst
    };
  });

  return (
    <div className="animate-in fade-in duration-300">
      <div className="mb-[2px] text-[20px] font-[800] tracking-[-0.3px] text-[#0a2540]">
        {isEs ? "Calendario de pagos" : "Payment schedule"}
      </div>
      <div className="mb-[24px] text-[13px] text-[#8898aa]">
        {isEs ? "Calendario de intereses mensuales para tus prestamos activos." : "Monthly interest schedule for your active loans."}
      </div>

      {/* Selector de prestamo */}
      <div className="mb-[24px] flex flex-wrap gap-[8px]">
        <button 
          onClick={() => setActiveLoan("loan1")}
          className={`cursor-pointer rounded-[7px] border-[1.5px] px-[16px] py-[8px] font-sans text-[12px] font-[600] transition-colors ${
            activeLoan === "loan1" 
              ? "border-[#635bff] bg-[#f0efff] text-[#635bff]" 
              : "border-[#e6ebf1] bg-white text-[#425466] hover:bg-[#f6f9fc]"
          }`}
        >
          3802 University Cove — $115K @ 12%
        </button>
        <button 
          onClick={() => setActiveLoan("loan2")}
          className={`cursor-pointer rounded-[7px] border-[1.5px] px-[16px] py-[8px] font-sans text-[12px] font-[600] transition-colors ${
            activeLoan === "loan2" 
              ? "border-[#635bff] bg-[#f0efff] text-[#635bff]" 
              : "border-[#e6ebf1] bg-white text-[#425466] hover:bg-[#f6f9fc]"
          }`}
        >
          1144 Oakwood Dr — $95K @ 12%
        </button>
      </div>

      {/* Fila de Estadisticas Superiores */}
      <div className="mb-[24px] grid grid-cols-2 gap-[12px] md:grid-cols-5">
        <div className="rounded-[10px] border border-[#e6ebf1] bg-white p-[14px_16px]">
          <div className="mb-[4px] text-[10px] font-[700] uppercase tracking-[0.5px] text-[#aab7c4]">{isEs ? "Capital" : "Principal"}</div>
          <div className="text-[18px] font-[800] text-[#0a2540]">{formatCurrency(currentLoan.principal)}</div>
        </div>
        <div className="rounded-[10px] border border-[#e6ebf1] bg-white p-[14px_16px]">
          <div className="mb-[4px] text-[10px] font-[700] uppercase tracking-[0.5px] text-[#aab7c4]">{isEs ? "Pago mensual" : "Monthly payment"}</div>
          <div className="text-[18px] font-[800] text-[#635bff]">{formatCurrency(currentLoan.monthlyPayment)}</div>
          <div className="mt-[2px] text-[10px] text-[#aab7c4]">{isEs ? "Solo interes" : "Interest only"}</div>
        </div>
        <div className="rounded-[10px] border border-[#e6ebf1] bg-white p-[14px_16px]">
          <div className="mb-[4px] text-[10px] font-[700] uppercase tracking-[0.5px] text-[#aab7c4]">Per diem</div>
          <div className="text-[18px] font-[800] text-[#0a2540]">{formatCurrency(calc.perDiem)}</div>
          <div className="mt-[2px] text-[10px] text-[#aab7c4]">{isEs ? "Año de 360 dias" : "360-day year"}</div>
        </div>
        <div className="rounded-[10px] border border-[#e6ebf1] bg-white p-[14px_16px]">
          <div className="mb-[4px] text-[10px] font-[700] uppercase tracking-[0.5px] text-[#aab7c4]">{isEs ? "Fecha vencimiento" : "Maturity date"}</div>
          <div className="text-[18px] font-[800] text-[#b45309]">{formatShortDate(currentLoan.maturityDate)}</div>
        </div>
        <div className="rounded-[10px] border border-[#e6ebf1] bg-white p-[14px_16px]">
          <div className="mb-[4px] text-[10px] font-[700] uppercase tracking-[0.5px] text-[#aab7c4]">{isEs ? "Interes total" : "Total interest"}</div>
          <div className="text-[18px] font-[800] text-[#0a2540]">{formatCurrency(currentLoan.totalInterest)}</div>
          <div className="mt-[2px] text-[10px] text-[#aab7c4]">{isEs ? "12 meses completos" : "Full 12 months"}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-[16px] lg:grid-cols-[1fr_320px]">
        {/* Columna Izquierda: Tabla */}
        <div className="overflow-hidden rounded-[10px] border border-[#e6ebf1] bg-white">
          <div className="border-b border-[#e6ebf1] p-[14px_20px]">
            <div className="text-[13px] font-[700] text-[#0a2540]">{isEs ? "Calendario de 12 meses" : "12-month schedule"}</div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr>
                  <th className="border-b border-[#e6ebf1] bg-[#f6f9fc] p-[10px_20px] text-[10px] font-[700] uppercase tracking-[0.5px] text-[#aab7c4]">#</th>
                  <th className="border-b border-[#e6ebf1] bg-[#f6f9fc] p-[10px_20px] text-[10px] font-[700] uppercase tracking-[0.5px] text-[#aab7c4]">{isEs ? "Vencimiento" : "Due date"}</th>
                  <th className="border-b border-[#e6ebf1] bg-[#f6f9fc] p-[10px_20px] text-[10px] font-[700] uppercase tracking-[0.5px] text-[#aab7c4]">{isEs ? "Monto" : "Amount"}</th>
                  <th className="border-b border-[#e6ebf1] bg-[#f6f9fc] p-[10px_20px] text-[10px] font-[700] uppercase tracking-[0.5px] text-[#aab7c4]">{isEs ? "Estado" : "Status"}</th>
                </tr>
              </thead>
              <tbody>
                {scheduleRows.map((row) => (
                  <tr key={row.num} className="cursor-pointer border-b border-[#f6f9fc] transition-colors hover:bg-[#fafbfd]">
                    <td className="p-[11px_20px] text-[13px] text-[#425466]">{row.num}</td>
                    <td className="p-[11px_20px] text-[13px] text-[#425466]">{row.date}</td>
                    <td className={`p-[11px_20px] text-[13px] font-[700] ${row.isFirst ? "text-[#635bff]" : "text-[#0a2540]"}`}>{formatCurrency(row.amount)}</td>
                    <td className="p-[11px_20px] text-[13px]">
                      <span className={`inline-block rounded-[8px] px-[9px] py-[3px] text-[10px] font-[700] ${row.isFirst ? "bg-[#f0efff] text-[#635bff]" : "bg-[#f6f9fc] text-[#8898aa]"}`}>
                        {row.statusLabel}
                      </span>
                    </td>
                  </tr>
                ))}
                {/* Fila de Vencimiento */}
                <tr className="bg-[#f0efff]">
                  <td colSpan={2} className="p-[11px_20px] text-[13px] font-[700] text-[#635bff]">
                    {isEs ? "Vencimiento" : "Maturity"} — {formatShortDate(currentLoan.maturityDate)}
                  </td>
                  <td className="p-[11px_20px] text-[13px] font-[700] text-[#635bff]">
                    {formatCurrency(currentLoan.principal)}
                  </td>
                  <td className="p-[11px_20px] text-[12px] font-[700] text-[#635bff]">
                    {isEs ? "Capital pendiente" : "Principal due"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Columna Derecha: Calculadora Payoff */}
        <div>
          <div className="sticky top-[68px] rounded-[10px] border border-[#e6ebf1] bg-white p-[20px]">
            <div className="mb-[14px] text-[13px] font-[800] text-[#0a2540]">{isEs ? "Calculadora de liquidacion" : "Payoff calculator"}</div>
            
            <label className="mb-[4px] block text-[11px] font-[600] text-[#425466]">{isEs ? "Fecha de corte (Good-through)" : "Good-through date"}</label>
            <input 
              type="date" 
              value={payoffDate}
              onChange={(e) => setPayoffDate(e.target.value)}
              className="mb-[14px] w-full rounded-[6px] border border-[#e6ebf1] bg-white p-[8px_12px] font-sans text-[13px] text-[#0a2540] outline-none transition-colors focus:border-[#635bff]"
            />

            <div className="mb-[14px] rounded-[8px] bg-[#f0efff] p-[14px]">
              <div className="flex justify-between border-b border-[#e0deff] py-[4px] text-[12px]">
                <span className="text-[#8898aa]">{isEs ? "Capital" : "Principal"}</span>
                <span className="font-[700] text-[#0a2540]">{formatCurrency(currentLoan.principal)}</span>
              </div>
              <div className="flex justify-between border-b border-[#e0deff] py-[4px] text-[12px]">
                <span className="text-[#8898aa]">{isEs ? "Interes a la fecha" : "Interest through date"}</span>
                <span className="font-[700] text-[#0a2540]">{formatCurrency(calc.interestAccrued)}</span>
              </div>
              <div className="flex justify-between border-b border-[#e0deff] py-[4px] text-[12px]">
                <span className="text-[#8898aa]">Per diem ({formatCurrency(calc.perDiem)}/day)</span>
                <span className="font-[700] text-[#0a2540]">{formatCurrency(calc.perDiem)}</span>
              </div>
              <div className="mt-[10px] flex justify-between border-t-[2px] border-[#635bff] pt-[10px]">
                <span className="text-[13px] font-[700] text-[#0a2540]">{isEs ? "Total de liquidacion" : "Payoff total"}</span>
                <span className="text-[16px] font-[800] text-[#635bff]">{formatCurrency(calc.total)}</span>
              </div>
            </div>

            <button 
              onClick={() => alert(isEs ? "Se generara la carta oficial y se te enviara." : "Payoff letter will be generated and emailed to you.")}
              className="w-full cursor-pointer rounded-[6px] border-none bg-[#0a2540] p-[10px] font-sans text-[13px] font-[700] text-white transition-opacity hover:opacity-90"
            >
              {isEs ? "Generar carta de liquidacion" : "Generate payoff letter"}
            </button>
            <div className="mt-[8px] text-center text-[11px] text-[#aab7c4]">
              {isEs ? "Estándar de año de 360 días" : "360-day year standard"} · {formatCurrency(currentLoan.principal)} × {currentLoan.rate * 100}% ÷ 360
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}