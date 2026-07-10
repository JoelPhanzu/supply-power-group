import { Buildings, GearSix, Leaf } from "@phosphor-icons/react/ssr";

const CARDS = [
  {
    icon: Buildings,
    number: "01",
    title: "Infrastructures & Réseaux",
    items: [
      "Construction de cabines BT & HT",
      "Centrales de production",
      "Lignes de transport & distribution",
    ],
    featured: false,
  },
  {
    icon: GearSix,
    number: "02",
    title: "Solutions & Fournitures",
    items: [
      "Vente d'énergie",
      "Fourniture de groupes électrogènes",
      "Distribution de matériel certifié",
    ],
    featured: true,
  },
  {
    icon: Leaf,
    number: "03",
    title: "Transition & Efficacité",
    items: ["Audits énergétiques", "Bornes de recharge VE", "Rénovation basse consommation"],
    featured: false,
  },
];

export function Expertises() {
  return (
    <section id="expertises" className="bg-navy-950 py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mx-auto mb-14 max-w-[640px] text-center">
          <p className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-accent-500">
            <span className="h-[7px] w-[7px] rounded-full bg-gradient-accent shadow-[0_0_12px_#ff5a1f]" />
            Nos domaines d&apos;intervention
          </p>
          <h2 className="font-heading text-3xl font-bold md:text-4xl">
            Trois piliers pour sécuriser votre énergie
          </h2>
          <p className="mt-3 text-base text-text-mute">
            Une offre intégrée, de l&apos;infrastructure lourde à l&apos;efficacité énergétique de
            demain.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
          {CARDS.map((card) => (
            <article
              key={card.title}
              className={`group relative overflow-hidden rounded-[28px] border p-10 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)] ${
                card.featured
                  ? "border-accent-500/35 bg-gradient-to-b from-accent-500/[0.09] to-navy-800 hover:border-accent-500/40"
                  : "border-border-soft bg-gradient-to-b from-navy-700 to-navy-800 hover:border-accent-500/40"
              }`}
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5">
                <card.icon weight="duotone" className="h-7 w-7 text-accent-500" />
              </div>
              <h3 className="mb-4 font-heading text-xl font-bold">{card.title}</h3>
              <ul className="space-y-3">
                {card.items.map((item) => (
                  <li key={item} className="relative pl-5 text-[0.95rem] text-text-mute">
                    <span className="absolute left-0 top-[9px] h-2 w-2 rounded-sm bg-gradient-accent" />
                    {item}
                  </li>
                ))}
              </ul>
              <span className="absolute right-7 top-6 font-heading text-4xl font-bold text-white/5">
                {card.number}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
