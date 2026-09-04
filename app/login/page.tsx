"use client";

import { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import RegisterForm from "@/app/components/RegisterForm";

function LoginContent() {
  const { t: siteT } = useSite();
  const t = siteT.loginPage;
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Estados para capturar los datos del formulario de login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // NOTA: Esta función es un placeholder.
  // Aquí se deberá integrar la lógica de autenticación contra la base de datos 
  // (por ejemplo: Supabase Auth, Firebase, NextAuth, etc.) y redirigir al usuario
  // a su dashboard correspondiente según su rol (Borrower, Lender, Admin).
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Simulando login para:", email);
    // TODO: Implementar llamada a API de login
  };

  return (
    <div className="min-h-screen bg-bg text-ink flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md flex flex-col items-center">
                 
        <h1 className="text-3xl font-black text-ink mb-2 tracking-tight">
          {t.title}
        </h1>
        <p className="text-ink-2 mb-8 text-center text-sm">
          {t.subtitle}
        </p>
        
        <div className="w-full bg-surface border border-rule rounded-2xl p-6 sm:p-8 shadow-xl">
                     
          <div className="flex items-center gap-2 mb-6 text-ink font-bold tracking-wide">
            <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
            {t.cardTitle}
          </div>

          <form className="flex flex-col gap-5" onSubmit={handleLogin}>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-ink-3 tracking-wider uppercase">
                {t.emailLabel}
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-4 flex items-center text-ink-3 font-medium">
                  @
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.emailPlaceholder}
                  className="w-full bg-surface-2 border border-rule text-ink rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-accent transition-colors text-sm"
                  required
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-ink-3 tracking-wider uppercase">
                {t.passwordLabel}
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-4 flex items-center text-ink-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t.passwordPlaceholder}
                  className="w-full bg-surface-2 border border-rule text-ink rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-accent transition-colors text-sm"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-accent hover:opacity-90 text-accent-ink font-bold rounded-lg py-3 mt-4 transition-opacity"
            >
              {t.submit}
            </button>
            
            <div className="mt-4 text-center text-sm text-ink-3">
              {t.noAccount}{" "}
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="font-bold text-accent hover:text-ink transition-colors"
              >
                {t.signup}
              </button>
            </div>
          </form>
        </div>
        
        <div className="mt-8">
          <Link href="/" className="text-xs text-ink-3 hover:text-accent transition-colors flex items-center gap-2 uppercase tracking-wide font-bold">
            <span>&larr;</span> {t.back}
          </Link>
        </div>
      </div>

      {/* MODAL DE REGISTRO */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-[500px] max-h-[95vh] overflow-y-auto rounded-2xl">
            {/* Botón flotante para cerrar el modal */}
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#1a1a1a] text-white transition-colors hover:bg-red-500"
              aria-label="Cerrar"
            >
              <X size={18} />
            </button>
            <RegisterForm />
          </div>
        </div>
      )}
    </div>
  );
}

export default function LoginPage() {
  return (
    <SiteShell isMinimal={true}>
      <LoginContent />
    </SiteShell>
  );
}