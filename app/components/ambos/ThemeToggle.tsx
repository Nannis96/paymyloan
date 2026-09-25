"use client";
import { Moon, Sun } from "lucide-react";
import { useSite } from "@/app/components/layout/SiteShell";

export default function ThemeToggle({ 
  className = "", 
  iconSize = 18 
}: { 
  className?: string; 
  iconSize?: number; 
}) {
  const { t, resolvedTheme, toggleTheme } = useSite();
  
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={t.nav.themeToggle}
      className={`flex items-center justify-center transition-colors ${className}`}
    >
      {resolvedTheme === "dark" ? (
        <Sun aria-hidden size={iconSize} />
      ) : (
        <Moon aria-hidden size={iconSize} />
      )}
    </button>
  );
}