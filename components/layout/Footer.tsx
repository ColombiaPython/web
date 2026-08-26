import Image from "next/image";
import type { IconType } from "react-icons";
import {
  FaDiscord,
  FaEnvelope,
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaMedium,
  FaSlack,
  FaTelegram,
  FaXTwitter,
} from "react-icons/fa6";
import { asset } from "@/lib/assets";
import { MosaicStrip } from "@/components/ui/MosaicBar";
import { CODE_OF_CONDUCT_URL, CONTACT_EMAIL, NAV_LINKS, SOCIAL_LINKS } from "@/lib/site";

/** Icono y color de hover por red (acentos del mosaico del logo). */
const SOCIAL_ICONS: Record<string, { icon: IconType; hoverClass: string }> = {
  email: { icon: FaEnvelope, hoverClass: "hover:text-python-yellow hover:border-python-yellow/50" },
  x: { icon: FaXTwitter, hoverClass: "hover:text-white hover:border-white/50" },
  facebook: { icon: FaFacebookF, hoverClass: "hover:text-python-blue-light hover:border-python-blue-light/50" },
  instagram: { icon: FaInstagram, hoverClass: "hover:text-accent-red hover:border-accent-red/50" },
  github: { icon: FaGithub, hoverClass: "hover:text-white hover:border-white/50" },
  telegram: { icon: FaTelegram, hoverClass: "hover:text-python-blue-light hover:border-python-blue-light/50" },
  medium: { icon: FaMedium, hoverClass: "hover:text-accent-green hover:border-accent-green/50" },
  slack: { icon: FaSlack, hoverClass: "hover:text-accent-orange hover:border-accent-orange/50" },
  discord: { icon: FaDiscord, hoverClass: "hover:text-accent-purple hover:border-accent-purple/50" },
};

export default function Footer() {
  return (
    <footer className="relative bg-night-soft">
      {/* El mosaico del logo remata la página, como en la navbar */}
      <MosaicStrip />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
          <div>
            <Image
              src={asset("/images/logo.png")}
              alt="Python Colombia"
              width={195}
              height={60}
              className="h-12 w-auto"
            />
            <p className="mt-5 max-w-sm text-sm font-light leading-relaxed text-zinc-400">
              La comunidad oficial de Python en Colombia. Aprende, comparte y
              crece junto a pythonistas de todo el país.
            </p>
            <nav aria-label="Secciones" className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400 transition hover:text-python-yellow focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-python-yellow"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.25em] text-white">
              Encuéntranos en
            </h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {SOCIAL_LINKS.map((social) => {
                const entry = SOCIAL_ICONS[social.id];
                if (!entry) return null;
                const Icon = entry.icon;
                const external = social.href.startsWith("http");
                return (
                  <li key={social.id}>
                    <a
                      href={social.href}
                      aria-label={social.label}
                      title={social.label}
                      {...(external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className={`flex h-11 w-11 items-center justify-center border border-white/10 bg-white/5 text-zinc-300 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-python-yellow ${entry.hoverClass}`}
                    >
                      <Icon size={18} aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
            <p className="mt-5 text-sm text-zinc-400">
              Escríbenos:{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-medium text-python-yellow underline-offset-4 transition hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-xs text-zinc-500">
            © {new Date().getFullYear()} Python Colombia. Todos los derechos
            reservados.
          </p>
          <a
            href={CODE_OF_CONDUCT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold uppercase tracking-[0.15em] text-zinc-400 underline-offset-4 transition hover:text-python-yellow hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-python-yellow"
          >
            Código de Conducta
          </a>
        </div>
      </div>
    </footer>
  );
}
