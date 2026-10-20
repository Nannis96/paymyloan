"use client";
import React, { Component, ReactNode } from 'react';
import { MapPinOff } from 'lucide-react';

interface Props { 
  children: ReactNode; 
  t: any; 
}
interface State { hasError: boolean; }

export default class MapErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Map Error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      const mapCopy = this.props.t?.uiComponents?.map || {
        errorTitle: "Error",
        reload: "Reload"
      };

      return (
        <div className="flex h-full w-full flex-col items-center justify-center bg-surface-2 p-6 text-center text-ink">
          <MapPinOff size={48} className="mb-4 text-ink-3" />
          <p className="mb-2 text-sm font-bold text-crit">{mapCopy.errorTitle}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 rounded-full bg-accent px-6 py-2 text-xs font-bold text-white transition-colors hover:bg-blue-700"
          >
            {mapCopy.reload}
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}