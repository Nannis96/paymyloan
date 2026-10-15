import { api } from "./apiFetch";
import type { Message, Paginated } from "@/app/types/api";

// El back pagina el hilo en orden ascendente (la pagina 1 es la mas vieja),
// asi que traemos las ultimas 2 paginas de 100 para ver siempre lo reciente.
// ponytail: tope 200 mensajes visibles; "cargar anteriores" si hace falta mas.
export async function fetchLatestMessages(url: string): Promise<Message[]> {
  const sep = url.includes("?") ? "&" : "?";
  const first = await api<Paginated<Message>>(`${url}${sep}pageSize=100`);
  const { totalPages } = first;
  if (totalPages <= 1) return first.items;
  const last = await api<Paginated<Message>>(`${url}${sep}pageSize=100&page=${totalPages}`);
  if (totalPages === 2) return [...first.items, ...last.items];
  const prev = await api<Paginated<Message>>(`${url}${sep}pageSize=100&page=${totalPages - 1}`);
  return [...prev.items, ...last.items];
}
