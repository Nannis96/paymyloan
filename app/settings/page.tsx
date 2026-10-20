"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  User, Bell, Code, Building, CreditCard, Shield, 
  Megaphone, Receipt, Gift, FileCheck, Layers, 
  Star, Briefcase, RefreshCw, Lock, BarChart, 
  Map, Info, X
} from "lucide-react";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import { SettingCard } from "@/app/components/ui";

export default function SettingsPage() {
  return (
    <SiteShell isDashboard={true}>
      <SettingsContent />
    </SiteShell>
  );
}

function SettingsContent() {
  const { t } = useSite();
  const s = t.settings;
  const [showBanner, setShowBanner] = useState(true);

  return (
    <div className="mx-auto w-full max-w-[1000px] animate-in fade-in duration-300 pb-16">
      
      <header className="mb-8">
        <h1 className="text-[26px] font-bold tracking-tight text-ink">{s.title}</h1>
      </header>

      {/* Banner de Anuncio */}
      {showBanner && (
        <div className="mb-8 flex items-center gap-3 rounded-lg border border-accent/20 bg-accent-soft px-4 py-3 text-[13px] text-accent">
          <Info size={16} className="shrink-0" />
          <span className="flex-1">{s.banner}</span>
          <a href="#" className="whitespace-nowrap font-semibold hover:underline">
            {s.inviteBtn}
          </a>
          <button onClick={() => setShowBanner(false)} className="ml-2 text-ink-3 hover:text-ink">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Seccion: Personal Settings */}
      <div className="mb-10">
        <h2 className="mb-4 text-[15px] font-bold tracking-tight text-ink">{s.sections.personal}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] overflow-hidden rounded-xl border border-rule bg-rule shadow-sm">
          <SettingCard 
            icon={<User size={18} />} 
            title={s.cards.personalDetails.title} 
            description={s.cards.personalDetails.desc} 
          />
          <SettingCard 
            icon={<Bell size={18} />} 
            title={s.cards.communication.title} 
            description={s.cards.communication.desc} 
          />
          <SettingCard 
            icon={<Code size={18} />} 
            title={s.cards.developers.title} 
            description={s.cards.developers.desc} 
          />
        </div>
      </div>

      {/* Seccion: Account Settings */}
      <div className="mb-10">
        <h2 className="mb-4 text-[15px] font-bold tracking-tight text-ink">{s.sections.account}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] overflow-hidden rounded-xl border border-rule bg-rule shadow-sm">
          <SettingCard 
            icon={<Building size={18} />} 
            title={s.cards.businessProfile.title} 
            description={s.cards.businessProfile.desc} 
          />
          <SettingCard 
            icon={<CreditCard size={18} />} 
            title={s.cards.banking.title} 
            description={s.cards.banking.desc} 
          />
          <SettingCard 
            icon={<Shield size={18} />} 
            title={s.cards.team.title} 
            description={s.cards.team.desc} 
          />
          <SettingCard 
            icon={<Megaphone size={18} />} 
            title={s.cards.notifications.title} 
            description={s.cards.notifications.desc} 
          />
          <SettingCard 
            icon={<Receipt size={18} />} 
            title={s.cards.billing.title} 
            description={s.cards.billing.desc} 
          />
          <SettingCard 
            icon={<Gift size={18} />} 
            title={s.cards.affiliate.title} 
            description={s.cards.affiliate.desc} 
          />
          <SettingCard 
            icon={<FileCheck size={18} />} 
            title={s.cards.compliance.title} 
            description={s.cards.compliance.desc} 
          />
          <SettingCard 
            icon={<Layers size={18} />} 
            title={s.cards.features.title} 
            description={s.cards.features.desc} 
          />
          <SettingCard 
            icon={<Star size={18} />} 
            title={s.cards.perks.title} 
            description={s.cards.perks.desc} 
          />
        </div>
      </div>

      {/* Seccion: Product Settings */}
      <div className="mb-10">
        <h2 className="mb-4 text-[15px] font-bold tracking-tight text-ink">{s.sections.product}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] overflow-hidden rounded-xl border border-rule bg-rule shadow-sm">
          <SettingCard 
            icon={<Briefcase size={18} />} 
            title={s.cards.bridgeLoans.title} 
            description={s.cards.bridgeLoans.desc} 
          />
          <SettingCard 
            icon={<RefreshCw size={18} />} 
            title={s.cards.slowFlip.title} 
            description={s.cards.slowFlip.desc} 
          />
          <SettingCard 
            icon={<Lock size={18} />} 
            title={s.cards.wireSecurity.title} 
            description={s.cards.wireSecurity.desc} 
          />
          <SettingCard 
            icon={<BarChart size={18} />} 
            title={s.cards.reporting.title} 
            description={s.cards.reporting.desc} 
          />
          <SettingCard 
            icon={<CreditCard size={18} />} 
            title={s.cards.payments.title} 
            description={s.cards.payments.desc} 
          />
          <SettingCard 
            icon={<Map size={18} />} 
            title={s.cards.dealMap.title} 
            description={s.cards.dealMap.desc} 
          />
        </div>
      </div>

      {/* Footer minimalista */}
      <div className="mt-8 flex flex-wrap gap-5 border-t border-rule pt-6 text-[13px]">
        <a href="#" className="font-medium text-ink-3 hover:text-accent">{s.footer.feedback}</a>
        <a href="#" className="font-medium text-ink-3 hover:text-accent">{s.footer.shortcuts}</a>
        <Link href="/aviso-de-privacidad" className="font-medium text-ink-3 hover:text-accent">{s.footer.privacy}</Link>
        <a href="#" className="font-medium text-ink-3 hover:text-accent">{s.footer.terms}</a>
      </div>

    </div>
  );
}