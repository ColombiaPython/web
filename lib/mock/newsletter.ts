import type { NewsletterResponse } from "@/lib/types";

/**
 * Simula el endpoint de suscripción al newsletter con latencia artificial.
 *
 * El componente lo consume como si fuera un `fetch` real (async/await), de
 * modo que la integración futura sea reemplazar el cuerpo de esta función
 * por la llamada HTTP a la API real.
 *
 * Reglas deterministas para probar todos los estados de la UI:
 * - correos que contienen "error"            -> status "error"
 * - correos ya registrados en esta sesión    -> status "already_subscribed"
 * - cualquier otro correo válido             -> status "success"
 */
const MOCK_LATENCY_MS = 900;

const subscribedEmails = new Set(["hola@python.org.co"]);

export async function subscribeToNewsletter(
  email: string,
): Promise<NewsletterResponse> {
  await new Promise((resolve) => setTimeout(resolve, MOCK_LATENCY_MS));

  const normalized = email.trim().toLowerCase();

  if (normalized.includes("error")) {
    return { status: "error", message: "Ocurrió un error, intenta de nuevo." };
  }

  if (subscribedEmails.has(normalized)) {
    return {
      status: "already_subscribed",
      message: "Este correo ya está registrado.",
    };
  }

  subscribedEmails.add(normalized);
  return { status: "success", message: "¡Te has suscrito!" };
}
