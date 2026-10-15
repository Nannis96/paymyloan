"use client";
import { useEffect, useState } from "react";
import { api, toList } from "./apiFetch";
import { API_ROUTES } from "./endpoints";
import type { MessageThread } from "@/app/types/api";

// Evento que las vistas de mensajes disparan al marcar un hilo leido, para
// que el punto del header se apague sin esperar al siguiente poll.
export const MESSAGES_READ_EVENT = "pml:messages-read";

// ponytail: polling; se reemplaza por el unread-count de notificaciones (T8.1).
export function useUnreadMessages(role: "lender" | "borrower", pollMs = 8000) {
  const [unread, setUnread] = useState(0);
  useEffect(() => {
    const url = role === "lender" ? API_ROUTES.lenders.meMessageThreads : API_ROUTES.borrowers.meMessageThreads;
    const load = () =>
      api(url)
        .then((d) => setUnread(toList<MessageThread>(d).reduce((n, th) => n + th.unreadCount, 0)))
        .catch(() => {});
    load();
    const id = setInterval(() => !document.hidden && load(), pollMs);
    window.addEventListener(MESSAGES_READ_EVENT, load);
    return () => {
      clearInterval(id);
      window.removeEventListener(MESSAGES_READ_EVENT, load);
    };
  }, [role, pollMs]);
  return unread;
}
