/**
 * Textos por idioma y dominio: content/<lang>/<dominio>.ts.
 * Solo "en" viaja en el bundle inicial; "es" se carga bajo demanda (SiteShell).
 */

export type Lang = "es" | "en";
export const LANGS: Lang[] = ["es", "en"];
export type Copy = typeof import("./es").default;
