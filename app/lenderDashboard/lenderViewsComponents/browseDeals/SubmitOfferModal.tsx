"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSite } from "@/app/components/layout/SiteShell";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

interface SubmitOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  dealId: string;
  requestedAmount: number;
}

export default function SubmitOfferModal({ isOpen, onClose, dealId, requestedAmount }: SubmitOfferModalProps) {
  const router = useRouter();
  const { t, lang } = useSite();
  const isEs = lang === "es";
  const m = t.marketplace.dealDetails;

  const [companies, setCompanies] = useState<any[]>([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState("");
  const [isLoadingCompanies, setIsLoadingCompanies] = useState(false);

  const [loanRaw, setLoanRaw] = useState("");
  const [rateStr, setRateStr] = useState("");
  const [termMonths, setTermMonths] = useState(12);
  const [offerMessage, setOfferMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setLoanRaw(requestedAmount ? requestedAmount.toString() : "");
      fetchCompanies();
    }
  }, [isOpen, requestedAmount]);

  const fetchCompanies = async () => {
    setIsLoadingCompanies(true);
    try {
      const token = localStorage.getItem("accessToken") || "";
      const res = await fetch(`${BASE_URL}/api/lenders/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const json = await res.json();
      if (json.success && json.data?.lenderCompanies) {
        // Filtrar solo empresas activas
        const activeCompanies = json.data.lenderCompanies.filter((c: any) => c.status === "ACTIVE");
        setCompanies(activeCompanies);
        if (activeCompanies.length === 1) {
          setSelectedCompanyId(activeCompanies[0].id);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingCompanies(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCompanyId) {
      alert(isEs ? "Selecciona una entidad prestamista" : "Select a lending entity");
      return;
    }
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("accessToken") || "";
      const loanAmount = parseInt(loanRaw.replace(/[^0-9]/g, "")) || 0;
      const rate = parseFloat(rateStr) || 0;

      const body = {
        lenderCompanyId: selectedCompanyId,
        structure: "INTEREST_ONLY",
        principalAmount: loanAmount,
        interestRate: rate,
        amortizationTermMonths: termMonths,
        message: offerMessage
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
        onClose();
        router.push("/lenderDashboard/offers-sent");
      } else {
        alert(json.error?.message || (isEs ? "Error al enviar la oferta" : "Failed to submit offer"));
      }
    } catch (error) {
      alert(isEs ? "Error de red" : "Network error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const loanAmountParsed = parseInt(loanRaw.replace(/[^0-9]/g, "")) || 0;
  const rateParsed = parseFloat(rateStr) || 0;
  const monthlyPmt = Math.round(loanAmountParsed * (rateParsed / 100) / 12);
  const formatCurrency = (val: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(val);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm">
      <div className="w-full max-w-[500px] rounded-2xl bg-surface p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-ink">{m.submitOffer}</h3>
          <button onClick={onClose} className="text-ink-3 hover:text-ink transition-colors cursor-pointer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {isLoadingCompanies ? (
            <div className="text-sm text-ink-3">Cargando entidades...</div>
          ) : companies.length === 0 ? (
            <div className="rounded-md bg-amber-soft p-3 text-sm text-amber">
              {isEs ? "No tienes entidades activas. Crea una en tu perfil primero." : "No active entities found. Create one in your profile first."}
            </div>
          ) : (
            <div>
              <label className="mb-1 block text-[11px] font-bold uppercase tracking-[0.5px] text-ink-2">
                {isEs ? "Entidad Prestamista" : "Lending Entity"}
              </label>
              <select
                value={selectedCompanyId}
                onChange={(e) => setSelectedCompanyId(e.target.value)}
                required
                className="w-full rounded-md border border-rule px-3 py-2 text-[13px] text-ink outline-none transition-colors focus:border-accent bg-white cursor-pointer"
              >
                <option value="" disabled>{isEs ? "Selecciona una entidad" : "Select an entity"}</option>
                {companies.map(c => (
                  <option key={c.id} value={c.id}>{c.companyName}</option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="mb-1 block text-[11px] font-bold uppercase tracking-[0.5px] text-ink-2">{m.formLoanAmount}</label>
            <input
              type="text"
              required
              value={loanRaw}
              onChange={(e) => {
                const numStr = e.target.value.replace(/[^0-9]/g, "");
                setLoanRaw(numStr ? parseInt(numStr).toLocaleString() : "");
              }}
              className="w-full rounded-md border border-rule px-3 py-2 text-[13px] text-ink outline-none transition-colors focus:border-accent"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-[11px] font-bold uppercase tracking-[0.5px] text-ink-2">{m.formRate}</label>
              <input type="number" required step="0.1" value={rateStr} onChange={(e) => setRateStr(e.target.value)} placeholder="Ej. 12" className="w-full rounded-md border border-rule px-3 py-2 text-[13px] text-ink outline-none transition-colors focus:border-accent" />
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-bold uppercase tracking-[0.5px] text-ink-2">{m.formTerm}</label>
              <select value={termMonths} onChange={(e) => setTermMonths(Number(e.target.value))} className="w-full rounded-md border border-rule px-3 py-2 text-[13px] text-ink outline-none transition-colors focus:border-accent bg-white cursor-pointer">
                <option value={6}>6 mo</option>
                <option value={9}>9 mo</option>
                <option value={12}>12 mo</option>
                <option value={18}>18 mo</option>
                <option value={24}>24 mo</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-[11px] font-bold uppercase tracking-[0.5px] text-ink-2">{m.formMsg || "Mensaje (Opcional)"}</label>
            <textarea
              value={offerMessage}
              onChange={(e) => setOfferMessage(e.target.value)}
              placeholder={m.formMsgPh || "Presentate o anota alguna condicion..."}
              className="w-full h-[60px] resize-none rounded-md border border-rule px-3 py-2 text-[13px] text-ink outline-none transition-colors focus:border-accent"
            />
          </div>

          <div className="rounded-lg border border-rule bg-surface-2 p-3 text-xs text-ink-2">
            <div className="flex justify-between font-semibold">
              <span>{m.calcMoInt}</span>
              <span>{formatCurrency(monthlyPmt)}</span>
            </div>
          </div>

          <div className="mt-2 flex justify-end gap-2">
            <button type="button" onClick={onClose} className="rounded-md border border-rule bg-surface px-4 py-2 text-sm font-semibold text-ink-2 hover:bg-surface-2 transition-colors cursor-pointer">
              {isEs ? "Cancelar" : "Cancel"}
            </button>
            <button type="submit" disabled={isSubmitting || companies.length === 0} className="rounded-md bg-accent px-4 py-2 text-sm font-bold text-white hover:bg-blue-700 transition-colors disabled:opacity-50 cursor-pointer">
              {isSubmitting ? (isEs ? "Enviando..." : "Submitting...") : m.btnSubmit}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}