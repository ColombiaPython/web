import Image from "next/image";
import { LuHandshake } from "react-icons/lu";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { getSponsors } from "@/lib/api";
import { CONTACT_EMAIL } from "@/lib/site";

/** Cuadros de iniciales en bloques sólidos del mosaico (contraste AA). */
const TILE_ACCENTS = [
  "bg-accent-red text-white",
  "bg-accent-orange text-night",
  "bg-accent-green text-night",
  "bg-accent-purple text-white",
] as const;

function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}

export default async function Sponsors() {
  const sponsors = await getSponsors();
  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    "Quiero patrocinar a Python Colombia",
  )}`;

  return (
    <section id="patrocinadores" className="scroll-mt-24 py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Cabecera asimétrica: título a la izquierda, CTA alineado abajo-derecha */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow="Patrocinadores"
              title="Impulsa el talento Python en Colombia"
              description="Tu marca frente a miles de desarrolladores en todo el país: visibilidad en eventos, meetups y canales de la comunidad, mientras apoyas el ecosistema tech local."
              accentClass="text-accent-green"
            />
          </Reveal>

          <Reveal delay={120} className="shrink-0">
            <a
              href={mailto}
              className="inline-flex items-center gap-2 bg-accent-orange px-7 py-4 text-sm font-bold uppercase tracking-[0.12em] text-night transition hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-python-yellow)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-orange motion-reduce:hover:translate-y-0"
            >
              <LuHandshake size={20} aria-hidden="true" />
              Quiero ser patrocinador
            </a>
          </Reveal>
        </div>

        {sponsors.length > 0 ? (
          <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {sponsors.map((sponsor, index) => (
              <li key={sponsor.id} className="h-full">
                <Reveal delay={(index % 4) * 80} className="h-full">
                  <a
                    href={sponsor.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-full flex-col items-center justify-center gap-3 border border-white/10 bg-night-card p-6 transition hover:-translate-y-0.5 hover:border-white/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-python-yellow motion-reduce:hover:translate-y-0"
                  >
                    {sponsor.logoImage ? (
                      <Image
                        src={sponsor.logoImage}
                        alt={`Logo de ${sponsor.name}`}
                        width={160}
                        height={64}
                        className="h-12 w-auto object-contain"
                      />
                    ) : (
                      <span
                        className={`flex h-14 w-14 items-center justify-center text-lg font-black ${TILE_ACCENTS[index % TILE_ACCENTS.length]}`}
                        aria-hidden="true"
                      >
                        {initials(sponsor.name)}
                      </span>
                    )}
                    <span className="text-sm font-semibold text-zinc-300">
                      {sponsor.name}
                    </span>
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>
        ) : (
          <Reveal>
            <div className="mt-12 max-w-xl border border-dashed border-accent-orange/50 bg-night-card p-10">
              <p className="text-xl font-bold text-white">
                Sé el primero en apoyarnos
              </p>
              <p className="mt-2 text-sm font-light text-zinc-400">
                Este espacio está reservado para las marcas que impulsan a la
                comunidad Python en Colombia.
              </p>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
