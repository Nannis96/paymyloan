"use client";
import dynamic from 'next/dynamic';
import { useSite } from '@/app/components/layout/SiteShell';
import MapErrorBoundary from './MapErrorBoundary';

// Importacion dinamica con SSR desactivado
const MapClient = dynamic(() => import('./MapClient'), {
  ssr: false,
  loading: () => {
    return (
      <div className="flex h-full w-full items-center justify-center bg-blue-50/50 dark:bg-[#0c1222]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-rule border-t-accent"></div>
          <p className="text-xs font-bold uppercase tracking-widest text-ink-3">Cargando...</p>
        </div>
      </div>
    );
  }
});

export default function MapLoader(props: any) {
  const { t } = useSite();
  return (
    <MapErrorBoundary t={t}>
      <MapClient {...props} t={t} />
    </MapErrorBoundary>
  );
}