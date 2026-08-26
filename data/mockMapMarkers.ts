import type { CommunityMarker } from "@/lib/types";

/**
 * Marcadores de ejemplo para el mapa 3D del hero.
 * Reemplazar por la API real de comunidades en una futura iteración.
 */
export const mockMapMarkers: readonly CommunityMarker[] = [
  {
    id: "bogota",
    name: "Python Bogotá",
    description:
      "Meetups mensuales, charlas técnicas y espacios de networking en la capital.",
    city: "Bogotá",
    coordinates: { lat: 4.711, lng: -74.0721 },
    communityUrl: "https://www.meetup.com/es/python-bogota/",
  },
  {
    id: "medellin",
    name: "Python Medellín",
    description:
      "Comunidad paisa enfocada en talleres prácticos, Django y ciencia de datos.",
    city: "Medellín",
    coordinates: { lat: 6.2442, lng: -75.5812 },
    communityUrl: "https://www.meetup.com/es/python-medellin/",
  },
  {
    id: "cali",
    name: "Python Cali",
    description:
      "Encuentros sobre backend, automatización y proyectos open source del Valle.",
    city: "Cali",
    coordinates: { lat: 3.4516, lng: -76.532 },
    communityUrl: "https://www.meetup.com/es/python-cali/",
  },
  {
    id: "barranquilla",
    name: "Python Barranquilla",
    description:
      "La comunidad del Caribe: charlas, dojos de código y eventos híbridos.",
    city: "Barranquilla",
    coordinates: { lat: 10.9685, lng: -74.7813 },
    communityUrl: "https://www.meetup.com/es/python-barranquilla/",
  },
  {
    id: "bucaramanga",
    name: "Python Bucaramanga",
    description:
      "Grupo santandereano con study groups de Python y visualización de datos.",
    city: "Bucaramanga",
    coordinates: { lat: 7.1193, lng: -73.1227 },
    communityUrl: "https://www.meetup.com/es/python-bucaramanga/",
  },
] as const;
