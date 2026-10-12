"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSite } from "@/app/components/layout/SiteShell";
import { API_ROUTES } from "@/app/lib/endpoints";

interface ContractItem {
  id: string;
  contractNumber: string;
  status: string;
  property: {
    addressLine1: string;
    city: string;
    state: string;
  };
  currentTerms?: {
    status: string;
    principalAmount: string | number;
  };
}

export default function ActiveLoansView() {
  const { t } = useSite();
  const title = (t.dashboardLender.mimic as any).sidebar?.active || "Active Loans";
  const viewContractText = t.dashboardLender.actions?.viewContractBtn || "View Contract";
  const badgeActive = (t.dashboardLender.mimic as any).badges?.active || "Activo";
  const badgePending = (t.dashboardLender.mimic as any).badges?.pending || "Pendiente";

  const [contracts, setContracts] = useState<ContractItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContracts() {
      try {
        const token = localStorage.getItem("accessToken") || "";
        const res = await fetch(API_ROUTES.contracts.base, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const json = await res.json();
        
        if (json.success) {
          // Filtramos para mostrar contratos listos o en proceso de aceptacion
          const activeDeals = (json.data.items || []).filter((c: any) => 
            c.status === "ACTIVE" || 
            c.status === "PENDING_ACCEPTANCE" || 
            c.currentTerms?.status === "ACCEPTED"
          );
          setContracts(activeDeals);
        } else {
          throw new Error(json.error?.message || "Error al cargar contratos");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error de red");
      } finally {
        setIsLoading(false);
      }
    }
    fetchContracts();
  }, []);

  const formatCurrency = (val: any) => {
    if (!val) return "$0";
    return Number(val).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 });
  };

  return (
    <div className="animate-in fade-in duration-300">
      <div className="mb-[16px] text-[20px] font-[800] tracking-[-0.3px] text-[#0a2540]">{title}</div>
      
      <div className="flex flex-col gap-[14px]">
        {isLoading ? (
          <div className="rounded-[10px] border border-[#e6ebf1] bg-white p-[40px] text-center text-[#8898aa]">
            {t.contractsList?.loading || "Cargando..."}
          </div>
        ) : error ? (
          <div className="rounded-[10px] border border-red-200 bg-red-50 p-[40px] text-center text-red-600">
            {error}
          </div>
        ) : contracts.length === 0 ? (
          <div className="rounded-[10px] border border-[#e6ebf1] bg-white p-[40px] text-center text-[#8898aa]">
            {t.dashboardLender?.emptyLoans || "Sin prestamos activos"}
          </div>
        ) : (
          contracts.map((contract) => {
            // Un contrato se considera "aceptado" si sus terminos actuales estan en ACCEPTED o si ya arranco (ACTIVE)
            const isAccepted = contract.currentTerms?.status === "ACCEPTED" || contract.status === "ACTIVE";
            
            return (
              <div key={contract.id} className="flex flex-col sm:flex-row sm:items-center justify-between rounded-[10px] border border-[#e6ebf1] bg-white p-[16px_20px] transition-colors hover:shadow-sm">
                <div className="mb-4 sm:mb-0">
                  <div className="text-[14px] font-[700] text-[#0a2540]">
                    {contract.property?.addressLine1}, {contract.property?.city}, {contract.property?.state}
                  </div>
                  <div className="mt-[2px] text-[12px] text-[#8898aa]">
                    REF: {contract.contractNumber} • {formatCurrency(contract.currentTerms?.principalAmount)}
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className={`inline-block rounded-[10px] px-[10px] py-[3px] text-[11px] font-[700] ${isAccepted ? 'bg-[#e8f5e9] text-[#2e7d32]' : 'bg-[#fff8e1] text-[#b45309]'}`}>
                    {isAccepted ? badgeActive : badgePending}
                  </span>
                  
                  <Link 
                    href={`/lenderDashboard/commitment-letter?contractId=${contract.id}`}
                    className={`inline-flex cursor-pointer items-center justify-center rounded-[6px] border border-[#e6ebf1] bg-[#f6f9fc] px-[12px] py-[6px] text-[12px] font-[600] text-[#425466] transition-all hover:bg-white hover:border-[#635bff] hover:text-[#635bff] ${isAccepted ? '' : 'opacity-50 hover:opacity-70'}`}
                  >
                    {viewContractText}
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}