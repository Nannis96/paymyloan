"use client";

import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { copy, type Lang } from "@/content/copy";
import {
  escribir,
  esquemaOscuroDelSistema,
  leer,
  suscribir,
  suscribirEsquemaOscuro,
} from "@/app/lib/preferencias";
import SiteFooter from "./SiteFooter";
import DashboardHeader from "./DashboardHeader";
import PmlHeader from "./PmlHeader";
import PmlFooter from "./PmlFooter";

// Componentes de landing
import WelcomeModal from "../landing/WelcomeModal";
import LenderLandingView from "../landing/LenderLandingView"; 
import BorrowerLandingView from "../landing/BorrowerLandingView";
import PmlHero from "../landing/PmlHero";
import WhoItHelps from "../landing/WhoItHelps";
import BeforeAfter from "../landing/BeforeAfter";
import FeaturesGrid from "../landing/FeaturesGrid";
import SoundFamiliar from "../landing/SoundFamiliar";
import DashboardSplit from "../landing/DashboardSplit";
import LiveActivity from "../landing/LiveActivity";
import ProfilesDirectory from "../landing/ProfilesDirectory";
import Marketplace from "../landing/Marketplace";
import PmlCta from "../landing/PmlCta";

import { useState } from "react";

type Theme = "light" | "dark";
type AppMode = "general" | "lender" | "borrower";

const CLAVE_TEMA = "pml-theme";
const CLAVE_IDIOMA = "pml-lang";

type SiteContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (typeof copy)[Lang];
  resolvedTheme: Theme;
  toggleTheme: () => void;
  appMode: AppMode;
  setAppMode: (mode: AppMode) => void;
  lastAppMode: "lender" | "borrower" | null;
  activeTab: number;
  setActiveTab: (tab: number) => void;
};

const SiteContext = createContext<SiteContextValue | null>(null);

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite debe usarse dentro de <SiteShell>");
  return ctx;
}

const leerTema = () => leer(CLAVE_TEMA);
const leerIdioma = () => leer(CLAVE_IDIOMA);
const sinValor = () => null;
const sinEsquemaOscuro = () => false;

export default function SiteShell({ children, isDashboard = false, isMinimal = false }: { children?: ReactNode; isDashboard?: boolean; isMinimal?: boolean }) {
  const temaGuardado = useSyncExternalStore(suscribir, leerTema, sinValor);
  const idiomaGuardado = useSyncExternalStore(suscribir, leerIdioma, sinValor);
  // El idioma empezara en ingles por defecto si no hay nada guardado
  const lang: Lang = idiomaGuardado === "es" ? "es" : "en";
  const temaElegido: Theme | null =
    temaGuardado === "dark" || temaGuardado === "light" ? temaGuardado : null;

  // Forzamos modo claro por defecto la primera vez, ignorando el sistema
  const resolvedTheme: Theme = temaElegido ?? "light";
  
  const [appMode, setAppMode] = useState<AppMode>("general");
  const [lastAppMode, setLastAppMode] = useState<"lender" | "borrower" | null>(null);
  const [activeTab, setActiveTab] = useState<number>(0);

  // Interceptamos el setAppMode para guardar el historial
  const handleSetAppMode = (mode: AppMode) => {
    if (appMode !== "general" && mode === "general") {
      setLastAppMode(appMode);
    }
    setAppMode(mode);
  };

  const setLang = (valor: Lang) => escribir(CLAVE_IDIOMA, valor);
  const toggleTheme = () =>
    escribir(CLAVE_TEMA, resolvedTheme === "dark" ? "light" : "dark");

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    // Forzamos que siempre se inyecte el tema resuelto ("light" por defecto o el guardado)
    // ignorando la configuración del sistema operativo.
    document.documentElement.setAttribute("data-theme", resolvedTheme);
  }, [resolvedTheme]);

  return (
    <SiteContext.Provider
      value={{ lang, setLang, t: copy[lang], resolvedTheme, toggleTheme, appMode, setAppMode: handleSetAppMode, lastAppMode, activeTab, setActiveTab }}
    >
      {!isMinimal && (isDashboard ? <DashboardHeader /> : <PmlHeader />)}
      
      <main id="contenido" className={isDashboard ? "dashboard-wrapper" : ""}>
        {!isMinimal && !isDashboard && <WelcomeModal />}
        
        {children ?? (
          <>
            {appMode === "general" && (
              <>
                <PmlHero />
                <WhoItHelps />
                <BeforeAfter />
                <SoundFamiliar />
                <FeaturesGrid />
                <DashboardSplit />
                <LiveActivity />
                <ProfilesDirectory />
                <Marketplace />
                <PmlCta />
              </>
            )}
            {appMode === "lender" && <LenderLandingView />}
            {appMode === "borrower" && <BorrowerLandingView />}
          </>
        )}
      </main>
      {!isMinimal && (children ? <SiteFooter /> : <PmlFooter />)}
    </SiteContext.Provider>
  );
}
