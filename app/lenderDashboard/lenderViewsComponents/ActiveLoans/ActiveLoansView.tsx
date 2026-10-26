'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, ChevronRight, FileText, Calendar, DollarSign, Percent, User, ArrowUpRight } from 'lucide-react';

export interface LoanItem {
  id: string;
  refNumber: string;
  propertyAddress: string;
  cityState: string;
  amount: number;
  interestRate: number; // Ej. 10.5 para 10.5%
  startDate: string;     // ISO string o formato YYYY-MM-DD
  maturityDate: string;  // ISO string o formato YYYY-MM-DD
  borrowerName: string;
  status: 'ACTIVE' | 'PENDING' | 'DELINQUENT' | 'PAID_OFF' | 'CLOSED';
}

interface ActiveLoansViewProps {
  loans?: LoanItem[];
  lang?: 'en' | 'es';
}

// Datos de demostración alineados a la vista actual
const DEFAULT_ACTIVE_LOANS: LoanItem[] = [
  {
    id: '1',
    refNumber: 'PML-2026-000019',
    propertyAddress: '355 Oak Hollow Ln',
    cityState: 'Dallas, TX',
    amount: 380000,
    interestRate: 10.5,
    startDate: '2026-01-15',
    maturityDate: '2027-01-15',
    borrowerName: 'Apex Capital Ventures',
    status: 'ACTIVE',
  },
  {
    id: '2',
    refNumber: 'PML-2026-000013',
    propertyAddress: '610 Lamar Blvd',
    cityState: 'Austin, TX',
    amount: 60000,
    interestRate: 11.0,
    startDate: '2026-02-01',
    maturityDate: '2026-08-01',
    borrowerName: 'Lone Star Rehab LLC',
    status: 'ACTIVE',
  },
  {
    id: '3',
    refNumber: 'PML-2026-000010',
    propertyAddress: '559 Oak Hollow Ln',
    cityState: 'Dallas, TX',
    amount: 180000,
    interestRate: 9.75,
    startDate: '2025-11-20',
    maturityDate: '2026-11-20',
    borrowerName: 'Metroplex Homes',
    status: 'ACTIVE',
  },
  {
    id: '4',
    refNumber: 'PML-2026-000007',
    propertyAddress: '508 Evergreen Terrace',
    cityState: 'Austin, TX',
    amount: 250000,
    interestRate: 10.0,
    startDate: '2025-10-05',
    maturityDate: '2026-10-05',
    borrowerName: 'Austin Flip Co.',
    status: 'ACTIVE',
  },
  {
    id: '5',
    refNumber: 'PML-2026-000004',
    propertyAddress: '457 Zilker Loop',
    cityState: 'Dallas, TX',
    amount: 220000,
    interestRate: 10.25,
    startDate: '2026-03-01',
    maturityDate: '2027-03-01',
    borrowerName: 'Zilker Holdings LLC',
    status: 'PENDING',
  },
];

const DEFAULT_PAST_LOANS: LoanItem[] = [
  {
    id: '6',
    refNumber: 'PML-2025-000088',
    propertyAddress: '1204 South Congress Ave',
    cityState: 'Austin, TX',
    amount: 310000,
    interestRate: 9.5,
    startDate: '2025-01-10',
    maturityDate: '2025-12-10',
    borrowerName: 'South Congress Revitalization',
    status: 'PAID_OFF',
  },
  {
    id: '7',
    refNumber: 'PML-2025-000062',
    propertyAddress: '8820 Preston Rd',
    cityState: 'Dallas, TX',
    amount: 450000,
    interestRate: 10.0,
    startDate: '2024-08-15',
    maturityDate: '2025-08-15',
    borrowerName: 'North Texas Equity Group',
    status: 'PAID_OFF',
  },
];

