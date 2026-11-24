"use client";

import { useEffect, useRef, useState } from "react";

import { useSite } from "@/app/components/layout/SiteShell";

const KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

type LatLng = { lat(): number; lng(): number };
type Coords = { lat: number; lng: number };
type PanoResult = { pano: string; heading?: number };
type GMapInstance = {
  addListener(event: string, cb: (e: { latLng?: LatLng }) => void): void;
};
type GMarkerInstance = {
  setPosition(pos: LatLng | Coords): void;
  addListener(event: string, cb: (e: { latLng?: LatLng }) => void): void;
};
type GMarkerCtor = new (opts: { position: Coords; map: GMapInstance; draggable?: boolean }) => GMarkerInstance;
type GMaps = {
  maps: {
    Marker?: GMarkerCtor;
    importLibrary(name: string): Promise<{
      Map: new (el: HTMLElement, opts: { center: Coords; zoom: number; mapTypeId?: string }) => GMapInstance;
      Marker?: GMarkerCtor;
      Geocoder: new () => {
        geocode(req: { address: string }): Promise<{
          results: {
            geometry: { location: LatLng };
            address_components?: { long_name: string; short_name: string; types: string[] }[];
            formatted_address?: string;
          }[];
        }>;
      };
      StreetViewService: new () => {
        getPanorama(req: { location: LatLng | Coords; radius: number; source: string }): Promise<{ data: { location?: { pano?: string; latLng?: LatLng } } }>;
      };
    }>;
  };
};
export type GeocodedAddress = {
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  formattedAddress?: string;
};
declare global {
  interface Window {
    google?: GMaps;
    __gmapsReady?: Promise<void>;
    __gmapsInit?: () => void;
    gm_authFailure?: () => void;
  }
}

// Ángulo (0-359°) desde la cámara de Street View hacia la fachada de la propiedad.
const computeHeading = (from: Coords, to: Coords): number => {
  const rad = Math.PI / 180;
  const lat1 = from.lat * rad;
  const lat2 = to.lat * rad;
  const dLng = (to.lng - from.lng) * rad;
  const y = Math.sin(dLng) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
  return Math.round(((Math.atan2(y, x) * 180) / Math.PI + 360) % 360);
};

// Carga la Maps JS API una sola vez. Si falla la red, limpia el caché para permitir reintentos.
export function loadMaps() {
  if (typeof window !== "undefined" && typeof window.google?.maps?.importLibrary === "function") {
    return Promise.resolve();
  }
  window.__gmapsReady ??= new Promise<void>((resolve, reject) => {
    window.__gmapsInit = () => {
      delete window.__gmapsInit;
      resolve();
    };
    const s = document.createElement("script");
    s.src = `https://maps.googleapis.com/maps/api/js?key=${KEY}&loading=async&v=weekly&callback=__gmapsInit`;
    s.async = true;
    // Google llama a esto cuando la key es invalida / referrer no permitido / API no habilitada.
    window.gm_authFailure = () => console.error("PropertyMap: Google rechazo la key (referrer no permitido o API no habilitada)");
    s.onerror = () => {
      delete window.__gmapsInit;
      window.__gmapsReady = undefined;
      reject(new Error("No se pudo cargar Google Maps"));
    };
    document.head.appendChild(s);
  });
  return window.__gmapsReady;
}

