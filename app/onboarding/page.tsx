"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, CheckCircle2, Check } from "lucide-react";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import { StatusPill } from "@/app/components/ui";

function OnboardingContent() {
  const { t, appMode } = useSite();
  const o = t.onboarding;
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState<"verification" | "contact" | "banking">("verification");

  // Mock de usuario actual
  const user = {
    name: "John Smith",
    roleLabel: appMode === "borrower" ? "Borrower" : "Lender",
    email: "john@example.com",
    phone: "+1 (901) 487-2991"
  };

  const handleComplete = () => {
    router.push(appMode === "lender" ? "/lender" : "/borrower");
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      {/* Background Gradient (Aurora effect from Stripe mockups) */}
      <div 
        className="fixed inset-0 -z-10 bg-bg transition-colors"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 20% 50%, rgba(99,91,255,.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(99,91,255,.1) 0%, transparent 45%),
            radial-gradient(ellipse at 60% 80%, rgba(255,100,60,.08) 0%, transparent 45%),
            radial-gradient(ellipse at 90% 60%, rgba(255,160,50,.1) 0%, transparent 40%)
          `
        }}
      />

      {/* Top Bar */}
      <div className="relative z-10 flex items-center justify-between px-8 py-5">
        <Link href="/" className="font-serif text-[20px] font-extrabold tracking-[-0.5px] text-accent no-underline">
          PayMy<span className="text-ink">Loan</span>.ai
        </Link>
        <button 
          onClick={handleComplete}
          className="text-sm font-medium text-accent transition-colors hover:text-ink hover:underline"
        >
          {o.topSkip}
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-1 items-start justify-center p-5 pb-16">
        <div className="w-full max-w-[560px] rounded-xl border border-rule bg-surface p-10 shadow-[0_4px_40px_rgba(0,0,0,0.08)] sm:p-12">
          
          <h1 className="mb-2 text-[22px] font-bold tracking-tight text-ink">
            {o.title}
          </h1>
          <p className="mb-6 text-[14px] leading-relaxed text-ink-2">
            {o.subtitle}
          </p>

          {/* Role Context Bar */}
          <div className="mb-5 flex items-center gap-2.5 rounded-lg border border-rule bg-surface-2 px-4 py-3 text-[13px] text-ink-2">
            <div className="h-2 w-2 shrink-0 rounded-full bg-green-500" />
            <span>
              {o.roleBar.signedInAs} <strong className="text-ink">{user.name}</strong> — {user.roleLabel} {o.roleBar.account}
            </span>
            <Link href="/login" className="ml-auto text-xs font-medium text-accent hover:underline">
              {o.roleBar.switchRole}
            </Link>
          </div>

          {/* Alert */}
          <div className="mb-6 flex items-start gap-2.5 rounded-lg border border-amber/30 bg-amber-soft p-3.5 text-[13px] leading-relaxed text-amber">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{o.alert}</span>
          </div>

          {/* Tabs */}
          <div className="mb-6 flex border-b border-rule">
            {(["verification", "contact", "banking"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`border-b-2 px-4 py-2.5 text-sm transition-all ${
                  activeTab === tab 
                    ? "border-accent font-semibold text-accent" 
                    : "border-transparent font-medium text-ink-3 hover:text-ink"
                }`}
              >
                {o.tabs[tab]}
              </button>
            ))}
          </div>

          {/* Verification Tab */}
          {activeTab === "verification" && (
            <div className="flex animate-in fade-in flex-col gap-0 duration-300">
              <MethodRow 
                title={o.verification.govId}
                desc={o.verification.govIdDesc}
                badge={<StatusPill status="success" label={o.badges.moreSecure} />}
                actionLabel={o.actions.upload}
              />
              <MethodRow 
                title={o.verification.authApp}
                desc={o.verification.authAppDesc}
                badge={<StatusPill status="success" label={o.badges.moreSecure} />}
                actionLabel={o.actions.add}
              />
              <MethodRow 
                title={o.verification.phoneSms}
                desc={<div className="mt-1 flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-green-500" /> <span className="rounded bg-surface-2 px-2 py-0.5 font-mono text-ink">{user.phone}</span></div>}
                badge={<StatusPill status="warning" label={o.badges.lessSecure} />}
                actionLabel={o.actions.update}
                secondary
              />
              <MethodRow 
                title={o.verification.entityDocs}
                desc={o.verification.entityDocsDesc}
                actionLabel={o.actions.upload}
                isLast
              />
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === "contact" && (
            <div className="flex animate-in fade-in flex-col gap-0 duration-300">
              <MethodRow 
                title={o.contact.email}
                desc={<div className="mt-1 flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-green-500" /> <span className="text-ink">{user.email}</span></div>}
                badge={<StatusPill status="success" label={o.badges.verified} />}
                actionLabel={o.actions.update}
                secondary
              />
              <MethodRow 
                title={o.contact.phone}
                desc={<div className="mt-1 flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-green-500" /> <span className="rounded bg-surface-2 px-2 py-0.5 font-mono text-ink">{user.phone}</span></div>}
                actionLabel={o.actions.update}
                secondary
              />
              <MethodRow 
                title={o.contact.mailing}
                desc={o.contact.mailingDesc}
                actionLabel={o.actions.add}
                isLast
              />
            </div>
          )}

          {/* Banking Tab */}
          {activeTab === "banking" && (
            <div className="flex animate-in fade-in flex-col gap-0 duration-300">
              <MethodRow 
                title={o.banking.bankAcc}
                desc={o.banking.bankAccDesc}
                actionLabel={o.actions.connect}
              />
              <MethodRow 
                title={o.banking.wireInst}
                desc={o.banking.wireInstDesc}
                actionLabel={o.actions.add}
                isLast
              />
            </div>
          )}

          <button 
            onClick={handleComplete}
            className="mt-8 w-full rounded-lg bg-accent px-5 py-3.5 text-[15px] font-bold text-accent-ink shadow-md transition-all hover:translate-y-[-1px] hover:bg-blue-700 hover:shadow-[0_4px_14px_rgba(37,99,235,0.3)]"
          >
            {o.cta} &rarr;
          </button>
        </div>
      </div>

      {/* Footer Links */}
      <div className="relative z-10 flex items-center justify-between border-t border-rule bg-bg/50 px-8 py-5 text-xs text-ink-3 backdrop-blur-sm">
        <span>&copy; {new Date().getFullYear()} PayMyLoan.ai</span>
        <div className="flex gap-4">
          <Link href="/aviso-de-privacidad" className="transition-colors hover:text-ink">Privacy & Terms</Link>
          <Link href="#" className="transition-colors hover:text-ink">Contact support</Link>
        </div>
      </div>
    </div>
  );
}

// Row component for consistent list rendering
function MethodRow({ 
  title, 
  desc, 
  badge, 
  actionLabel, 
  secondary = false,
  isLast = false 
}: { 
  title: string; 
  desc: React.ReactNode; 
  badge?: React.ReactNode; 
  actionLabel: string; 
  secondary?: boolean;
  isLast?: boolean;
}) {
  return (
    <div className={`flex items-start gap-3 py-4 ${!isLast ? 'border-b border-rule' : ''}`}>
      <div className="flex-1">
        <div className="mb-1 flex items-center gap-2">
          <span className="text-[14px] font-semibold text-ink">{title}</span>
          {badge}
        </div>
        <div className="text-[13px] leading-relaxed text-ink-3">{desc}</div>
      </div>
      <button 
        className={`mt-0.5 shrink-0 whitespace-nowrap rounded-md border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
          secondary 
            ? "border-rule-strong bg-surface text-ink-2 hover:border-ink hover:text-ink" 
            : "border-rule-strong bg-surface text-ink hover:border-ink hover:bg-surface-2"
        }`}
      >
        {actionLabel}
      </button>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <SiteShell isMinimal={true}>
      <OnboardingContent />
    </SiteShell>
  );
}