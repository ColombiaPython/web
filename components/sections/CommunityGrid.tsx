"use client";

import { Children, type ReactNode, useState } from "react";

interface CommunityGridProps {
  children: ReactNode;
}

const INITIAL_VISIBLE = 8;

export default function CommunityGrid({ children }: CommunityGridProps) {
  const [showAll, setShowAll] = useState(false);
  const cards = Children.toArray(children);
  const visibleCards = showAll ? cards : cards.slice(0, INITIAL_VISIBLE);

  return (
    <>
      <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:pb-10">
        {visibleCards}
      </ul>
      {!showAll && cards.length > INITIAL_VISIBLE ? (
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="mx-auto mt-2 block border border-white/25 px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-zinc-200 transition hover:border-python-yellow hover:bg-python-yellow/10 hover:text-python-yellow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-python-yellow"
        >
          Ver más
        </button>
      ) : null}
    </>
  );
}