"use client";

import { useState, useEffect, useMemo } from "react";
import { useSite } from "@/app/components/layout/SiteShell";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

// Interfaces basadas en la API de Notificaciones
interface NotificationItem {
  id: string;
  type: string;
  title: string;
  body: string;
  relatedEntityType: string;
  relatedEntityId: string | null;
  isRead: boolean;
  createdAt: string;
}

export default function NotificationsView() {
  const { t, lang } = useSite();
  const n = t.notifications;
  const isEs = lang === "es";

  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const tabs = [
    { id: "all", label: isEs ? "Todas" : "All" },
    { id: "offers", label: isEs ? "Ofertas" : "Offers" },
    { id: "closing", label: isEs ? "Cierres" : "Closing" },
    { id: "payments", label: isEs ? "Pagos" : "Payments" },
    { id: "alerts", label: isEs ? "Alertas" : "Alerts" }
  ];

  // Obtener notificaciones al montar
  useEffect(() => {
    async function fetchNotifications() {
      try {
        const token = localStorage.getItem("accessToken") || "";
        // Traemos las ultimas 50 notificaciones
        const res = await fetch(`${BASE_URL}/api/notifications?pageSize=50`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const json = await res.json();
        
        if (json.success && json.data?.items) {
          setNotifications(json.data.items);
        }
      } catch (err) {
        console.error("Error fetching notifications:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchNotifications();
  }, []);

  // Marcar una notificacion como leida
  const handleMarkAsRead = async (id: string, isRead: boolean) => {
    if (isRead) return; // Ya esta leida
    
    // Actualizacion optimista
    setNotifications(prev => prev.map(notif => notif.id === id ? { ...notif, isRead: true } : notif));

    try {
      const token = localStorage.getItem("accessToken") || "";
      await fetch(`${BASE_URL}/api/notifications/${id}/read`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  // Marcar TODAS como leidas
  const handleMarkAllAsRead = async () => {
    // Actualizacion optimista
    setNotifications(prev => prev.map(notif => ({ ...notif, isRead: true })));

    try {
      const token = localStorage.getItem("accessToken") || "";
      await fetch(`${BASE_URL}/api/notifications/read-all`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      console.error("Error marking all as read:", err);
    }
  };

  // Mapear los tipos de la API a las categorias visuales de tus tabs
  const getTabCategory = (type: string) => {
    if (type.includes("QUOTE")) return "offers";
    if (type.includes("CONTRACT")) return "closing";
    if (type.includes("PAYMENT")) return "payments";
    return "alerts"; // MESSAGE_RECEIVED, REJECTED, etc.
  };

  // Mapear el tipo de la API a los iconos existentes
  const getIconType = (type: string) => {
    if (type.includes("QUOTE")) return "offer";
    if (type.includes("REJECTED")) return "counter";
    if (type.includes("CONTRACT")) return "closing";
    if (type.includes("PAYMENT")) return "payment";
    return "alert";
  };

  // Filtrado y agrupacion logica
  const groupedNotifications = useMemo(() => {
    // 1. Filtrar por tab activo
    const filtered = notifications.filter(notif => {
      if (activeTab === "all") return true;
      return getTabCategory(notif.type) === activeTab;
    });

    // 2. Agrupar por fecha
    const groupsMap: Record<string, NotificationItem[]> = {
      today: [],
      yesterday: [],
      thisWeek: [],
      older: []
    };

    const now = new Date();
    const todayStr = now.toDateString();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();
    
    // Hace 7 dias
    const oneWeekAgo = new Date(now);
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    filtered.forEach(notif => {
      const date = new Date(notif.createdAt);
      const dateStr = date.toDateString();

      if (dateStr === todayStr) {
        groupsMap.today.push(notif);
      } else if (dateStr === yesterdayStr) {
        groupsMap.yesterday.push(notif);
      } else if (date > oneWeekAgo) {
        groupsMap.thisWeek.push(notif);
      } else {
        groupsMap.older.push(notif);
      }
    });

    // 3. Formatear para el renderizado
    const result = [];
    if (groupsMap.today.length > 0) result.push({ title: isEs ? "Hoy" : "Today", items: groupsMap.today });
    if (groupsMap.yesterday.length > 0) result.push({ title: isEs ? "Ayer" : "Yesterday", items: groupsMap.yesterday });
    if (groupsMap.thisWeek.length > 0) result.push({ title: isEs ? "Esta semana" : "This week", items: groupsMap.thisWeek });
    if (groupsMap.older.length > 0) result.push({ title: isEs ? "Anteriores" : "Older", items: groupsMap.older });

    return result;
  }, [notifications, activeTab, isEs]);

  // Renderizado condicional de iconos segun el tipo
  const renderIcon = (type: string) => {
    switch (type) {
      case "offer":
        return (
          <div className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-lg bg-[#f0efff] text-[#635bff]">
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M9 2l1.8 3.6 4 .6-2.9 2.8.7 4L9 11l-3.6 1.9.7-4L3.2 6.2l4-.6L9 2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg>
          </div>
        );
      case "counter":
        return (
          <div className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-lg bg-[#fef2f2] text-[#dc2626]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        );
      case "alert":
        return (
          <div className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-lg bg-[#fff8e1] text-[#b45309]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.5L1.5 13h13L8 1.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/><path d="M8 6v3M8 11v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
          </div>
        );
      case "closing":
        return (
          <div className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-lg bg-[#e8f5e9] text-[#2e7d32]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l4 4 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        );
      case "payment":
        return (
          <div className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-lg bg-[#e3f2fd] text-[#1565c0]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="4" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M2 7h12" stroke="currentColor" strokeWidth="1.3"/></svg>
          </div>
        );
      default:
        return null;
    }
  };

  const formatTimeAgo = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);

    if (diffMins < 60) return isEs ? `Hace ${diffMins}m` : `${diffMins}m ago`;
    if (diffHours < 24) return isEs ? `Hace ${diffHours}h` : `${diffHours}h ago`;
    return date.toLocaleDateString(isEs ? "es-MX" : "en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="animate-in fade-in duration-300 max-w-[680px]">
      
      {/* Header */}
      <div className="mb-[20px] flex items-center justify-between">
        <div className="text-[20px] font-[800] tracking-[-0.3px] text-[#0a2540]">
          {n.title || "Notifications"}
        </div>
        <button 
          onClick={handleMarkAllAsRead}
          className="text-[12px] font-[600] text-[#635bff] bg-transparent border-none cursor-pointer hover:underline"
        >
          {n.markRead || "Mark all as read"}
        </button>
      </div>

      {/* Tabs de Filtro */}
      <div className="mb-[20px] flex gap-[6px] overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`cursor-pointer whitespace-nowrap rounded-[20px] px-[14px] py-[6px] text-[12px] font-[600] transition-colors ${
              activeTab === tab.id
                ? "border-[1.5px] border-[#635bff] bg-[#635bff] text-white"
                : "border-[1.5px] border-[#e6ebf1] bg-white text-[#425466] hover:bg-[#f6f9fc]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Lista de Notificaciones */}
      <div>
        {isLoading ? (
          <div className="py-10 text-center text-[13px] text-[#8898aa]">Cargando notificaciones...</div>
        ) : groupedNotifications.length === 0 ? (
          <div className="py-10 text-center text-[13px] text-[#8898aa]">{n.empty || "No hay notificaciones."}</div>
        ) : (
          groupedNotifications.map((group, gIdx) => (
            <div key={gIdx}>
              <div className="mb-[8px] mt-[20px] text-[10px] font-[700] uppercase tracking-[0.6px] text-[#aab7c4] first:mt-0">
                {group.title}
              </div>
              
              {group.items.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => handleMarkAsRead(item.id, item.isRead)}
                  className={`relative mb-[8px] flex cursor-pointer gap-[12px] rounded-[8px] border bg-white p-[14px_16px] transition-shadow hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)] ${
                    !item.isRead ? "border-[#e6ebf1] border-l-[3px] border-l-[#635bff]" : "border-[#e6ebf1]"
                  }`}
                >
                  {renderIcon(getIconType(item.type))}
                  
                  <div className="flex-1">
                    <div className={`mb-[3px] text-[13px] font-[700] ${!item.isRead ? "text-[#635bff]" : "text-[#0a2540]"}`}>
                      {item.title}
                    </div>
                    <div className="text-[12px] leading-[1.5] text-[#8898aa]">
                      {item.body}
                    </div>
                  </div>
                  
                  <div className="mt-[2px] whitespace-nowrap text-[11px] text-[#aab7c4]">
                    {formatTimeAgo(item.createdAt)}
                  </div>
                  
                  {!item.isRead && (
                    <div className="absolute right-[14px] top-[16px] h-[7px] w-[7px] rounded-full bg-[#635bff]"></div>
                  )}
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}