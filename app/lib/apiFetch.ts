// fetch autenticado: añade el token, Content-Type JSON si hay body y,
// ante un 401, limpia la sesion y manda a /login.
export async function apiFetch(url: string, init: RequestInit = {}) {
  const token = localStorage.getItem("accessToken") || "";
  const res = await fetch(url, {
    ...init,
    headers: {
      ...(init.body ? { "Content-Type": "application/json" } : {}),
      Authorization: `Bearer ${token}`,
      ...init.headers,
    },
  });
  if (res.status === 401) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
  }
  return res;
}

// Las listas llegan como `data: [...]` o `data: { items: [...] }`.
export const toList = <T = unknown>(data: unknown): T[] =>
  Array.isArray(data) ? data : (data as { items?: T[] } | undefined)?.items || [];
