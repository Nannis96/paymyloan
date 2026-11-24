"use client";

import { useEffect, useRef, useState } from "react";

const KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export interface PinLocationResult {
  address: string;
  city: string;
  state: string;
  zip: string;
  formattedAddress: string;
}


export function loadMaps() {
  window.__gmapsReady ??= new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = `https://maps.googleapis.com/maps/api/js?key=${KEY}&loading=async&v=weekly`;
    s.async = true;
    window.gm_authFailure = () => console.error("PropertyMapDemo: Google rechazó la key");
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("No se pudo cargar Google Maps"));
    document.head.appendChild(s);
  });
  return window.__gmapsReady;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseAddressComponents(components: any[], formattedAddress: string): PinLocationResult {
  const get = (type: string, short = false) => {
    const c = components.find((x) => Array.isArray(x.types) && x.types.includes(type));
    return (short ? c?.short_name : c?.long_name) ?? "";
  };
  const street = [get("street_number"), get("route")].filter(Boolean).join(" ");
  const city = get("locality") || get("sublocality") || get("administrative_area_level_2");
  const state = get("administrative_area_level_1", true);
  const zip = get("postal_code");
  const cleanedFormatted = String(formattedAddress ?? "").replace(/, USA$/, "");

  return {
    address: street,
    city,
    state,
    zip,
    formattedAddress: cleanedFormatted || [street, city, state, zip].filter(Boolean).join(", "),
  };
}

