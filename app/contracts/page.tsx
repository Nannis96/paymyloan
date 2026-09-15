"use client";

import Link from "next/link";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import { useEffect, useState } from "react";
import BackToDashboard from "../components/BackToDashboard";
// URL base de la API. Toma la variable de entorno o usa localhost:4000 por defecto
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

// Interfaces basadas en la respuesta de Prisma / Backend
interface PropertyData {
  addressLine1: string;
  city: string;
  state: string;
  propertyType: string;
}

interface ContractTermsData {
  principalAmount: number | string;
  interestRate: number | string;
  calculatedMonthlyPayment: number | string | null;
}

interface ContractBorrowerData {
  borrowerProfile: {
    user?: {
      name: string;
      phone: string | null;
    };
  };
  isPrimary: boolean;
}

interface ContractItem {
  id: string;
  contractNumber: string;
  status: string;
  property: PropertyData;
  currentTerms: ContractTermsData | null;
  borrowers?: ContractBorrowerData[];
}

function ContractsContent() {
  const { t } = useSite();
  const c = t.contractsList;

  const [contracts, setContracts] = useState<ContractItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContracts() {
      try {
        const token = localStorage.getItem("accessToken") || "";

        const response = await fetch(`${API_URL}/api/contracts`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        });

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            throw new Error(c.errorAuth);
          }
          throw new Error(`HTTP ${response.status}: ${c.errorFetch}`);
        }

        const json = await response.json();

        if (json.success) {
          setContracts(json.data.items || []);
        } else {
          throw new Error(json.error?.message || c.errorFetch);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : c.errorNetwork);
      } finally {
        setIsLoading(false);
      }
    }

    fetchContracts();
  }, [c.errorAuth, c.errorFetch, c.errorNetwork]);

  // Formateadores
  const formatCurrency = (amount: number | string | null | undefined) => {
    if (amount == null) return "N/D";
    return Number(amount).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
  };

  const formatPropertyType = (type: string) => {
    return type.replace(/_/g, " ");
  };

  // Helper para obtener el deudor principal
  const getPrimaryBorrower = (borrowers?: ContractBorrowerData[]) => {
    if (!borrowers || borrowers.length === 0) return { name: c.unassigned, phone: "" };
    const primary = borrowers.find(b => b.isPrimary) || borrowers[0];
    return {
      name: primary?.borrowerProfile?.user?.name || c.borrowerFallback,
      phone: primary?.borrowerProfile?.user?.phone || ""
    };
  };

  // Helper para mapear el estado a estilos y textos
  const getStatusDisplay = (status: string) => {
    const isActiveType = ["ACTIVE", "PAID_OFF"].includes(status);
    const isWarningType = ["DELINQUENT", "PENDING_ACCEPTANCE"].includes(status);
    
    let colorClass = "bg-gray-100 border-gray-200 text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400";
    if (isActiveType) colorClass = "bg-green-100 border-green-200 text-green-700 dark:bg-green-900/30 dark:border-green-800 dark:text-green-400";
    if (isWarningType) colorClass = "bg-amber-100 border-amber-200 text-amber-700 dark:bg-amber-900/30 dark:border-amber-800 dark:text-amber-400";

    return { label: status, colorClass };
  };

  return (
    <div className="min-h-screen bg-bg p-6 lg:p-14">
      <div className="mx-auto max-w-[1200px]">
        
        <BackToDashboard />

        <header className="mb-10">
          <h1 className="text-[32px] font-black tracking-tight text-ink">{c.title}</h1>
          <p className="text-ink-2">{c.subtitle}</p>
        </header>

        <div className="overflow-x-auto rounded-xl border border-rule bg-surface shadow-sm">
          <table className="w-full min-w-[900px] border-collapse text-left text-[14px]">
            <thead className="border-b border-rule bg-surface-2">
              <tr>
                <th className="px-5 py-4 font-bold text-ink-3">{c.table.id}</th>
                <th className="px-5 py-4 font-bold text-ink-3">{c.table.concept}</th>
                <th className="px-5 py-4 font-bold text-ink-3">{c.table.property}</th>
                <th className="px-5 py-4 font-bold text-ink-3">{c.table.client}</th>
                <th className="px-5 py-4 font-bold text-ink-3">{c.table.financials}</th>
                <th className="px-5 py-4 font-bold text-ink-3">{c.table.status}</th>
                <th className="px-5 py-4 font-bold text-ink-3">{c.table.actions}</th>
              </tr>
            </thead>
            <tbody className="text-ink-2">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-ink-3">
                    {c.loading}
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-crit">
                    {error}
                  </td>
                </tr>
              ) : contracts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-ink-3">
                    {c.empty}
                  </td>
                </tr>
              ) : (
                contracts.map((contract) => {
                  const client = getPrimaryBorrower(contract.borrowers);
                  const statusInfo = getStatusDisplay(contract.status);

                  return (
                    <tr key={contract.id} className="border-b border-rule hover:bg-surface-2 transition-colors">
                      <td className="px-5 py-4 font-bold text-ink">{contract.contractNumber}</td>
                      <td className="px-5 py-4 capitalize">{formatPropertyType(contract.property.propertyType)}</td>
                      <td className="px-5 py-4 font-medium text-ink">
                        {contract.property.addressLine1}, {contract.property.city}
                      </td>
                      <td className="px-5 py-4">
                        <div className="font-medium text-ink">{client.name}</div>
                        <div className="text-xs text-ink-3">{client.phone}</div>
                      </td>
                      <td className="px-5 py-4">
                        {contract.currentTerms ? (
                          <>
                            <div className="font-bold text-accent">
                              {contract.currentTerms.calculatedMonthlyPayment 
                                ? `${formatCurrency(contract.currentTerms.calculatedMonthlyPayment)}${c.perMonth}`
                                : `${Number(contract.currentTerms.interestRate)}${c.interest}`}
                            </div>
                            <div className="text-xs text-ink-3">
                              {c.total} {formatCurrency(contract.currentTerms.principalAmount)}
                            </div>
                          </>
                        ) : (
                          <div className="text-xs text-ink-3">{c.noTerms}</div>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex rounded-[4px] border px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider ${statusInfo.colorClass}`}>
                          {statusInfo.label}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <Link href={`/contracts/${contract.id}`} className="text-sm font-bold text-accent hover:underline">
                          {c.viewDetails} &rarr;
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function ContractsPage() {
  return (
    <SiteShell isDashboard={true}>
      <ContractsContent />
    </SiteShell>
  );
}