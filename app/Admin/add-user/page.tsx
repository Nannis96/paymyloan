"use client";

import { useState } from "react";
import Link from "next/link";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";

function AddUserContent() {
  const { t } = useSite();
  const u = t.adminAddUser;
  
  // Clases estandarizadas para los inputs adaptables a modo claro/oscuro
  const LABEL = "mb-2 block text-[11px] font-bold uppercase tracking-widest text-ink-3";
  const INPUT = "w-full rounded-lg border border-rule bg-surface-2 px-4 py-3 text-[15px] text-ink placeholder:text-ink-3 outline-none transition-colors focus:border-accent";

  // Estados para capturar los datos del formulario
  const [role, setRole] = useState("borrower");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // NOTA: Esta función es un placeholder.
  // Aquí se deberá implementar la lógica para enviar los datos del nuevo usuario
  // a la base de datos o API (ej. crear registro en Supabase/PostgreSQL o GoHighLevel).
  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser = { role, name, email, phone };
    console.log("Simulando creación de usuario:", newUser);
    // TODO: Implementar fetch POST a la API de creación de usuarios
    // Y limpiar el formulario o redirigir al listado tras éxito.
  };

  return (
    <div className="min-h-screen bg-bg p-6 lg:p-14">
      <div className="mx-auto max-w-[600px]">
        
        {/* Botón de retroceso */}
        <Link
           href="/admin"
           className="mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-ink-3 transition-colors hover:text-accent"
        >
          <span>&larr;</span> {u.back}
        </Link>

        {/* Encabezado */}
        <header className="mb-10">
          <h1 className="text-[32px] font-black tracking-tight text-ink">{u.title}</h1>
          <p className="text-ink-2">{u.subtitle}</p>
        </header>

        {/* Cascarón del Formulario */}
        <div className="rounded-2xl border border-rule bg-surface p-6 shadow-xl sm:p-10">
          <form className="flex flex-col gap-6" onSubmit={handleAddUser}>
            
            {/* ROL */}
            <div>
              <label className={LABEL}>{u.roleLabel}</label>
              <select 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className={`${INPUT} cursor-pointer appearance-none`}
              >
                <option value="borrower">{u.roles.borrower}</option>
                <option value="lender">{u.roles.lender}</option>
                <option value="admin">{u.roles.admin}</option>
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

              {/* TELÉFONO */}
              <div>
                <label className={LABEL}>{u.phoneLabel}</label>
                <input
                   type="tel"
                   value={phone}
                   onChange={(e) => setPhone(e.target.value)}
                   placeholder={u.phonePh}
                   className={INPUT}
                   required
                 />
              </div>
            </div>

            {/* BOTÓN DE SUBMIT */}
            <button
              type="submit"
              className="mt-4 w-full rounded-lg bg-accent px-5 py-3.5 text-[15px] font-bold text-accent-ink transition-opacity hover:opacity-90"
            >
              {u.submit}
            </button>
          </form>
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