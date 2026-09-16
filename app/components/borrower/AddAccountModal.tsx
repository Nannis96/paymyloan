// app/components/AddAccountModal.tsx
"use client";

import { X } from "lucide-react";
import { useSite } from "./layout/SiteShell";

interface AddAccountModalProps {
  onClose: () => void;
}

export default function AddAccountModal({ onClose }: AddAccountModalProps) {
  const { t } = useSite();
  const mp = t.managePayments;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Mock: Cuenta vinculada a la entidad exitosamente.");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-[500px] overflow-hidden rounded-2xl border border-rule bg-surface shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-surface-2 text-ink transition-colors hover:bg-crit hover:text-white"
        >
          <X size={18} />
        </button>
        
        <div className="p-6 sm:p-8">
          <h2 className="mb-2 text-2xl font-black tracking-tight text-ink">
            {mp.addAccountModal?.title}
          </h2>
          <p className="mb-6 text-sm leading-relaxed text-ink-2">
            {mp.addAccountModal?.subtitle}
          </p>
          
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-ink-3">
                {mp.addAccountModal?.selectEntity}
              </label>
              {/* Solución al error de React: Usar defaultValue="" en el select */}
              <select 
                defaultValue=""
                className="w-full appearance-none rounded-lg border border-rule bg-surface-2 px-4 py-3 text-[14px] text-ink outline-none transition-colors focus:border-accent cursor-pointer"
              >
                <option value="" disabled>Selecciona...</option>
                <option value="texas">Texas Properties LLC</option>
                <option value="nextgen">NextGen Growth Corp</option>
                <option value="new">Agregar Nueva Entidad...</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-ink-3">
                  {mp.addAccountModal?.routingLabel}
                </label>
                <input type="text" placeholder="000000000" className="w-full rounded-lg border border-rule bg-surface-2 px-4 py-3 text-[14px] font-mono text-ink outline-none transition-colors focus:border-accent" required />
              </div>
              <div>
                <label className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-ink-3">
                  {mp.addAccountModal?.accountLabel}
                </label>
                <input type="text" placeholder="0000000000" className="w-full rounded-lg border border-rule bg-surface-2 px-4 py-3 text-[14px] font-mono text-ink outline-none transition-colors focus:border-accent" required />
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row mt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-lg border border-rule-strong bg-surface px-5 py-3.5 text-[15px] font-bold text-ink transition-colors hover:bg-surface-2"
              >
                {mp.addAccountModal?.cancel}
              </button>
              <button
                type="submit"
                className="flex-1 rounded-lg bg-accent px-5 py-3.5 text-[15px] font-bold text-accent-ink transition-opacity hover:opacity-90"
              >
                {mp.addAccountModal?.submit}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}