"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSite } from "@/app/components/layout/SiteShell";
import { Lock, ChevronLeft } from "lucide-react";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function LenderDealDetailPage() {
  return <LenderDealDetailContent />;
}

function LenderDealDetailContent() {
  const params = useParams();
  const router = useRouter();
  const { t, lang } = useSite();
  const isEs = lang === "es";
  const m = t.marketplace.dealDetails;

  // Estados de datos
  const [deal, setDeal] = useState<any>(null);
  const [borrowerRating, setBorrowerRating] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados del formulario de oferta
  const [loanRaw, setLoanRaw] = useState("");
  const [rateStr, setRateStr] = useState("");
  const [termMonths, setTermMonths] = useState(12);
  const [pointsVal, setPointsVal] = useState(0); // Mantenido para el calculo en UI
  const [offerMessage, setOfferMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock de fotos (Aun no soportado en la API segun API_REFERENCE.md)
  const photos = [
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80",
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80"
  ];
  const [mainPhoto, setMainPhoto] = useState(photos[0]);

  // Fetch del trato y la calificacion
  useEffect(() => {
    async function fetchDealData() {
      try {
        const token = localStorage.getItem("accessToken") || "";
        const headers = { Authorization: `Bearer ${token}` };

        // 1. Cargar el trato
        const dealRes = await fetch(`${BASE_URL}/api/marketplace/loan-requests/${params.id}`, { headers });
        const dealJson = await dealRes.json();

        if (dealJson.success && dealJson.data) {
          const dealData = dealJson.data;
          setDeal(dealData);
          setLoanRaw(dealData.totalLoanAmountRequested?.toString() || "");

          // 2. Si el trato tiene borrowerProfileId, cargamos su calificacion
          if (dealData.borrowerProfileId) {
            const ratingRes = await fetch(`${BASE_URL}/api/borrowers/${dealData.borrowerProfileId}/rating`, { headers });
            const ratingJson = await ratingRes.json();
            if (ratingJson.success) {
              setBorrowerRating(ratingJson.data);
            }
          }
        } else {
          setError(dealJson.error?.message || t.marketplace.errorFetch);
        }
      } catch (e) {
        setError(t.marketplace.errorNetwork);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDealData();
  }, [params.id, t.marketplace.errorFetch, t.marketplace.errorNetwork]);

  // Enviar Oferta (POST /quotes)
  const handleSubmitOffer = async () => {
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("accessToken") || "";
      const loanAmount = parseInt(loanRaw.replace(/[^0-9]/g, "")) || 0;
      const rate = parseFloat(rateStr) || 0;

      const body = {
        structure: "INTEREST_ONLY", // Por defecto para prestamos puente en esta fase
        principalAmount: loanAmount,
        interestRate: rate,
        amortizationTermMonths: termMonths,
        message: offerMessage
      };

      const res = await fetch(`${BASE_URL}/api/marketplace/loan-requests/${params.id}/quotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });

      const json = await res.json();
      if (json.success) {
        // Redirigir a ofertas enviadas
        router.push("/lenderDashboard/offers-sent");
      } else {
        alert(json.error?.message || "Error al enviar la oferta");
      }
    } catch (e) {
      alert("Error de red");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCounterOffer = () => {
    router.push(`/lenderDashboard/counter-offer?dealId=${params.id}`);
  };

  const formatCurrency = (val: number | string) => {
    const num = Number(val) || 0;
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(num);
  };

  // Calculos de UI para el formulario
  const loanAmount = parseInt(loanRaw.replace(/[^0-9]/g, "")) || 0;
  const rate = parseFloat(rateStr) || 0;
  const monthlyPmt = Math.round(loanAmount * (rate / 100) / 12);
  const pointsCost = Math.round(loanAmount * (pointsVal / 100));
  const totalInterest = (monthlyPmt * termMonths) + pointsCost;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg">
        <div className="text-sm text-ink-3">{t.marketplace.loading}</div>
      </div>
    );
  }

  if (error || !deal) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg">
        <div className="text-sm text-red-500">{error || "Trato no encontrado"}</div>
      </div>
    );
  }

  // Variables derivadas del trato real
  const arv = Number(deal.property?.afterRepairValue || 0);
  const rehab = Number(deal.rehabAmount || 0);
  const purchase = Number(deal.purchasePrice || 0);
  const requested = Number(deal.totalLoanAmountRequested || 0);
  const ltv = arv > 0 ? Math.round((requested / arv) * 100) : 0;
  const allIn = purchase + rehab;
  const profit = arv - allIn;
  const isAddressHidden = !deal.property?.addressLine1;
  const displayAddress = deal.property?.addressLine1 || (isEs ? "Direccion oculta" : "Address shielded");
  const displayCityState = `${deal.property?.city || "Ciudad"}, ${deal.property?.state || "Estado"}`;

  return (
    <div className="min-h-screen bg-bg p-4 sm:p-6 lg:p-10 font-sans">
      <div className="mx-auto max-w-[1100px]">
        <Link
          href="/lenderDashboard/browse-deals"
          className="mb-6 inline-flex items-center gap-2 rounded-md border border-rule bg-surface px-3 py-1.5 text-[13px] font-semibold text-ink-2 transition-colors hover:border-ink-3"
        >
          <ChevronLeft size={16} />
          {m.back}
        </Link>

        <div className="flex flex-col items-start gap-6 lg:flex-row">
          {/* LEFT COLUMN */}
          <div className="flex-1 w-full space-y-6">
            
            {/* Header & Gallery */}
            <div className="rounded-[10px] border border-rule bg-surface p-5">
              <div className="mb-4 flex flex-col justify-between sm:flex-row sm:items-start">
                <div>
                  <div className="mb-2.5 inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                    <span className="h-2 w-2 rounded-full bg-green-600"></span>
                    {deal.status === "PUBLISHED" ? (isEs ? "Necesita Fondeo" : "Needs Funding") : deal.status}
                  </div>
                  <h1 className="mb-1 text-[22px] font-black tracking-tight text-ink">{displayAddress}</h1>
                  <p className="text-sm text-ink-3">{displayCityState} {deal.property?.postalCode}</p>
                </div>
                <div className="mt-2 text-left sm:mt-0 sm:text-right">
                  <div className="mb-1 text-[11px] text-ink-3">
                    {new Date(deal.createdAt).toLocaleDateString()}
                  </div>
                  <div className="text-[11px] text-ink-3 uppercase">{deal.projectType?.replace(/_/g, " ")}</div>
                </div>
              </div>

              <div className="flex gap-2">
                <div className="relative flex-1 overflow-hidden rounded-lg bg-surface-2 h-[240px] border border-rule">
                  <img src={mainPhoto} alt="Property" className="h-full w-full object-cover" />
                </div>
                <div className="flex w-[80px] flex-col gap-1.5">
                  {photos.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => setMainPhoto(src)}
                      className={`h-[62px] w-full overflow-hidden rounded-md border-2 transition-colors ${
                        mainPhoto === src ? "border-accent" : "border-transparent"
                      }`}
                    >
                      <img src={src} className="h-full w-full object-cover" alt="" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Borrower Profile */}
            <div className="rounded-[10px] border border-rule bg-surface overflow-hidden">
              <div className="flex items-center justify-between border-b border-rule px-[18px] py-3.5">
                <div className="text-[13px] font-extrabold text-ink">{m.borrowerProfile}</div>
                {isAddressHidden && (
                  <div className="text-[10px] font-bold uppercase tracking-[0.5px] text-ink-3">{m.identityShielded}</div>
                )}
              </div>

              <div className="flex items-center gap-3.5 border-b border-rule bg-surface-2 px-[18px] py-4">
                <div className="relative h-14 w-14 shrink-0">
                  <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-rule blur-[8px] select-none">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80" alt="" className="h-full w-full object-cover" />
                  </div>
                  {isAddressHidden && (
                    <div className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-surface bg-accent">
                      <Lock size={10} className="text-white" />
                    </div>
                  )}
                </div>
                <div>
                  <div className={`mb-0.5 text-sm font-extrabold text-ink ${isAddressHidden ? "blur-[5px] select-none" : ""}`}>
                    {isAddressHidden ? "Hidden Name" : "Borrower Name"}
                  </div>
                  <div className={`mb-1.5 text-[11px] text-ink-3 ${isAddressHidden ? "blur-[4px] select-none" : ""}`}>
                    {isAddressHidden ? "Hidden Entity LLC" : "Entity LLC"}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-b border-rule px-[18px] py-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-[52px] w-[52px] flex-col items-center justify-center rounded-full border-2 border-accent bg-accent-soft">
                    <span className="text-lg font-black leading-none text-accent">
                      {borrowerRating?.average ? borrowerRating.average.toFixed(1) : "N/D"}
                    </span>
                    <span className="text-[8px] font-bold uppercase tracking-[0.5px] text-ink-3">{m.score}</span>
                  </div>
                  <div className="text-[11px] leading-[1.6] text-ink-2">
                    <strong className="text-ink">{m.goodStanding}</strong><br />
                    {borrowerRating?.count || 0} {isEs ? "Reseñas recibidas" : "Reviews received"}
                  </div>
                </div>
              </div>

              {isAddressHidden && (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-[18px] py-3">
                  <div className="text-[11px] leading-[1.5] text-ink-3">
                    <strong className="text-ink">{m.unlockBar}</strong><br />
                    {m.unlockSub}
                  </div>
                </div>
              )}
            </div>

            {/* Deal Numbers */}
            <div className="rounded-[10px] border border-rule bg-surface p-5">
              <div className="mb-3.5 border-b-2 border-accent-soft pb-2 text-[12px] font-bold uppercase tracking-[0.7px] text-accent">
                {m.dealNumbers}
              </div>
              <div className="grid grid-cols-2 gap-[1px] overflow-hidden rounded-lg border border-rule bg-rule sm:grid-cols-4">
                <div className="bg-surface p-3.5">
                  <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.5px] text-ink-3">{m.loanRequested}</div>
                  <div className="text-[18px] font-extrabold text-ink">{formatCurrency(requested)}</div>
                </div>
                <div className="bg-surface p-3.5">
                  <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.5px] text-ink-3">{m.arv}</div>
                  <div className="text-[18px] font-extrabold text-ink">{formatCurrency(arv)}</div>
                </div>
                <div className="bg-surface p-3.5">
                  <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.5px] text-ink-3">{m.ltvLabel}</div>
                  <div className={`text-[18px] font-extrabold ${ltv > 75 ? "text-red-500" : "text-accent"}`}>{ltv}%</div>
                </div>
                <div className="bg-surface p-3.5">
                  <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.5px] text-ink-3">{isEs ? "Tipo" : "Type"}</div>
                  <div className="text-[14px] font-extrabold text-ink capitalize">{deal.projectType?.replace(/_/g, " ").toLowerCase()}</div>
                </div>
              </div>
              <div className="mt-3.5 grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <div><span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.5px] text-ink-3">{m.purchasePrice}</span><span className="text-[13px] font-semibold text-ink">{formatCurrency(purchase)}</span></div>
                <div><span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.5px] text-ink-3">{m.rehabBudget}</span><span className="text-[13px] font-semibold text-ink">{formatCurrency(rehab)}</span></div>
                <div><span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.5px] text-ink-3">{m.allInCost}</span><span className="text-[13px] font-semibold text-ink">{formatCurrency(allIn)}</span></div>
                <div><span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.5px] text-ink-3">{m.profitArv}</span><span className="text-[13px] font-semibold text-ink">{formatCurrency(profit)}</span></div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (OFFER FORM) */}
          <div className="w-full lg:sticky lg:top-[90px] lg:w-[380px] shrink-0 rounded-xl border border-rule bg-surface p-6 shadow-sm">
            <h2 className="mb-1 text-[18px] font-extrabold text-ink">{m.submitOffer}</h2>
            <p className="mb-5 text-xs text-ink-3">{displayAddress}, {displayCityState}</p>

            <div className="mb-3.5">
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.5px] text-ink-2">{m.formLoanAmount}</label>
              <input
                type="text"
                value={loanRaw}
                onChange={(e) => {
                  const numStr = e.target.value.replace(/[^0-9]/g, "");
                  setLoanRaw(numStr ? parseInt(numStr).toLocaleString() : "");
                }}
                className="w-full rounded-md border border-rule px-3 py-2 text-[13px] text-ink outline-none transition-colors focus:border-accent"
              />
            </div>

            <div className="mb-3.5 grid grid-cols-2 gap-2.5">
              <div>
                <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.5px] text-ink-2">{m.formRate}</label>
                <input type="number" step="0.1" value={rateStr} onChange={(e) => setRateStr(e.target.value)} placeholder="Ej. 12" className="w-full rounded-md border border-rule px-3 py-2 text-[13px] text-ink outline-none transition-colors focus:border-accent" />
              </div>
              <div>
                <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.5px] text-ink-2">{m.formTerm}</label>
                <select value={termMonths} onChange={(e) => setTermMonths(Number(e.target.value))} className="w-full rounded-md border border-rule px-3 py-2 text-[13px] text-ink outline-none transition-colors focus:border-accent bg-white">
                  <option value={6}>6 mo</option>
                  <option value={9}>9 mo</option>
                  <option value={12}>12 mo</option>
                  <option value={18}>18 mo</option>
                  <option value={24}>24 mo</option>
                </select>
              </div>
            </div>

            <div className="mb-3.5">
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.5px] text-ink-2">{m.formMsg || "Mensaje (Opcional)"}</label>
              <textarea 
                value={offerMessage}
                onChange={(e) => setOfferMessage(e.target.value)}
                placeholder={m.formMsgPh || "Escribe un mensaje al prestatario..."}
                className="w-full h-[80px] resize-none rounded-md border border-rule px-3 py-2 text-[13px] text-ink outline-none transition-colors focus:border-accent" 
              />
            </div>

            <div className="mb-4 rounded-lg border border-rule bg-surface-2 p-3.5 text-xs text-ink-2">
              <div className="mb-1 flex justify-between">
                <span>{m.formLoanAmount}</span>
                <span className="font-semibold">{formatCurrency(loanAmount)}</span>
              </div>
              <div className="mb-1 flex justify-between">
                <span>{m.calcMoInt}</span>
                <span className="font-semibold">{formatCurrency(monthlyPmt)}</span>
              </div>
              <div className="mt-1 flex justify-between border-t border-rule pt-2 text-sm font-extrabold text-ink">
                <span>{m.calcTotalInt}</span>
                <span>{formatCurrency(totalInterest)}</span>
              </div>
            </div>

            <button disabled={isSubmitting} onClick={handleSubmitOffer} className="mb-2 w-full rounded-md bg-accent py-3 text-[14px] font-bold text-white transition-colors hover:bg-[#524ddb] disabled:opacity-50">
              {isSubmitting ? "Enviando..." : m.btnSubmit}
            </button>

            {/* Contraoferta */}
            <button onClick={handleCounterOffer} className="mb-4 w-full rounded-md border border-accent bg-accent-soft py-3 text-[14px] font-bold text-accent transition-colors hover:bg-[#e0deff]">
              {t.uiComponents.dealCard.counterOffer || "Contraoferta"}
            </button>

            <hr className="my-4 border-rule" />
            <p className="text-center text-[11px] leading-[1.6] text-ink-3">
              {m.offerNote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}