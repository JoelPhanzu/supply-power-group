import Image from "next/image";
import { Phone, EnvelopeSimple } from "@phosphor-icons/react/ssr";

export function Leadership() {
  return (
    <section id="synergie" className="bg-surface-page py-28">
      <div className="mx-auto max-w-[1100px] px-6">
        <div className="grid grid-cols-1 gap-10 rounded-[28px] border border-border-light bg-surface-card p-9 shadow-[0_10px_30px_rgba(18,21,31,0.05)] md:grid-cols-[1.3fr_1fr] md:p-12">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-accent-500">
              Partenaire minier stratégique
            </p>
            <h2 className="mb-5 font-heading text-2xl font-bold text-ink-900 md:text-3xl">
              SUPPLY POWER GROUP &amp; MAT DUREST
            </h2>
            <p className="text-ink-600">
              Sous la direction de Mr Exaucé Matadi, notre alliance stratégique réunit le meilleur
              de l&apos;ingénierie énergétique globale et de l&apos;approvisionnement
              d&apos;équipements industriels. Pendant que SUPPLY POWER GROUP conçoit et gère les
              infrastructures lourdes à l&apos;échelle mégawatt, MAT DUREST garantit la réactivité
              locale, l&apos;acheminement sécurisé des biens électriques et la maintenance urgente
              24/7 sur toute l&apos;étendue du territoire de la RDC.
            </p>
          </div>

          <div className="rounded-2xl border border-border-light bg-surface-page p-7">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.1em] text-ink-400">
              Savoir-faire conjoint
            </p>
            <div className="mb-5 flex items-center gap-3.5">
              <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-full">
                <Image
                  src="https://picsum.photos/seed/exauce-matadi-portrait/200/200"
                  alt="Exaucé Matadi"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-heading font-bold text-ink-900">Exaucé Matadi</p>
                <p className="text-sm text-ink-400">Directeur Général</p>
              </div>
            </div>

            <blockquote className="mb-5 text-[0.95rem] italic leading-relaxed text-ink-600">
              « La performance énergétique d&apos;une industrie ne se négocie pas. Notre
              engagement est d&apos;apporter à la République Démocratique du Congo des
              infrastructures électriques résilientes aux standards internationaux. »
            </blockquote>

            <div className="flex flex-col gap-2 border-t border-border-light pt-4">
              <a
                href="tel:+243816283633"
                className="flex items-center gap-2 text-sm text-ink-600 hover:text-accent-500"
              >
                <Phone className="h-4 w-4" /> +243 816 283 633
              </a>
              <a
                href="mailto:dgenerale@supplypower-group.com"
                className="flex items-center gap-2 text-sm text-ink-600 hover:text-accent-500"
              >
                <EnvelopeSimple className="h-4 w-4" /> dgenerale@supplypower-group.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
