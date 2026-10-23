"use client";

import { apiFetch } from "@/app/lib/apiFetch";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useSite } from "@/app/components/layout/SiteShell";
import { API_ROUTES } from "@/app/lib/endpoints";

// Interfaces para mapear los datos del backend a la vista
interface PropertyData {
  addressLine1?: string;
  city: string;
  state: string;
  postalCode?: string;
  afterRepairValue?: number | string;
}

interface LoanRequestItem {
  id: string;
  property: PropertyData;
  projectType: string;
  totalLoanAmountRequested: number | string;
  rehabAmount?: number | string;
  requestedClosingDate: string;
  status: string;
  createdAt?: string;
  _count?: {
    quotes?: number;
  };
  quotes?: any[];
  lat?: number;
  lng?: number;
}

export default function BrowseDealsView() {
  const { t, lang } = useSite();
  const m = t.marketplace;
  const isEs = lang === "es";

  // Estados de datos
  const [deals, setDeals] = useState<LoanRequestItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

// Estados de filtros
  const [activeFilter, setActiveFilter] = useState<string>("ALL"); // ALL, BRIDGE, SLOW_FLIP, NEW
  const [filterState, setFilterState] = useState("");
  const [filterZip, setFilterZip] = useState("");
  const [filterLtv, setFilterLtv] = useState("");

  const [viewMode, setViewMode] = useState<"map" | "grid">("map");
  const [mapCenter, setMapCenter] = useState<[number, number]>([35.13, -89.99]);
  const [mapZoom, setMapZoom] = useState<number>(11);
  const [selectedDealId, setSelectedDealId] = useState<string | null>(null);

  // Configuracion visual de estados
  const statusConfig: Record<string, { color: string; label: string; pillClass: string }> = {
    PUBLISHED: { color: "#16a34a", label: isEs ? "Necesita Fondeo" : "Needs Funding", pillClass: "bg-[#f0fdf4] text-[#16a34a]" },
    MATCHED: { color: "#2563eb", label: isEs ? "Fondeo Activo" : "Active Funding", pillClass: "bg-[#eff6ff] text-[#2563eb]" },
    CLOSED: { color: "#6b7280", label: isEs ? "Cerrado" : "Closed", pillClass: "bg-[#f3f4f6] text-[#6b7280]" },
    DRAFT: { color: "#8898aa", label: "Borrador", pillClass: "bg-surface-2 text-ink-3" }
  };

  // Fetch de tratos
  useEffect(() => {
    async function fetchDeals() {
      try {
        const response = await apiFetch(API_ROUTES.marketplace.loanRequests);

        if (!response.ok) throw new Error(m.errorFetch);
        const json = await response.json();

        if (json.success) {
          setDeals(json.data.items || []);
        } else {
          throw new Error(json.error?.message || m.errorFetch);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : m.errorNetwork);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDeals();
  }, [m.errorFetch, m.errorNetwork]);

  // Filtrado de tratos
  const filteredDeals = useMemo(() => {
    return deals.filter(deal => {
      // Ocultar borradores del marketplace
      if (deal.status === "DRAFT") return false;

      // Filtro de chips (Tipo de proyecto o Novedad)
      if (activeFilter === "BRIDGE" && deal.projectType !== "FIX_AND_FLIP") return false;
      if (activeFilter === "SLOW_FLIP" && deal.projectType !== "SLOW_FLIP") return false;
      if (activeFilter === "NEW") {
        if (!deal.createdAt) return false;
        const daysOld = (new Date().getTime() - new Date(deal.createdAt).getTime()) / 86400000;
        if (daysOld > 7) return false;
      }
      
      // Filtros de texto/desplegables
      if (filterState && deal.property?.state !== filterState) return false;
      if (filterZip && (!deal.property?.postalCode || !deal.property.postalCode.includes(filterZip))) return false;
      
      const arv = Number(deal.property?.afterRepairValue || 0);
      const loan = Number(deal.totalLoanAmountRequested || 0);
      const ltv = arv > 0 ? (loan / arv) * 100 : 0;
      
      if (filterLtv && ltv >= parseInt(filterLtv)) return false;
      
      return true;
    });
  }, [deals, activeFilter, filterState, filterZip, filterLtv]);

  // Funciones de utilidad
  const formatCurrency = (val: number | string) => {
    const n = Number(val);
    if (n >= 1000000) return '$' + (n/1000000).toFixed(2).replace(/\.?0+$/,'') + 'M';
    if (n >= 1000) return '$' + (n/1000).toFixed(0) + 'K';
    return '$' + n;
  };

  const getCalculatedLtv = (deal: LoanRequestItem) => {
    const arv = Number(deal.property?.afterRepairValue || 0);
    const loan = Number(deal.totalLoanAmountRequested || 0);
    return arv > 0 ? Math.round((loan / arv) * 100) : 0;
  };

  const getTimeAgo = (dateString?: string) => {
    if (!dateString) return "";
    const diff = new Date().getTime() - new Date(dateString).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours/24)}d ago`;
  };

  // Stats calculation
  const activeDealsCount = deals.filter(d => d.status === "PUBLISHED" || d.status === "MATCHED").length;
  const avgLoanAmt = deals.length > 0 ? deals.reduce((acc, d) => acc + Number(d.totalLoanAmountRequested || 0), 0) / deals.length : 0;
  const avgLtvVal = deals.length > 0 ? deals.reduce((acc, d) => acc + getCalculatedLtv(d), 0) / deals.length : 0;

  return (
    <div className="animate-in fade-in flex flex-col bg-white font-sans text-[#0a2540] duration-300">
      <div className="mb-[20px] flex items-center justify-between">
        <div className="text-[22px] font-[700] tracking-[-0.3px] text-[#0a2540]">{m.title || "Browse deals"}</div>
      </div>

      {/* STATS STRIP */}
      <div className="mb-[24px] grid grid-cols-1 gap-[1px] overflow-hidden rounded-[10px] border border-[#e6ebf1] bg-[#e6ebf1] md:grid-cols-3">
        <div className="bg-white p-[16px_20px]">
          <div className="mb-[6px] text-[11px] font-[600] uppercase tracking-[0.5px] text-[#8898aa]">Active deals</div>
          <div className="text-[22px] font-[700] tracking-[-0.5px] text-[#0a2540]">{activeDealsCount}</div>
        </div>
        <div className="bg-white p-[16px_20px]">
          <div className="mb-[6px] text-[11px] font-[600] uppercase tracking-[0.5px] text-[#8898aa]">Avg loan amount</div>
          <div className="text-[22px] font-[700] tracking-[-0.5px] text-[#0a2540]">{formatCurrency(avgLoanAmt)}</div>
        </div>
        <div className="bg-white p-[16px_20px]">
          <div className="mb-[6px] text-[11px] font-[600] uppercase tracking-[0.5px] text-[#8898aa]">Avg LTV</div>
          <div className="text-[22px] font-[700] tracking-[-0.5px] text-[#0a2540]">{Math.round(avgLtvVal)}%</div>
        </div>
      </div>

      {/* FILTER ROW */}
      <div className="mb-[20px] flex flex-wrap items-center gap-[8px]">
        <button onClick={() => setActiveFilter("ALL")} className={`cursor-pointer rounded-[20px] border px-[12px] py-[6px] font-sans text-[12px] font-[500] transition-colors ${activeFilter === "ALL" ? "border-[#635bff] bg-[#f0efff] text-[#635bff]" : "border-[#e6ebf1] bg-white text-[#425466] hover:border-[#aab7c4] hover:text-[#0a2540]"}`}>{isEs ? "Todos" : "All"}</button>
        <button onClick={() => setActiveFilter("BRIDGE")} className={`cursor-pointer rounded-[20px] border px-[12px] py-[6px] font-sans text-[12px] font-[500] transition-colors ${activeFilter === "BRIDGE" ? "border-[#635bff] bg-[#f0efff] text-[#635bff]" : "border-[#e6ebf1] bg-white text-[#425466] hover:border-[#aab7c4] hover:text-[#0a2540]"}`}>Bridge</button>
        <button onClick={() => setActiveFilter("SLOW_FLIP")} className={`cursor-pointer rounded-[20px] border px-[12px] py-[6px] font-sans text-[12px] font-[500] transition-colors ${activeFilter === "SLOW_FLIP" ? "border-[#635bff] bg-[#f0efff] text-[#635bff]" : "border-[#e6ebf1] bg-white text-[#425466] hover:border-[#aab7c4] hover:text-[#0a2540]"}`}>Slow flip</button>
        <button onClick={() => setActiveFilter("NEW")} className={`cursor-pointer rounded-[20px] border px-[12px] py-[6px] font-sans text-[12px] font-[500] transition-colors ${activeFilter === "NEW" ? "border-[#635bff] bg-[#f0efff] text-[#635bff]" : "border-[#e6ebf1] bg-white text-[#425466] hover:border-[#aab7c4] hover:text-[#0a2540]"}`}>{isEs ? "Nuevos" : "New this week"}</button>
        
        <div className="mx-[4px] h-[20px] w-[1px] bg-[#e6ebf1]"></div>
        
        <select value={filterState} onChange={(e) => setFilterState(e.target.value)} className="cursor-pointer rounded-[6px] border border-[#e6ebf1] bg-white px-[10px] py-[6px] font-sans text-[12px] text-[#425466] outline-none focus:border-[#635bff]">
          <option value="">{isEs ? "Todos los Estados" : "Any state"}</option>
          <option value="TN">TN</option>
          <option value="MS">MS</option>
          <option value="AR">AR</option>
        </select>

        <input 
          type="text" 
          placeholder="ZIP" 
          value={filterZip} 
          onChange={(e) => setFilterZip(e.target.value)} 
          className="w-[80px] rounded-[6px] border border-[#e6ebf1] bg-white px-[10px] py-[6px] font-sans text-[12px] text-[#425466] outline-none focus:border-[#635bff]"
        />
        
        <select value={filterLtv} onChange={(e) => setFilterLtv(e.target.value)} className="cursor-pointer rounded-[6px] border border-[#e6ebf1] bg-white px-[10px] py-[6px] font-sans text-[12px] text-[#425466] outline-none focus:border-[#635bff]">
          <option value="">LTV: {isEs ? "Cualquiera" : "Any"}</option>
          <option value="65">&le; 65%</option>
          <option value="70">&le; 70%</option>
          <option value="75">&le; 75%</option>
          <option value="80">&le; 80%</option>
        </select>
        
        <div className="ml-auto flex items-center gap-[6px]">
          <span className="text-[12px] text-[#8898aa]">
            {isEs ? "Mostrando" : "Showing"} <strong className="font-[600] text-[#0a2540]">{filteredDeals.length}</strong> {isEs ? "tratos" : "deals"}
          </span>
        </div>
      </div>

      {/* DEAL GRID */}
      {isLoading ? (
        <div className="py-10 text-center text-[13px] text-[#8898aa]">{m.loading}</div>
      ) : filteredDeals.length === 0 ? (
        <div className="py-10 text-center text-[13px] text-[#8898aa]">{m.empty}</div>
      ) : (
        <div className="grid grid-cols-1 gap-[16px] md:grid-cols-2 lg:grid-cols-3">
          {filteredDeals.map(deal => {
            const ltv = getCalculatedLtv(deal);
            const isSlowFlip = deal.projectType === 'SLOW_FLIP';
            
            return (
              <Link href={`/lenderDashboard/browse-deals/${deal.id}`} key={deal.id} className="flex cursor-pointer flex-col overflow-hidden rounded-[10px] border border-[#e6ebf1] bg-white tracking-normal text-[#0a2540] no-underline transition-all hover:border-[#aab7c4] hover:shadow-[0_4px_12px_rgba(10,37,64,0.06)]">
                
                <div className="border-b border-[#e6ebf1] p-[18px_18px_14px]">
                  <div className="mb-[8px] flex items-center justify-between">
                    <span className={`inline-flex items-center gap-[5px] rounded-[10px] px-[10px] py-[3px] text-[11px] font-[600] ${isSlowFlip ? 'bg-[#e8f5e9] text-[#2e7d32]' : 'bg-[#f0efff] text-[#635bff]'}`}>
                      {isSlowFlip ? '🏡 Slow flip' : '⚡ Bridge'}
                    </span>
                  </div>
                  <div className="mb-[2px] text-[14px] font-[700] text-[#0a2540]">{deal.property?.addressLine1 || (isEs ? "Dirección oculta" : "Address shielded")}</div>
                  <div className="text-[12px] text-[#8898aa]">{deal.property?.city}, {deal.property?.state} {deal.property?.postalCode ? `· ${deal.property.postalCode}` : ''}</div>
                </div>
                
                <div className="grid grid-cols-2 gap-[10px] p-[14px_18px]">
                  <div className="flex flex-col gap-[2px]">
                    <div className="text-[10px] font-[600] uppercase tracking-[0.4px] text-[#8898aa]">{isSlowFlip ? (isEs ? "Monto" : "Loan amount") : (isEs ? "Solicitud" : "Loan request")}</div>
                    <div className="text-[14px] font-[700] text-[#0a2540]">{formatCurrency(deal.totalLoanAmountRequested)}</div>
                  </div>
                  <div className="flex flex-col gap-[2px]">
                    <div className="text-[10px] font-[600] uppercase tracking-[0.4px] text-[#8898aa]">{isSlowFlip ? (isEs ? "Compra" : "Purchase price") : "ARV"}</div>
                    <div className="text-[14px] font-[700] text-[#0a2540]">{formatCurrency(deal.property?.afterRepairValue || 0)}</div>
                  </div>
                  <div className="flex flex-col gap-[2px]">
                    <div className="text-[10px] font-[600] uppercase tracking-[0.4px] text-[#8898aa]">{isEs ? "Tasa/Plazo" : "Rate/Term"}</div>
                    <div className="text-[14px] font-[700] text-[#0a2540]">{isEs ? "Por definir" : "TBD by you"}</div>
                  </div>
                  <div className="flex flex-col gap-[2px]">
                    <div className="text-[10px] font-[600] uppercase tracking-[0.4px] text-[#8898aa]">{isSlowFlip ? (isEs ? "P&I Mensual" : "Monthly P&I") : "Rehab"}</div>
                    <div className="text-[14px] font-[700] text-[#0a2540]">{formatCurrency(deal.rehabAmount || 0)}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-[#f6f9fc] p-[12px_18px]">
                  <div className="mr-[16px] flex flex-1 flex-col gap-[4px]">
                    <div className="text-[10px] font-[600] uppercase tracking-[0.4px] text-[#8898aa]">LTV</div>
                    <div className="h-[4px] overflow-hidden rounded-[2px] bg-[#e6ebf1]">
                      <div className="h-full rounded-[2px] transition-all duration-300" style={{ width: `${ltv}%`, backgroundColor: isSlowFlip ? '#2e7d32' : '#635bff' }}></div>
                    </div>
                    <div className="mt-[2px] text-[11px] font-[700]" style={{ color: isSlowFlip ? '#2e7d32' : '#635bff' }}>{ltv}%</div>
                  </div>
                  <div className="flex flex-col items-end gap-[6px]">
                    <div className="text-right text-[11px] text-[#8898aa]"><strong className="block text-[13px] text-[#0a2540]">{deal._count?.quotes || 0}</strong> {isEs ? 'ofertas' : 'offers'}</div>
                    <button className="cursor-pointer whitespace-nowrap rounded-[6px] border-none px-[14px] py-[7px] font-sans text-[12px] font-[600] text-white hover:opacity-90" style={{ backgroundColor: isSlowFlip ? '#2e7d32' : '#635bff' }}>
                      {isEs ? 'Ver detalles' : 'See details'}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-[#e6ebf1] p-[10px_18px]">
                  <div className="flex items-center gap-[7px]">
                    <div className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border border-[#e6ebf1] bg-[#f6f9fc] text-[10px] text-[#aab7c4]">🔒</div>
                    <span className="text-[11px] italic text-[#aab7c4]">{isEs ? 'Identidad oculta' : 'Borrower identity hidden'}</span>
                  </div>
                  <span className="text-[11px] text-[#aab7c4]">
                    {getTimeAgo(deal.createdAt)}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}