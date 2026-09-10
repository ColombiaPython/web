"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import type { CommunityMarker } from "@/lib/types";
import { markerColor } from "./marker-colors";

const MAP_HMR_KEY = process.env.NODE_ENV === "development" ? Date.now().toString(36) : "map";

const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => <MapSkeleton />,
});

function MapSkeleton() {
  return (
    <div
      className="flex h-full w-full animate-pulse items-center justify-center bg-night-soft"
      aria-hidden="true"
    >
      <p className="font-mono text-sm text-zinc-500">&gt;&gt;&gt; cargando_mapa()</p>
    </div>
  );
}

interface ColombiaMapProps {
  markers: readonly CommunityMarker[];
}

/**
 * Mapa real de Colombia (Leaflet + CARTO Dark Matter) + chips de comunidades.
 * Los chips permiten abrir cada popup con teclado y en táctil, como
 * alternativa accesible al click directo sobre el marcador.
 */
export default function ColombiaMap({ markers }: ColombiaMapProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const mapKey = `${MAP_HMR_KEY}:${markers.map((marker) => marker.id).join("|")}`;

  return (
    <div className="w-full" role="region" aria-label="Mapa de comunidades de Python en Colombia">
      <div className="relative">
        {/* `isolate` encapsula los z-index de Leaflet para no tapar la navbar */}
        <div className="isolate h-[380px] w-full overflow-hidden border border-white/10 sm:h-[480px] lg:h-[560px]">
          <LeafletMap key={mapKey} markers={markers} activeId={activeId} onSelect={setActiveId} />
        </div>
      </div>

      <ul className="mt-3 flex flex-wrap justify-center gap-2" aria-label="Comunidades en el mapa">
        {markers.map((marker, index) => {
          const isActive = activeId === marker.id;
          return (
            <li key={marker.id}>
              <button
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveId(isActive ? null : marker.id)}
                className={`inline-flex items-center gap-2 border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-python-yellow ${
                  isActive
                    ? "border-python-yellow bg-python-yellow text-night"
                    : "border-white/15 bg-transparent text-zinc-300 hover:border-white/40 hover:text-white"
                }`}
              >
                <span
                  className="h-2 w-2"
                  style={{ backgroundColor: markerColor(index) }}
                  aria-hidden="true"
                />
                {marker.name}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
