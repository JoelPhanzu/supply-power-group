import {
  Buildings,
  GearSix,
  Leaf,
  Lightning,
  Sun,
  Plug,
  GasPump,
  Truck,
  Wrench,
  BatteryCharging,
  Factory,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
} from "@phosphor-icons/react/ssr";
import type { ColorName, IconName, SiteContent } from "@/lib/content/schema";

const ICONS: Record<IconName, typeof Buildings> = {
  buildings: Buildings,
  gear: GearSix,
  leaf: Leaf,
  lightning: Lightning,
  sun: Sun,
  plug: Plug,
  gaspump: GasPump,
  truck: Truck,
  wrench: Wrench,
  battery: BatteryCharging,
  factory: Factory,
  shield: ShieldCheck,
};

const COLORS: Record<ColorName, string> = {
  blue: "bg-blue-400/10 text-blue-400",
  green: "bg-emerald-500/10 text-emerald-600",
  orange: "bg-accent-500/10 text-accent-500",
};

export function Expertises({ content }: { content: SiteContent["expertises"] }) {
  return (
    <section id="expertises" className="bg-surface-page pb-28 pt-36 md:pt-40">
      <div className="mx-auto max-w-[1100px] px-6">
        <div className="mx-auto mb-14 max-w-[640px] text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-accent-500">
            {content.eyebrow}
          </p>
          <h2 className="font-heading text-3xl font-bold text-ink-900 md:text-4xl">
            {content.title}
          </h2>
          <p className="mt-3 text-base text-ink-600">{content.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
          {content.cards.map((card, i) => {
            const Icon = ICONS[card.icon] ?? Lightning;
            return (
              <article
                key={`${card.title}-${i}`}
                className="group flex flex-col rounded-[28px] border border-border-light bg-surface-card p-9 shadow-[0_10px_30px_rgba(18,21,31,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(18,21,31,0.1)]"
              >
                <div
                  className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${
                    COLORS[card.color] ?? COLORS.orange
                  }`}
                >
                  <Icon weight="duotone" className="h-7 w-7" />
                </div>
                <h3 className="mb-3 font-heading text-xl font-bold text-ink-900">{card.title}</h3>
                <p className="mb-5 text-sm text-ink-600">{card.intro}</p>
                <ul className="mb-7 flex-1 space-y-2.5">
                  {(card.items ?? []).map((item, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-[0.9rem] text-ink-600">
                      <CheckCircle weight="fill" className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                      {item}
                    </li>
                  ))}
                </ul>
                {card.linkLabel && (
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-900 transition-transform group-hover:gap-2.5"
                  >
                    {card.linkLabel}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
