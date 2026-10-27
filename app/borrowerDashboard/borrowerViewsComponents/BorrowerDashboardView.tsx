"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSite } from "@/app/components/layout/SiteShell";
import { API_ROUTES } from "@/app/lib/endpoints";
import { apiFetch, toList } from "@/app/lib/apiFetch";

export default function BorrowerDashboardView() {
  const { lang, t } = useSite();
  const isEs = lang === "es";

  const [user, setUser] = useState<any>(null);
  const [loanRequests, setLoanRequests] = useState<any[]>([]);
  const [contracts, setContracts] = useState<any[]>([]);
  const [upcomingPayments, setUpcomingPayments] = useState<any[]>([]);
  const [recentPayments, setRecentPayments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [score, setScore] = useState<number | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [entityData, setEntityData] = useState<any>(null); 

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        if (!localStorage.getItem("accessToken")) return;

        // 1. Fetch user & score
        const resUser = await apiFetch(API_ROUTES.auth.me);
        const jsonUser = await resUser.json();
        if (jsonUser.success && jsonUser.data.user) {
          setUser(jsonUser.data.user);
          if (jsonUser.data.borrowerProfile) {
            const bId = jsonUser.data.borrowerProfile.id;
            try {
              const [resRating, resVerif] = await Promise.all([
                apiFetch(`/api/borrowers/${bId}/rating`),
                apiFetch(`/api/borrowers/me/verification`)
              ]);
              
              if (resRating.ok) {
                const jsonRating = await resRating.json();
                if (jsonRating.success && jsonRating.data) {
                  // Convertimos el promedio (1-5) a un formato 0-100 para la UI
                  setScore(jsonRating.data.average ? Math.round(jsonRating.data.average * 20) : null);
                }
              }
              if (resVerif.ok) {
                const jsonVerif = await resVerif.json();
                if (jsonVerif.success && jsonVerif.data) {
                  setEntityData(jsonVerif.data); // Guardamos la entidad
                  if (jsonVerif.data.status === "APPROVED") {
                    setIsVerified(true);
                  }
                }
              }
            } catch (e) {
              console.error("Error fetching rating/verification", e);
            }
          }
        }

        // 2. Fetch loan requests
        const resLR = await apiFetch(API_ROUTES.borrowers.meLoanRequests);
        if (resLR.ok) {
          const jsonLR = await resLR.json();
          if (jsonLR.success) setLoanRequests(toList(jsonLR.data));
        }

        // 3. Fetch contracts, schedules and transactions
        const resContracts = await apiFetch(API_ROUTES.contracts.base);
        if (resContracts.ok) {
          const jsonContracts = await resContracts.json();
          if (jsonContracts.success) {
            const fetchedContracts = toList<any>(jsonContracts.data);
            setContracts(fetchedContracts);

            // Filtrar contratos activos para buscar sus pagos
            const activeContracts = fetchedContracts.filter(
              (c: any) => c.status === "ACTIVE" || c.status === "DELINQUENT"
            );
            
            let allUpcoming: any[] = [];
            let allRecent: any[] = [];

            // Obtener cronograma y transacciones por cada contrato activo
            for (const contract of activeContracts) {
              // Proximos pagos (Schedule)
              const resSched = await apiFetch(API_ROUTES.contracts.schedule(contract.id));
              if (resSched.ok) {
                const jsonSched = await resSched.json();
                if (jsonSched.success) {
                  const schedule = jsonSched.data || [];
                  const pending = schedule.filter((p: any) => p.status === "PENDING" || p.status === "PARTIALLY_PAID");
                  pending.forEach((p: any) => allUpcoming.push({ ...p, contract }));
                }
              }

              // Pagos recientes (Transactions)
              const resTrans = await apiFetch(API_ROUTES.contracts.transactions(contract.id));
              if (resTrans.ok) {
                const jsonTrans = await resTrans.json();
                if (jsonTrans.success) {
                  const transactions = jsonTrans.data.items || [];
                  transactions.forEach((t: any) => {
                    allRecent.push({
                      ...t,
                      contract,
                      dueDate: t.occurredAt || t.createdAt, // Usamos la fecha en la que ocurrio
                      totalDue: t.amount // Adaptamos la propiedad para que la UI la lea correctamente
                    });
                  });
                }
              }
            }

            // Ordenar los resultados por fecha
            allUpcoming.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
            allRecent.sort((a, b) => new Date(b.occurredAt || b.createdAt).getTime() - new Date(a.occurredAt || a.createdAt).getTime());

            // Mostrar solo los 3 mas relevantes en el dashboard
            setUpcomingPayments(allUpcoming.slice(0, 3));
            setRecentPayments(allRecent.slice(0, 3));
          }
        }

      } catch (error) {
        console.error("Error fetching dashboard data", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDashboardData();
  }, []);

  // Formaters
  const formatCurrency = (val: any) => {
    const num = parseFloat(val);
    if (isNaN(num)) return "$0";
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(num);
  };

  const formatCurrencyCompact = (val: any) => {
    const num = parseFloat(val);
    if (isNaN(num)) return "$0";
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", notation: "compact", maximumFractionDigits: 1 }).format(num);
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString(isEs ? "es-MX" : "en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
  };

  // KPIs Calculations
  const closedContracts = contracts.filter((c) => c.status === "PAID_OFF");
  const activeContracts = contracts.filter((c) => c.status === "ACTIVE" || c.status === "DELINQUENT");
  const totalBorrowed = contracts.reduce((acc, curr) => {
    if (["ACTIVE", "DELINQUENT", "PAID_OFF"].includes(curr.status)) {
      return acc + parseFloat(curr.currentTerms?.principalAmount || 0);
    }
    return acc;
  }, 0);

  // Helper to render dynamic Deal Progress Bar
  const renderProgressBar = (type: "request" | "contract", status: string) => {
    let step = 1;
    if (type === "request") {
      if (status === "PUBLISHED") step = 2;
      if (status === "MATCHED") step = 3;
    } else {
      if (status === "DRAFT") step = 3;
      if (status === "PENDING_ACCEPTANCE") step = 4;
      if (status === "ACTIVE" || status === "DELINQUENT") step = 5;
      if (status === "PAID_OFF") step = 6;
    }

    const Circle = ({ sNum, label }: { sNum: number; label: string }) => {
      const isPast = step > sNum;
      const isActive = step === sNum;
      if (isPast) {
        return (
          <div className="flex flex-col items-center gap-[3px]">
            <div className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full border-[2px] border-success bg-success text-[9px] font-[700] text-white">✓</div>
            <div className="whitespace-nowrap text-[9px] text-success">{label}</div>
          </div>
        );
      }
      if (isActive) {
        return (
          <div className="flex flex-col items-center gap-[3px]">
            <div className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full border-[2px] border-accent bg-accent text-[9px] font-[700] text-white shadow-[0_0_0_3px_rgba(99,91,255,0.15)]">{sNum}</div>
            <div className="whitespace-nowrap text-[9px] font-[700] text-accent">{label}</div>
          </div>
        );
      }
      return (
        <div className="flex flex-col items-center gap-[3px]">
          <div className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full border-[2px] border-rule bg-surface text-[9px] font-[700] text-ink-3">{sNum}</div>
          <div className="whitespace-nowrap text-[9px] text-ink-3">{label}</div>
        </div>
      );
    };

    const Line = ({ sNum }: { sNum: number }) => (
      <div className={`h-[2px] min-w-[12px] flex-1 ${step > sNum ? "bg-success" : "bg-rule"}`}></div>
    );

    return (
      <div className="flex items-center gap-0">
        <Circle sNum={1} label="Posted" />
        <Line sNum={1} />
        <Circle sNum={2} label="Offer" />
        <Line sNum={2} />
        <Circle sNum={3} label="Accepted" />
        <Line sNum={3} />
        <Circle sNum={4} label="Closing" />
        <Line sNum={4} />
        <Circle sNum={5} label="Funded" />
      </div>
    );
  };

  if (isLoading) {
    return <div className="p-10 text-[14px] text-ink-3">{isEs ? "Cargando panel..." : "Loading dashboard..."}</div>;
  }

  return (
    <div className="animate-in fade-in duration-300">
      {/* Borrower Score / KPIs */}
      <div className="mb-[24px] flex flex-wrap items-center gap-[28px] rounded-[12px] bg-brand-dark p-[24px_28px]">
        <div className="flex h-[80px] w-[80px] shrink-0 flex-col items-center justify-center rounded-full border-[4px] border-accent bg-accent/20">
          <div className="leading-none text-[26px] font-[800] text-white">{score !== null ? score : "--"}</div>
          <div className="mt-[2px] text-[9px] font-[700] uppercase tracking-[0.5px] text-accent">Score</div>
        </div>
        <div className="flex flex-1 flex-wrap gap-[24px]">
          <div>
            <div className="text-[22px] font-[800] tracking-[-0.5px] text-white">{closedContracts.length}</div>
            <div className="mt-[2px] text-[11px] text-white/60">{isEs ? "Tratos cerrados" : "Deals closed"}</div>
          </div>
          <div>
            <div className="text-[22px] font-[800] tracking-[-0.5px] text-white">{formatCurrencyCompact(totalBorrowed)}</div>
            <div className="mt-[2px] text-[11px] text-white/60">{isEs ? "Total pedido" : "Total borrowed"}</div>
          </div>
          <div>
            <div className="text-[22px] font-[800] tracking-[-0.5px] text-white">100%</div>
            <div className="mt-[2px] text-[11px] text-white/60">{isEs ? "Pagos a tiempo" : "On-time payments"}</div>
          </div>
          <div>
            <div className="text-[22px] font-[800] tracking-[-0.5px] text-white">{activeContracts.length}</div>
            <div className="mt-[2px] text-[11px] text-white/60">{isEs ? "Préstamos activos" : "Active loans"}</div>
          </div>
        </div>
        <div className="ml-auto flex flex-col items-end gap-[6px]">
          {/* Mostramos la fecha de creacion usando la funcion formatDate existente */}
          {user?.createdAt && (
            <div className="text-[13px] font-[600] text-ink-3 mb-1">
              {isEs ? "Miembro desde" : "Member since"} {formatDate(user.createdAt)}
            </div>
          )}
          {isVerified ? (
            <div className="inline-flex items-center gap-[5px] rounded-[10px] bg-success/20 px-[10px] py-[4px] text-[11px] font-[700] text-green-400">
              {isEs ? "Negocio verificado" : "Business verified"}
            </div>
          ) : (
            <div className="inline-flex items-center gap-[5px] rounded-[10px] bg-rule-strong/20 px-[10px] py-[4px] text-[11px] font-[700] text-ink-3">
              {isEs ? "Negocio no verificado" : "Business unverified"}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Primary CTA banner */}
          <div className="mb-[24px] flex flex-wrap items-center justify-between gap-[20px] rounded-[10px] border-[1.5px] border-rule-strong bg-accent-soft p-[24px_28px]">
            <div>
              <div className="mb-[4px] text-[15px] font-[800] text-ink">{isEs ? " Listo para encontrar prestamista?" : "Ready to find a lender?"}</div>
              <div className="leading-[1.6] text-[13px] text-ink-2">
                {isEs ? "Ingresa una direcci n. Obtenemos los comparables, calculamos el ARV y armamos tu trato   listo para presentar en minutos." : "Enter a property address. We pull the comps, calculate ARV, and format your deal   ready to pitch to lenders in minutes."}
              </div>
            </div>
            <Link href="/submit-deal" className="shrink-0 whitespace-nowrap rounded-[6px] bg-accent px-[24px] py-[12px] text-[13px] font-[800] text-white no-underline transition-colors hover:opacity-90">
              {isEs ? "Analizar y Publicar" : "Analyze & Post a Deal"}
            </Link>
          </div>

          {/* Seccion de Resumen (Entidad, Business, Credit) */}
          <div className="mb-[24px] grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Tarjeta Entidad */}
            <div className="rounded-[10px] border border-rule bg-surface p-[20px] shadow-sm">
              <div className="text-[13px] font-[800] text-ink mb-3">{t.dashboardBorrower.summaryCards?.entity.title}</div>
              {entityData ? (
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-[12px]"><span className="text-ink-3">{t.dashboardBorrower.summaryCards?.entity.name}</span><span className="font-semibold text-ink">{entityData.entityName}</span></div>
                  <div className="flex justify-between text-[12px]"><span className="text-ink-3">{t.dashboardBorrower.summaryCards?.entity.type}</span><span className="font-semibold text-ink">{entityData.entityType}</span></div>
                  <div className="flex justify-between text-[12px]"><span className="text-ink-3">{t.dashboardBorrower.summaryCards?.entity.ein}</span><span className="font-semibold text-ink">{entityData.ein || "N/D"}</span></div>
                  <div className="flex justify-between text-[12px]"><span className="text-ink-3">{t.dashboardBorrower.summaryCards?.entity.state}</span><span className="font-semibold text-ink">{entityData.stateOfFormation || "N/D"}</span></div>
                </div>
              ) : (
                <div className="text-[12px] text-ink-3 italic">{t.dashboardBorrower.summaryCards?.entity.unverified}</div>
              )}
            </div>

            {/* Tarjeta Business Score */}
            <div className="rounded-[10px] border border-rule bg-surface p-[20px] shadow-sm">
              <div className="text-[13px] font-[800] text-ink mb-3">{t.dashboardBorrower.summaryCards?.businessScore.title}</div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-[12px]"><span className="text-ink-3">Score</span><span className="font-bold text-accent">{score !== null ? score : "--"}</span></div>
                <div className="flex justify-between text-[12px]"><span className="text-ink-3">{t.dashboardBorrower.summaryCards?.businessScore.deals}</span><span className="font-semibold text-ink">{closedContracts.length}</span></div>
                <div className="flex justify-between text-[12px]"><span className="text-ink-3">{t.dashboardBorrower.summaryCards?.businessScore.onTime}</span><span className="font-semibold text-ink">100%</span></div>
                <div className="flex justify-between text-[12px]"><span className="text-ink-3">{t.dashboardBorrower.summaryCards?.businessScore.volume}</span><span className="font-semibold text-ink">{formatCurrencyCompact(totalBorrowed)}</span></div>
              </div>
            </div>

            {/* Tarjeta Credit Score (Placeholder por limitacion de API) */}
            <div className="rounded-[10px] border border-rule bg-surface p-[20px] shadow-sm flex flex-col">
              <div className="text-[13px] font-[800] text-ink mb-3">{t.dashboardBorrower.summaryCards?.creditScore.title}</div>
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex justify-between text-[12px]"><span className="text-ink-3">{t.dashboardBorrower.summaryCards?.creditScore.score}</span><span className="font-bold text-ink-3">---</span></div>
                <div className="flex justify-between text-[12px]"><span className="text-ink-3">{t.dashboardBorrower.summaryCards?.creditScore.status}</span><span className="font-semibold text-amber">{t.dashboardBorrower.summaryCards?.creditScore.pending}</span></div>
              </div>
              <div className="mt-auto pt-3 border-t border-rule">
                <button className="text-[11px] font-[600] text-accent hover:underline cursor-pointer w-full text-left">
                  {isEs ? "Vincular reporte" : "Link report"} &rarr;
                </button>
              </div>
            </div>
          </div>

      {/* Payments section */}
      <div className="mb-[12px] mt-[24px] flex items-center justify-between">
        <div className="text-[14px] font-[800] text-ink">{isEs ? "Pagos" : "Payments"}</div>
        <Link href="/borrowerDashboard/payments" className="cursor-pointer border-none bg-transparent font-sans text-[12px] font-[600] text-accent hover:underline no-underline">
          {isEs ? "Ver calendario completo" : "View full schedule"}
        </Link>
      </div>

      <div className="overflow-hidden rounded-[10px] border border-rule bg-surface">
        <div className="border-b border-rule bg-surface-2 p-[12px_18px_8px] text-[10px] font-[700] uppercase tracking-[0.6px] text-ink-3">
          {isEs ? "Próximos" : "Upcoming"}
        </div>
        {upcomingPayments.length === 0 ? (
          <div className="p-6 text-center text-[13px] text-ink-3">{isEs ? "No hay pagos pendientes próximos." : "No upcoming pending payments."}</div>
        ) : (
          upcomingPayments.map((payment, idx) => (
            <div key={idx} className="flex items-center gap-[12px] border-b border-rule p-[12px_18px] transition-colors hover:bg-surface-2">
              <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[8px] bg-amber-soft">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="2" y="4" width="12" height="9" rx="1.5" stroke="currentColor" className="text-amber" strokeWidth="1.3"/><path d="M2 7h12" stroke="currentColor" className="text-amber" strokeWidth="1.3"/></svg>
              </div>
              <div className="flex-1">
                <div className="text-[13px] font-[700] text-ink">{payment.contract?.property?.addressLine1}</div>
                <div className="mt-[1px] text-[11px] text-ink-3">{payment.contract?.lenderCompany?.companyName || "Lender"} • {payment.contract?.currentTerms?.interestRate}%</div>
              </div>
              <div className="min-w-[70px] text-center">
                <div className="text-[10px] font-[700] uppercase tracking-[0.4px] text-ink-3">Due</div>
                <div className="mt-[1px] text-[12px] font-[600] text-ink">{formatDate(payment.dueDate)}</div>
              </div>
              <div className="min-w-[60px] text-right text-[15px] font-[800] text-amber">{formatCurrency(payment.totalDue)}</div>
              <button className="shrink-0 cursor-pointer whitespace-nowrap rounded-[5px] border-none bg-accent p-[6px_14px] font-sans text-[11px] font-[700] text-white transition-colors hover:opacity-90">
                {isEs ? "Registrar pago" : "Log payment"}
              </button>
            </div>
          ))
        )}
      </div>

      <div className="mt-[12px] overflow-hidden rounded-[10px] border border-rule bg-surface">
        <div className="border-b border-rule bg-surface-2 p-[12px_18px_8px] text-[10px] font-[700] uppercase tracking-[0.6px] text-ink-3">
          {isEs ? "Pagos recientes" : "Recent payments"}
        </div>
        {recentPayments.length === 0 ? (
          <div className="p-6 text-center text-[13px] text-ink-3">{isEs ? "No hay historial de pagos recientes." : "No recent payment history."}</div>
        ) : (
          recentPayments.map((payment, idx) => (
            <div key={idx} className="flex items-center gap-[12px] border-b border-rule p-[12px_18px] transition-colors hover:bg-surface-2">
              <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[8px] bg-success-soft">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8l4 4 6-6" stroke="currentColor" className="text-success" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div className="flex-1">
                <div className="text-[13px] font-[700] text-ink">{payment.contract?.property?.addressLine1}</div>
                <div className="mt-[1px] text-[11px] text-ink-3">{payment.contract?.lenderCompany?.companyName || "Lender"} • {formatDate(payment.dueDate)}</div>
              </div>
              <div className="min-w-[70px] text-center">
                <div className="text-[10px] font-[700] uppercase tracking-[0.4px] text-ink-3">Paid</div>
                <div className="mt-[1px] text-[12px] font-[600] text-ink">{formatDate(payment.dueDate)}</div>
              </div>
              <div className="min-w-[60px] text-right text-[15px] font-[800] text-success">{formatCurrency(payment.totalDue)}</div>
              <div className="shrink-0 rounded-[8px] bg-success-soft px-[10px] py-[3px] text-[11px] font-[700] text-success">{isEs ? "Pagado" : "Paid"}</div>
            </div>
          ))
          )}
        </div>
      </div>

      {/* Lateral Derecho (Sidebar Widgets) */}
      <div className="lg:col-span-1 space-y-4">
        {/* Widget 1: Education and Training */}
        <div className="flex cursor-pointer flex-col justify-center rounded-[10px] border border-rule bg-surface p-[20px] transition-all hover:border-accent hover:shadow-md dark:hover:border-ink-3">
          <div className="mb-[10px] flex h-[44px] w-[44px] items-center justify-center rounded-[10px] bg-accent-soft text-accent">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
          </div>
          <div className="text-[14px] font-[800] text-ink">{t.dashboardBorrower.widgets?.education.title || "Educacion y Capacitacion"}</div>
          <div className="mt-[4px] text-[12px] leading-[1.5] text-ink-2">{t.dashboardBorrower.widgets?.education.sub || "Aprende mejores practicas y estrategias."}</div>
        </div>

        {/* Widget 2: Refi */}
        <div className="flex cursor-pointer flex-col justify-center rounded-[10px] border border-rule bg-surface p-[20px] transition-all hover:border-success hover:shadow-md dark:hover:border-ink-3">
          <div className="mb-[10px] flex h-[44px] w-[44px] items-center justify-center rounded-[10px] bg-success-soft text-success">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
          <div className="text-[14px] font-[800] text-ink">{t.dashboardBorrower.widgets?.refi.title || " Listo para refinanciar?"}</div>
          <div className="mt-[4px] text-[12px] leading-[1.5] text-ink-2">{t.dashboardBorrower.widgets?.refi.sub || "Obten una cotizacion en minutos."}</div>
        </div>

        {/* Widget 3: Insurance */}
        <div className="flex cursor-pointer flex-col justify-center rounded-[10px] border border-rule bg-surface p-[20px] transition-all hover:border-amber hover:shadow-md dark:hover:border-ink-3">
          <div className="mb-[10px] flex h-[44px] w-[44px] items-center justify-center rounded-[10px] bg-amber-soft text-amber">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <div className="text-[14px] font-[800] text-ink">{t.dashboardBorrower.widgets?.insurance.title || " Necesitas seguro?"}</div>
          <div className="mt-[4px] text-[12px] leading-[1.5] text-ink-2">{t.dashboardBorrower.widgets?.insurance.sub || "Obten una cotizacion al instante."}</div>
        </div>
      </div>
      
    </div>
    </div>
  );
}