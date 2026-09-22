"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, Lock } from "lucide-react";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import RegisterForm from "@/app/components/landing/RegisterForm";
import { API_ROUTES } from "@/app/lib/endpoints";

function LoginContent() {
  const { t: siteT } = useSite();
  const t = siteT.loginPage;
  const router = useRouter();
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estados para credenciales
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Estados de UI
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Estados para 2FA
  const [needs2FA, setNeeds2FA] = useState(false);
  const [pendingToken, setPendingToken] = useState("");
  const [totpCode, setTotpCode] = useState("");

  // Estado para selector de rol previo a SSO
  const [ssoRole, setSsoRole] = useState<"lender" | "borrower">("lender");

  const processSuccessfulLogin = (data: any) => {
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    
    const role = data.user.role;
    if (role === "ADMIN") {
      router.push("/admin");
    } else if (role === "LENDER") {
      router.push("/lender");
    } else if (role === "BORROWER") {
      router.push("/borrower");
    } else if (role === "BOOKKEEPER") {
      router.push("/bookkeeper");
    } else {
      router.push("/");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(API_ROUTES.auth.login, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error?.message || t.errorDefault);
      }

      if (json.data.requiresTwoFactor) {
        setNeeds2FA(true);
        setPendingToken(json.data.pendingToken);
      } else {
        processSuccessfulLogin(json.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t.errorNetwork);
    } finally {
      setIsLoading(false);
    }
  };

  const handle2FASubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(API_ROUTES.auth.login2fa, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pendingToken, code: totpCode }),
      });
      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error?.message || t.error2FA);
      }

      processSuccessfulLogin(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : t.errorNetwork);
    } finally {
      setIsLoading(false);
    }
  };

  const LABEL = "block text-[13px] font-medium text-ink-2 mb-1.5";
  const INPUT = "w-full rounded-md border border-rule-strong bg-bg px-3.5 py-2.5 text-[15px] text-ink placeholder:text-ink-3 outline-none transition-all focus:border-accent focus:ring-[3px] focus:ring-accent/10";

  return (
    <div className="flex min-h-screen flex-col bg-surface-2">
      {/* Top Bar Simple */}
      <div className="flex items-center justify-between px-8 py-6">
        <div className="font-serif text-[22px] font-extrabold tracking-[-0.5px] text-accent">
          PayMy<span className="text-ink">Loan</span>.ai
        </div>
        <Link 
          href="/" 
          onClick={() => {
            // Solucion al bug: Eliminamos la bandera para forzar el WelcomeModal al regresar al home
            localStorage.removeItem("pml-welcome-seen");
          }}
          className="text-[14px] font-medium text-ink-2 transition-colors hover:text-ink"
        >
          &larr; {t.back}
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-[440px] rounded-xl border border-rule bg-surface p-10 shadow-[0_4px_24px_rgba(0,0,0,0.04)] sm:p-12">
          
          <div className="mb-8 font-serif text-[24px] font-extrabold tracking-[-0.5px] text-accent">
            PayMy<span className="text-ink">Loan</span>.ai
          </div>

          <h1 className="mb-1.5 text-[22px] font-bold tracking-tight text-ink">
            {needs2FA ? t.twoFactorTitle : t.title}
          </h1>
          <p className="mb-8 text-[14px] text-ink-3">
            {needs2FA ? t.twoFactorDesc : t.subtitle}
          </p>

          {error && (
            <div className="mb-6 rounded-md border border-red-900/20 bg-red-50 p-3 text-[13px] font-medium text-red-600 dark:bg-red-900/10 dark:text-red-400">
              {error}
            </div>
          )}

          {!needs2FA ? (
            <form onSubmit={handleLogin} className="flex flex-col gap-5">
              
              {/* Selector de Rol para SSO */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSsoRole("lender")}
                  className={`rounded-lg border-[1.5px] p-2.5 text-[13px] font-semibold transition-all ${
                    ssoRole === "lender"
                      ? "border-accent bg-accent-soft/50 text-accent"
                      : "border-rule-strong bg-bg text-ink-2 hover:border-ink-3 hover:bg-surface-2"
                  }`}
                >
                  {siteT.prototype.modes.lender}
                </button>
                <button
                  type="button"
                  onClick={() => setSsoRole("borrower")}
                  className={`rounded-lg border-[1.5px] p-2.5 text-[13px] font-semibold transition-all ${
                    ssoRole === "borrower"
                      ? "border-accent bg-accent-soft/50 text-accent"
                      : "border-rule-strong bg-bg text-ink-2 hover:border-ink-3 hover:bg-surface-2"
                  }`}
                >
                  {siteT.prototype.modes.borrower}
                </button>
              </div>

              {/* Google SSO Falso (Visual) */}
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2.5 rounded-md border border-rule-strong bg-bg py-2.5 text-[14px] font-medium text-ink transition-colors hover:bg-surface-2"
              >
                <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>

              <div className="flex items-center gap-3 text-[13px] text-ink-3 before:h-px before:flex-1 before:bg-rule after:h-px after:flex-1 after:bg-rule">
                o
              </div>

              <div>
                <label className={LABEL}>{t.emailLabel}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.emailPlaceholder}
                  className={INPUT}
                  required
                />
              </div>
              
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="text-[13px] font-medium text-ink-2">{t.passwordLabel}</label>
                  <a href="#" className="text-[13px] font-medium text-accent hover:underline">
                    {t.forgot}
                  </a>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t.passwordPlaceholder}
                  className={INPUT}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="mt-1 w-full rounded-md bg-accent py-3 text-[15px] font-semibold text-accent-ink transition-all hover:bg-blue-700 hover:shadow-[0_4px_12px_rgba(37,99,235,0.25)] disabled:opacity-50"
              >
                {isLoading ? t.processing : t.submit} &rarr;
              </button>

              <div className="mt-4 text-center text-[14px] text-ink-3">
                {t.noAccount}{" "}
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="font-medium text-accent hover:underline"
                >
                  {t.signup}
                </button>
              </div>
            </form>
          ) : (
            <form className="flex animate-in fade-in flex-col gap-5" onSubmit={handle2FASubmit}>
              <div>
                <label className={LABEL}>{t.twoFactorLabel}</label>
                <input
                  type="text"
                  value={totpCode}
                  onChange={(e) => setTotpCode(e.target.value)}
                  placeholder={t.twoFactorPlaceholder}
                  className={`${INPUT} text-center font-mono tracking-widest`}
                  autoFocus
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || !totpCode}
                className="mt-1 w-full rounded-md bg-accent py-3 text-[15px] font-semibold text-accent-ink transition-all hover:bg-blue-700 hover:shadow-[0_4px_12px_rgba(37,99,235,0.25)] disabled:opacity-50"
              >
                {isLoading ? t.twoFactorVerifying : t.twoFactorConfirm} &rarr;
              </button>
              
              <button
                type="button"
                onClick={() => {
                  setNeeds2FA(false);
                  setTotpCode("");
                }}
                className="mt-2 text-[13px] font-medium text-ink-3 hover:text-ink"
              >
                {t.twoFactorCancel}
              </button>
            </form>
          )}

          <div className="mt-8 flex items-center justify-center gap-1.5 text-[12px] text-ink-3">
            <Lock size={12} className="opacity-60" />
            Secured by 256-bit SSL encryption
          </div>
        </div>
      </div>

      {/* MODAL DE REGISTRO */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-[500px] max-h-[95vh] overflow-y-auto rounded-2xl">
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