"use client";

import Image from "next/image";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";

function AboutUsContent() {
  const { t } = useSite();
  const c = t.aboutUs;

  return (
    <div className="flex flex-col w-full bg-bg font-sans">
      
      {/* 1. HERO SECTION (image.png) */}
      <section className="flex flex-col items-center justify-center pt-24 pb-16 px-6 text-center">
        <Image 
          src="/mascot/image.png" 
          alt="Mascota PML Logo" 
          width={180} 
          height={180} 
          className="object-contain mb-6"
        />
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-ink mb-2">
          PayMy<span className="text-accent">Loan</span>.ai
        </h1>
        <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-ink-3">
          {c.hero.subtitle}
        </p>
      </section>

      {/* 2. WHAT IS PAYMYLOAN (feliz.png) */}
      <section className="bg-surface py-20 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 md:pr-8">
            <h2 className="text-3xl md:text-4xl font-black text-ink mb-2">
              {c.whatIs.title.split('PayMyLoan.ai?')[0]}
              <span className="text-accent block">PayMyLoan.ai?</span>
            </h2>
            <p className="text-ink-2 leading-relaxed mt-6">
              {c.whatIs.desc}
            </p>
          </div>
          <div className="shrink-0 relative flex flex-col items-center">
            <Image 
              src="/mascot/feliz.png" 
              alt="Mascota PML Feliz" 
              width={220} 
              height={220} 
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* 3. WHO IT'S FOR (buscando.png) */}
      <section className="bg-surface-2 py-20 px-6">
        <div className="max-w-5xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
          <div className="shrink-0 relative flex flex-col items-center">
            <Image 
              src="/mascot/buscando.png" 
              alt="Mascota PML Buscando" 
              width={220} 
              height={220} 
              className="object-contain -scale-x-100"
            />
          </div>
          <div className="flex-1 md:pl-8">
            <h2 className="text-3xl md:text-4xl font-black text-ink mb-6">
              {c.whoItIsFor.title}
            </h2>
            <div className="space-y-6 text-ink-2 leading-relaxed text-[15px]">
              <p>
                <strong className="text-ink">{c.whoItIsFor.borrowersLabel}</strong> {c.whoItIsFor.borrowersDesc}
              </p>
              <p>
                <strong className="text-ink">{c.whoItIsFor.lendersLabel}</strong> {c.whoItIsFor.lendersDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE CORE PROBLEM (escribiendo.png) */}
      <section className="bg-brand-dark py-20 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 md:pr-8">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-2">
              {c.coreProblem.title.split('PML Solves')[0]}
              <span className="text-accent block">PML Solves</span>
            </h2>
            <p className="text-ink-3 leading-relaxed mt-6">
              {c.coreProblem.desc}
            </p>
          </div>
          <div className="shrink-0 relative flex flex-col items-center">
            <Image 
              src="/mascot/escribiendo.png" 
              alt="Mascota PML Escribiendo" 
              width={260} 
              height={260} 
              className="object-contain"
            />
          </div>
        </div>
      </section>

    </div>
  );
}

export default function AboutUsPage() {
  return (
    <SiteShell>
      <AboutUsContent />
    </SiteShell>
  );
}