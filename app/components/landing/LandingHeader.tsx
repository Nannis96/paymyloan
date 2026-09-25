"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useSite } from "@/app/components/layout/SiteShell";
import ThemeToggle from "@/app/components/ambos/ThemeToggle";
import LangToggle from "@/app/components/ambos/LangToggle";

export default function LandingHeader() {
  const { t, setAppMode, setActiveTab } = useSite();
  const ln = t.landingNav;
  const router = useRouter();
  const pathname = usePathname();

  const handleModeChange = (mode: "general" | "lender" | "borrower" | "why-pml") => {
    setAppMode(mode);
    setActiveTab(0);
    
    // Si el usuario no esta en el inicio, lo redirigimos
    if (pathname !== "/") {
      router.push("/");
    } else {
      // Si ya esta en el inicio, solo subimos el scroll suavemente
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav className="sticky top-0 z-[100] flex h-[52px] items-center justify-between border-b border-rule bg-surface px-6 md:px-10">
      <div className="flex items-center">
        <button 
          onClick={() => handleModeChange("general")} 
          className="mr-10 text-[17px] font-extrabold text-ink no-underline"
        >
          PayMy<span className="text-accent">Loan</span>.ai
        </button>
        
        <div className="hidden flex-1 items-center gap-7 text-[13px] font-medium text-ink-2 lg:flex">
          <button 
            onClick={() => handleModeChange("lender")} 
            className="transition-colors hover:text-ink font-medium"
          >
            {ln.lenders}
          </button>
          <button
              onClick={() => handleModeChange("borrower")}
              className="transition-colors hover:text-ink font-medium"
            >
              {ln.borrowers}
            </button>

            <button onClick={() => handleModeChange("why-pml")} className="transition-colors hover:text-ink font-medium">{ln.why}</button>
            <Link href="/founder-story" className="transition-colors hover:text-ink">{ln.demo}</Link>
          <Link href="/affiliates" className="transition-colors hover:text-ink">{ln.affiliates}</Link>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="hidden items-center gap-4 sm:flex">
          <Link href="/login" className="text-[13px] font-semibold text-ink-2 transition-colors hover:text-ink">
            {ln.signIn}
          </Link>
          <Link href="/register" className="rounded-md bg-accent px-[18px] py-2 text-[13px] font-bold text-white transition-colors hover:bg-blue-700">
            {ln.getStarted}
          </Link>
        </div>
        <div className="flex items-center gap-2 border-l border-rule pl-4">
          <LangToggle className="h-8 min-w-8 rounded-md px-1 text-xs font-bold text-ink-3 hover:bg-surface-2 hover:text-ink" />
          <ThemeToggle iconSize={15} className="h-8 w-8 rounded-md text-ink-3 hover:bg-surface-2 hover:text-ink" />
        </div>
      </div>
    </nav>
  );
}