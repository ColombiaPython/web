"use client";

import { useEffect, useState } from "react";
import ColombiaMap from "@/components/map/ColombiaMap";
import Reveal from "@/components/ui/Reveal";
import { MosaicBar } from "@/components/ui/MosaicBar";
import { getMapMarkers } from "@/lib/api";
import type { CommunityMarker } from "@/lib/types";

export default function Hero() {
  const [markers, setMarkers] = useState<CommunityMarker[]>([]);

  useEffect(() => {
    void getMapMarkers().then((data) => setMarkers(data));
  }, []);

  return (
    <section id="hero" className="relative overflow-hidden scroll-mt-24">
      {/* Marca de agua tipo prompt de Python */}
      <span
        aria-hidden="true"
        className="text-stroke pointer-events-none absolute -bottom-16 -left-4 hidden select-none font-mono text-[13rem] font-black leading-none lg:block"
      >
        &gt;&gt;&gt;
      </span>

      <div className="relative mx-auto grid max-w-6xl gap-14 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-12 lg:items-center lg:gap-10 lg:pb-24 lg:pt-20">
        <Reveal className="lg:col-span-5">
          <div>
            <p className="flex items-center gap-3">
              <MosaicBar />
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-zinc-400">
                Comunidad oficial
              </span>
            </p>

            <h1 className="mt-7 text-5xl font-black leading-[0.98] tracking-tight text-white sm:text-6xl xl:text-7xl">
              La comunidad de{" "}
              <span className="text-python-yellow">
                Python <span className="text-white">en</span> Colombia
              </span>
            </h1>

            <p className="mt-6 text-2xl font-bold tracking-tight text-python-blue-light sm:text-3xl">
              ¡Aprende, comparte y crece!
            </p>

            <p className="mt-5 max-w-xl text-lg font-light leading-relaxed text-zinc-400">
              Conecta con pythonistas de todo el país: meetups, talleres,
              proyectos open source y una red de comunidades locales que te
              esperan con los brazos abiertos.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="https://chat.whatsapp.com/DEW1u7kJRWhHou1hYvMrLy"
                target="_blank"
                rel="noreferrer"
                className="bg-python-yellow px-8 py-4 text-center text-sm font-bold uppercase tracking-[0.12em] text-night transition hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-python-blue-light)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-python-yellow motion-reduce:hover:translate-y-0"
              >
                Únete a la comunidad
              </a>
              <a
                href="#eventos"
                className="border-2 border-accent-green px-8 py-4 text-center text-sm font-bold uppercase tracking-[0.12em] text-accent-green transition hover:bg-accent-green hover:text-night focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green"
              >
                Próximos eventos
              </a>
            </div>
          </div>
        </Reveal>

        {/* El mapa sangra hacia el borde derecho para romper la grilla */}
        <Reveal delay={150} className="lg:col-span-7 lg:-mr-10 xl:-mr-20">
          <ColombiaMap markers={markers} />
        </Reveal>
      </div>
    </section>
  );
}
