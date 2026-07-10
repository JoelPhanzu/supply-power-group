import { Logo } from "@/components/ui/Logo";

const NAV = [
  { href: "/#hero", label: "Accueil" },
  { href: "/#expertises", label: "Nos Expertises" },
  { href: "/#realisations", label: "Transition & Acteur Minier" },
  { href: "/#simulateur", label: "Simulateur de Puissance" },
  { href: "/#synergie", label: "Synergie Supply Power Group" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 pt-16">
      <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-10 px-6 pb-14 sm:grid-cols-2 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <a href="/">
            <Logo theme="dark" size="sm" />
          </a>
          <p className="mt-4 max-w-[280px] text-sm text-text-mute">
            Partenaire énergétique global de référence en RDC. De la construction de réseaux de
            transport à l&apos;acheminement de matériels techniques critiques.
          </p>
          <p className="mt-4 text-sm text-text-mute">
            Avenue Nyamuragira 59,
            <br />
            Commune de la Gombe,
            <br />
            Kinshasa, Immeuble Beautour
          </p>
        </div>

        <div>
          <h5 className="mb-4 text-sm uppercase tracking-wide text-text-faint">Navigation</h5>
          {NAV.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="mb-2.5 block text-sm text-text-mute hover:text-accent-500"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div>
          <h5 className="mb-4 text-sm uppercase tracking-wide text-text-faint">Coordonnées</h5>
          <p className="mb-2.5 text-sm text-text-mute">+243 816 283 633</p>
          <p className="mb-2.5 text-sm text-text-mute">dgenerale@supplypower-group.com</p>
        </div>
      </div>

      <div className="border-t border-border-soft py-6">
        <p className="text-center text-[0.82rem] text-text-faint">
          © {year} SUPPLY POWER GROUP. Tous droits réservés.
          <br className="sm:hidden" /> En collaboration technique et commerciale avec MAT DUREST.
        </p>
      </div>
    </footer>
  );
}
