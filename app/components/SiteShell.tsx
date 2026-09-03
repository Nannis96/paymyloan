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
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

// Nuevos componentes de PML
import PmlHeader from "./PmlHeader";
import PmlHero from "./PmlHero";
import WhoItHelps from "./WhoItHelps";
import BeforeAfter from "./BeforeAfter";
import FeaturesGrid from "./FeaturesGrid";
import SoundFamiliar from "./SoundFamiliar";
import DashboardSplit from "./DashboardSplit";
import LiveActivity from "./LiveActivity";
import ProfilesDirectory from "./ProfilesDirectory";
import Marketplace from "./Marketplace";
import PmlCta from "./PmlCta";
import PmlFooter from "./PmlFooter";

type Theme = "light" | "dark";

const CLAVE_TEMA = "pml-theme";
const CLAVE_IDIOMA = "pml-lang";

type SiteContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (typeof copy)[Lang];
  /** Tema realmente pintado: el elegido por el visitante, si no el del sistema. */
  resolvedTheme: Theme;
  toggleTheme: () => void;
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

export default function SiteShell({ children }: { children?: ReactNode }) {
  const temaGuardado = useSyncExternalStore(suscribir, leerTema, sinValor);
  const idiomaGuardado = useSyncExternalStore(suscribir, leerIdioma, sinValor);
  const sistemaOscuro = useSyncExternalStore(
    suscribirEsquemaOscuro,
    esquemaOscuroDelSistema,
    sinEsquemaOscuro,
  );

  const lang: Lang = idiomaGuardado === "en" ? "en" : "es";
  const temaElegido: Theme | null =
    temaGuardado === "dark" || temaGuardado === "light" ? temaGuardado : null;
  const resolvedTheme: Theme = temaElegido ?? (sistemaOscuro ? "dark" : "light");

  const setLang = (valor: Lang) => escribir(CLAVE_IDIOMA, valor);
  const toggleTheme = () =>
    escribir(CLAVE_TEMA, resolvedTheme === "dark" ? "light" : "dark");

  // Único efecto: reflejar el estado en el DOM. No cambia estado de React.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    if (!temaElegido) {
      document.documentElement.removeAttribute("data-theme");
      return;
    }
    document.documentElement.setAttribute("data-theme", temaElegido);
  }, [temaElegido]);

  return (
    <SiteContext.Provider
      value={{ lang, setLang, t: copy[lang], resolvedTheme, toggleTheme }}
    >
      {/* Usamos el nuevo header si estamos en la landing, si no, se usa el layout que pases por children */}
      {children ? <SiteHeader /> : <PmlHeader />}
      
      <main id="contenido">
        {children ?? (
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
      </main>
      {children ? <SiteFooter /> : <PmlFooter />}
    </SiteContext.Provider>
  );
}
