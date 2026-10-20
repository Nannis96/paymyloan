"use client";

import { apiFetch } from "@/app/lib/apiFetch";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSite } from "@/app/components/layout/SiteShell";
import { API_ROUTES } from "@/app/lib/endpoints";

interface LoanQuote {
  id: string;
  status: string;
  principalAmount: number | string;
  interestRate: number | string;
  createdAt?: string;
}

interface LoanRequestItem {
  id: string;
  property: {
    addressLine1: string;
    city: string;
    state: string;
  };
  quotes?: LoanQuote[];
}

export default function OffersSentView() {
  const { t, lang } = useSite();
  const os = t.dashboardLender.offersSent;

  const [dealsWithOffers, setDealsWithOffers] = useState<LoanRequestItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSentOffers() {
      try {
        const res = await apiFetch(API_ROUTES.marketplace.loanRequests);
        
        const json = await res.json();
        
        if (json.success) {
          // Filtramos solo los tratos que traen cotizaciones enviadas por este prestamista
          const items = json.data.items || [];
          const filteredDeals = items.filter((deal: LoanRequestItem) => deal.quotes && deal.quotes.length > 0);
          setDealsWithOffers(filteredDeals);
        } else {
          throw new Error(json.error?.message || t.dashboardLender.errorFetch);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : t.dashboardLender.errorNetwork);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSentOffers();
  }, [t.dashboardLender.errorFetch, t.dashboardLender.errorNetwork]);

  const formatCurrency = (val: any) => {
    if (!val) return "$0";
    return Number(val).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 });
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "N/D";
    return new Date(dateStr).toLocaleDateString(lang === "es" ? "es-MX" : "en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  // Helper para pintar el estilo correcto segun el estado de la cotizacion
  const getStatusDisplay = (status: string) => {
    const s = status.toUpperCase();
    let colorClass = "bg-[#f6f9fc] text-[#8898aa]"; // default / withdrawn
    
    if (s === "SUBMITTED") colorClass = "bg-[#e3f2fd] text-[#1565c0]";
    if (s === "SELECTED") colorClass = "bg-[#e8f5e9] text-[#2e7d32]";
    if (s === "DECLINED") colorClass = "bg-[#fff8e1] text-[#b45309]";

    const label = os.status[s as keyof typeof os.status] || status;
    return { label, colorClass };
  };

  return (
    <div className="animate-in fade-in duration-300">
      <div className="mb-[4px] text-[20px] font-[800] tracking-[-0.3px] text-[#0a2540]">
        {os.title}
      </div>
      <div className="mb-[24px] text-[13px] text-[#8898aa]">
        {os.subtitle}
      </div>

      <div className="overflow-hidden rounded-[10px] border border-[#e6ebf1] bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] border-collapse text-left">
            <thead>
              <tr>
                <th className="border-b border-[#e6ebf1] bg-[#f6f9fc] p-[12px_20px] text-[10px] font-[700] uppercase tracking-[0.5px] text-[#aab7c4]">{os.table.property}</th>
                <th className="border-b border-[#e6ebf1] bg-[#f6f9fc] p-[12px_20px] text-[10px] font-[700] uppercase tracking-[0.5px] text-[#aab7c4]">{os.table.amount}</th>
                <th className="border-b border-[#e6ebf1] bg-[#f6f9fc] p-[12px_20px] text-[10px] font-[700] uppercase tracking-[0.5px] text-[#aab7c4]">{os.table.rate}</th>
                <th className="border-b border-[#e6ebf1] bg-[#f6f9fc] p-[12px_20px] text-[10px] font-[700] uppercase tracking-[0.5px] text-[#aab7c4]">{os.table.date}</th>
                <th className="border-b border-[#e6ebf1] bg-[#f6f9fc] p-[12px_20px] text-[10px] font-[700] uppercase tracking-[0.5px] text-[#aab7c4]">{os.table.status}</th>
                <th className="border-b border-[#e6ebf1] bg-[#f6f9fc] p-[12px_20px] text-[10px] font-[700] uppercase tracking-[0.5px] text-[#aab7c4]">{os.table.action}</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="p-[40px] text-center text-[13px] text-[#8898aa]">
                    {t.dashboardLender.loading}
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={6} className="p-[40px] text-center text-[13px] text-red-500">
                    {error}
                  </td>
                </tr>
              ) : dealsWithOffers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-[40px] text-center text-[13px] text-[#8898aa]">
                    {os.empty}
                  </td>
                </tr>
              ) : (
                dealsWithOffers.map((deal) => {
                  // Tomamos la primera cotizacion enviada a este trato para representarla en la fila
                  const quote = deal.quotes![0];
                  const statusInfo = getStatusDisplay(quote.status);

                  return (
                    <tr key={deal.id} className="border-b border-[#f6f9fc] transition-colors hover:bg-[#fafbfd] last:border-none">
                      <td className="p-[14px_20px]">
                        <div className="text-[13px] font-[700] text-[#0a2540]">
                          {deal.property?.addressLine1 || "Direccion oculta"}
                        </div>
                        <div className="mt-[2px] text-[11px] text-[#8898aa]">
                          {deal.property?.city}, {deal.property?.state}
                        </div>
                      </td>
                      <td className="p-[14px_20px] text-[13px] font-[700] text-[#0a2540]">
                        {formatCurrency(quote.principalAmount)}
                      </td>
                      <td className="p-[14px_20px] text-[13px] font-[600] text-[#425466]">
                        {quote.interestRate}%
                      </td>
                      <td className="p-[14px_20px] text-[12px] text-[#8898aa]">
                        {formatDate(quote.createdAt)}
                      </td>
                      <td className="p-[14px_20px]">
                        <span className={`inline-block rounded-[10px] px-[10px] py-[3px] text-[10px] font-[700] uppercase tracking-wide ${statusInfo.colorClass}`}>
                          {statusInfo.label}
                        </span>
                      </td>
                      <td className="p-[14px_20px]">
                        <Link 
                          href={`/lenderDashboard/browse-deals/${deal.id}`}
                          className="text-[12px] font-[600] text-[#635bff] transition-colors hover:text-[#0a2540] hover:underline"
                        >
                          {os.table.action} &rarr;
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