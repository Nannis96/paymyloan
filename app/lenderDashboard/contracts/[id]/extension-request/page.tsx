"use client";

import { apiFetch } from "@/app/lib/apiFetch";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useSite } from "@/app/components/layout/SiteShell";
import { API_ROUTES } from "@/app/lib/endpoints";
import { ChevronLeft } from "lucide-react";

export default function LenderExtensionPage() {
  return <LenderExtensionContent />;
}

function LenderExtensionContent() {
  const { t, lang } = useSite();
  const isEs = lang === "es";
  const ex = t.extensionRequest;
  const params = useParams();
  const router = useRouter();
  const contractId = params?.id as string;
  
  const [contract, setContract] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (contractId) {
      const fetchContract = async () => {
        try {
          const res = await apiFetch(API_ROUTES.contracts.byId(contractId));
          const json = await res.json();
          if (json.success) setContract(json.data);
        } catch (e) {
          console.error("No se pudo cargar el contrato:", e);
        }
      };
      fetchContract();
    }
  }, [contractId]);

  const handleOfferExtension = async () => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert(isEs ? "Oferta de extensión enviada al prestatario." : "Extension offer sent to borrower.");
      router.push(`/lenderDashboard/contracts/${contractId}`);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const address = contract?.property?.addressLine1 || "Dirección no disponible";
  const maturityDate = contract?.currentTerms?.maturityDate ? new Date(contract.currentTerms.maturityDate).toLocaleDateString() : "TBD";
  const balance = contract?.currentPrincipalBalance ? `$${contract.currentPrincipalBalance.toLocaleString()}` : "$0";
  const rate = contract?.currentTerms?.interestRate ? `${contract.currentTerms.interestRate}%` : "0%";
  const monthlyPayment = contract?.currentTerms?.calculatedMonthlyPayment ? `$${contract.currentTerms.calculatedMonthlyPayment.toLocaleString()}` : "$0";

  return (
    <div className="max-w-[720px] animate-in fade-in duration-300 font-sans mx-auto py-6">
      <Link
        href={`/lenderDashboard/contracts/${contractId}`}
        className="mb-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[#8898aa] transition-colors hover:text-[#635bff]"
      >
        <ChevronLeft size={16} />
        {isEs ? "Volver al contrato" : "Back to contract"}
      </Link>

      <div className="text-[22px] font-[800] text-[#0a2540] mb-[4px]">
        {isEs ? "Ofrecer Extensión de Préstamo" : "Offer Loan Extension"}
      </div>
      <div className="text-[13px] text-[#8898aa] mb-[24px]">
        {address} · {isEs ? "Vencimiento actual:" : "Current maturity:"} {maturityDate}
      </div>

      <div className="bg-white border border-[#e6ebf1] rounded-[10px] p-[20px_22px] mb-[20px]">
        <div className="text-[14px] font-[700] text-[#0a2540] mb-[12px]">
          {ex.loanCard.title}
        </div>
        <div className="flex justify-between text-[13px] py-[7px] border-b border-[#f6f9fc]">
          <span className="text-[#8898aa]">{ex.loanCard.property}</span>
          <span className="font-[700] text-[#0a2540]">{address}</span>
        </div>
        <div className="flex justify-between text-[13px] py-[7px] border-b border-[#f6f9fc]">
          <span className="text-[#8898aa]">{ex.loanCard.balance}</span>
          <span className="font-[700] text-[#0a2540]">{balance}</span>
        </div>
        <div className="flex justify-between text-[13px] py-[7px] border-b border-[#f6f9fc]">
          <span className="text-[#8898aa]">{ex.loanCard.rate}</span>
          <span className="font-[700] text-[#0a2540]">{rate}</span>
        </div>
        <div className="flex justify-between text-[13px] py-[7px] border-b border-[#f6f9fc]">
          <span className="text-[#8898aa]">{ex.loanCard.currentMaturity}</span>
          <span className="font-[700] text-[#b45309]">{maturityDate}</span>
        </div>
        <div className="flex justify-between text-[13px] py-[7px]">
          <span className="text-[#8898aa]">{ex.loanCard.monthlyPayment}</span>
          <span className="font-[700] text-[#0a2540]">{monthlyPayment}</span>
        </div>
      </div>

      <div className="bg-white border border-[#e6ebf1] rounded-[10px] p-[24px] mb-[20px]">
        <div className="text-[15px] font-[700] text-[#0a2540] mb-[12px]">
          {isEs ? "Configurar Términos de Extensión" : "Configure Extension Terms"}
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mb-[20px]">
          <div>
            <label className="block text-[11px] font-[700] text-[#8898aa] mb-[5px] uppercase tracking-[0.4px]">
              {ex.requestCard.termDisplay.termLabel}
            </label>
            <input type="number" defaultValue={12} className="w-full p-[10px_12px] border border-[#e6ebf1] rounded-[6px] text-[13px] outline-none text-[#0a2540] focus:border-[#635bff]" />
          </div>
          <div>
            <label className="block text-[11px] font-[700] text-[#8898aa] mb-[5px] uppercase tracking-[0.4px]">
              {isEs ? "Tarifa de Extensión (Prestamista)" : "Lender Extension Fee"}
            </label>
            <input type="number" defaultValue={1150} className="w-full p-[10px_12px] border border-[#e6ebf1] rounded-[6px] text-[13px] outline-none text-[#0a2540] focus:border-[#635bff]" />
          </div>
        </div>

        <button 
          onClick={handleOfferExtension}
          disabled={isSubmitting}
          className="w-full p-[13px] bg-[#635bff] text-white border-none rounded-[6px] text-[14px] font-[700] cursor-pointer transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {isSubmitting ? (isEs ? "Enviando..." : "Sending...") : (isEs ? "Enviar Oferta de Extensión al Prestatario" : "Send Extension Offer to Borrower")}
        </button>
      </div>
    </div>
  );
}