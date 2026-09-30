"use client";
import { useState } from "react";
import { useSite } from "@/app/components/layout/SiteShell";

export default function PreferencesView() {
  const { lang } = useSite();
  const isEs = lang === "es";

  // Estados interactivos
  const [ltv, setLtv] = useState(75);
  const [selectedStates, setSelectedStates] = useState<string[]>(["TN", "MS", "AR"]);
  const [notifs, setNotifs] = useState({ matches: true, trusted: true, closing: true });
  const [borrowers, setBorrowers] = useState([
    { id: 1, initials: "JS", name: "John Smith — Memphis Realty LLC", deals: 7, ltvLimit: "85%" },
    { id: 2, initials: "MR", name: "Maria Rodriguez — MR Properties LLC", deals: 4, ltvLimit: "80%" }
  ]);

  const availableStates = ["TN", "MS", "AR", "AL", "GA", "TX", "FL", "MO", "KY", "OH", "IN", "IL"];

  const toggleState = (st: string) => {
    if (selectedStates.includes(st)) {
      setSelectedStates(selectedStates.filter((s) => s !== st));
    } else {
      setSelectedStates([...selectedStates, st]);
    }
  };

  const removeBorrower = (id: number) => {
    setBorrowers(borrowers.filter(b => b.id !== id));
  };

  const inputClass = "w-full rounded-[6px] border border-[#e6ebf1] bg-white px-[12px] py-[9px] font-sans text-[14px] text-[#0a2540] outline-none transition-colors focus:border-[#635bff] focus:shadow-[0_0_0_3px_rgba(99,91,255,0.1)]";
  const labelClass = "mb-[5px] block text-[12px] font-[600] text-[#425466]";
  const hintClass = "mt-[4px] text-[11px] text-[#aab7c4]";

  return (
    <div className="animate-in fade-in duration-300 max-w-[720px] flex flex-col min-h-full relative pb-[80px]">
      
      {/* Encabezado */}
      <div className="mb-[4px] text-[22px] font-[800] tracking-[-0.3px] text-[#0a2540]">
        {isEs ? "Preferencias de prestamo" : "Lending preferences"}
      </div>
      <div className="mb-[28px] text-[13px] text-[#8898aa]">
        {isEs 
          ? "Configura tus criterios predeterminados. Prestatarios de confianza pueden obtener terminos personalizados." 
          : "Set your default deal criteria. Trusted borrowers can get custom terms beyond your defaults."}
      </div>

      {/* Criterios Predeterminados */}
      <div className="mb-[16px] overflow-hidden rounded-[10px] border border-[#e6ebf1] bg-white">
        <div className="border-b border-[#e6ebf1] p-[18px_24px]">
          <div className="text-[14px] font-[700] text-[#0a2540]">
            {isEs ? "Criterios predeterminados de tratos" : "Default deal criteria"}
          </div>
          <div className="mt-[2px] text-[12px] text-[#8898aa]">
            {isEs ? "Aplicado a todos los prestatarios nuevos con los que no has trabajado." : "Applied to all new borrowers you haven't worked with before."}
          </div>
        </div>
        
        <div className="p-[20px_24px]">
          <div className="mb-[16px]">
            <label className={labelClass}>Max LTV (loan-to-value)</label>
            <div className="flex items-center gap-[12px]">
              <input 
                type="range" 
                min="50" max="90" step="5" 
                value={ltv} 
                onChange={(e) => setLtv(Number(e.target.value))}
                className="h-[4px] w-full cursor-pointer appearance-none rounded-[2px] bg-[#e6ebf1] accent-[#635bff]"
              />
              <span className="min-w-[40px] text-right text-[14px] font-[700] text-[#635bff]">{ltv}%</span>
            </div>
            <div className={hintClass}>
              {isEs ? "Prestatarios por encima de este umbral veran una advertencia y deberan cubrir la diferencia al cierre." : "Borrowers over this threshold will see a warning and cannot submit without bringing the difference to closing."}
            </div>
          </div>

          <div className="mb-[16px] grid grid-cols-2 gap-[16px]">
            <div>
              <label className={labelClass}>{isEs ? "Monto minimo de prestamo" : "Minimum loan amount"}</label>
              <input type="text" placeholder="$50,000" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>{isEs ? "Monto maximo de prestamo" : "Maximum loan amount"}</label>
              <input type="text" placeholder="$500,000" className={inputClass} />
            </div>
          </div>

          <div className="mb-[16px] grid grid-cols-2 gap-[16px]">
            <div>
              <label className={labelClass}>{isEs ? "Rango de tasa preferida" : "Preferred interest rate range"}</label>
              <select className={`${inputClass} cursor-pointer`}>
                <option>10% – 12%</option>
                <option>12% – 14%</option>
                <option>14% – 16%</option>
                <option>{isEs ? "Flexible — yo decido por trato" : "Flexible — I'll set per deal"}</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>{isEs ? "Plazos preferidos" : "Preferred loan terms"}</label>
              <select className={`${inputClass} cursor-pointer`}>
                <option>{isEs ? "Solo 6 meses" : "6 months only"}</option>
                <option>{isEs ? "6 – 12 meses" : "6 – 12 months"}</option>
                <option>{isEs ? "Hasta 18 meses" : "Up to 18 months"}</option>
                <option>{isEs ? "Cualquier plazo" : "Any term"}</option>
              </select>
            </div>
          </div>

          <div className="mb-[16px]">
            <label className={labelClass}>{isEs ? "Experiencia minima del prestatario" : "Minimum borrower experience"}</label>
            <select className={`${inputClass} cursor-pointer`}>
              <option>{isEs ? "Sin minimo — primeros tratos bienvenidos" : "No minimum — first deals welcome"}</option>
              <option>{isEs ? "1+ tratos cerrados" : "1+ deals closed"}</option>
              <option>{isEs ? "3+ tratos cerrados" : "3+ deals closed"}</option>
              <option>{isEs ? "10+ tratos cerrados" : "10+ deals closed"}</option>
            </select>
            <div className={hintClass}>
              {isEs ? "Tratos de prestatarios por debajo de este umbral no apareceran en tu feed." : "Deals from borrowers below this threshold won't appear in your feed."}
            </div>
          </div>

          <div>
            <label className={labelClass}>{isEs ? "Estados en los que presto" : "States I lend in"}</label>
            <div className="mt-[6px] grid grid-cols-6 gap-[6px] sm:grid-cols-8 md:grid-cols-12">
              {availableStates.map(st => (
                <div 
                  key={st}
                  onClick={() => toggleState(st)}
                  className={`cursor-pointer rounded-[5px] border-[1.5px] p-[5px] text-center text-[11px] font-[600] transition-all hover:border-[#635bff] hover:text-[#635bff] ${selectedStates.includes(st) ? "border-[#635bff] bg-[#f0efff] text-[#635bff]" : "border-[#e6ebf1] text-[#425466]"}`}
                >
                  {st}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Notificaciones */}
      <div className="mb-[16px] overflow-hidden rounded-[10px] border border-[#e6ebf1] bg-white">
        <div className="border-b border-[#e6ebf1] p-[18px_24px]">
          <div className="text-[14px] font-[700] text-[#0a2540]">
            {isEs ? "Notificaciones de tratos" : "Deal notifications"}
          </div>
          <div className="mt-[2px] text-[12px] text-[#8898aa]">
            {isEs ? "Cuando alertarte sobre nuevos tratos en la plataforma." : "When to alert you about new deals on the platform."}
          </div>
        </div>
        <div className="p-[8px_24px_20px]">
          
          <div className="flex items-center justify-between border-b border-[#f0f4f8] py-[12px]">
            <div>
              <div className="text-[13px] font-[600] text-[#0a2540]">{isEs ? "Nuevo trato coincide con criterios" : "New deal matches my criteria"}</div>
              <div className="mt-[2px] text-[11px] text-[#8898aa]">{isEs ? "Recibe una alerta cuando un trato encaja en tus preferencias." : "Get notified when a deal hits the platform that fits your preferences."}</div>
            </div>
            <div onClick={() => setNotifs({...notifs, matches: !notifs.matches})} className={`relative h-[20px] w-[36px] shrink-0 cursor-pointer rounded-[10px] transition-colors ${notifs.matches ? 'bg-[#635bff]' : 'bg-[#e6ebf1]'}`}>
              <div className={`absolute top-[3px] h-[14px] w-[14px] rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.15)] transition-all ${notifs.matches ? 'left-[19px]' : 'left-[3px]'}`} />
            </div>
          </div>

          <div className="flex items-center justify-between border-b border-[#f0f4f8] py-[12px]">
            <div>
              <div className="text-[13px] font-[600] text-[#0a2540]">{isEs ? "Prestatario de confianza publica" : "Trusted borrower posts a deal"}</div>
              <div className="mt-[2px] text-[11px] text-[#8898aa]">{isEs ? "Notificarme siempre que alguien en mi lista publique." : "Always notify me when someone on my trusted list posts."}</div>
            </div>
            <div onClick={() => setNotifs({...notifs, trusted: !notifs.trusted})} className={`relative h-[20px] w-[36px] shrink-0 cursor-pointer rounded-[10px] transition-colors ${notifs.trusted ? 'bg-[#635bff]' : 'bg-[#e6ebf1]'}`}>
              <div className={`absolute top-[3px] h-[14px] w-[14px] rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.15)] transition-all ${notifs.trusted ? 'left-[19px]' : 'left-[3px]'}`} />
            </div>
          </div>

          <div className="flex items-center justify-between py-[12px]">
            <div>
              <div className="text-[13px] font-[600] text-[#0a2540]">{isEs ? "Trato con oferta esta cerrando" : "Deal I offered on is closing"}</div>
              <div className="mt-[2px] text-[11px] text-[#8898aa]">{isEs ? "Recordatorio cuando un trato en el que oferte se acerca al cierre." : "Get reminded when a deal I made an offer on is approaching close."}</div>
            </div>
            <div onClick={() => setNotifs({...notifs, closing: !notifs.closing})} className={`relative h-[20px] w-[36px] shrink-0 cursor-pointer rounded-[10px] transition-colors ${notifs.closing ? 'bg-[#635bff]' : 'bg-[#e6ebf1]'}`}>
              <div className={`absolute top-[3px] h-[14px] w-[14px] rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.15)] transition-all ${notifs.closing ? 'left-[19px]' : 'left-[3px]'}`} />
            </div>
          </div>

        </div>
      </div>

      {/* Prestatarios de Confianza */}
      <div className="mb-[16px] overflow-hidden rounded-[10px] border border-[#e6ebf1] bg-white">
        <div className="border-b border-[#e6ebf1] p-[18px_24px]">
          <div className="text-[14px] font-[700] text-[#0a2540]">
            {isEs ? "Prestatarios de confianza" : "Trusted borrowers"}
          </div>
          <div className="mt-[2px] text-[12px] text-[#8898aa]">
            {isEs ? "Estos prestatarios obtienen flexibilidad basada en tu relacion. Sobrescribe tus valores predeterminados." : "These borrowers get custom LTV and term flexibility based on your relationship. Overrides your default criteria."}
          </div>
        </div>
        <div className="p-[20px_24px]">
          <div className="mt-[4px]">
            {borrowers.map((b) => (
              <div key={b.id} className="flex items-center gap-[10px] border-b border-[#f0f4f8] py-[10px] last:border-0">
                <div className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full bg-[#635bff] text-[11px] font-[700] text-white">
                  {b.initials}
                </div>
                <div className="flex-1">
                  <div className="text-[13px] font-[600] text-[#0a2540]">{b.name}</div>
                  <div className="text-[11px] text-[#8898aa]">{b.deals} {isEs ? "tratos cerrados juntos" : "deals closed together"}</div>
                </div>
                <div className="rounded-[10px] bg-[#f0efff] px-[10px] py-[2px] text-[12px] font-[700] text-[#635bff]">
                  {isEs ? "Hasta" : "Up to"} {b.ltvLimit} LTV
                </div>
                <button 
                  onClick={() => removeBorrower(b.id)}
                  className="cursor-pointer border-none bg-transparent px-[6px] py-[2px] text-[16px] text-[#aab7c4] hover:text-[#dc2626]"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <button 
            onClick={() => alert(isEs ? "Buscar y agregar prestatario verificado" : "Search and add a verified borrower")}
            className="mt-[12px] flex w-full cursor-pointer items-center justify-center gap-[6px] rounded-[6px] border-[1.5px] border-dashed border-[#c7c4ff] bg-white p-[8px_14px] font-sans text-[13px] font-[600] text-[#635bff] transition-colors hover:bg-[#f0efff]"
          >
            + {isEs ? "Agregar prestatario de confianza" : "Add trusted borrower"}
          </button>
        </div>
      </div>

      {/* Barra de Guardado (Sticky Bottom) */}
      <div className="fixed bottom-0 left-[200px] right-0 z-20 flex justify-end gap-[10px] border-t border-[#e6ebf1] bg-white p-[16px_32px]">
        <button className="cursor-pointer rounded-[6px] border border-[#e6ebf1] bg-white p-[9px_18px] font-sans text-[13px] font-[600] text-[#425466] hover:bg-[#f6f9fc]">
          {isEs ? "Cancelar" : "Cancel"}
        </button>
        <button 
          onClick={() => alert(isEs ? "Preferencias guardadas" : "Preferences saved!")}
          className="cursor-pointer rounded-[6px] border-none bg-[#635bff] p-[9px_24px] font-sans text-[13px] font-[700] text-white hover:bg-[#524ddb]"
        >
          {isEs ? "Guardar preferencias" : "Save preferences"}
        </button>
      </div>

    </div>
  );
}