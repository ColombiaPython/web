import type { CommunityEvent } from "@/lib/types";

/**
 * Eventos de ejemplo (con fechas futuras y una pasada para probar estados).
 * Reemplazar por la API real de eventos (Meetup/Luma) en una futura iteración.
 */
export const mockEvents: readonly CommunityEvent[] = [
  {
    id: "pyday-bogota-2026",
    title: "PyDay Bogotá 2026: un día completo de Python",
    startsAt: "2026-10-17T09:00:00-05:00",
    location: "Universidad Nacional, Bogotá",
    mode: "Presencial",
    coverImage: null,
    eventUrl: "https://www.meetup.com/es/python-bogota/events/pyday-2026/",
  },
  {
    id: "orionis-meetup-medellin",
    title: "Orionis Meetup: El marco que revolucionó Python Web",
    startsAt: "2026-09-24T18:30:00-05:00",
    location: "Ruta N, Medellín",
    mode: "Híbrido",
    coverImage: null,
    eventUrl: "https://www.meetup.com/es/python-medellin/events/orionis-framework/",
  },
  {
    id: "taller-starlette-online",
    title: "Taller: de cero a producción con Starlette",
    startsAt: "2026-11-07T10:00:00-05:00",
    location: "Transmisión en vivo",
    mode: "Virtual",
    coverImage: null,
    eventUrl: "https://lu.ma/pythoncolombia-starlette",
  },
  {
    id: "pycon-colombia-2026",
    title: "PyCon Colombia 2026",
    startsAt: "2026-06-12T08:00:00-05:00",
    location: "Medellín",
    mode: "Presencial",
    coverImage: null,
    eventUrl: "https://www.pycon.co/",
  },
] as const;
