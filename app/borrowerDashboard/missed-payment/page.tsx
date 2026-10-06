"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import { API_ROUTES } from "@/app/lib/endpoints";

function MissedPaymentContent() {
  const { t } = useSite();
  const mp = t.missedPayment;
  const searchParams = useSearchParams();
  const contractId = searchParams?.get("contractId");
  
  const [view, setView] = useState<"borrower" | "lender">("borrower");
  // Permite conectarse a tu backend si proveemos el ID
  const [contract, setContract] = useState<any>(null);

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
          console.error("No se pudo cargar el contrato de la API:", e);
        }
      };
      fetchContract();
    }
  }, [contractId]);

  return (
    <div className="max-w-[760px] animate-in fade-in duration-300">
      <div className="text-[22px] font-[800] text-[#0a2540] mb-[4px]">
        {mp.title}
      </div>
      <div className="text-[13px] text-[#8898aa] mb-[24px]">
        {contract ? `${contract.property?.addressLine1} · Préstamo #${contract.contractNumber}` : mp.subtitle}
      </div>

      {/* Score Impact Banner */}
      <div className="bg-[#1a0a2e] border-2 border-[#635bff] rounded-[10px] p-[18px_22px] mb-[20px] flex justify-between items-center gap-[16px] flex-wrap md:flex-nowrap">
        <div className="flex gap-[12px] items-start">
          <div className="w-[36px] h-[36px] bg-[#635bff] rounded-[8px] flex items-center justify-center shrink-0">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="7.5" stroke="#fff" strokeWidth="1.5" />
              <path d="M9 5v4M9 12v.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <div className="text-[13px] font-[800] text-white mb-[4px]">{mp.scoreBanner.title}</div>
            <div className="text-[11px] text-[#a89df9] leading-[1.7]">{mp.scoreBanner.desc}</div>
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-[10px] font-[700] uppercase tracking-[0.4px] text-[#8898aa]">{mp.scoreBanner.currentScore}</div>
          <div className="text-[32px] font-[800] text-white tracking-[-0.5px]">724</div>
          <div className="text-[11px] text-[#ef9a9a] font-[700] mt-[2px]">{mp.scoreBanner.projectedDrop}</div>
        </div>
      </div>

      <div className="flex gap-[8px] mb-[20px]">
        <button 
          onClick={() => setView("borrower")}
          className={`px-[18px] py-[7px] rounded-[6px] text-[13px] font-[600] cursor-pointer border transition-colors ${view === "borrower" ? "bg-[#635bff] text-white border-[#635bff]" : "border-[#e6ebf1] bg-white text-[#8898aa] hover:bg-surface-2"}`}
        >
          {mp.viewToggle.borrower}
        </button>
        <button 
          onClick={() => setView("lender")}
          className={`px-[18px] py-[7px] rounded-[6px] text-[13px] font-[600] cursor-pointer border transition-colors ${view === "lender" ? "bg-[#635bff] text-white border-[#635bff]" : "border-[#e6ebf1] bg-white text-[#8898aa] hover:bg-surface-2"}`}
        >
          {mp.viewToggle.lender}
        </button>
      </div>

      {view === "borrower" ? (
        <div className="animate-in fade-in duration-300">
          <div className="bg-[#fef2f2] border-2 border-[#dc2626] rounded-[10px] p-[20px_24px] mb-[24px] flex gap-[16px] items-start">
            <div className="w-[40px] h-[40px] bg-[#dc2626] rounded-[8px] flex items-center justify-center shrink-0">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2L2 17h16L10 2z" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round" />
                <path d="M10 8v4M10 14.5v.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div className="text-[16px] font-[800] text-[#dc2626]">{mp.alert.title}</div>
              <div className="text-[13px] text-[#7f1d1d] mt-[3px] leading-[1.6]">{mp.alert.sub}</div>
            </div>
          </div>

          <div className="bg-white border border-[#e6ebf1] rounded-[10px] p-[22px_24px] mb-[20px]">
            <div className="text-[14px] font-[700] mb-[14px] text-[#0a2540]">{mp.paymentCard.title}</div>
            <div className="flex justify-between text-[13px] py-[8px] border-b border-[#f6f9fc]">
              <span className="text-[#8898aa]">{mp.paymentCard.monthly}</span>
              <span className="font-[700] text-[#0a2540]">$1,150.00</span>
            </div>
            <div className="flex justify-between text-[13px] py-[8px] border-b border-[#f6f9fc]">
              <span className="text-[#8898aa]">{mp.paymentCard.lateFee}</span>
              <span className="font-[700] text-[#dc2626]">$57.50</span>
            </div>
            <div className="flex justify-between text-[13px] py-[8px] border-b border-[#f6f9fc]">
              <span className="text-[#8898aa]">{mp.paymentCard.perDiem}</span>
              <span className="font-[700] text-[#b45309]">$38.33/day</span>
            </div>
            <div className="flex justify-between text-[15px] py-[12px] border-t-2 border-[#e6ebf1] mt-[4px]">
              <span className="font-[700] text-[#0a2540]">{mp.paymentCard.total}</span>
              <span className="text-[18px] font-[700] text-[#dc2626]">$1,207.50</span>
            </div>
          </div>

          <div className="bg-white border border-[#e6ebf1] rounded-[10px] p-[22px_24px] mb-[20px]">
            <div className="text-[15px] font-[700] mb-[4px] text-[#0a2540]">{mp.actionCard.title}</div>
            <div className="text-[13px] text-[#8898aa] mb-[18px]">{mp.actionCard.sub}</div>
            <button className="w-full py-[14px] bg-[#dc2626] text-white border-none rounded-[6px] text-[15px] font-[800] cursor-pointer mb-[10px] hover:opacity-90 transition-opacity">
              {mp.actionCard.payBtn}
            </button>
            <button className="w-full py-[12px] bg-white text-[#635bff] border-2 border-[#c7c4ff] rounded-[6px] text-[13px] font-[700] cursor-pointer hover:bg-[#f0efff] transition-colors">
              {mp.actionCard.contactBtn}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-[#fcd34d] rounded-[10px] p-[20px_24px] animate-in fade-in duration-300 mb-[20px]">
          <div className="text-[14px] font-[700] text-[#92400e] mb-[12px]">{mp.lenderAction.title}</div>
          <div className="flex flex-col gap-[8px]">
            {mp.lenderAction.options.map((opt: any, idx: number) => (
              <div key={idx} className="p-[12px_16px] border border-[#e6ebf1] rounded-[8px] text-[13px] text-[#425466] cursor-pointer hover:border-[#635bff] hover:bg-[#f0efff] hover:text-[#635bff] group transition-all">
                <strong className="block font-[700] text-[#0a2540] mb-[2px] group-hover:text-[#635bff] transition-colors">{opt.title}</strong>
                {opt.desc}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="text-[13px] text-[#8898aa] mb-[12px] mt-[4px]">{mp.timeline.title}</div>
      <div className="flex flex-col gap-0 mb-[20px]">
        {mp.timeline.events.map((ev: any, idx: number) => {
          const isLast = idx === mp.timeline.events.length - 1;
          let dotColor = "bg-[#f6f9fc] border-[#e6ebf1]";
          let svgContent = <rect x="3" y="3" width="6" height="6" rx="1" stroke="#aab7c4" strokeWidth="1.3"/>;
          
          if (idx === 0) {
            svgContent = <circle cx="6" cy="6" r="4" stroke="#aab7c4" strokeWidth="1.3"/>;
          } else if (idx === 1) {
            dotColor = "bg-[#fffbeb] border-[#f59e0b]";
            svgContent = <path d="M6 3v3l2 2" stroke="#f59e0b" strokeWidth="1.4" strokeLinecap="round"/>;
          } else if (idx === 2) {
            dotColor = "bg-[#fef2f2] border-[#dc2626]";
            svgContent = <path d="M3 9L6 4l3 5H3z" stroke="#dc2626" strokeWidth="1.3" strokeLinejoin="round"/>;
          }

          return (
            <div key={idx} className="flex gap-[14px] pb-[18px] relative">
              {!isLast && <div className="absolute left-[15px] top-[30px] bottom-0 w-[2px] bg-[#e6ebf1]"></div>}
              <div className={`w-[32px] h-[32px] rounded-full flex items-center justify-center shrink-0 z-10 border-2 ${dotColor}`}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  {svgContent}
                </svg>
              </div>
              <div className="flex-1 pt-[5px]">
                <div className="text-[13px] font-[700] text-[#0a2540]">{ev.title}</div>
                <div className="text-[11px] text-[#aab7c4] mt-[1px]">{ev.date}</div>
                <div className="text-[12px] text-[#425466] mt-[4px] leading-[1.6]">{ev.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function MissedPaymentPage() {
  return (
    <SiteShell isDashboard={true}>
      <Suspense fallback={<div className="p-8 text-[#8898aa]">Cargando vista...</div>}>
        <MissedPaymentContent />
      </Suspense>
    </SiteShell>
  );
}