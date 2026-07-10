import { Phone, EnvelopeSimple } from "@phosphor-icons/react/ssr";

export function Leadership() {
  return (
    <section className="bg-navy-950 py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mx-auto mb-14 max-w-[640px] text-center">
          <p className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-accent-500">
            <span className="h-[7px] w-[7px] rounded-full bg-gradient-accent shadow-[0_0_12px_#ff5a1f]" />
            Alliance stratégique
          </p>
          <h2 className="font-heading text-3xl font-bold md:text-4xl">Synergie &amp; Direction</h2>
          <p className="mt-3 text-base text-text-mute">
            SUPPLY POWER GROUP unit ses forces à <strong className="text-text-main">MAT DUREST</strong> pour
            offrir une expertise technique renforcée sur l&apos;ensemble de la chaîne énergétique —
            de l&apos;ingénierie à la réalisation, jusqu&apos;à la maintenance sur le long terme.
          </p>
        </div>

        <div className="mb-14 flex flex-wrap items-center justify-center gap-6 rounded-2xl border border-border-soft bg-navy-800 p-7">
          <span className="font-heading text-xl font-bold tracking-wide">SUPPLY POWER GROUP</span>
          <span className="text-xl text-accent-500">×</span>
          <span className="font-heading text-xl font-bold tracking-wide">MAT DUREST</span>
        </div>

        <div className="flex flex-col gap-8 rounded-[28px] border border-border-soft bg-gradient-to-br from-navy-700 to-navy-800 p-9 md:flex-row md:p-11">
          <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-3xl bg-gradient-accent font-heading text-2xl font-bold text-white shadow-[0_20px_60px_rgba(255,90,31,0.25)]">
            EM
          </div>
          <div className="flex-1">
            <blockquote className="mb-6 text-lg italic leading-relaxed text-text-main">
              « Notre mission est simple : garantir à chaque partenaire une énergie fiable,
              disponible et pensée pour durer. En Afrique centrale, l&apos;indépendance énergétique
              est la première brique de toute industrialisation. »
            </blockquote>
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border-soft pt-5">
              <div>
                <h4 className="mb-1 text-lg font-bold">Exaucé Matadi</h4>
                <span className="text-sm text-text-faint">Directeur Général — SUPPLY POWER GROUP</span>
              </div>
              <div className="flex flex-col items-start gap-1.5 md:items-end">
                <a
                  href="tel:+243816283633"
                  className="flex items-center gap-1.5 text-sm text-blue-300 hover:text-accent-500"
                >
                  <Phone className="h-4 w-4" /> +243 816 283 633
                </a>
                <a
                  href="mailto:contact@supplypowergroup.com"
                  className="flex items-center gap-1.5 text-sm text-blue-300 hover:text-accent-500"
                >
                  <EnvelopeSimple className="h-4 w-4" /> contact@supplypowergroup.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
