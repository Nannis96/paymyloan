"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Lock } from "lucide-react";
import { useSite } from "@/app/components/layout/SiteShell";
import { API_ROUTES } from "@/app/lib/endpoints";

export type TwoFactorContextType = "login" | "publish" | "bank" | "password" | "phone" | "email";

interface Verify2FAProps {
  context?: TwoFactorContextType;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function Verify2FA({ context = "login", onSuccess, onCancel }: Verify2FAProps) {
  const { t } = useSite();
  const tf = t.twoFactorPage;
  
  const textContext = tf.contexts[context];
  const showAlert = ["bank", "password", "phone", "email"].includes(context);

  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(600); // 10 min
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = (timeLeft % 60).toString().padStart(2, "0");
  const isExpired = timeLeft <= 0;
  const isComplete = code.join("").length === 6;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value.replace(/\D/g, "");
    if (!val && e.target.value !== "") return; 

    const newCode = [...code];
    newCode[index] = val;
    setCode(newCode);

    if (val && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const fullCode = code.join("");
    setIsVerifying(true);

    try {
      if (context === "login") {
        // En un caso real de login, aquí se extrae el pendingToken
        // const pendingToken = localStorage.getItem("pendingToken");
        // const response = await fetch(API_ROUTES.auth.login2fa, { ... });
        
        console.log("Mock API call a:", API_ROUTES.auth.login2fa, "con código:", fullCode);
        await new Promise(r => setTimeout(r, 1000));
        
        if (onSuccess) onSuccess();
      } else {
        // TODO: Faltan endpoints específicos para validar 2FA en acciones (ej. /api/auth/2fa/verify-action)
        console.log(`Mock: Validando acción ${context} con código ${fullCode}`);
        await new Promise(r => setTimeout(r, 1000));
        
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      console.error(error);
      alert("Error al verificar el código.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = () => {
    // TODO: Falta endpoint /api/auth/2fa/resend
    setTimeLeft(600);
    alert("Nuevo código enviado.");
  };

  return (
    <div className="w-full max-w-[440px] mx-auto rounded-xl border border-rule bg-surface p-10 text-center shadow-sm sm:p-12">
      {showAlert && (
        <div className="mb-6 rounded-lg border border-amber/30 bg-amber-soft p-4 text-left text-[13px] text-amber">
          <strong className="mb-1 block text-[14px] font-bold">{tf.securityAlert.title}</strong>
          {tf.securityAlert.desc}
        </div>
      )}

      <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-accent">
        <Lock size={26} strokeWidth={2} />
      </div>

      <h2 className="mb-2 text-[22px] font-extrabold tracking-tight text-ink">
        {textContext.title}
      </h2>
      <p className="mb-8 text-[14px] leading-relaxed text-ink-3">
        {textContext.sub}
      </p>

      <div className="mb-7 inline-block rounded-lg bg-surface-2 px-4 py-2.5 text-[13px] text-ink-2">
        {tf.codeSent} <strong className="text-ink font-bold">(901) ***-**91</strong>
      </div>

      <div className="mb-4 flex justify-center gap-2.5">
        {code.map((digit, i) => (
          <input
            key={i}
            ref={(el) => { inputRefs.current[i] = el; }}
            type="text"
            maxLength={1}
            inputMode="numeric"
            value={digit}
            onChange={(e) => handleChange(e, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className={`h-[60px] w-[52px] rounded-lg border-2 text-center text-2xl font-bold text-ink outline-none transition-colors focus:border-accent focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)] bg-bg ${
              digit ? "border-accent" : "border-rule"
            }`}
          />
        ))}
      </div>

      <div className="mb-6 text-[12px] text-ink-3">
        {isExpired ? (
          <span className="text-crit font-bold">{tf.expired}</span>
        ) : (
          <>
            {tf.expiresIn} <span className="font-bold text-accent">{minutes}:{seconds}</span>
          </>
        )}
      </div>

      <button
        onClick={handleVerify}
        disabled={!isComplete || isExpired || isVerifying}
        className="mb-4 w-full rounded-md bg-accent px-4 py-3.5 text-[15px] font-bold text-white transition-colors hover:bg-blue-700 disabled:bg-rule-strong disabled:text-ink-3 disabled:cursor-not-allowed"
      >
        {isVerifying ? tf.verifying : tf.verifyBtn}
      </button>

      <div className="text-[13px] text-ink-3">
        {tf.noCode} <button onClick={handleResend} className="font-semibold text-accent hover:underline">{tf.resend}</button>
      </div>

      <hr className="my-6 border-rule" />

      <div className="text-[12px] text-ink-3">
        {tf.wrongDevice}{" "}
        {onCancel ? (
          <button onClick={onCancel} className="font-medium text-accent hover:underline">
            {tf.backLogin}
          </button>
        ) : (
          <Link href="/login" className="font-medium text-accent hover:underline">
            {tf.backLogin}
          </Link>
        )}
        {" "}&nbsp;|&nbsp;{" "}
        <button className="font-medium text-crit hover:underline">
          {tf.report}
        </button>
      </div>
    </div>
  );
}