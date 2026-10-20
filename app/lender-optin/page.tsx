"use client";

import { useState } from "react";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";

function LenderOptinContent() {
  const { t } = useSite();
  const lo = t.lenderOptin;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simula envio de formulario a un webhook o plataforma de email marketing
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Checklist enviada con éxito.");
    }, 1500);
  };

  return (
    <div className="bg-brand-dark min-h-screen text-white font-sans selection:bg-accent selection:text-white">
      {/* NAVBAR */}
      <nav className="flex h-[52px] items-center px-6 md:px-12 border-b border-white/10">
        <div className="text-[17px] font-extrabold tracking-[-0.3px] text-white">
          Pay<span className="text-accent">My</span>Loan.ai
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="mx-auto max-w-[1200px] px-6 py-10 lg:px-20 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 lg:gap-20 items-center">
          
          {/* Left: Copy */}
          <div>
            <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.8px] text-accent">
              {lo.hero.eyebrow}
            </div>
            <h1 className="mb-5 text-[40px] md:text-[48px] font-black leading-[1.1] tracking-[-0.5px]">
              {lo.hero.title1}
              <span className="text-brand-purple">{lo.hero.title2}</span>
            </h1>
            <p className="mb-8 text-[17px] leading-[1.7] text-[#a3b8cc]">
              {lo.hero.body}
            </p>
            
            <div className="flex flex-wrap gap-6">
              {lo.hero.proofs.map((proof, idx) => (
                <div key={idx} className="flex items-center gap-2 text-[13px] text-[#a3b8cc]">
                  <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"></div>
                  {proof}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form Card */}
          <div className="rounded-2xl bg-white p-8 md:p-9 text-[#0a2540] shadow-2xl">
            <h2 className="mb-1 text-[20px] font-extrabold">{lo.form.title}</h2>
            <p className="mb-6 text-[13px] text-ink-3">{lo.form.sub}</p>

            {/* Checklist Preview Box */}
            <div className="mb-5 rounded-xl border border-rule-strong bg-surface-2 px-[18px] py-4">
              <div className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.4px] text-ink-3">
                {lo.form.previewTitle}
              </div>
              <div className="flex flex-col gap-2">
                {lo.form.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-[13px] text-ink-2">
                    <div className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-accent text-[10px] font-extrabold text-white">
                      {idx + 1}
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.4px] text-ink-3">
                  {lo.form.fName}
                </label>
                <input 
                  type="text" 
                  placeholder={lo.form.fNamePh} 
                  required
                  className="w-full rounded-lg border border-rule-strong bg-white px-3.5 py-3 text-[14px] text-ink outline-none transition-colors focus:border-accent focus:shadow-[0_0_0_3px_rgba(99,91,255,0.12)]" 
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.4px] text-ink-3">
                  {lo.form.email}
                </label>
                <input 
                  type="email" 
                  placeholder={lo.form.emailPh} 
                  required
                  className="w-full rounded-lg border border-rule-strong bg-white px-3.5 py-3 text-[14px] text-ink outline-none transition-colors focus:border-accent focus:shadow-[0_0_0_3px_rgba(99,91,255,0.12)]" 
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.4px] text-ink-3">
                  {lo.form.capitalLabel}
                </label>
                <select 
                  required
                  defaultValue=""
                  className="w-full appearance-none rounded-lg border border-rule-strong bg-white px-3.5 py-3 text-[14px] text-ink outline-none transition-colors focus:border-accent focus:shadow-[0_0_0_3px_rgba(99,91,255,0.12)] cursor-pointer"
                >
                  <option value="" disabled>{lo.form.capSelect}</option>
                  {lo.form.capOptions.map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="mt-1 w-full rounded-lg bg-accent px-4 py-3.5 text-[15px] font-extrabold text-white transition-colors hover:bg-blue-700 disabled:opacity-80"
              >
                {isSubmitting ? lo.form.sending : lo.form.submit}
              </button>
            </form>
            
            <p className="mt-3 text-center text-[11px] leading-[1.5] text-ink-3">
              {lo.form.disclaimer}
            </p>
          </div>

        </div>
      </div>

      {/* WHAT YOU GET */}
      <div className="mx-auto max-w-[1200px] px-6 py-12 lg:px-20 lg:py-16">
        <h2 className="mb-2 text-center text-[28px] font-extrabold text-white">
          {lo.gets.title}
        </h2>
        <p className="mb-12 text-center text-[15px] text-[#a3b8cc]">
          {lo.gets.sub}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {lo.gets.cards.map((card, idx) => (
            <div key={idx} className="rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="mb-3.5 text-[28px]">{card.icon}</div>
              <h3 className="mb-2 text-[15px] font-extrabold text-white">{card.title}</h3>
              <p className="text-[13px] leading-[1.6] text-[#a3b8cc]">{card.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SEQUENCE PREVIEW */}
      <div className="mx-auto max-w-[1200px] px-6 pb-20 pt-6 lg:px-20">
        <h2 className="mb-1.5 text-[22px] font-extrabold text-white">
          {lo.sequence.title}
        </h2>
        <p className="mb-8 text-[14px] text-[#a3b8cc]">
          {lo.sequence.sub}
        </p>

        <div className="flex flex-col gap-3">
          {lo.sequence.steps.map((step, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 rounded-xl border border-white/10 bg-white/5 p-4 sm:px-5">
              {/* Day Badge */}
              <div className="min-w-[60px] text-left sm:text-center">
                <div className="text-[10px] font-bold uppercase tracking-[0.4px] text-[#5a7a94]">
                  {lo.sequence.dayLabel}
                </div>
                <div className="text-[18px] font-extrabold text-accent">
                  {step.day}
                </div>
              </div>
              
              {/* Info */}
              <div className="flex-1">
                <div className="text-[14px] font-bold text-white">{step.subject}</div>
                <div className="mt-1 text-[12px] text-[#a3b8cc]">{step.desc}</div>
              </div>

              {/* Tag */}
              <div className={`self-start sm:self-center mt-2 sm:mt-0 rounded-md px-2 py-1 text-[10px] font-bold shrink-0 ${
                step.tagColor === 'purple' 
                  ? 'bg-accent/20 text-brand-purple' 
                  : 'bg-green-600/20 text-green-300'
              }`}>
                {step.tag}
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}

export default function LenderOptinPage() {
  return (
    <SiteShell isMinimal={true}>
      <LenderOptinContent />
    </SiteShell>
  );
}