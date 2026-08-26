"use client";

import { useEffect, useMemo, useRef } from "react";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import type { CommunityMarker } from "@/lib/types";
import { markerColor } from "./marker-colors";

/** Territorio continental de Colombia. */
const COLOMBIA_BOUNDS = L.latLngBounds([-4.2, -79], [12.5, -66.8]);

interface LeafletMapProps {
  markers: readonly CommunityMarker[];
  activeId: string | null;
  onSelect: React.Dispatch<React.SetStateAction<string | null>>;
}

/** Marcador cuadrado (mosaico del logo) con anillo pulsante, vía divIcon. */
function buildIcon(color: string): L.DivIcon {
  return L.divIcon({
    className: "map-marker",
    html:
      `<span class="map-marker__ring" style="background:${color}"></span>` +
      `<span class="map-marker__dot" style="background:${color}"></span>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, -12],
  });
}

export default function LeafletMap({ markers, activeId, onSelect }: LeafletMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markerRefs = useRef(new Map<string, L.Marker>());

  const icons = useMemo(
    () => markers.map((_, index) => buildIcon(markerColor(index))),
    [markers],
  );

  // Sincroniza los chips de la leyenda con el popup del marcador.
  useEffect(() => {
    if (!activeId) {
      mapRef.current?.closePopup();
      return;
    }
    const marker = markerRefs.current.get(activeId);
    if (marker && !marker.isPopupOpen()) marker.openPopup();
  }, [activeId]);

  return (
    <MapContainer
      ref={mapRef}
      className="h-full w-full"
      bounds={COLOMBIA_BOUNDS}
      boundsOptions={{ padding: [8, 8] }}
      maxBounds={COLOMBIA_BOUNDS}
      zoomSnap={0.25}
      // Infografía curada: sin navegación libre, solo marcadores clicables.
      zoomControl={false}
      dragging={false}
      scrollWheelZoom={false}
      doubleClickZoom={false}
      touchZoom={false}
      boxZoom={false}
      keyboard={false}
    >
      {/* CARTO Dark Matter quedó descartado: hoy marca "API KEY REQUIRED" en
          peticiones anónimas. Esri Dark Gray es gratuito, sin key y del mismo
          estilo oscuro. URL en orden {z}/{y}/{x}. */}
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
        attribution='&copy; <a href="https://www.esri.com/">Esri</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        maxZoom={16}
      />

      {markers.map((marker, index) => (
        <Marker
          key={marker.id}
          position={[marker.coordinates.lat, marker.coordinates.lng]}
          icon={icons[index]}
          title={marker.name}
          ref={(instance) => {
            if (instance) markerRefs.current.set(marker.id, instance);
            else markerRefs.current.delete(marker.id);
          }}
          eventHandlers={{
            popupopen: () => onSelect(marker.id),
            popupclose: () =>
              onSelect((current) => (current === marker.id ? null : current)),
          }}
        >
          <Popup maxWidth={240}>
            <div className="w-56">
              <p className="flex items-center gap-2 text-sm font-bold text-white">
                <span
                  className="h-2.5 w-2.5 shrink-0"
                  style={{ backgroundColor: markerColor(index) }}
                  aria-hidden="true"
                />
                {marker.name}
              </p>
              <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                {marker.city}
              </p>
              <p className="mt-2 text-xs font-light leading-relaxed text-zinc-300">
                {marker.description}
              </p>
              <a
                href={marker.communityUrl}
                target="_blank"
                rel="noopener noreferrer"
                // Color inline: evita el azul de `.leaflet-container a`.
                style={{ color: "var(--color-night)" }}
                className="mt-3 inline-flex items-center gap-1.5 bg-python-yellow px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] transition hover:bg-python-yellow-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-python-yellow"
              >
                Ir a la comunidad
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
