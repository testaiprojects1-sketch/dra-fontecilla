import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AURA — Panel de la Consulta · Dra. Macarena Fontecilla",
  description:
    "Panel interno de la consulta. AURA propone, usted aprueba. Demo con datos simulados desde Google Sheets.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-CL" className={inter.variable}>
      <body className="font-sans antialiased bg-paper text-ink">{children}</body>
    </html>
  );
}
