"use client";

import { useState, useEffect } from "react";
import { useSite } from "@/app/components/layout/SiteShell";
import Link from "next/link";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function DashboardView() {
  const { t, lang } = useSite();
  const d = t.dashboardLender.mimic;
  const isEs = lang === "es";

  const [user, setUser] = useState<any>(null);
  const [lenderData, setLenderData] = useState<any>(null);
  const [activeContracts, setActiveContracts] = useState<any[]>([]);
  const [newDealsCount, setNewDealsCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const token = localStorage.getItem("accessToken") || "";
        const headers = { Authorization: `Bearer ${token}` };

        // Llamadas en paralelo para poblar el dashboard (obtenemos la primera pagina de contratos aqui)
        const [authRes, lenderRes, firstContractsRes, marketplaceRes] = await Promise.all([
          fetch(`${BASE_URL}/api/auth/me`, { headers }),
          fetch(`${BASE_URL}/api/lenders/me`, { headers }),
          fetch(`${BASE_URL}/api/contracts?page=1&pageSize=100`, { headers }),
          fetch(`${BASE_URL}/api/marketplace/loan-requests`, { headers })
        ]);
        const authJson = await authRes.json();
        const lenderJson = await lenderRes.json();
        const firstContractsJson = await firstContractsRes.json();
        const marketplaceJson = await marketplaceRes.json();

        if (authJson.success) setUser(authJson.data.user);
        if (lenderJson.success) setLenderData(lenderJson.data);
        
        if (firstContractsJson.success && firstContractsJson.data) {
          let allContracts = [...(firstContractsJson.data.items || [])];
          let totalPages = firstContractsJson.data.totalPages || 1;
          
          // Paginacion completa para los KPIs
          for (let page = 2; page <= totalPages; page++) {
            const nextRes = await fetch(`${BASE_URL}/api/contracts?page=${page}&pageSize=100`, { headers });
            const nextJson = await nextRes.json();
            if (nextJson.success && nextJson.data?.items) {
              allContracts = [...allContracts, ...nextJson.data.items];
            }
          }

          // Filtramos solo los contratos activos, pendientes o en mora desde el frontend
          const active = allContracts.filter((c: any) => 
            c.status === "ACTIVE" || c.status === "PENDING_ACCEPTANCE" || c.status === "DELINQUENT"
          );
          setActiveContracts(active);
        }
        if (marketplaceJson.success) {
          // Usamos el total paginado si existe, o el largo del array de items
          const totalDeals = marketplaceJson.data?.total || marketplaceJson.data?.items?.length || 0;
          setNewDealsCount(totalDeals);
        }

      } catch (err) {
        console.error("Error fetching dashboard data", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  const AlertIcon = (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="mt-[2px] shrink-0">
      <path d="M8 1.5L1.5 13h13L8 1.5z" stroke="#b45309" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M8 6v3.5M8 11v.5" stroke="#b45309" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );

  const formatCurrency = (val: number | string | null | undefined) => {
    if (!val) return "$0";
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(Number(val));
  };

  const formatShortDate = (dateStr: string | null | undefined) => {
    if (!dateStr) return "N/D";
    const cleanDate = dateStr.includes('T') ? dateStr.split('T')[0] : dateStr;
    const dateObj = new Date(`${cleanDate}T00:00:00`);
    return dateObj.toLocaleDateString(isEs ? "es-MX" : "en-US", { month: "short", day: "numeric" });
  };

  // Calculos para los KPIs basados en datos reales
  const companyName = lenderData?.lenderCompanies?.[0]?.companyName || (isEs ? "Tu Compania" : "Your Company");
  const firstName = user?.name ? user.name.split(" ")[0] : "Lender";
  const totalActiveContracts = lenderData?.activeContractsCount || activeContracts.length;
  
  // Sumamos el capital de los contratos activos
  const totalDeployed = activeContracts.reduce((sum, c) => sum + Number(c.currentTerms?.principalAmount || 0), 0);
  const totalMonthlyIncome = activeContracts.reduce((sum, c) => sum + Number(c.currentTerms?.calculatedMonthlyPayment || 0), 0);

  // Buscamos TODOS los contratos en mora (DELINQUENT) para mostrarlos en alertas multiples
  const delinquentContracts = activeContracts.filter(c => c.status === "DELINQUENT");

  // Contratos proximos a vencer (< 35 dias)
  const maturingContracts = activeContracts.filter(c => {
    if(!c.currentTerms?.maturityDate) return false;
    const days = (new Date(c.currentTerms.maturityDate).getTime() - new Date().getTime()) / 86400000;
    return days > 0 && days <= 35;
  });

  // Pagos proximos ordenados por fecha del mas cercano al mas lejano
  const upcomingPayments = [...activeContracts]
    .filter(c => c.nextPaymentDueDate)
    .sort((a, b) => new Date(a.nextPaymentDueDate).getTime() - new Date(b.nextPaymentDueDate).getTime())
    .slice(0, 4);

  if (isLoading) {
    return <div className="p-10 text-center text-[#8898aa]">Cargando tu panel principal...</div>;
  }

  return (
    <div className="animate-in fade-in duration-300">
      <div className="mb-[4px] text-[20px] font-[800] tracking-[-0.3px] text-[#0a2540]">
        {d.greeting.replace("{name}", firstName)}
      </div>
      <div className="mb-[24px] text-[13px] text-[#8898aa]">
        {d.portfolioSub.replace("{company}", companyName)}
      </div>

      <div className="mb-[24px] grid grid-cols-2 lg:grid-cols-4 gap-[14px]">
        <div className="rounded-[10px] border border-[#e6ebf1] bg-white p-[18px_20px]">
          <div className="mb-[6px] text-[11px] font-[700] uppercase tracking-[0.5px] text-[#aab7c4]">
            {d.stats.capitalDeployed}
          </div>
          <div className="text-[24px] font-[800] tracking-[-0.5px] text-[#0a2540]">{formatCurrency(totalDeployed)}</div>
          <div className="mt-[3px] text-[11px] text-[#aab7c4]">
            {d.stats.acrossActive.replace("{n}", totalActiveContracts.toString())}
          </div>
        </div>

        <div className="rounded-[10px] border border-[#e6ebf1] bg-white p-[18px_20px]">
          <div className="mb-[6px] text-[11px] font-[700] uppercase tracking-[0.5px] text-[#aab7c4]">
            {d.stats.monthlyIncome}
          </div>
          <div className="text-[24px] font-[800] tracking-[-0.5px] text-[#2e7d32]">{formatCurrency(totalMonthlyIncome)}</div>
          <div className="mt-[3px] text-[11px] text-[#aab7c4]">{d.stats.interestPayments}</div>
        </div>

        <div className="rounded-[10px] border border-[#e6ebf1] bg-white p-[18px_20px]">
          <div className="mb-[6px] text-[11px] font-[700] uppercase tracking-[0.5px] text-[#aab7c4]">
            {d.stats.newDeals}
          </div>
          <div className="text-[24px] font-[800] tracking-[-0.5px] text-[#635bff]">
            {newDealsCount}
          </div>
          <div className="mt-[3px] text-[11px] text-[#aab7c4]">{d.stats.matchCriteria}</div>
        </div>

        <div className="rounded-[10px] border border-[#e6ebf1] bg-white p-[18px_20px]">
          <div className="mb-[6px] text-[11px] font-[700] uppercase tracking-[0.5px] text-[#aab7c4]">
            {d.stats.maturingSoon}
          </div>
          <div className="text-[24px] font-[800] tracking-[-0.5px] text-[#b45309]">
            {maturingContracts.length}
          </div>
          <div className="mt-[3px] text-[11px] text-[#aab7c4]">{isEs ? "En menos de 35 dias" : "Within 35 days"}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-[16px] lg:grid-cols-[1fr_340px]">
        <div className="min-w-0">
          
          {/* Alertas Dinamicas Multiples (Mora) */}
          {delinquentContracts.map(contract => (
            <div key={`delinquent-${contract.id}`} className="mb-[14px] overflow-hidden rounded-[10px] border border-[#e6ebf1] bg-white">
              <div className="flex items-center justify-between border-b border-[#e6ebf1] p-[14px_20px]">
                <div className="text-[13px] font-[700] text-[#0a2540]">{isEs ? "Alerta de mora" : "Delinquency alert"}</div>
              </div>
              <div className="m-[0_20px_14px] mt-[14px] flex gap-[10px] rounded-[8px] border border-red-300 bg-red-50 p-[12px_14px]">
                {AlertIcon}
                <div>
                  <div className="text-[12px] font-[700] text-red-800">
                    {contract.property?.addressLine1} - {isEs ? "Pago atrasado" : "Payment past due"}
                  </div>
                  <div className="mt-[2px] text-[11px] text-red-600">
                    {formatCurrency(contract.currentTerms?.principalAmount)} al {contract.currentTerms?.interestRate}%
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Alertas Dinamicas Multiples (Vencimiento < 35 dias) */}
          {maturingContracts.map(contract => {
            const daysLeft = Math.round((new Date(contract.currentTerms.maturityDate).getTime() - new Date().getTime()) / 86400000);
            return (
              <div key={`maturing-${contract.id}`} className="mb-[14px] overflow-hidden rounded-[10px] border border-[#e6ebf1] bg-white">
                <div className="flex items-center justify-between border-b border-[#e6ebf1] p-[14px_20px]">
                  <div className="text-[13px] font-[700] text-[#0a2540]">{d.alerts.maturityTitle}</div>
                </div>
                <div className="m-[0_20px_14px] mt-[14px] flex gap-[10px] rounded-[8px] border border-[#fcd34d] bg-[#fffbeb] p-[12px_14px]">
                  {AlertIcon}
                  <div>
                    <div className="text-[12px] font-[700] text-[#92400e]">
                      {d.alerts.maturityMsg
                        .replace("{address}", contract.property?.addressLine1 || "")
                        .replace("{days}", daysLeft.toString())
                        .replace("{date}", formatShortDate(contract.currentTerms.maturityDate))}
                    </div>
                    <div className="mt-[2px] text-[11px] text-[#b45309]">
                      {d.alerts.maturitySub
                        .replace("{amount}", formatCurrency(contract.currentTerms.principalAmount))
                        .replace("{rate}", contract.currentTerms.interestRate.toString())}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Prestamos Activos */}
          <div className="mb-[14px] overflow-hidden rounded-[10px] border border-[#e6ebf1] bg-white">
            <div className="flex items-center justify-between border-b border-[#e6ebf1] p-[14px_20px]">
              <div className="text-[13px] font-[700] text-[#0a2540]">{d.cards.activeLoans}</div>
              <Link href="/lenderDashboard/active-loans" className="cursor-pointer border-none bg-transparent font-sans text-[12px] font-[600] text-[#635bff] hover:underline">
                {d.cards.viewAll}
              </Link>
            </div>
            
            {activeContracts.length === 0 ? (
              <div className="p-6 text-center text-sm text-[#8898aa]">Sin prestamos activos.</div>
            ) : (
              activeContracts.slice(0, 3).map((contract) => {
                const terms = contract.currentTerms;
                const isPending = contract.status === "PENDING_ACCEPTANCE" || terms?.status !== "ACCEPTED";
                
                return (
                  <div key={contract.id} className="flex cursor-pointer items-center justify-between border-b border-[#f6f9fc] p-[12px_20px] transition-colors hover:bg-[#fafbfd] last:border-b-0">
                    <div>
                      <div className="text-[13px] font-[600] text-[#0a2540]">{contract.property?.addressLine1}</div>
                      <div className="mt-[2px] text-[11px] text-[#8898aa]">
                        {isEs ? "Plazo:" : "Term:"} {terms?.amortizationTermMonths} {isEs ? "meses" : "months"}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-[13px] font-[700] text-[#0a2540]">{formatCurrency(terms?.principalAmount)}</div>
                      <div className="text-[10px] text-[#aab7c4]">
                        {terms?.interestRate}% / {formatCurrency(terms?.calculatedMonthlyPayment)}/mo
                      </div>
                    </div>
                    <div className="text-right">
                      {isPending ? (
                        <div className="inline-block rounded-[10px] bg-[#fff8e1] px-[10px] py-[3px] text-[11px] font-[700] text-[#b45309]">
                          {d.badges.pending}
                        </div>
                      ) : (
                        <div className="inline-block rounded-[10px] bg-[#e8f5e9] px-[10px] py-[3px] text-[11px] font-[700] text-[#2e7d32]">
                          {d.badges.active}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div>
          {/* Proximos Pagos */}
          <div className="mb-[14px] overflow-hidden rounded-[10px] border border-[#e6ebf1] bg-white">
            <div className="flex items-center justify-between border-b border-[#e6ebf1] p-[14px_20px]">
              <div className="text-[13px] font-[700] text-[#0a2540]">{d.cards.upcomingPayments}</div>
              <Link href="/lenderDashboard/payments" className="cursor-pointer border-none bg-transparent font-sans text-[12px] font-[600] text-[#635bff] hover:underline">
                {d.cards.allPayments}
              </Link>
            </div>
            
            {upcomingPayments.length === 0 ? (
              <div className="p-6 text-center text-sm text-[#8898aa]">{isEs ? "No hay pagos programados." : "No upcoming payments."}</div>
            ) : (
              upcomingPayments.map((contract) => {
                const nextPayment = contract.nextPaymentDueDate;
                return (
                  <div key={`pay-${contract.id}`} className="flex items-center justify-between border-b border-[#f6f9fc] p-[10px_20px] last:border-b-0">
                    <div>
                      <div className="text-[12px] font-[600] text-[#0a2540]">{contract.property?.addressLine1}</div>
                      <div className="text-[11px] text-[#8898aa]">
                        {nextPayment ? `${isEs ? "Vence" : "Due"} ${formatShortDate(nextPayment)}` : "TBD"}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[13px] font-[700] text-[#2e7d32]">{formatCurrency(contract.currentTerms?.calculatedMonthlyPayment)}</div>
                      <div className="text-[10px] text-[#aab7c4]">{d.badges.pending}</div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Call To Action (Browse Deals) */}
          <div className="mb-[14px] overflow-hidden rounded-[10px] border border-[#e6ebf1] bg-white">
            <div className="m-[20px] rounded-[8px] border border-[#c7c4ff] bg-[#f0efff] p-[16px] text-center">
              <div className="mb-[6px] text-[13px] font-[700] text-[#635bff]">
                {d.browseCta.title.replace("{n}", newDealsCount.toString())}
              </div>
              <div className="mb-[12px] text-[12px] text-[#8898aa]">
                {d.browseCta.sub}
              </div>
              <Link href="/lenderDashboard/browse-deals" className="inline-block cursor-pointer rounded-[6px] border-none bg-[#635bff] px-[20px] py-[9px] font-sans text-[13px] font-[700] text-white transition-opacity hover:opacity-90">
                {d.browseCta.btn}
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}