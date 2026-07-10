import { Buildings, GearSix, Leaf, CheckCircle, ArrowRight } from "@phosphor-icons/react/ssr";

const CARDS = [
  {
    icon: Buildings,
    iconClass: "bg-blue-400/10 text-blue-400",
    title: "Infrastructures & Réseaux",
    intro:
      "Nous assurons l'ingénierie lourde pour garantir le transport et la distribution d'énergie.",
    items: [
      "Construction & gestion de cabines BT & HT",
      "Centrales thermiques, solaires & hydroélectriques",
      "Réseaux de canalisation & lignes de transport",
    ],
    link: "Demander une étude",
  },
  {
    icon: GearSix,
    iconClass: "bg-emerald-500/10 text-emerald-600",
    title: "Solutions & Fournitures",
    intro:
      "La flexibilité de notre chaîne d'approvisionnement répond à tous vos besoins en équipements de puissance.",
    items: [
      "Achat de gros & vente d'électricité, gaz, pétrole",
      "Fourniture de groupes électrogènes toutes puissances",
      "Distribution de matériels électriques certifiés",
    ],
    link: "Consulter le catalogue",
  },
  {
    icon: Leaf,
    iconClass: "bg-accent-500/10 text-accent-500",
    title: "Transition & Efficacité",
    intro:
      "Optimisez vos factures énergétiques et préparez l'avenir grâce à nos audits technologiques.",
    items: [
      "Audits de consommation & Smart Grids",
      "Installation de bornes de recharge VE",
      "Rénovation énergétique basse consommation",
    ],
    link: "Lancer une transition",
  },
];

export function Expertises() {
  return (
    <section id="expertises" className="bg-surface-page pb-28 pt-36 md:pt-40">
      <div className="mx-auto max-w-[1100px] px-6">
        <div className="mx-auto mb-14 max-w-[640px] text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-accent-500">
            Notre savoir-faire
          </p>
          <h2 className="font-heading text-3xl font-bold text-ink-900 md:text-4xl">
            Une expertise intégrée sur toute la chaîne de valeur énergétique
          </h2>
          <p className="mt-3 text-base text-ink-600">
            Nous concevons des installations sécurisées et pérennes adaptées aux exigences des
            industries modernes.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
          {CARDS.map((card) => (
            <article
              key={card.title}
              className="group flex flex-col rounded-[28px] border border-border-light bg-surface-card p-9 shadow-[0_10px_30px_rgba(18,21,31,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(18,21,31,0.1)]"
            >
              <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${card.iconClass}`}>
                <card.icon weight="duotone" className="h-7 w-7" />
              </div>
              <h3 className="mb-3 font-heading text-xl font-bold text-ink-900">{card.title}</h3>
              <p className="mb-5 text-sm text-ink-600">{card.intro}</p>
              <ul className="mb-7 flex-1 space-y-2.5">
                {card.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[0.9rem] text-ink-600">
                    <CheckCircle weight="fill" className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-900 transition-transform group-hover:gap-2.5"
              >
                {card.link}
                <ArrowRight className="h-4 w-4" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
