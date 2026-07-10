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

const title = "SUPPLY POWER GROUP | Énergie & Infrastructures Industrielles";
const description =
  "L'énergie globale au service de votre puissance industrielle. SUPPLY POWER GROUP conçoit, déploie, stocke et maintient vos infrastructures énergétiques complexes en RDC.";
const siteUrl = "https://supply-power-group.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "SUPPLY POWER GROUP",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SUPPLY POWER GROUP",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
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
