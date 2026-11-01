import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { getSiteContent } from "@/lib/content/get";

// Menu + pied de page du site vitrine, alimentés par le contenu géré dans l'admin.
export async function SiteChrome({ children }: { children: React.ReactNode }) {
  const content = await getSiteContent();
  return (
    <>
      <Navbar content={content.nav} logo={content.brand.logoLight} />
      {children}
      <Footer content={content.footer} logo={content.brand.logoDark} />
    </>
  );
}
