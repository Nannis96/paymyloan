"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";
import { api } from "@/app/lib/apiFetch";
import { API_ROUTES } from "@/app/lib/endpoints";
import { HOME_BY_ROLE, roleForPath } from "@/app/lib/roles";
import { useSite } from "./SiteShell";

const POLL_MS = 60_000;

export default function NotificationBell() {
  const { t } = useSite();
  const pathname = usePathname();
  const role = roleForPath(pathname);
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    if (!role) return;
    const cargar = () =>
      api<{ unread: number }>(API_ROUTES.notifications.unreadCount)
        .then((d) => setUnread(d.unread ?? 0))
        .catch(() => {}); // el badge es accesorio: ante error se queda como estaba
    cargar();
    const id = setInterval(cargar, POLL_MS);
    window.addEventListener("pml:notifications", cargar); // el listado marcó leídas
    return () => {
      clearInterval(id);
      window.removeEventListener("pml:notifications", cargar);
    };
  }, [role]);

  if (!role) return null;
  return (
    <Link
      href={`${HOME_BY_ROLE[role]}/notifications`}
      aria-label={t.nav.notifications}
      className="relative flex h-11 w-11 items-center justify-center rounded-[2px] border border-rule text-ink-2 transition-colors hover:border-accent hover:text-accent"
    >
      <Bell aria-hidden className="h-[18px] w-[18px]" />
      {unread > 0 && (
        <span className="absolute -right-1 -top-1 min-w-[18px] rounded-full bg-crit px-1 text-center text-[11px] font-semibold leading-[18px] text-white">
          {unread > 99 ? "99+" : unread}
        </span>
      )}
    </Link>
  );
}
