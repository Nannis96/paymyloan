"use client";

import { API_ROUTES } from "@/app/lib/endpoints";
import { api, ApiError } from "@/app/lib/apiFetch";
import type { SafeUser } from "@/app/types/api";
import { TwoFactorRequiredBanner } from "../AdminViewsComponents/TwoFactorRequiredBanner";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSite } from "@/app/components/layout/SiteShell";
import { CheckCircle2 } from "lucide-react";

function AddUserContent() {
  const { t } = useSite();
  const u = t.adminAddUser;
  const ul = t.adminUsersList; // textos compartidos con la lista (2FA, email duplicado, correo)
  const router = useRouter();

  // Clases estandarizadas para los inputs adaptables a modo claro/oscuro
  const LABEL = "mb-2 block text-[11px] font-bold uppercase tracking-widest text-ink-3";
  const INPUT = "w-full rounded-lg border border-rule bg-surface-2 px-4 py-3 text-[15px] text-ink placeholder:text-ink-3 outline-none transition-colors focus:border-accent";

  // Estados del formulario
  // El back solo acepta roles de staff aqui; LENDER/BORROWER nacen por auto-registro.
  const [role, setRole] = useState("ADMIN");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  
  // Estados de UI
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [need2fa, setNeed2fa] = useState(false);
  const [successData, setSuccessData] = useState<{ email: string; temporaryPassword?: string; emailSent?: boolean } | null>(null);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setEmailError(null);

    try {
      const data = await api<SafeUser & { temporaryPassword?: string; emailSent?: boolean }>(API_ROUTES.users.base, {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          phone: phone.trim() ? phone.trim() : undefined,
          role,
          isActive: true,
        }),
      });
      setSuccessData({ email: data.email, temporaryPassword: data.temporaryPassword, emailSent: data.emailSent });
    } catch (err) {
      if (err instanceof ApiError && err.code === "EMAIL_TAKEN") setEmailError(ul.errorEmailTaken);
      else if (err instanceof ApiError && err.code === "TWO_FACTOR_REQUIRED") setNeed2fa(true);
      else setError(err instanceof Error ? err.message : u.errorNetwork);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-300">
      <div className="mx-auto max-w-[600px]">
        
        {/* Boton de retroceso */}
        <Link 
           href="/adminDashboard/users" 
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
          
          {need2fa && <TwoFactorRequiredBanner onEnabled={() => setNeed2fa(false)} />}

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
                  <span className="select-all font-mono text-lg font-bold text-accent">{successData.temporaryPassword}</span>
                  <span className="mt-2 block text-xs text-ink-3">{successData.emailSent ? ul.tempPwEmailSent : ul.tempPwEmailFailed}</span>
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
                  onClick={() => router.push("/adminDashboard/users")}
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
                  <option value="ADMIN">{u.roles.admin}</option>
                  <option value="BOOKKEEPER">{u.roles.bookkeeper}</option>
                  <option value="INSURANCE_COMPANY">{u.roles.insurance}</option>
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
                     onChange={(e) => { setEmail(e.target.value); setEmailError(null); }}
                     placeholder={u.emailPh}
                     className={`${INPUT} ${emailError ? "border-red-500" : ""}`}
                     aria-invalid={!!emailError}
                     required 
                   />
                  {emailError && <span className="mt-1 block text-xs text-red-500">{emailError}</span>}
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
                     inputMode="numeric"
                     pattern="\d{10}"
                     title={u.phoneHint}
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

export default AddUserContent;