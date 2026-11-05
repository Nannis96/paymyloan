"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useSite } from "@/app/components/layout/SiteShell";
import { type Intent } from "@/app/lib/registro";
import { enviarCRM } from "@/app/lib/crm";
import ThemeToggle from "@/app/components/ambos/ThemeToggle";
import LangToggle from "@/app/components/ambos/LangToggle";
import SiteShell from "@/app/components/layout/SiteShell";

type Campo = "intent" | "firstName" | "lastName" | "correo" | "telefono";
type Errores = Partial<Record<Campo, string>>;

const LABEL = "mb-[5px] block text-[12px] font-semibold text-ink-2";
const INPUT = "w-full rounded-[6px] border border-rule bg-bg px-[12px] py-[10px] text-[14px] text-ink outline-none transition-colors placeholder:text-ink-3 focus:border-accent focus:ring-[3px] focus:ring-accent/10";
const INPUT_ERROR = "border-crit focus:border-crit focus:ring-[3px] focus:ring-crit/10";

function PreRegisterContent() {
  const { t, lang } = useSite();
  const f = t.form; 
  const p = t.preRegister; // <-- Agrega esta variable para acceder a tus nuevos textos
  const formRef = useRef<HTMLFormElement>(null);

  const [intent, setIntent] = useState<Intent | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  
  const [errores, setErrores] = useState<Errores>({});
  const [estado, setEstado] = useState<"idle" | "enviando" | "listo">("idle");

  const limpiar = (campo: Campo) =>
    setErrores((prev) => (prev[campo] ? { ...prev, [campo]: undefined } : prev));

  function validar(): Errores {
    const e: Errores = {};
    if (!intent) e.intent = f.errors.intent;
    if (firstName.trim().length < 2) e.firstName = f.errors.firstName;
    if (lastName.trim().length < 2) e.lastName = f.errors.lastName;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(correo.trim())) e.correo = f.errors.email;
    if (telefono.replace(/\D/g, "").length < 10) e.telefono = f.errors.phone;
    return e;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const e = validar();
    setErrores(e);

    if (Object.keys(e).length > 0) {
      const primero = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
      primero?.focus();
      return;
    }

    setEstado("enviando");
    const fullName = `${firstName.trim()} ${lastName.trim()}`;

    try {
      await enviarCRM({
        intent: intent as Intent,
        nombre: fullName,
        correo: correo.trim(),
        telefono: telefono.trim(),
        aceptaTerminos: true,
        idioma: lang as "es" | "en",
      });

      await new Promise((resolve) => setTimeout(resolve, 800));
      setEstado("listo");
    } catch (err) {
      setEstado("listo");
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-surface-2">
      {/* NAVBAR */}
      <nav className="flex h-[52px] items-center justify-between border-b border-rule bg-surface px-8">
        <Link href="/" className="text-[16px] font-[800] tracking-[-0.3px] text-accent no-underline">
          PayMy<span className="text-ink">Loan</span>.ai
        </Link>
        <div className="flex items-center gap-4 text-[13px] text-ink-3">
          <div className="hidden sm:block">
            {p.alreadyAccount} <Link href="/login" className="font-semibold text-accent no-underline">{p.login}</Link>
          </div>
          <div className="flex items-center gap-2 border-l border-rule pl-4">
            <LangToggle className="h-8 min-w-8 rounded-md px-1 text-xs font-bold text-ink-3 hover:bg-surface-2 hover:text-ink" />
            <ThemeToggle iconSize={15} className="h-8 w-8 rounded-md text-ink-3 hover:bg-surface-2 hover:text-ink" />
          </div>
        </div>
      </nav>

      {/* MAIN */}
      <main className="flex flex-1 items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-[420px] rounded-[10px] border border-rule bg-surface px-9 pb-8 pt-9 shadow-sm">
          
          {estado === "listo" ? (
            /* PANEL 2: SUCCESS */
            <div className="animate-in fade-in duration-300">
              <div className="mx-auto mb-[18px] flex h-[52px] w-[52px] items-center justify-center rounded-[12px] bg-accent-soft text-accent">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div className="mb-2 text-center text-[20px] font-[800] tracking-[-0.3px] text-ink">
                {p.successTitle}
              </div>
              <div className="mb-6 text-center text-[13px] leading-[1.6] text-ink-3">
                {p.successDesc1}
              </div>
              <div className="mb-6 text-center">
                <span className="inline-block rounded-[6px] bg-accent-soft px-[14px] py-[6px] text-[13px] font-bold text-accent">
                  {correo}
                </span>
              </div>
              <p className="text-center text-[12px] text-ink-2">
                {p.successDesc2}
              </p>
              <Link href="/" className="mt-8 block w-full rounded-[6px] border border-rule-strong bg-bg p-[10px] text-center text-[13px] font-semibold text-ink-2 transition-colors hover:border-ink-3">
                {p.backHome}
              </Link>
            </div>
          ) : (
            /* PANEL 1: PRE-SIGNUP */
            <form ref={formRef} onSubmit={onSubmit} noValidate className="animate-in fade-in duration-300">
              <div className="mb-1.5 text-[22px] font-[800] tracking-[-0.4px] text-ink">{p.title}</div>
              <div className="mb-6 text-[13px] leading-[1.5] text-ink-3">{p.subtitle}</div>

              <div className="mb-5 grid grid-cols-2 gap-2">
                {f.intents.map((opcion) => {
                  const activo = intent === opcion.value;
                  return (
                    <div
                      key={opcion.value}
                      onClick={() => { setIntent(opcion.value as Intent); limpiar("intent"); }}
                      className={`cursor-pointer rounded-[7px] border-[1.5px] p-2.5 text-center transition-all ${
                        activo ? "border-accent bg-accent-soft text-accent" : "border-rule bg-bg text-ink-2 hover:border-accent hover:text-accent"
                      } ${errores.intent ? "border-crit" : ""}`}
                    >
                      <div className="text-[13px] font-semibold">{opcion.label}</div>
                      <div className={`mt-[2px] text-[10px] font-normal ${activo ? "text-accent/80" : "text-ink-3"}`}>{opcion.hint}</div>
                    </div>
                  );
                })}
              </div>

              <div className="mb-3.5 grid grid-cols-2 gap-3">
                <div>
                  <label className={LABEL}>{f.firstName}</label>
                  <input type="text" placeholder={f.firstNamePh} value={firstName} onChange={(e) => { setFirstName(e.target.value); limpiar("firstName"); }} aria-invalid={errores.firstName ? true : undefined} className={`${INPUT} ${errores.firstName ? INPUT_ERROR : ""}`} />
                </div>
                <div>
                  <label className={LABEL}>{f.lastName}</label>
                  <input type="text" placeholder={f.lastNamePh} value={lastName} onChange={(e) => { setLastName(e.target.value); limpiar("lastName"); }} aria-invalid={errores.lastName ? true : undefined} className={`${INPUT} ${errores.lastName ? INPUT_ERROR : ""}`} />
                </div>
              </div>

              <div className="mb-3.5">
                <label className={LABEL}>{f.email}</label>
                <input type="email" placeholder={f.emailPh} value={correo} onChange={(e) => { setCorreo(e.target.value); limpiar("correo"); }} aria-invalid={errores.correo ? true : undefined} className={`${INPUT} ${errores.correo ? INPUT_ERROR : ""}`} />
              </div>

              <div className="mb-[24px]">
                <label className={LABEL}>{f.phone}</label>
                <input type="tel" placeholder={f.phonePh} value={telefono} onChange={(e) => { setTelefono(e.target.value); limpiar("telefono"); }} aria-invalid={errores.telefono ? true : undefined} className={`${INPUT} ${errores.telefono ? INPUT_ERROR : ""}`} />
                <div className="mt-[3px] text-[11px] text-ink-3">{f.phoneHint}</div>
              </div>

              <button type="submit" disabled={estado === "enviando"} className="w-full rounded-[6px] bg-accent px-3 py-[11px] text-[14px] font-bold text-white transition-colors hover:bg-blue-700 disabled:opacity-50">
                {estado === "enviando" ? p.processing : p.submitBtn}
              </button>

              <div className="mt-[18px] text-center text-[11px] leading-[1.6] text-ink-3">
                {f.termsPre}<a href="#" className="text-accent no-underline hover:underline">{f.termsLink}</a>{f.termsAnd}<a href="/aviso-de-privacidad" className="text-accent no-underline hover:underline">{f.privacyLink}</a>{f.termsPost}
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}

export default function PreRegisterPage() {
  return (
    <SiteShell isMinimal={true}>
      <PreRegisterContent />
    </SiteShell>
  );
}