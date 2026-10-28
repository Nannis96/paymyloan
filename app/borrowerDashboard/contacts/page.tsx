"use client";
import { useEffect, useState } from "react";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import { apiFetch } from "@/app/lib/apiFetch";
import { API_ROUTES } from "@/app/lib/endpoints";
import Link from "next/link";

export default function ContactsPage() {
  const { lang } = useSite();
  const [contacts, setContacts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isEs = lang === "es";

  useEffect(() => {
    async function fetchContacts() {
      try {
        const res = await apiFetch("/api/borrowers/me");
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data?.lenderCompanies) {
            setContacts(json.data.lenderCompanies);
          }
        }
      } catch (error) {
        console.error("Error fetching contacts", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchContacts();
  }, []);

  return (
    <SiteShell isMinimal={true}>
      <div className="max-w-[900px] animate-in fade-in duration-300">
        <header className="mb-8">
          <h1 className="text-[28px] font-[900] tracking-tight text-ink">
            {isEs ? "Contactos" : "Contacts"}
          </h1>
          <p className="mt-[4px] text-[14px] text-ink-3">
            {isEs ? "Prestamistas con los que tienes una relación activa." : "Lenders you have an active relationship with."}
          </p>
        </header>

        {isLoading ? (
          <div className="text-[14px] text-ink-3">
            {isEs ? "Cargando contactos..." : "Loading contacts..."}
          </div>
        ) : contacts.length === 0 ? (
          <div className="rounded-xl border border-rule bg-surface p-8 text-center shadow-sm max-w-[600px]">
            <p className="text-[14px] text-ink-3">
              {isEs ? "Aún no tienes contactos registrados." : "You have no registered contacts yet."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contacts.map((contact) => (
              <div key={contact.id} className="rounded-xl border border-rule bg-surface p-6 shadow-sm flex items-start gap-4 transition-colors hover:border-accent relative">
                <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-brand-dark text-[16px] font-[900] text-white">
                  {contact.companyName ? contact.companyName.substring(0, 2).toUpperCase() : "PR"}
                </div>
                <div className="flex-1">
                  <h2 className="text-[15px] font-bold text-ink mb-1 pr-10">
                    {contact.companyName || (isEs ? "Prestamista Privado" : "Private Lender")}
                  </h2>
                  
                  {contact.contactPhone && (
                    <div className="text-[12px] text-ink-2 mb-0.5">
                      <span className="font-semibold">Tel:</span> {contact.contactPhone}
                    </div>
                  )}
                  
                  {contact.ein && (
                    <div className="text-[12px] text-ink-2 mb-0.5">
                      <span className="font-semibold">EIN:</span> {contact.ein}
                    </div>
                  )}
                  
                  <div className="text-[12px] text-ink-3 mt-2 inline-flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    {contact.city && contact.state ? `${contact.city}, ${contact.state}` : (isEs ? "Ubicación no especificada" : "Location not specified")}
                  </div>
                </div>
                <Link 
                  href="/borrowerDashboard/messages" 
                  className="absolute top-6 right-6 flex h-9 w-9 items-center justify-center rounded-full bg-surface-2 text-accent transition-colors hover:bg-accent hover:text-white"
                  title={isEs ? "Enviar mensaje" : "Send message"}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </SiteShell>
  );
}