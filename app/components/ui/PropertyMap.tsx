"use client";

import { useEffect, useState } from "react";

const KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

type LatLng = { lat(): number; lng(): number };
type GMaps = {
  maps: {
    importLibrary(name: string): Promise<{
      Geocoder: new () => {
        geocode(req: { address: string }): Promise<{ results: { geometry: { location: LatLng } }[] }>;
      };
      StreetViewService: new () => {
        getPanorama(req: { location: LatLng; radius: number; source: string }): Promise<{ data: { location?: { pano?: string } } }>;
      };
    }>;
  };
};
declare global { interface Window { google?: GMaps; __gmapsReady?: Promise<void>; gm_authFailure?: () => void } }

// Carga la Maps JS API una sola vez. Se usa su Geocoder porque el web service de Geocoding
// rechaza keys restringidas por referrer.
function loadMaps() {
  window.__gmapsReady ??= new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = `https://maps.googleapis.com/maps/api/js?key=${KEY}&loading=async&v=weekly`;
    s.async = true;
    // Google llama a esto cuando la key es invalida / referrer no permitido / API no habilitada.
    window.gm_authFailure = () => console.error("PropertyMap: Google rechazo la key (referrer no permitido o API no habilitada)");
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("No se pudo cargar Google Maps"));
    document.head.appendChild(s);
  });
  return window.__gmapsReady;
}

// Street View via Maps Embed API. El modo streetview exige "lat,lng" (no acepta direcciones),
// asi que se geocodifica en el cliente; las coordenadas no se guardan.
export default function PropertyMap({ address }: { address: string }) {
  const [res, setRes] = useState<{ q: string; loc: string | null; err?: string } | null>(null);
  const q = address.trim();
  const enabled = !!KEY && q.length >= 10;

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    const timer = setTimeout(async () => {
      try {
        await loadMaps();
        const { Geocoder } = await window.google!.maps.importLibrary("geocoding");
        const { results } = await new Geocoder().geocode({ address: q });
        const l = results[0]?.geometry.location;
        let loc: string | null = null;
        if (l) {
          // Sin cobertura getPanorama rechaza (ZERO_RESULTS) y el embed saldria negro.
          const { StreetViewService } = await window.google!.maps.importLibrary("streetView");
          const pano = await new StreetViewService()
            .getPanorama({ location: l, radius: 50, source: "outdoor" })
            .then((r) => r.data.location?.pano ?? null, () => null);
          loc = pano && `${l.lat()},${l.lng()}`;
        }
        if (!cancelled) setRes({ q, loc });
      } catch (e) {
        console.warn("PropertyMap:", e);
        if (!cancelled) setRes({ q, loc: null, err: e instanceof Error ? e.message : String(e) });
      }
    }, 800);
    return () => { clearTimeout(timer); cancelled = true; };
  }, [q, enabled]);

  const msg = !KEY ? "Falta NEXT_PUBLIC_GOOGLE_MAPS_API_KEY (reinicia npm run dev tras editar .env)."
    : !enabled ? "Escribe la dirección completa para ver la fachada de la propiedad."
    : res?.q !== q ? "Buscando dirección…"
    : !res.loc ? (res.err ? `Street View no disponible: ${res.err}` : "No hay información de la fachada para esta dirección.")
    : null;

  if (msg) {
    return <div className="mb-6 flex h-64 w-full items-center justify-center rounded-md border border-rule bg-surface-2 px-4 text-center text-[13px] text-ink-3">{msg}</div>;
  }

  return (
    <iframe
      title={q}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      src={`https://www.google.com/maps/embed/v1/streetview?key=${KEY}&location=${res!.loc}`}
      className="mb-6 h-64 w-full rounded-md border border-rule"
    />
  );
}
