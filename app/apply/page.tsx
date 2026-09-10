"use client";

import { useState } from "react";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import { UploadCloud } from "lucide-react";

function VettingApplicationContent() {
  const { t } = useSite();
  const v = t.vetting;

  const [dealHistory, setDealHistory] = useState("");
  const [consentCredit, setConsentCredit] = useState(false);
  const [consentBackground, setConsentBackground] = useState(false);

  const handlePaymentAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentCredit || !consentBackground) {
      alert(v.form.consentAlert);
      return;
    }
    // TODO: BACKEND - Integrar Stripe Checkout (o componente similar)
    console.log("Iniciando pago y subida de documentos con historial:", dealHistory);
  };

  const UploadBox = ({ label }: { label: string }) => (
    <div className="flex flex-col gap-2">
      <label className="text-[11px] font-bold uppercase tracking-widest text-ink-3">
        {label}
      </label>
      <div className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-rule bg-surface-2 py-8 transition-colors hover:border-accent hover:bg-accent-soft/10">
        <UploadCloud className="mb-2 h-6 w-6 text-ink-3" />
        <span className="text-xs text-ink-3">{v.form.selectFile}</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-bg p-6 lg:p-14 flex items-center justify-center">
      <div className="w-full max-w-[600px] rounded-2xl border border-rule bg-surface p-8 shadow-xl sm:p-12">
        <header className="mb-8 text-center">
          <h1 className="text-[28px] font-black tracking-tight text-ink">{v.title}</h1>
          <p className="text-ink-2 mt-2">{v.subtitle}</p>
        </header>

        <form onSubmit={handlePaymentAndSubmit} className="flex flex-col gap-6">
          <UploadBox label={v.form.entityDocs} />
          <UploadBox label={v.form.bankStatements} />
          <UploadBox label={v.form.idUpload} />

          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold uppercase tracking-widest text-ink-3">
              {v.form.dealHistory}
            </label>
            <textarea
              value={dealHistory}
              onChange={(e) => setDealHistory(e.target.value)}
              placeholder={v.form.dealHistoryPh}
              className="w-full rounded-lg border border-rule bg-surface-2 px-4 py-3 text-[14px] text-ink outline-none transition-colors focus:border-accent min-h-[100px]"
              required
            />
          </div>

          <div className="flex flex-col gap-3 rounded-lg border border-rule bg-surface-2 p-5">
            <label className="flex cursor-pointer items-start gap-3 text-sm text-ink-2">
              <input
                type="checkbox"
                checked={consentCredit}
                onChange={(e) => setConsentCredit(e.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 rounded border-rule text-accent focus:ring-accent"
              />
              <span dangerouslySetInnerHTML={{ __html: v.form.consentCredit.replace('Credit Pull', '<strong>Credit Pull</strong>').replace('verificacion de credito', '<strong>verificacion de credito</strong>') }} />
            </label>
            <label className="flex cursor-pointer items-start gap-3 text-sm text-ink-2">
              <input
                type="checkbox"
                checked={consentBackground}
                onChange={(e) => setConsentBackground(e.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 rounded border-rule text-accent focus:ring-accent"
              />
              <span dangerouslySetInnerHTML={{ __html: v.form.consentBackground.replace('Background Check', '<strong>Background Check</strong>').replace('verificacion de antecedentes', '<strong>verificacion de antecedentes</strong>') }} />
            </label>
          </div>

          <div className="mt-4 flex flex-col items-center gap-3">
            <span className="text-sm font-bold text-ink-2">{v.feeNotice}: <span className="text-accent text-lg">$99.00</span></span>
            <button
              type="submit"
              className="w-full rounded-lg bg-accent px-5 py-4 text-[15px] font-bold text-accent-ink transition-opacity hover:opacity-90 shadow-md"
            >
              {v.form.submitAndPay}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function VettingApplicationPage() {
  return (
    <SiteShell isDashboard={true}>
      <VettingApplicationContent />
    </SiteShell>
  );
}