/**
 * Acentos del mosaico del logo para los marcadores del mapa.
 * Duplican los tokens de `@theme` (globals.css) porque Leaflet recibe hex directos.
 */
export const MARKER_COLORS = [
  "#e24329", // accent-red
  "#f58220", // accent-orange
  "#2fb350", // accent-green
  "#5c4ee5", // accent-purple
  "#ffd43b", // python-yellow
] as const;

export function markerColor(index: number): string {
  return MARKER_COLORS[index % MARKER_COLORS.length];
}
