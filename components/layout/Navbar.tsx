"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { LuMenu, LuX } from "react-icons/lu";
import { asset } from "@/lib/assets";
import { NAV_LINKS } from "@/lib/site";
import { MosaicStrip } from "@/components/ui/MosaicBar";

// TODO: cuando existan páginas propias, reemplazar estos anchors por rutas
// reales de Next.js (<Link href="/comunidades" />, etc.).

const linkClass =
  "px-1 py-2 text-[13px] font-semibold uppercase tracking-[0.18em] text-zinc-300 transition hover:text-python-yellow focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-python-yellow";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        solid
          ? "border-b border-white/10 bg-night/90 shadow-lg shadow-black/20 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <MosaicStrip />
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* <a> nativo (no <Link>): fuerza una recarga completa del sitio */}
        <a
          href={asset("/")}
          aria-label="Python Colombia — ir al inicio"
          className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-python-yellow"
        >
          <Image
            src={asset("/images/logo.png")}
            alt="Python Colombia"
            width={146}
            height={45}
            priority
            className="h-9 w-auto"
          />
        </a>

        {/* Navegación de escritorio */}
        <nav aria-label="Principal" className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className={linkClass}>
              {link.label}
            </a>
          ))}
        </nav>

        {/* Botón hamburguesa */}
        <button
          type="button"
          className="p-2 text-zinc-200 transition hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-python-yellow md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <LuX size={22} aria-hidden="true" /> : <LuMenu size={22} aria-hidden="true" />}
        </button>
      </div>

      {/* Drawer móvil */}
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Principal móvil"
          className="border-t border-white/10 bg-night/95 backdrop-blur-md md:hidden"
        >
          <ul className="space-y-1 px-4 pb-6 pt-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-zinc-200 transition hover:bg-white/5 hover:text-python-yellow focus-visible:outline-2 focus-visible:outline-python-yellow"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
