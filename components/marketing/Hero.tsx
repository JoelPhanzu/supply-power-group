import Image from "next/image";
import { StatsBar } from "@/components/marketing/StatsBar";
import { ButtonLink } from "@/components/ui/Button";

export function Hero() {
  return (
    <section id="hero" className="relative">
      <div className="relative min-h-[600px] w-full sm:min-h-[640px] md:min-h-[700px]">
        <Image
          src="https://picsum.photos/seed/supply-power-wind-turbines-sunset/1920/1080"
          alt="Éoliennes industrielles au coucher du soleil"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/65 to-ink-900/25" />

        <div className="relative z-10 mx-auto max-w-[1100px] px-6">
          <div className="max-w-[600px] pb-16 pt-28 md:pb-24 md:pt-32">
            <h1 className="mb-5 font-heading text-4xl font-bold leading-[1.1] text-white md:text-6xl">
              L&apos;énergie globale au service de votre puissance industrielle.
            </h1>
            <p className="mb-8 max-w-[520px] text-base text-white/80 md:text-lg">
              De la production minière à la distribution connectée, SUPPLY POWER GROUP conçoit,
              déploie, stocke et maintient vos infrastructures énergétiques complexes. Nous
              transformons le potentiel énergétique en performance durable.
            </p>
            <div className="flex flex-wrap gap-4">
              <ButtonLink href="#contact" variant="primary" size="lg">
                Demander un devis
              </ButtonLink>
              <a
                href="#simulateur"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/15"
              >
                Configurer ma solution
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-20 mx-auto max-w-[1000px] px-6">
        <div className="mt-6 md:-mt-16">
          <StatsBar />
        </div>
      </div>
    </section>
  );
}