export default function ActiveLoansView({
  loans = DEFAULT_ACTIVE_LOANS,
  lang = 'en',
}: ActiveLoansViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'PENDING'>('ALL');

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? dateStr : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getStatusBadge = (status: LoanItem['status']) => {
    switch (status) {
      case 'ACTIVE':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
            Active
          </span>
        );
      case 'PENDING':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
            Pending
          </span>
        );
      case 'DELINQUENT':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-200 dark:border-rose-800">
            Delinquent
          </span>
        );
      case 'PAID_OFF':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
            Paid Off
          </span>
        );
      case 'CLOSED':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
            Closed
          </span>
        );
      default:
        return null;
    }
  };

  const filteredActiveLoans = useMemo(() => {
    return loans.filter((loan) => {
      const matchesSearch =
        loan.propertyAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loan.cityState.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loan.refNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loan.borrowerName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === 'ALL' || loan.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [loans, searchTerm, statusFilter]);

  const renderLoansTable = (items: LoanItem[], isPast = false) => {
    if (items.length === 0) {
      return (
        <div className="py-12 text-center text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
          No loans found matching your criteria.
        </div>
      );
    }

    return (
      <div className="overflow-x-auto bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-50/70 dark:bg-slate-800/40">
              <th className="py-3.5 px-4">Loan / Property</th>
              <th className="py-3.5 px-4">Amount</th>
              <th className="py-3.5 px-4">Rate</th>
              <th className="py-3.5 px-4">Start Date</th>
              <th className="py-3.5 px-4">Maturity</th>
              <th className="py-3.5 px-4">Borrower</th>
              <th className="py-3.5 px-4 text-center">Status</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm">
            {items.map((loan) => (
              <tr
                key={loan.id}
                className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
              >
                {/* Property & REF */}
                <td className="py-4 px-4 min-w-[220px]">
                  <div className="font-semibold text-slate-900 dark:text-white">
                    {loan.propertyAddress}, {loan.cityState}
                  </div>
                  <div className="text-xs text-slate-400 dark:text-slate-500 font-mono mt-0.5">
                    REF: {loan.refNumber}
                  </div>
                </td>

                {/* Amount */}
                <td className="py-4 px-4 font-semibold text-slate-900 dark:text-slate-100 whitespace-nowrap">
                  {formatCurrency(loan.amount)}
                </td>

                {/* Rate */}
                <td className="py-4 px-4 text-slate-700 dark:text-slate-300 whitespace-nowrap">
                  {loan.interestRate.toFixed(2)}%
                </td>

                {/* Start Date */}
                <td className="py-4 px-4 text-slate-600 dark:text-slate-400 whitespace-nowrap">
                  {formatDate(loan.startDate)}
                </td>

                {/* Maturity */}
                <td className="py-4 px-4 text-slate-600 dark:text-slate-400 whitespace-nowrap">
                  {formatDate(loan.maturityDate)}
                </td>

                {/* Borrower */}
                <td className="py-4 px-4 text-slate-700 dark:text-slate-300 min-w-[160px]">
                  <div className="truncate max-w-[180px]" title={loan.borrowerName}>
                    {loan.borrowerName}
                  </div>
                </td>

                {/* Status */}
                <td className="py-4 px-4 text-center whitespace-nowrap">
                  {getStatusBadge(loan.status)}
                </td>

                {/* Action: View details */}
                <td className="py-4 px-4 text-right whitespace-nowrap">
                  <Link
                    href={`/lenderDashboard/active-loans/${loan.id}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400 text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 bg-white dark:bg-slate-800 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30 transition-all shadow-xs"
                  >
                    View details
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Encabezado: Título, Filtro de Estado y Buscador */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Active loans
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage your performing loans, track maturities, and borrower payments.
          </p>
        </div>

        {/* Search loans & Status Filter */}
        <div className="flex items-center gap-3">
          {/* Status selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium text-slate-400 dark:text-slate-500 hidden sm:inline">
              Status:
            </span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="text-xs font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-2 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="ALL">All Status</option>
              <option value="ACTIVE">Active</option>
              <option value="PENDING">Pending</option>
            </select>
          </div>

          {/* Search loans input */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search loans..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Tabla de préstamos activos */}
      <div>
        {renderLoansTable(filteredActiveLoans)}
      </div>

      {/* Sección Past Loans */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Past Loans
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Completed, paid off, or closed loan records.
            </p>
          </div>
        </div>

        {renderLoansTable(DEFAULT_PAST_LOANS, true)}
      </div>
    </div>
  );
}