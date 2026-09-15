"use client";

import Link from "next/link";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import { useState, useEffect } from "react";
import BackToDashboard from "../components/BackToDashboard";
// URL base de la API. Toma la variable de entorno o usa localhost:4000 por defecto
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

// Interfaces para mapear la respuesta de la API segun el esquema de Prisma
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

  useEffect(() => {
    async function fetchDeals() {
      try {
        const token = localStorage.getItem("accessToken") || "";
        const response = await fetch(`${API_URL}/api/marketplace/loan-requests`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error(m.errorAuth);
          }
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

  // Funciones de formato de datos
  const formatCurrency = (amount: number | string) => {
    return Number(amount).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(lang === "es" ? "es-MX" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatProjectType = (type: string) => {
    return type.replace(/_/g, " ");
  };

  return (
    <div className="min-h-screen bg-bg p-6 lg:p-14">
      <div className="mx-auto max-w-[1100px]">
        
        <BackToDashboard />
        
        <header className="mb-10">
          <h1 className="text-[32px] font-black tracking-tight text-ink">{m.title}</h1>
          <p className="text-ink-2">{m.subtitle}</p>
        </header>

        <div className="overflow-x-auto rounded-xl border border-rule bg-surface shadow-sm">
          <table className="w-full min-w-[800px] border-collapse text-left text-[14px]">
            <thead className="border-b border-rule bg-surface-2">
              <tr>
                <th className="px-5 py-4 font-bold text-ink-3">{m.table.address}</th>
                <th className="px-5 py-4 font-bold text-ink-3">{m.table.amount}</th>
                <th className="px-5 py-4 font-bold text-ink-3">{m.table.closingDate}</th>
                <th className="px-5 py-4 font-bold text-ink-3">{m.table.borrowerScore}</th>
                <th className="px-5 py-4 font-bold text-ink-3"></th>
              </tr>
            </thead>
            <tbody className="text-ink-2">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-ink-3">
                    {m.loading}
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-crit">
                    {error}
                  </td>
                </tr>
              ) : deals.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-ink-3">
                    {m.empty}
                  </td>
                </tr>
              ) : (
                deals.map((deal) => (
                  <tr key={deal.id} className="border-b border-rule hover:bg-surface-2 transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-bold text-ink">
                        {deal.property.city}, {deal.property.state}
                      </div>
                      <div className="text-xs text-ink-3 uppercase">
                        {formatProjectType(deal.projectType)}
                      </div>
                    </td>
                    <td className="px-5 py-4 font-mono font-bold text-accent">
                      {formatCurrency(deal.totalLoanAmountRequested)}
                    </td>
                    <td className="px-5 py-4">
                      {formatDate(deal.requestedClosingDate)}
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex rounded-[4px] border border-amber/30 bg-amber-soft px-2.5 py-1 text-xs font-bold text-amber">
                        A+
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Link href={`/marketplace/${deal.id}`} className="inline-flex items-center justify-center rounded-lg bg-ink px-4 py-2 text-xs font-bold text-bg transition-opacity hover:opacity-90">
                        {m.table.action} &rarr;
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
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