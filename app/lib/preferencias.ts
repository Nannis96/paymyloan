/**
 * Preferencias del visitante (idioma y tema) guardadas en localStorage.
 *
 * Se exponen como un store externo para consumirlas con useSyncExternalStore:
 * React usa el snapshot del servidor durante la hidratación y sólo después
 * aplica el valor guardado, así que no hay desajuste de hidratación ni
 * setState dentro de un efecto.
 */

type Listener = () => void;

const listeners = new Set<Listener>();

export function suscribir(listener: Listener) {
  listeners.add(listener);
  // "storage" sólo se dispara en las otras pestañas; la propia se entera por emitir().
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function emitir() {
  for (const listener of listeners) listener();
}

export function leer(clave: string): string | null {
  try {
    return localStorage.getItem(clave);
  } catch {
    // Modo privado o almacenamiento bloqueado: se opera con los valores por defecto.
    return null;
  }
}

export function escribir(clave: string, valor: string) {
  try {
    localStorage.setItem(clave, valor);
  } catch {
    /* se ignora: la preferencia simplemente no persiste */
  }
  emitir();
}

/** El sistema operativo también es un store externo. */
export function suscribirEsquemaOscuro(listener: Listener) {
  const consulta = window.matchMedia("(prefers-color-scheme: dark)");
  consulta.addEventListener("change", listener);
  return () => consulta.removeEventListener("change", listener);
}

export const esquemaOscuroDelSistema = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches;
