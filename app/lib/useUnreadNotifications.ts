"use client";
import { useEffect, useState } from "react";
import { api } from "./apiFetch";
import { API_ROUTES } from "./endpoints";
import type { Notification, Paginated } from "@/app/types/api";

// El listado de notificaciones dispara este evento al marcar leídas, para que
// el punto de la campana se apague sin esperar al siguiente poll.
export const NOTIFICATIONS_EVENT = "pml:notifications";

export function useUnreadNotifications(pollMs = 30_000) {
  const [unread, setUnread] = useState(0);
  useEffect(() => {
    const load = () =>
      // ponytail: unread-count no filtra por tipo y los mensajes tienen su
      // propio punto; se cuentan las no leidas (max 100) sin MESSAGE_RECEIVED.
      api<Paginated<Notification>>(`${API_ROUTES.notifications.base}?isRead=false&pageSize=100`)
        .then((d) => setUnread(d.items.filter((i) => i.type !== "MESSAGE_RECEIVED").length))
        .catch(() => {}); // el badge es accesorio: ante error se queda como estaba
    load();
    const tick = () => !document.hidden && load();
    const id = setInterval(tick, pollMs);
    document.addEventListener("visibilitychange", tick);
    window.addEventListener(NOTIFICATIONS_EVENT, load);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", tick);
      window.removeEventListener(NOTIFICATIONS_EVENT, load);
    };
  }, [pollMs]);
  return unread;
}
