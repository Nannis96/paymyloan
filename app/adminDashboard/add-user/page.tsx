"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import { CheckCircle2 } from "lucide-react";

// URL base de la API
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

function AddUserContent() {
  const { t } = useSite();
  const u = t.adminAddUser;
  const router = useRouter();

  // Clases estandarizadas para los inputs adaptables a modo claro/oscuro
  const LABEL = "mb-2 block text-[11px] font-bold uppercase tracking-widest text-ink-3";
  const INPUT = "w-full rounded-lg border border-rule bg-surface-2 px-4 py-3 text-[15px] text-ink placeholder:text-ink-3 outline-none transition-colors focus:border-accent";

  // Estados del formulario
  const [role, setRole] = useState("BORROWER");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  
  // Estados de UI
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{ email: string; temporaryPassword?: string } | null>(null);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const token = localStorage.getItem("accessToken") || "";
      
      const response = await fetch(`${API_URL}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          email,
          phone: phone.trim() ? phone : undefined,
          role,
          isActive: true
        }),
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error?.message || u.errorFetch);
      }

      // El backend devuelve los datos del usuario creado, incluyendo la contrase a temporal si se genero
      setSuccessData({
        email: json.data.email,
        temporaryPassword: json.data.temporaryPassword
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : u.errorNetwork);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg p-6 lg:p-14">
      <div className="mx-auto max-w-[600px]">
        
        {/* Boton de retroceso */}
        <Link 
           href="/admin/users" 
           className="mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-ink-3 transition-colors hover:text-accent"
        >
          <span>&larr;</span> {u.back}
        </Link>

        {/* Encabezado */}
        <header className="mb-10">
          <h1 className="text-[32px] font-black tracking-tight text-ink">{u.title}</h1>
          <p className="text-ink-2">{u.subtitle}</p>
        </header>

        {/* Cascaron del Formulario */}
        <div className="rounded-2xl border border-rule bg-surface p-6 shadow-xl sm:p-10">
          
          {error && (
            <div className="mb-6 rounded-lg border border-red-900/50 bg-red-900/20 px-4 py-3 text-sm text-red-500">
              {error}
            </div>
          )}

          {successData ? (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <CheckCircle2 className="mb-4 h-16 w-16 text-green-500" />
              <h2 className="mb-2 text-2xl font-black text-ink">{u.successTitle}</h2>
              <p className="mb-4 text-sm text-ink-2">
                {u.successDesc1} <strong className="text-ink">{successData.email}</strong>.
              </p>
              {successData.temporaryPassword && (
                <div className="mb-6 w-full rounded-lg bg-surface-2 p-4 border border-rule">
                  <span className="block text-xs uppercase tracking-widest text-ink-3 mb-1">{u.successTempPw}</span>
                  <span className="font-mono text-lg font-bold text-accent">{successData.temporaryPassword}</span>
                </div>
              )}
              <div className="flex gap-4 w-full">
                <button
                  type="button"
                  onClick={() => {
                    setSuccessData(null);
                    setName("");
                    setEmail("");
                    setPhone("");
                  }}
                  className="flex-1 rounded-lg border border-rule-strong bg-surface px-4 py-3 text-sm font-bold text-ink hover:bg-surface-2"
                >
                  {u.successCreateAnother}
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/admin/users")}
                  className="flex-1 rounded-lg bg-accent px-4 py-3 text-sm font-bold text-accent-ink hover:opacity-90"
                >
                  {u.successViewList}
                </button>
              </div>
            </div>
          ) : (
            <form className="flex flex-col gap-6" onSubmit={handleAddUser}>
              
              {/* ROL */}
              <div>
                <label className={LABEL}>{u.roleLabel}</label>
                <select 
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className={`${INPUT} cursor-pointer appearance-none`}
                >
                  <option value="BORROWER">{u.roles.borrower}</option>
                  <option value="LENDER">{u.roles.lender}</option>
                  <option value="ADMIN">{u.roles.admin}</option>
                  <option value="BOOKKEEPER">Bookkeeper</option>
                </select>
              </div>

              {/* NOMBRE */}
              <div>
                <label className={LABEL}>{u.nameLabel}</label>
                <input 
                   type="text" 
                   value={name}
                   onChange={(e) => setName(e.target.value)}
                   placeholder={u.namePh}
                   className={INPUT}
                   required 
                 />
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* CORREO */}
                <div>
                  <label className={LABEL}>{u.emailLabel}</label>
                  <input 
                     type="email" 
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     placeholder={u.emailPh}
                     className={INPUT}
                     required 
                   />
                </div>

                {/* TELEFONO */}
                <div>
                  <label className={LABEL}>{u.phoneLabel}</label>
                  <input 
                     type="tel" 
                     value={phone}
                     onChange={(e) => setPhone(e.target.value)}
                     placeholder={u.phonePh}
                     maxLength={10}
                     className={INPUT}
                   />
                  <span className="text-[10px] text-ink-3 mt-1 block">{u.phoneHint}</span>
                </div>
              </div>

              {/* BOTON DE SUBMIT */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 w-full rounded-lg bg-accent px-5 py-3.5 text-[15px] font-bold text-accent-ink transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {isSubmitting ? u.submitting : u.submit}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AddUserPage() {
  return (
    <SiteShell isDashboard={true}>
      <AddUserContent />
    </SiteShell>
  );
}