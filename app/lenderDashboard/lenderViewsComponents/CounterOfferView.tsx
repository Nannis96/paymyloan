"use client";

import { useState, useEffect, Suspense } from "react";
import { useSite } from "@/app/components/layout/SiteShell";
import { useRouter, useSearchParams } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function CounterOfferView() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-sm text-[#8898aa]">Cargando...</div>}>
      <CounterOfferContent />
    </Suspense>
  );
}

function CounterOfferContent() {
  const { t, lang } = useSite();
  const isEs = lang === "es";
  const co = t.counterOffer;
  const router = useRouter();
  const searchParams = useSearchParams();
  const dealId = searchParams.get("dealId");

  const [isCountering, setIsCountering] = useState(false);
  const [deal, setDeal] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estados del formulario
  const [amountRaw, setAmountRaw] = useState("");
  const [rateStr, setRateStr] = useState("");
  const [termMonths, setTermMonths] = useState(12);
  const [pointsStr, setPointsStr] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (!dealId) {
      setIsLoading(false);
      return;
    }

    async function fetchDeal() {
      try {
        const token = localStorage.getItem("accessToken") || "";
        const res = await fetch(`${BASE_URL}/api/marketplace/loan-requests/${dealId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const json = await res.json();
        if (json.success && json.data) {
          setDeal(json.data);
          setAmountRaw(json.data.totalLoanAmountRequested?.toString() || "");
        }
      } catch (err) {
        console.error("Error fetching deal details:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDeal();
  }, [dealId]);

  const handleSendCounter = async () => {
    if (!dealId) return;
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("accessToken") || "";
      const loanAmount = parseInt(amountRaw.replace(/[^0-9]/g, "")) || 0;
      const rate = parseFloat(rateStr) || 0;
      // Points se usan en el modelo de fees de closing en Contratos, 
      // pero por ahora lo enviaremos embebido en el mensaje o como parametro soportado.

      const body = {
        structure: "INTEREST_ONLY",
        principalAmount: loanAmount,
        interestRate: rate,
        amortizationTermMonths: termMonths,
        message: note ? `Puntos: ${pointsStr} | Nota: ${note}` : `Puntos: ${pointsStr}`
      };

      const res = await fetch(`${BASE_URL}/api/marketplace/loan-requests/${dealId}/quotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });

      const json = await res.json();
      if (json.success) {
        router.push("/lenderDashboard/offers-sent");
      } else {
        alert(json.error?.message || "Error al enviar la contraoferta");
      }
    } catch (e) {
      alert("Error de red");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCurrency = (val: number | string) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(Number(val) || 0);
  };

  if (isLoading) {
    return <div className="p-10 text-center text-sm text-[#8898aa]">Cargando detalles de la negociación...</div>;
  }

  if (!deal) {
    return <div className="p-10 text-center text-sm text-red-500">Trato no encontrado o sin acceso.</div>;
  }

  // Calculos reales
  const requested = Number(deal.totalLoanAmountRequested || 0);
  const arv = Number(deal.property?.afterRepairValue || 0);
  const ltv = arv > 0 ? ((requested / arv) * 100).toFixed(1) : "0.0";
  const rehab = Number(deal.rehabAmount || 0);
  const address = deal.property?.addressLine1 || "Dirección oculta";
  const cityState = `${deal.property?.city || ""}, ${deal.property?.state || ""}`;
  const borrowerName = deal.borrowerProfile?.user?.name || "Prestatario (Entidad oculta)";

  return (
    <div className="animate-in fade-in duration-300 max-w-[800px]">
      <div className="mb-[4px] text-[22px] font-[800] tracking-[-0.3px] text-[#0a2540]">
        {co.title}
      </div>
      <div className="mb-[28px] text-[13px] text-[#8898aa]">
        {address} — {isEs ? "revisa los términos y responde" : "review terms and respond"}
      </div>

      {/* Deal summary bar */}
      <div className="mb-[24px] flex flex-col justify-between gap-[16px] rounded-[10px] border border-[#e6ebf1] bg-white p-[16px_22px] sm:flex-row sm:items-center">
        <div>
          <div className="text-[14px] font-[700] text-[#0a2540]">
            {address}, {cityState} {deal.property?.postalCode}
          </div>
          <div className="mt-[2px] text-[12px] text-[#8898aa]">
            {borrowerName} • {formatCurrency(requested)} {co.deal.requested}
          </div>
        </div>
        <div className="flex gap-[24px]">
          <div>
            <div className="text-[10px] font-[700] uppercase tracking-[0.4px] text-[#aab7c4]">
              {co.deal.arv}
            </div>
            <div className="mt-[2px] text-[14px] font-[800] text-[#0a2540]">{formatCurrency(arv)}</div>
          </div>
          <div>
            <div className="text-[10px] font-[700] uppercase tracking-[0.4px] text-[#aab7c4]">
              {co.deal.ltv}
            </div>
            <div className="mt-[2px] text-[14px] font-[800] text-[#0a2540]">{ltv}%</div>
          </div>
          <div>
            <div className="text-[10px] font-[700] uppercase tracking-[0.4px] text-[#aab7c4]">
              {co.deal.rehab}
            </div>
            <div className="mt-[2px] text-[14px] font-[800] text-[#0a2540]">{formatCurrency(rehab)}</div>
          </div>
        </div>
      </div>

      {/* Counter thread (NOTA: Parcialmente simulado ya que la API no expone el historial de cotizaciones aún) */}
      <div className="mb-[24px] flex flex-col gap-[16px]">
        
        {/* Original Request (Borrower) - Basado en los datos reales del Deal */}
        <div className="overflow-hidden rounded-[10px] border border-[#e6ebf1] bg-white">
          <div className="flex items-center justify-between border-b border-[#e6ebf1] p-[14px_20px]">
            <div className="flex items-center gap-[10px]">
              <span className="rounded-[10px] border border-[#e6ebf1] bg-[#f6f9fc] px-[10px] py-[3px] text-[11px] font-[700] text-[#8898aa]">
                {co.thread.original}
              </span>
              <span className="text-[13px] font-[600] text-[#0a2540]">{borrowerName}</span>
            </div>
            <span className="text-[11px] text-[#aab7c4]">
              {new Date(deal.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="p-[18px_20px]">
            <div className="mb-[14px] grid grid-cols-2 gap-[12px] sm:grid-cols-4">
              <div>
                <div className="text-[10px] font-[700] uppercase tracking-[0.4px] text-[#aab7c4]">{co.terms.amount}</div>
                <div className="mt-[3px] text-[16px] font-[800] text-[#0a2540]">{formatCurrency(requested)}</div>
              </div>
            </div>
            <div className="rounded-[6px] border-l-[3px] border-[#e6ebf1] bg-[#f6f9fc] p-[10px_12px] text-[12px] text-[#425466]">
              {deal.requestedTimelineNotes || (isEs ? "Solicitud inicial publicada." : "Initial request posted.")}
            </div>
          </div>
        </div>

        {/* Simularemos los siguientes bloques visuales de negociación hasta que la API exponga /history */}
        <div className="overflow-hidden rounded-[10px] border border-[#635bff] bg-white opacity-60">
          <div className="flex items-center justify-between border-b border-[#c7c4ff] bg-[#f0efff] p-[14px_20px]">
            <div className="flex items-center gap-[10px]">
              <span className="rounded-[10px] bg-[#635bff] px-[10px] py-[3px] text-[11px] font-[700] text-white">
                {co.thread.yourOffer}
              </span>
              <span className="text-[13px] font-[600] text-[#0a2540]">{isEs ? "Tu oferta previa" : "Your previous offer"}</span>
            </div>
          </div>
          <div className="p-[18px_20px]">
            <div className="rounded-[6px] border-l-[3px] border-[#635bff] bg-[#f6f9fc] p-[10px_12px] text-[12px] text-[#425466]">
              <em>({isEs ? "El historial detallado de ofertas estará disponible próximamente" : "Detailed offer history will be available soon"})</em>
            </div>
          </div>
        </div>
      </div>

      {/* Action panel */}
      <div className="rounded-[10px] border border-[#e6ebf1] bg-white p-[24px]">
        <div className="mb-[6px] text-[15px] font-[700] text-[#0a2540]">
          {co.actions.title} {borrowerName}
        </div>
        <div className="mb-[20px] text-[13px] text-[#8898aa]">
          {co.actions.sub}
        </div>
        
        <div className="mb-[20px] flex flex-col gap-[12px] sm:flex-row">
          <button 
            onClick={() => setIsCountering(!isCountering)}
            className="flex-1 cursor-pointer rounded-[6px] border-none bg-[#635bff] p-[13px] font-sans text-[14px] font-[700] text-white transition-opacity hover:opacity-90"
          >
            {co.actions.counter}
          </button>
          <button 
            onClick={() => router.push("/lenderDashboard/browse-deals")}
            className="flex-1 cursor-pointer rounded-[6px] border-[2px] border-[#fecaca] bg-white p-[13px] font-sans text-[14px] font-[700] text-[#dc2626] transition-colors hover:bg-[#fef2f2]"
          >
            {co.actions.decline}
          </button>
        </div>

        {isCountering && (
          <div className="animate-in slide-in-from-top-2 mt-[18px] border-t border-[#e6ebf1] pt-[18px]">
            <div className="mb-[12px] text-[12px] font-[700] uppercase tracking-[0.4px] text-[#0a2540]">
              {co.actions.formTitle}
            </div>
            <div className="mb-[14px] grid grid-cols-1 gap-[12px] sm:grid-cols-2">
              <div>
                <label className="mb-[5px] block text-[11px] font-[700] uppercase tracking-[0.4px] text-[#8898aa]">
                  {co.terms.amount}
                </label>
                <input 
                  type="text" 
                  value={amountRaw}
                  onChange={(e) => {
                    const numStr = e.target.value.replace(/[^0-9]/g, "");
                    setAmountRaw(numStr ? parseInt(numStr).toLocaleString() : "");
                  }}
                  className="w-full rounded-[6px] border border-[#e6ebf1] bg-white p-[9px_12px] font-sans text-[13px] text-[#0a2540] outline-none focus:border-[#635bff]"
                />
              </div>
              <div>
                <label className="mb-[5px] block text-[11px] font-[700] uppercase tracking-[0.4px] text-[#8898aa]">
                  {co.terms.rate} (%)
                </label>
                <input 
                  type="number" 
                  step="0.1"
                  value={rateStr}
                  onChange={(e) => setRateStr(e.target.value)}
                  placeholder="Ej. 11.5" 
                  className="w-full rounded-[6px] border border-[#e6ebf1] bg-white p-[9px_12px] font-sans text-[13px] text-[#0a2540] outline-none focus:border-[#635bff]"
                />
              </div>
              <div>
                <label className="mb-[5px] block text-[11px] font-[700] uppercase tracking-[0.4px] text-[#8898aa]">
                  {co.terms.term} ({co.deal.months})
                </label>
                <select 
                  value={termMonths}
                  onChange={(e) => setTermMonths(Number(e.target.value))}
                  className="w-full rounded-[6px] border border-[#e6ebf1] bg-white p-[9px_12px] font-sans text-[13px] text-[#0a2540] outline-none focus:border-[#635bff]"
                >
                  <option value={6}>6</option>
                  <option value={9}>9</option>
                  <option value={12}>12</option>
                  <option value={18}>18</option>
                </select>
              </div>
              <div>
                <label className="mb-[5px] block text-[11px] font-[700] uppercase tracking-[0.4px] text-[#8898aa]">
                  {co.terms.points}
                </label>
                <input 
                  type="number" 
                  step="0.25"
                  value={pointsStr}
                  onChange={(e) => setPointsStr(e.target.value)}
                  placeholder="Ej. 1.5" 
                  className="w-full rounded-[6px] border border-[#e6ebf1] bg-white p-[9px_12px] font-sans text-[13px] text-[#0a2540] outline-none focus:border-[#635bff]"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-[5px] block text-[11px] font-[700] uppercase tracking-[0.4px] text-[#8898aa]">
                  {co.actions.noteLabel}
                </label>
                <textarea 
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder={co.actions.notePh}
                  className="h-[80px] w-full resize-none rounded-[6px] border border-[#e6ebf1] bg-white p-[10px_12px] font-sans text-[13px] text-[#0a2540] outline-none focus:border-[#635bff]"
                ></textarea>
              </div>
            </div>
            <button 
              onClick={handleSendCounter}
              disabled={isSubmitting}
              className="mt-[12px] w-full cursor-pointer rounded-[6px] border-none bg-[#635bff] p-[12px] font-sans text-[14px] font-[700] text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {isSubmitting ? (isEs ? "Enviando..." : "Sending...") : co.actions.sendBtn}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}