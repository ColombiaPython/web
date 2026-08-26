import type { Sponsor } from "@/lib/types";

/**
 * Patrocinadores de ejemplo. Si el arreglo queda vacío, la sección muestra
 * el placeholder «Sé el primero en apoyarnos».
 * Reemplazar por la API real de patrocinadores en una futura iteración.
 */
export const mockSponsors: readonly Sponsor[] = [
  {
    id: "nube-andina",
    name: "Nube Andina",
    websiteUrl: "https://example.com/nube-andina",
    logoImage: null,
  },
  {
    id: "datacafe",
    name: "DataCafé Labs",
    websiteUrl: "https://example.com/datacafe",
    logoImage: null,
  },
  {
    id: "koders",
    name: "Koders Co.",
    websiteUrl: "https://example.com/koders",
    logoImage: null,
  },
] as const;
