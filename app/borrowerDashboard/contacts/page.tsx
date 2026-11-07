"use client";
import { useEffect, useState } from "react";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import { apiFetch } from "@/app/lib/apiFetch";
import { API_ROUTES } from "@/app/lib/endpoints";
import Link from "next/link";

export default function ContactsPage() {
  const { lang, t } = useSite();
  // Diccionario por defecto por si no esta actualizado en la estructura global
  const c = (t as any).contacts || {
    title: lang === "es" ? "Directorio de Contactos" : "Contacts Directory",
    subtitle: lang === "es" ? "Prestamistas con los que tienes contratos o que han ofertado en tus tratos." : "Lenders with whom you have contracts or who have bid on your deals.",
    empty: lang === "es" ? "No tienes contactos disponibles aun." : "No contacts available yet.",
    loading: lang === "es" ? "Cargando contactos..." : "Loading contacts...",
    messageBtn: lang === "es" ? "Enviar Mensaje" : "Send Message",
    msgNotAllowed: lang === "es" ? "Mensajeria no disponible" : "Messaging not available",
    roles: { lender: lang === "es" ? "Prestamista" : "Lender" },
    associatedDeals: lang === "es" ? "Tratos asociados" : "Associated deals",
  };
  
  const [contacts, setContacts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchContacts() {
      try {
        // Consultar API del prestatario y de contratos para unificar la lista de prestamistas
        const [meRes, contractsRes, reqsRes, threadsRes] = await Promise.all([
          apiFetch(API_ROUTES.borrowers.me),
          apiFetch(API_ROUTES.contracts.base),
          apiFetch(API_ROUTES.borrowers.meLoanRequests),
          apiFetch(API_ROUTES.borrowers.meMessageThreads)
        ]);

        const lendersMap = new Map();

        if (meRes.ok) {
          const meJson = await meRes.json();
          if (meJson.success && meJson.data?.lenderCompanies) {
            meJson.data.lenderCompanies.forEach((lender: any) => {
              lendersMap.set(lender.id, { ...lender, associatedDeals: 0, canMessage: false });
            });
          }
        }

        if (contractsRes.ok) {
          const contractsJson = await contractsRes.json();
          if (contractsJson.success && contractsJson.data?.items) {
            contractsJson.data.items.forEach((contract: any) => {
              // Si el contrato tiene los detalles del prestamista, lo agregamos/actualizamos
              if (contract.lenderCompanyId && contract.lenderCompany) {
                const existing = lendersMap.get(contract.lenderCompanyId) || { ...contract.lenderCompany, associatedDeals: 0, canMessage: false };
                existing.associatedDeals = (existing.associatedDeals || 0) + 1;
                if (contract.status !== "DRAFT") existing.canMessage = true;
                lendersMap.set(contract.lenderCompanyId, existing);
              }
            });
          }
        }

        if (reqsRes.ok) {
          const reqsJson = await reqsRes.json();
          if (reqsJson.success && reqsJson.data?.items) {
            reqsJson.data.items.forEach((req: any) => {
              if (req.quotes) {
                req.quotes.forEach((quote: any) => {
                  if (quote.status === "SUBMITTED" || quote.status === "SELECTED") {
                    const existing = lendersMap.get(quote.lenderCompanyId);
                    if (existing) {
                      existing.canMessage = true;
                      lendersMap.set(quote.lenderCompanyId, existing);
                    }
                  }
                });
              }
            });
          }
        }

        if (threadsRes.ok) {
          const threadsJson = await threadsRes.json();
          if (threadsJson.success && threadsJson.data) {
            threadsJson.data.forEach((thread: any) => {
              const lenderId = thread.lenderCompany?.id || thread.lastMessage?.lenderCompanyId;
              if (lenderId) {
                const existing = lendersMap.get(lenderId);
                if (existing) {
                  existing.canMessage = true;
                  lendersMap.set(lenderId, existing);
                }
              }
            });
          }
        }

        setContacts(Array.from(lendersMap.values()));
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
            {c.title}
          </h1>
          <p className="mt-[4px] text-[14px] text-ink-3">
            {c.subtitle}
          </p>
        </header>

        {isLoading ? (
          <div className="text-[14px] text-ink-3">
            {c.loading}
          </div>
        ) : contacts.length === 0 ? (
          <div className="rounded-xl border border-rule bg-surface p-8 text-center shadow-sm max-w-[600px]">
            <p className="text-[14px] text-ink-3">
              {c.empty}
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
                    {contact.companyName || c.roles.lender}
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
                  
                  {contact.associatedDeals > 0 && (
                    <div className="mt-1 text-[11px] font-bold uppercase tracking-wider text-accent">
                      {contact.associatedDeals} {c.associatedDeals}
                    </div>
                  )}
                  
                  <div className="text-[12px] text-ink-3 mt-2 inline-flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    {contact.city && contact.state ? `${contact.city}, ${contact.state}` : "Local"}
                  </div>
                </div>
                {contact.canMessage ? (
                  <Link
                    href={`/borrowerDashboard/messages?lenderCompanyId=${contact.id}`}
                    className="absolute top-6 right-6 flex h-9 w-9 items-center justify-center rounded-full bg-surface-2 text-accent transition-colors hover:bg-accent hover:text-white"
                    title={c.messageBtn}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                  </Link>
                ) : (
                  <div
                    className="absolute top-6 right-6 flex h-9 w-9 items-center justify-center rounded-full bg-surface text-ink-3 opacity-50 cursor-not-allowed"
                    title={c.msgNotAllowed}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </SiteShell>
  );
}