"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSite } from "@/app/components/layout/SiteShell";
import { API_ROUTES } from "@/app/lib/endpoints";
import { apiFetch } from "@/app/lib/apiFetch";
import CreateDealBanner from "./CreateDealBanner";

export default function BorrowerDealsListView() {
  const { lang } = useSite();
  const isEs = lang === "es";

  // Estados separados para Solicitudes (Loan Requests) y Contratos
  const [loanRequests, setLoanRequests] = useState<any[]>([]);
  const [contracts, setContracts] = useState<any[]>([]);
  
  // Paginacion para Loan Requests
  const [reqPage, setReqPage] = useState(1);
  const [reqTotalPages, setReqTotalPages] = useState(1);
  const [reqIsLoading, setReqIsLoading] = useState(true);

  // Paginacion para Contracts
  const [contractPage, setContractPage] = useState(1);
  const [contractTotalPages, setContractTotalPages] = useState(1);
  const [contractIsLoading, setContractIsLoading] = useState(true);

  const PAGE_SIZE = 10;

  // Fetch Loan Requests
  useEffect(() => {
    async function fetchLoanRequests() {
      setReqIsLoading(true);
      try {
        const res = await apiFetch(`${API_ROUTES.borrowers.meLoanRequests}?page=${reqPage}&pageSize=${PAGE_SIZE}`);
        
        if (res.ok) {
          const json = await res.json();
          if (json.success) {
            setLoanRequests(json.data.items || []);
            setReqTotalPages(json.data.totalPages || 1);
          }
        }
      } catch (error) {
        console.error("Error fetching loan requests:", error);
      } finally {
        setReqIsLoading(false);
      }
    }
    fetchLoanRequests();
  }, [reqPage]);

  // Fetch Contracts
  useEffect(() => {
    async function fetchContracts() {
      setContractIsLoading(true);
      try {
        const res = await apiFetch(`${API_ROUTES.contracts.base}?page=${contractPage}&pageSize=${PAGE_SIZE}`);
        
        if (res.ok) {
          const json = await res.json();
          if (json.success) {
            setContracts(json.data.items || []);
            setContractTotalPages(json.data.totalPages || 1);
          }
        }
      } catch (error) {
        console.error("Error fetching contracts:", error);
      } finally {
        setContractIsLoading(false);
      }
    }
    fetchContracts();
  }, [contractPage]);

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

  return (
    <div className="animate-in fade-in duration-300 max-w-[820px]">
        <CreateDealBanner />

      <div className="mb-[24px]">
        <h1 className="text-[28px] font-[900] text-ink">{isEs ? "Todos mis tratos" : "All my deals"}</h1>
        <p className="mt-[4px] text-[14px] text-ink-3">{isEs ? "Solicitudes en busqueda de fondeo y contratos en curso." : "Requests seeking funding and active contracts."}</p>
      </div>

      {/* --- SECCION: SOLICITUDES (LOAN REQUESTS) --- */}
      <div className="mb-[32px]">
        <h2 className="mb-[16px] text-[16px] font-[800] text-ink">{isEs ? "Solicitudes buscando fondeo" : "Requests seeking funding"}</h2>
        
        {reqIsLoading ? (
          <div className="p-10 text-[14px] text-ink-3 text-center">{isEs ? "Cargando solicitudes..." : "Loading requests..."}</div>
        ) : loanRequests.length === 0 ? (
          <div className="rounded-[10px] border border-rule bg-surface p-[24px] text-center text-[13px] text-ink-3">
            {isEs ? "No tienes solicitudes activas." : "You have no active requests."}
          </div>
        ) : (
          <>
            {loanRequests.map((req) => (
              <div key={req.id} className="mb-[10px] cursor-pointer rounded-[10px] border border-rule bg-surface p-[16px_20px] transition-shadow hover:shadow-md dark:hover:shadow-none dark:hover:border-ink-3">
                <div className="mb-[10px] flex items-start justify-between">
                  <div>
                    <div className="text-[14px] font-[700] text-ink">{req.property?.addressLine1}, {req.property?.city} {req.property?.state}</div>
                    <div className="mt-[2px] text-[12px] text-ink-3">{req.projectType} • {formatCurrencyCompact(req.totalLoanAmountRequested)} requested • {req.status}</div>
                  </div>
                  <span className="rounded-[10px] bg-amber-soft px-[10px] py-[3px] text-[11px] font-[700] text-amber">{req.status}</span>
                </div>
                
                <div className="mb-[12px] flex flex-wrap gap-[20px]">
                  <div><div className="text-[10px] font-[700] uppercase tracking-[0.4px] text-ink-3">Loan</div><div className="mt-[1px] text-[13px] font-[700] text-ink">{formatCurrency(req.totalLoanAmountRequested)}</div></div>
                  <div><div className="text-[10px] font-[700] uppercase tracking-[0.4px] text-ink-3">ARV</div><div className="mt-[1px] text-[13px] font-[700] text-ink">{formatCurrency(req.property?.afterRepairValue)}</div></div>
                  <div><div className="text-[10px] font-[700] uppercase tracking-[0.4px] text-ink-3">LTV</div><div className="mt-[1px] text-[13px] font-[700] text-ink">{req.property?.afterRepairValue ? Math.round((req.totalLoanAmountRequested / req.property.afterRepairValue) * 100) : 0}%</div></div>
                </div>

                {renderProgressBar("request", req.status)}

                <div className="mt-[16px] flex justify-end border-t border-rule pt-[12px]">
                  <Link href={`/borrowerDashboard/deals/${req.id}`} className="rounded-[6px] border border-rule-strong bg-surface-2 px-[14px] py-[6px] text-[12px] font-[600] text-ink-3 no-underline transition-colors hover:bg-rule">
                    {isEs ? "Ver detalles" : "View details"}
                  </Link>
                </div>
              </div>
            ))}

            {/* Paginacion Loan Requests */}
            {reqTotalPages > 1 && (
              <div className="mt-[16px] flex items-center justify-between">
                <button 
                  disabled={reqPage === 1} 
                  onClick={() => setReqPage(p => p - 1)}
                  className="rounded-[6px] border border-rule bg-surface px-[12px] py-[6px] text-[12px] font-[600] text-ink-2 disabled:opacity-50 cursor-pointer"
                >
                  {isEs ? "Anterior" : "Previous"}
                </button>
                <span className="text-[12px] text-ink-3">{isEs ? `Pagina ${reqPage} de ${reqTotalPages}` : `Page ${reqPage} of ${reqTotalPages}`}</span>
                <button 
                  disabled={reqPage === reqTotalPages} 
                  onClick={() => setReqPage(p => p + 1)}
                  className="rounded-[6px] border border-rule bg-surface px-[12px] py-[6px] text-[12px] font-[600] text-ink-2 disabled:opacity-50 cursor-pointer"
                >
                  {isEs ? "Siguiente" : "Next"}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* --- SECCION: CONTRATOS --- */}
      <div>
        <h2 className="mb-[16px] text-[16px] font-[800] text-ink">{isEs ? "Contratos formales" : "Formal contracts"}</h2>
        
        {contractIsLoading ? (
          <div className="p-10 text-[14px] text-ink-3 text-center">{isEs ? "Cargando contratos..." : "Loading contracts..."}</div>
        ) : contracts.length === 0 ? (
          <div className="rounded-[10px] border border-rule bg-surface p-[24px] text-center text-[13px] text-ink-3">
            {isEs ? "No tienes contratos en curso." : "You have no active contracts."}
          </div>
        ) : (
          <>
            {contracts.map((contract) => (
              <div key={contract.id} className="mb-[10px] cursor-pointer rounded-[10px] border border-rule bg-surface p-[16px_20px] transition-shadow hover:shadow-md dark:hover:shadow-none dark:hover:border-ink-3">
                <div className="mb-[10px] flex items-start justify-between">
                  <div>
                    <div className="text-[14px] font-[700] text-ink">{contract.property?.addressLine1}, {contract.property?.city} {contract.property?.state}</div>
                    <div className="mt-[2px] text-[12px] text-ink-3">{contract.contractNumber} • {formatCurrencyCompact(contract.currentTerms?.principalAmount)} • Funded</div>
                  </div>
                  <span className={`rounded-[10px] px-[10px] py-[3px] text-[11px] font-[700] ${contract.status === "ACTIVE" ? "bg-info-soft text-info" : contract.status === "DELINQUENT" ? "bg-crit-soft text-crit" : "bg-success-soft text-success"}`}>
                    {contract.status}
                  </span>
                </div>
                
                <div className="mb-[12px] flex flex-wrap gap-[20px]">
                  <div><div className="text-[10px] font-[700] uppercase tracking-[0.4px] text-ink-3">Loan</div><div className="mt-[1px] text-[13px] font-[700] text-ink">{formatCurrency(contract.currentTerms?.principalAmount)}</div></div>
                  <div><div className="text-[10px] font-[700] uppercase tracking-[0.4px] text-ink-3">Rate</div><div className="mt-[1px] text-[13px] font-[700] text-ink">{contract.currentTerms?.interestRate}%</div></div>
                  <div><div className="text-[10px] font-[700] uppercase tracking-[0.4px] text-ink-3">Monthly</div><div className="mt-[1px] text-[13px] font-[700] text-ink">{formatCurrency(contract.currentTerms?.calculatedMonthlyPayment)}</div></div>
                  <div><div className="text-[10px] font-[700] uppercase tracking-[0.4px] text-ink-3">Matures</div><div className="mt-[1px] text-[13px] font-[700] text-ink">{formatDate(contract.currentTerms?.maturityDate)}</div></div>
                </div>

                {renderProgressBar("contract", contract.status)}

                <div className="mt-[16px] flex justify-end border-t border-rule pt-[12px]">
                  {contract.status === "PAID_OFF" ? (
                  <Link href={`/borrowerDashboard/leave-a-review?contractId=${contract.id}`} className="cursor-pointer rounded-[6px] bg-accent px-[14px] py-[6px] text-[12px] font-[600] text-white no-underline transition-colors hover:bg-blue-700">
                    {isEs ? "Calificar prestamista" : "Rate lender"}
                  </Link>
                ) : (
                  <Link href={`/borrowerDashboard/contracts/${contract.id}`} className="rounded-[6px] border border-rule-strong bg-surface-2 px-[14px] py-[6px] text-[12px] font-[600] text-ink-3 no-underline transition-colors hover:bg-rule">
                      {isEs ? "Ver contrato" : "View contract"}
                    </Link>
                )}
              </div>
              </div>
            ))}

            {/* Paginacion Contracts */}
            {contractTotalPages > 1 && (
              <div className="mt-[16px] flex items-center justify-between">
                <button 
                  disabled={contractPage === 1} 
                  onClick={() => setContractPage(p => p - 1)}
                  className="rounded-[6px] border border-rule bg-surface px-[12px] py-[6px] text-[12px] font-[600] text-ink-2 disabled:opacity-50 cursor-pointer"
                >
                  {isEs ? "Anterior" : "Previous"}
                </button>
                <span className="text-[12px] text-ink-3">{isEs ? `Pagina ${contractPage} de ${contractTotalPages}` : `Page ${contractPage} of ${contractTotalPages}`}</span>
                <button 
                  disabled={contractPage === contractTotalPages} 
                  onClick={() => setContractPage(p => p + 1)}
                  className="rounded-[6px] border border-rule bg-surface px-[12px] py-[6px] text-[12px] font-[600] text-ink-2 disabled:opacity-50 cursor-pointer"
                >
                  {isEs ? "Siguiente" : "Next"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}