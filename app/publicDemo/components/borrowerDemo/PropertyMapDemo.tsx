"use client";

import { useEffect, useRef, useState } from "react";

const KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

function loadMaps() {
  window.__gmapsReady ??= new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = `https://maps.googleapis.com/maps/api/js?key=${KEY}&v=weekly`;
    s.async = true;
    window.gm_authFailure = () => console.error("PropertyMapDemo: Google rechazó la key");
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("No se pudo cargar Google Maps"));
    document.head.appendChild(s);
  });
  return window.__gmapsReady;
}

export default function PropertyMapDemo({ 
  address, 
  labels 
}: { 
  address: string;
  labels: { missingKey: string; loading: string; notFound: string; adjustTitle: string; adjustDesc: string };
}) {
  const mapRef = useRef<HTMLDivElement>(null);
  const svRef = useRef<HTMLDivElement>(null);
  
  const [mapInstance, setMapInstance] = useState<any>(null);
  const [markerInstance, setMarkerInstance] = useState<any>(null);
  const [svInstance, setSvInstance] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // Controles de la interfaz
  const [mode, setMode] = useState<"sv" | "map">("sv");
  const [hasSv, setHasSv] = useState(true);

  const q = address.trim();
  const enabled = !!KEY && q.length >= 10;

  // Inferimos el idioma para los textos de los botones usando un texto que ya pasamos en 'labels'
  const isEs = labels.adjustTitle.toLowerCase().includes("ajuste");
  const svTitle = isEs ? "Vista de la propiedad" : "Property View";
  const svDesc = isEs ? "Fachada de la dirección encontrada." : "Street view of the property.";
  const btnAdjust = isEs ? "Ajustar Pin" : "Adjust Pin";
  const btnConfirm = isEs ? "Confirmar" : "Confirm";
  const noSvMsg = isEs ? "Street View no disponible en este punto." : "Street View not available here.";

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
        const googleMaps = (window as any).google.maps;
        
        if (!mapInstance && mapRef.current && svRef.current) {
          // Inicializar Mapa
          const map = new googleMaps.Map(mapRef.current, {
            zoom: 17,
            center: { lat: 39.8283, lng: -98.5795 },
            mapTypeControl: false,
            streetViewControl: false,
          });
          
          // Inicializar Marcador arrastrable
          const marker = new googleMaps.Marker({
            map,
            draggable: true,
            animation: googleMaps.Animation.DROP,
          });

          // Inicializar vista de Street View
          const sv = new googleMaps.StreetViewPanorama(svRef.current, {
            addressControl: false,
            showRoadLabels: false,
            zoomControl: true,
          });

          // Evento al soltar el pin: Actualizar coordenadas y buscar fachada nueva
          marker.addListener("dragend", () => {
            const pos = marker.getPosition();
            updateStreetView(pos, googleMaps, sv);
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
  }, [enabled, KEY]);

  // Función para validar y establecer el panorama
  const updateStreetView = (loc: any, googleMaps: any, sv: any) => {
    const svService = new googleMaps.StreetViewService();
    svService.getPanorama({ location: loc, radius: 50, source: "outdoor" })
      .then((res: any) => {
        if (res.data.location?.pano) {
          sv.setPano(res.data.location.pano);
          setHasSv(true);
        } else {
          setHasSv(false);
        }
      })
      .catch(() => setHasSv(false));
  };

  // Geocodificar cuando la dirección de texto cambie
  useEffect(() => {
    if (!mapInstance || !markerInstance || !svInstance || !enabled) return;
    
    const googleMaps = (window as any).google.maps;
    const geocoder = new googleMaps.Geocoder();
    
    const timer = setTimeout(() => {
      geocoder.geocode({ address: q }, (results: any, status: any) => {
        if (status === "OK" && results[0]) {
          const loc = results[0].geometry.location;
          mapInstance.setCenter(loc);
          markerInstance.setPosition(loc);
          setErrorMsg(null);
          
          // Actualizamos la fachada y mostramos la vista por defecto
          updateStreetView(loc, googleMaps, svInstance);
          setMode("sv");
        } else {
          setErrorMsg(labels.notFound);
        }
      });
    }, 800);

    return () => clearTimeout(timer);
  }, [q, mapInstance, markerInstance, svInstance, enabled]);

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
            onClick={() => setMode("map")}
            className="shrink-0 cursor-pointer rounded-md border border-accent/30 bg-accent-soft px-3 py-1.5 text-[12px] font-semibold text-accent transition-colors hover:bg-accent hover:text-white"
          >
            {btnAdjust}
          </button>
        ) : (
          <button 
            onClick={() => setMode("sv")}
            className="shrink-0 cursor-pointer rounded-md bg-accent px-3 py-1.5 text-[12px] font-semibold text-white transition-colors hover:bg-blue-700"
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