"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import { API_ROUTES } from "@/app/lib/endpoints";

// Mocks fijos basados en el HTML
const titleData = {
  bas: { name: 'BAS Law & Title', agent: 'Ruweida Abdullahi', phone: '(901) 348-1616', email: 'Rabdullahi@baslawandtitle.com' },
  other: { name: 'Memphis Title Group', agent: 'James Carter', phone: '(901) 555-0200', email: 'jcarter@memphistitle.com' },
  new: { name: '', agent: '', phone: '', email: '' }
};

const insData = {
  insight: { name: 'Insight Risk Management', agent: 'Amy Colombey', phone: '(901) 555-0300', email: 'acolombey@irmllc.com' },
  state: { name: 'State Farm', agent: 'John Agent', phone: '(901) 555-0100', email: 'john@statefarm.com' },
  new: { name: '', agent: '', phone: '', email: '' }
};

function ClosingPrepContent() {
  const { t } = useSite();
  const cp = t.closingPrep;
  const searchParams = useSearchParams();
  const router = useRouter();
  const contractId = searchParams?.get("contractId");

  const [contract, setContract] = useState<any>(null);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estados del Formulario (Title)
  const [selectedTitleKey, setSelectedTitleKey] = useState<keyof typeof titleData>("bas");
  const [titleName, setTitleName] = useState(titleData.bas.name);
  const [titleAgent, setTitleAgent] = useState(titleData.bas.agent);
  const [titlePhone, setTitlePhone] = useState(titleData.bas.phone);
  const [titleEmail, setTitleEmail] = useState(titleData.bas.email);
  const [titleFile, setTitleFile] = useState("");

  // Estados del Formulario (Insurance)
  const [selectedInsKey, setSelectedInsKey] = useState<keyof typeof insData>("insight");
  const [insCompany, setInsCompany] = useState(insData.insight.name);
  const [insAgent, setInsAgent] = useState(insData.insight.agent);
  const [insPhone, setInsPhone] = useState(insData.insight.phone);
  const [insEmail, setInsEmail] = useState(insData.insight.email);
  const [insPolicy, setInsPolicy] = useState("");
  const [insCoverage, setInsCoverage] = useState("");
  const [insStatus, setInsStatus] = useState("Quote obtained — not yet bound");
  const [rentCover, setRentCover] = useState<"no" | "yes">("no");

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

  const handleTitleSelect = (key: keyof typeof titleData) => {
    setSelectedTitleKey(key);
    setTitleName(titleData[key].name);
    setTitleAgent(titleData[key].agent);
    setTitlePhone(titleData[key].phone);
    setTitleEmail(titleData[key].email);
  };

  const handleInsSelect = (key: keyof typeof insData) => {
    setSelectedInsKey(key);
    setInsCompany(insData[key].name);
    setInsAgent(insData[key].agent);
    setInsPhone(insData[key].phone);
    setInsEmail(insData[key].email);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Mock log action (aqui iría el POST a tu backend para guardar info o notificar)
      await new Promise(resolve => setTimeout(resolve, 800));
      alert(cp.reviewCard.alert);
      router.push("/borrowerDashboard");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const address = contract?.property?.addressLine1 || "3802 University Cove, Memphis TN";
  const lenderName = contract?.lenderCompany?.companyName || "Moore Capital LLC";
  const balance = contract?.currentTerms?.principalAmount ? `$${contract.currentTerms.principalAmount.toLocaleString()}` : "$115,000";
  const rateTerm = contract?.currentTerms?.interestRate ? `${contract.currentTerms.interestRate}% / ${contract.currentTerms.amortizationTermMonths} ${t.contractDetail.months}` : `12% / 12 ${t.contractDetail.months}`;

  return (
    <div className="w-full max-w-[600px] mx-auto animate-in fade-in duration-300 font-sans pb-[100px]">
      
      {/* ACCEPTANCE BANNER */}
      <div className="bg-[#e8f5e9] border border-[#a5d6a7] rounded-[10px] p-[18px_22px] flex gap-[14px] items-start mb-[24px]">
        <div className="w-[36px] h-[36px] bg-[#2e7d32] rounded-[8px] flex items-center justify-center shrink-0">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M3 9l4.5 4.5L15 5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <div className="text-[14px] font-[800] text-[#1b5e20] mb-[4px]">{cp.banner.title}</div>
          <div className="text-[12px] text-[#2e7d32] leading-[1.6]">
            {cp.banner.sub.replace("{lender}", lenderName).replace("{address}", address)}
          </div>
        </div>
      </div>

      {/* CLOSING PROGRESS */}
      <div className="flex gap-0 mb-[28px]">
        <div className="flex flex-col items-center gap-[5px] flex-1">
          <div className="w-[28px] h-[28px] rounded-full flex items-center justify-center text-[11px] font-[700] bg-[#2e7d32] border-[#2e7d32] text-white border-2">✓</div>
          <div className="text-[10px] text-center whitespace-nowrap text-[#2e7d32]">{cp.steps[0]}</div>
        </div>
        <div className="flex-1 h-[2px] mb-[18px] min-w-[20px] bg-[#2e7d32] mt-[13px]"></div>
        
        <div className="flex flex-col items-center gap-[5px] flex-1">
          <div className={`w-[28px] h-[28px] rounded-full flex items-center justify-center text-[11px] font-[700] border-2 transition-all ${step === 1 ? "bg-[#635bff] border-[#635bff] text-white shadow-[0_0_0_4px_rgba(99,91,255,0.15)]" : "bg-[#2e7d32] border-[#2e7d32] text-white"}`}>
            {step === 1 ? "2" : "✓"}
          </div>
          <div className={`text-[10px] text-center whitespace-nowrap ${step === 1 ? "text-[#635bff] font-[600]" : "text-[#2e7d32]"}`}>{cp.steps[1]}</div>
        </div>
        <div className={`flex-1 h-[2px] mb-[18px] min-w-[20px] mt-[13px] ${step > 1 ? "bg-[#2e7d32]" : "bg-[#e6ebf1]"}`}></div>
        
        <div className="flex flex-col items-center gap-[5px] flex-1">
          <div className={`w-[28px] h-[28px] rounded-full flex items-center justify-center text-[11px] font-[700] border-2 transition-all ${step === 2 ? "bg-[#635bff] border-[#635bff] text-white shadow-[0_0_0_4px_rgba(99,91,255,0.15)]" : "bg-white border-[#e6ebf1] text-[#aab7c4]"}`}>
            3
          </div>
          <div className={`text-[10px] text-center whitespace-nowrap ${step === 2 ? "text-[#635bff] font-[600]" : "text-[#aab7c4]"}`}>{cp.steps[2]}</div>
        </div>
        <div className="flex-1 h-[2px] mb-[18px] min-w-[20px] bg-[#e6ebf1] mt-[13px]"></div>

        <div className="flex flex-col items-center gap-[5px] flex-1">
          <div className="w-[28px] h-[28px] rounded-full flex items-center justify-center text-[11px] font-[700] bg-white border-[#e6ebf1] text-[#aab7c4] border-2">4</div>
          <div className="text-[10px] text-center whitespace-nowrap text-[#aab7c4]">{cp.steps[3]}</div>
        </div>
      </div>

      {/* ================================== */}
      {/* STEP 1: TITLE & INSURANCE */}
      {/* ================================== */}
      {step === 1 && (
        <div className="animate-in fade-in duration-300">
          
          {/* TITLE COMPANY CARD */}
          <div className="bg-white border border-[#e6ebf1] rounded-[10px] mb-[16px] overflow-hidden">
            <div className="p-[18px_22px] border-b border-[#e6ebf1] flex items-center gap-[12px]">
              <div className="w-[32px] h-[32px] bg-[#f0efff] rounded-[7px] flex items-center justify-center shrink-0">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="1" width="12" height="14" rx="1.5" stroke="#635bff" strokeWidth="1.3"/><path d="M5 5h6M5 8h6M5 11h4" stroke="#635bff" strokeWidth="1.3" strokeLinecap="round"/></svg>
              </div>
              <div>
                <div className="text-[14px] font-[700] text-[#0a2540]">{cp.titleCard.title}</div>
                <div className="text-[12px] text-[#8898aa] mt-[2px]">{cp.titleCard.sub}</div>
              </div>
            </div>
            
            <div className="p-[20px_22px]">
              <div className="mb-[18px]">
                <div className="text-[11px] font-[700] uppercase tracking-[0.5px] text-[#aab7c4] mb-[8px]">{cp.titleCard.savedLabel}</div>
                <div className="flex flex-col gap-[6px]">
                  <div onClick={() => handleTitleSelect("bas")} className={`p-[10px_14px] border-[1.5px] rounded-[7px] cursor-pointer transition-colors ${selectedTitleKey === "bas" ? "border-[#635bff] bg-[#f0efff]" : "border-[#e6ebf1] hover:border-[#635bff]"}`}>
                    <div className={`text-[13px] font-[600] ${selectedTitleKey === "bas" ? "text-[#635bff]" : "text-[#0a2540]"}`}>{titleData.bas.name}</div>
                    <div className="text-[11px] text-[#8898aa] mt-[2px]">{titleData.bas.agent} · {titleData.bas.phone}</div>
                  </div>
                  <div onClick={() => handleTitleSelect("other")} className={`p-[10px_14px] border-[1.5px] rounded-[7px] cursor-pointer transition-colors ${selectedTitleKey === "other" ? "border-[#635bff] bg-[#f0efff]" : "border-[#e6ebf1] hover:border-[#635bff]"}`}>
                    <div className={`text-[13px] font-[600] ${selectedTitleKey === "other" ? "text-[#635bff]" : "text-[#0a2540]"}`}>{titleData.other.name}</div>
                    <div className="text-[11px] text-[#8898aa] mt-[2px]">{titleData.other.agent} · {titleData.other.phone}</div>
                  </div>
                  <div onClick={() => handleTitleSelect("new")} className={`p-[10px_14px] border-[1.5px] border-dashed rounded-[7px] cursor-pointer bg-white transition-colors hover:border-[#635bff] ${selectedTitleKey === "new" ? "border-[#635bff]" : "border-[#c7c4ff]"}`}>
                    <div className="text-[13px] font-[600] text-[#635bff]">{cp.titleCard.useDiff}</div>
                  </div>
                </div>
              </div>

              {(selectedTitleKey === "bas" || selectedTitleKey === "other") && (
                <div className="flex items-center gap-[6px] text-[11px] font-[600] text-[#2e7d32] bg-[#e8f5e9] rounded-[6px] p-[7px_10px] mb-[14px]">
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M3 8l4 4 6-6" stroke="#2e7d32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  {cp.titleCard.prefilled}
                </div>
              )}

              <div className="mb-[14px]">
                <label className="block text-[12px] font-[600] text-[#425466] mb-[5px]">{cp.titleCard.fields.name}</label>
                <input type="text" value={titleName} onChange={(e) => setTitleName(e.target.value)} className="w-full p-[9px_12px] border border-[#e6ebf1] rounded-[6px] text-[14px] text-[#0a2540] outline-none focus:border-[#635bff]" />
              </div>
              <div className="grid grid-cols-2 gap-[14px] mb-[14px]">
                <div>
                  <label className="block text-[12px] font-[600] text-[#425466] mb-[5px]">{cp.titleCard.fields.agent}</label>
                  <input type="text" value={titleAgent} onChange={(e) => setTitleAgent(e.target.value)} className="w-full p-[9px_12px] border border-[#e6ebf1] rounded-[6px] text-[14px] text-[#0a2540] outline-none focus:border-[#635bff]" />
                </div>
                <div>
                  <label className="block text-[12px] font-[600] text-[#425466] mb-[5px]">{cp.titleCard.fields.phone}</label>
                  <input type="tel" value={titlePhone} onChange={(e) => setTitlePhone(e.target.value)} className="w-full p-[9px_12px] border border-[#e6ebf1] rounded-[6px] text-[14px] text-[#0a2540] outline-none focus:border-[#635bff]" />
                </div>
              </div>
              <div className="mb-[14px]">
                <label className="block text-[12px] font-[600] text-[#425466] mb-[5px]">{cp.titleCard.fields.email}</label>
                <input type="email" value={titleEmail} onChange={(e) => setTitleEmail(e.target.value)} className="w-full p-[9px_12px] border border-[#e6ebf1] rounded-[6px] text-[14px] text-[#0a2540] outline-none focus:border-[#635bff]" />
                <div className="text-[11px] text-[#aab7c4] mt-[4px]">{cp.titleCard.fields.emailHint}</div>
              </div>
              <div className="mb-[14px]">
                <label className="block text-[12px] font-[600] text-[#425466] mb-[5px]">
                  {cp.titleCard.fields.fileNum} <span className="text-[10px] text-[#aab7c4] ml-[4px] font-normal">opcional</span>
                </label>
                <input type="text" value={titleFile} onChange={(e) => setTitleFile(e.target.value)} placeholder={cp.titleCard.fields.fileHint} className="w-full p-[9px_12px] border border-[#e6ebf1] rounded-[6px] text-[14px] text-[#0a2540] outline-none focus:border-[#635bff]" />
              </div>

              <div className="bg-[#f0efff] border border-[#c7c4ff] rounded-[8px] p-[14px_16px] flex gap-[10px] mt-[4px]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-[2px]"><circle cx="8" cy="8" r="6.5" stroke="#635bff" strokeWidth="1.3"/><path d="M8 7v4M8 5v.5" stroke="#635bff" strokeWidth="1.3" strokeLinecap="round"/></svg>
                <div className="text-[12px] text-[#635bff] leading-[1.7]" dangerouslySetInnerHTML={{ __html: cp.titleCard.wireNote }}></div>
              </div>
            </div>
          </div>

          {/* INSURANCE CARD */}
          <div className="bg-white border border-[#e6ebf1] rounded-[10px] mb-[16px] overflow-hidden">
            <div className="p-[18px_22px] border-b border-[#e6ebf1] flex items-center gap-[12px]">
              <div className="w-[32px] h-[32px] bg-[#e8f5e9] rounded-[7px] flex items-center justify-center shrink-0">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1L2 4v4c0 3.3 2.5 6.4 6 7 3.5-.6 6-3.7 6-7V4L8 1z" stroke="#2e7d32" strokeWidth="1.3" strokeLinejoin="round"/><path d="M5.5 8l2 2 3-3" stroke="#2e7d32" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div>
                <div className="text-[14px] font-[700] text-[#0a2540]">{cp.insCard.title}</div>
                <div className="text-[12px] text-[#8898aa] mt-[2px]">{cp.insCard.sub}</div>
              </div>
            </div>
            
            <div className="p-[20px_22px]">
              <div className="mb-[18px]">
                <div className="text-[11px] font-[700] uppercase tracking-[0.5px] text-[#aab7c4] mb-[8px]">{cp.insCard.savedLabel}</div>
                <div className="flex flex-col gap-[6px]">
                  <div onClick={() => handleInsSelect("insight")} className={`p-[10px_14px] border-[1.5px] rounded-[7px] cursor-pointer transition-colors ${selectedInsKey === "insight" ? "border-[#635bff] bg-[#f0efff]" : "border-[#e6ebf1] hover:border-[#635bff]"}`}>
                    <div className={`text-[13px] font-[600] ${selectedInsKey === "insight" ? "text-[#635bff]" : "text-[#0a2540]"}`}>{insData.insight.name}</div>
                    <div className="text-[11px] text-[#8898aa] mt-[2px]">{insData.insight.agent} · {insData.insight.phone}</div>
                  </div>
                  <div onClick={() => handleInsSelect("state")} className={`p-[10px_14px] border-[1.5px] rounded-[7px] cursor-pointer transition-colors ${selectedInsKey === "state" ? "border-[#635bff] bg-[#f0efff]" : "border-[#e6ebf1] hover:border-[#635bff]"}`}>
                    <div className={`text-[13px] font-[600] ${selectedInsKey === "state" ? "text-[#635bff]" : "text-[#0a2540]"}`}>{insData.state.name}</div>
                    <div className="text-[11px] text-[#8898aa] mt-[2px]">{insData.state.agent} · {insData.state.phone}</div>
                  </div>
                  <div onClick={() => handleInsSelect("new")} className={`p-[10px_14px] border-[1.5px] border-dashed rounded-[7px] cursor-pointer bg-white transition-colors hover:border-[#635bff] ${selectedInsKey === "new" ? "border-[#635bff]" : "border-[#c7c4ff]"}`}>
                    <div className="text-[13px] font-[600] text-[#635bff]">{cp.insCard.useDiff}</div>
                  </div>
                </div>
              </div>

              {(selectedInsKey === "insight" || selectedInsKey === "state") && (
                <div className="flex items-center gap-[6px] text-[11px] font-[600] text-[#2e7d32] bg-[#e8f5e9] rounded-[6px] p-[7px_10px] mb-[14px]">
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M3 8l4 4 6-6" stroke="#2e7d32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  {cp.titleCard.prefilled}
                </div>
              )}

              <div className="mb-[14px]">
                <label className="block text-[12px] font-[600] text-[#425466] mb-[5px]">{cp.insCard.fields.company}</label>
                <input type="text" value={insCompany} onChange={(e) => setInsCompany(e.target.value)} className="w-full p-[9px_12px] border border-[#e6ebf1] rounded-[6px] text-[14px] text-[#0a2540] outline-none focus:border-[#635bff]" />
              </div>
              <div className="grid grid-cols-2 gap-[14px] mb-[14px]">
                <div>
                  <label className="block text-[12px] font-[600] text-[#425466] mb-[5px]">{cp.insCard.fields.agent}</label>
                  <input type="text" value={insAgent} onChange={(e) => setInsAgent(e.target.value)} className="w-full p-[9px_12px] border border-[#e6ebf1] rounded-[6px] text-[14px] text-[#0a2540] outline-none focus:border-[#635bff]" />
                </div>
                <div>
                  <label className="block text-[12px] font-[600] text-[#425466] mb-[5px]">{cp.insCard.fields.phone}</label>
                  <input type="tel" value={insPhone} onChange={(e) => setInsPhone(e.target.value)} className="w-full p-[9px_12px] border border-[#e6ebf1] rounded-[6px] text-[14px] text-[#0a2540] outline-none focus:border-[#635bff]" />
                </div>
              </div>
              <div className="mb-[14px]">
                <label className="block text-[12px] font-[600] text-[#425466] mb-[5px]">{cp.insCard.fields.email}</label>
                <input type="email" value={insEmail} onChange={(e) => setInsEmail(e.target.value)} className="w-full p-[9px_12px] border border-[#e6ebf1] rounded-[6px] text-[14px] text-[#0a2540] outline-none focus:border-[#635bff]" />
              </div>
              <div className="grid grid-cols-2 gap-[14px] mb-[14px]">
                <div>
                  <label className="block text-[12px] font-[600] text-[#425466] mb-[5px]">
                    {cp.insCard.fields.policy} <span className="text-[10px] text-[#aab7c4] ml-[4px] font-normal">{cp.insCard.fields.policyHint}</span>
                  </label>
                  <input type="text" value={insPolicy} onChange={(e) => setInsPolicy(e.target.value)} placeholder="Assigned when bound" className="w-full p-[9px_12px] border border-[#e6ebf1] rounded-[6px] text-[14px] text-[#0a2540] outline-none focus:border-[#635bff]" />
                </div>
                <div>
                  <label className="block text-[12px] font-[600] text-[#425466] mb-[5px]">{cp.insCard.fields.coverage}</label>
                  <input type="text" value={insCoverage} onChange={(e) => setInsCoverage(e.target.value)} placeholder="$165,000" className="w-full p-[9px_12px] border border-[#e6ebf1] rounded-[6px] text-[14px] text-[#0a2540] outline-none focus:border-[#635bff]" />
                </div>
              </div>
              <div className="mb-[14px]">
                <label className="block text-[12px] font-[600] text-[#425466] mb-[5px]">{cp.insCard.fields.status}</label>
                <select value={insStatus} onChange={(e) => setInsStatus(e.target.value)} className="w-full p-[9px_12px] border border-[#e6ebf1] rounded-[6px] text-[14px] text-[#0a2540] bg-white outline-none cursor-pointer focus:border-[#635bff]">
                  {cp.insCard.fields.statusOpts.map((opt: string, i: number) => (
                    <option key={i} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col sm:flex-row items-start justify-between gap-[16px] bg-[#f6f9fc] border border-[#e6ebf1] rounded-[7px] p-[12px_14px] mt-[4px]">
                <div>
                  <div className="text-[13px] font-[600] text-[#0a2540]">{cp.insCard.rentCover.label}</div>
                  <div className="text-[11px] text-[#8898aa] mt-[3px] leading-[1.5]">{cp.insCard.rentCover.sub}</div>
                </div>
                <div className="flex gap-[6px] shrink-0">
                  <button onClick={() => setRentCover("no")} className={`p-[7px_16px] rounded-[6px] text-[12px] font-[700] cursor-pointer transition-colors border-[1.5px] ${rentCover === "no" ? "bg-[#635bff] border-[#635bff] text-white" : "bg-white border-[#e6ebf1] text-[#425466]"}`}>{cp.insCard.rentCover.no}</button>
                  <button onClick={() => setRentCover("yes")} className={`p-[7px_16px] rounded-[6px] text-[12px] font-[700] cursor-pointer transition-colors border-[1.5px] ${rentCover === "yes" ? "bg-[#635bff] border-[#635bff] text-white" : "bg-white border-[#e6ebf1] text-[#425466]"}`}>{cp.insCard.rentCover.yes}</button>
                </div>
              </div>
              {rentCover === "yes" && (
                <div className="text-[11px] text-[#b45309] bg-[#fffbeb] border border-[#fcd34d] rounded-[6px] p-[8px_12px] mt-[8px] leading-[1.6]">
                  {cp.insCard.rentCover.note}
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* ================================== */}
      {/* STEP 2: REVIEW & CONFIRM */}
      {/* ================================== */}
      {step === 2 && (
        <div className="animate-in fade-in duration-300">
          <div className="bg-white border border-[#e6ebf1] rounded-[10px] mb-[16px] overflow-hidden">
            <div className="p-[18px_22px] border-b border-[#e6ebf1]">
              <div className="text-[14px] font-[700] text-[#0a2540]">{cp.reviewCard.title}</div>
              <div className="text-[12px] text-[#8898aa] mt-[2px]">{cp.reviewCard.sub}</div>
            </div>
            
            <div className="p-[0_22px_20px] mt-[20px]">
              
              <div className="bg-[#f6f9fc] border border-[#e6ebf1] rounded-[8px] p-[16px_18px] mb-[12px]">
                <div className="text-[10px] font-[700] uppercase tracking-[0.6px] text-[#aab7c4] mb-[10px]">{cp.reviewCard.blocks.deal}</div>
                <div className="flex justify-between py-[7px] border-b border-[#f0f4f8] text-[13px]"><span className="text-[#8898aa]">{cp.reviewCard.blocks.dealFields.prop}</span><span className="font-[600] text-[#0a2540]">{address}</span></div>
                <div className="flex justify-between py-[7px] border-b border-[#f0f4f8] text-[13px]"><span className="text-[#8898aa]">{cp.reviewCard.blocks.dealFields.lender}</span><span className="font-[600] text-[#0a2540]">{lenderName}</span></div>
                <div className="flex justify-between py-[7px] border-b border-[#f0f4f8] text-[13px]"><span className="text-[#8898aa]">{cp.reviewCard.blocks.dealFields.amount}</span><span className="font-[600] text-[#0a2540]">{balance}</span></div>
                <div className="flex justify-between py-[7px] text-[13px]"><span className="text-[#8898aa]">{cp.reviewCard.blocks.dealFields.rate}</span><span className="font-[600] text-[#0a2540]">{rateTerm}</span></div>
              </div>

              <div className="bg-[#f6f9fc] border border-[#e6ebf1] rounded-[8px] p-[16px_18px] mb-[12px]">
                <div className="text-[10px] font-[700] uppercase tracking-[0.6px] text-[#aab7c4] mb-[10px]">{cp.reviewCard.blocks.title}</div>
                <div className="flex justify-between py-[7px] border-b border-[#f0f4f8] text-[13px]"><span className="text-[#8898aa]">{cp.reviewCard.blocks.titleFields.comp}</span><span className="font-[600] text-[#0a2540]">{titleName || "N/D"}</span></div>
                <div className="flex justify-between py-[7px] border-b border-[#f0f4f8] text-[13px]"><span className="text-[#8898aa]">{cp.reviewCard.blocks.titleFields.agent}</span><span className="font-[600] text-[#0a2540]">{titleAgent || "N/D"}</span></div>
                <div className="flex justify-between py-[7px] border-b border-[#f0f4f8] text-[13px]"><span className="text-[#8898aa]">{cp.reviewCard.blocks.titleFields.phone}</span><span className="font-[600] text-[#0a2540]">{titlePhone || "N/D"}</span></div>
                <div className="flex justify-between py-[7px] border-b border-[#f0f4f8] text-[13px]"><span className="text-[#8898aa]">{cp.reviewCard.blocks.titleFields.email}</span><span className="font-[600] text-[#0a2540]">{titleEmail || "N/D"}</span></div>
                <div className="flex justify-between py-[7px] text-[13px]"><span className="text-[#8898aa]">{cp.reviewCard.blocks.titleFields.wire}</span><span className="font-[600] text-[#635bff]">{cp.reviewCard.blocks.titleFields.wireVal}</span></div>
              </div>

              <div className="bg-[#f6f9fc] border border-[#e6ebf1] rounded-[8px] p-[16px_18px] mb-[12px]">
                <div className="text-[10px] font-[700] uppercase tracking-[0.6px] text-[#aab7c4] mb-[10px]">{cp.reviewCard.blocks.ins}</div>
                <div className="flex justify-between py-[7px] border-b border-[#f0f4f8] text-[13px]"><span className="text-[#8898aa]">{cp.reviewCard.blocks.titleFields.comp}</span><span className="font-[600] text-[#0a2540]">{insCompany || "N/D"}</span></div>
                <div className="flex justify-between py-[7px] border-b border-[#f0f4f8] text-[13px]"><span className="text-[#8898aa]">{cp.reviewCard.blocks.titleFields.agent}</span><span className="font-[600] text-[#0a2540]">{insAgent ? `${insAgent} — ${insPhone}` : "N/D"}</span></div>
                <div className="flex justify-between py-[7px] border-b border-[#f0f4f8] text-[13px]"><span className="text-[#8898aa]">Coverage</span><span className="font-[600] text-[#0a2540]">{insCoverage || "N/D"}</span></div>
                <div className="flex justify-between py-[7px] text-[13px]"><span className="text-[#8898aa]">Status</span><span className="font-[600] text-[#2e7d32]">{insStatus || "N/D"}</span></div>
              </div>

              <div className="mb-[16px] mt-[16px]">
                <div className="flex items-center justify-between py-[10px] border-b border-[#f0f4f8]">
                  <span className="text-[13px] text-[#0a2540] font-[500]">{cp.reviewCard.statuses.letter}</span>
                  <span className="inline-flex items-center gap-[4px] p-[3px_10px] rounded-[10px] text-[11px] font-[700] bg-[#e8f5e9] text-[#2e7d32]">{cp.reviewCard.statuses.letterVal}</span>
                </div>
                <div className="flex items-center justify-between py-[10px] border-b border-[#f0f4f8]">
                  <span className="text-[13px] text-[#0a2540] font-[500]">{cp.reviewCard.statuses.title}</span>
                  <span className="inline-flex items-center gap-[4px] p-[3px_10px] rounded-[10px] text-[11px] font-[700] bg-[#e8f5e9] text-[#2e7d32]">{cp.reviewCard.statuses.titleVal}</span>
                </div>
                <div className="flex items-center justify-between py-[10px] border-b border-[#f0f4f8]">
                  <span className="text-[13px] text-[#0a2540] font-[500]">{cp.reviewCard.statuses.ins}</span>
                  <span className="inline-flex items-center gap-[4px] p-[3px_10px] rounded-[10px] text-[11px] font-[700] bg-[#e8f5e9] text-[#2e7d32]">✓ {insStatus.split("—")[0].trim()}</span>
                </div>
                <div className="flex items-center justify-between py-[10px] border-b border-[#f0f4f8]">
                  <span className="text-[13px] text-[#0a2540] font-[500]">{cp.reviewCard.statuses.wire}</span>
                  <span className="inline-flex items-center gap-[4px] p-[3px_10px] rounded-[10px] text-[11px] font-[700] bg-[#f0efff] text-[#635bff]">{cp.reviewCard.statuses.wireVal}</span>
                </div>
                <div className="flex items-center justify-between py-[10px]">
                  <span className="text-[13px] text-[#0a2540] font-[500]">{cp.reviewCard.statuses.closing}</span>
                  <span className="inline-flex items-center gap-[4px] p-[3px_10px] rounded-[10px] text-[11px] font-[700] bg-[#fff8e1] text-[#b45309]">{cp.reviewCard.statuses.closingVal}</span>
                </div>
              </div>

              <button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full p-[13px] bg-[#2e7d32] text-white border-none rounded-[6px] text-[15px] font-[800] cursor-pointer hover:bg-[#1b5e20] transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "..." : cp.reviewCard.btn}
              </button>
              <div className="text-[11px] text-[#aab7c4] text-center mt-[10px] leading-[1.6]">
                {cp.reviewCard.btnNote}
              </div>

            </div>
          </div>
        </div>
      )}

      {/* BOTTOM BAR FIXA */}
      <div className="fixed bottom-0 left-0 right-0 lg:left-[240px] bg-white border-t border-[#e6ebf1] p-[14px_32px] flex justify-between items-center z-40">
        <button 
          onClick={() => setStep(1)} 
          className={`p-[9px_18px] bg-white border border-[#e6ebf1] rounded-[6px] text-[13px] font-[600] text-[#425466] transition-colors hover:bg-surface-2 ${step === 1 ? 'invisible' : 'visible'}`}
        >
          {cp.bottomBar.back}
        </button>
        <span className="text-[12px] text-[#aab7c4]">
          {step === 1 ? cp.bottomBar.step1 : cp.bottomBar.step2}
        </span>
        {step === 1 ? (
          <button 
            onClick={() => { window.scrollTo(0,0); setStep(2); }} 
            className="p-[9px_24px] bg-[#635bff] text-white border-none rounded-[6px] text-[13px] font-[700] transition-opacity hover:opacity-90"
          >
            {cp.bottomBar.next} <span className="opacity-70 text-[11px]">{cp.bottomBar.review}</span>
          </button>
        ) : (
          // Div fantasma para mantener centrado el stepHint cuando el botón next se oculta
          <div className="w-[120px] invisible"></div>
        )}
      </div>

    </div>
  );
}

export default function ClosingPrepPage() {
  return (
    <SiteShell isDashboard={true}>
      <Suspense fallback={<div className="p-8 text-[#8898aa]">Cargando vista...</div>}>
        <ClosingPrepContent />
      </Suspense>
    </SiteShell>
  );
}