// Street View via Maps Embed API. Solo se dispara cuando cambia `trigger` (botón "View")
// o cuando el usuario confirma nuevas coordenadas con "Adjust Pin".
export default function PropertyMap({
  address,
  trigger = 0,
  onGeocode,
}: {
  address: string;
  trigger?: number;
  onGeocode?: (data: GeocodedAddress) => void;
}) {
  const { t } = useSite();
  const sd = t.submitDeal;
  const [res, setRes] = useState<{ key: string; sv: PanoResult | null; err?: string } | null>(null);
  const [coords, setCoords] = useState<Coords | null>(null);
  const [draftCoords, setDraftCoords] = useState<Coords | null>(null);
  const [isAdjusting, setIsAdjusting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const mapDivRef = useRef<HTMLDivElement | null>(null);
  const onGeocodeRef = useRef(onGeocode);
  useEffect(() => { onGeocodeRef.current = onGeocode; }, [onGeocode]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px), (pointer: coarse)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const q = address.trim();
  const enabled = !!KEY && trigger > 0 && q.length >= 10;
  const reqKey = `${trigger}:${q}`;

  const resolveStreetView = async (pos: Coords): Promise<PanoResult | null> => {
    // Radio estricto de 25m para evitar mostrar fachadas de otras propiedades.
    const { StreetViewService } = await window.google!.maps.importLibrary("streetView");
    return new StreetViewService()
      .getPanorama({ location: pos, radius: 25, source: "outdoor" })
      .then((r) => {
        const loc = r.data.location;
        if (!loc?.pano) return null;
        const heading = loc.latLng
          ? computeHeading({ lat: loc.latLng.lat(), lng: loc.latLng.lng() }, pos)
          : undefined;
        return { pano: loc.pano, heading };
      }, () => null);
  };

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    setIsAdjusting(false);
    setIsLoading(true);
    (async () => {
      try {
        await loadMaps();
        const { Geocoder } = await window.google!.maps.importLibrary("geocoding");
        const { results } = await new Geocoder().geocode({ address: q });
        const first = results[0];
        const l = first?.geometry.location;
        if (!l) {
          if (!cancelled) {
            setCoords(null);
            setRes({ key: reqKey, sv: null });
          }
          return;
        }
        if (!cancelled && first?.address_components) {
          const get = (type: string, short = false) => {
            const c = first.address_components!.find((x) => x.types.includes(type));
            return (short ? c?.short_name : c?.long_name) ?? "";
          };
          const street = [get("street_number"), get("route")].filter(Boolean).join(" ");
          onGeocodeRef.current?.({
            street: street || undefined,
            city: get("locality") || get("sublocality") || get("administrative_area_level_2") || undefined,
            state: get("administrative_area_level_1", true) || undefined,
            zip: get("postal_code") || undefined,
            formattedAddress: first.formatted_address,
          });
        }
        const pos: Coords = { lat: l.lat(), lng: l.lng() };
        const sv = await resolveStreetView(pos);
        if (!cancelled) {
          setCoords(pos);
          setDraftCoords(pos);
          setRes({ key: reqKey, sv });
        }
      } catch (e) {
        console.warn("PropertyMap:", e);
        if (!cancelled) {
          setCoords(null);
          setRes({ key: reqKey, sv: null, err: e instanceof Error ? e.message : String(e) });
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [reqKey, q, enabled]);

  // Mapa interactivo para modo "Adjust Pin"
  useEffect(() => {
    if (!isAdjusting || !coords || !mapDivRef.current) return;
    let cancelled = false;
    (async () => {
      try {
        await loadMaps();
        const { Map } = await window.google!.maps.importLibrary("maps");
        const markerLib = await window.google!.maps.importLibrary("marker");
        if (cancelled || !mapDivRef.current) return;

        const initial = draftCoords ?? coords;
        const map = new Map(mapDivRef.current, {
          center: initial,
          zoom: 19,
          mapTypeId: "hybrid",
        });
        const MarkerCtor = markerLib.Marker ?? window.google!.maps.Marker;
        if (!MarkerCtor) return;
        const marker = new MarkerCtor({
          position: initial,
          map,
          draggable: true,
        });

        marker.addListener("dragend", (e) => {
          if (e.latLng) setDraftCoords({ lat: e.latLng.lat(), lng: e.latLng.lng() });
        });
        map.addListener("click", (e) => {
          if (!e.latLng) return;
          const next = { lat: e.latLng.lat(), lng: e.latLng.lng() };
          marker.setPosition(next);
          setDraftCoords(next);
        });
      } catch (e) {
        console.warn("PropertyMap Adjust Pin:", e);
      }
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdjusting]);

  const handleConfirmPin = async () => {
    if (!draftCoords) return;
    setIsAdjusting(false);
    setIsLoading(true);
    try {
      await loadMaps();
      const sv = await resolveStreetView(draftCoords);
      setCoords(draftCoords);
      setRes({ key: reqKey, sv });
    } catch (e) {
      console.warn("PropertyMap confirm pin:", e);
      setRes({ key: reqKey, sv: null, err: e instanceof Error ? e.message : String(e) });
    } finally {
      setIsLoading(false);
    }
  };

  if (isAdjusting && coords) {
    return (
      <div className="mb-6">
        <div ref={mapDivRef} className="h-64 w-full rounded-md border border-accent" />
        <div className="mt-2 flex items-center justify-between gap-2">
          <span className="text-[11px] text-ink-3">
            {sd.mapAdjustHint}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => { setDraftCoords(coords); setIsAdjusting(false); }}
              className="rounded-md border border-rule bg-surface px-3 py-1.5 text-[12px] font-semibold text-ink-2 hover:border-ink-3 cursor-pointer"
            >
              {sd.mapCancel}
            </button>
            <button
              type="button"
              onClick={handleConfirmPin}
              className="rounded-md bg-accent px-3 py-1.5 text-[12px] font-semibold text-white hover:bg-blue-700 cursor-pointer"
            >
              {sd.mapConfirm}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const msg = !KEY ? sd.mapMissingKey
    : !enabled ? sd.mapPrompt
    : isLoading || res?.key !== reqKey ? sd.mapSearching
    : !res.sv ? (res.err ? `${sd.mapUnavailable} ${res.err}` : sd.mapNoFacade)
    : null;

  return (
    <div className="mb-6">
      {msg ? (
        <div className="flex h-64 w-full items-center justify-center rounded-md border border-rule bg-surface-2 px-4 text-center text-[13px] text-ink-3">
          {msg}
        </div>
      ) : (
        <iframe
          title={q}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allow={isMobile ? "accelerometer; gyroscope" : undefined}
          src={`https://www.google.com/maps/embed/v1/streetview?key=${KEY}&pano=${res!.sv!.pano}${res!.sv!.heading !== undefined ? `&heading=${res!.sv!.heading}` : ""}`}
          className="h-64 w-full rounded-md border border-rule"
        />
      )}
      {coords && !isLoading && (
        <div className="mt-2 flex justify-end">
          <button
            type="button"
            onClick={() => { setDraftCoords(coords); setIsAdjusting(true); }}
            className="rounded-md border border-rule bg-surface px-3 py-1.5 text-[12px] font-semibold text-ink-2 transition-colors hover:border-accent hover:text-accent cursor-pointer"
          >
            {sd.mapAdjustBtn}
          </button>
        </div>
      )}
    </div>
  );
}
