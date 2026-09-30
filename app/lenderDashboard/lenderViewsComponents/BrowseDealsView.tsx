"use client";
import { useState } from "react";
import { useSite } from "@/app/components/layout/SiteShell";

export default function BrowseDealsView() {
  const { t, lang } = useSite();
  const isEs = lang === "es";
  
  // Usamos el diccionario de marketplace para los filtros base
  const m = t.marketplace; 

  const [activeFilter, setActiveFilter] = useState("all");
  const [activeView, setActiveView] = useState("grid");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filters = [
    { id: "all", label: m.filters.all || (isEs ? "Todos" : "All") },
    { id: "bridge", label: m.filters.bridge || "Bridge" },
    { id: "slowflip", label: m.filters.slowFlip || "Slow flip" },
    { id: "new", label: m.filters.new || (isEs ? "Nuevos" : "New this week") }
  ];

  const mockDeals = [
    {
      id: 1,
      type: "bridge",
      isNew: true,
      address: "3802 University Cove",
      city: "Memphis, TN 38127 · Single family",
      loanLabel: isEs ? "Monto solicitado" : "Loan request",
      loanAmount: "$95,000",
      arvLabel: "ARV",
      arvAmount: "$155,000",
      rateLabel: isEs ? "Tasa max" : "Max rate",
      rateVal: "12%",
      rateSub: isEs ? "IO · 12 meses" : "IO · 12 months",
      rehabLabel: isEs ? "Remodelacion" : "Rehab",
      rehabVal: "$22,000",
      ltv: 61,
      offers: 2,
      timeAgo: isEs ? "Hace 2h" : "2h ago"
    },
    {
      id: 2,
      type: "bridge",
      isNew: false,
      address: "5331 Scrivener Dr",
      city: "Memphis, TN 38134 · Single family",
      loanLabel: isEs ? "Monto solicitado" : "Loan request",
      loanAmount: "$78,000",
      arvLabel: "ARV",
      arvAmount: "$125,000",
      rateLabel: isEs ? "Tasa max" : "Max rate",
      rateVal: "12%",
      rateSub: isEs ? "IO · 9 meses" : "IO · 9 months",
      rehabLabel: isEs ? "Remodelacion" : "Rehab",
      rehabVal: "$18,500",
      ltv: 62,
      offers: 0,
      timeAgo: isEs ? "Hace 5h" : "5h ago"
    },
    {
      id: 3,
      type: "slowflip",
      isNew: true,
      address: "2175 Burlingate Dr",
      city: "Memphis, TN 38016 · Single family",
      loanLabel: isEs ? "Monto del prestamo" : "Loan amount",
      loanAmount: "$182,000",
      arvLabel: isEs ? "Precio de compra" : "Purchase price",
      arvAmount: "$182,000",
      rateLabel: isEs ? "Tasa" : "Rate",
      rateVal: "10%",
      rateSub: isEs ? "Amort. 30 años" : "30yr amortized",
      rehabLabel: "P&I Mensual",
      rehabVal: "$1,596",
      ltv: 70,
      offers: 1,
      timeAgo: isEs ? "Hace 1d" : "1d ago"
    },
    {
      id: 4,
      type: "bridge",
      isNew: false,
      address: "4015 Charles Dr",
      city: "Memphis, TN 38128 · Single family",
      loanLabel: isEs ? "Monto solicitado" : "Loan request",
      loanAmount: "$110,000",
      arvLabel: "ARV",
      arvAmount: "$172,000",
      rateLabel: isEs ? "Tasa max" : "Max rate",
      rateVal: "12%",
      rateSub: isEs ? "IO · 12 meses" : "IO · 12 months",
      rehabLabel: isEs ? "Remodelacion" : "Rehab",
      rehabVal: "$31,000",
      ltv: 64,
      offers: 3,
      timeAgo: isEs ? "Hace 2d" : "2d ago"
    },
    {
      id: 5,
      type: "slowflip",
      isNew: false,
      address: "3554 Venable Rd",
      city: "Memphis, TN 38122 · Single family",
      loanLabel: isEs ? "Monto del prestamo" : "Loan amount",
      loanAmount: "$98,000",
      arvLabel: isEs ? "Precio de compra" : "Purchase price",
      arvAmount: "$98,000",
      rateLabel: isEs ? "Tasa" : "Rate",
      rateVal: "10%",
      rateSub: isEs ? "Amort. 20 años" : "20yr amortized",
      rehabLabel: "P&I Mensual",
      rehabVal: "$946",
      ltv: 75,
      offers: 0,
      timeAgo: isEs ? "Hace 3d" : "3d ago"
    }
  ];

  const filteredDeals = mockDeals.filter(deal => {
    if (activeFilter === "all") return true;
    if (activeFilter === "new") return deal.isNew;
    return deal.type === activeFilter;
  });

  return (
    <div className="animate-in fade-in duration-300">
      
      {/* Encabezado de Pagina */}
      <div className="mb-[20px] flex items-center justify-between">
        <div className="text-[22px] font-[700] tracking-[-0.3px] text-[#0a2540]">
          {m.title || (isEs ? "Explorar tratos" : "Browse deals")}
        </div>
        <div className="flex gap-[8px]">
          <button className="flex items-center gap-[6px] rounded-[6px] border border-[#e6ebf1] bg-white px-[14px] py-[8px] font-sans text-[13px] font-[500] text-[#425466] cursor-pointer hover:border-[#aab7c4] hover:text-[#0a2540] transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            {m.mapView || (isEs ? "Vista de mapa" : "Map view")}
          </button>
        </div>
      </div>

      {/* Tira de Estadisticas */}
      <div className="mb-[24px] grid grid-cols-2 md:grid-cols-4 gap-[1px] overflow-hidden rounded-[10px] border border-[#e6ebf1] bg-[#e6ebf1]">
        <div className="bg-white p-[16px_20px]">
          <div className="mb-[6px] text-[11px] font-[600] uppercase tracking-[0.5px] text-[#8898aa]">
            {isEs ? "Tratos activos" : "Active deals"}
          </div>
          <div className="text-[22px] font-[700] tracking-[-0.5px] text-[#0a2540]">24</div>
          <div className="mt-[3px] text-[11px] text-[#8898aa]">
            <span className="font-[600] text-[#2e7d32]">+3</span> {isEs ? "esta semana" : "this week"}
          </div>
        </div>
        <div className="bg-white p-[16px_20px]">
          <div className="mb-[6px] text-[11px] font-[600] uppercase tracking-[0.5px] text-[#8898aa]">
            {isEs ? "Monto prom." : "Avg loan amount"}
          </div>
          <div className="text-[22px] font-[700] tracking-[-0.5px] text-[#0a2540]">$118K</div>
          <div className="mt-[3px] text-[11px] text-[#8898aa]">
            {isEs ? "Mediana" : "Median"} $105K
          </div>
        </div>
        <div className="bg-white p-[16px_20px]">
          <div className="mb-[6px] text-[11px] font-[600] uppercase tracking-[0.5px] text-[#8898aa]">
            {isEs ? "LTV prom." : "Avg LTV"}
          </div>
          <div className="text-[22px] font-[700] tracking-[-0.5px] text-[#0a2540]">67%</div>
          <div className="mt-[3px] text-[11px] text-[#8898aa]">
            {isEs ? "Rango" : "Range"} 52–80%
          </div>
        </div>
        <div className="bg-white p-[16px_20px]">
          <div className="mb-[6px] text-[11px] font-[600] uppercase tracking-[0.5px] text-[#8898aa]">
            {isEs ? "Tasa prom." : "Avg interest rate"}
          </div>
          <div className="text-[22px] font-[700] tracking-[-0.5px] text-[#0a2540]">11.4%</div>
          <div className="mt-[3px] text-[11px] text-[#8898aa]">
            12% {isEs ? "mas comun" : "most common"}
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="mb-[20px] flex flex-wrap items-center gap-[8px]">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={`cursor-pointer rounded-[20px] border px-[12px] py-[6px] font-sans text-[12px] font-[500] transition-colors ${
              activeFilter === f.id
                ? "border-[#635bff] bg-[#f0efff] text-[#635bff]"
                : "border-[#e6ebf1] bg-white text-[#425466] hover:border-[#aab7c4] hover:text-[#0a2540]"
            }`}
          >
            {f.label}
          </button>
        ))}
        
        <div className="mx-[4px] h-[20px] w-[1px] bg-[#e6ebf1]"></div>
        
        <select className="cursor-pointer rounded-[6px] border border-[#e6ebf1] bg-white px-[10px] py-[6px] font-sans text-[12px] text-[#425466] outline-none focus:border-[#635bff]">
          <option>{isEs ? "Cualquier estado" : "Any state"}</option><option>TN</option><option>MS</option><option>AR</option>
        </select>
        <select className="cursor-pointer rounded-[6px] border border-[#e6ebf1] bg-white px-[10px] py-[6px] font-sans text-[12px] text-[#425466] outline-none focus:border-[#635bff]">
          <option>{isEs ? "Cualquier ZIP" : "Any ZIP"}</option><option>38127</option><option>38128</option><option>38016</option>
        </select>
        <select className="cursor-pointer rounded-[6px] border border-[#e6ebf1] bg-white px-[10px] py-[6px] font-sans text-[12px] text-[#425466] outline-none focus:border-[#635bff]">
          <option>{isEs ? "Cualquier tasa" : "Any rate"}</option><option>≤10%</option><option>≤12%</option><option>≤14%</option>
        </select>
        <select className="cursor-pointer rounded-[6px] border border-[#e6ebf1] bg-white px-[10px] py-[6px] font-sans text-[12px] text-[#425466] outline-none focus:border-[#635bff]">
          <option>{isEs ? "Cualquier LTV" : "Any LTV"}</option><option>≤60%</option><option>≤70%</option><option>≤80%</option>
        </select>

        <div className="ml-auto flex gap-[6px]">
          <div className="flex overflow-hidden rounded-[6px] border border-[#e6ebf1]">
            <div 
              onClick={() => setActiveView("grid")}
              className={`flex h-[30px] w-[30px] cursor-pointer items-center justify-center text-[13px] ${activeView === "grid" ? "bg-[#f6f9fc] text-[#0a2540]" : "text-[#8898aa]"}`}
            >⊞</div>
            <div 
              onClick={() => setActiveView("list")}
              className={`flex h-[30px] w-[30px] cursor-pointer items-center justify-center text-[13px] ${activeView === "list" ? "bg-[#f6f9fc] text-[#0a2540]" : "text-[#8898aa]"}`}
            >☰</div>
          </div>
        </div>
      </div>

      {/* Grid de Tratos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px]">
        {filteredDeals.map((deal) => {
          const isSlowFlip = deal.type === "slowflip";
          const colorMain = isSlowFlip ? "#2e7d32" : "#635bff";
          const bgMain = isSlowFlip ? "#e8f5e9" : "#f0efff";

          return (
            <div key={deal.id} className="overflow-hidden rounded-[10px] border border-[#e6ebf1] bg-white transition-all hover:border-[#aab7c4] hover:shadow-[0_4px_12px_rgba(10,37,64,0.06)]">
              
              {/* Tarjeta Arriba */}
              <div className="border-b border-[#e6ebf1] p-[18px_18px_14px]">
                <div className="mb-[8px] flex items-center gap-[8px]">
                  <span className={`inline-flex items-center rounded-[10px] px-[10px] py-[3px] text-[11px] font-[600]`} style={{ color: colorMain, backgroundColor: bgMain }}>
                    {isSlowFlip ? "Slow flip" : "⚡ Bridge"}
                  </span>
                  {deal.isNew && (
                    <span className="inline-flex items-center rounded-[10px] bg-[#fff8e1] px-[10px] py-[3px] text-[11px] font-[600] text-[#b45309]">
                      {isEs ? "Nuevo" : "New"}
                    </span>
                  )}
                </div>
                <div className="mb-[2px] text-[14px] font-[700] text-[#0a2540]">{deal.address}</div>
                <div className="text-[12px] text-[#8898aa]">{deal.city}</div>
              </div>

              {/* Tarjeta Medio */}
              <div className="grid grid-cols-2 gap-[10px] p-[14px_18px]">
                <div className="flex flex-col gap-[2px]">
                  <div className="text-[10px] font-[600] uppercase tracking-[0.4px] text-[#8898aa]">{deal.loanLabel}</div>
                  <div className="text-[14px] font-[700] text-[#0a2540]">{deal.loanAmount}</div>
                </div>
                <div className="flex flex-col gap-[2px]">
                  <div className="text-[10px] font-[600] uppercase tracking-[0.4px] text-[#8898aa]">{deal.arvLabel}</div>
                  <div className="text-[14px] font-[700] text-[#0a2540]">{deal.arvAmount}</div>
                </div>
                <div className="flex flex-col gap-[2px]">
                  <div className="text-[10px] font-[600] uppercase tracking-[0.4px] text-[#8898aa]">{deal.rateLabel}</div>
                  <div className="text-[14px] font-[700] text-[#0a2540]">{deal.rateVal}</div>
                  <div className="text-[11px] text-[#8898aa]">{deal.rateSub}</div>
                </div>
                <div className="flex flex-col gap-[2px]">
                  <div className="text-[10px] font-[600] uppercase tracking-[0.4px] text-[#8898aa]">{deal.rehabLabel}</div>
                  <div className="text-[14px] font-[700] text-[#0a2540]">{deal.rehabVal}</div>
                </div>
              </div>

              {/* Barra LTV & Ofertas */}
              <div className="flex items-center justify-between bg-[#f6f9fc] p-[12px_18px]">
                <div className="mr-[16px] flex flex-1 flex-col gap-[4px]">
                  <div className="text-[10px] font-[600] uppercase tracking-[0.4px] text-[#8898aa]">LTV</div>
                  <div className="h-[4px] overflow-hidden rounded-[2px] bg-[#e6ebf1]">
                    <div className="h-full rounded-[2px]" style={{ width: `${deal.ltv}%`, backgroundColor: colorMain }}></div>
                  </div>
                  <div className="mt-[2px] text-[11px] font-[700]" style={{ color: colorMain }}>{deal.ltv}%</div>
                </div>
                <div className="flex flex-col items-end gap-[6px]">
                  <div className="text-right text-[11px] text-[#8898aa]">
                    <strong className="block text-[13px] text-[#0a2540]">{deal.offers}</strong> {deal.offers === 1 ? (isEs ? "oferta" : "offer") : (isEs ? "ofertas" : "offers")}
                  </div>
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="cursor-pointer whitespace-nowrap rounded-[6px] border-none px-[14px] py-[7px] font-sans text-[12px] font-[600] text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: colorMain }}
                  >
                    {isEs ? "Hacer oferta" : "Make offer"}
                  </button>
                </div>
              </div>

              {/* Pie de Tarjeta */}
              <div className="flex items-center justify-between border-t border-[#e6ebf1] p-[10px_18px]">
                <div className="flex items-center gap-[7px]">
                  <div className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border border-[#e6ebf1] bg-[#f6f9fc] text-[10px] text-[#aab7c4]">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/></svg>
                  </div>
                  <span className="text-[11px] italic text-[#aab7c4]">{isEs ? "Identidad oculta" : "Borrower identity hidden"}</span>
                  <span 
                    onClick={() => setIsModalOpen(true)}
                    className="ml-[6px] cursor-pointer whitespace-nowrap text-[10px] font-[700] text-[#635bff] underline"
                  >
                    {isEs ? "Ofertar para ver" : "Make offer to unlock"}
                  </span>
                </div>
                <span className="text-[11px] text-[#aab7c4]">{deal.timeAgo}</span>
              </div>
            </div>
          );
        })}

        {/* Placeholder de "Publica tu trato" */}
        <div className="flex flex-col items-center justify-center rounded-[10px] border-2 border-dashed border-[#e6ebf1] p-[40px] text-center text-[#aab7c4]">
          <div className="mb-[6px] text-[14px] font-[600] text-[#425466]">
            {isEs ? "Publica tu proximo trato" : "Post your next deal"}
          </div>
          <div className="text-[12px]">
            {isEs ? "Los prestamistas en PML fondean tratos en 24-72 hrs." : "Lenders on PML fund deals in 24–72 hours."}
          </div>
        </div>
      </div>

      {/* Modal de Oferta */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#0a2540]/50 p-4">
          <div className="relative w-full max-w-[440px] rounded-[12px] bg-white p-[32px] shadow-[0_20px_60px_rgba(10,37,64,0.15)] animate-in zoom-in-95 duration-200">
            <div className="mb-[8px] text-[18px] font-[800] text-[#0a2540]">
              {isEs ? "Haz una oferta para conectar" : "Make an offer to connect"}
            </div>
            <div className="mb-[20px] text-[13px] leading-[1.6] text-[#8898aa]">
              {isEs 
                ? "Enviar una oferta desbloquea la identidad del prestatario, su historial, y abre un canal de mensajes para este trato." 
                : "Submitting an offer unlocks the borrower's identity, track record, and opens the messaging channel for this deal."}
              <br /><br />
              {isEs 
                ? "El prestatario no vera tu identidad ni contacto hasta que acepte tu oferta." 
                : "The borrower will not see your identity or contact info until they accept your offer."}
            </div>
            <div className="mb-[20px] rounded-[8px] border border-[#c7c4ff] bg-[#f0efff] p-[12px_16px] text-[12px] font-[600] text-[#635bff]">
              {isEs 
                ? "Ambas partes se mantienen anonimas hasta que el trato es aceptado — no hay contacto fuera de la plataforma." 
                : "Both sides stay anonymous until a deal is accepted — no off-platform contact possible."}
            </div>
            <div className="flex gap-[10px]">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="flex-1 cursor-pointer rounded-[6px] border border-[#e6ebf1] bg-white p-[11px] font-sans text-[13px] font-[600] text-[#425466] hover:bg-[#f6f9fc] transition-colors"
              >
                {isEs ? "Cancelar" : "Cancel"}
              </button>
              <button 
                onClick={() => {
                  alert(isEs ? "Abriendo formulario de oferta..." : "Offer form opening...");
                  setIsModalOpen(false);
                }}
                className="flex-[2] cursor-pointer rounded-[6px] border-none bg-[#635bff] p-[11px] font-sans text-[13px] font-[700] text-white hover:bg-[#524ddb] transition-colors"
              >
                {isEs ? "Continuar al formulario" : "Continue to offer form"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}