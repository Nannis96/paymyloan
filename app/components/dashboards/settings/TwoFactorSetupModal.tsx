"use client";

import { useState, useEffect } from "react";
import { useSite } from "@/app/components/layout/SiteShell";
import { QRCodeSVG } from "qrcode.react"; // <-- Importamos la librería segura

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

interface TwoFactorSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function TwoFactorSetupModal({ isOpen, onClose, onSuccess }: TwoFactorSetupModalProps) {
  const { lang } = useSite();
  const isEs = lang === "es";

  const [step, setStep] = useState<"LOADING" | "SETUP" | "RECOVERY">("LOADING");
  const [otpAuthUrl, setOtpAuthUrl] = useState("");
  const [secretStr, setSecretStr] = useState("");
  const [code, setCode] = useState("");
  const [recoveryCodes, setRecoveryCodes] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStep("LOADING");
      setCode("");
      setError(null);
      fetchSetupData();
    }
  }, [isOpen]);

  const fetchSetupData = async () => {
    try {
      const token = localStorage.getItem("accessToken") || "";
      const res = await fetch(`${BASE_URL}/api/auth/2fa/setup`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      });
      const json = await res.json();
      
      if (json.success && json.data) {
        // Guardamos la URL para el componente QRCodeSVG (generación 100% local y segura)
        setOtpAuthUrl(json.data.otpAuthUrl);
        setSecretStr(json.data.secret);
        setStep("SETUP");
      } else {
        setError(json.error?.message || (isEs ? "Error al iniciar 2FA" : "Error starting 2FA"));
      }
    } catch (err) {
      setError(isEs ? "Error de red" : "Network error");
    }
  };

  const handleVerify = async () => {
    if (code.length < 6) return;
    setIsVerifying(true);
    setError(null);

    try {
      const token = localStorage.getItem("accessToken") || "";
      const res = await fetch(`${BASE_URL}/api/auth/2fa/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ code })
      });
      const json = await res.json();

      if (json.success && json.data?.recoveryCodes) {
        setRecoveryCodes(json.data.recoveryCodes);
        setStep("RECOVERY");
      } else {
        setError(json.error?.message || (isEs ? "Código incorrecto" : "Incorrect code"));
      }
    } catch (err) {
      setError(isEs ? "Error de red" : "Network error");
    } finally {
      setIsVerifying(false);
    }
  };

  const downloadCodes = () => {
    const text = `PayMyLoan.ai - ${isEs ? "Codigos de Recuperacion 2FA" : "2FA Recovery Codes"}\n\n` +
                 recoveryCodes.join("\n") +
                 `\n\n${isEs ? "Guarda este archivo en un lugar seguro. Solo podras verlo esta vez." : "Keep this file in a safe place. You will only see this once."}`;
    
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "paymyloan-2fa-recovery-codes.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleComplete = () => {
    onSuccess();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl bg-surface p-6 shadow-xl">
        <h3 className="mb-2 text-lg font-bold text-ink">
          {isEs ? "Configurar Autenticación de Dos Factores" : "Set Up Two-Factor Authentication"}
        </h3>

        {error && (
          <div className="mb-4 rounded-md bg-crit-soft p-3 text-sm text-crit border border-crit/20">
            {error}
          </div>
        )}

        {step === "LOADING" && (
          <div className="py-8 text-center text-sm text-ink-3">
            {isEs ? "Generando código seguro..." : "Generating secure code..."}
          </div>
        )}

        {step === "SETUP" && (
          <div className="animate-in fade-in">
            <p className="mb-4 text-sm text-ink-2">
              {isEs 
                ? "1. Escanea este código QR con Google Authenticator o Authy." 
                : "1. Scan this QR code with Google Authenticator or Authy."}
            </p>
            
            <div className="mb-4 flex justify-center rounded-lg border border-rule bg-surface-2 p-4">
              {otpAuthUrl ? (
                <QRCodeSVG value={otpAuthUrl} size={200} level="M" includeMargin={false} />
              ) : (
                <div className="h-[200px] w-[200px] bg-surface-2 animate-pulse rounded-md border border-rule"></div>
              )}
            </div>

            <div className="mb-4 text-center">
              <span className="text-xs text-ink-3">{isEs ? "¿No puedes escanearlo? Usa este código:" : "Can't scan it? Use this code:"}</span>
              <div className="mt-1 font-mono text-sm font-bold tracking-widest text-ink">{secretStr}</div>
            </div>

            <p className="mb-2 text-sm text-ink-2">
              {isEs ? "2. Ingresa el código de 6 dígitos de tu aplicación:" : "2. Enter the 6-digit code from your app:"}
            </p>
            <input 
              type="text" 
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              placeholder="123456"
              className="mb-4 w-full rounded-md border border-rule bg-surface px-3 py-3 text-center font-mono text-lg tracking-widest text-ink outline-none focus:border-accent"
            />

            <div className="flex justify-end gap-2">
              <button onClick={onClose} className="rounded-md border border-rule bg-surface px-4 py-2 text-sm font-semibold text-ink-2 hover:bg-surface-2 transition-colors">
                {isEs ? "Cancelar" : "Cancel"}
              </button>
              <button 
                onClick={handleVerify}
                disabled={code.length < 6 || isVerifying}
                className="rounded-md bg-accent px-4 py-2 text-sm font-bold text-accent-ink hover:opacity-90 disabled:opacity-50 transition-opacity"
              >
                {isVerifying ? (isEs ? "Verificando..." : "Verifying...") : (isEs ? "Verificar y Activar" : "Verify & Enable")}
              </button>
            </div>
          </div>
        )}

        {step === "RECOVERY" && (
          <div className="animate-in fade-in">
            <div className="mb-4 flex items-center gap-2 text-success">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-success-soft">✓</div>
              <span className="font-bold">{isEs ? "2FA Activado Exitosamente" : "2FA Enabled Successfully"}</span>
            </div>
            
            <p className="mb-4 text-sm text-ink-2">
              {isEs 
                ? "Guarda estos códigos de recuperación en un lugar seguro. Son la única forma de acceder a tu cuenta si pierdes tu dispositivo." 
                : "Save these recovery codes in a safe place. They are the only way to access your account if you lose your device."}
            </p>

            <div className="mb-6 grid grid-cols-2 gap-2 rounded-lg bg-surface-2 border border-rule p-4 font-mono text-sm">
              {recoveryCodes.map((rc, idx) => (
                <div key={idx} className="text-ink">{rc}</div>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <button 
                onClick={downloadCodes}
                className="flex w-full items-center justify-center gap-2 rounded-md border border-rule bg-surface px-4 py-2 text-sm font-bold text-ink transition-colors hover:bg-surface-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                {isEs ? "Descargar codigos (.txt)" : "Download codes (.txt)"}
              </button>
              <button 
                onClick={handleComplete}
                className="w-full rounded-md bg-accent px-4 py-2 text-sm font-bold text-accent-ink transition-opacity hover:opacity-90"
              >
                {isEs ? "He guardado mis codigos" : "I have saved my codes"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}