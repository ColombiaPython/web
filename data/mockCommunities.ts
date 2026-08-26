import type { Community } from "@/lib/types";

/**
 * Comunidades de ejemplo para la grilla de tarjetas.
 * Reemplazar por la API real de comunidades en una futura iteración.
 */
export const mockCommunities: readonly Community[] = [
  {
    id: "python-bogota",
    name: "Python Bogotá",
    city: "Bogotá",
    description:
      "El grupo más grande del país. Meetups mensuales con charlas de backend, datos e inteligencia artificial.",
    coverImage: null,
    communityUrl: "https://www.meetup.com/es/python-bogota/",
  },
  {
    id: "python-medellin",
    name: "Python Medellín",
    city: "Medellín",
    description:
      "Talleres prácticos de Django, FastAPI y ciencia de datos con la energía de la comunidad paisa.",
    coverImage: null,
    communityUrl: "https://www.meetup.com/es/python-medellin/",
  },
  {
    id: "python-cali",
    name: "Python Cali",
    city: "Cali",
    description:
      "Encuentros sobre automatización, testing y proyectos open source en el suroccidente colombiano.",
    coverImage: null,
    communityUrl: "https://www.meetup.com/es/python-cali/",
  },
  {
    id: "python-barranquilla",
    name: "Python Barranquilla",
    city: "Barranquilla",
    description:
      "La casa de los pythonistas del Caribe: dojos de código, lightning talks y eventos híbridos.",
    coverImage: null,
    communityUrl: "https://www.meetup.com/es/python-barranquilla/",
  },
  {
    id: "pyladies-colombia",
    name: "PyLadies Colombia",
    city: "Nacional",
    description:
      "Comunidad que impulsa la participación de mujeres en Python con mentorías, talleres y charlas.",
    coverImage: null,
    communityUrl: "https://www.meetup.com/es/pyladies-colombia/",
  },
  {
    id: "python-bucaramanga",
    name: "Python Bucaramanga",
    city: "Bucaramanga",
    description:
      "Study groups de Python, visualización de datos y proyectos colaborativos en Santander.",
    coverImage: null,
    communityUrl: "https://www.meetup.com/es/python-bucaramanga/",
  },
] as const;
