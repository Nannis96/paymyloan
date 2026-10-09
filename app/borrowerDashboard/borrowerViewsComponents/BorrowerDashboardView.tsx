"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSite } from "@/app/components/layout/SiteShell";
import { API_ROUTES } from "@/app/lib/endpoints";

export default function BorrowerDashboardView() {
  const { lang, t } = useSite();
  const isEs = lang === "es";

  const [user, setUser] = useState<any>(null);
  const [loanRequests, setLoanRequests] = useState<any[]>([]);
  const [contracts, setContracts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) return;
        
        const headers = { Authorization: `Bearer ${token}` };

        // 1. Fetch user
        const resUser = await fetch(API_ROUTES.auth.me, { headers });
        const jsonUser = await resUser.json();
        if (jsonUser.success && jsonUser.data.user) {
          setUser(jsonUser.data.user);
        }

        // 2. Fetch loan requests
        const resLR = await fetch(API_ROUTES.borrowers.meLoanRequests, { headers });
        if (resLR.ok) {
          const jsonLR = await resLR.json();
          if (jsonLR.success) setLoanRequests(jsonLR.data.items || []);
        }

        // 3. Fetch contracts
        const resContracts = await fetch(API_ROUTES.contracts.base, { headers });
        if (resContracts.ok) {
          const jsonContracts = await resContracts.json();
          if (jsonContracts.success) setContracts(jsonContracts.data.items || []);
        }

      } catch (error) {
        console.error("Error fetching dashboard data", error);
      }
    }
    fetchDashboardData();
  }, []);

  return (
    <div className="animate-in fade-in duration-300">
      
      {/* Borrower Score */}
      <div className="mb-[24px] flex flex-wrap items-center gap-[28px] rounded-[12px] bg-brand-dark p-[24px_28px]">
        <div className="flex h-[80px] w-[80px] shrink-0 flex-col items-center justify-center rounded-full border-[4px] border-accent bg-accent/20">
          <div className="leading-none text-[26px] font-[800] text-white">82</div>
          <div className="mt-[2px] text-[9px] font-[700] uppercase tracking-[0.5px] text-accent">Score</div>
        </div>
        <div className="flex flex-1 flex-wrap gap-[24px]">
          <div>
            <div className="text-[22px] font-[800] tracking-[-0.5px] text-white">7</div>
            <div className="mt-[2px] text-[11px] text-white/60">{isEs ? "Tratos cerrados" : "Deals closed"}</div>
          </div>
          <div>
            <div className="text-[22px] font-[800] tracking-[-0.5px] text-white">$680K</div>
            <div className="mt-[2px] text-[11px] text-white/60">{isEs ? "Total pedido" : "Total borrowed"}</div>
          </div>
          <div>
            <div className="text-[22px] font-[800] tracking-[-0.5px] text-white">100%</div>
            <div className="mt-[2px] text-[11px] text-white/60">{isEs ? "Pagos a tiempo" : "On-time payments"}</div>
          </div>
          <div>
            <div className="text-[22px] font-[800] tracking-[-0.5px] text-white">3</div>
            <div className="mt-[2px] text-[11px] text-white/60">{isEs ? "Préstamos activos" : "Active loans"}</div>
          </div>
        </div>
        <div className="ml-auto flex flex-col gap-[6px]">
          <div className="inline-flex items-center gap-[5px] rounded-[10px] bg-success/20 px-[10px] py-[4px] text-[11px] font-[700] text-green-400">
            {isEs ? "Negocio verificado" : "Business verified"}
          </div>
          <div className="inline-flex items-center gap-[5px] rounded-[10px] bg-accent/30 px-[10px] py-[4px] text-[11px] font-[700] text-brand-purple">
            {isEs ? "Identidad verificada" : "Identity verified"}
          </div>
        </div>
      </div>

      {/* Offer waiting alert */}
      <div className="mb-[10px] flex items-center justify-between rounded-[7px] border border-rule-strong bg-accent-soft p-[10px_14px]">
        <div>
          <div className="text-[12px] font-[600] text-accent">{isEs ? "Nueva oferta en 3802 University Cove" : "New offer on 3802 University Cove"}</div>
          <div className="mt-[1px] text-[11px] text-ink-3">Moore Capital LLC · $115,000 · 12% · 12 {isEs ? "meses" : "months"}</div>
        </div>
        <div className="flex shrink-0 gap-[6px]">
          <button className="cursor-pointer rounded-[5px] border-none bg-accent px-[12px] py-[6px] font-sans text-[11px] font-[700] text-white transition-colors hover:opacity-90">{isEs ? "Revisar" : "Review"}</button>
          <button className="cursor-pointer rounded-[5px] border border-rule-strong bg-surface px-[12px] py-[6px] font-sans text-[11px] font-[700] text-accent transition-colors hover:bg-surface-2">{isEs ? "Descartar" : "Dismiss"}</button>
        </div>
      </div>

      {/* Primary CTA banner */}
      <div className="mb-[20px] flex flex-wrap items-center justify-between gap-[20px] rounded-[10px] border-[1.5px] border-rule-strong bg-accent-soft p-[24px_28px]">
        <div>
          <div className="mb-[4px] text-[15px] font-[800] text-ink">{isEs ? "¿Listo para encontrar prestamista?" : "Ready to find a lender?"}</div>
          <div className="leading-[1.6] text-[13px] text-ink-2">
            {isEs ? "Ingresa una dirección. Obtenemos los comparables, calculamos el ARV y armamos tu trato — listo para presentar en minutos." : "Enter a property address. We pull the comps, calculate ARV, and format your deal — ready to pitch to lenders in minutes."}
          </div>
        </div>
        <Link href="/submit-deal" className="shrink-0 whitespace-nowrap rounded-[6px] bg-accent px-[24px] py-[12px] text-[13px] font-[800] text-white no-underline transition-colors hover:opacity-90">
          {isEs ? "Analizar y Publicar" : "Analyze & Post a Deal"}
        </Link>
      </div>

      {/* Active deals */}
      <div className="mb-[12px] flex items-center justify-between">
        <div className="text-[14px] font-[800] text-ink">{isEs ? "Mis tratos" : "My deals"}</div>
        <button className="cursor-pointer border-none bg-transparent font-sans text-[12px] font-[600] text-accent hover:underline">{isEs ? "Ver todos" : "View all"}</button>
      </div>

      <div className="mb-[10px] cursor-pointer rounded-[10px] border border-rule bg-surface p-[16px_20px] transition-shadow hover:shadow-md dark:hover:shadow-none dark:hover:border-ink-3">
        <div className="mb-[10px] flex items-start justify-between">
          <div>
            <div className="text-[14px] font-[700] text-ink">3802 University Cove, Memphis TN</div>
            <div className="mt-[2px] text-[12px] text-ink-3">Bridge · $115K requested · Posted Sept 18</div>
          </div>
          <span className="rounded-[10px] bg-accent-soft px-[10px] py-[3px] text-[11px] font-[700] text-accent">{isEs ? "Oferta recibida" : "Offer received"}</span>
        </div>
        <div className="mb-[12px] flex flex-wrap gap-[20px]">
          <div><div className="text-[10px] font-[700] uppercase tracking-[0.4px] text-ink-3">Loan</div><div className="mt-[1px] text-[13px] font-[700] text-ink">$115,000</div></div>
          <div><div className="text-[10px] font-[700] uppercase tracking-[0.4px] text-ink-3">ARV</div><div className="mt-[1px] text-[13px] font-[700] text-ink">$165,000</div></div>
          <div><div className="text-[10px] font-[700] uppercase tracking-[0.4px] text-ink-3">LTV</div><div className="mt-[1px] text-[13px] font-[700] text-ink">66.7%</div></div>
          <div><div className="text-[10px] font-[700] uppercase tracking-[0.4px] text-ink-3">Offers</div><div className="mt-[1px] text-[13px] font-[700] text-ink">1</div></div>
        </div>
        <div className="flex items-center gap-0">
          <div className="flex flex-col items-center gap-[3px]"><div className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full border-[2px] border-success bg-success text-[9px] font-[700] text-white">✓</div><div className="whitespace-nowrap text-[9px] text-success">Posted</div></div>
          <div className="h-[2px] min-w-[12px] flex-1 bg-success"></div>
          <div className="flex flex-col items-center gap-[3px]"><div className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full border-[2px] border-accent bg-accent text-[9px] font-[700] text-white shadow-[0_0_0_3px_rgba(99,91,255,0.15)]">2</div><div className="whitespace-nowrap text-[9px] font-[700] text-accent">Offer in</div></div>
          <div className="h-[2px] min-w-[12px] flex-1 bg-rule"></div>
          <div className="flex flex-col items-center gap-[3px]"><div className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full border-[2px] border-rule bg-surface text-[9px] font-[700] text-ink-3">3</div><div className="whitespace-nowrap text-[9px] text-ink-3">Accepted</div></div>
          <div className="h-[2px] min-w-[12px] flex-1 bg-rule"></div>
          <div className="flex flex-col items-center gap-[3px]"><div className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full border-[2px] border-rule bg-surface text-[9px] font-[700] text-ink-3">4</div><div className="whitespace-nowrap text-[9px] text-ink-3">Closing</div></div>
          <div className="h-[2px] min-w-[12px] flex-1 bg-rule"></div>
          <div className="flex flex-col items-center gap-[3px]"><div className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full border-[2px] border-rule bg-surface text-[9px] font-[700] text-ink-3">5</div><div className="whitespace-nowrap text-[9px] text-ink-3">Funded</div></div>
        </div>
        <div className="mt-[16px] flex justify-end border-t border-rule pt-[12px]">
          <button disabled className="cursor-not-allowed rounded-[6px] border border-rule-strong bg-surface-2 px-[14px] py-[6px] text-[12px] font-[600] text-ink-3">
            {t.dashboardBorrower.actions.rateLender}
          </button>
        </div>
      </div>

      <div className="mb-[10px] cursor-pointer rounded-[10px] border border-rule bg-surface p-[16px_20px] transition-shadow hover:shadow-md dark:hover:shadow-none dark:hover:border-ink-3">
        <div className="mb-[10px] flex items-start justify-between">
          <div>
            <div className="text-[14px] font-[700] text-ink">1144 Oakwood Dr, Memphis TN</div>
            <div className="mt-[2px] text-[12px] text-ink-3">Bridge · $95K · Funded Aug 3, 2026</div>
          </div>
          <span className="rounded-[10px] bg-info-soft px-[10px] py-[3px] text-[11px] font-[700] text-info">{isEs ? "Préstamo activo" : "Loan active"}</span>
        </div>
        <div className="mb-[12px] flex flex-wrap gap-[20px]">
          <div><div className="text-[10px] font-[700] uppercase tracking-[0.4px] text-ink-3">Loan</div><div className="mt-[1px] text-[13px] font-[700] text-ink">$95,000</div></div>
          <div><div className="text-[10px] font-[700] uppercase tracking-[0.4px] text-ink-3">Rate</div><div className="mt-[1px] text-[13px] font-[700] text-ink">12%</div></div>
          <div><div className="text-[10px] font-[700] uppercase tracking-[0.4px] text-ink-3">Monthly</div><div className="mt-[1px] text-[13px] font-[700] text-ink">$950</div></div>
          <div><div className="text-[10px] font-[700] uppercase tracking-[0.4px] text-ink-3">Matures</div><div className="mt-[1px] text-[13px] font-[700] text-ink">Aug 3, 2027</div></div>
        </div>
        <div className="flex items-center gap-0">
          <div className="flex flex-col items-center gap-[3px]"><div className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full border-[2px] border-success bg-success text-[9px] font-[700] text-white">✓</div><div className="whitespace-nowrap text-[9px] text-success">Posted</div></div>
          <div className="h-[2px] min-w-[12px] flex-1 bg-success"></div>
          <div className="flex flex-col items-center gap-[3px]"><div className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full border-[2px] border-success bg-success text-[9px] font-[700] text-white">✓</div><div className="whitespace-nowrap text-[9px] text-success">Offer</div></div>
          <div className="h-[2px] min-w-[12px] flex-1 bg-success"></div>
          <div className="flex flex-col items-center gap-[3px]"><div className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full border-[2px] border-success bg-success text-[9px] font-[700] text-white">✓</div><div className="whitespace-nowrap text-[9px] text-success">Accepted</div></div>
          <div className="h-[2px] min-w-[12px] flex-1 bg-success"></div>
          <div className="flex flex-col items-center gap-[3px]"><div className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full border-[2px] border-success bg-success text-[9px] font-[700] text-white">✓</div><div className="whitespace-nowrap text-[9px] text-success">Closing</div></div>
          <div className="h-[2px] min-w-[12px] flex-1 bg-success"></div>
          <div className="flex flex-col items-center gap-[3px]"><div className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full border-[2px] border-success bg-success text-[9px] font-[700] text-white">✓</div><div className="whitespace-nowrap text-[9px] text-success">Funded</div></div>
        </div>
        <div className="mt-[16px] flex justify-end border-t border-rule pt-[12px]">
          <Link href="/borrowerDashboard/leave-a-review" className="cursor-pointer rounded-[6px] bg-accent px-[14px] py-[6px] text-[12px] font-[600] text-white no-underline transition-colors hover:bg-blue-700">
            {t.dashboardBorrower.actions.rateLender}
          </Link>
        </div>
      </div>

      <div className="mb-[10px] cursor-pointer rounded-[10px] border border-rule bg-surface p-[16px_20px] transition-shadow hover:shadow-md dark:hover:shadow-none dark:hover:border-ink-3">        <div className="mb-[10px] flex items-start justify-between">
          <div>
            <div className="text-[14px] font-[700] text-ink">4215 Raleigh Ave, Memphis TN</div>
            <div className="mt-[2px] text-[12px] text-ink-3">Bridge · $75K requested · Posted Sept 20</div>
          </div>
          <span className="rounded-[10px] bg-amber-soft px-[10px] py-[3px] text-[11px] font-[700] text-amber">{isEs ? "Esperando ofertas" : "Awaiting offers"}</span>
        </div>
        <div className="mb-[12px] flex flex-wrap gap-[20px]">
          <div><div className="text-[10px] font-[700] uppercase tracking-[0.4px] text-ink-3">Loan</div><div className="mt-[1px] text-[13px] font-[700] text-ink">$75,000</div></div>
          <div><div className="text-[10px] font-[700] uppercase tracking-[0.4px] text-ink-3">ARV</div><div className="mt-[1px] text-[13px] font-[700] text-ink">$120,000</div></div>
          <div><div className="text-[10px] font-[700] uppercase tracking-[0.4px] text-ink-3">LTV</div><div className="mt-[1px] text-[13px] font-[700] text-ink">62.5%</div></div>
          <div><div className="text-[10px] font-[700] uppercase tracking-[0.4px] text-ink-3">Offers</div><div className="mt-[1px] text-[13px] font-[700] text-ink">0</div></div>
        </div>
        <div className="flex items-center gap-0">
          <div className="flex flex-col items-center gap-[3px]"><div className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full border-[2px] border-success bg-success text-[9px] font-[700] text-white">✓</div><div className="whitespace-nowrap text-[9px] text-success">Posted</div></div>
          <div className="h-[2px] min-w-[12px] flex-1 bg-rule"></div>
          <div className="flex flex-col items-center gap-[3px]"><div className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full border-[2px] border-accent bg-accent text-[9px] font-[700] text-white shadow-[0_0_0_3px_rgba(99,91,255,0.15)]">2</div><div className="whitespace-nowrap text-[9px] font-[700] text-accent">Awaiting offer</div></div>
          <div className="h-[2px] min-w-[12px] flex-1 bg-rule"></div>
          <div className="flex flex-col items-center gap-[3px]"><div className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full border-[2px] border-rule bg-surface text-[9px] font-[700] text-ink-3">3</div><div className="whitespace-nowrap text-[9px] text-ink-3">Accepted</div></div>
          <div className="h-[2px] min-w-[12px] flex-1 bg-rule"></div>
          <div className="flex flex-col items-center gap-[3px]"><div className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full border-[2px] border-rule bg-surface text-[9px] font-[700] text-ink-3">4</div><div className="whitespace-nowrap text-[9px] text-ink-3">Closing</div></div>
          <div className="h-[2px] min-w-[12px] flex-1 bg-rule"></div>
          <div className="flex flex-col items-center gap-[3px]"><div className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full border-[2px] border-rule bg-surface text-[9px] font-[700] text-ink-3">5</div><div className="whitespace-nowrap text-[9px] text-ink-3">Funded</div></div>
        </div>
        <div className="mt-[16px] flex justify-end border-t border-rule pt-[12px]">
          <button disabled className="cursor-not-allowed rounded-[6px] border border-rule-strong bg-surface-2 px-[14px] py-[6px] text-[12px] font-[600] text-ink-3">
            {t.dashboardBorrower.actions.rateLender}
          </button>
        </div>
      </div>

      {/* Payments section */}
      <div className="mb-[12px] mt-[24px] flex items-center justify-between">
        <div className="text-[14px] font-[800] text-ink">{isEs ? "Pagos" : "Payments"}</div>
        <button className="cursor-pointer border-none bg-transparent font-sans text-[12px] font-[600] text-accent hover:underline">{isEs ? "Ver calendario completo" : "View full schedule"}</button>
      </div>

      <div className="overflow-hidden rounded-[10px] border border-rule bg-surface">
        <div className="border-b border-rule bg-surface-2 p-[12px_18px_8px] text-[10px] font-[700] uppercase tracking-[0.6px] text-ink-3">
          {isEs ? "Próximos" : "Upcoming"}
        </div>
        <div className="flex items-center gap-[12px] border-b border-rule p-[12px_18px] transition-colors hover:bg-surface-2">
          <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[8px] bg-amber-soft">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="2" y="4" width="12" height="9" rx="1.5" stroke="currentColor" className="text-amber" strokeWidth="1.3"/><path d="M2 7h12" stroke="currentColor" className="text-amber" strokeWidth="1.3"/></svg>
          </div>
          <div className="flex-1">
            <div className="text-[13px] font-[700] text-ink">1144 Oakwood Dr</div>
            <div className="mt-[1px] text-[11px] text-ink-3">Moore Capital LLC · 12%</div>
          </div>
          <div className="min-w-[70px] text-center">
            <div className="text-[10px] font-[700] uppercase tracking-[0.4px] text-ink-3">Due</div>
            <div className="mt-[1px] text-[12px] font-[600] text-ink">Oct 1, 2026</div>
          </div>
          <div className="min-w-[60px] text-right text-[15px] font-[800] text-amber">$950</div>
          <button className="shrink-0 cursor-pointer whitespace-nowrap rounded-[5px] border-none bg-accent p-[6px_14px] font-sans text-[11px] font-[700] text-white transition-colors hover:opacity-90">
            {isEs ? "Registrar pago" : "Log payment"}
          </button>
        </div>
        <div className="flex items-center gap-[12px] border-b border-rule p-[12px_18px] transition-colors hover:bg-surface-2">
          <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[8px] bg-amber-soft">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="2" y="4" width="12" height="9" rx="1.5" stroke="currentColor" className="text-amber" strokeWidth="1.3"/><path d="M2 7h12" stroke="currentColor" className="text-amber" strokeWidth="1.3"/></svg>
          </div>
          <div className="flex-1">
            <div className="text-[13px] font-[700] text-ink">3802 University Cove</div>
            <div className="mt-[1px] text-[11px] text-ink-3">Moore Capital LLC · 12%</div>
          </div>
          <div className="min-w-[70px] text-center">
            <div className="text-[10px] font-[700] uppercase tracking-[0.4px] text-ink-3">Due</div>
            <div className="mt-[1px] text-[12px] font-[600] text-ink">Oct 1, 2026</div>
          </div>
          <div className="min-w-[60px] text-right text-[15px] font-[800] text-amber">$1,150</div>
          <button className="shrink-0 cursor-pointer whitespace-nowrap rounded-[5px] border-none bg-accent p-[6px_14px] font-sans text-[11px] font-[700] text-white transition-colors hover:opacity-90">
            {isEs ? "Registrar pago" : "Log payment"}
          </button>
        </div>
      </div>

      <div className="mt-[12px] overflow-hidden rounded-[10px] border border-rule bg-surface">
        <div className="border-b border-rule bg-surface-2 p-[12px_18px_8px] text-[10px] font-[700] uppercase tracking-[0.6px] text-ink-3">
          {isEs ? "Pagos recientes" : "Recent payments"}
        </div>
        <div className="flex items-center gap-[12px] border-b border-rule p-[12px_18px] transition-colors hover:bg-surface-2">
          <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[8px] bg-success-soft">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8l4 4 6-6" stroke="currentColor" className="text-success" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <div className="flex-1">
            <div className="text-[13px] font-[700] text-ink">1144 Oakwood Dr</div>
            <div className="mt-[1px] text-[11px] text-ink-3">Moore Capital LLC · Sept 1, 2026</div>
          </div>
          <div className="min-w-[70px] text-center">
            <div className="text-[10px] font-[700] uppercase tracking-[0.4px] text-ink-3">Paid</div>
            <div className="mt-[1px] text-[12px] font-[600] text-ink">Sept 1, 2026</div>
          </div>
          <div className="min-w-[60px] text-right text-[15px] font-[800] text-success">$950</div>
          <div className="shrink-0 rounded-[8px] bg-success-soft px-[10px] py-[3px] text-[11px] font-[700] text-success">{isEs ? "Pagado" : "Paid"}</div>
        </div>
        <div className="flex items-center gap-[12px] p-[12px_18px] transition-colors hover:bg-surface-2">
          <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[8px] bg-success-soft">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8l4 4 6-6" stroke="currentColor" className="text-success" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <div className="flex-1">
            <div className="text-[13px] font-[700] text-ink">1144 Oakwood Dr</div>
            <div className="mt-[1px] text-[11px] text-ink-3">Moore Capital LLC · Aug 1, 2026</div>
          </div>
          <div className="min-w-[70px] text-center">
            <div className="text-[10px] font-[700] uppercase tracking-[0.4px] text-ink-3">Paid</div>
            <div className="mt-[1px] text-[12px] font-[600] text-ink">Aug 1, 2026</div>
          </div>
          <div className="min-w-[60px] text-right text-[15px] font-[800] text-success">$950</div>
          <div className="shrink-0 rounded-[8px] bg-success-soft px-[10px] py-[3px] text-[11px] font-[700] text-success">{isEs ? "Pagado" : "Paid"}</div>
        </div>
      </div>

    </div>
  );
}