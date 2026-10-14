"use client";

import { apiFetch } from "@/app/lib/apiFetch";
import { useState, useEffect } from "react";
import { useSite } from "@/app/components/layout/SiteShell";
import { API_ROUTES } from "@/app/lib/endpoints";

interface LenderCompanySummary {
  id: string;
  companyName: string;
  ein: string;
  city: string;
  state: string;
  status: string;
  isOpenToDeals: boolean;
}

export default function EntitiesView() {
  const { t, lang } = useSite();
  const isEs = lang === "es";
  const title = (t.dashboardLender.mimic as any).sidebar?.entities || "Entities";

  const [companies, setCompanies] = useState<LenderCompanySummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEntities() {
      try {
        // Hacemos fetch al perfil del prestamista que incluye sus entidades
        const res = await apiFetch(API_ROUTES.lenders.me);
        
        const json = await res.json();
        
        if (json.success) {
          setCompanies(json.data.lenderCompanies || []);
        } else {
          throw new Error(json.error?.message || "Error al cargar las entidades");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error de red");
      } finally {
        setIsLoading(false);
      }
    }
    fetchEntities();
  }, []);

  return (
    <div className="animate-in fade-in duration-300 max-w-[800px]">
      <div className="mb-[16px] text-[20px] font-[800] tracking-[-0.3px] text-[#0a2540]">
        {title}
      </div>
      
      <div className="flex flex-col gap-[14px]">
        {isLoading ? (
          <div className="rounded-[10px] border border-[#e6ebf1] bg-white p-[40px] text-center text-[#8898aa]">
            {t.dashboardLender.loading || "Cargando..."}
          </div>
        ) : error ? (
          <div className="rounded-[10px] border border-red-200 bg-red-50 p-[40px] text-center text-red-600">
            {error}
          </div>
        ) : companies.length === 0 ? (
          <div className="rounded-[10px] border border-[#e6ebf1] bg-white p-[40px] text-center text-[#8898aa]">
            {isEs ? "No hay entidades registradas." : "No entities registered."}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[14px]">
            {companies.map(company => (
              <div key={company.id} className="rounded-[10px] border border-[#e6ebf1] bg-white p-[20px] shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-[12px] flex items-start justify-between">
                  <div>
                    <div className="text-[15px] font-[700] text-[#0a2540]">{company.companyName}</div>
                    <div className="mt-[2px] text-[12px] text-[#8898aa]">
                      EIN: {company.ein || "N/D"}
                    </div>
                  </div>
                  <span className={`inline-block rounded-[10px] px-[10px] py-[3px] text-[10px] font-[700] uppercase ${company.status === 'ACTIVE' ? 'bg-[#e8f5e9] text-[#2e7d32]' : 'bg-[#f6f9fc] text-[#8898aa]'}`}>
                    {company.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-[10px] border-t border-[#f0f4f8] pt-[12px]">
                  <div>
                    <div className="text-[10px] font-[700] uppercase tracking-[0.4px] text-[#aab7c4]">
                      {isEs ? "Ubicacion" : "Location"}
                    </div>
                    <div className="mt-[2px] text-[13px] font-[600] text-[#425466]">
                      {company.city && company.state ? `${company.city}, ${company.state}` : (isEs ? "No especificada" : "Unspecified")}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-[700] uppercase tracking-[0.4px] text-[#aab7c4]">
                      {isEs ? "Disponibilidad" : "Availability"}
                    </div>
                    <div className="mt-[2px] text-[13px] font-[600] text-[#425466]">
                      {company.isOpenToDeals 
                        ? (isEs ? "Abierta a tratos" : "Open to deals") 
                        : (isEs ? "Cerrada a tratos" : "Not taking deals")}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}