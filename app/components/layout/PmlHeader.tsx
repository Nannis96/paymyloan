import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { useSite } from "./SiteShell";

export default function PmlHeader() {
  const { t, lang, setLang, resolvedTheme, toggleTheme, appMode, setAppMode, lastAppMode, activeTab, setActiveTab } = useSite();
  const p = t.prototype;

  const tabs = appMode === "lender" ? p.tabs.lender : appMode === "borrower" ? p.tabs.borrower : [];

  return (
    <header className="sticky top-0 z-50 bg-bg/95 backdrop-blur-sm border-b border-rule">
      <nav className="mx-auto flex w-full max-w-[1400px] items-center px-4 py-3 lg:px-8">
        
        {/* LOGO: Al hacer clic intercala entre modo General y el ultimo modo especializado */}
        <button 
          onClick={() => { 
            if (appMode === "general" && lastAppMode) {
              setAppMode(lastAppMode);
            } else {
              setAppMode("general"); 
            }
            setActiveTab(0); 
            window.scrollTo({ top: 0 }); 
          }} 
          className="mr-8 text-xl font-extrabold tracking-tight text-ink no-underline hover:opacity-80"
        >
          PML<span className="text-accent">.ai</span>
        </button>

        {appMode === "general" ? (
          // NAVEGACIÓN MODO GENERAL
          <div className="hidden flex-1 items-center justify-end gap-6 md:flex">
            <Link href="/#features" className="text-sm font-medium text-ink-2 no-underline hover:text-ink">
              {t.nav.features}
            </Link>
            <Link href="/#how" className="text-sm font-medium text-ink-2 no-underline hover:text-ink">
              {t.nav.howItWorks}
            </Link>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setLang(lang === "es" ? "en" : "es")}
                className="flex h-9 min-w-9 items-center justify-center rounded-full px-2 text-xs font-bold text-ink-2 hover:bg-surface-2 hover:text-ink transition-colors"
              >
                {lang === "es" ? "EN" : "ES"}
              </button>
              <button
                type="button"
                onClick={toggleTheme}
                className="flex h-9 w-9 items-center justify-center rounded-full text-ink-2 hover:bg-surface-2 transition-colors"
              >
                {resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
            <Link href="/login" className="rounded-lg bg-ink px-5 py-2.5 text-sm font-semibold text-bg no-underline transition-transform hover:scale-105">
              {t.nav.cta}
            </Link>
          </div>
        ) : (
          // NAVEGACIÓN MODO APLICACIÓN (Lender / Borrower)
          <>
            {/* Pestañas dinámicas */}
            <div className="hidden flex-1 items-center gap-1 overflow-x-auto md:flex">
              {tabs.map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  className={`whitespace-nowrap px-4 py-2.5 text-[13px] font-bold transition-all border-b-[3px] ${
                    activeTab === i 
                      ? "border-accent text-accent" 
                      : "border-transparent text-ink-3 hover:text-ink"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            {/* Toggles de Modo + Ajustes */}
            <div className="flex items-center gap-4 ml-auto">
              <div className="hidden lg:flex rounded-lg border border-rule bg-surface-2 p-1">
                <button
                  onClick={() => { setAppMode("lender"); setActiveTab(0); }}
                  className={`rounded-md px-3 py-1.5 text-xs font-bold transition-colors ${
                    appMode === "lender" ? "bg-accent text-accent-ink shadow-sm" : "text-ink-2 hover:text-ink"
                  }`}
                >
                  {p.modes.lender}
                </button>
                <button
                  onClick={() => { setAppMode("borrower"); setActiveTab(0); }}
                  className={`rounded-md px-3 py-1.5 text-xs font-bold transition-colors ${
                    appMode === "borrower" ? "bg-accent text-accent-ink shadow-sm" : "text-ink-2 hover:text-ink"
                  }`}
                >
                  {p.modes.borrower}
                </button>
              </div>
              <div className="flex items-center gap-1 border-l border-rule pl-4">
                <button
                  onClick={() => setLang(lang === "es" ? "en" : "es")}
                  className="flex h-8 min-w-8 items-center justify-center rounded-md px-1 text-xs font-bold text-ink-3 hover:bg-surface-2 hover:text-ink transition-colors"
                >
                  {lang === "es" ? "EN" : "ES"}
                </button>
                <button
                  onClick={toggleTheme}
                  className="flex h-8 w-8 items-center justify-center rounded-md text-ink-3 hover:bg-surface-2 hover:text-ink transition-colors"
                >
                  {resolvedTheme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
                </button>
              </div>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}