/** Configuración estática del sitio: navegación, contacto y redes. */

export const CONTACT_EMAIL = "colombiapython@gmail.com";
export const CODE_OF_CONDUCT_URL = "https://github.com/ColombiaPython/codigo-de-conducta";

/** Menú de navegación del sitio */
export const NAV_LINKS = [
  { label: "Comunidades", href: "#comunidades" },
  { label: "Eventos", href: "#eventos" },
  { label: "Patrocinadores", href: "#patrocinadores" },
  { label: "Newsletter", href: "#newsletter" },
] as const;

/** Enlaces a redes sociales del sitio */
export interface SocialLink {
  id: string;
  label: string;
  href: string;
}

/** Lista de enlaces a redes sociales del sitio */
export const SOCIAL_LINKS: readonly SocialLink[] = [
  { id: "email", label: "Email", href: `mailto:${CONTACT_EMAIL}` },
  { id: "x", label: "X (Twitter)", href: "https://x.com/ColombiaPython" },
  { id: "facebook", label: "Facebook", href: "https://www.facebook.com/ColombiaPython" },
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/colombiapython/" },
  { id: "github", label: "GitHub", href: "https://github.com/ColombiaPython" },
  { id: "telegram", label: "Telegram", href: "https://t.me/pythoncolombia" },
  { id: "medium", label: "Medium", href: "https://medium.com/@pythoncolombia" },
  { id: "slack", label: "Slack", href: "https://python-colombia.slack.com/" },
  { id: "discord", label: "Discord", href: "https://discord.gg/zhNTvcrffP" },
] as const;
