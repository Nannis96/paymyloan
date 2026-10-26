'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Building2, Plus, CheckCircle2, ChevronDown } from 'lucide-react';

interface EntityOption {
  id: string;
  name: string;
  isPrimary?: boolean;
  status?: string;
}

// Entidades de ejemplo alineadas con el módulo de Entities
const DEFAULT_ENTITIES: EntityOption[] = [
  { id: 'ent-1', name: 'Apex Capital Lending LLC', isPrimary: true, status: 'VERIFIED' },
  { id: 'ent-2', name: 'Lone Star Funding Group', isPrimary: false, status: 'VERIFIED' },
  { id: 'ent-3', name: 'Metroplex Investments Inc.', isPrimary: false, status: 'PENDING' },
];

export default function PreferencesView() {
  // Estado para la entidad seleccionada
  const [entities, setEntities] = useState<EntityOption[]>(DEFAULT_ENTITIES);
  const [selectedEntityId, setSelectedEntityId] = useState<string>(DEFAULT_ENTITIES[0].id);

  // Estados de criterios de préstamo
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
      // Payload asociado a la entidad elegida
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

      console.log('Saving preferences for entity:', payload);
      // await apiFetch('/api/lenders/me/preferences', { method: 'POST', body: JSON.stringify(payload) });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Encabezado */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          Lending preferences
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Set your default deal criteria. Trusted borrowers can get custom terms beyond your defaults.
        </p>
      </div>

      {/* --- BLOQUE AJUSTADO: SELECT ENTITY (Recuadros marcados en rojo) --- */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2">
        <label className="text-sm font-semibold text-slate-900 dark:text-slate-100 min-w-[100px]">
          Select Entity
        </label>

        <div className="flex flex-wrap items-center gap-3 flex-1">
          {/* Recuadro 1: Dropdown de Entidades */}
          <div className="relative min-w-[260px] flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Building2 className="w-4 h-4" />
            </div>
            <select
              value={selectedEntityId}
              onChange={(e) => setSelectedEntityId(e.target.value)}
              className="w-full pl-9 pr-10 py-2.5 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 appearance-none shadow-xs transition-all"
            >
              {entities.map((ent) => (
                <option key={ent.id} value={ent.id}>
                  {ent.name} {ent.isPrimary ? '(Primary)' : ''}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>

          {/* Recuadro 2: Acción rápida (Gestionar / Añadir Entidad) */}
          <Link
            href="/lenderDashboard/entities"
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg shadow-xs transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Manage Entities</span>
          </Link>
        </div>
      </div>

      {/* Tarjeta de Criterios Predeterminados */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 space-y-6 shadow-xs">
        <div>
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">
            Default deal criteria
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Applied to all new borrowers you haven't worked with before under{' '}
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {activeEntity.name}
            </span>.
          </p>
        </div>

        {/* Max LTV Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm font-medium">
            <span className="text-slate-700 dark:text-slate-300">Max LTV (loan-to-value)</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-base">{maxLtv}%</span>
          </div>
          <input
            type="range"
            min={50}
            max={90}
            step={1}
            value={maxLtv}
            onChange={(e) => setMaxLtv(Number(e.target.value))}
            className="w-full accent-indigo-600 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
          />
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Borrowers over this threshold will see a warning and cannot submit without bringing the difference to closing.
          </p>
        </div>

        {/* Min & Max Loan Amounts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Minimum loan amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
              <input
                type="text"
                value={minAmount}
                onChange={(e) => setMinAmount(e.target.value)}
                className="w-full pl-7 pr-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Maximum loan amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
              <input
                type="text"
                value={maxAmount}
                onChange={(e) => setMaxAmount(e.target.value)}
                className="w-full pl-7 pr-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>
        </div>

        {/* Rate Range & Terms */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Preferred interest rate range
            </label>
            <select
              value={rateRange}
              onChange={(e) => setRateRange(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="8% - 10%">8% - 10%</option>
              <option value="10% - 12%">10% - 12%</option>
              <option value="12% - 14%">12% - 14%</option>
              <option value="14%+">14%+</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Preferred loan terms
            </label>
            <select
              value={loanTerms}
              onChange={(e) => setLoanTerms(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="6 months only">6 months only</option>
              <option value="12 months">12 months</option>
              <option value="18 - 24 months">18 - 24 months</option>
            </select>
          </div>
        </div>

        {/* Minimum borrower experience */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Minimum borrower experience
          </label>
          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="No minimum - first deals welcome">No minimum - first deals welcome</option>
            <option value="1-3 completed flips">1-3 completed flips</option>
            <option value="4+ completed projects">4+ completed projects</option>
          </select>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
            Deals from borrowers below this threshold won't appear in your feed.
          </p>
        </div>

        {/* States multi-select */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
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
                      ? 'bg-indigo-50 text-indigo-600 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                  }`}
                >
                  {st}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Botones inferiores */}
      <div className="flex justify-end items-center gap-3 pt-2">
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-all disabled:opacity-50"
        >
          {isSaving ? 'Saving...' : 'Save preferences'}
        </button>
      </div>
    </div>
  );
}