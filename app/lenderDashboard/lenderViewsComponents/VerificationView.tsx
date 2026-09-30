"use client";
import { useState } from "react";
import { useSite } from "@/app/components/layout/SiteShell";

export default function VerificationView() {
  const { lang } = useSite();
  const isEs = lang === "es";

  const [selectedTier, setSelectedTier] = useState<"business" | "full">("business");

  return (
    <div className="animate-in fade-in duration-300 max-w-[700px]">
      <div className="mb-[4px] text-[22px] font-[800] tracking-[-0.3px] text-[#0a2540]">
        {isEs ? "Verificacion de Prestamista" : "Lender Verification"}
      </div>
      <div className="mb-[24px] text-[13px] text-[#8898aa]">
        {isEs 
          ? "Verifica tu identidad y entidad para desbloquear acceso completo como prestamista en PayMyLoan.ai" 
          : "Verify your identity and entity to unlock full lender access on PayMyLoan.ai"}
      </div>

      {/* Steps (Progreso) */}
      <div className="mb-[28px] flex">
        <div className="relative flex flex-1 flex-col items-center">
          <div className="absolute left-[50%] right-[-50%] top-[16px] h-[2px] bg-[#635bff]"></div>
          <div className="relative z-10 mb-[6px] flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#635bff] text-[13px] font-[700] text-white">✓</div>
          <div className="text-center text-[11px] font-[700] text-[#635bff]">{isEs ? "Cuenta creada" : "Account created"}</div>
        </div>
        <div className="relative flex flex-1 flex-col items-center">
          <div className="absolute left-[50%] right-[-50%] top-[16px] h-[2px] bg-[#635bff]"></div>
          <div className="relative z-10 mb-[6px] flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#635bff] text-[13px] font-[700] text-white">✓</div>
          <div className="text-center text-[11px] font-[700] text-[#635bff]">{isEs ? "Perfil de inversion" : "Lending profile"}</div>
        </div>
        <div className="relative flex flex-1 flex-col items-center">
          <div className="absolute left-[50%] right-[-50%] top-[16px] h-[2px] bg-[#e6ebf1]"></div>
          <div className="relative z-10 mb-[6px] flex h-[32px] w-[32px] items-center justify-center rounded-full border-2 border-[#635bff] bg-white text-[13px] font-[700] text-[#635bff]">3</div>
          <div className="text-center text-[11px] font-[700] text-[#635bff]">{isEs ? "Verificacion" : "Verification"}</div>
        </div>
        <div className="relative flex flex-1 flex-col items-center">
          <div className="relative z-10 mb-[6px] flex h-[32px] w-[32px] items-center justify-center rounded-full border-2 border-[#e6ebf1] bg-white text-[13px] font-[700] text-[#aab7c4]">4</div>
          <div className="text-center text-[11px] font-[600] text-[#8898aa]">{isEs ? "Completado" : "Complete"}</div>
        </div>
      </div>

      {/* Tier Cards */}
      <div className="mb-[24px] grid grid-cols-1 gap-[14px] md:grid-cols-2">
        <div 
          onClick={() => setSelectedTier("business")}
          className={`cursor-pointer rounded-[10px] border-2 p-[18px_20px] transition-all ${selectedTier === "business" ? "border-[#635bff] bg-[#f0efff]" : "border-[#e6ebf1] hover:border-[#635bff]"}`}
        >
          <span className="mb-[10px] inline-block rounded-[10px] bg-[#e8f5e9] px-[10px] py-[3px] text-[11px] font-[700] text-[#2e7d32]">
            {isEs ? "Negocio Verificado" : "Business Verified"}
          </span>
          <div className="mb-[6px] text-[14px] font-[700] text-[#0a2540]">
            {isEs ? "Verificacion de entidad" : "Entity verification"}
          </div>
          <div className="mb-[10px] text-[12px] leading-[1.7] text-[#425466]">
            {isEs ? "Verifica tu entidad prestamista. Requerido para hacer ofertas." : "Verify your lending entity. Required to make offers on deals."}
          </div>
          <ul className="flex flex-col gap-[6px] text-[12px] text-[#425466]">
            <li className="flex gap-[6px] before:font-[700] before:text-[#635bff] before:content-['·']">{isEs ? "Nombre de entidad + tipo" : "Entity name + type"}</li>
            <li className="flex gap-[6px] before:font-[700] before:text-[#635bff] before:content-['·']">{isEs ? "EIN / RFC (Tax ID)" : "EIN / Tax ID"}</li>
            <li className="flex gap-[6px] before:font-[700] before:text-[#635bff] before:content-['·']">{isEs ? "Estado de formacion" : "State of formation"}</li>
            <li className="flex gap-[6px] before:font-[700] before:text-[#635bff] before:content-['·']">{isEs ? "Acta constitutiva" : "Articles of organization"}</li>
          </ul>
        </div>

        <div 
          onClick={() => setSelectedTier("full")}
          className={`cursor-pointer rounded-[10px] border-2 p-[18px_20px] transition-all ${selectedTier === "full" ? "border-[#635bff] bg-[#f0efff]" : "border-[#e6ebf1] hover:border-[#635bff]"}`}
        >
          <span className="mb-[10px] inline-block rounded-[10px] bg-[#0a2540] px-[10px] py-[3px] text-[11px] font-[700] text-white">
            {isEs ? "Completamente Verificado" : "Fully Verified"}
          </span>
          <div className="mb-[6px] text-[14px] font-[700] text-[#0a2540]">
            {isEs ? "Identidad + entidad" : "Identity + entity"}
          </div>
          <div className="mb-[10px] text-[12px] leading-[1.7] text-[#425466]">
            {isEs ? "Agrega verificacion de identidad para ser Completamente Verificado — el nivel mas alto de confianza." : "Add personal identity verification to become Fully Verified — highest trust tier."}
          </div>
          <ul className="flex flex-col gap-[6px] text-[12px] text-[#425466]">
            <li className="flex gap-[6px] before:font-[700] before:text-[#635bff] before:content-['·']">{isEs ? "Todo lo de Negocio Verificado" : "Everything in Business Verified"}</li>
            <li className="flex gap-[6px] before:font-[700] before:text-[#635bff] before:content-['·']">{isEs ? "Direccion personal + Fecha nac." : "Personal address + DOB"}</li>
            <li className="flex gap-[6px] before:font-[700] before:text-[#635bff] before:content-['·']">{isEs ? "SSN (encriptado AES-256)" : "SSN (encrypted AES-256)"}</li>
            <li className="flex gap-[6px] before:font-[700] before:text-[#635bff] before:content-['·']">{isEs ? "Identificacion oficial con foto" : "Government-issued photo ID"}</li>
          </ul>
        </div>
      </div>

      {/* Formulario */}
      <div className="mb-[20px] rounded-[10px] border border-[#e6ebf1] bg-white p-[24px]">
        <div className="mb-[4px] text-[15px] font-[700] text-[#0a2540]">
          {isEs ? "Negocio Verificado — Informacion de la entidad" : "Business Verified — Entity information"}
        </div>
        <div className="mb-[20px] text-[13px] text-[#8898aa]">
          {isEs ? "Esta informacion se usa para verificar tu entidad. No se comparte con prestatarios." : "This information is used to verify your lending entity. It is not shared with borrowers."}
        </div>

        <div className="mb-[6px] grid grid-cols-1 gap-[14px] md:grid-cols-2">
          <div className="flex flex-col gap-[5px]">
            <label className="text-[11px] font-[700] uppercase tracking-[0.4px] text-[#8898aa]">
              {isEs ? "Nombre legal de la entidad" : "Legal entity name"}
            </label>
            <input type="text" placeholder={isEs ? "ej. Moore Capital LLC" : "e.g. Moore Capital LLC"} className="w-full rounded-[6px] border border-[#e6ebf1] px-[12px] py-[9px] font-sans text-[13px] text-[#0a2540] outline-none focus:border-[#635bff]" />
          </div>
          <div className="flex flex-col gap-[5px]">
            <label className="text-[11px] font-[700] uppercase tracking-[0.4px] text-[#8898aa]">
              {isEs ? "Tipo de entidad" : "Entity type"}
            </label>
            <select className="w-full cursor-pointer rounded-[6px] border border-[#e6ebf1] bg-white px-[12px] py-[9px] font-sans text-[13px] text-[#0a2540] outline-none focus:border-[#635bff]">
              <option>LLC</option>
              <option>Corporation</option>
              <option>LP</option>
              <option>Trust</option>
              <option>Individual</option>
            </select>
          </div>
          <div className="flex flex-col gap-[5px]">
            <label className="text-[11px] font-[700] uppercase tracking-[0.4px] text-[#8898aa]">
              {isEs ? "EIN / RFC (Tax ID)" : "EIN / Tax ID"}
            </label>
            <input type="text" placeholder="XX-XXXXXXX" className="w-full rounded-[6px] border border-[#e6ebf1] px-[12px] py-[9px] font-sans text-[13px] text-[#0a2540] outline-none focus:border-[#635bff]" />
          </div>
          <div className="flex flex-col gap-[5px]">
            <label className="text-[11px] font-[700] uppercase tracking-[0.4px] text-[#8898aa]">
              {isEs ? "Estado de formacion" : "State of formation"}
            </label>
            <select className="w-full cursor-pointer rounded-[6px] border border-[#e6ebf1] bg-white px-[12px] py-[9px] font-sans text-[13px] text-[#0a2540] outline-none focus:border-[#635bff]">
              <option>Tennessee</option><option>Wyoming</option><option>Delaware</option><option>Texas</option><option>Florida</option>
            </select>
          </div>
          <div className="flex flex-col gap-[5px] md:col-span-2">
            <label className="text-[11px] font-[700] uppercase tracking-[0.4px] text-[#8898aa]">
              {isEs ? "Direccion del negocio" : "Business address"}
            </label>
            <input type="text" placeholder={isEs ? "Calle, ciudad, estado, ZIP" : "Street address, city, state, ZIP"} className="w-full rounded-[6px] border border-[#e6ebf1] px-[12px] py-[9px] font-sans text-[13px] text-[#0a2540] outline-none focus:border-[#635bff]" />
          </div>
          <div className="flex flex-col gap-[5px]">
            <label className="text-[11px] font-[700] uppercase tracking-[0.4px] text-[#8898aa]">
              {isEs ? "Nombre del firmante" : "Signatory name"}
            </label>
            <input type="text" placeholder={isEs ? "¿Quien firma por la entidad?" : "Who signs on behalf of the entity?"} className="w-full rounded-[6px] border border-[#e6ebf1] px-[12px] py-[9px] font-sans text-[13px] text-[#0a2540] outline-none focus:border-[#635bff]" />
          </div>
          <div className="flex flex-col gap-[5px]">
            <label className="text-[11px] font-[700] uppercase tracking-[0.4px] text-[#8898aa]">
              {isEs ? "Puesto del firmante" : "Signatory title"}
            </label>
            <input type="text" placeholder={isEs ? "ej. Director General, CEO" : "e.g. Managing Member, CEO"} className="w-full rounded-[6px] border border-[#e6ebf1] px-[12px] py-[9px] font-sans text-[13px] text-[#0a2540] outline-none focus:border-[#635bff]" />
          </div>
        </div>

        {/* Zona de Subida */}
        <div className="mb-[14px] mt-[8px] cursor-pointer rounded-[8px] border-2 border-dashed border-[#e6ebf1] p-[18px] text-center text-[13px] text-[#8898aa] transition-colors hover:border-[#635bff] hover:bg-[#f0efff]">
          <strong className="mb-[3px] block font-[700] text-[#635bff]">
            {isEs ? "Sube el Acta Constitutiva o documentos de formacion" : "Upload Articles of Organization or Formation docs"}
          </strong>
          PDF, JPG, PNG · Max 10MB
        </div>

        {/* Nota de Seguridad */}
        <div className="mb-[16px] flex gap-[8px] rounded-[7px] border border-[#e6ebf1] bg-[#f6f9fc] p-[10px_12px] text-[11px] leading-[1.7] text-[#425466]">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mt-[2px] shrink-0"><rect x="2" y="6" width="10" height="7" rx="1" stroke="#635bff" strokeWidth="1.2"/><path d="M4 6V4a3 3 0 016 0v2" stroke="#635bff" strokeWidth="1.2"/></svg>
          {isEs 
            ? "Tu EIN y documentos estan encriptados en reposo y se usan solo para verificacion. Nunca se comparten con prestatarios." 
            : "Your EIN and entity documents are encrypted at rest and used only for verification purposes. They are never shared with borrowers."}
        </div>

        {/* Botones de Accion */}
        <div className="flex gap-[10px]">
          <button className="flex-1 cursor-pointer rounded-[6px] border-2 border-[#c7c4ff] bg-white p-[12px] font-sans text-[13px] font-[700] text-[#635bff] hover:bg-[#f6f9fc] transition-colors">
            {isEs ? "Guardar borrador" : "Save draft"}
          </button>
          <button className="flex-[2] cursor-pointer rounded-[6px] border-none bg-[#635bff] p-[12px] font-sans text-[14px] font-[700] text-white hover:bg-[#524ddb] transition-colors">
            {isEs ? "Enviar para verificacion" : "Submit for verification"}
          </button>
        </div>
      </div>
    </div>
  );
}