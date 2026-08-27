/**
 * Envía cada alta del formulario al CRM (GoHighLevel/LeadConnector) vía
 * webhook, en paralelo al registro real. Es best-effort: un fallo de red
 * aquí no debe impedir ni retrasar el alta del usuario.
 */

import type { Intent } from "./registro";

const CRM_WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/sD7ANbPAIA28p65ZSvJl/webhook-trigger/bb968ebd-585e-4733-b5ab-19b1daeed28d";

export type CRMPayload = {
  intent: Intent;
  nombre: string;
  correo: string;
  telefono: string;
  password: string;
  passwordConfirm: string;
  aceptaTerminos: true;
  idioma: "es" | "en";
};

export async function enviarCRM(payload: CRMPayload): Promise<void> {
  try {
    await fetch(CRM_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    // Silencioso a propósito: el CRM no debe bloquear el registro.
  }
}
