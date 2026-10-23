"use client";

import { apiFetch } from "@/app/lib/apiFetch";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useSite } from "@/app/components/layout/SiteShell";
import { API_ROUTES } from "@/app/lib/endpoints";
import { ChevronLeft } from "lucide-react";

export default function LenderMissedPaymentPage() {
  return <LenderMissedPaymentContent />;
}

function LenderMissedPaymentContent() {
  const { t, lang } = useSite();
  const isEs = lang === "es";
  const mp = t.missedPayment;
  const params = useParams();
  const contractId = params?.id as string;
  const [contract, setContract] = useState<any>(null);

  useEffect(() => {
    if (contractId) {
      const fetchContract = async () => {
        try {
          const res = await apiFetch(API_ROUTES.contracts.byId(contractId));
          const json = await res.json();
          if (json.success) setContract(json.data);
        } catch (e) {
          console.error("No se pudo cargar el contrato de la API:", e);
        }
      };
      fetchContract();
    }
  }, [contractId]);

  const handleAction = (action: string) => {
    alert(isEs ? `Acción simulada: ${action}` : `Mock action: ${action}`);
  };

  const address = contract?.property?.addressLine1 || "Dirección no disponible";

  return (
    <div className="max-w-[760px] animate-in fade-in duration-300 mx-auto py-6 font-sans">
      <Link
        href={`/lenderDashboard/contracts/${contractId}`}
        className="mb-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[#8898aa] transition-colors hover:text-[#635bff]"
      >
        <ChevronLeft size={16} />
        {isEs ? "Volver al contrato" : "Back to contract"}
      </Link>

      <div className="text-[22px] font-[800] text-[#0a2540] mb-[4px]">
        {isEs ? "Gestión de Atraso" : "Late Payment Management"}
      </div>
      <div className="text-[13px] text-[#8898aa] mb-[24px]">
        {address} · REF: {contract?.contractNumber || contractId}
      </div>

      <div className="bg-white border border-[#fcd34d] rounded-[10px] p-[20px_24px] mb-[20px]">
        <div className="text-[14px] font-[700] text-[#92400e] mb-[12px]">
          {mp.lenderAction.title}
        </div>
        <div className="flex flex-col gap-[8px]">
          {mp.lenderAction.options.map((opt: any, idx: number) => (
            <div 
              key={idx} 
              onClick={() => handleAction(opt.title)}
              className="p-[12px_16px] border border-[#e6ebf1] rounded-[8px] text-[13px] text-[#425466] cursor-pointer hover:border-[#635bff] hover:bg-[#f0efff] hover:text-[#635bff] group transition-all"
            >
              <strong className="block font-[700] text-[#0a2540] mb-[2px] group-hover:text-[#635bff] transition-colors">
                {opt.title}
              </strong>
              {opt.desc}
            </div>
          ))}
        </div>
      </div>

      <div className="text-[13px] font-bold text-[#8898aa] mb-[12px] mt-[4px] uppercase tracking-wider">
        {mp.timeline.title}
      </div>
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
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">{svgContent}</svg>
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