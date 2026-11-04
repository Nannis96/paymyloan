"use client";
import { useCallback, useEffect, useState } from "react";
import { api, ApiError } from "./apiFetch";
import { API_ROUTES } from "./endpoints";
import type { MyAffiliate } from "@/app/types/api";

export const fmtCents = (c = 0, currency = "USD") =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: currency.toUpperCase() }).format(c / 100);

export const fmtDate = (d: string | null | undefined, lang: string) =>
  d ? new Date(d).toLocaleDateString(lang === "es" ? "es-MX" : "en-US", { year: "numeric", month: "short", day: "numeric" }) : "—";

export const fmtTerms = (type?: string | null, value?: string | number | null) =>
  !type || value == null ? "—" : type === "PERCENT" ? `${Number(value)}%` : fmtCents(Math.round(Number(value) * 100));

// Carga GET /affiliates/me y expone apply / deactivate. Errores como texto.
export function useAffiliate() {
  const [me, setMe] = useState<MyAffiliate | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const reload = useCallback(async () => {
    try {
      setMe(await api<MyAffiliate>(API_ROUTES.affiliates.me));
      setError(null);
    } catch (e) {
      // 404 = el back aun no tiene el modulo o no hay perfil: se trata como "no afiliado", sin error.
      if (e instanceof ApiError && e.status === 404) setMe({ isAffiliate: false, status: null });
      else setError(e instanceof Error ? e.message : "error");
    }
  }, []);
  useEffect(() => { void reload(); }, [reload]);

  const run = async (url: string, method: string) => {
    setBusy(true);
    try {
      await api(url, { method });
      await reload();
    } catch (e) {
      setError(e instanceof Error ? e.message : "error");
    } finally {
      setBusy(false);
    }
  };
  return {
    me, error, busy, reload,
    apply: () => run(API_ROUTES.affiliates.meApply, "POST"),
    deactivate: () => run(API_ROUTES.affiliates.me, "DELETE"),
  };
}

// Textos del modulo (ES/EN) en un solo lugar.
const T = {
  es: {
    portal: "Portal de Afiliados", dashboard: "Tablero", earnings: "Comisiones", referrals: "Mis Referidos",
    share: "Compartir", account: "Cuenta", payouts: "Pagos", loading: "Cargando…", empty: "Sin registros.",
    prev: "Anterior", next: "Siguiente",
    joinTitle: "Conviértete en afiliado", joinText: "Comparte tu enlace y gana una comisión cuando quien te use se suscriba como prestatario.",
    apply: "Solicitar ser afiliado", reapply: "Volver a solicitar", pending: "Tu solicitud está en revisión.",
    rejected: "Tu solicitud fue rechazada.", suspended: "Tu cuenta de afiliado está suspendida.", inactive: "Dejaste de ser afiliado.",
    reason: "Motivo", referralsCount: "Referidos", subscribed: "Suscritos", pendingPay: "Por cobrar", paid: "Pagado",
    link: "Enlace de referido", code: "Código", copy: "Copiar", copied: "¡Copiado!", shareHelp: "Quien se registre con este enlace queda ligado a ti.",
    terms: "Tu comisión", delay: "Días para pago", immediate: "Inmediato", days: "días",
    deactivate: "Dejar de ser afiliado", deactivateConfirm: "¿Dejar de ser afiliado? Las comisiones pendientes se conservan.",
    name: "Nombre", joined: "Registro", status: "Estado", yes: "Suscrito", no: "Sin suscripción",
    amount: "Comisión", base: "Base", payableAt: "Pagable desde", paidAt: "Pagada", ref: "Referencia", all: "Todas",
    PENDING: "Pendiente", PAID: "Pagada", VOID: "Anulada", APPROVED: "Aprobado", REJECTED: "Rechazado", SUSPENDED: "Suspendido", INACTIVE: "Inactivo",
    unavailable: "El programa de afiliados no está disponible por ahora.",
  },
  en: {
    portal: "Affiliate Portal", dashboard: "Dashboard", earnings: "Commissions", referrals: "My Referrals",
    share: "Share", account: "Account", payouts: "Payouts", loading: "Loading…", empty: "No records.",
    prev: "Previous", next: "Next",
    joinTitle: "Become an affiliate", joinText: "Share your link and earn a commission when someone you refer subscribes as a borrower.",
    apply: "Apply to be an affiliate", reapply: "Apply again", pending: "Your application is under review.",
    rejected: "Your application was rejected.", suspended: "Your affiliate account is suspended.", inactive: "You are no longer an affiliate.",
    reason: "Reason", referralsCount: "Referrals", subscribed: "Subscribed", pendingPay: "Pending payout", paid: "Paid",
    link: "Referral link", code: "Code", copy: "Copy", copied: "Copied!", shareHelp: "Anyone who signs up with this link is tied to you.",
    terms: "Your commission", delay: "Payout delay", immediate: "Immediate", days: "days",
    deactivate: "Stop being an affiliate", deactivateConfirm: "Stop being an affiliate? Pending commissions are kept.",
    name: "Name", joined: "Joined", status: "Status", yes: "Subscribed", no: "Not subscribed",
    amount: "Commission", base: "Base", payableAt: "Payable from", paidAt: "Paid", ref: "Reference", all: "All",
    PENDING: "Pending", PAID: "Paid", VOID: "Void", APPROVED: "Approved", REJECTED: "Rejected", SUSPENDED: "Suspended", INACTIVE: "Inactive",
    unavailable: "The affiliate program is not available right now.",
  },
} as const;
export const affText = (lang: string) => (lang === "es" ? T.es : T.en);
