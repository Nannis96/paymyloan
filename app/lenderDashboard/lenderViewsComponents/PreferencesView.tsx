'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Building2, Plus, ChevronDown } from 'lucide-react';

interface EntityOption {
  id: string;
  name: string;
  isPrimary?: boolean;
}

const DEFAULT_ENTITIES: EntityOption[] = [
  { id: 'ent-1', name: 'Apex Capital Lending LLC', isPrimary: true },
  { id: 'ent-2', name: 'Lone Star Funding Group', isPrimary: false },
  { id: 'ent-3', name: 'Metroplex Investments Inc.', isPrimary: false },
];

export default function PreferencesView() {
  const [entities] = useState<EntityOption[]>(DEFAULT_ENTITIES);
  const [selectedEntityId, setSelectedEntityId] = useState<string>(DEFAULT_ENTITIES[0].id);

  const [maxLtv, setMaxLtv] = useState<number>(75);
  const [minAmount, setMinAmount] = useState<string>('50,000');
  const [maxAmount, setMaxAmount] = useState<string>('500,000');
  const [rateRange, setRateRange] = useState<string>('10% - 12%');
  const [loanTerms, setLoanTerms] = useState<string>('6 months only');
  const [experience, setExperience] = useState<string>('No minimum - first deals welcome');
  const [selectedStates, setSelectedStates] = useState<string[]>([
    'TN', 'MS', 'AR', 'AL', 'GA', 'TX', 'FL', 'MO', 'KY', 'OH', 'IN', 'IL'
  ]);
  const [isSaving, setIsSaving] = useState(false);

  const activeEntity = entities.find((e) => e.id === selectedEntityId) || entities[0];

  const handleStateToggle = (st: string) => {
    setSelectedStates((prev) =>
      prev.includes(st) ? prev.filter((s) => s !== st) : [...prev, st]
    );
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = {
        lenderCompanyId: selectedEntityId,
        maxLtv,
        minAmount: Number(minAmount.replace(/[^0-9]/g, '')),
        maxAmount: Number(maxAmount.replace(/[^0-9]/g, '')),
        rateRange,
        loanTerms,
        borrowerExperience: experience,
        states: selectedStates,
      };
      console.log('Saving preferences:', payload);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Encabezado */}
      <div>
        <h1 className="text-2xl font-bold text-[#0a2540] tracking-tight">
          Lending preferences
        </h1>
        <p className="text-sm text-[#425466] mt-1">
          Set your default deal criteria. Trusted borrowers can get custom terms beyond your defaults.
        </p>
      </div>

      {/* Select Entity */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2">
        <label className="text-sm font-semibold text-[#0a2540] min-w-[100px]">
          Select Entity
        </label>

        <div className="flex flex-wrap items-center gap-3 flex-1">
          {/* Dropdown de Entidades */}
          <div className="relative min-w-[260px] flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#aab7c4]">
              <Building2 className="w-4 h-4" />
            </div>
            <select
              value={selectedEntityId}
              onChange={(e) => setSelectedEntityId(e.target.value)}
              className="w-full pl-9 pr-10 py-2.5 text-sm bg-white border border-[#e6ebf1] rounded-lg text-[#0a2540] font-medium focus:outline-none focus:ring-2 focus:ring-[#635bff]/20 focus:border-[#635bff] appearance-none shadow-xs transition-all cursor-pointer"
            >
              {entities.map((ent) => (
                <option key={ent.id} value={ent.id}>
                  {ent.name} {ent.isPrimary ? '(Primary)' : ''}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-[#aab7c4]">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>

          {/* Botón Administrar Entidades */}
          <Link
            href="/lenderDashboard/entities"
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-sm font-medium text-[#425466] bg-white border border-[#e6ebf1] hover:border-[#635bff] hover:text-[#635bff] rounded-lg shadow-xs transition-all no-underline"
          >
            <Plus className="w-4 h-4" />
            <span>Manage Entities</span>
          </Link>
        </div>
      </div>

      {/* Tarjeta de Criterios Predeterminados */}
      <div className="bg-white rounded-xl border border-[#e6ebf1] p-6 sm:p-8 space-y-6 shadow-xs">
        <div>
          <h2 className="text-base font-semibold text-[#0a2540]">
            Default deal criteria
          </h2>
          <p className="text-xs text-[#425466] mt-0.5">
            Applied to all new borrowers you haven't worked with before under{' '}
            <span className="font-semibold text-[#0a2540]">{activeEntity.name}</span>.
          </p>
        </div>

        {/* Max LTV Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm font-medium">
            <span className="text-[#425466]">Max LTV (loan-to-value)</span>
            <span className="text-[#635bff] font-bold text-base">{maxLtv}%</span>
          </div>
          <input
            type="range"
            min={50}
            max={90}
            step={1}
            value={maxLtv}
            onChange={(e) => setMaxLtv(Number(e.target.value))}
            className="w-full accent-[#635bff] h-2 bg-[#f0efff] rounded-lg cursor-pointer"
          />
          <p className="text-xs text-[#aab7c4]">
            Borrowers over this threshold will see a warning and cannot submit without bringing the difference to closing.
          </p>
        </div>

        {/* Min & Max Amounts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#425466] mb-1.5">
              Minimum loan amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#aab7c4] text-sm">$</span>
              <input
                type="text"
                value={minAmount}
                onChange={(e) => setMinAmount(e.target.value)}
                className="w-full pl-7 pr-3 py-2 text-sm bg-white border border-[#e6ebf1] rounded-lg text-[#0a2540] focus:outline-none focus:ring-2 focus:ring-[#635bff]/20 focus:border-[#635bff]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#425466] mb-1.5">
              Maximum loan amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#aab7c4] text-sm">$</span>
              <input
                type="text"
                value={maxAmount}
                onChange={(e) => setMaxAmount(e.target.value)}
                className="w-full pl-7 pr-3 py-2 text-sm bg-white border border-[#e6ebf1] rounded-lg text-[#0a2540] focus:outline-none focus:ring-2 focus:ring-[#635bff]/20 focus:border-[#635bff]"
              />
            </div>
          </div>
        </div>

        {/* Rate Range & Terms */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#425466] mb-1.5">
              Preferred interest rate range
            </label>
            <select
              value={rateRange}
              onChange={(e) => setRateRange(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-[#e6ebf1] rounded-lg text-[#0a2540] focus:outline-none focus:ring-2 focus:ring-[#635bff]/20 focus:border-[#635bff]"
            >
              <option value="8% - 10%">8% - 10%</option>
              <option value="10% - 12%">10% - 12%</option>
              <option value="12% - 14%">12% - 14%</option>
              <option value="14%+">14%+</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#425466] mb-1.5">
              Preferred loan terms
            </label>
            <select
              value={loanTerms}
              onChange={(e) => setLoanTerms(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-[#e6ebf1] rounded-lg text-[#0a2540] focus:outline-none focus:ring-2 focus:ring-[#635bff]/20 focus:border-[#635bff]"
            >
              <option value="6 months only">6 months only</option>
              <option value="12 months">12 months</option>
              <option value="18 - 24 months">18 - 24 months</option>
            </select>
          </div>
        </div>

        {/* Experience */}
        <div>
          <label className="block text-xs font-semibold text-[#425466] mb-1.5">
            Minimum borrower experience
          </label>
          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white border border-[#e6ebf1] rounded-lg text-[#0a2540] focus:outline-none focus:ring-2 focus:ring-[#635bff]/20 focus:border-[#635bff]"
          >
            <option value="No minimum - first deals welcome">No minimum - first deals welcome</option>
            <option value="1-3 completed flips">1-3 completed flips</option>
            <option value="4+ completed projects">4+ completed projects</option>
          </select>
          <p className="text-xs text-[#aab7c4] mt-1">
            Deals from borrowers below this threshold won't appear in your feed.
          </p>
        </div>

        {/* States Multi-select */}
        <div>
          <label className="block text-xs font-semibold text-[#425466] mb-2">
            States I lend in
          </label>
          <div className="flex flex-wrap gap-2">
            {['TN', 'MS', 'AR', 'AL', 'GA', 'TX', 'FL', 'MO', 'KY', 'OH', 'IN', 'IL'].map((st) => {
              const active = selectedStates.includes(st);
              return (
                <button
                  type="button"
                  key={st}
                  onClick={() => handleStateToggle(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                    active
                      ? 'bg-[#f0efff] text-[#635bff] border-[#635bff]'
                      : 'bg-white text-[#425466] border-[#e6ebf1] hover:border-[#aab7c4]'
                  }`}
                >
                  {st}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex justify-end items-center gap-3 pt-2">
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium text-[#425466] hover:text-[#0a2540] transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="px-5 py-2 text-sm font-semibold text-white bg-[#635bff] hover:bg-[#5349e0] rounded-lg shadow-sm transition-all disabled:opacity-50"
        >
          {isSaving ? 'Saving...' : 'Save preferences'}
        </button>
      </div>
    </div>
  );
}