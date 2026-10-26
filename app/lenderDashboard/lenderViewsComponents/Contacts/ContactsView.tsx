'use client';

import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  Mail, 
  Phone, 
  Building, 
  Filter,
  MoreVertical
} from 'lucide-react';

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

const INITIAL_CONTACTS: Contact[] = [
  {
    id: '1',
    name: 'Marcus Sterling',
    company: 'Apex Capital Ventures',
    category: 'BORROWER',
    email: 'marcus@apexventures.com',
    phone: '(214) 555-0182',
    associatedDeals: 3,
  },
  {
    id: '2',
    name: 'Sarah Jenkins',
    company: 'Lone Star Title & Escrow Co.',
    category: 'TITLE',
    email: 'sjenkins@lonestartitle.com',
    phone: '(512) 555-9041',
    associatedDeals: 6,
  },
  {
    id: '3',
    name: 'David Holbrook',
    company: 'Texas Shield Insurance Agency',
    category: 'INSURANCE',
    email: 'dholbrook@texasshield.com',
    phone: '(512) 555-3210',
    associatedDeals: 4,
  },
  {
    id: '4',
    name: 'Elena Morales, CPA',
    company: 'Morales Financial Services',
    category: 'BOOKKEEPER',
    email: 'elena@moralescpa.com',
    phone: '(214) 555-7762',
    associatedDeals: 8,
  },
  {
    id: '5',
    name: 'Jake Reynolds',
    company: 'Prime Appraisals & Inspection',
    category: 'VENDOR',
    email: 'jake@primeinspection.com',
    phone: '(817) 555-6619',
    associatedDeals: 2,
  },
];

export default function ContactsView() {
  const [contacts, setContacts] = useState<Contact[]>(INITIAL_CONTACTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ContactCategory>('ALL');

  const categories: { label: string; value: ContactCategory }[] = [
    { label: 'All Contacts', value: 'ALL' },
    { label: 'Borrowers', value: 'BORROWER' },
    { label: 'Title & Escrow', value: 'TITLE' },
    { label: 'Insurance', value: 'INSURANCE' },
    { label: 'Bookkeepers', value: 'BOOKKEEPER' },
    { label: 'Vendors', value: 'VENDOR' },
  ];

  const getCategoryBadge = (category: ContactCategory) => {
    switch (category) {
      case 'BORROWER':
        return <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300">Borrower</span>;
      case 'TITLE':
        return <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">Title Co.</span>;
      case 'INSURANCE':
        return <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300">Insurance</span>;
      case 'BOOKKEEPER':
        return <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300">Bookkeeper</span>;
      case 'VENDOR':
        return <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">Vendor</span>;
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
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Contacts & Directory
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage your network of Title companies, Insurance agents, Borrowers, Bookkeepers, and Vendors.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Contact</span>
        </button>
      </div>

      {/* Barra de Filtros y Búsqueda */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
        {/* Pestañas de categoría */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                selectedCategory === cat.value
                  ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Buscador */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
      </div>

      {/* Tabla de Contactos */}
      <div className="overflow-x-auto bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-50/70 dark:bg-slate-800/40">
              <th className="py-3.5 px-4">Contact / Company</th>
              <th className="py-3.5 px-4">Type</th>
              <th className="py-3.5 px-4">Email</th>
              <th className="py-3.5 px-4">Phone</th>
              <th className="py-3.5 px-4 text-center">Deals</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm">
            {filteredContacts.map((contact) => (
              <tr key={contact.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-4 px-4 min-w-[200px]">
                  <div className="font-semibold text-slate-900 dark:text-white">{contact.name}</div>
                  {contact.company && (
                    <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                      <Building className="w-3 h-3 text-slate-400" />
                      {contact.company}
                    </div>
                  )}
                </td>
                <td className="py-4 px-4 whitespace-nowrap">
                  {getCategoryBadge(contact.category)}
                </td>
                <td className="py-4 px-4 text-slate-600 dark:text-slate-300 whitespace-nowrap">
                  <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-1.5 hover:text-indigo-600">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    {contact.email}
                  </a>
                </td>
                <td className="py-4 px-4 text-slate-600 dark:text-slate-300 whitespace-nowrap">
                  <a href={`tel:${contact.phone}`} className="inline-flex items-center gap-1.5 hover:text-indigo-600">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    {contact.phone}
                  </a>
                </td>
                <td className="py-4 px-4 text-center text-slate-700 dark:text-slate-300 font-medium">
                  {contact.associatedDeals ?? 0}
                </td>
                <td className="py-4 px-4 text-right whitespace-nowrap">
                  <button
                    type="button"
                    className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}