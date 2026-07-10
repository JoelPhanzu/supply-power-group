import { Atom } from "@phosphor-icons/react/ssr";

const TAGS = ["Uranium", "Hydrocarbures", "Sites isolés", "Alimentation hybride"];

export function MiningSection() {
  return (
    <section
      id="realisations"
      className="bg-navy-950 py-28"
      style={{
        backgroundImage:
          "linear-gradient(180deg, transparent, rgba(74,124,255,0.05), transparent)",
      }}
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-16 px-6 md:grid-cols-[0.85fr_1.15fr]">
        <div className="flex flex-col items-center gap-8">
          <div className="rounded-full border border-border-soft bg-navy-700 px-5 py-2.5 text-sm text-text-mute">
            Secteur Minier &amp; Ressources
          </div>
          <div className="relative flex h-[260px] w-[260px] items-center justify-center">
            <div className="animate-spin-slow absolute inset-0 rounded-full border border-dashed border-accent-500/35" />
            <div className="animate-spin-slow-reverse absolute inset-[30px] rounded-full border border-dashed border-blue-400/35" />
            <Atom
              weight="duotone"
              className="h-16 w-16 text-accent-500 drop-shadow-[0_0_20px_rgba(255,90,31,0.5)]"
            />
          </div>
        </div>

        <div>
          <p className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-accent-500">
            <span className="h-[7px] w-[7px] rounded-full bg-gradient-accent shadow-[0_0_12px_#ff5a1f]" />
            De la ressource à l&apos;indépendance
          </p>
          <h2 className="mb-5 font-heading text-3xl font-bold md:text-[2.3rem]">
            De la ressource minière à l&apos;indépendance énergétique
          </h2>
          <p className="mb-4 text-text-mute">
            La République Démocratique du Congo dispose d&apos;un potentiel exceptionnel en
            ressources stratégiques — uranium, hydrocarbures et minerais critiques. SUPPLY POWER
            GROUP accompagne les acteurs de l&apos;extraction en sécurisant leur alimentation grâce
            à des solutions hybrides combinant production thermique, solaire et stockage.
          </p>
          <p className="mb-5 text-text-mute">
            Nos sites miniers isolés deviennent ainsi énergétiquement autonomes : production
            locale, réseaux de distribution internes et maintenance continue permettent de
            garantir la continuité d&apos;exploitation, même dans les zones les plus reculées du
            territoire.
          </p>
          <div className="flex flex-wrap gap-2.5">
            {TAGS.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-blue-400/25 bg-blue-400/10 px-4 py-1.5 text-[0.82rem] font-medium text-blue-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
