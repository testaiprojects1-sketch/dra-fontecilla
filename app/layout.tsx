import type { Metadata } from "next";
import { Jost, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Dra. Macarena Fontecilla — Estética Dental y Facial | Vitacura, Santiago",
  description:
    "Consulta privada de estética dental y facial en Vitacura. Resultados naturales, atención personalizada y diagnóstico digital de sonrisa. Agende su evaluación.",
  keywords: [
    "estética dental Vitacura",
    "estética facial Santiago",
    "Dra. Macarena Fontecilla",
    "blanqueamiento dental",
    "armonización facial",
    "diseño de sonrisa",
    "toxina botulínica Vitacura",
  ],
  openGraph: {
    title: "Dra. Macarena Fontecilla — Estética Dental y Facial",
    description:
      "Estética dental y facial de precisión, resultados naturales. Consulta privada en Vitacura, Santiago de Chile.",
    locale: "es_CL",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-CL" className={`${jost.variable} ${cormorant.variable}`}>
      <body className="font-sans antialiased bg-cream text-charcoal">
        {children}
      </body>
    </html>
  );
}
