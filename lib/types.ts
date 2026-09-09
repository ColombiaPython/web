/**
 * Contratos de datos de la landing.
 *
 * La API real puede responder con campos en snake_case o camelCase; el cliente
 * HTTP normaliza esos datos a estos contratos antes de llegar a los componentes.
 */

/** Marcador de comunidad sobre el mapa 3D de Colombia. */
export interface CommunityMarker {
  id: string;
  name: string;
  description: string;
  city: string;
  /** Coordenadas geográficas reales (WGS84); el mapa las proyecta a su plano. */
  coordinates: { lat: number; lng: number };
  communityUrl: string;
}

/** Comunidad mostrada en la grilla de tarjetas. */
export interface Community {
  id: string;
  name: string;
  city: string;
  description: string;
  /** URL de portada; con `null` se usa un placeholder generado. */
  coverImage: string | null;
  communityUrl: string;
}

export type EventMode = "Presencial" | "Virtual" | "Híbrido";

/** Evento estilo Meetup/Luma. */
export interface CommunityEvent {
  id: string;
  title: string;
  /** Fecha y hora de inicio en ISO 8601 (con offset de Colombia). */
  startsAt: string;
  location: string;
  mode: EventMode;
  /** URL de portada; con `null` se usa un placeholder generado. */
  coverImage: string | null;
  eventUrl: string;
}

export interface Sponsor {
  id: string;
  name: string;
  websiteUrl: string;
  /** URL del logo; con `null` se usa un placeholder con iniciales. */
  logoImage: string | null;
}

export type NewsletterStatus = "success" | "already_subscribed" | "error";

export interface NewsletterResponse {
  status: NewsletterStatus;
  message: string;
}
