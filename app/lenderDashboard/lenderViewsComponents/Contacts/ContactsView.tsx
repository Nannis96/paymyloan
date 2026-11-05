'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Search, Plus, Mail, Phone, Building, MessageSquare, Loader2 } from 'lucide-react';
import { useSite } from '@/app/components/layout/SiteShell';
import { apiFetch, toList } from '@/app/lib/apiFetch';
import { API_ROUTES } from '@/app/lib/endpoints';

export type ContactCategory = 'ALL' | 'BORROWER' | 'TITLE' | 'INSURANCE' | 'BOOKKEEPER' | 'VENDOR';

interface Contact {
  id: string;
  name: string;
  company?: string;
  category: ContactCategory;
  email: string;
  phone: string;
  associatedDeals?: number;
}

export default function ContactsView() {
  const { lang } = useSite();
  const isEs = lang === 'es';

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ContactCategory>('ALL');

  const categories: { label: string; value: ContactCategory }[] = [
    { label: isEs ? 'Todos' : 'All Contacts', value: 'ALL' },
    { label: isEs ? 'Prestatarios' : 'Borrowers', value: 'BORROWER' },
    { label: isEs ? 'Titulo y Fideicomiso' : 'Title & Escrow', value: 'TITLE' },
    { label: isEs ? 'Seguros' : 'Insurance', value: 'INSURANCE' },
    { label: isEs ? 'Contadores' : 'Bookkeepers', value: 'BOOKKEEPER' },
    { label: isEs ? 'Proveedores' : 'Vendors', value: 'VENDOR' },
  ];

  // Obtenemos los borrowers reales conectados a la compania del lender[cite: 2]
  useEffect(() => {
    async function fetchContacts() {
      try {
        const res = await apiFetch(API_ROUTES.lenders.meBorrowers);
        const json = await res.json();
        
        if (json.success) {
          const borrowersList = toList<any>(json.data);
          
          // Mapeamos el modelo del backend a la interfaz de la tabla[cite: 2]
          const mappedContacts: Contact[] = borrowersList.map((b) => ({
            id: b.id,
            name: b.user?.name || (isEs ? "Sin nombre" : "Unnamed"),
            company: b.entityName || undefined,
            category: 'BORROWER',
            email: b.user?.email || "",
            phone: b.user?.phone || "",
            associatedDeals: 0
          }));
          setContacts(mappedContacts);
        } else {
          throw new Error(json.error?.message || "Error al cargar contactos");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error de red");
      } finally {
        setIsLoading(false);
      }
    }
    fetchContacts();
  }, [isEs]);

  const getCategoryBadge = (category: ContactCategory) => {
    switch (category) {
      case 'BORROWER':
        return (
          <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-[#f0efff] text-[#635bff] border border-[#d6d3ff]">
            Borrower
          </span>
        );
      case 'TITLE':
        return (
          <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-[#e6fcf5] text-[#0ca678] border border-[#b2f2bb]">
            Title Co.
          </span>
        );
      case 'INSURANCE':
        return (
          <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-[#e7f5ff] text-[#1c7ed6] border border-[#a5d8ff]">
            Insurance
          </span>
        );
      case 'BOOKKEEPER':
        return (
          <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-[#fff8e1] text-[#b45309] border border-[#fcd34d]">
            Bookkeeper
          </span>
        );
      case 'VENDOR':
        return (
          <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-[#f1f3f5] text-[#495057] border border-[#dee2e6]">
            Vendor
          </span>
        );
      default:
        return null;
    }
  };

  const filteredContacts = useMemo(() => {
    return contacts.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (c.company && c.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.phone.includes(searchTerm);

      const matchesCat = selectedCategory === 'ALL' || c.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [contacts, searchTerm, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Encabezado */}
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0a2540] tracking-tight">
            {isEs ? "Contactos y Directorio" : "Contacts & Directory"}
          </h1>
          <p className="text-sm text-[#425466] mt-1">
            {isEs
              ? "Gestiona tu red de companias de titulo, agentes de seguros, prestatarios, contadores y proveedores."
              : "Manage your network of Title companies, Insurance agents, Borrowers, Bookkeepers, and Vendors."}
          </p>
        </div>
      </div>

      {/* Barra de Filtros y Búsqueda */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-3.5 rounded-xl border border-[#e6ebf1] shadow-xs">
        {/* Pestañas de categoría */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                type="button"
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  isActive
                    ? 'bg-[#f0efff] text-[#635bff] font-semibold border border-[#d6d3ff]'
                    : 'text-[#425466] hover:bg-[#f6f9fc] hover:text-[#0a2540] border border-transparent'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Buscador */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-[#aab7c4] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={isEs ? "Buscar contactos..." : "Search contacts..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-sm bg-white border border-[#e6ebf1] rounded-lg text-[#0a2540] placeholder-[#aab7c4] focus:outline-none focus:ring-2 focus:ring-[#635bff]/20 focus:border-[#635bff]"
          />
        </div>
      </div>

      {/* Tabla de Contactos */}
      <div className="overflow-x-auto bg-white rounded-xl border border-[#e6ebf1] shadow-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#e6ebf1] text-[11px] font-bold uppercase tracking-wider text-[#aab7c4] bg-[#fafbfd]">
              <th className="py-3.5 px-4">{isEs ? "Contacto / Compania" : "Contact / Company"}</th>
              <th className="py-3.5 px-4">{isEs ? "Tipo" : "Type"}</th>
              <th className="py-3.5 px-4">{isEs ? "Correo" : "Email"}</th>
              <th className="py-3.5 px-4">{isEs ? "Telefono" : "Phone"}</th>
              <th className="py-3.5 px-4 text-center">{isEs ? "Tratos" : "Deals"}</th>
              <th className="py-3.5 px-4 text-right">{isEs ? "Acciones" : "Actions"}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0f3f7] text-sm">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-[#aab7c4]">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                  {isEs ? "Cargando contactos..." : "Loading contacts..."}
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-red-500">
                  {error}
                </td>
              </tr>
            ) : filteredContacts.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-[#aab7c4]">
                  {isEs ? "No se encontraron contactos en tu red." : "No contacts found in your network."}
                </td>
              </tr>
            ) : filteredContacts.map((contact) => (
              <tr key={contact.id} className="hover:bg-[#f8fafc] transition-colors">
                <td className="py-4 px-4 min-w-[200px]">
                  <div className="font-semibold text-[#0a2540]">{contact.name}</div>
                  {contact.company && (
                    <div className="text-xs text-[#425466] flex items-center gap-1.5 mt-0.5">
                      <Building className="w-3.5 h-3.5 text-[#aab7c4]" />
                      {contact.company}
                    </div>
                  )}
                </td>
                <td className="py-4 px-4 whitespace-nowrap">
                  {getCategoryBadge(contact.category)}
                </td>
                <td className="py-4 px-4 text-[#425466] whitespace-nowrap">
                  <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-1.5 hover:text-[#635bff] no-underline">
                    <Mail className="w-3.5 h-3.5 text-[#aab7c4]" />
                    {contact.email}
                  </a>
                </td>
                <td className="py-4 px-4 text-[#425466] whitespace-nowrap">
                  <a href={`tel:${contact.phone}`} className="inline-flex items-center gap-1.5 hover:text-[#635bff] no-underline">
                    <Phone className="w-3.5 h-3.5 text-[#aab7c4]" />
                    {contact.phone}
                  </a>
                </td>
                <td className="py-4 px-4 text-center text-[#0a2540] font-bold">
                  {contact.associatedDeals ?? 0}
                </td>
                <td className="py-4 px-4 text-right whitespace-nowrap">
                  <Link
                    href={`/lenderDashboard/messages?borrowerId=${contact.id}`}
                    className="inline-flex p-1.5 text-[#aab7c4] hover:text-[#635bff] rounded-lg hover:bg-[#f0efff] transition-colors"
                    title={isEs ? "Enviar mensaje" : "Send message"}
                  >
                    <MessageSquare className="w-4 h-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}