import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SUPPLY POWER GROUP | Énergie & Infrastructures Industrielles",
  description:
    "SUPPLY POWER GROUP conçoit, déploie, stocke et maintient vos infrastructures énergétiques complexes. Solutions clés en main en RDC.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-screen bg-surface-page font-sans text-ink-900 antialiased">
        {children}
      </body>
    </html>
  );
}
