"use client";

import Link from "next/link";
import { useSite } from "@/app/components/layout/SiteShell";

export default function CreateDealBanner() {
  const { lang } = useSite();
  const isEs = lang === "es";

  return (
    <div className="mb-[32px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[20px] rounded-[10px] border-[1.5px] border-accent/40 bg-accent-soft p-[24px_28px] shadow-sm">
      <div>
        <div className="mb-[4px] text-[16px] font-[800] text-ink">
          {isEs ? "¿Listo para fondear tu siguiente proyecto?" : "Ready to fund your next project?"}
        </div>
        <div className="leading-[1.6] text-[13px] text-ink-2 max-w-[500px]">
          {isEs 
            ? "Completa la pre-calificación de tu trato para obtener una insignia de 'Prestatario Pre-Calificado' y lograr que los prestamistas compitan por financiarte." 
            : "Complete your deal's pre-qualification to get a 'Pre-Qualified Borrower' badge and have lenders compete to fund you."}
        </div>
      </div>
      <Link 
        href="/borrowerDashboard/pre-qualification" 
        className="shrink-0 whitespace-nowrap rounded-[6px] bg-accent px-[24px] py-[12px] text-[13px] font-[800] text-white no-underline transition-colors hover:bg-blue-700"
      >
        {isEs ? "Pre-calificar nuevo trato" : "Pre-qualify new deal"}
      </Link>
    </div>
  );
}