export default function PropertyMapDemo({
  address,
  labels,
  onConfirmPinAddress,
}: {
  address: string;
  labels: { missingKey: string; loading: string; notFound: string; adjustTitle: string; adjustDesc: string };
  onConfirmPinAddress?: (loc: PinLocationResult) => void;
}) {
  const mapRef = useRef<HTMLDivElement>(null);
  const svRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [mapInstance, setMapInstance] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [markerInstance, setMarkerInstance] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [svInstance, setSvInstance] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const geocoderRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const svServiceRef = useRef<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Controles de la interfaz
  const [mode, setMode] = useState<"sv" | "map">("sv");
  const [hasSv, setHasSv] = useState(true);
  const [isConfirmingPin, setIsConfirmingPin] = useState(false);

  // Control del arrastre del pin: solo hace reverse geocoding al confirmar
  const pinMovedRef = useRef(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pendingPosRef = useRef<any>(null);
  const skipNextGeocodeForRef = useRef<string | null>(null);

  const q = address.trim();
  const enabled = !!KEY && q.length >= 10;

  // Inferimos el idioma para los textos de los botones usando un texto que ya pasamos en 'labels'
  const isEs = labels.adjustTitle.toLowerCase().includes("ajuste");
  const svTitle = isEs ? "Vista de la propiedad" : "Property View";
  const svDesc = isEs ? "Fachada de la dirección encontrada." : "Street view of the property.";
  const btnAdjust = isEs ? "Ajustar Pin" : "Adjust Pin";
  const btnConfirm = isEs ? "Confirmar" : "Confirm";
  const noSvMsg = isEs ? "Street View no disponible en este punto." : "Street View not available here.";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateStreetView = (loc: any, sv: any) => {
    const svService = svServiceRef.current;
    if (!svService || !sv) return;
    svService
      .getPanorama({ location: loc, radius: 50, source: "outdoor" })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((res: any) => {
        if (res?.data?.location?.pano) {
          sv.setPano(res.data.location.pano);
          setHasSv(true);
        } else {
          setHasSv(false);
        }
      })
      .catch(() => setHasSv(false));
  };

  useEffect(() => {
    if (!KEY) {
      setErrorMsg(labels.missingKey);
      return;
    }
    if (!enabled || !mapRef.current || !svRef.current) return;

    let isCancelled = false;

    const initMap = async () => {
      try {
        await loadMaps();
        const g = (window as any).google?.maps;
        if (!g) return;

        const [mapsLib, geocodingLib, streetViewLib] = await Promise.all([
          g.importLibrary("maps"),
          g.importLibrary("geocoding"),
          g.importLibrary("streetView"),
        ]);

        if (!geocoderRef.current) geocoderRef.current = new geocodingLib.Geocoder();
        if (!svServiceRef.current) svServiceRef.current = new streetViewLib.StreetViewService();

        if (!mapInstance && mapRef.current && svRef.current) {
          const map = new mapsLib.Map(mapRef.current, {
            zoom: 17,
            center: { lat: 39.8283, lng: -98.5795 },
            mapTypeControl: false,
            streetViewControl: false,
          });

          const marker = new g.Marker({
            map,
            draggable: true,
            animation: g.Animation?.DROP,
          });

          const sv = new streetViewLib.StreetViewPanorama(svRef.current, {
            addressControl: false,
            showRoadLabels: false,
            zoomControl: true,
          });

          // Al soltar el pin solo actualiza la fachada; RentCast se consulta al pulsar Confirmar
          marker.addListener("dragend", () => {
            const pos = marker.getPosition();
            if (!pos) return;
            pinMovedRef.current = true;
            pendingPosRef.current = pos;
            updateStreetView(pos, sv);
          });

          if (!isCancelled) {
            setMapInstance(map);
            setMarkerInstance(marker);
            setSvInstance(sv);
          }
        }
      } catch (e) {
        console.warn("PropertyMapDemo Error:", e);
      }
    };

    initMap();
    return () => { isCancelled = true; };
  }, [enabled, labels.missingKey, mapInstance]);

  // Geocodificar cuando cambia la dirección (evitando re-centrar si acaba de confirmarse el pin)
  useEffect(() => {
    if (!mapInstance || !markerInstance || !svInstance || !geocoderRef.current || !enabled) return;

    if (skipNextGeocodeForRef.current && skipNextGeocodeForRef.current === q) {
      skipNextGeocodeForRef.current = null;
      return;
    }

    const timer = setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      geocoderRef.current.geocode({ address: q }, (results: any, status: any) => {
        if (status === "OK" && results?.[0]) {
          const loc = results[0].geometry.location;
          mapInstance.setCenter(loc);
          markerInstance.setPosition(loc);
          pinMovedRef.current = false;
          pendingPosRef.current = null;
          setErrorMsg(null);

          updateStreetView(loc, svInstance);
          setMode("sv");
        } else {
          setErrorMsg(labels.notFound);
        }
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [q, mapInstance, markerInstance, svInstance, enabled, labels.notFound]);

  const handleConfirmPin = () => {
    setMode("sv");
    if (!pinMovedRef.current || !pendingPosRef.current || !onConfirmPinAddress || !geocoderRef.current) return;

    const pos = pendingPosRef.current;
    pinMovedRef.current = false;
    pendingPosRef.current = null;
    setIsConfirmingPin(true);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    geocoderRef.current.geocode({ location: pos }, (results: any, status: any) => {
      setIsConfirmingPin(false);
      if (status === "OK" && results?.[0]?.address_components) {
        const parsed = parseAddressComponents(results[0].address_components, results[0].formatted_address);
        if (parsed.address) {
          skipNextGeocodeForRef.current = parsed.formattedAddress.trim();
          onConfirmPinAddress(parsed);
        }
      }
    });
  };

  if (!enabled) return null;

  return (
    <div className="mb-6 rounded-md border border-rule bg-surface p-4">
      <div className="mb-3 flex items-center justify-between gap-4">
        <div>
          <h3 className="text-[14px] font-bold text-ink">{mode === "sv" ? svTitle : labels.adjustTitle}</h3>
          <p className="text-[12px] text-ink-3">{mode === "sv" ? svDesc : labels.adjustDesc}</p>
        </div>
        
        {/* Controles de vista */}
        {mode === "sv" ? (
          <button
            type="button"
            onClick={() => setMode("map")}
            className="shrink-0 cursor-pointer rounded-md border border-accent/30 bg-accent-soft px-3 py-1.5 text-[12px] font-semibold text-accent transition-colors hover:bg-accent hover:text-white"
          >
            {btnAdjust}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleConfirmPin}
            disabled={isConfirmingPin}
            className="shrink-0 cursor-pointer rounded-md bg-accent px-3 py-1.5 text-[12px] font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
          >
            {btnConfirm}
          </button>
        )}
      </div>
      
      {errorMsg && (
        <div className="mb-2 text-[12px] font-semibold text-amber">{errorMsg}</div>
      )}
      
      <div className="relative h-64 w-full overflow-hidden rounded-md border border-rule bg-surface-2">
        
        {/* Capa 1: Mapa (z-index dinámico para pasar al frente) */}
        <div 
          ref={mapRef} 
          className="absolute inset-0" 
          style={{ zIndex: mode === "map" ? 20 : 10 }} 
        />
        
        {/* Capa 2: Street View (Pasa al frente si está activa y disponible) */}
        <div 
          ref={svRef} 
          className="absolute inset-0 bg-surface" 
          style={{ 
            zIndex: mode === "sv" && hasSv ? 20 : 5, 
            visibility: hasSv ? "visible" : "hidden" 
          }} 
        />
        
        {/* Capa de Loading (cuando Google no ha inyectado el mapa) */}
        {!mapInstance && !errorMsg && (
          <div className="absolute inset-0 z-0 flex items-center justify-center text-[13px] text-ink-3 bg-surface-2">
            {labels.loading}
          </div>
        )}

        {/* Mensaje de Street View no disponible */}
        {mode === "sv" && !hasSv && mapInstance && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-surface-2 text-[13px] font-medium text-ink-3">
            {noSvMsg}
          </div>
        )}
      </div>
    </div>
  );
}