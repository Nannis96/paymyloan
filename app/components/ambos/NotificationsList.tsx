"use client";
import { useCallback, useEffect, useState } from "react";
import { useSite } from "@/app/components/layout/SiteShell";
import { api, ApiError } from "@/app/lib/apiFetch";
import { API_ROUTES } from "@/app/lib/endpoints";
import type { Notification, Paginated } from "@/app/types/api";

const PAGE_SIZE = 20;
// La campana del header escucha este evento para refrescar su contador.
export const EVENTO_NOTIFICACIONES = "pml:notifications";
const avisarCampana = () => window.dispatchEvent(new Event(EVENTO_NOTIFICACIONES));

// Listado compartido borrower/lender: el back ya filtra por el usuario de la sesión.
export default function NotificationsList() {
  const { t, lang } = useSite();
  const n = t.notifications; // { title, markRead, empty }
  const isEs = lang === "es";

  const [soloNoLeidas, setSoloNoLeidas] = useState(false);
  const [items, setItems] = useState<Notification[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const cargar = useCallback(
    async (p: number) => {
      setCargando(true);
      setError("");
      try {
        const qs = new URLSearchParams({ page: String(p), pageSize: String(PAGE_SIZE) });
        if (soloNoLeidas) qs.set("isRead", "false");
        const d = await api<Paginated<Notification>>(`${API_ROUTES.notifications.base}?${qs}`);
        setItems((prev) => (p === 1 ? d.items : [...prev, ...d.items]));
        setPage(d.page);
        setTotalPages(d.totalPages);
      } catch (e) {
        setError(e instanceof ApiError || e instanceof Error ? e.message : "Error");
      } finally {
        setCargando(false);
      }
    },
    [soloNoLeidas],
  );

  useEffect(() => {
    cargar(1);
  }, [cargar]);

  const marcar = async (id: string) => {
    try {
      await api(API_ROUTES.notifications.read(id), { method: "POST" });
      setItems((prev) =>
        soloNoLeidas
          ? prev.filter((i) => i.id !== id)
          : prev.map((i) => (i.id === id ? { ...i, isRead: true } : i)),
      );
      avisarCampana();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
    }
  };

  const marcarTodas = async () => {
    try {
      await api(API_ROUTES.notifications.readAll, { method: "POST" });
      setItems((prev) => (soloNoLeidas ? [] : prev.map((i) => ({ ...i, isRead: true }))));
      avisarCampana();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
    }
  };

  const tabs = [
    { unread: false, label: isEs ? "Todas" : "All" },
    { unread: true, label: isEs ? "Sin leer" : "Unread" },
  ];

  return (
    <div className="animate-in fade-in duration-300 max-w-[680px]">
      <div className="mb-[20px] flex items-center justify-between">
        <div className="text-[20px] font-[800] tracking-[-0.3px] text-[#0a2540]">{n.title}</div>
        <button
          onClick={marcarTodas}
          className="cursor-pointer border-none bg-transparent text-[12px] font-[600] text-[#635bff] hover:underline"
        >
          {n.markRead}
        </button>
      </div>

      <div className="mb-[20px] flex gap-[6px]">
        {tabs.map((tab) => (
          <button
            key={String(tab.unread)}
            onClick={() => setSoloNoLeidas(tab.unread)}
            className={`cursor-pointer rounded-[20px] px-[14px] py-[6px] text-[12px] font-[600] transition-colors ${
              soloNoLeidas === tab.unread
                ? "border-[1.5px] border-[#635bff] bg-[#635bff] text-white"
                : "border-[1.5px] border-[#e6ebf1] bg-white text-[#425466] hover:bg-[#f6f9fc]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {error && <div className="mb-[12px] text-[12px] text-[#dc2626]">{error}</div>}

      {!cargando && !error && items.length === 0 && (
        <div className="py-[40px] text-center text-[13px] text-[#8898aa]">{n.empty}</div>
      )}

      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => !item.isRead && marcar(item.id)}
          className={`relative mb-[8px] flex gap-[12px] rounded-[8px] border bg-white p-[14px_16px] transition-shadow hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)] ${
            item.isRead ? "border-[#e6ebf1]" : "cursor-pointer border-[#e6ebf1] border-l-[3px] border-l-[#635bff]"
          }`}
        >
          <div className="flex-1">
            <div className={`mb-[3px] text-[13px] font-[700] ${item.isRead ? "text-[#0a2540]" : "text-[#635bff]"}`}>
              {item.title}
            </div>
            <div className="text-[12px] leading-[1.5] text-[#8898aa]">{item.body}</div>
          </div>
          <div className="mt-[2px] whitespace-nowrap text-[11px] text-[#aab7c4]">
            {new Date(item.createdAt).toLocaleDateString(isEs ? "es" : "en", {
              day: "numeric",
              month: "short",
            })}
          </div>
          {!item.isRead && (
            <div className="absolute right-[14px] top-[16px] h-[7px] w-[7px] rounded-full bg-[#635bff]" />
          )}
        </div>
      ))}

      {page < totalPages && (
        <button
          disabled={cargando}
          onClick={() => cargar(page + 1)}
          className="mt-[8px] cursor-pointer rounded-[5px] border border-[#e6ebf1] bg-white px-[14px] py-[7px] text-[12px] font-[600] text-[#425466] hover:bg-[#f6f9fc] disabled:opacity-50"
        >
          {isEs ? "Cargar más" : "Load more"}
        </button>
      )}
    </div>
  );
}
