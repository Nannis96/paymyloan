"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import { API_ROUTES } from "@/app/lib/endpoints";

function ExtensionRequestContent() {
  const { t } = useSite();
  const ex = t.extensionRequest;
  const searchParams = useSearchParams();
  const router = useRouter();
  const contractId = searchParams?.get("contractId");

  const [contract, setContract] = useState<any>(null);
  const [reason, setReason] = useState("");
  const [checks, setChecks] = useState([false, false, false, false, false]);
  const [signature, setSignature] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Obtener contrato real si hay ID
  useEffect(() => {
    if (contractId) {
      const fetchContract = async () => {
        try {
          const token = localStorage.getItem("accessToken") || "";
          const res = await fetch(API_ROUTES.contracts.byId(contractId), {
            headers: { Authorization: `Bearer ${token}` }
          });
          const json = await res.json();
          if (json.success) setContract(json.data);
        } catch (e) {
          console.error("No se pudo cargar el contrato:", e);
        }
      };
      fetchContract();
    }
  }, [contractId]);

  const toggleCheck = (index: number) => {
    const newChecks = [...checks];
    newChecks[index] = !newChecks[index];
    setChecks(newChecks);
  };

  const allChecked = checks.every(Boolean);

  const handleSubmit = async () => {
    if (!allChecked || !signature.trim()) return;
    
    setIsSubmitting(true);
    try {
      // Mock de envío a endpoint de solicitud de extensiones (pendiente en backend)
      // await fetch(`/api/contracts/${contractId}/extension-requests`, { method: "POST" ... })
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert("Extension request submitted successfully!");
      router.push("/borrowerDashboard");
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mocks o datos del contrato
  const address = contract?.property?.addressLine1 || "3802 University Cove, Memphis TN 38127";
  const maturityDate = contract?.currentTerms?.maturityDate ? new Date(contract.currentTerms.maturityDate).toLocaleDateString() : "September 22, 2027";
  const lenderName = contract?.lenderCompany?.companyName || "Moore Capital LLC";
  const balance = contract?.currentPrincipalBalance ? `$${contract.currentPrincipalBalance.toLocaleString()}` : "$115,000";
  const rate = contract?.currentTerms?.interestRate ? `${contract.currentTerms.interestRate}% IO (360-day year)` : "11.5% IO (360-day year)";
  const monthlyPayment = contract?.currentTerms?.calculatedMonthlyPayment ? `$${contract.currentTerms.calculatedMonthlyPayment.toLocaleString()}` : "$1,104.17";

  return (
    <div className="max-w-[720px] animate-in fade-in duration-300 font-sans">
      
      <div className="text-[22px] font-[800] text-[#0a2540] mb-[4px]">
        {ex.title}
      </div>
      <div className="text-[13px] text-[#8898aa] mb-[24px]">
        {ex.subtitle.replace("{address}", address).replace("{date}", maturityDate)}
      </div>

      <div className="bg-[#fffbeb] border-2 border-[#f59e0b] rounded-[10px] p-[18px_22px] mb-[22px] flex items-center gap-[14px]">
        <div className="w-[38px] h-[38px] bg-[#f59e0b] rounded-[8px] flex items-center justify-center shrink-0">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="9" r="7.5" stroke="#fff" strokeWidth="1.5"/>
            <path d="M9 5v4l2.5 2.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <div>
          <div className="text-[14px] font-[800] text-[#92400e]">
            {ex.maturityBanner.title.replace("{date}", maturityDate)}
          </div>
          <div className="text-[12px] text-[#92400e] mt-[2px] leading-[1.6]">
            {ex.maturityBanner.sub}
          </div>
        </div>
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
          <span className="text-[#8898aa]">{ex.loanCard.lender}</span>
          <span className="font-[700] text-[#0a2540]">{lenderName}</span>
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
        <div className="text-[15px] font-[700] text-[#0a2540] mb-[4px]">
          {ex.requestCard.title}
        </div>
        <div className="text-[13px] text-[#8898aa] mb-[20px] leading-[1.6]">
          {ex.requestCard.sub}
        </div>

        <div className="bg-[#f0efff] border-2 border-[#635bff] rounded-[10px] p-[18px_22px] mb-[18px] flex items-center gap-[24px] flex-wrap md:flex-nowrap">
          <div className="flex-1">
            <div className="text-[10px] font-[700] uppercase tracking-[0.4px] text-[#8898aa]">
              {ex.requestCard.termDisplay.termLabel}
            </div>
            <div className="text-[18px] font-[800] text-[#635bff] mt-[3px]">12 months</div>
            <div className="text-[11px] text-[#8898aa] mt-[2px]">{ex.requestCard.termDisplay.termNote}</div>
          </div>
          <div className="hidden md:block w-[1px] h-[50px] bg-[#c7c4ff] shrink-0"></div>
          <div className="text-center">
            <div className="text-[10px] font-[700] uppercase tracking-[0.4px] text-[#8898aa]">{ex.requestCard.termDisplay.rate}</div>
            <div className="text-[18px] font-[800] text-[#635bff] mt-[3px]">11.5%</div>
          </div>
          <div className="text-center">
            <div className="text-[10px] font-[700] uppercase tracking-[0.4px] text-[#8898aa]">{ex.requestCard.termDisplay.monthly}</div>
            <div className="text-[18px] font-[800] text-[#635bff] mt-[3px]">{monthlyPayment}</div>
          </div>
          <div className="text-center">
            <div className="text-[10px] font-[700] uppercase tracking-[0.4px] text-[#8898aa]">{ex.requestCard.termDisplay.newMaturity}</div>
            <div className="text-[18px] font-[800] text-[#635bff] mt-[3px]">Sept 22, 2028</div>
          </div>
        </div>

        <div className="mb-[14px]">
          <label className="block text-[11px] font-[700] text-[#8898aa] mb-[5px] uppercase tracking-[0.4px]">
            {ex.requestCard.reasonLabel}
          </label>
          <textarea 
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder={ex.requestCard.reasonPh}
            className="w-full p-[10px_12px] border border-[#e6ebf1] rounded-[6px] text-[13px] outline-none text-[#0a2540] h-[90px] resize-none focus:border-[#635bff]"
          ></textarea>
        </div>

        <div className="bg-[#f6f9fc] border border-[#e6ebf1] rounded-[8px] p-[12px_16px] text-[12px] text-[#425466] leading-[1.7] mb-[14px]">
          {ex.requestCard.noteBox}
        </div>

        <div className="bg-[#f0efff] border border-[#c7c4ff] rounded-[8px] p-[14px_16px] mb-[16px]">
          <div className="flex justify-between text-[13px] py-[5px]">
            <span className="text-[#425466]">{ex.requestCard.feeSummary.newMaturity}</span>
            <span className="font-[700] text-[#635bff]">December 22, 2027</span>
          </div>
          <div className="flex justify-between text-[13px] py-[5px]">
            <span className="text-[#425466]">{ex.requestCard.feeSummary.addMonths}</span>
            <span className="font-[700] text-[#635bff]">3 months</span>
          </div>
          <div className="flex justify-between text-[13px] py-[5px]">
            <span className="text-[#425466]">{ex.requestCard.feeSummary.monthlyContinues}</span>
            <span className="font-[700] text-[#635bff]">{monthlyPayment}/mo</span>
          </div>
        </div>

        <div className="text-[10px] font-[700] uppercase tracking-[0.6px] text-[#aab7c4] mb-[10px] mt-[22px]">
          {ex.requestCard.extFeeBox.sectionTitle}
        </div>
        
        <div className="bg-[#0a2540] rounded-[10px] p-[18px_20px] mb-[12px]">
          <div className="text-[10px] font-[700] uppercase tracking-[0.5px] text-[#8898aa] mb-[12px]">
            {ex.requestCard.extFeeBox.title}
          </div>
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-[4px] sm:gap-[10px] py-[8px] border-b border-white/5">
            <span className="text-[13px] text-[#8898aa] flex-1">{ex.requestCard.extFeeBox.pmlFee}</span>
            <span className="text-[14px] font-[800] text-white min-w-[80px] sm:text-right">$1,150.00</span>
            <span className="text-[10px] text-[#635bff] sm:min-w-[180px] sm:text-right">{ex.requestCard.extFeeBox.pmlFeeNote}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-[4px] sm:gap-[10px] py-[8px] border-b border-white/5">
            <span className="text-[13px] text-[#8898aa] flex-1">{ex.requestCard.extFeeBox.lenderFee}</span>
            <span className="text-[14px] font-[800] text-white min-w-[80px] sm:text-right">$1,150.00</span>
            <span className="text-[10px] text-[#635bff] sm:min-w-[180px] sm:text-right">{ex.requestCard.extFeeBox.lenderFeeNote}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-[4px] sm:gap-[10px] py-[8px]">
            <span className="text-[13px] text-[#8898aa] flex-1">{ex.requestCard.extFeeBox.achFee}</span>
            <span className="text-[14px] font-[800] text-white min-w-[80px] sm:text-right">$25.00</span>
            <span className="text-[10px] text-[#635bff] sm:min-w-[180px] sm:text-right">{ex.requestCard.extFeeBox.achFeeNote}</span>
          </div>
          <div className="flex justify-between items-center border-t-2 border-white/15 mt-[10px] pt-[12px]">
            <span className="text-[13px] font-[700] text-[#aab7c4]">{ex.requestCard.extFeeBox.totalLabel}</span>
            <span className="text-[22px] font-[800] text-white">$2,325.00</span>
          </div>
        </div>

        <div className="text-[12px] text-[#425466] bg-[#f6f9fc] border border-[#e6ebf1] rounded-[7px] p-[10px_14px] mb-[16px] leading-[1.7]">
          {ex.requestCard.feeNoteBox}
        </div>

        <div className="bg-[#f6f9fc] border border-[#e6ebf1] rounded-[10px] p-[20px_22px] mb-[14px]">
          <div className="text-[13px] font-[800] text-[#0a2540] mb-[14px]">
            {ex.requestCard.esign.title}
          </div>
          <div className="flex flex-col gap-[10px] mb-[18px]">
            {ex.requestCard.esign.checks.map((text: string, i: number) => (
              <label key={i} className="flex gap-[10px] text-[12px] text-[#425466] leading-[1.7] cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={checks[i]}
                  onChange={() => toggleCheck(i)}
                  className="w-[16px] h-[16px] accent-[#635bff] shrink-0 mt-[2px] cursor-pointer"
                />
                <span dangerouslySetInnerHTML={{ __html: text }}></span>
              </label>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-[12px] mb-[12px]">
            <div>
              <div className="text-[10px] font-[700] uppercase tracking-[0.4px] text-[#8898aa] mb-[5px]">
                {ex.requestCard.esign.sigLabel}
              </div>
              <input 
                type="text" 
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                placeholder={ex.requestCard.esign.sigPh} 
                className="w-full p-[9px_12px] border border-[#e6ebf1] rounded-[6px] text-[13px] outline-none text-[#0a2540] border-b-[2px] focus:border-b-[#635bff]"
              />
            </div>
            <div>
              <div className="text-[10px] font-[700] uppercase tracking-[0.4px] text-[#8898aa] mb-[5px]">
                {ex.requestCard.esign.dateLabel}
              </div>
              <input 
                type="text" 
                value={new Date().toLocaleDateString()} 
                className="w-full p-[9px_12px] border border-[#e6ebf1] rounded-[6px] text-[13px] outline-none text-[#0a2540] border-b-[2px] bg-transparent" 
                readOnly 
              />
            </div>
          </div>
          
          <div className="text-[11px] text-[#8898aa] leading-[1.7] italic">
            {ex.requestCard.esign.note}
          </div>
        </div>

        <button 
          onClick={handleSubmit}
          disabled={!allChecked || !signature.trim() || isSubmitting}
          className="w-full p-[13px] bg-[#635bff] text-white border-none rounded-[6px] text-[14px] font-[700] cursor-pointer transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {isSubmitting ? ex.requestCard.submitting : ex.requestCard.submitBtn}
        </button>
      </div>

    </div>
  );
}

export default function ExtensionRequestPage() {
  return (
    <SiteShell isDashboard={true}>
      <Suspense fallback={<div className="p-8 text-[#8898aa]">Cargando vista...</div>}>
        <ExtensionRequestContent />
      </Suspense>
    </SiteShell>
  );
}