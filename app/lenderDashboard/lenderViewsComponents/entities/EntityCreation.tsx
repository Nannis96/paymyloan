"use client";

import { useState } from "react";
import { useSite } from "@/app/components/layout/SiteShell";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

interface EntityCreationProps {
  onSuccess: () => void;
}

export default function EntityCreation({ onSuccess }: EntityCreationProps) {
  const { lang } = useSite();
  const isEs = lang === "es";

  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    companyName: "",
    ein: "",
    contactPhone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("accessToken") || "";
      
      // Limpiamos el telefono para enviar solo los 10 digitos
      const cleanedPhone = formData.contactPhone.replace(/\D/g, "");

      const res = await fetch(`${BASE_URL}/api/lenders/me/companies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          contactPhone: cleanedPhone || undefined
        })
      });

      const json = await res.json();

      if (json.success) {
        alert(isEs ? "Entidad creada exitosamente." : "Entity created successfully.");
        setIsOpen(false);
        setFormData({
          companyName: "",
          ein: "",
          contactPhone: "",
          addressLine1: "",
          addressLine2: "",
          city: "",
          state: "",
          postalCode: ""
        });
        onSuccess(); // Refresca la lista en el componente padre
      } else {
        alert(json.error?.message || (isEs ? "Error al crear la entidad" : "Error creating entity"));
      }
    } catch (err) {
      console.error(err);
      alert(isEs ? "Error de red" : "Network error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full rounded-[6px] border border-[#e6ebf1] bg-white px-[12px] py-[9px] font-sans text-[13px] text-[#0a2540] outline-none transition-colors focus:border-[#635bff]";
  const labelClass = "mb-[5px] block text-[11px] font-[700] uppercase tracking-[0.4px] text-[#8898aa]";

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="mb-[20px] cursor-pointer rounded-[6px] border border-[#635bff] bg-[#f0efff] px-[16px] py-[8px] font-sans text-[13px] font-[700] text-[#635bff] transition-colors hover:bg-[#e0deff]"
      >
        + {isEs ? "Crear nueva entidad" : "Create new entity"}
      </button>
    );
  }

  return (
    <div className="mb-[24px] rounded-[10px] border border-[#e6ebf1] bg-white p-[20px] shadow-sm">
      <div className="mb-[16px] text-[15px] font-[700] text-[#0a2540]">
        {isEs ? "Registrar Nueva Entidad" : "Register New Entity"}
      </div>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-[14px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[14px]">
          <div>
            <label className={labelClass}>{isEs ? "Nombre de la empresa" : "Company Name"}</label>
            <input type="text" name="companyName" required value={formData.companyName} onChange={handleChange} className={inputClass} placeholder="Ej. Lone Star Capital LLC" />
          </div>
          <div>
            <label className={labelClass}>EIN / Tax ID</label>
            <input type="text" name="ein" required value={formData.ein} onChange={handleChange} className={inputClass} placeholder="XX-XXXXXXX" />
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>{isEs ? "Direccion (Linea 1)" : "Address Line 1"}</label>
            <input type="text" name="addressLine1" required value={formData.addressLine1} onChange={handleChange} className={inputClass} placeholder="100 Congress Ave" />
          </div>
          <div>
            <label className={labelClass}>{isEs ? "Direccion (Linea 2)" : "Address Line 2"}</label>
            <input type="text" name="addressLine2" value={formData.addressLine2} onChange={handleChange} className={inputClass} placeholder="Suite 200 (Opcional)" />
          </div>
          <div>
            <label className={labelClass}>{isEs ? "Telefono de contacto" : "Contact Phone"}</label>
            <input type="tel" name="contactPhone" value={formData.contactPhone} onChange={handleChange} className={inputClass} placeholder="5125550100" />
          </div>
          <div>
            <label className={labelClass}>{isEs ? "Ciudad" : "City"}</label>
            <input type="text" name="city" required value={formData.city} onChange={handleChange} className={inputClass} placeholder="Austin" />
          </div>
          <div className="grid grid-cols-2 gap-[14px]">
            <div>
              <label className={labelClass}>{isEs ? "Estado" : "State"}</label>
              <input type="text" name="state" required maxLength={2} value={formData.state} onChange={handleChange} className={inputClass} placeholder="TX" />
            </div>
            <div>
              <label className={labelClass}>{isEs ? "Codigo Postal" : "Zip Code"}</label>
              <input type="text" name="postalCode" required value={formData.postalCode} onChange={handleChange} className={inputClass} placeholder="78701" />
            </div>
          </div>
        </div>

        <div className="mt-[8px] flex justify-end gap-[10px] border-t border-[#f0f4f8] pt-[16px]">
          <button 
            type="button"
            onClick={() => setIsOpen(false)}
            className="cursor-pointer rounded-[6px] border border-[#e6ebf1] bg-white px-[16px] py-[8px] font-sans text-[13px] font-[600] text-[#425466] transition-colors hover:bg-[#f6f9fc]"
          >
            {isEs ? "Cancelar" : "Cancel"}
          </button>
          <button 
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer rounded-[6px] border-none bg-[#635bff] px-[16px] py-[8px] font-sans text-[13px] font-[700] text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {isSubmitting ? (isEs ? "Guardando..." : "Saving...") : (isEs ? "Guardar entidad" : "Save entity")}
          </button>
        </div>
      </form>
    </div>
  );
}