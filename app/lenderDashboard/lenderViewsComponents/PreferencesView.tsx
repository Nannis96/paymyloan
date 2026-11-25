'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { Building2, Plus, ChevronDown } from 'lucide-react';
import { api, ApiError } from '@/app/lib/apiFetch';
import { API_ROUTES } from '@/app/lib/endpoints';

interface EntityOption {
  id: string;
  name: string;
}

interface LendingPreferences {
  maxLtv: number;
  minAmount: number;
  maxAmount: number;
  rateRange: string;
  loanTerms: string;
  borrowerExperience: string;
  states: string[];
}

// Valores iniciales de una empresa que aún no guardó preferencias.
const DEFAULTS: LendingPreferences = {
  maxLtv: 75,
  minAmount: 50000,
  maxAmount: 500000,
  rateRange: '10% - 12%',
  loanTerms: '6 months only',
  borrowerExperience: 'No minimum - first deals welcome',
  states: [],
};

const toNumber = (v: string) => Number(v.replace(/[^0-9]/g, ''));
const fmt = (n: number) => n.toLocaleString('en-US');

export default function PreferencesView() {
  const [entities, setEntities] = useState<EntityOption[]>([]);
  const [selectedEntityId, setSelectedEntityId] = useState<string>('');
  const [loaded, setLoaded] = useState<LendingPreferences>(DEFAULTS);

  const [maxLtv, setMaxLtv] = useState<number>(DEFAULTS.maxLtv);
  const [minAmount, setMinAmount] = useState<string>(fmt(DEFAULTS.minAmount));
  const [maxAmount, setMaxAmount] = useState<string>(fmt(DEFAULTS.maxAmount));
  const [rateRange, setRateRange] = useState<string>(DEFAULTS.rateRange);
  const [loanTerms, setLoanTerms] = useState<string>(DEFAULTS.loanTerms);
  const [experience, setExperience] = useState<string>(DEFAULTS.borrowerExperience);
  const [selectedStates, setSelectedStates] = useState<string[]>(DEFAULTS.states);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  const activeEntity = entities.find((e) => e.id === selectedEntityId);

  const applyPrefs = useCallback((p: LendingPreferences) => {
    setMaxLtv(p.maxLtv);
    setMinAmount(fmt(p.minAmount));
    setMaxAmount(fmt(p.maxAmount));
    setRateRange(p.rateRange);
    setLoanTerms(p.loanTerms);
    setExperience(p.borrowerExperience);
    setSelectedStates(p.states);
  }, []);

  // Entidades reales del lender.
  useEffect(() => {
    (async () => {
      try {
        const me = await api<{ lenderCompanies?: { id: string; companyName: string }[] }>(API_ROUTES.lenders.me);
        const list = (me.lenderCompanies || []).map((c) => ({ id: c.id, name: c.companyName }));
        setEntities(list);
        if (list[0]) setSelectedEntityId(list[0].id);
      } catch (e) {
        setMessage({ ok: false, text: e instanceof ApiError ? e.message : 'Could not load your entities.' });
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  // Preferencias guardadas de la entidad seleccionada.
  useEffect(() => {
    if (!selectedEntityId) return;
    let cancelled = false;
    (async () => {
      try {
        const saved = await api<LendingPreferences | null>(API_ROUTES.lenders.meCompanyPreferences(selectedEntityId));
        if (cancelled) return;
        // api() devuelve el sobre completo cuando data es null: sin maxLtv = aún no hay preferencias.
        const p = typeof saved?.maxLtv === 'number' ? saved : DEFAULTS;
        setLoaded(p);
        applyPrefs(p);
        setMessage(null);
      } catch (e) {
        if (!cancelled) setMessage({ ok: false, text: e instanceof ApiError ? e.message : 'Could not load preferences.' });
      }
    })();
    return () => { cancelled = true; };
  }, [selectedEntityId, applyPrefs]);

  const handleStateToggle = (st: string) => {
    setSelectedStates((prev) =>
      prev.includes(st) ? prev.filter((s) => s !== st) : [...prev, st]
    );
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);
    try {
      const payload: LendingPreferences = {
        maxLtv,
        minAmount: toNumber(minAmount),
        maxAmount: toNumber(maxAmount),
        rateRange,
        loanTerms,
        borrowerExperience: experience,
        states: selectedStates,
      };
      const saved = await api<LendingPreferences>(API_ROUTES.lenders.meCompanyPreferences(selectedEntityId), {
        method: 'PUT',
        body: JSON.stringify(payload),
      });
      setLoaded(saved);
      setMessage({ ok: true, text: 'Preferences saved.' });
    } catch (e) {
      setMessage({ ok: false, text: e instanceof ApiError ? e.message : 'Could not save preferences.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    applyPrefs(loaded);
    setMessage(null);
  };

  if (!isLoading && entities.length === 0) {
    return (
      <div className="max-w-4xl mx-auto space-y-3">
        <h1 className="text-2xl font-bold text-[#0a2540] tracking-tight">Lending preferences</h1>
        <p className="text-sm text-[#425466]">
          {message?.text ?? 'You need an entity before setting preferences.'}{' '}
          <Link href="/lenderDashboard/entities" className="text-[#635bff] font-medium">Manage Entities</Link>
        </p>
      </div>
    );
  }

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
                  {ent.name}
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
            <span className="font-semibold text-[#0a2540]">{activeEntity?.name}</span>.
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
        {message && (
          <span className={`text-sm mr-auto ${message.ok ? 'text-green-600' : 'text-red-600'}`}>{message.text}</span>
        )}
        <button
          type="button"
          onClick={handleCancel}
          className="px-4 py-2 text-sm font-medium text-[#425466] hover:text-[#0a2540] transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving || isLoading || !selectedEntityId}
          className="px-5 py-2 text-sm font-semibold text-white bg-[#635bff] hover:bg-[#5349e0] rounded-lg shadow-sm transition-all disabled:opacity-50"
        >
          {isSaving ? 'Saving...' : 'Save preferences'}
        </button>
      </div>
    </div>
  );
}