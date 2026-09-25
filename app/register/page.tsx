"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useSite } from "@/app/components/layout/SiteShell";
import { type Intent } from "@/app/lib/registro";
import { enviarCRM } from "@/app/lib/crm";
import { API_ROUTES } from "@/app/lib/endpoints";
import ThemeToggle from "@/app/components/ambos/ThemeToggle";
import LangToggle from "@/app/components/ambos/LangToggle";
import SiteShell from "@/app/components/layout/SiteShell";

type Campo = "intent" | "firstName" | "lastName" | "correo" | "telefono" | "password";
type Errores = Partial<Record<Campo, string>>;

const LABEL = "mb-[5px] block text-[12px] font-semibold text-ink-2";
const INPUT = "w-full rounded-[6px] border border-rule bg-bg px-[12px] py-[10px] text-[14px] text-ink outline-none transition-colors placeholder:text-ink-3 focus:border-accent focus:ring-[3px] focus:ring-accent/10";
const INPUT_ERROR = "border-crit focus:border-crit focus:ring-[3px] focus:ring-crit/10";

function RegisterContent() {
  const { t, lang } = useSite();
  const f = t.form;
  const formRef = useRef<HTMLFormElement>(null);

  const [intent, setIntent] = useState<Intent | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [errores, setErrores] = useState<Errores>({});
  const [estado, setEstado] = useState<"idle" | "enviando" | "listo">("idle");
  const [errorEnvio, setErrorEnvio] = useState<string | null>(null);
  const [correoEnviado, setCorreoEnviado] = useState("");
  const [isResent, setIsResent] = useState(false);

  const limpiar = (campo: Campo) =>
    setErrores((prev) => (prev[campo] ? { ...prev, [campo]: undefined } : prev));

  function validar(): Errores {
    const e: Errores = {};
    if (!intent) e.intent = f.errors.intent;
    if (firstName.trim().length < 2) e.firstName = f.errors.firstName;
    if (lastName.trim().length < 2) e.lastName = f.errors.lastName;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(correo.trim())) e.correo = f.errors.email;
    if (telefono.replace(/\D/g, "").length < 10) e.telefono = f.errors.phone;
    if (password.length < 8) e.password = f.errors.password;
    return e;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorEnvio(null);

    const e = validar();
    setErrores(e);

    if (Object.keys(e).length > 0) {
      const primero = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
      primero?.focus();
      return;
    }

    setEstado("enviando");
    const fullName = `${firstName.trim()} ${lastName.trim()}`;

    // CRM Backup
    void enviarCRM({
      intent: intent as Intent,
      nombre: fullName,
      correo: correo.trim(),
      telefono: telefono.trim(),
      aceptaTerminos: true,
      idioma: lang,
    });

    try {
      // Mock: Password no se envia a nuestra API por diseño (API_REFERENCE.md)
      const response = await fetch(API_ROUTES.auth.register, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName,
          email: correo.trim(),
          phone: telefono.replace(/\D/g, ""),
          role: intent === "lender" ? "LENDER" : "BORROWER"
        }),
      });

      const json = await response.json();
      if (!response.ok) throw new Error(json.error?.message || f.errors.submit);

      setCorreoEnviado(correo.trim());
      setEstado("listo");
    } catch (err) {
      setEstado("idle");
      setErrorEnvio(err instanceof Error ? err.message : f.errors.submit);
    }
  }

  function handleResend() {
    setIsResent(true);
    // TODO: Falta API para reenviar correo de confirmacion
    setTimeout(() => setIsResent(false), 3000);
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
            {f.haveAccount} <Link href="/login" className="font-semibold text-accent no-underline">{f.login}</Link>
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
                {f.success.title}
              </div>
              <div className="mb-6 text-center text-[13px] leading-[1.6] text-ink-3">
                {f.success.subtitle}
              </div>
              <div className="mb-6 text-center">
                <span className="inline-block rounded-[6px] bg-accent-soft px-[14px] py-[6px] text-[13px] font-bold text-accent">
                  {correoEnviado}
                </span>
              </div>

              <div className="mb-5 rounded-[8px] border border-rule bg-surface-2 px-[18px] py-[16px]">
                <div className="flex items-start gap-2.5 border-b border-rule pb-2 pt-1.5">
                  <div className="mt-[1px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">1</div>
                  <div className="text-[12px] leading-[1.5] text-ink-2">
                    {f.success.step1Pre}<strong className="text-ink">{f.success.step1Bold}</strong>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 border-b border-rule py-2.5">
                  <div className="mt-[1px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">2</div>
                  <div className="text-[12px] leading-[1.5] text-ink-2">
                    {f.success.step2Pre}<strong className="text-ink">{f.success.step2Bold}</strong>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 pt-2.5 pb-1.5">
                  <div className="mt-[1px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">3</div>
                  <div className="text-[12px] leading-[1.5] text-ink-2">
                    {f.success.step3}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleResend}
                className={`mb-2.5 w-full rounded-[6px] border-[1.5px] p-[10px] text-[13px] font-semibold transition-colors ${
                  isResent 
                    ? "border-green-300 text-green-700 bg-surface dark:border-green-900 dark:text-green-400" 
                    : "border-rule bg-bg text-ink-2 hover:border-ink-3"
                }`}
              >
                {isResent ? f.success.resendDone : f.success.resend}
              </button>
              <div className="text-center text-[11px] leading-[1.6] text-ink-3">
                {f.success.spamPre}<strong className="text-ink">{f.success.spamBold}</strong>{f.success.spamPost}
              </div>
            </div>
          ) : (
            /* PANEL 1: SIGNUP */
            <form ref={formRef} onSubmit={onSubmit} noValidate className="animate-in fade-in duration-300">
              <div className="mb-1.5 text-[22px] font-[800] tracking-[-0.4px] text-ink">{f.title}</div>
              <div className="mb-6 text-[13px] leading-[1.5] text-ink-3">{f.subtitle}</div>

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

              <div className="mb-3.5">
                <label className={LABEL}>{f.phone}</label>
                <input type="tel" placeholder={f.phonePh} value={telefono} onChange={(e) => { setTelefono(e.target.value); limpiar("telefono"); }} aria-invalid={errores.telefono ? true : undefined} className={`${INPUT} ${errores.telefono ? INPUT_ERROR : ""}`} />
                <div className="mt-[3px] text-[11px] text-ink-3">{f.phoneHint}</div>
              </div>

              <div className="mb-[14px]">
                <label className={LABEL}>{f.password}</label>
                <input type="password" placeholder={f.passwordPh} value={password} onChange={(e) => { setPassword(e.target.value); limpiar("password"); }} aria-invalid={errores.password ? true : undefined} className={`${INPUT} ${errores.password ? INPUT_ERROR : ""}`} />
              </div>

              {errorEnvio && (
                <p className="mb-3 rounded-md bg-crit-soft p-2.5 text-center text-xs font-medium text-crit">{errorEnvio}</p>
              )}

              <button type="submit" disabled={estado === "enviando"} className="mt-1 w-full rounded-[6px] bg-accent px-3 py-[11px] text-[14px] font-bold text-white transition-colors hover:bg-blue-700 disabled:opacity-50">
                {estado === "enviando" ? f.submitting : f.submit}
              </button>

              <div className="my-[18px] flex items-center gap-3">
                <div className="h-px flex-1 bg-rule"></div>
                <div className="text-[12px] text-ink-3">{f.or}</div>
                <div className="h-px flex-1 bg-rule"></div>
              </div>

              <button type="button" onClick={() => alert("Google Auth mockeado. (Falta API)")} className="flex w-full items-center justify-center gap-2 rounded-[6px] border-[1.5px] border-rule bg-bg p-[10px] text-[13px] font-semibold text-ink transition-colors hover:border-ink-3">
                <svg width="16" height="16" viewBox="0 0 16 16"><path d="M15.5 8.2c0-.6-.1-1.1-.2-1.7H8v3.2h4.2c-.2 1-.8 1.8-1.6 2.4v2h2.6c1.5-1.4 2.3-3.4 2.3-5.9z" fill="#4285F4"/><path d="M8 16c2.1 0 3.9-.7 5.2-1.9l-2.6-2c-.7.5-1.6.8-2.6.8-2 0-3.7-1.4-4.3-3.2H1v2.1C2.3 14.2 5 16 8 16z" fill="#34A853"/><path d="M3.7 9.7C3.5 9.1 3.4 8.6 3.4 8s.1-1.1.3-1.7V4.2H1C.4 5.4 0 6.7 0 8s.4 2.6 1 3.8l2.7-2.1z" fill="#FBBC05"/><path d="M8 3.2c1.1 0 2.1.4 2.9 1.1L13.2 2C11.8.8 10.1 0 8 0 5 0 2.3 1.8 1 4.5l2.7 2.1C4.3 4.6 6 3.2 8 3.2z" fill="#EA4335"/></svg>
                {f.googleAuth}
              </button>

              <div className="mt-[14px] text-center text-[11px] leading-[1.6] text-ink-3">
                {f.termsPre}<a href="#" className="text-accent no-underline hover:underline">{f.termsLink}</a>{f.termsAnd}<a href="/aviso-de-privacidad" className="text-accent no-underline hover:underline">{f.privacyLink}</a>{f.termsPost}
              </div>

              <div className="mt-[18px] text-center text-[13px] text-ink-3">
                {f.haveAccount} <Link href="/login" className="font-semibold text-accent no-underline hover:underline">{f.login}</Link>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <SiteShell isMinimal={true}>
      <RegisterContent />
    </SiteShell>
  );
}