"use client";
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
// @ts-ignore
import "leaflet/dist/leaflet.css";
import DealPopup from "./ui/DealPopup";

// Componente interno para actualizar el centro y zoom del mapa reactivamente
function MapUpdater({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  useEffect(() => {
    if (center && center[0] !== 0) {
      map.flyTo(center, zoom, { duration: 0.8 });
    }
  }, [center, zoom, map]);
  return null;
}

// Generador de pines SVG para no depender de imagenes externas
const createPin = (color: string, label: string) => {
  return L.divIcon({
    className: "custom-pin bg-transparent border-none",
    html: `<div style="width:28px;height:34px;filter:drop-shadow(0 4px 6px rgba(0,0,0,.3));">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 38">
        <path d="M16 2C9.4 2 4 7.4 4 14c0 9 12 22 12 22s12-13 12-22C28 7.4 22.6 2 16 2z" fill="${color}" stroke="#fff" stroke-width="2"/>
        <text x="16" y="15" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-size="10" font-weight="900" fill="#fff">${label}</text>
      </svg></div>`,
    iconSize: [28, 34],
    iconAnchor: [14, 34],
    popupAnchor: [0, -36],
  });
};
export default function MapClient({ deals, subject, sales, rentals, t, center = [35.127, -89.977], zoom = 11, onMarkerClick }: any) {
  // Configura iconos por tipo de trato y comparables
  const bridgeIcon = createPin("#635bff", "B"); 
  const slowFlipIcon = createPin("#16a34a", "S");
  const subjectIcon = createPin("#16a34a", "PML");
  const saleIcon = createPin("#2563eb", "V");
  const rentalIcon = createPin("#7c3aed", "R");

  return (
    <MapContainer 
      center={center} 
      zoom={zoom} 
      scrollWheelZoom={false} 
      className="h-full w-full z-0"
    >
      <MapUpdater center={center} zoom={zoom} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* Modo 1: Marketplace (Muestra lista de deals) */}
      {deals && deals.map((deal: any, index: number) => {
        // Usar coordenadas del trato si existen, si no, usar el mock
        const lat = deal.lat || deal.property?.lat || (center[0] + (Math.random() * 0.1 - 0.05));
        const lng = deal.lng || deal.property?.lng || (center[1] + (Math.random() * 0.1 - 0.05));
        
        const isSlowFlip = deal.projectType?.includes("SLOW");
        const icon = isSlowFlip ? slowFlipIcon : bridgeIcon;

        return (
          <Marker 
            key={deal.id || index} 
            position={[lat, lng]} 
            icon={icon}
            eventHandlers={{
              click: () => {
                if (onMarkerClick) onMarkerClick(deal);
              }
            }}
          >
            <Popup className="custom-popup">
              <DealPopup deal={deal} t={t} />
            </Popup>
          </Marker>
        );
      })}

      {/* Modo 2: Detalles de Propiedad (Muestra comparables y sujeto) */}
      {subject && (
        <Marker position={[subject.lat, subject.lng]} icon={subjectIcon}>
          <Popup>
            <b>{subject.address}</b><br />
            {t?.marketplace?.dealDetails?.mapSubj || "Propiedad principal"}
          </Popup>
        </Marker>
      )}
      
      {sales && sales.map((comp: any, i: number) => (
        <Marker key={`s-${i}`} position={[comp.lat, comp.lng]} icon={saleIcon}>
          <Popup>
            <b>{comp.address}</b><br />{comp.price}
          </Popup>
        </Marker>
      ))}

      {rentals && rentals.map((comp: any, i: number) => (
        <Marker key={`r-${i}`} position={[comp.lat, comp.lng]} icon={rentalIcon}>
          <Popup>
            <b>{comp.address}</b><br />{comp.rent}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}