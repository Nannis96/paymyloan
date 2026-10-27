'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, ChevronRight } from 'lucide-react';

export interface LoanItem {
  id: string;
  refNumber: string;
  propertyAddress: string;
  cityState: string;
  amount: number;
  interestRate: number;
  startDate: string;
  maturityDate: string;
  borrowerName: string;
  status: 'ACTIVE' | 'PENDING' | 'DELINQUENT' | 'PAID_OFF' | 'CLOSED';
}

interface ActiveLoansViewProps {
  loans?: LoanItem[];
  lang?: 'en' | 'es';
}

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
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#e6fcf5] text-[#0ca678] border border-[#b2f2bb]">
            Active
          </span>
        );
      case 'PENDING':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#fff8e1] text-[#b45309] border border-[#fcd34d]">
            Pending
          </span>
        );
      case 'DELINQUENT':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#fff5f5] text-[#e03131] border border-[#ffc9c9]">
            Delinquent
          </span>
        );
      case 'PAID_OFF':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#e7f5ff] text-[#1c7ed6] border border-[#a5d8ff]">
            Paid Off
          </span>
        );
      case 'CLOSED':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#f1f3f5] text-[#495057] border border-[#dee2e6]">
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

      const matchesStatus = statusFilter === 'ALL' || loan.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [loans, searchTerm, statusFilter]);

  const renderLoansTable = (items: LoanItem[]) => {
    if (items.length === 0) {
      return (
        <div className="py-12 text-center text-[#aab7c4] bg-white rounded-xl border border-[#e6ebf1]">
          No loans found matching your criteria.
        </div>
      );
    }

    return (
      <div className="overflow-x-auto bg-white rounded-xl border border-[#e6ebf1] shadow-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#e6ebf1] text-[11px] font-bold uppercase tracking-wider text-[#aab7c4] bg-[#fafbfd]">
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
          <tbody className="divide-y divide-[#f0f3f7] text-sm">
            {items.map((loan) => (
              <tr key={loan.id} className="hover:bg-[#f8fafc] transition-colors">
                <td className="py-4 px-4 min-w-[220px]">
                  <div className="font-semibold text-[#0a2540]">
                    {loan.propertyAddress}, {loan.cityState}
                  </div>
                  <div className="text-xs text-[#aab7c4] font-mono mt-0.5">
                    REF: {loan.refNumber}
                  </div>
                </td>
                <td className="py-4 px-4 font-bold text-[#0a2540] whitespace-nowrap">
                  {formatCurrency(loan.amount)}
                </td>
                <td className="py-4 px-4 text-[#425466] font-medium whitespace-nowrap">
                  {loan.interestRate.toFixed(2)}%
                </td>
                <td className="py-4 px-4 text-[#425466] whitespace-nowrap">
                  {formatDate(loan.startDate)}
                </td>
                <td className="py-4 px-4 text-[#425466] whitespace-nowrap">
                  {formatDate(loan.maturityDate)}
                </td>
                <td className="py-4 px-4 text-[#425466] min-w-[160px]">
                  <div className="truncate max-w-[180px] font-medium" title={loan.borrowerName}>
                    {loan.borrowerName}
                  </div>
                </td>
                <td className="py-4 px-4 text-center whitespace-nowrap">
                  {getStatusBadge(loan.status)}
                </td>
                <td className="py-4 px-4 text-right whitespace-nowrap">
                  <Link
                    href={`/lenderDashboard/active-loans/${loan.id}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#e6ebf1] hover:border-[#635bff] text-[#425466] hover:text-[#635bff] bg-white hover:bg-[#f0efff] transition-all no-underline shadow-xs"
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
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Encabezado y Barra de Filtros */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0a2540] tracking-tight">
            Active loans
          </h1>
          <p className="text-sm text-[#425466] mt-1">
            Manage your performing loans, track maturities, and borrower payments.
          </p>
        </div>

        {/* Buscador & Selector de Estado */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium text-[#aab7c4] hidden sm:inline">
              Status:
            </span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="text-xs font-medium bg-white border border-[#e6ebf1] rounded-lg px-2.5 py-2 text-[#0a2540] focus:outline-none focus:ring-2 focus:ring-[#635bff]/20 focus:border-[#635bff] cursor-pointer"
            >
              <option value="ALL">All Status</option>
              <option value="ACTIVE">Active</option>
              <option value="PENDING">Pending</option>
            </select>
          </div>

          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-[#aab7c4] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search loans..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-[#e6ebf1] rounded-lg text-[#0a2540] placeholder-[#aab7c4] focus:outline-none focus:ring-2 focus:ring-[#635bff]/20 focus:border-[#635bff] transition-all"
            />
          </div>
        </div>
      </div>

      {/* Tabla de préstamos activos */}
      <div>{renderLoansTable(filteredActiveLoans)}</div>

      {/* Sección Past Loans */}
      <div className="pt-4 border-t border-[#e6ebf1] space-y-4">
        <div>
          <h2 className="text-xl font-bold text-[#0a2540]">Past Loans</h2>
          <p className="text-xs text-[#425466] mt-0.5">
            Completed, paid off, or closed loan records.
          </p>
        </div>
        {renderLoansTable(DEFAULT_PAST_LOANS)}
      </div>
    </div>
  );
}