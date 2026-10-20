"use client";

import Link from "next/link";
import { useState } from "react";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import SimpleHeader from "@/app/components/ambos/SimpleHeader";
import { ShieldCheck, UserCheck, FileText, Home, CalendarCheck, ChevronDown } from "lucide-react";

// Iconos en orden para los Trust Badges
const TRUST_ICONS = [ShieldCheck, UserCheck, FileText, Home, CalendarCheck];

function FaqItem({ q, a, highlight, isOpen, onClick }: { q: string; a: string; highlight?: string; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="mb-2.5 overflow-hidden rounded-[10px] border border-rule bg-surface transition-colors">
      <div
        onClick={onClick}
        className={`flex cursor-pointer items-center justify-between p-4 px-5 text-[14px] font-bold text-ink transition-colors hover:bg-surface-2 select-none ${isOpen ? "bg-surface-2" : ""}`}
      >
        <span>{q}</span>
        <ChevronDown className={`ml-3 h-4 w-4 shrink-0 text-ink-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </div>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[800px]" : "max-h-0"}`}>
        <div className="px-5 pb-4 pt-0">
          <div className="border-t border-rule pt-3.5 text-[13px] leading-[1.75] text-ink-2">
            <div dangerouslySetInnerHTML={{ __html: a }} />
            {highlight && (
              <div className="mt-2.5 rounded-lg bg-accent-soft p-3 text-[12px] font-semibold text-accent">
                {highlight}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function LenderFaqContent() {
  const { t } = useSite();
  const lf = t.lenderFaq;
  
  // Guardamos un ID de la pregunta abierta (ej. "groupIndex-itemIndex")
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <SimpleHeader />
      
      {/* HERO */}
      <div className="bg-brand-dark px-6 py-16 text-center">
        <div className="mb-3.5 text-[11px] font-bold uppercase tracking-[1.5px] text-brand-purple">
          {lf.hero.label}
        </div>
        <h1 className="mb-3.5 text-[36px] font-black leading-[1.2] text-white">
          {lf.hero.title}
        </h1>
        <p className="mx-auto max-w-[560px] text-[16px] leading-[1.7] text-ink-3">
          {lf.hero.sub}
        </p>
      </div>

      <main className="mx-auto w-full max-w-[780px] px-6 py-16">
        
        {/* TRUST BADGES */}
        <div className="mb-12 flex flex-wrap gap-4">
          {lf.trustBadges.map((badge, i) => {
            const Icon = TRUST_ICONS[i];
            return (
              <div key={i} className="flex-1 min-w-[160px] rounded-[10px] border border-rule bg-surface-2 p-4 text-center">
                <div className="mb-2.5 mx-auto flex h-8 w-8 items-center justify-center text-accent">
                  <Icon size={24} strokeWidth={2} />
                </div>
                <div className="mb-1 text-[12px] font-bold text-ink">{badge.title}</div>
                <div className="text-[11px] text-ink-3">{badge.sub}</div>
              </div>
            );
          })}
        </div>

        {/* FAQ GROUPS */}
        <div className="flex flex-col gap-10">
          {lf.faqGroups.map((group, gIdx) => (
            <div key={gIdx}>
              <div className="mb-4 border-b-2 border-accent-soft pb-2 text-[13px] font-extrabold uppercase tracking-[0.5px] text-accent">
                {group.title}
              </div>
              <div className="flex flex-col">
                {group.items.map((item, iIdx) => {
                  const id = `${gIdx}-${iIdx}`;
                  return (
                    <FaqItem
                      key={id}
                      q={item.q}
                      a={item.a}
                      highlight={item.highlight}
                      isOpen={openId === id}
                      onClick={() => toggleFaq(id)}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-12 rounded-xl bg-brand-dark p-10 text-center">
          <div className="mb-2 text-[22px] font-extrabold text-white">{lf.cta.title}</div>
          <div className="mb-6 text-[14px] text-ink-3">{lf.cta.sub}</div>
          <Link href="/register" className="inline-block rounded-md bg-accent px-9 py-3.5 text-[15px] font-bold text-white transition-colors hover:bg-blue-700">
            {lf.cta.btn}
          </Link>
        </div>

      </main>
    </div>
  );
}

export default function LenderFaqPage() {
  return (
    <SiteShell isMinimal={true}>
      <LenderFaqContent />
    </SiteShell>
  );
}