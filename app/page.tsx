import { Navbar } from "@/components/marketing/Navbar";
import { Hero } from "@/components/marketing/Hero";
import { Expertises } from "@/components/marketing/Expertises";
import { MiningSection } from "@/components/marketing/MiningSection";
import { Simulator } from "@/components/marketing/Simulator";
import { Leadership } from "@/components/marketing/Leadership";
import { ContactForm } from "@/components/marketing/ContactForm";
import { Footer } from "@/components/marketing/Footer";
import { SimulatorProvider } from "@/components/marketing/SimulatorContext";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <SimulatorProvider>
          <Hero />
          <Expertises />
          <MiningSection />
          <Simulator />
          <Leadership />
          <ContactForm />
        </SimulatorProvider>
      </main>
      <Footer />
    </>
  );
}
