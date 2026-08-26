import { Geist_Mono, Titillium_Web } from "next/font/google";
import ConsoleInit from "./ConsoleInit";
import "./globals.css";
export { metadata, viewport } from "@/lib/seo";

// 300 detalles/lead · 400 cuerpo · 600 labels · 700 botones · 900 titulares
const titillium = Titillium_Web({
  variable: "--font-titillium",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${titillium.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ConsoleInit />
        {children}
      </body>
    </html>
  );
}
