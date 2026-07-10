import { ArrowRight } from "@phosphor-icons/react/ssr";
import { StatsBar } from "@/components/marketing/StatsBar";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-navy-950 pt-[190px]"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 900px 500px at 20% -10%, rgba(74,124,255,0.18), transparent 60%), radial-gradient(ellipse 700px 500px at 90% 10%, rgba(255,90,31,0.12), transparent 60%)",
      }}
    >
      <div
        className="bg-grid pointer-events-none absolute inset-0"
        style={{ maskImage: "linear-gradient(to bottom, black, transparent 75%)" }}
      />
      <div className="pointer-events-none absolute -right-52 -top-52 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(255,90,31,0.25),transparent_70%)] blur-[40px]" />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 pb-24">
        <div className="max-w-[780px]">
          <p className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-accent-500">
            <span className="h-[7px] w-[7px] rounded-full bg-gradient-accent shadow-[0_0_12px_#ff5a1f]" />
            Ingénierie énergétique &amp; industrielle
          </p>
          <h1 className="mb-5 font-heading text-[2.4rem] font-bold leading-[1.1] tracking-tight md:text-6xl">
            L&apos;énergie globale au service de votre{" "}
            <span className="text-gradient-accent">puissance industrielle.</span>
          </h1>
          <p className="mb-8 max-w-[620px] text-lg text-text-mute">
            De la production minière à la distribution connectée, SUPPLY POWER GROUP conçoit,
            déploie, stocke et maintient vos infrastructures énergétiques complexes. Nous
            transformons le potentiel énergétique en performance durable.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#simulateur"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-accent px-8 py-4 text-base font-semibold text-white shadow-[0_10px_30px_rgba(255,60,40,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(255,60,40,0.5)]"
            >
              Configurer ma solution
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#expertises"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border-soft bg-white/[0.03] px-8 py-4 text-base font-semibold text-text-main transition-all hover:border-blue-400 hover:bg-blue-400/10"
            >
              Découvrir nos expertises
            </a>
          </div>
        </div>
      </div>

      <StatsBar />
    </section>
  );
}
