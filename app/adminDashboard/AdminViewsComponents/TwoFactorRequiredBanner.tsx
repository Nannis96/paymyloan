"use client";

import { useState } from "react";
import { useSite } from "@/app/components/layout/SiteShell";
import TwoFactorSetupModal from "@/app/components/dashboards/settings/TwoFactorSetupModal";

// Aviso para un 403 TWO_FACTOR_REQUIRED: abre el alta de 2FA ahi mismo.
// El back lee isTwoFactorEnabled de la BD en cada escritura, asi que al
// terminar basta con repetir la accion (no hace falta renovar la sesion).
export function TwoFactorRequiredBanner({ onEnabled }: { onEnabled: () => void }) {
  const { t } = useSite();
  const u = t.adminUsersList;
  const [open, setOpen] = useState(false);

  return (
    <div role="alert" className="mb-4 flex flex-col gap-3 rounded-lg border border-amber/30 bg-amber-soft px-4 py-3 text-[13px] text-ink sm:flex-row sm:items-center sm:justify-between">
      <span>{u.errorTwoFactor}</span>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="shrink-0 rounded-lg bg-accent px-4 py-2 text-xs font-bold text-accent-ink transition-opacity hover:opacity-90"
      >
        {u.enable2fa}
      </button>
      <TwoFactorSetupModal isOpen={open} onClose={() => setOpen(false)} onSuccess={onEnabled} />
    </div>
  );
}
