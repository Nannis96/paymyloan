"use client";
import { useSite } from "@/app/components/layout/SiteShell";

export default function LangToggle({ className = "" }: { className?: string }) {
  const { t, lang, setLang } = useSite();
  
  return (
    <button
      type="button"
      onClick={() => setLang(lang === "es" ? "en" : "es")}
      aria-label={t.nav.langToggle}
      className={`flex items-center justify-center transition-colors ${className}`}
    >
      {lang === "es" ? "EN" : "ES"}
    </button>
  );
}