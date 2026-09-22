"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { MapPin, List as ListIcon, Map as MapIcon } from "lucide-react";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import { FilterChip, DealCard } from "@/app/components/ui";
import { API_ROUTES } from "@/app/lib/endpoints";

interface PropertyData {
  city: string;
  state: string;
}

interface LoanRequestItem {
  id: string;
  property: PropertyData;
  projectType: string;
  totalLoanAmountRequested: number | string;
  requestedClosingDate: string;
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
          if (response.status === 401) throw new Error(m.errorAuth);
          throw new Error(`HTTP ${response.status}: ${m.errorFetch}`);
        }

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
        
        {/* Left Side: Map (Hidden on mobile if list view is active) */}
        <div className={`relative flex-1 overflow-hidden rounded-xl border border-rule bg-blue-50 dark:border-blue-900/30 dark:bg-[#0c1222] ${isMapView ? "block" : "hidden"} lg:block`}>
          {/* Map Grid Background Pattern */}
          <div 
            className="absolute inset-0 opacity-20" 
            style={{ 
              backgroundImage: "repeating-linear-gradient(0deg, #3b82f6 0, #3b82f6 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #3b82f6 0, #3b82f6 1px, transparent 1px, transparent 40px)" 
            }}
          />
          
          {/* Mock Map Pins representing deals */}
          <div className="absolute left-[35%] top-[40%] flex items-center justify-center">
            <div className="absolute h-8 w-8 animate-ping rounded-full bg-accent/40" />
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white shadow-[0_0_0_3px_white] dark:shadow-[0_0_0_3px_#111]">
              <MapPin size={16} />
            </div>
          </div>
          
          <div className="absolute left-[65%] top-[25%] flex h-6 w-6 items-center justify-center rounded-full bg-accent text-white shadow-[0_0_0_3px_white] dark:shadow-[0_0_0_3px_#111]">
            <span className="text-[10px] font-bold">2</span>
          </div>

          <div className="absolute left-[45%] top-[70%] flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white shadow-[0_0_0_3px_white] dark:shadow-[0_0_0_3px_#111]">
             <MapPin size={12} />
          </div>

          {/* Map Legend */}
          <div className="absolute bottom-4 left-4 rounded-lg border border-rule/50 bg-surface/90 p-3 shadow-md backdrop-blur-sm">
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

              return (
                <Link href={`/marketplace/${deal.id}`} key={deal.id} className="block no-underline">
                  <DealCard 
                    type={type as "Bridge" | "Slow flip"}
                    isNew={index === 0} // Mocking the first one as new
                    address={`${deal.property.city}, ${deal.property.state}`}
                    cityState={`Proyecto: ${deal.projectType.replace(/_/g, " ")}`}
                    loanAmount={formatCurrency(deal.totalLoanAmountRequested)}
                    arv="N/D" 
                    maxRate="12%" 
                    maxRateSub="Estimado"
                    rehab="N/D"
                    ltv={65} 
                    offersCount={index % 3} // Mocking offers count
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