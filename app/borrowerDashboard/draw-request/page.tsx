"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import { API_ROUTES } from "@/app/lib/endpoints";

function DrawRequestContent() {
  const { t, lang } = useSite();
  const dr = t.drawRequest;
  const searchParams = useSearchParams();
  const router = useRouter();
  const contractId = searchParams?.get("contractId");

  const [contract, setContract] = useState<any>(null);
  
  // Estados para el formulario de registro del Draw
  const [drawAmount, setDrawAmount] = useState("");
  const [drawDate, setDrawDate] = useState("");
  const [approvedVia, setApprovedVia] = useState("Phone call");
  const [workDesc, setWorkDesc] = useState("");
  const [isLogging, setIsLogging] = useState(false);
  const [isNotifying, setIsNotifying] = useState(false);

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

  const handleLogDraw = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!drawAmount || !drawDate || !workDesc.trim()) return;
    
    setIsLogging(true);
    try {
      // Mock log action
      await new Promise(resolve => setTimeout(resolve, 800));
      alert("Draw logged successfully!");
      setDrawAmount("");
      setDrawDate("");
      setWorkDesc("");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLogging(false);
    }
  };

  const handleNotifyLender = async () => {
    setIsNotifying(true);
    try {
      // Mock email notification trigger
      await new Promise(resolve => setTimeout(resolve, 800));
      alert(dr.contactCard.successAlert);
    } catch (error) {
      console.error(error);
    } finally {
      setIsNotifying(false);
    }
  };

  // Mocks o datos extraidos del contrato si existe
  const address = contract?.property?.addressLine1 || "3802 University Cove, Memphis TN";
  const lenderName = contract?.lenderCompany?.companyName || "NextGen Growth LLC";
  const balance = contract?.currentPrincipalBalance ? `$${contract.currentPrincipalBalance.toLocaleString()}` : "$95,000";

  return (
    <div className="max-w-[760px] animate-in fade-in duration-300 font-sans">
      
      <div className="text-[22px] font-[800] text-[#0a2540] mb-[4px]">
        {dr.title}
      </div>
      <div className="text-[13px] text-[#8898aa] mb-[28px]">
        {dr.subtitle}
      </div>

      <div className="inline-block bg-[#fff3cd] border border-[#fbbf24] rounded-[6px] px-[12px] py-[4px] text-[11px] font-[700] text-[#b45309] mb-[20px]">
        {dr.versionBadge}
      </div>

      {/* HOW IT WORKS */}
      <div className="bg-[#f0efff] border border-[#c7c4ff] rounded-[10px] p-[18px_20px] mb-[20px]">
        <div className="text-[13px] font-[800] text-[#635bff] mb-[6px]">{dr.notice.title}</div>
        <div 
          className="text-[13px] text-[#425466] leading-[1.6]" 
          dangerouslySetInnerHTML={{ __html: dr.notice.body }} 
        />
      </div>

      {/* LOAN SUMMARY */}
      <div className="bg-white border border-[#e6ebf1] rounded-[10px] p-[24px_28px] mb-[16px]">
        <div className="text-[15px] font-[800] text-[#0a2540] mb-[4px]">{address}</div>
        <div className="text-[13px] text-[#8898aa] mb-[20px]">{dr.summary.subtitle}</div>

        <div className="flex flex-wrap md:flex-nowrap gap-[6px] mb-[20px]">
          <div className="flex-1 min-w-[100px] bg-white border border-[#e6ebf1] rounded-[8px] p-[14px] text-center">
            <div className="text-[22px] font-[800] text-[#0a2540]">2</div>
            <div className="text-[11px] text-[#8898aa] mt-[3px]">{dr.summary.drawsUsed}</div>
          </div>
          <div className="flex-1 min-w-[100px] bg-white border border-[#e6ebf1] rounded-[8px] p-[14px] text-center">
            <div className="text-[22px] font-[800] text-[#635bff]">2</div>
            <div className="text-[11px] text-[#8898aa] mt-[3px]">{dr.summary.drawsRemaining}</div>
          </div>
          <div className="flex-1 min-w-[100px] bg-white border border-[#e6ebf1] rounded-[8px] p-[14px] text-center">
            <div className="text-[22px] font-[800] text-[#0a2540]">$22,500</div>
            <div className="text-[11px] text-[#8898aa] mt-[3px]">{dr.summary.holdbackReleased}</div>
          </div>
          <div className="flex-1 min-w-[100px] bg-white border border-[#e6ebf1] rounded-[8px] p-[14px] text-center">
            <div className="text-[22px] font-[800] text-[#0a2540]">$7,500</div>
            <div className="text-[11px] text-[#8898aa] mt-[3px]">{dr.summary.holdbackRemaining}</div>
          </div>
        </div>

        <div className="flex justify-between items-center py-[9px] border-b border-[#f0f4f8] text-[13px]">
          <span className="text-[#8898aa]">{dr.summary.lender}</span>
          <span className="font-[600] text-[#0a2540]">{lenderName}</span>
        </div>
        <div className="flex justify-between items-center py-[9px] border-b border-[#f0f4f8] text-[13px]">
          <span className="text-[#8898aa]">{dr.summary.lenderContact}</span>
          <span className="font-[600] text-[#0a2540]">chaolin33@yahoo.com · (901) 315-7441</span>
        </div>
        <div className="flex justify-between items-center py-[9px] border-b border-[#f0f4f8] text-[13px]">
          <span className="text-[#8898aa]">{dr.summary.loanBalance}</span>
          <span className="font-[600] text-[#0a2540]">{balance}</span>
        </div>
        <div className="flex justify-between items-center py-[9px] border-b border-[#f0f4f8] text-[13px]">
          <span className="text-[#8898aa]">{dr.summary.totalHoldback}</span>
          <span className="font-[600] text-[#0a2540]">$30,000</span>
        </div>
        <div className="flex justify-between items-center py-[9px] text-[13px]">
          <span className="text-[#8898aa]">{dr.summary.maxDraws}</span>
          <span className="font-[600] text-[#0a2540]">4</span>
        </div>
      </div>

      {/* LOG A DRAW */}
      <div className="bg-white border border-[#e6ebf1] rounded-[10px] p-[24px_28px] mb-[16px]">
        <div className="text-[15px] font-[800] text-[#0a2540] mb-[4px]">{dr.form.title}</div>
        <div className="text-[13px] text-[#8898aa] mb-[20px]">{dr.form.sub}</div>

        <form onSubmit={handleLogDraw}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[14px] mb-[16px]">
            <div>
              <label className="block text-[11px] font-[700] text-[#8898aa] mb-[6px] uppercase tracking-[0.4px]">{dr.form.drawNum}</label>
              <select className="w-full p-[10px_12px] border border-[#e6ebf1] rounded-[6px] text-[13px] font-sans text-[#0a2540] bg-white outline-none focus:border-[#635bff] cursor-pointer">
                <option>Draw 3 of 4</option>
                <option>Draw 4 of 4</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-[700] text-[#8898aa] mb-[6px] uppercase tracking-[0.4px]">{dr.form.amount}</label>
              <input 
                type="number" 
                value={drawAmount}
                onChange={(e) => setDrawAmount(e.target.value)}
                placeholder={dr.form.phAmount} 
                className="w-full p-[10px_12px] border border-[#e6ebf1] rounded-[6px] text-[13px] font-sans text-[#0a2540] bg-white outline-none focus:border-[#635bff]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[14px] mb-[16px]">
            <div>
              <label className="block text-[11px] font-[700] text-[#8898aa] mb-[6px] uppercase tracking-[0.4px]">{dr.form.date}</label>
              <input 
                type="date" 
                value={drawDate}
                onChange={(e) => setDrawDate(e.target.value)}
                className="w-full p-[10px_12px] border border-[#e6ebf1] rounded-[6px] text-[13px] font-sans text-[#0a2540] bg-white outline-none focus:border-[#635bff]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-[700] text-[#8898aa] mb-[6px] uppercase tracking-[0.4px]">{dr.form.approvedVia}</label>
              <select 
                value={approvedVia}
                onChange={(e) => setApprovedVia(e.target.value)}
                className="w-full p-[10px_12px] border border-[#e6ebf1] rounded-[6px] text-[13px] font-sans text-[#0a2540] bg-white outline-none focus:border-[#635bff] cursor-pointer"
              >
                {dr.form.optionsApproved.map((opt: string, idx: number) => (
                  <option key={idx} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-[16px]">
            <label className="block text-[11px] font-[700] text-[#8898aa] mb-[6px] uppercase tracking-[0.4px]">{dr.form.workCompleted}</label>
            <textarea 
              value={workDesc}
              onChange={(e) => setWorkDesc(e.target.value)}
              placeholder={dr.form.phWork} 
              className="w-full p-[10px_12px] border border-[#e6ebf1] rounded-[6px] text-[13px] font-sans text-[#0a2540] bg-white h-[90px] resize-none outline-none focus:border-[#635bff]"
            ></textarea>
          </div>

          <div className="flex gap-[10px]">
            <button 
              type="button"
              onClick={() => router.push("/borrowerDashboard")}
              className="p-[11px_24px] bg-white text-[#425466] border border-[#e6ebf1] rounded-[6px] text-[14px] font-[600] cursor-pointer transition-colors hover:bg-surface-2"
            >
              {dr.form.cancel}
            </button>
            <button 
              type="submit"
              disabled={isLogging || !drawAmount || !drawDate || !workDesc.trim()}
              className="p-[11px_28px] bg-[#635bff] text-white border-none rounded-[6px] text-[14px] font-[700] cursor-pointer transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {isLogging ? dr.form.submitting : dr.form.submit}
            </button>
          </div>
        </form>
      </div>

      {/* DRAW HISTORY */}
      <div className="bg-white border border-[#e6ebf1] rounded-[10px] p-[24px_28px] mb-[16px]">
        <div className="text-[15px] font-[800] text-[#0a2540] mb-[16px]">{dr.history.title}</div>
        
        <div className="flex flex-col gap-[10px]">
          <div className="flex justify-between items-center p-[12px_16px] bg-[#f6f9fc] border border-[#e6ebf1] rounded-[8px] text-[13px]">
            <div className="flex flex-col gap-[2px]">
              <div className="font-[700] text-[#0a2540]">Draw 1 of 4</div>
              <div className="text-[11px] text-[#8898aa]">{lang === "es" ? "Ago 15, 2026 — vía llamada telefónica" : "Aug 15, 2026 — via phone call"}</div>
              <div className="text-[11px] text-[#425466] mt-[2px]">{lang === "es" ? "Demo + limpieza + retiro de techo completo" : "Demo + cleanout + roof tear-off complete"}</div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-[15px] font-[800] text-[#0a2540] mb-[4px]">$12,500</div>
              <span className="inline-block px-[10px] py-[3px] rounded-[8px] text-[10px] font-[700] bg-[#e8f5e9] text-[#2e7d32]">{dr.history.logged}</span>
            </div>
          </div>

          <div className="flex justify-between items-center p-[12px_16px] bg-[#f6f9fc] border border-[#e6ebf1] rounded-[8px] text-[13px]">
            <div className="flex flex-col gap-[2px]">
              <div className="font-[700] text-[#0a2540]">Draw 2 of 4</div>
              <div className="text-[11px] text-[#8898aa]">{lang === "es" ? "Sept 5, 2026 — vía correo electrónico" : "Sept 5, 2026 — via email"}</div>
              <div className="text-[11px] text-[#425466] mt-[2px]">{lang === "es" ? "Estructura, plomería básica, inst. eléctrica completadas" : "Framing, rough plumbing, electrical rough-in complete"}</div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-[15px] font-[800] text-[#0a2540] mb-[4px]">$10,000</div>
              <span className="inline-block px-[10px] py-[3px] rounded-[8px] text-[10px] font-[700] bg-[#e8f5e9] text-[#2e7d32]">{dr.history.logged}</span>
            </div>
          </div>

          <div className="flex justify-between items-center p-[12px_16px] bg-[#fafafe] border border-dashed border-[#c7c4ff] rounded-[8px] text-[13px]">
            <div className="flex flex-col gap-[2px]">
              <div className="font-[700] text-[#635bff]">Draw 3 of 4</div>
              <div className="text-[11px] text-[#635bff]">{dr.history.pending}</div>
            </div>
            <div className="text-right shrink-0">
              <span className="inline-block px-[10px] py-[3px] rounded-[8px] text-[10px] font-[700] bg-[#f0efff] text-[#635bff]">{dr.history.notRequested}</span>
            </div>
          </div>
        </div>
      </div>

      {/* LENDER CONTACT */}
      <div className="bg-[#fafafe] border border-[#635bff] rounded-[10px] p-[24px_28px]">
        <div className="text-[15px] font-[800] text-[#0a2540] mb-[4px]">{dr.contactCard.title}</div>
        <div className="text-[13px] text-[#8898aa] mb-[20px]">{dr.contactCard.sub}</div>
        
        <div className="flex justify-between items-center py-[9px] border-b border-[#f0f4f8] text-[13px]">
          <span className="text-[#8898aa]">{dr.contactCard.lender}</span>
          <span className="font-[600] text-[#0a2540]">NextGen Growth LLC — Chao Lin</span>
        </div>
        <div className="flex justify-between items-center py-[9px] border-b border-[#f0f4f8] text-[13px]">
          <span className="text-[#8898aa]">{dr.contactCard.email}</span>
          <span className="font-[600] text-[#0a2540]">chaolin33@yahoo.com</span>
        </div>
        <div className="flex justify-between items-center py-[9px] text-[13px]">
          <span className="text-[#8898aa]">{dr.contactCard.phone}</span>
          <span className="font-[600] text-[#0a2540]">(901) 315-7441</span>
        </div>
        
        <div className="mt-[16px]">
          <button 
            onClick={handleNotifyLender}
            disabled={isNotifying}
            className="w-full sm:w-auto p-[11px_28px] bg-[#635bff] text-white border-none rounded-[6px] text-[14px] font-[700] cursor-pointer transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {isNotifying ? "..." : dr.contactCard.notifyBtn}
          </button>
        </div>
      </div>

    </div>
  );
}

export default function DrawRequestPage() {
  return (
    <SiteShell isDashboard={true}>
      <Suspense fallback={<div className="p-8 text-[#8898aa]">Cargando vista...</div>}>
        <DrawRequestContent />
      </Suspense>
    </SiteShell>
  );
}