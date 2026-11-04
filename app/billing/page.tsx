"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import { Lock } from "lucide-react";
import { api } from "@/app/lib/apiFetch";
import { API_ROUTES } from "@/app/lib/endpoints";
import type { SubscriptionView } from "@/app/types/api";

export default function BillingPage() {
  return (
    <SiteShell isDashboard={true}>
      <BillingContent />
    </SiteShell>
  );
}

function BillingContent() {
  const { t, lang } = useSite();
  const b = t.billing;
  const isEs = lang === "es";

  const [sub, setSub] = useState<SubscriptionView | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api<SubscriptionView>(API_ROUTES.subscription.me).then(setSub).catch((e) => setError(e.message));
  }, []);

  const act = async (url: string) => {
    setBusy(true);
    setError(null);
    try {
      await api(url, { method: "POST" });
      setSub(await api<SubscriptionView>(API_ROUTES.subscription.me));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
    } finally {
      setBusy(false);
    }
  };

  const fmt = (d: string) => new Date(d).toLocaleDateString(isEs ? "es" : "en");
  // Precio del back (SUBSCRIPTION_PRICE_CENTS); los textos de content/ traen "$9" fijo.
  const price = sub ? new Intl.NumberFormat(isEs ? "es" : "en", { style: "currency", currency: sub.currency }).format(sub.priceCents / 100) : "";
  const px = (text: string) => (sub ? text.replace(/\$9(\.00)?/, price) : text.replace(/\$9(\.00)?/, "…"));
  const end = sub?.currentPeriodEnd ? fmt(sub.currentPeriodEnd) : "";
  const paid = sub?.status === "ACTIVE" && !!sub.currentPeriodEnd;
  const cancelledWithAccess = sub?.status === "CANCELLED" && sub.hasAccess;
  const status = !sub ? ""
    : paid ? (isEs ? `✓ Suscrito. Próximo cobro: ${end}.` : `✓ Subscribed. Next charge: ${end}.`)
    : cancelledWithAccess ? (isEs ? `Cancelada. Conservas el acceso hasta ${end}.` : `Cancelled. You keep access until ${end}.`)
    : sub.status === "TRIALING" && sub.hasAccess ? (isEs ? `Prueba gratuita: ${sub.daysLeftInTrial} días restantes.` : `Free trial: ${sub.daysLeftInTrial} days left.`)
    : (isEs ? "Sin suscripción activa. Puedes seguir pagando tus préstamos actuales, pero no pedir nuevos tratos." : "No active subscription. You can still pay your current loans, but not request new deals.");
  const payLabel = paid ? (isEs ? "Pagar un mes más" : "Pay one more month")
    : sub?.status === "CANCELLED" || (sub && !sub.hasAccess) ? (isEs ? "Reactivar suscripción" : "Reactivate subscription")
    : px(b.payBtn);

  return (
    <div className="min-h-screen bg-bg p-6 lg:p-14 flex items-center justify-center">
      <div className="w-full max-w-[500px]">
        <Link
          href="/borrowerDashboard"
          className="mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-ink-3 transition-colors hover:text-accent"
        >
          <span>&larr;</span> {isEs ? "Volver" : "Back"}
        </Link>

        <div className="rounded-2xl border border-rule bg-surface p-8 shadow-xl sm:p-10">
          <header className="mb-8 text-center border-b border-rule pb-6">
            <h1 className="text-[28px] font-black tracking-tight text-ink">{b.title}</h1>
            <p className="text-ink-2 mt-2 text-sm leading-relaxed">{px(b.subtitle)}</p>
          </header>

          <div className="mb-6 flex items-center justify-between rounded-xl bg-surface-2 p-5 border border-rule">
            <div>
              <div className="text-[13px] font-bold text-ink">{b.planName}</div>
              <div className="text-[11px] text-ink-3 mt-1">{status}</div>
            </div>
            <div className="text-lg font-black text-accent">{px(b.planPrice)}</div>
          </div>

          {error && <p className="mb-4 text-center text-[13px] text-crit">{error}</p>}

          {sub?.billingMode === "stripe" ? (
            // ponytail: Stripe Checkout es la etapa 2 del back (/pay hoy responde 409 en este modo).
            <p className="text-center text-[13px] text-ink-3">{isEs ? "El cobro con tarjeta estará disponible pronto." : "Card payments coming soon."}</p>
          ) : (
            <button
              onClick={() => act(API_ROUTES.subscription.pay)}
              disabled={busy || !sub}
              className="w-full rounded-lg bg-accent px-5 py-4 text-[15px] font-bold text-accent-ink transition-opacity hover:opacity-90 shadow-md disabled:opacity-50"
            >
              {busy ? b.processing : payLabel}
            </button>
          )}

          {sub?.billingMode === "simulated" && (
            <p className="mt-3 text-center text-[11px] text-ink-3">{isEs ? "Modo de pruebas: cada pago cubre un mes y no se renueva solo." : "Test mode: each payment covers one month and does not auto-renew."}</p>
          )}

          {paid && (
            <button
              onClick={() => act(API_ROUTES.subscription.cancel)}
              disabled={busy}
              className="mt-3 w-full text-center text-[12px] font-bold text-ink-3 hover:text-crit disabled:opacity-50"
            >
              {isEs ? "Cancelar suscripción" : "Cancel subscription"}
            </button>
          )}

          <p className="mt-6 flex items-start justify-center gap-2 text-center text-[11px] leading-relaxed text-ink-3">
            <Lock className="mt-[2px] h-3 w-3 shrink-0" />
            {b.secureNote}
          </p>
        </div>
      </div>
    </div>
  );
}
