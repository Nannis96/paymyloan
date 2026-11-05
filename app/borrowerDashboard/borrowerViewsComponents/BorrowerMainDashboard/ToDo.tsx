"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useSite } from "@/app/components/layout/SiteShell";

export function ToDo({ dict, tasks }: { dict: any, tasks: any[] }) {
  const { lang } = useSite();
  const isEs = lang === "es";
  
  const doneCount = tasks.filter(t => t.done).length;

  return (
    <div className="bg-amber-soft border border-amber rounded-xl p-6 relative overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-xl text-ink">To-do</h2>
        <span className="text-sm font-bold text-ink-2">{doneCount} {isEs ? "de" : "of"} {tasks.length} {isEs ? "completados" : "done"}</span>
      </div>
      
      <div className="grid grid-cols-2 gap-y-3 gap-x-6 mb-6">
        {tasks.map((task, i) => (
          <label key={i} className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={task.done} readOnly className="rounded border-rule text-brand-dark focus:ring-brand-dark" />
            <span className={`text-sm ${task.done ? 'line-through text-ink-3' : 'text-ink'}`}>
              {task.label}
            </span>
          </label>
        ))}
      </div>
      
      <div className="border-t border-amber-soft pt-4 relative z-10">
        <h3 className="font-bold text-ink mb-3">{isEs ? "Agrega contactos de titulo, seguro y contabilidad" : "Add title, insurance and bookkeeping contacts"}</h3>
        <div className="flex flex-col gap-3 w-2/3">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-bold text-sm text-ink flex items-center gap-2">
                <input type="checkbox" checked readOnly className="rounded border-rule" /> {isEs ? "Compania de Titulos" : "Title company"}
              </p>
              <p className="text-xs text-ink-2">{isEs ? "Agregalos una vez. Usalos en cada trato." : "Add them once. Use them on every deal."}</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-sm text-ink flex items-center gap-2">
                <input type="checkbox" readOnly className="rounded border-rule" /> {isEs ? "Agente de Seguros" : "Insurance agent"}
              </p>
            </div>
            <Link href="/borrowerDashboard/contacts" className="px-3 py-1 text-xs font-bold bg-surface border border-rule rounded-md no-underline text-ink">{isEs ? "Agregar" : "Add contact"}</Link>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-sm text-ink flex items-center gap-2">
                <input type="checkbox" readOnly className="rounded border-rule" /> {isEs ? "Contador" : "Bookkeeper"}
              </p>
            </div>
            <Link href="/borrowerDashboard/contacts" className="px-3 py-1 text-xs font-bold bg-surface border border-rule rounded-md no-underline text-ink">{isEs ? "Agregar" : "Add contact"}</Link>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-2 right-4 w-24 h-24">
        <Image src="/mascot/buscando.png" alt="Mascot" fill className="object-contain" />
      </div>
    </div>
  );
}