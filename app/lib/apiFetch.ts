import { API_ROUTES } from "./endpoints";

const cerrarSesion = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  window.location.href = "/login";
};

// El back rota el refresh token en cada uso (reusar uno viejo revoca toda la
// cadena), asi que las llamadas concurrentes comparten una sola renovacion.
let refrescando: Promise<boolean> | null = null;

function renovarSesion(): Promise<boolean> {
  refrescando ??= (async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) return false;
      const res = await fetch(API_ROUTES.auth.refresh, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });
      if (!res.ok) return false;
      const { data } = await res.json();
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      return true;
    } catch {
      return false;
    } finally {
      refrescando = null;
    }
  })();
  return refrescando;
}

// fetch autenticado: anade el token y Content-Type JSON si hay body. Ante un
// 401 intenta renovar la sesion y reintenta una vez; si falla, manda a /login.
export async function apiFetch(url: string, init: RequestInit = {}) {
  const enviar = () =>
    fetch(url, {
      ...init,
      headers: {
        ...(init.body ? { "Content-Type": "application/json" } : {}),
        Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
        ...init.headers,
      },
    });
  let res = await enviar();
  if (res.status === 401) {
    if (await renovarSesion()) res = await enviar();
    if (res.status === 401) cerrarSesion();
  }
  return res;
}

// Las listas llegan como `data: [...]` o `data: { items: [...] }`.
export const toList = <T = unknown>(data: unknown): T[] =>
  Array.isArray(data) ? data : (data as { items?: T[] } | undefined)?.items || [];

// Error tipado del back: `{ error: { code, message } }`.
export class ApiError extends Error {
  constructor(public status: number, public code: string, message: string) {
    super(message);
  }
}

// Llama con apiFetch, devuelve `data` ya parseado o lanza ApiError.
// Uso: const lista = toList(await api<unknown>(API_ROUTES.users.base));
export async function api<T = unknown>(url: string, init: RequestInit = {}): Promise<T> {
  const res = await apiFetch(url, init);
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const e = json?.error;
    throw new ApiError(res.status, e?.code || "UNKNOWN", e?.message || res.statusText);
  }
  return (json?.data ?? json) as T;
}
