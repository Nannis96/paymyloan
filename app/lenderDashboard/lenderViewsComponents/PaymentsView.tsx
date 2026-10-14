"use client";

import { useState, useEffect } from "react";
import { useSite } from "@/app/components/layout/SiteShell";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function PaymentsView() {
  const { t, lang } = useSite();
  const isEs = lang === "es";

  const [contracts, setContracts] = useState<any[]>([]);
  const [activeLoanId, setActiveLoanId] = useState<string | null>(null);
  
  const [schedule, setSchedule] = useState<any[]>([]);
  const [balance, setBalance] = useState<any>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isDataLoading, setIsDataLoading] = useState(false);

  // Inicializar fecha de pago esperado a hoy
  const [payoffDate, setPayoffDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  // 1. Obtener los contratos activos del prestamista
  useEffect(() => {
    async function fetchContracts() {
      try {
        const token = localStorage.getItem("accessToken") || "";
        const res = await fetch(`${BASE_URL}/api/contracts`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const json = await res.json();
        
        if (json.success && json.data?.items) {
          // Filtrar solo los activos o en mora
          const activeDeals = json.data.items.filter((c: any) => 
            c.status === "ACTIVE" || c.status === "DELINQUENT"
          );
          setContracts(activeDeals);
          if (activeDeals.length > 0) {
            setActiveLoanId(activeDeals[0].id);
          }
        }
      } catch (err) {
        console.error("Error fetching contracts:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchContracts();
  }, []);

  // 2. Obtener calendario y saldo cuando cambia el prestamo activo
  useEffect(() => {
    if (!activeLoanId) return;

    async function fetchLoanDetails() {
      setIsDataLoading(true);
      try {
        const token = localStorage.getItem("accessToken") || "";
        const headers = { Authorization: `Bearer ${token}` };

        const [scheduleRes, balanceRes] = await Promise.all([
          fetch(`${BASE_URL}/api/contracts/${activeLoanId}/schedule`, { headers }),
          fetch(`${BASE_URL}/api/contracts/${activeLoanId}/balance`, { headers })
        ]);

        const scheduleJson = await scheduleRes.json();
        const balanceJson = await balanceRes.json();

        if (scheduleJson.success) setSchedule(scheduleJson.data || []);
        if (balanceJson.success) setBalance(balanceJson.data);
        
      } catch (err) {
        console.error("Error fetching loan details:", err);
      } finally {
        setIsDataLoading(false);
      }
    }
    fetchLoanDetails();
  }, [activeLoanId]);

  const currentContract = contracts.find(c => c.id === activeLoanId);
  const currentTerms = currentContract?.currentTerms;

  // Calculo en vivo del Payoff
  const calculatePayoff = () => {
    if (!balance || !currentTerms) return { days: 0, perDiem: 0, interestAccrued: 0, total: 0, principal: 0 };

    const principal = Number(balance.principalBalance || currentTerms.principalAmount);
    const rate = Number(currentTerms.interestRate);
    
    const perDiem = (principal * (rate / 100)) / 360;
    
    // Calcular dias de diferencia desde la fecha "asOf" del balance
    const start = new Date(balance.asOf || new Date().toISOString());
    const end = new Date(`${payoffDate}T00:00:00`);
    
    // Evitar dias negativos
    const days = isNaN(end.getTime()) ? 0 : Math.max(0, Math.round((end.getTime() - start.getTime()) / 86400000));
    
    const baseInterest = Number(balance.accruedInterestNotYetBilled || 0);
    const futureInterest = perDiem * days;
    const interestAccrued = baseInterest + futureInterest;
    
    const total = principal + interestAccrued;
    
    return { days, perDiem, interestAccrued, total, principal };
  };

  const calc = calculatePayoff();

  // Formateadores
  const formatCurrency = (val?: number | string) => 
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Number(val || 0));
    
  const formatShortDate = (dateStr?: string) => {
    if (!dateStr) return "N/D";
    // Limpiar timestamp para evitar problemas de zona horaria
    const cleanDate = dateStr.includes('T') ? dateStr.split('T')[0] : dateStr;
    const d = new Date(`${cleanDate}T00:00:00`);
    return d.toLocaleDateString(isEs ? "es-MX" : "en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  // Status del pago
  const getStatusStyle = (status: string) => {
    const s = status?.toLowerCase() || '';
    if (s === 'paid' || s === 'succeeded') return "bg-[#e8f5e9] text-[#2e7d32]";
    if (s === 'late' || s === 'delinquent') return "bg-[#fef2f2] text-[#dc2626]";
    if (s === 'pending') return "bg-[#f0efff] text-[#635bff]";
    return "bg-[#f6f9fc] text-[#8898aa]";
  };

  if (isLoading) {
    return <div className="p-10 text-center text-[#8898aa]">Cargando calendario de pagos...</div>;
  }

  return (
    <div className="animate-in fade-in duration-300">
      <div className="mb-[2px] text-[20px] font-[800] tracking-[-0.3px] text-[#0a2540]">
        {isEs ? "Calendario de pagos" : "Payment schedule"}
      </div>
      <div className="mb-[24px] text-[13px] text-[#8898aa]">
        {isEs ? "Calendario de intereses mensuales para tus prestamos activos." : "Monthly interest schedule for your active loans."}
      </div>

      {contracts.length === 0 ? (
        <div className="rounded-[10px] border border-[#e6ebf1] bg-white p-[40px] text-center text-[#8898aa]">
          {isEs ? "No tienes prestamos activos." : "No active loans found."}
        </div>
      ) : (
        <>
          {/* Selector de prestamo dinámico */}
          <div className="mb-[24px] flex flex-wrap gap-[8px]">
            {contracts.map(contract => {
              const terms = contract.currentTerms;
              const title = `${contract.property?.addressLine1} - ${formatCurrency(terms?.principalAmount)} @${terms?.interestRate}%`;
              return (
                <button 
                  key={contract.id}
                  onClick={() => setActiveLoanId(contract.id)}
                  className={`cursor-pointer rounded-[7px] border-[1.5px] px-[16px] py-[8px] font-sans text-[12px] font-[600] transition-colors ${
                    activeLoanId === contract.id 
                      ? "border-[#635bff] bg-[#f0efff] text-[#635bff]" 
                      : "border-[#e6ebf1] bg-white text-[#425466] hover:bg-[#f6f9fc]"
                  }`}
                >
                  {title}
                </button>
              );
            })}
          </div>

          {/* Fila de Estadisticas Superiores */}
          <div className="mb-[24px] grid grid-cols-2 gap-[12px] md:grid-cols-4">
            <div className="rounded-[10px] border border-[#e6ebf1] bg-white p-[14px_16px]">
              <div className="mb-[4px] text-[10px] font-[700] uppercase tracking-[0.5px] text-[#aab7c4]">{isEs ? "Capital Restante" : "Principal Balance"}</div>
              <div className="text-[18px] font-[800] text-[#0a2540]">{formatCurrency(calc.principal)}</div>
            </div>
            <div className="rounded-[10px] border border-[#e6ebf1] bg-white p-[14px_16px]">
              <div className="mb-[4px] text-[10px] font-[700] uppercase tracking-[0.5px] text-[#aab7c4]">{isEs ? "Pago mensual" : "Monthly payment"}</div>
              <div className="text-[18px] font-[800] text-[#635bff]">{formatCurrency(currentTerms?.calculatedMonthlyPayment || 0)}</div>
              <div className="mt-[2px] text-[10px] text-[#aab7c4]">{isEs ? "Solo interes" : "Interest only"}</div>
            </div>
            <div className="rounded-[10px] border border-[#e6ebf1] bg-white p-[14px_16px]">
              <div className="mb-[4px] text-[10px] font-[700] uppercase tracking-[0.5px] text-[#aab7c4]">Per diem</div>
              <div className="text-[18px] font-[800] text-[#0a2540]">{formatCurrency(calc.perDiem)}</div>
              <div className="mt-[2px] text-[10px] text-[#aab7c4]">{isEs ? "Ano de 360 dias" : "360-day year"}</div>
            </div>
            <div className="rounded-[10px] border border-[#e6ebf1] bg-white p-[14px_16px]">
              <div className="mb-[4px] text-[10px] font-[700] uppercase tracking-[0.5px] text-[#aab7c4]">{isEs ? "Fecha vencimiento" : "Maturity date"}</div>
              <div className="text-[18px] font-[800] text-[#b45309]">{formatShortDate(currentTerms?.maturityDate)}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 items-start gap-[16px] lg:grid-cols-[1fr_320px]">
            {/* Columna Izquierda: Tabla */}
            <div className="overflow-hidden rounded-[10px] border border-[#e6ebf1] bg-white">
              <div className="border-b border-[#e6ebf1] p-[14px_20px]">
                <div className="text-[13px] font-[700] text-[#0a2540]">{isEs ? "Calendario completo" : "Full schedule"}</div>
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
                    {isDataLoading ? (
                      <tr><td colSpan={4} className="p-4 text-center text-[13px] text-[#8898aa]">Cargando cuotas...</td></tr>
                    ) : schedule.length === 0 ? (
                      <tr><td colSpan={4} className="p-4 text-center text-[13px] text-[#8898aa]">No hay cuotas programadas.</td></tr>
                    ) : (
                      schedule.map((row: any) => (
                        <tr key={row.id} className="cursor-pointer border-b border-[#f6f9fc] transition-colors hover:bg-[#fafbfd]">
                          <td className="p-[11px_20px] text-[13px] text-[#425466]">{row.sequenceNumber}</td>
                          <td className="p-[11px_20px] text-[13px] text-[#425466]">{formatShortDate(row.dueDate)}</td>
                          <td className={`p-[11px_20px] text-[13px] font-[700] ${row.dueSoon ? "text-[#635bff]" : "text-[#0a2540]"}`}>{formatCurrency(row.totalDue)}</td>
                          <td className="p-[11px_20px] text-[13px]">
                            <span className={`inline-block rounded-[8px] px-[9px] py-[3px] text-[10px] font-[700] uppercase ${getStatusStyle(row.status)}`}>
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                    {/* Fila de Vencimiento (Maturity) - Calculada dinámicamente si hay terms */}
                    {currentTerms && (
                      <tr className="bg-[#f0efff]">
                        <td colSpan={2} className="p-[11px_20px] text-[13px] font-[700] text-[#635bff]">
                          {isEs ? "Vencimiento Final" : "Maturity"} • {formatShortDate(currentTerms.maturityDate)}
                        </td>
                        <td className="p-[11px_20px] text-[13px] font-[700] text-[#635bff]">
                          {formatCurrency(calc.principal)}
                        </td>
                        <td className="p-[11px_20px] text-[12px] font-[700] text-[#635bff] uppercase">
                          {isEs ? "Capital pendiente" : "Principal due"}
                        </td>
                      </tr>
                    )}
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
                    <span className="font-[700] text-[#0a2540]">{formatCurrency(calc.principal)}</span>
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
                  {isEs ? "Estandar de ano de 360 dias" : "360-day year standard"} • {formatCurrency(calc.principal)} • {currentTerms?.interestRate}% • 360
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}