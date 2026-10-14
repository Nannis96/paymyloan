"use client";

import { useState, useEffect } from "react";
import { useSite } from "@/app/components/layout/SiteShell";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function VerificationView() {
  const { lang } = useSite();
  const isEs = lang === "es";

  const [selectedTier, setSelectedTier] = useState<"business" | "full">("business");
  
  // Estados del formulario
  const [entityName, setEntityName] = useState("");
  const [entityType, setEntityType] = useState("LLC");
  const [ein, setEin] = useState("");
  const [stateOfFormation, setStateOfFormation] = useState("Tennessee");
  const [address, setAddress] = useState("");
  const [signatoryName, setSignatoryName] = useState("");
  const [signatoryTitle, setSignatoryTitle] = useState("");

  const [companyId, setCompanyId] = useState<string | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<string | null>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 1. Cargar estado actual
  useEffect(() => {
    async function fetchStatus() {
      try {
        const token = localStorage.getItem("accessToken") || "";
        const headers = { Authorization: `Bearer ${token}` };
        
        // Obtener el perfil del prestamista
        const meRes = await fetch(`${BASE_URL}/api/lenders/me`, { headers });
        const meJson = await meRes.json();
        
        if (meJson.success && meJson.data?.lenderCompanies?.length > 0) {
          const comp = meJson.data.lenderCompanies[0];
          setCompanyId(comp.id);
          
          // Pre-llenar datos de la empresa si ya existen
          setEntityName(comp.companyName || "");
          setEin(comp.ein || "");
          setAddress(comp.addressLine1 || "");
          
          // Obtener el estado de verificación
          const verifRes = await fetch(`${BASE_URL}/api/lenders/me/companies/${comp.id}/verification`, { headers });
          const verifJson = await verifRes.json();
          if (verifJson.success && verifJson.data) {
            setVerificationStatus(verifJson.data.status); // PENDING, APPROVED, REJECTED
            setEntityType(verifJson.data.entityType || "LLC");
            setStateOfFormation(verifJson.data.stateOfFormation || "Tennessee");
            setSignatoryName(verifJson.data.signatoryName || "");
            setSignatoryTitle(verifJson.data.signatoryTitle || "");
          }
        }
      } catch (err) {
        console.error("Error fetching verification status", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchStatus();
  }, []);

  // 2. Enviar verificación
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      const token = localStorage.getItem("accessToken") || "";
      const headers = { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      };

      let currentCompanyId = companyId;

      // Si no tiene empresa registrada en la plataforma, la creamos primero
      if (!currentCompanyId) {
        const createRes = await fetch(`${BASE_URL}/api/lenders/me/companies`, {
          method: "POST",
          headers,
          body: JSON.stringify({
            companyName: entityName,
            ein,
            addressLine1: address || "No address provided",
            city: "N/A", 
            state: "XX", 
            postalCode: "00000"
          })
        });
        const createJson = await createRes.json();
        if (!createJson.success) throw new Error(createJson.error?.message || "Error al crear la entidad");
        currentCompanyId = createJson.data.id;
        setCompanyId(currentCompanyId);
      }

      // Enviar la solicitud formal de verificación al Admin
      const verifRes = await fetch(`${BASE_URL}/api/lenders/me/companies/${currentCompanyId}/verification`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          entityName,
          entityType: entityType.toUpperCase(),
          ein,
          stateOfFormation,
          signatoryName,
          signatoryTitle
        })
      });
      const verifJson = await verifRes.json();
      
      if (verifJson.success) {
        setVerificationStatus(verifJson.data.status);
        alert(isEs ? "Solicitud de verificación enviada exitosamente" : "Verification request submitted successfully");
      } else {
        throw new Error(verifJson.error?.message || "Error al enviar la verificación");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error de red desconocido");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="p-10 text-center text-[#8898aa]">Cargando estado de verificación...</div>;
  }

  const isReadOnly = verificationStatus === "PENDING" || verificationStatus === "APPROVED";

  return (
    <div className="animate-in fade-in duration-300 max-w-[700px]">
      <div className="mb-[4px] text-[22px] font-[800] tracking-[-0.3px] text-[#0a2540]">
        {isEs ? "Verificación de Prestamista" : "Lender Verification"}
      </div>
      <div className="mb-[24px] text-[13px] text-[#8898aa]">
        {isEs 
          ? "Verifica tu identidad y entidad para desbloquear acceso completo como prestamista en PayMyLoan.ai" 
          : "Verify your identity and entity to unlock full lender access on PayMyLoan.ai"}
      </div>

      {error && (
        <div className="mb-[20px] rounded-[8px] border border-red-900/50 bg-red-900/10 px-[16px] py-[12px] text-[13px] text-red-500">
          {error}
        </div>
      )}

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
          <div className="text-center text-[11px] font-[700] text-[#635bff]">{isEs ? "Perfil de inversión" : "Lending profile"}</div>
        </div>
        <div className="relative flex flex-1 flex-col items-center">
          <div className={`absolute left-[50%] right-[-50%] top-[16px] h-[2px] ${verificationStatus === 'APPROVED' ? 'bg-[#635bff]' : 'bg-[#e6ebf1]'}`}></div>
          <div className={`relative z-10 mb-[6px] flex h-[32px] w-[32px] items-center justify-center rounded-full border-2 ${verificationStatus ? 'border-[#635bff] bg-[#635bff] text-white' : 'border-[#635bff] bg-white text-[#635bff]'} text-[13px] font-[700]`}>
            {verificationStatus ? '✓' : '3'}
          </div>
          <div className={`text-center text-[11px] font-[700] ${verificationStatus ? 'text-[#635bff]' : 'text-[#635bff]'}`}>{isEs ? "Verificación" : "Verification"}</div>
        </div>
        <div className="relative flex flex-1 flex-col items-center">
          <div className={`relative z-10 mb-[6px] flex h-[32px] w-[32px] items-center justify-center rounded-full border-2 ${verificationStatus === 'APPROVED' ? 'border-[#635bff] bg-[#635bff] text-white' : 'border-[#e6ebf1] bg-white text-[#aab7c4]'} text-[13px] font-[700]`}>
            {verificationStatus === 'APPROVED' ? '✓' : '4'}
          </div>
          <div className={`text-center text-[11px] font-[600] ${verificationStatus === 'APPROVED' ? 'text-[#635bff]' : 'text-[#8898aa]'}`}>{isEs ? "Completado" : "Complete"}</div>
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
            {isEs ? "Verificación de entidad" : "Entity verification"}
          </div>
          <div className="mb-[10px] text-[12px] leading-[1.7] text-[#425466]">
            {isEs ? "Verifica tu entidad prestamista. Requerido para hacer ofertas." : "Verify your lending entity. Required to make offers on deals."}
          </div>
          <ul className="flex flex-col gap-[6px] text-[12px] text-[#425466]">
            <li className="flex gap-[6px] before:font-[700] before:text-[#635bff] before:content-['✓']">{isEs ? "Nombre de entidad + tipo" : "Entity name + type"}</li>
            <li className="flex gap-[6px] before:font-[700] before:text-[#635bff] before:content-['✓']">{isEs ? "EIN / RFC (Tax ID)" : "EIN / Tax ID"}</li>
            <li className="flex gap-[6px] before:font-[700] before:text-[#635bff] before:content-['✓']">{isEs ? "Estado de formación" : "State of formation"}</li>
            <li className="flex gap-[6px] before:font-[700] before:text-[#635bff] before:content-['✓']">{isEs ? "Acta constitutiva" : "Articles of organization"}</li>
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
            {isEs ? "Agrega verificación de identidad para ser Completamente Verificado — el nivel más alto de confianza." : "Add personal identity verification to become Fully Verified — highest trust tier."}
          </div>
          <ul className="flex flex-col gap-[6px] text-[12px] text-[#425466]">
            <li className="flex gap-[6px] before:font-[700] before:text-[#635bff] before:content-['✓']">{isEs ? "Todo lo de Negocio Verificado" : "Everything in Business Verified"}</li>
            <li className="flex gap-[6px] before:font-[700] before:text-[#635bff] before:content-['✓']">{isEs ? "Dirección personal + Fecha nac." : "Personal address + DOB"}</li>
            <li className="flex gap-[6px] before:font-[700] before:text-[#635bff] before:content-['✓']">{isEs ? "SSN (encriptado AES-256)" : "SSN (encrypted AES-256)"}</li>
            <li className="flex gap-[6px] before:font-[700] before:text-[#635bff] before:content-['✓']">{isEs ? "Identificación oficial con foto" : "Government-issued photo ID"}</li>
          </ul>
        </div>
      </div>

      {/* Formulario */}
      <div className="mb-[20px] rounded-[10px] border border-[#e6ebf1] bg-white p-[24px]">
        <div className="mb-[4px] flex items-center justify-between">
          <div className="text-[15px] font-[700] text-[#0a2540]">
            {isEs ? "Negocio Verificado — Información de la entidad" : "Business Verified — Entity information"}
          </div>
          {verificationStatus && (
            <span className={`rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${verificationStatus === 'APPROVED' ? 'bg-[#e8f5e9] text-[#2e7d32]' : verificationStatus === 'PENDING' ? 'bg-[#fff8e1] text-[#b45309]' : 'bg-[#fef2f2] text-[#dc2626]'}`}>
              {verificationStatus}
            </span>
          )}
        </div>
        
        <div className="mb-[20px] text-[13px] text-[#8898aa]">
          {isEs ? "Esta información se usa para verificar tu entidad. No se comparte con prestatarios." : "This information is used to verify your lending entity. It is not shared with borrowers."}
        </div>

        <div className="mb-[6px] grid grid-cols-1 gap-[14px] md:grid-cols-2">
          <div className="flex flex-col gap-[5px]">
            <label className="text-[11px] font-[700] uppercase tracking-[0.4px] text-[#8898aa]">
              {isEs ? "Nombre legal de la entidad" : "Legal entity name"}
            </label>
            <input type="text" value={entityName} onChange={(e) => setEntityName(e.target.value)} disabled={isReadOnly} placeholder={isEs ? "ej. Moore Capital LLC" : "e.g. Moore Capital LLC"} className="w-full rounded-[6px] border border-[#e6ebf1] px-[12px] py-[9px] font-sans text-[13px] text-[#0a2540] outline-none focus:border-[#635bff] disabled:bg-gray-50" />
          </div>
          <div className="flex flex-col gap-[5px]">
            <label className="text-[11px] font-[700] uppercase tracking-[0.4px] text-[#8898aa]">
              {isEs ? "Tipo de entidad" : "Entity type"}
            </label>
            <select value={entityType} onChange={(e) => setEntityType(e.target.value)} disabled={isReadOnly} className="w-full cursor-pointer rounded-[6px] border border-[#e6ebf1] bg-white px-[12px] py-[9px] font-sans text-[13px] text-[#0a2540] outline-none focus:border-[#635bff] disabled:bg-gray-50">
              <option value="LLC">LLC</option>
              <option value="CORPORATION">Corporation</option>
              <option value="LP">LP</option>
              <option value="TRUST">Trust</option>
              <option value="INDIVIDUAL">Individual</option>
            </select>
          </div>
          <div className="flex flex-col gap-[5px]">
            <label className="text-[11px] font-[700] uppercase tracking-[0.4px] text-[#8898aa]">
              {isEs ? "EIN / RFC (Tax ID)" : "EIN / Tax ID"}
            </label>
            <input type="text" value={ein} onChange={(e) => setEin(e.target.value)} disabled={isReadOnly} placeholder="XX-XXXXXXX" className="w-full rounded-[6px] border border-[#e6ebf1] px-[12px] py-[9px] font-sans text-[13px] text-[#0a2540] outline-none focus:border-[#635bff] disabled:bg-gray-50" />
          </div>
          <div className="flex flex-col gap-[5px]">
            <label className="text-[11px] font-[700] uppercase tracking-[0.4px] text-[#8898aa]">
              {isEs ? "Estado de formación" : "State of formation"}
            </label>
            <input type="text" value={stateOfFormation} onChange={(e) => setStateOfFormation(e.target.value)} disabled={isReadOnly} placeholder="Ej. TN" className="w-full rounded-[6px] border border-[#e6ebf1] px-[12px] py-[9px] font-sans text-[13px] text-[#0a2540] outline-none focus:border-[#635bff] disabled:bg-gray-50" />
          </div>
          <div className="flex flex-col gap-[5px] md:col-span-2">
            <label className="text-[11px] font-[700] uppercase tracking-[0.4px] text-[#8898aa]">
              {isEs ? "Dirección del negocio" : "Business address"}
            </label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} disabled={isReadOnly} placeholder={isEs ? "Calle, ciudad, estado, ZIP" : "Street address, city, state, ZIP"} className="w-full rounded-[6px] border border-[#e6ebf1] px-[12px] py-[9px] font-sans text-[13px] text-[#0a2540] outline-none focus:border-[#635bff] disabled:bg-gray-50" />
          </div>
          <div className="flex flex-col gap-[5px]">
            <label className="text-[11px] font-[700] uppercase tracking-[0.4px] text-[#8898aa]">
              {isEs ? "Nombre del firmante" : "Signatory name"}
            </label>
            <input type="text" value={signatoryName} onChange={(e) => setSignatoryName(e.target.value)} disabled={isReadOnly} placeholder={isEs ? "¿Quién firma por la entidad?" : "Who signs on behalf of the entity?"} className="w-full rounded-[6px] border border-[#e6ebf1] px-[12px] py-[9px] font-sans text-[13px] text-[#0a2540] outline-none focus:border-[#635bff] disabled:bg-gray-50" />
          </div>
          <div className="flex flex-col gap-[5px]">
            <label className="text-[11px] font-[700] uppercase tracking-[0.4px] text-[#8898aa]">
              {isEs ? "Puesto del firmante" : "Signatory title"}
            </label>
            <input type="text" value={signatoryTitle} onChange={(e) => setSignatoryTitle(e.target.value)} disabled={isReadOnly} placeholder={isEs ? "ej. Director General, CEO" : "e.g. Managing Member, CEO"} className="w-full rounded-[6px] border border-[#e6ebf1] px-[12px] py-[9px] font-sans text-[13px] text-[#0a2540] outline-none focus:border-[#635bff] disabled:bg-gray-50" />
          </div>
        </div>

        {/* Nota de Seguridad */}
        <div className="mb-[16px] mt-6 flex gap-[8px] rounded-[7px] border border-[#e6ebf1] bg-[#f6f9fc] p-[10px_12px] text-[11px] leading-[1.7] text-[#425466]">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mt-[2px] shrink-0"><rect x="2" y="6" width="10" height="7" rx="1" stroke="#635bff" strokeWidth="1.2"/><path d="M4 6V4a3 3 0 016 0v2" stroke="#635bff" strokeWidth="1.2"/></svg>
          {isEs 
            ? "Tu EIN y documentos están encriptados en reposo y se usan solo para verificación. Nunca se comparten con prestatarios." 
            : "Your EIN and entity documents are encrypted at rest and used only for verification purposes. They are never shared with borrowers."}
        </div>

        {/* Botones de Acción */}
        {!isReadOnly && (
          <div className="flex gap-[10px]">
            <button className="flex-1 cursor-pointer rounded-[6px] border-2 border-[#c7c4ff] bg-white p-[12px] font-sans text-[13px] font-[700] text-[#635bff] hover:bg-[#f6f9fc] transition-colors">
              {isEs ? "Guardar borrador" : "Save draft"}
            </button>
            <button onClick={handleSubmit} disabled={isSubmitting} className="flex-[2] cursor-pointer rounded-[6px] border-none bg-[#635bff] p-[12px] font-sans text-[14px] font-[700] text-white hover:bg-[#524ddb] transition-colors disabled:opacity-50">
              {isSubmitting ? "Enviando..." : (isEs ? "Enviar para verificación" : "Submit for verification")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}