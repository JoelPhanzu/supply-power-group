import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { getSiteContent } from "@/lib/content/get";

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

const siteUrl = "https://supply-power-group.com";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSiteContent();
  const { title, description } = seo;
  const image = seo.ogImage.url || "/og-image.png";

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    openGraph: {
      title,
      description,
      url: siteUrl,
      siteName: "SUPPLY POWER GROUP",
      images: [{ url: image, width: 1200, height: 630, alt: seo.ogImage.alt || title }],
      locale: "fr_FR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

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
