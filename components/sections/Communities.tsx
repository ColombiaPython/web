"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import CommunityGrid from "@/components/sections/CommunityGrid";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { getCommunities } from "@/lib/api";
import type { Community } from "@/lib/types";

/** Portadas de bloque sólido (mosaico del logo) con texto de contraste AA. */
const COVERS = [
  { block: "bg-accent-red", text: "text-white/90" },
  { block: "bg-accent-orange", text: "text-night/80" },
  { block: "bg-accent-green", text: "text-night/80" },
  { block: "bg-accent-purple", text: "text-white/90" },
] as const;

const HOVER_SHADOWS = [
  "hover:shadow-[8px_8px_0_0_var(--color-accent-red)]",
  "hover:shadow-[8px_8px_0_0_var(--color-accent-orange)]",
  "hover:shadow-[8px_8px_0_0_var(--color-accent-green)]",
  "hover:shadow-[8px_8px_0_0_var(--color-accent-purple)]",
] as const;

export default function Communities() {
  const [communities, setCommunities] = useState<Community[]>([]);

  useEffect(() => {
    void getCommunities().then((data) => setCommunities(data));
  }, []);

  return (
    <section id="comunidades" className="scroll-mt-24 py-24 lg:py-36">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Comunidades"
            title="Una red que crece por todo el país"
            description="Grupos locales y temáticos donde compartir, aprender y construir con Python. Encuentra el tuyo o ayúdanos a crear uno nuevo."
          />
        </Reveal>

        <CommunityGrid>
          {communities.map((community, index) => (
            <li key={community.id}>
              <Reveal delay={(index % 4) * 90} className="h-full">
                <article
                  className={`group flex h-full flex-col border border-white/10 bg-night-card transition hover:-translate-y-1 motion-reduce:hover:translate-y-0 ${HOVER_SHADOWS[index % HOVER_SHADOWS.length]}`}
                >
                  {community.coverImage ? (
                    <Image
                      src={community.coverImage}
                      alt={`Portada de ${community.name}`}
                      width={640}
                      height={256}
                      className="cut-corner h-28 w-full object-cover"
                    />
                  ) : (
                    <div
                      className={`cut-corner flex h-28 items-end p-4 ${COVERS[index % COVERS.length].block}`}
                      aria-hidden="true"
                    >
                      <span className={`font-mono text-xs font-semibold ${COVERS[index % COVERS.length].text}`}>
                        &gt;&gt;&gt; import {community.id.replaceAll("-", "_")}
                      </span>
                    </div>
                  )}

                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-xl font-bold leading-tight text-white">
                        {community.name}
                      </h3>
                      <span className="shrink-0 border border-white/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-400">
                        {community.city}
                      </span>
                    </div>
                    <p className="mt-2 flex-1 text-sm font-light leading-relaxed text-zinc-400">
                      {community.description}
                    </p>
                    <a
                      href={community.communityUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 self-start border border-white/25 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-zinc-200 transition hover:bg-python-yellow/10 group-hover:border-python-yellow group-hover:text-python-yellow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-python-yellow"
                    >
                      Ver comunidad
                    </a>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </CommunityGrid>
      </div>
    </section>
  );
}
