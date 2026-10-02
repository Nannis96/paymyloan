"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useSite } from "@/app/components/layout/SiteShell";
import { API_ROUTES } from "@/app/lib/endpoints";
import MapLoader from "@/app/components/map/MapLoader";

// Interfaces para mapear los datos del backend a la vista
interface PropertyData {
  addressLine1?: string;
  city: string;
  state: string;
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
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [filterState, setFilterState] = useState("");
  const [filterLtv, setFilterLtv] = useState("");
  const [filterRate, setFilterRate] = useState("");
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
        const token = localStorage.getItem("accessToken") || "";
        const response = await fetch(API_ROUTES.marketplace.loanRequests, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!response.ok) throw new Error(m.errorFetch);
        const json = await response.json();

        if (json.success) {
          let items = json.data.items || [];
          
          // Fallback a mocks si la base de datos esta vacia agregando lat y lng reales
          if (items.length === 0) {
            items = [
              { id: "1", property: { addressLine1: "2847 Lamar Ave", city: "Memphis", state: "TN", afterRepairValue: 210000 }, projectType: "BRIDGE", totalLoanAmountRequested: 145000, status: "PUBLISHED", lat: 35.092226, lng: -89.967683 },
              { id: "2", property: { addressLine1: "1032 S Wellington St", city: "Memphis", state: "TN", afterRepairValue: 148000 }, projectType: "FIX_AND_FLIP", totalLoanAmountRequested: 92000, status: "PUBLISHED", lat: 35.119001, lng: -90.047118 },
              { id: "3", property: { addressLine1: "4412 Raleigh Lagrange Rd", city: "Memphis", state: "TN", afterRepairValue: 255000 }, projectType: "BRIDGE", totalLoanAmountRequested: 168000, status: "MATCHED", lat: 35.200777, lng: -89.916074 },
              { id: "4", property: { addressLine1: "5541 Getwell Rd", city: "Southaven", state: "MS", afterRepairValue: 195000 }, projectType: "BRIDGE", totalLoanAmountRequested: 130000, status: "PUBLISHED", lat: 34.938882, lng: -89.936791 },
            ];
          }
          setDeals(items);
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
      // Filtro de boton principal
      if (activeFilter !== "ALL" && deal.status !== activeFilter) return false;
      
      // Filtros desplegables
      if (filterState && deal.property?.state !== filterState) return false;
      
      const arv = Number(deal.property?.afterRepairValue || 0);
      const loan = Number(deal.totalLoanAmountRequested || 0);
      const ltv = arv > 0 ? (loan / arv) * 100 : 0;
      
      if (filterLtv && ltv >= parseInt(filterLtv)) return false;
      // Simulamos filtrado de tasa
      if (filterRate) return false;
      
      return true;
    });
  }, [deals, activeFilter, filterState, filterLtv, filterRate]);

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

  const handleDealClick = (deal: LoanRequestItem) => {
    setSelectedDealId(deal.id);
    if (deal.lat && deal.lng) {
      setMapCenter([deal.lat, deal.lng]);
      setMapZoom(14); // Hacemos zoom in a nivel de vecindario
    }
  };

  // Evitamos el padding global del dashboard aplicando margenes negativos
  return (
    <div className="-mx-[32px] -my-[28px] flex h-[calc(100vh-52px)] flex-col bg-white overflow-hidden font-sans text-ink">

      {/* FILTER BAR */}
      <div className="flex h-[52px] shrink-0 items-center gap-[12px] border-b border-rule bg-white px-[16px] z-[800]">
        
        {/* Toggle principal */}
        <div className="flex overflow-hidden rounded-[8px] border border-rule">
          <button 
            onClick={() => setActiveFilter("ALL")} 
            className={`cursor-pointer whitespace-nowrap border-r border-rule px-[12px] py-[6px] text-[12px] font-[500] transition-colors ${activeFilter === "ALL" ? "bg-[#f6f9fc] text-[#0a2540]" : "bg-white text-[#425466] hover:bg-surface-2"}`}
          >
            {isEs ? "Todos" : "All"}
          </button>
          <button 
            onClick={() => setActiveFilter("PUBLISHED")} 
            className={`cursor-pointer whitespace-nowrap border-r border-rule px-[12px] py-[6px] text-[12px] font-[500] transition-colors ${activeFilter === "PUBLISHED" ? "bg-[#f0fdf4] text-[#16a34a]" : "bg-white text-[#425466] hover:bg-surface-2"}`}
          >
            {isEs ? "Necesita Fondeo" : "Needs Funding"}
          </button>
          <button 
            onClick={() => setActiveFilter("MATCHED")} 
            className={`cursor-pointer whitespace-nowrap border-r border-rule px-[12px] py-[6px] text-[12px] font-[500] transition-colors ${activeFilter === "MATCHED" ? "bg-[#eff6ff] text-[#2563eb]" : "bg-white text-[#425466] hover:bg-surface-2"}`}
          >
            {isEs ? "Fondeo Activo" : "Active Funding"}
          </button>
          <button 
            onClick={() => setActiveFilter("CLOSED")} 
            className={`cursor-pointer whitespace-nowrap px-[12px] py-[6px] text-[12px] font-[500] transition-colors ${activeFilter === "CLOSED" ? "bg-[#f3f4f6] text-[#6b7280]" : "bg-white text-[#425466] hover:bg-surface-2"}`}
          >
            {isEs ? "Cerrado" : "Closed"}
          </button>
        </div>

        <div className="h-[24px] w-[1px] shrink-0 bg-rule"></div>

        <select 
          value={filterState} 
          onChange={(e) => setFilterState(e.target.value)} 
          className="min-w-[100px] cursor-pointer appearance-none rounded-[6px] border border-rule bg-white px-[10px] py-[6px] pr-[26px] text-[12px] text-[#425466] outline-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238898aa' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center' }}
        >
          <option value="">{isEs ? "Todos los Estados" : "All States"}</option>
          <option value="TN">Tennessee</option>
          <option value="MS">Mississippi</option>
        </select>

        <select 
          value={filterLtv} 
          onChange={(e) => setFilterLtv(e.target.value)} 
          className="min-w-[100px] cursor-pointer appearance-none rounded-[6px] border border-rule bg-white px-[10px] py-[6px] pr-[26px] text-[12px] text-[#425466] outline-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238898aa' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center' }}
        >
          <option value="">LTV: {isEs ? "Cualquiera" : "Any"}</option>
          <option value="65">Under 65%</option>
          <option value="70">Under 70%</option>
          <option value="75">Under 75%</option>
        </select>

        <span className="ml-[4px] whitespace-nowrap text-[12px] text-[#8898aa]">
          {isEs ? "Mostrando" : "Showing"} <strong className="font-[600] text-[#0a2540]">{filteredDeals.length}</strong> {isEs ? "tratos" : "deals"}
        </span>

        {/* View Toggle */}
        <div className="ml-auto flex overflow-hidden rounded-[6px] border border-rule bg-white">
          <button 
            onClick={() => setViewMode("grid")}
            className={`cursor-pointer border-r border-rule px-[10px] py-[6px] transition-colors ${viewMode === "grid" ? "bg-[#f0efff] text-[#635bff]" : "text-[#8898aa]"}`}
            title="Grid view"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
          </button>
          <button 
            onClick={() => setViewMode("map")}
            className={`cursor-pointer px-[10px] py-[6px] transition-colors ${viewMode === "map" ? "bg-[#f0efff] text-[#635bff]" : "text-[#8898aa]"}`}
            title="Map view"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>
          </button>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* MAP CONTAINER - Usa el componente MapLoader para evitar errores de SSR */}
        <div id="map-container" className={`relative flex-1 ${viewMode === "grid" ? "hidden md:block" : "block"}`}>
          <MapLoader 
            deals={filteredDeals} 
            t={t} 
            center={mapCenter} 
            zoom={mapZoom} 
            onMarkerClick={handleDealClick}
          />
        </div>

        {/* DEAL LIST PANEL */}
        <div id="deal-list-panel" className={`flex w-full md:w-[380px] shrink-0 flex-col border-l border-rule bg-white ${viewMode === "map" ? "hidden md:flex" : "flex"}`}>
          <div className="shrink-0 border-b border-rule p-[16px]">
            <div className="text-[15px] font-[600] text-[#0a2540]">{isEs ? "Tratos a la vista" : "Deals in view"}</div>
            <div className="mt-[2px] text-[12px] text-[#8898aa]">
              {filteredDeals.length} {isEs ? "tratos visibles" : "deals visible"}
            </div>
          </div>
          
          <div className="flex flex-1 flex-col gap-[8px] overflow-y-auto p-[12px] scrollbar-thin scrollbar-thumb-rule hover:scrollbar-thumb-rule-strong">
            {isLoading ? (
              <div className="text-center text-[13px] text-[#8898aa] py-10">{m.loading}</div>
            ) : filteredDeals.length === 0 ? (
              <div className="text-center text-[13px] text-[#8898aa] py-10">{m.empty}</div>
            ) : (
              filteredDeals.map(deal => {
                const cfg = statusConfig[deal.status] || statusConfig["DRAFT"];
                const ltv = getCalculatedLtv(deal);

                return (
                  <div 
                    key={deal.id}
                    onClick={() => handleDealClick(deal)}
                    className={`relative cursor-pointer rounded-[10px] border bg-white p-[12px_12px_12px_16px] transition-all hover:-translate-y-[1px] hover:shadow-[0_2px_12px_rgba(10,37,64,0.08)] ${selectedDealId === deal.id ? "border-[#635bff] shadow-[0_0_0_2px_#635bff33]" : "border-rule"}`}
                    style={{ borderLeftWidth: '4px', borderLeftColor: cfg.color }}
                  >
                    <div className="mb-[8px] flex items-start justify-between">
                      <div>
                        <div className="line-clamp-1 text-[13px] font-[600] leading-[1.3] text-[#0a2540]">
                          {deal.property?.addressLine1 || "Direccion Pendiente"}
                        </div>
                        <div className="mt-[1px] text-[11px] text-[#8898aa]">{deal.property?.city}, {deal.property?.state}</div>
                      </div>
                      <span className={`ml-[8px] shrink-0 whitespace-nowrap rounded-[20px] px-[8px] py-[3px] text-[10px] font-[600] ${cfg.pillClass}`}>
                        {cfg.label}
                      </span>
                    </div>
                    
                    <div className="mb-[8px] flex gap-[16px]">
                      <div className="flex-1">
                        <div className="text-[10px] font-[500] uppercase tracking-[0.4px] text-[#8898aa]">{isEs ? "Monto" : "Loan"}</div>
                        <div className="mt-[1px] text-[12px] font-[600] text-[#0a2540]">{formatCurrency(deal.totalLoanAmountRequested)}</div>
                      </div>
                      <div className="flex-1">
                        <div className="text-[10px] font-[500] uppercase tracking-[0.4px] text-[#8898aa]">ARV</div>
                        <div className="mt-[1px] text-[12px] font-[600] text-[#0a2540]">{formatCurrency(deal.property?.afterRepairValue || 0)}</div>
                      </div>
                      <div className="flex-1">
                        <div className="text-[10px] font-[500] uppercase tracking-[0.4px] text-[#8898aa]">{isEs ? "Tasa/Plazo" : "Rate/Term"}</div>
                        <div className="mt-[1px] text-[12px] font-[600] text-[#0a2540]">12% / 12mo</div>
                      </div>
                    </div>
                    
                    <div className="mb-[8px]">
                      <div className="h-[3px] rounded-[2px] bg-rule">
                        <div className="h-[3px] rounded-[2px] bg-[#635bff] transition-all duration-300" style={{ width: `${ltv}%` }}></div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Link 
                        href={`/marketplace/${deal.id}`}
                        onClick={(e) => e.stopPropagation()} 
                        className="cursor-pointer rounded-[6px] border-none bg-[#635bff] px-[12px] py-[5px] font-sans text-[11px] font-[600] text-white transition-colors hover:bg-[#524ddb]"
                      >
                        {isEs ? "Enviar oferta" : "Submit offer"}
                      </Link>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>
    </div>
  );
}