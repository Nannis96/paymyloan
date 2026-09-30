"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
// @ts-ignore
import "leaflet/dist/leaflet.css";

export interface CompMarker {

  lat: number;
  lng: number;
  address: string;
  price?: string;
  rent?: string;
}

interface MapClientProps {
  center: [number, number];
  subject: CompMarker;
  sales: CompMarker[];
  rentals: CompMarker[];
}

// Función para recrear el pin SVG personalizado del HTML original
const createPin = (color: string, label: string) => {
  return L.divIcon({
    className: "custom-pin",
    html: `<div style="width:32px;height:38px;filter:drop-shadow(0 2px 4px rgba(0,0,0,.25));">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="38" viewBox="0 0 32 38">
        <path d="M16 2C9.4 2 4 7.4 4 14c0 9 12 22 12 22s12-13 12-22C28 7.4 22.6 2 16 2z" fill="${color}" stroke="#fff" stroke-width="1.5"/>
        <text x="16" y="17" text-anchor="middle" dominant-baseline="middle" font-family="Inter,Arial,sans-serif" font-size="9" font-weight="800" fill="#fff">${label}</text>
      </svg></div>`,
    iconSize: [32, 38],
    iconAnchor: [16, 38],
    popupAnchor: [0, -40],
  });
};

export default function MapClient({ center, subject, sales, rentals }: MapClientProps) {
  // Inicializamos los iconos aqui adentro para asegurar que Leaflet ya se cargo en el navegador
  const subjectIcon = createPin("#16a34a", "PML");
  const saleIcon = createPin("#2563eb", "S");
  const rentalIcon = createPin("#7c3aed", "R");

  return (
    <MapContainer 
      center={center} 
      zoom={14} 
      scrollWheelZoom={false} 
      className="h-full w-full z-0" /* z-0 evita que el mapa se superponga a otros modales */
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={18}
      />

      {/* Propiedad Principal */}
      <Marker position={[subject.lat, subject.lng]} icon={subjectIcon}>
        <Popup>
          <b>{subject.address}</b><br />Propiedad sujeta
        </Popup>
      </Marker>

      {/* Comparables de Venta */}
      {sales.map((comp, i) => (
        <Marker key={`s-${i}`} position={[comp.lat, comp.lng]} icon={saleIcon}>
          <Popup>
            <b>{comp.address}</b><br />Vendido {comp.price}
          </Popup>
        </Marker>
      ))}

      {/* Comparables de Renta */}
      {rentals.map((comp, i) => (
        <Marker key={`r-${i}`} position={[comp.lat, comp.lng]} icon={rentalIcon}>
          <Popup>
            <b>{comp.address}</b><br />Renta {comp.rent}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}