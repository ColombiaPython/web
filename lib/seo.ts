import type { Metadata, Viewport } from "next";
import { asset } from "@/lib/assets";

function resolveMetadataBase(): URL {
  if (process.env.GITHUB_ACTIONS && process.env.GITHUB_REPOSITORY) {
    const owner = process.env.GITHUB_REPOSITORY.split("/")[0];
    return new URL(`https://${owner}.github.io`);
  }
  return new URL("https://python.org.co");
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#3776AB",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: resolveMetadataBase(),
  title: {
    default: "Python Colombia | Comunidad Oficial de Python en Colombia",
    template: "%s | Python Colombia",
  },
  description: "La comunidad oficial de Python en Colombia. Aprende, comparte y conecta con desarrolladores en eventos, talleres y proyectos open source.",
  applicationName: "Python Colombia",
  keywords: [
    "Python Colombia",
    "Comunidad Python Colombia",
    "Programación en Python",
    "Python",
    "Django",
    "FastAPI",
    "Flask",
    "Orionis",
    "PyCon Colombia",
    "Eventos Python",
    "Open Source",
    "Software Libre",
    "Inteligencia Artificial",
    "Machine Learning",
    "Data Science",
    "Backend Python",
],
  authors: [
    {
      name: "Python Colombia",
      url: "https://python.org.co",
    },
    {
      name: "Raúl Mauricio Uñate",
      url: "https://github.com/rmunate",
    },
  ],
  creator: "Python Colombia",
  publisher: "Python Colombia",
  category: "Technology",
  formatDetection: {
    telephone: false,
  },
  alternates: {
    canonical: "https://python.org.co",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://python.org.co",
    siteName: "Python Colombia",
    title: "Python Colombia | Comunidad Oficial de Python en Colombia",
    description: "Únete a la comunidad Python más grande de Colombia. Aprende, comparte y conecta con desarrolladores.",
    images: [
      {
        url: asset("/images/seo/og-image.jpg"),
        width: 1200,
        height: 630,
        alt: "Python Colombia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Python Colombia",
    description: "La comunidad oficial de Python en Colombia.",
    images: [asset("/images/seo/og-image.jpg")],
  },
};
