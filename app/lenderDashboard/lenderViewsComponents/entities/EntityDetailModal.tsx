"use client";

import { useState } from "react";
import { useSite } from "@/app/components/layout/SiteShell";
import { API_ROUTES } from "@/app/lib/endpoints";
import { api, ApiError } from "@/app/lib/apiFetch";
import type { LenderCompany } from "@/app/types/api";

const FIELDS = ["companyName", "ein", "contactPhone", "addressLine1", "addressLine2", "city", "state", "postalCode"] as const;
type Field = (typeof FIELDS)[number];
const OPTIONAL: Field[] = ["contactPhone", "addressLine2"];

// Detalle + edicion de una entidad del lender (PATCH solo con lo que cambio).
// El back no acepta null: un opcional vacio no se envia (no se puede borrar). `status` lo cambia solo el admin.
export default function EntityDetailModal({
  company,
  onClose,
  onSaved,
}: {
  company: LenderCompany;
  onClose: () => void;
  onSaved: () => void;
}) {
  const { lang } = useSite();
  const isEs = lang === "es";

  const [values, setValues] = useState<Record<Field, string>>(
    () => Object.fromEntries(FIELDS.map((k) => [k, company[k] ?? ""])) as Record<Field, string>
  );
  const [isOpenToDeals, setIsOpenToDeals] = useState(company.isOpenToDeals ?? true);
  const [einError, setEinError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const set = (k: Field) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [k]: e.target.value });
    if (k === "ein") setEinError(null);
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const body: Record<string, string | boolean> = {};
    for (const k of FIELDS) {
      const val = values[k].trim();
      if (!val && OPTIONAL.includes(k)) continue;
      if (val !== (company[k] ?? "")) body[k] = k === "state" ? val.toUpperCase() : val;
    }
    if (isOpenToDeals !== (company.isOpenToDeals ?? true)) body.isOpenToDeals = isOpenToDeals;
    if (Object.keys(body).length === 0) return onClose();

    setSaving(true);
    setError(null);
    setEinError(null);
    try {
      await api(API_ROUTES.lenders.meCompanyById(company.id), { method: "PATCH", body: JSON.stringify(body) });
      onSaved();
      onClose();
    } catch (err) {
      if (err instanceof ApiError && err.code === "EIN_TAKEN") {
        setEinError(isEs ? "Este EIN ya está registrado." : "This EIN is already registered.");
      } else {
        setError(err instanceof Error ? err.message : isEs ? "Error de red" : "Network error");
      }
    } finally {
      setSaving(false);
    }
  }

  const input = "w-full rounded-[6px] border border-[#e6ebf1] bg-white px-[12px] py-[9px] font-sans text-[13px] text-[#0a2540] outline-none transition-colors focus:border-[#635bff]";
  const label = "mb-[5px] block text-[11px] font-[700] uppercase tracking-[0.4px] text-[#8898aa]";
  const active = company.status === "ACTIVE";

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a2540]/70 p-4 backdrop-blur-sm">
      <form onSubmit={submit} className="max-h-[90vh] w-full max-w-[520px] overflow-y-auto rounded-[14px] border border-[#e6ebf1] bg-white p-[24px] shadow-2xl">
        <div className="mb-[16px] flex items-start justify-between">
          <h2 className="text-[18px] font-[800] text-[#0a2540]">{isEs ? "Detalle de la entidad" : "Entity details"}</h2>
          <span className={`rounded-[10px] px-[10px] py-[3px] text-[10px] font-[700] uppercase ${active ? "bg-[#e8f5e9] text-[#2e7d32]" : "bg-[#f6f9fc] text-[#8898aa]"}`}>
            {company.status}
          </span>
        </div>

        {error && <div className="mb-[14px] rounded-[6px] border border-red-200 bg-red-50 px-[12px] py-[10px] text-[13px] text-red-600">{error}</div>}

        <div className="flex flex-col gap-[14px]">
          <div>
            <label className={label}>{isEs ? "Nombre de la empresa" : "Company Name"}</label>
            <input required maxLength={200} value={values.companyName} onChange={set("companyName")} className={input} />
          </div>
          <div className="grid grid-cols-2 gap-[14px]">
            <div>
              <label className={label}>EIN / Tax ID</label>
              <input required pattern="\d{2}-\d{7}" title="XX-XXXXXXX" placeholder="12-3456789" value={values.ein} onChange={set("ein")} aria-invalid={!!einError} className={`${input} font-mono ${einError ? "!border-red-500" : ""}`} />
              {einError && <span className="mt-[4px] block text-[12px] text-red-500">{einError}</span>}
            </div>
            <div>
              <label className={label}>{isEs ? "Teléfono de contacto" : "Contact Phone"}</label>
              <input type="tel" inputMode="numeric" pattern="\d{10}" maxLength={10} title={isEs ? "Exactamente 10 dígitos" : "Exactly 10 digits"} value={values.contactPhone} onChange={set("contactPhone")} className={`${input} font-mono`} />
            </div>
          </div>
          <div>
            <label className={label}>{isEs ? "Dirección (Línea 1)" : "Address Line 1"}</label>
            <input required maxLength={200} value={values.addressLine1} onChange={set("addressLine1")} className={input} />
          </div>
          <div>
            <label className={label}>{isEs ? "Dirección (Línea 2)" : "Address Line 2"}</label>
            <input maxLength={200} value={values.addressLine2} onChange={set("addressLine2")} className={input} />
          </div>
          <div className="grid grid-cols-[1fr_70px_100px] gap-[14px]">
            <div>
              <label className={label}>{isEs ? "Ciudad" : "City"}</label>
              <input required maxLength={120} value={values.city} onChange={set("city")} className={input} />
            </div>
            <div>
              <label className={label}>{isEs ? "Estado" : "State"}</label>
              <input required pattern="[A-Za-z]{2}" maxLength={2} placeholder="TX" value={values.state} onChange={set("state")} className={`${input} uppercase`} />
            </div>
            <div>
              <label className={label}>{isEs ? "Código Postal" : "Zip Code"}</label>
              <input required maxLength={20} value={values.postalCode} onChange={set("postalCode")} className={input} />
            </div>
          </div>
          <label className="flex cursor-pointer items-center gap-[8px] text-[13px] text-[#0a2540]">
            <input type="checkbox" checked={isOpenToDeals} onChange={(e) => setIsOpenToDeals(e.target.checked)} />
            {isEs ? "Abierta a tratos" : "Open to deals"}
          </label>
          <p className="text-[10px] text-[#8898aa]">
            {isEs ? "Los campos opcionales vacíos no se modifican." : "Empty optional fields are left unchanged."}
          </p>
        </div>

        <div className="mt-[18px] flex gap-[10px] border-t border-[#f0f4f8] pt-[16px]">
          <button type="button" onClick={onClose} className="flex-1 cursor-pointer rounded-[6px] border border-[#e6ebf1] bg-white px-[16px] py-[10px] text-[13px] font-[600] text-[#425466] hover:bg-[#f6f9fc]">
            {isEs ? "Cancelar" : "Cancel"}
          </button>
          <button type="submit" disabled={saving} className="flex-1 cursor-pointer rounded-[6px] border-none bg-[#635bff] px-[16px] py-[10px] text-[13px] font-[700] text-white hover:opacity-90 disabled:opacity-50">
            {saving ? "..." : isEs ? "Guardar" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
