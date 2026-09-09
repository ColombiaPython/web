import type {
  Community,
  CommunityEvent,
  CommunityMarker,
  EventMode,
  NewsletterResponse,
  Sponsor,
} from "@/lib/types";

const DEFAULT_API_BASE_URL = "http://localhost:8000";

export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_API_BASE_URL
).replace(/\/$/, "");

type ApiRecord = Record<string, unknown>;

function textValue(value: unknown, fallback = ""): string {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function nullableTextValue(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value : null;
}

function numberValue(value: unknown, fallback = 0): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
}

function field(record: ApiRecord, ...names: string[]): unknown {
  for (const name of names) {
    if (name in record) return record[name];
  }
  return undefined;
}

function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function recordList(value: unknown): ApiRecord[] {
  return Array.isArray(value)
    ? value.filter((item): item is ApiRecord => item !== null && typeof item === "object")
    : [];
}

async function apiFetch<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, { cache: "no-store" });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch (error) {
    console.error(`API request failed: ${path}`, error);
    return null;
  }
}

async function apiSend<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, { method: "POST" });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch (error) {
    console.error(`API request failed: ${path}`, error);
    return null;
  }
}

async function apiFetchFresh<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, { cache: "no-store" });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch (error) {
    console.error(`API request failed: ${path}`, error);
    return null;
  }
}

function normalizeCommunity(record: ApiRecord): Community {
  const name = textValue(field(record, "name", "nombre"), "Comunidad Python");
  return {
    id: textValue(field(record, "id", "slug"), slugify(name)),
    name,
    city: textValue(field(record, "city", "ciudad"), "Colombia"),
    description: textValue(field(record, "description", "descripcion")),
    coverImage: nullableTextValue(field(record, "coverImage", "cover_image", "cover_url", "image_url")),
    communityUrl: textValue(field(record, "communityUrl", "community_url", "websiteUrl", "website_url", "url"), "#"),
  };
}

function normalizeMode(value: unknown): EventMode {
  const mode = textValue(value, "Presencial").toLowerCase();
  if (mode.includes("virtual")) return "Virtual";
  if (mode.includes("hibrido") || mode.includes("híbrido")) return "Híbrido";
  return "Presencial";
}

function normalizeEvent(record: ApiRecord): CommunityEvent {
  const title = textValue(field(record, "title", "name", "titulo", "nombre"), "Evento Python Colombia");
  return {
    id: textValue(field(record, "id", "slug"), slugify(title)),
    title,
    startsAt: textValue(field(record, "startsAt", "starts_at", "startDate", "start_date", "date", "fecha"), new Date().toISOString()),
    location: textValue(field(record, "location", "venue", "place", "ubicacion", "lugar"), "Por anunciar"),
    mode: normalizeMode(field(record, "mode", "modalidad")),
    coverImage: nullableTextValue(field(record, "coverImage", "cover_image", "cover_url", "image_url")),
    eventUrl: textValue(field(record, "eventUrl", "event_url", "registrationUrl", "registration_url", "url"), "#"),
  };
}

function normalizeMarker(record: ApiRecord): CommunityMarker {
  const name = textValue(field(record, "name", "nombre"), "Python Colombia");
  const coordinates = field(record, "coordinates", "coordenadas");
  const coordinateRecord = coordinates !== null && typeof coordinates === "object" ? coordinates as ApiRecord : {};

  return {
    id: textValue(field(record, "id", "slug"), slugify(name)),
    name,
    description: textValue(field(record, "description", "descripcion")),
    city: textValue(field(record, "city", "ciudad"), "Colombia"),
    coordinates: {
      lat: numberValue(field(record, "lat", "latitude", "latitud") ?? field(coordinateRecord, "lat", "latitude", "latitud")),
      lng: numberValue(field(record, "lng", "lon", "long", "longitude", "longitud") ?? field(coordinateRecord, "lng", "lon", "long", "longitude", "longitud")),
    },
    communityUrl: textValue(field(record, "communityUrl", "community_url", "websiteUrl", "website_url", "url"), "#"),
  };
}

function normalizeSponsor(record: ApiRecord): Sponsor {
  const name = textValue(field(record, "name", "nombre"), "Patrocinador");
  return {
    id: textValue(field(record, "id", "slug"), slugify(name)),
    name,
    websiteUrl: textValue(field(record, "websiteUrl", "website_url", "url"), "#"),
    logoImage: nullableTextValue(field(record, "logoImage", "logo_image", "logo_url", "image_url")),
  };
}

function isActiveSubscription(value: unknown): boolean {
  const record = value !== null && typeof value === "object" ? value as ApiRecord : {};
  return field(record, "isActive") === true;
}

export async function getCommunities(): Promise<Community[]> {
  const data = await apiFetch<unknown>("/api/communities");
  return recordList(data).map(normalizeCommunity);
}

export async function getEvents(): Promise<CommunityEvent[]> {
  const data = await apiFetch<unknown>("/api/events");
  return recordList(data).map(normalizeEvent);
}

export async function getMapMarkers(): Promise<CommunityMarker[]> {
  const data = await apiFetch<unknown>("/api/map-markers");
  return recordList(data).map(normalizeMarker);
}

export async function getSponsors(): Promise<Sponsor[]> {
  const data = await apiFetch<unknown>("/api/sponsors");
  return recordList(data).map(normalizeSponsor);
}

export async function subscribeToNewsletter(email: string): Promise<NewsletterResponse> {
  const normalizedEmail = email.trim().toLowerCase();
  const searchParams = new URLSearchParams({ email: normalizedEmail });
  const subscription = await apiFetchFresh<unknown>(`/api/newsletter/subscription?${searchParams.toString()}`);

  if (isActiveSubscription(subscription)) {
    return {
      status: "already_subscribed",
      message: "Este correo ya está registrado en el newsletter.",
    };
  }

  const data = await apiSend<unknown>(`/api/newsletter/subscribe?${searchParams.toString()}`);
  if (!isActiveSubscription(data)) {
    return {
      status: "error",
      message: "No pudimos procesar tu suscripción. Intenta de nuevo.",
    };
  }

  return {
    status: "success",
    message: "Te has suscrito al newsletter.",
  };
}
