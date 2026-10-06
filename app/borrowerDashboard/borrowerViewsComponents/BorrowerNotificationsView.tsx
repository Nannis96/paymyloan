"use client";

import { useState } from "react";
import { useSite } from "@/app/components/layout/SiteShell";

export default function BorrowerNotificationsView() {
  const { t, lang } = useSite();
  const n = t.notifications; // { title, markRead, empty }
  const isEs = lang === "es";
  
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: isEs ? "Todas" : "All" },
    { id: "offers", label: isEs ? "Ofertas" : "Offers" },
    { id: "closing", label: isEs ? "Cierres" : "Closing" },
    { id: "payments", label: isEs ? "Pagos" : "Payments" },
    { id: "alerts", label: isEs ? "Alertas" : "Alerts" }
  ];

  // Datos mockeados basados en notifications.html
  const groups = [
    {
      title: isEs ? "Hoy" : "Today",
      items: [
        {
          id: 1,
          type: "offer",
          unread: true,
          title: isEs ? "Nueva oferta — 3802 University Cove" : "New offer — 3802 University Cove",
          sub: isEs ? "Moore Capital LLC te envió una oferta: $115,000 · 12% · 12 meses · 1 pt originación · Rehab en draws" : "Moore Capital LLC sent you an offer: $115,000 · 12% · 12 months · 1 pt origination · Rehab held in draws",
          time: isEs ? "Hace 2h" : "2h ago",
          actions: [
            { label: isEs ? "Revisar oferta" : "Review offer", primary: true },
            { label: isEs ? "Rechazar" : "Decline", primary: false }
          ]
        },
        {
          id: 2,
          type: "counter",
          unread: true,
          title: isEs ? "Contraoferta — 4215 Raleigh Ave" : "Counter offer — 4215 Raleigh Ave",
          sub: isEs ? "Summit Lending LLC respondió: $70,000 (pediste $75K) · 13% · 9 meses. Revisa y acepta o haz otra contraoferta." : "Summit Lending LLC countered your request: $70,000 (you asked $75K) · 13% · 9 months. Review and accept or counter back.",
          time: isEs ? "Hace 4h" : "4h ago",
          actions: [
            { label: isEs ? "Ver contraoferta" : "View counter", primary: true },
            { label: isEs ? "Contraofertar" : "Counter back", primary: false }
          ]
        },
        {
          id: 3,
          type: "alert",
          unread: true,
          title: isEs ? "Seguro aún no vinculado — 3802 University Cove" : "Insurance not yet bound — 3802 University Cove",
          sub: isEs ? "Tu prestamista puede requerir prueba del seguro antes del cierre. Contacta a Insight Risk Management para finalizar tu póliza." : "Your lender may require proof of binding before closing. Contact Insight Risk Management to finalize your policy.",
          time: isEs ? "Hace 5h" : "5h ago"
        }
      ]
    },
    {
      title: isEs ? "Ayer" : "Yesterday",
      items: [
        {
          id: 4,
          type: "closing",
          unread: false,
          title: isEs ? "Compañía de títulos confirmada — 3802 University Cove" : "Title company confirmed — 3802 University Cove",
          sub: isEs ? "BAS Law & Title ha recibido tus instrucciones de transferencia. Ruweida Abdullahi te contactará para programar tu fecha de cierre." : "BAS Law & Title has received your wire instructions. Ruweida Abdullahi will contact you to schedule your closing date.",
          time: isEs ? "Ayer" : "Yesterday"
        },
        {
          id: 5,
          type: "payment",
          unread: false,
          title: isEs ? "Pago vence en 10 días — 1144 Oakwood Dr" : "Payment due in 10 days — 1144 Oakwood Dr",
          sub: isEs ? "Pago de interés de $950 vence el 1 de Oct. Tu prestamista Wilson Moore en Moore Capital LLC." : "$950 interest payment due Oct 1. Your lender Wilson Moore at Moore Capital LLC.",
          time: isEs ? "Ayer" : "Yesterday",
          actions: [
            { label: isEs ? "Ver calendario de pagos" : "View payment schedule", primary: true }
          ]
        }
      ]
    },
    {
      title: isEs ? "Esta semana" : "This week",
      items: [
        {
          id: 6,
          type: "offer",
          unread: false,
          title: isEs ? "Trato en vivo — 4215 Raleigh Ave" : "Deal live — 4215 Raleigh Ave",
          sub: isEs ? "Tu trato ya es visible para los prestamistas en la plataforma. Serás notificado cuando lleguen ofertas." : "Your deal is now visible to lenders on the platform. You'll be notified as offers come in.",
          time: isEs ? "20 Sept" : "Sept 20"
        }
      ]
    }
  ];

  const renderIcon = (type: string) => {
    switch (type) {
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

  return (
    <div className="animate-in fade-in duration-300 max-w-[680px]">
      
      {/* Header */}
      <div className="mb-[20px] flex items-center justify-between">
        <div className="text-[20px] font-[800] tracking-[-0.3px] text-ink">
          {n.title || "Notifications"}
        </div>
        <button className="text-[12px] font-[600] text-accent bg-transparent border-none cursor-pointer hover:underline">
          {n.markRead || "Mark all as read"}
        </button>
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

      {/* Lista de Notificaciones */}
      <div>
        {groups.map((group, gIdx) => {
          // Filtrado básico por tab seleccionado
          const filteredItems = group.items.filter(item => 
             activeTab === "all" || 
             (activeTab === "offers" && (item.type === "offer" || item.type === "counter")) ||
            (activeTab === "closing" && item.type === "closing") ||
            (activeTab === "payments" && item.type === "payment") ||
            (activeTab === "alerts" && item.type === "alert")
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
                  className={`relative mb-[8px] flex cursor-pointer gap-[12px] rounded-[8px] border bg-surface p-[14px_16px] transition-shadow hover:shadow-sm ${
                    item.unread ? "border-rule border-l-[3px] border-l-accent" : "border-rule"
                  }`}
                >
                  {renderIcon(item.type)}
                  
                  <div className="flex-1">
                    <div className={`mb-[3px] text-[13px] font-[700] ${item.unread ? "text-accent" : "text-ink"}`}>
                      {item.title}
                    </div>
                    <div className="text-[12px] leading-[1.5] text-ink-2">
                      {item.sub}
                    </div>
                    
                    {item.actions && (
                      <div className="mt-[8px] flex gap-[6px]">
                        {item.actions.map((act, aIdx) => (
                          <button 
                            key={aIdx} 
                            className={`cursor-pointer rounded-[5px] px-[12px] py-[5px] text-[11px] ${
                              act.primary 
                                ? "border-none bg-accent font-[700] text-accent-ink hover:bg-blue-700" 
                                : "border border-rule bg-surface font-[600] text-ink-2 hover:bg-surface-2"
                            }`}
                          >
                            {act.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-[2px] whitespace-nowrap text-[11px] text-ink-3">
                    {item.time}
                  </div>
                  
                  {item.unread && (
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