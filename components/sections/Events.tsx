import Image from "next/image";
import { LuCalendar, LuClock3, LuMapPin, LuArrowUpRight } from "react-icons/lu";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { getEvents } from "@/lib/api";
import type { CommunityEvent, EventMode } from "@/lib/types";

const MODE_BADGES: Record<EventMode, string> = {
  Presencial: "bg-accent-green text-night",
  Virtual: "bg-accent-purple text-white",
  Híbrido: "bg-accent-orange text-night",
};

/** Portadas de bloque sólido con texto de contraste AA. */
const EVENT_COVERS = [
  { block: "bg-python-blue", text: "text-white/85" },
  { block: "bg-accent-purple", text: "text-white/85" },
  { block: "bg-accent-orange", text: "text-night/75" },
  { block: "bg-accent-green", text: "text-night/75" },
] as const;

const dateFormatter = new Intl.DateTimeFormat("es-CO", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "America/Bogota",
});

const timeFormatter = new Intl.DateTimeFormat("es-CO", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
  timeZone: "America/Bogota",
});

const badgeDayFormatter = new Intl.DateTimeFormat("es-CO", {
  day: "2-digit",
  timeZone: "America/Bogota",
});

const badgeMonthFormatter = new Intl.DateTimeFormat("es-CO", {
  month: "short",
  timeZone: "America/Bogota",
});

/** «jueves, 24 de septiembre» -> «Jueves, 24 de septiembre» */
function capitalizeFirst(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

interface EventCardProps {
  event: CommunityEvent;
  index: number;
  isPast?: boolean;
  /** La tarjeta destacada ocupa dos columnas con portada más alta. */
  featured?: boolean;
}

function EventCard({ event, index, isPast = false, featured = false }: EventCardProps) {
  const startsAt = new Date(event.startsAt);
  const cover = EVENT_COVERS[index % EVENT_COVERS.length];

  return (
    <a
      href={event.eventUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${event.title} — abrir página del evento`}
      className={`group flex h-full flex-col border border-white/10 bg-night-card transition hover:-translate-y-1 hover:shadow-[8px_8px_0_0_var(--color-python-blue-light)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-python-yellow motion-reduce:hover:translate-y-0 ${
        isPast ? "opacity-60 saturate-50" : ""
      }`}
    >
      <div className="relative">
        {event.coverImage ? (
          <Image
            src={event.coverImage}
            alt=""
            width={640}
            height={280}
            className={`clip-diagonal w-full object-cover ${featured ? "h-48" : "h-32"}`}
          />
        ) : (
          <div
            className={`clip-diagonal flex items-center justify-center ${featured ? "h-48" : "h-32"} ${cover.block}`}
            aria-hidden="true"
          >
            <span className={`font-mono text-sm font-semibold ${cover.text}`}>
              python_colombia.events
            </span>
          </div>
        )}

        {/* Fecha anclada a la esquina superior izquierda */}
        <div
          className="absolute left-0 top-0 bg-python-yellow px-3 py-2 text-center text-night"
          aria-hidden="true"
        >
          <p className="text-xl font-black leading-none">
            {badgeDayFormatter.format(startsAt)}
          </p>
          <p className="text-[10px] font-bold uppercase tracking-[0.15em]">
            {badgeMonthFormatter.format(startsAt).replace(".", "")}
          </p>
        </div>

        {isPast && (
          <span className="absolute right-0 top-0 border-b border-l border-white/15 bg-night px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-300">
            Finalizado
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span
          className={`self-start px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] ${MODE_BADGES[event.mode]}`}
        >
          {event.mode}
        </span>
        <h3
          className={`mt-3 flex-1 leading-snug text-white transition group-hover:text-python-yellow ${
            featured ? "text-2xl font-black tracking-tight sm:text-3xl" : "text-lg font-bold"
          }`}
        >
          {event.title}
        </h3>
        <dl className="mt-4 space-y-1.5 text-sm text-zinc-400">
          <div className="flex items-center gap-2">
            <dt className="sr-only">Fecha</dt>
            <LuCalendar size={15} className="shrink-0 text-python-blue-light" aria-hidden="true" />
            <dd>{capitalizeFirst(dateFormatter.format(startsAt))}</dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="sr-only">Hora</dt>
            <LuClock3 size={15} className="shrink-0 text-python-blue-light" aria-hidden="true" />
            <dd>{timeFormatter.format(startsAt)}</dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="sr-only">Lugar</dt>
            <LuMapPin size={15} className="shrink-0 text-python-blue-light" aria-hidden="true" />
            <dd>{event.location}</dd>
          </div>
        </dl>
        <p className="mt-5 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.15em] text-python-blue-light transition group-hover:text-python-yellow">
          Ver evento
          <LuArrowUpRight size={14} aria-hidden="true" />
        </p>
      </div>
    </a>
  );
}

// Snapshot al momento del build (export estático); se refresca en cada deploy.
const BUILD_TIME = Date.now();

export default async function Events() {
  const events = await getEvents();
  const upcoming = events
    .filter((event) => new Date(event.startsAt).getTime() >= BUILD_TIME)
    .sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime());
  const past = events
    .filter((event) => new Date(event.startsAt).getTime() < BUILD_TIME)
    .sort((a, b) => new Date(b.startsAt).getTime() - new Date(a.startsAt).getTime());

  return (
    <section
      id="eventos"
      className="scroll-mt-24 border-y border-white/5 bg-night-soft py-16 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Eventos"
            title="Próximos encuentros de la comunidad"
            description="Charlas, talleres y meetups presenciales y virtuales. Haz click en cualquier evento para registrarte."
            accentClass="text-accent-orange"
          />
        </Reveal>

        {upcoming.length > 0 ? (
          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((event, index) => (
              <li key={event.id} className={index === 0 ? "sm:col-span-2" : ""}>
                <Reveal delay={(index % 3) * 90} className="h-full">
                  <EventCard event={event} index={index} featured={index === 0} />
                </Reveal>
              </li>
            ))}
          </ul>
        ) : (
          <Reveal>
            <div className="mt-14 max-w-xl border border-dashed border-white/15 bg-night-card p-10">
              <p className="font-mono text-sm text-zinc-500">
                &gt;&gt;&gt; eventos.proximos(){" "}
                <span className="text-zinc-600"># []</span>
              </p>
              <p className="mt-4 text-xl font-bold text-white">
                Pronto anunciaremos nuevos eventos
              </p>
              <p className="mt-2 text-sm font-light text-zinc-400">
                Síguenos en redes o suscríbete al newsletter para enterarte de
                primero.
              </p>
            </div>
          </Reveal>
        )}

        {past.length > 0 && (
          <div className="mt-20">
            <Reveal>
              <h3 className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.35em] text-zinc-500">
                Eventos anteriores
                <span aria-hidden="true" className="h-px flex-1 bg-white/10" />
              </h3>
            </Reveal>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {past.map((event, index) => (
                <li key={event.id}>
                  <Reveal delay={(index % 3) * 90} className="h-full">
                    <EventCard event={event} index={index + upcoming.length} isPast />
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
