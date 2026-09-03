"use client";

import { useSite } from "./SiteShell";
import RegisterForm from "./RegisterForm";

export default function PmlCta() {
  const { t } = useSite();
  const c = t.pmlCta;

  return (
    <section id="early-access" className="mx-auto mb-24 max-w-[1100px] px-6 lg:px-14">
      <div className="flex flex-col items-center justify-between gap-10 rounded-[20px] bg-[#0a0a0a] px-8 py-14 sm:px-12 md:flex-row md:py-20 lg:px-20 shadow-2xl">
        <div className="flex-1 shrink-0 text-center md:text-left">
          <h2 className="mb-3 text-[42px] font-black leading-[1.1] tracking-[-1px] text-white">
            {c.title1}<br />{c.title2}
          </h2>
          <p className="text-base text-gray-400">
            <strong className="text-white">{c.brand}</strong>{c.brandSuffix}<br />
            {c.desc}
          </p>
        </div>
        
        <div className="w-full max-w-[420px] shrink-0">
          <RegisterForm />
        </div>
      </div>
    </section>
  );
}