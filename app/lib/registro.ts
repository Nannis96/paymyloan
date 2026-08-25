/**
 * Único punto de salida del formulario de alta.
 *
 * La landing es solo front: el backend de PayMyLoan todavía no existe.
 * Mientras NEXT_PUBLIC_REGISTRO_ENDPOINT esté vacío, esta función valida el
 * contrato y simula la respuesta, sin enviar nada. Cuando exista el endpoint
 * basta con poblarlo en .env: no hay que tocar el componente.
 */

export type Intent = "lender" | "borrower";

export type RegistroPayload = {
  intent: Intent;
  nombre: string;
  correo: string;
  telefono: string;
  password: string;
  aceptaTerminos: true;
  /** Idioma en el que se dio de alta: define en qué idioma se le escribe. */
  idioma: "es" | "en";
};

export type RegistroResult = { ok: true } | { ok: false; error: string };

const endpoint = process.env.NEXT_PUBLIC_REGISTRO_ENDPOINT;

export async function registrarUsuario(
  payload: RegistroPayload,
): Promise<RegistroResult> {
  if (!endpoint) {
    await new Promise((resolve) => setTimeout(resolve, 700));
    if (process.env.NODE_ENV !== "production") {
      // La contraseña nunca se registra en consola, ni en desarrollo.
      const { password: _omitida, ...seguro } = payload;
      void _omitida;
      console.info("[registro] sin endpoint configurado, payload:", seguro);
    }
    return { ok: true };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) return { ok: false, error: `HTTP ${response.status}` };
    return { ok: true };
  } catch {
    return { ok: false, error: "network" };
  }
}

export const REGISTRO_SIMULADO = !endpoint;
