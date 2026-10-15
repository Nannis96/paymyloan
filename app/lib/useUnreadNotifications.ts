"use client";
import { useEffect, useState } from "react";
import { api } from "./apiFetch";
import { API_ROUTES } from "./endpoints";

// El listado de notificaciones dispara este evento al marcar leídas, para que
// el punto de la campana se apague sin esperar al siguiente poll.
export const NOTIFICATIONS_EVENT = "pml:notifications";

export function useUnreadNotifications(pollMs = 30_000) {
  const [unread, setUnread] = useState(0);
  useEffect(() => {
    const load = () =>
      api<{ unread: number }>(API_ROUTES.notifications.unreadCount)
        .then((d) => setUnread(d.unread ?? 0))
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
