import Image from "next/image";

const INFO_BLOCKS = [
  {
    label: "Extraction",
    description: "Uranium et Hydrocarbures",
  },
  {
    label: "Infrastructure",
    description: "Cabines de raccordement dédiées",
  },
];

export function MiningSection() {
  return (
    <section id="realisations" className="bg-surface-page py-28">
      <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-center gap-14 px-6 md:grid-cols-2">
        <div className="grid grid-cols-2 gap-4">
          <div className="relative col-span-2 h-[200px] overflow-hidden rounded-[24px]">
            <Image
              src="https://picsum.photos/seed/supply-power-solar-panels/900/500"
              alt="Ferme solaire industrielle"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative h-[160px] overflow-hidden rounded-[24px]">
            <Image
              src="https://picsum.photos/seed/supply-power-mining-excavator/450/400"
              alt="Excavatrice sur site minier"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative h-[160px] overflow-hidden rounded-[24px]">
            <Image
              src="https://picsum.photos/seed/supply-power-industrial-equipment/450/400"
              alt="Équipement industriel"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-accent-500">
            Transition & acteur minier
          </p>
          <h2 className="mb-5 font-heading text-3xl font-bold text-ink-900 md:text-[2.3rem]">
            De la ressource minière à l&apos;indépendance
          </h2>
          <p className="mb-4 text-ink-600">
            SUPPLY POWER GROUP combine ses expertises énergétiques et son rôle d&apos;acteur minier
            en RDC. Nous intervenons dans l&apos;extraction et la transformation de ressources
            stratégiques d&apos;uranium et d&apos;hydrocarbures nécessaires à la souveraineté
            énergétique.
          </p>
          <p className="mb-7 text-ink-600">
            Parallèlement, nous déployons des micro-réseaux et des solutions d&apos;alimentation
            hybrides (solaire/diesel) directement sur les sites d&apos;exploitation minière pour
            assurer un approvisionnement continu, propre et sans interruptions.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {INFO_BLOCKS.map((block) => (
              <div
                key={block.label}
                className="rounded-2xl border border-border-light bg-surface-card px-5 py-4"
              >
                <p className="mb-1 text-sm font-bold text-ink-900">{block.label}</p>
                <p className="text-[0.82rem] text-ink-600">{block.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
