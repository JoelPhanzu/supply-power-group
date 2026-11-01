import { Navbar } from "@/components/marketing/Navbar";
import { Hero } from "@/components/marketing/Hero";
import { Expertises } from "@/components/marketing/Expertises";
import { MiningSection } from "@/components/marketing/MiningSection";
import { Simulator } from "@/components/marketing/Simulator";
import { Leadership } from "@/components/marketing/Leadership";
import { ContactForm } from "@/components/marketing/ContactForm";
import { Footer } from "@/components/marketing/Footer";
import { SimulatorProvider } from "@/components/marketing/SimulatorContext";
import { getSiteContent } from "@/lib/content/get";

// Régénérée immédiatement à chaque enregistrement depuis l'admin
// (revalidatePath), avec un filet de sécurité toutes les 5 minutes.
export const revalidate = 300;

export default async function Home() {
  const content = await getSiteContent();

  return (
    <>
      <Navbar content={content.nav} logo={content.brand.logoLight} />
      <main>
        <SimulatorProvider defaultLocation={content.simulator.locations[0]}>
          <Hero content={content.hero} stats={content.stats} />
          <Expertises content={content.expertises} />
          <MiningSection content={content.mining} />
          <Simulator content={content.simulator} />
          <Leadership content={content.leadership} />
          <ContactForm content={content.contact} />
        </SimulatorProvider>
      </main>
      <Footer content={content.footer} logo={content.brand.logoDark} />
    </>
  );
}
