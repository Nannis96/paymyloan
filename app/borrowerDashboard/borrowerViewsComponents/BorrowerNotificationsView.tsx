"use client";

import { useState, useEffect } from "react";
import { useSite } from "@/app/components/layout/SiteShell";
import { API_ROUTES } from "@/app/lib/endpoints";

export default function BorrowerNotificationsView() {
  const { t, lang } = useSite();
  const n = t.notifications; 
  const isEs = lang === "es";

  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const tabs = [
    { id: "all", label: isEs ? "Todas" : "All" },
    { id: "offers", label: isEs ? "Ofertas" : "Offers" },
    { id: "closing", label: isEs ? "Cierres" : "Closing" },
    { id: "payments", label: isEs ? "Pagos" : "Payments" },
    { id: "alerts", label: isEs ? "Alertas" : "Alerts" }
  ];

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      const res = await fetch("/api/notifications", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const json = await res.json();
      if (json.success) {
        setNotifications(json.data.items || []);
      }
    } catch (error) {
      console.error("Error fetching notifications", error);
    } finally {
      setIsLoading(false);
    }
  };

  const markAllAsRead = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      const res = await fetch("/api/notifications/read-all", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (res.ok) {
        setNotifications(prev => prev.map(notif => ({ ...notif, isRead: true })));
      }
    } catch (error) {
      console.error("Error marking all as read", error);
    }
  };

  const markAsRead = async (id: string, isRead: boolean) => {
    if (isRead) return; // Ya esta leida
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      const res = await fetch(`/api/notifications/${id}/read`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (res.ok) {
        setNotifications(prev => prev.map(notif => notif.id === id ? { ...notif, isRead: true } : notif));
      }
    } catch (error) {
      console.error("Error marking as read", error);
    }
  };

  // Función para mapear el tipo de API al tipo visual y asignación de pestañas
  const getUIType = (apiType: string) => {
    switch (apiType) {
      case "LOAN_QUOTE_RECEIVED":
      case "CONTRACT_TERMS_SUBMITTED":
        return "offer";
      case "CONTRACT_TERMS_REJECTED":
        return "counter";
      case "CONTRACT_ACTIVATED":
      case "LOAN_QUOTE_SELECTED":
      case "CONTRACT_TERMS_ACCEPTED":
        return "closing";
      case "MESSAGE_RECEIVED":
      case "LOAN_QUOTE_REQUESTED":
        return "alert";
      default:
        // Fallback genérico a alert o si agregas notificaciones de pago después
        return "alert"; 
    }
  };

  const renderIcon = (uiType: string) => {
    switch (uiType) {
      case "offer":
        return (
          <div className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M9 2l1.8 3.6 4 .6-2.9 2.8.7 4L9 11l-3.6 1.9.7-4L3.2 6.2l4-.6L9 2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg>
          </div>
        );
      case "counter":
        return (
          <div className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-lg bg-crit-soft text-crit">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        );
      case "alert":
        return (
          <div className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-lg bg-amber-soft text-amber">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.5L1.5 13h13L8 1.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/><path d="M8 6v3M8 11v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
          </div>
        );
      case "closing":
        return (
          <div className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-lg bg-success-soft text-success">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l4 4 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        );
      case "payment":
        return (
          <div className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-lg bg-info-soft text-info">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="4" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M2 7h12" stroke="currentColor" strokeWidth="1.3"/></svg>
          </div>
        );
      default:
        return null;
    }
  };

  const groupNotificationsByDate = (notifs: any[]) => {
    const grouped = [
      { title: isEs ? "Hoy" : "Today", items: [] as any[] },
      { title: isEs ? "Ayer" : "Yesterday", items: [] as any[] },
      { title: isEs ? "Anteriores" : "Older", items: [] as any[] }
    ];

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    notifs.forEach(notif => {
      const date = new Date(notif.createdAt);
      const isSameDay = (d1: Date, d2: Date) => d1.toDateString() === d2.toDateString();

      const uiType = getUIType(notif.type);
      const enrichedNotif = { ...notif, uiType };

      if (isSameDay(date, today)) {
        grouped[0].items.push(enrichedNotif);
      } else if (isSameDay(date, yesterday)) {
        grouped[1].items.push(enrichedNotif);
      } else {
        grouped[2].items.push(enrichedNotif);
      }
    });

    return grouped.filter(g => g.items.length > 0);
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString(isEs ? "es-MX" : "en-US", { hour: '2-digit', minute: '2-digit' });
  };

  if (isLoading) {
    return <div className="p-8 text-[13px] text-ink-3">{isEs ? "Cargando notificaciones..." : "Loading notifications..."}</div>;
  }

  const groupedNotifications = groupNotificationsByDate(notifications);

  return (
    <div className="animate-in fade-in duration-300 max-w-[680px]">
      
      {/* Header */}
      <div className="mb-[20px] flex items-center justify-between">
        <div className="text-[20px] font-[800] tracking-[-0.3px] text-ink">
          {n.title || "Notifications"}
        </div>
        {notifications.length > 0 && (
          <button onClick={markAllAsRead} className="text-[12px] font-[600] text-accent bg-transparent border-none cursor-pointer hover:underline">
            {n.markRead || "Mark all as read"}
          </button>
        )}
      </div>

      {/* Tabs de Filtro */}
      <div className="mb-[20px] flex gap-[6px]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`cursor-pointer rounded-[20px] px-[14px] py-[6px] text-[12px] font-[600] transition-colors ${
              activeTab === tab.id
                ? "border-[1.5px] border-accent bg-accent text-accent-ink"
                : "border-[1.5px] border-rule bg-surface text-ink-2 hover:bg-surface-2"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {notifications.length === 0 && (
        <div className="p-6 text-[13px] text-ink-3">
          {n.empty || (isEs ? "No tienes notificaciones." : "You have no notifications.")}
        </div>
      )}

      {/* Lista de Notificaciones */}
      <div>
        {groupedNotifications.map((group, gIdx) => {
          // Filtrado por tab seleccionado
          const filteredItems = group.items.filter(item => 
            activeTab === "all" ||
            (activeTab === "offers" && (item.uiType === "offer" || item.uiType === "counter")) ||
            (activeTab === "closing" && item.uiType === "closing") ||
            (activeTab === "payments" && item.uiType === "payment") ||
            (activeTab === "alerts" && item.uiType === "alert")
          );

          if (filteredItems.length === 0) return null;

          return (
            <div key={gIdx}>
              <div className="mb-[8px] mt-[20px] text-[10px] font-[700] uppercase tracking-[0.6px] text-ink-3 first:mt-0">
                {group.title}
              </div>
              
              {filteredItems.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => markAsRead(item.id, item.isRead)}
                  className={`relative mb-[8px] flex cursor-pointer gap-[12px] rounded-[8px] border bg-surface p-[14px_16px] transition-shadow hover:shadow-sm ${
                    !item.isRead ? "border-rule border-l-[3px] border-l-accent" : "border-rule"
                  }`}
                >
                  {renderIcon(item.uiType)}
                  
                  <div className="flex-1">
                    <div className={`mb-[3px] text-[13px] font-[700] ${!item.isRead ? "text-accent" : "text-ink"}`}>
                      {item.title}
                    </div>
                    <div className="text-[12px] leading-[1.5] text-ink-2">
                      {item.body}
                    </div>
                  </div>
                  
                  <div className="mt-[2px] whitespace-nowrap text-[11px] text-ink-3">
                    {formatTime(item.createdAt)}
                  </div>
                  
                  {!item.isRead && (
                    <div className="absolute right-[14px] top-[16px] h-[7px] w-[7px] rounded-full bg-accent"></div>
                  )}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}