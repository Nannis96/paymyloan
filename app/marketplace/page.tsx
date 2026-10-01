"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { MapPin, List as ListIcon, Map as MapIcon } from "lucide-react";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import MapLoader from "@/app/components/map/MapLoader";
import { FilterChip, DealCard } from "@/app/components/ui";
import { API_ROUTES } from "@/app/lib/endpoints";
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
  _count?: {
    quotes?: number;
  };
  quotes?: any[];
}

function MarketplaceContent() {
  const { t, lang } = useSite();
  const m = t.marketplace;
  
  const [deals, setDeals] = useState<LoanRequestItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // View states
  const [activeFilter, setActiveFilter] = useState<"all" | "bridge" | "slowFlip">("all");
  const [isMapView, setIsMapView] = useState(true);

  useEffect(() => {
    async function fetchDeals() {
      try {
        const token = localStorage.getItem("accessToken") || "";
        const response = await fetch(API_ROUTES.marketplace.loanRequests, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        });

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            window.location.href = "/login";
            return;
          }
          throw new Error(`HTTP ${response.status}: ${m.errorFetch}`);
        }

        const json = await response.json();
        
        if (json.success) {
          const items = json.data.items || [];
          if (items.length === 0) {
            // Mock de respaldo mientras el backend no tenga seed para LoanRequests
            setDeals([{
              id: "2847-lamar-ave",
              property: {
                addressLine1: "2847 Lamar Ave",
                city: "Memphis",
                state: "TN",
                afterRepairValue: 210000
              },
              projectType: "BRIDGE_FLIP",
              totalLoanAmountRequested: 145000,
              rehabAmount: 38000,
              requestedClosingDate: new Date().toISOString(),
              _count: { quotes: 2 }
            }]);
          } else {
            setDeals(items);
          }
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
  }, [m.errorAuth, m.errorFetch, m.errorNetwork]);

  const formatCurrency = (amount: number | string) => {
    return Number(amount).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  const formatProjectType = (type: string) => {
    if (type.includes("FLIP")) return "Bridge";
    return "Slow flip";
  };

  return (
    <div className="flex h-[calc(100vh-68px)] flex-col bg-bg">
      {/* Header Area */}
      <div className="shrink-0 border-b border-rule bg-surface px-6 py-6 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-[24px] font-black tracking-tight text-ink">{m.title}</h1>
              <p className="mt-1 text-[14px] text-ink-2">{m.subtitle}</p>
            </div>
            
            {/* View Toggles */}
            <div className="flex overflow-hidden rounded-lg border border-rule bg-surface-2 p-1">
              <button 
                onClick={() => setIsMapView(true)}
                className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${isMapView ? "bg-accent text-accent-ink shadow-sm" : "text-ink-3 hover:text-ink"}`}
              >
                <MapIcon size={14} /> <span className="hidden sm:inline">{m.mapView}</span>
              </button>
              <button 
                onClick={() => setIsMapView(false)}
                className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${!isMapView ? "bg-accent text-accent-ink shadow-sm" : "text-ink-3 hover:text-ink"}`}
              >
                <ListIcon size={14} /> <span className="hidden sm:inline">{m.listView}</span>
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <FilterChip label={m.filters.all} isActive={activeFilter === "all"} onClick={() => setActiveFilter("all")} />
            <FilterChip label={m.filters.bridge} isActive={activeFilter === "bridge"} onClick={() => setActiveFilter("bridge")} />
            <FilterChip label={m.filters.slowFlip} isActive={activeFilter === "slowFlip"} onClick={() => setActiveFilter("slowFlip")} />
            <FilterChip label={m.filters.new} isActive={false} />
          </div>
        </div>
      </div>

      {/* Main Content Area (Split Screen) */}
      <div className="mx-auto flex w-full max-w-[1400px] flex-1 overflow-hidden p-6 lg:px-10">
        
        <div className={`relative flex-1 overflow-hidden rounded-xl border border-rule bg-surface-2 ${isMapView ? "block" : "hidden"} lg:block`}>
  <MapLoader 
    deals={deals.filter(d => {
      // Aplicar misma lógica de filtrado que en la lista
      const type = d.projectType?.includes("FLIP") ? "Bridge" : "Slow flip";
      if (activeFilter === "bridge" && type !== "Bridge") return false;
      if (activeFilter === "slowFlip" && type !== "Slow flip") return false;
      return true;
    })} 
    t={t} 
    center={[35.127, -89.977]} // Memphis (Default)
  />

  {/* Map Legend (Flotante) */}
  <div className="absolute bottom-4 left-4 z-[400] rounded-lg border border-rule/50 bg-surface/90 p-3 shadow-md backdrop-blur-sm">
    <div className="flex flex-col gap-2 text-[11px] font-medium text-ink-2">
      <div className="flex items-center gap-2"><div className="h-2.5 w-2.5 rounded-full bg-accent" /> {m.filters.bridge}</div>
      <div className="flex items-center gap-2"><div className="h-2.5 w-2.5 rounded-full bg-green-500" /> {m.filters.slowFlip}</div>
    </div>
  </div>
</div>

        {/* Right Side: Scrollable Deal List */}
        <div className={`flex w-full flex-col gap-4 overflow-y-auto lg:ml-6 lg:w-[420px] xl:w-[480px] ${!isMapView ? "block" : "hidden lg:flex"}`}>
          {isLoading ? (
            <div className="flex h-full items-center justify-center text-sm text-ink-3">{m.loading}</div>
          ) : error ? (
            <div className="rounded-lg border border-red-900/50 bg-red-900/20 px-4 py-3 text-sm text-red-500">{error}</div>
          ) : deals.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-rule p-8 text-center text-ink-3">
              <MapPin size={32} className="mb-3 opacity-50" />
              <div className="text-sm font-semibold text-ink-2">{m.empty}</div>
            </div>
          ) : (
            deals.map((deal, index) => {
              const type = formatProjectType(deal.projectType);
              
              // Filter logic applied visually
              if (activeFilter === "bridge" && type !== "Bridge") return null;
              if (activeFilter === "slowFlip" && type !== "Slow flip") return null;

              const arvNum = Number(deal.property?.afterRepairValue || 0);
              const requestedNum = Number(deal.totalLoanAmountRequested || 0);
              const rehabNum = Number(deal.rehabAmount || 0);
              const ltvCalc = arvNum > 0 ? Math.round((requestedNum / arvNum) * 100) : 0;
              const offersCount = deal._count?.quotes || deal.quotes?.length || 0;

              return (
                <Link href={`/marketplace/${deal.id}`} key={deal.id} className="block no-underline">
                  <DealCard 
                    type={type as "Bridge" | "Slow flip"}
                    isNew={index === 0}
                    address={deal.property?.addressLine1 || "Direccion no disponible"}
                    cityState={`${deal.property?.city || "Ciudad oculta"}, ${deal.property?.state || ""}`}
                    loanAmount={formatCurrency(deal.totalLoanAmountRequested)}
                    arv={arvNum > 0 ? formatCurrency(arvNum) : "N/D"} 
                    maxRate="12%" 
                    maxRateSub="Estimado"
                    rehab={rehabNum > 0 ? formatCurrency(rehabNum) : "N/D"}
                    ltv={ltvCalc} 
                    offersCount={offersCount} 
                    lenderAvatar="VB"
                    lenderName="Inversor Verificado"
                    timeAgo="Reciente"
                    t={t}
                  />
                </Link>
              );
            })
          )}
          
          {/* Spacer for bottom scrolling */}
          <div className="h-6 shrink-0" />
        </div>

      </div>
    </div>
  );
}

export default function MarketplacePage() {
  return (
    <SiteShell isDashboard={true}>
      <MarketplaceContent />
    </SiteShell>
  );
}