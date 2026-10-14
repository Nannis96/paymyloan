"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useSite } from "@/app/components/layout/SiteShell";
import { API_ROUTES } from "@/app/lib/endpoints";

export default function DealView() {
  const { t, lang } = useSite();
  const dp = t.dealPage;
  const isEs = lang === "es";
  
  const params = useParams();
  const id = params?.id as string;

  const [deal, setDeal] = useState<any>(null);
  const [quotes, setQuotes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    async function fetchDealDetails() {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        const headers = { Authorization: `Bearer ${token}` };

        const resDeal = await fetch(`/api/borrowers/me/loan-requests/${id}`, { headers });
        if (resDeal.ok) {
          const jsonDeal = await resDeal.json();
          if (jsonDeal.success) {
            setDeal(jsonDeal.data);
          }
        }

        const resQuotes = await fetch(`/api/borrowers/me/loan-requests/${id}/quotes`, { headers });
        if (resQuotes.ok) {
          const jsonQuotes = await resQuotes.json();
          if (jsonQuotes.success) {
            setQuotes(jsonQuotes.data || []);
          }
        }
      } catch (error) {
        console.error("Error fetching deal details:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDealDetails();
  }, [id]);

  if (isLoading) {
    return <div className="p-10 text-[14px] text-ink-3">{isEs ? "Cargando trato..." : "Loading deal..."}</div>;
  }

  if (!deal) {
    return (
      <div className="p-10 text-center text-[14px] text-ink-3">
        {isEs ? "No se encontro el trato o no tienes permisos para verlo." : "Deal not found or you don't have permission to view it."}
        <br />
        <Link href="/borrowerDashboard" className="mt-4 inline-block text-accent hover:underline">
          {dp.back}
        </Link>
      </div>
    );
  }

  // Formaters
  const formatCurrency = (val: any) => {
    const num = parseFloat(val);
    if (isNaN(num)) return "$0";
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(num);
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString(isEs ? "es-MX" : "en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  // Safe Math
  const numLoan = parseFloat(deal.totalLoanAmountRequested) || 0;
  const numPurchase = parseFloat(deal.purchasePrice) || 0;
  const numRehab = parseFloat(deal.rehabAmount) || 0;
  const numArv = parseFloat(deal.property?.afterRepairValue) || 0;
  
  const profit = numArv - (numPurchase + numRehab);
  const ltv = numArv > 0 ? ((numLoan / numArv) * 100).toFixed(1) : "0.0";

  return (
    <div className="min-h-screen bg-bg font-sans">
      {/* Main Content */}
      <div className="mx-auto max-w-[800px] px-6 py-8 pb-20 animate-in fade-in duration-300">
        <Link
          href="/borrowerDashboard"
          className="mb-6 inline-block text-[13px] font-semibold text-ink-3 transition-colors hover:text-accent"
        >
          {dp.back}
        </Link>

        {/* Header */}
        <div className="mb-6">
          <div className="text-[22px] font-black tracking-tight text-ink">
            {deal.property?.addressLine1}, {deal.property?.city} {deal.property?.state} {deal.property?.postalCode}
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-3.5">
            <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-bold text-accent">{deal.projectType?.replace(/_/g, " ")}</span>
            <span className="rounded-full bg-success-soft px-2.5 py-1 text-[11px] font-bold text-success">{deal.status}</span>
            <span className="text-xs text-ink-3">
              {isEs ? "Publicado" : "Posted"} {formatDate(deal.createdAt)}
            </span>
          </div>
        </div>

        {/* Two Columns */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_280px]">
          
          {/* Left Column */}
          <div>
            {/* Key Numbers */}
            <div className="mb-3.5 overflow-hidden rounded-[10px] border border-rule bg-surface">
              <div className="border-b border-rule px-5 py-3.5">
                <div className="text-[13px] font-bold text-ink">{dp.cards.numbers}</div>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-3 gap-3">
                  <Metric label={dp.metrics.requested} value={formatCurrency(numLoan)} valueColor="text-accent" />
                  <Metric label={dp.metrics.price} value={formatCurrency(numPurchase)} />
                  <Metric label={dp.metrics.rehab} value={formatCurrency(numRehab)} />
                  <Metric label={dp.metrics.arv} value={formatCurrency(numArv)} />
                  <Metric label={dp.metrics.profit} value={profit > 0 ? `+${formatCurrency(profit)}` : formatCurrency(profit)} valueColor={profit > 0 ? "text-success" : "text-crit"} />
                  <Metric label={dp.metrics.ltv} value={`${ltv}%`} valueColor={parseFloat(ltv) > 75 ? "text-crit" : "text-accent"} />
                </div>
                <div className="mt-3.5 flex items-center gap-2.5">
                  <span className="w-8 text-xs font-semibold text-ink-2">LTV</span>
                  <div className="flex-1 h-2 overflow-hidden rounded-full bg-rule">
                    <div className="h-full rounded-full bg-accent transition-all duration-300" style={{ width: `${Math.min(parseFloat(ltv), 100)}%`, backgroundColor: parseFloat(ltv) > 75 ? '#ef4444' : '' }}></div>
                  </div>
                  <span className={`w-10 text-right text-xs font-bold ${parseFloat(ltv) > 75 ? "text-crit" : "text-accent"}`}>{ltv}%</span>
                </div>
              </div>
            </div>

            {/* Deal Details */}
            <div className="mb-3.5 overflow-hidden rounded-[10px] border border-rule bg-surface">
              <div className="border-b border-rule px-5 py-3.5">
                <div className="text-[13px] font-bold text-ink">{dp.cards.details}</div>
              </div>
              <div className="p-5">
                <DetailRow label={dp.details.typeLabel} value={deal.projectType?.replace(/_/g, " ")} />
                <DetailRow label={dp.details.propTypeLabel} value={deal.property?.propertyType?.replace(/_/g, " ")} />
                <DetailRow label={dp.details.bedsLabel} value={`${deal.property?.bedrooms || 0} bed / ${deal.property?.bathrooms || 0} bath`} />
                <DetailRow label={dp.details.sqftLabel} value={`${deal.property?.squareFootage || 0} sq ft`} />
                <DetailRow label={dp.details.closeLabel} value={formatDate(deal.requestedClosingDate)} />
                <DetailRow label={isEs ? "Notas" : "Notes"} value={deal.requestedTimelineNotes || (isEs ? "N/D" : "N/A")} />
              </div>
            </div>

            {/* Borrower profile (Tú) */}
            <div className="mb-3.5 overflow-hidden rounded-[10px] border border-rule bg-surface">
              <div className="border-b border-rule px-5 py-3.5">
                <div className="text-[13px] font-bold text-ink">{dp.cards.borrower}</div>
              </div>
              <div className="flex items-center gap-3 p-5">
                <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-brand-dark text-sm font-bold text-white">
                  TU
                </div>
                <div>
                  <div className="text-[13px] font-bold text-ink">{isEs ? "Tu perfil" : "Your profile"}</div>
                  <div className="mt-0.5 text-[11px] text-ink-3">{isEs ? "Los prestamistas verán tu perfil al revisar el trato." : "Lenders will see your profile when reviewing the deal."}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Sticky Offer Panel) */}
          <div>
            <div className="sticky top-[68px] rounded-[10px] border border-rule bg-surface p-5">
              <div className="mb-1 text-sm font-black text-ink">{isEs ? "Estado de Ofertas" : "Offers Status"}</div>
              <div className="mb-4 text-xs text-ink-3">
                {quotes.length > 0 
                  ? (isEs ? "Prestamistas han enviado propuestas." : "Lenders have submitted quotes.")
                  : (isEs ? "Esperando que los prestamistas coticen tu trato." : "Waiting for lenders to quote your deal.")}
              </div>
              
              <OfferRow label={dp.metrics.requested} value={formatCurrency(numLoan)} />
              <OfferRow label={dp.metrics.arv} value={formatCurrency(numArv)} />
              <OfferRow label={dp.metrics.ltv} value={`${ltv}%`} />
              
              {quotes.length > 0 ? (
                <button
                  className="mt-4 w-full cursor-pointer rounded-md bg-accent p-3 text-sm font-bold text-white transition-colors hover:bg-blue-700"
                >
                  {isEs ? `Ver ${quotes.length} oferta(s)` : `View ${quotes.length} offer(s)`}
                </button>
              ) : (
                <button
                  disabled
                  className="mt-4 w-full cursor-not-allowed rounded-md bg-surface-2 p-3 text-sm font-bold text-ink-3 border border-rule"
                >
                  {isEs ? "Aún no hay ofertas" : "No offers yet"}
                </button>
              )}

              <div className="mt-3.5 text-center text-[11px] text-ink-3">
                {quotes.length} {isEs ? "oferta(s) recibidas" : "quote(s) received"}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// Helpers para mantener el código limpio
function Metric({ label, value, valueColor = "text-ink" }: { label: string; value: string; valueColor?: string }) {
  return (
    <div className="rounded-lg border border-rule bg-surface-2 px-3.5 py-3">
      <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.5px] text-ink-3">{label}</div>
      <div className={`text-[18px] font-black ${valueColor}`}>{value}</div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-surface-2 py-[7px] text-[13px] last:border-0">
      <span className="text-ink-3">{label}</span>
      <span className="font-semibold text-ink text-right max-w-[60%]">{value}</span>
    </div>
  );
}

function OfferRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-surface-2 py-1.5 text-[13px] last:mb-0 last:border-0">
      <span className="text-ink-3">{label}</span>
      <span className="font-bold text-ink">{value}</span>
    </div>
  );
}