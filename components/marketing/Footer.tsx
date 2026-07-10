import { Lightning } from "@phosphor-icons/react/ssr";

const NAV = [
  { href: "#hero", label: "Accueil" },
  { href: "#expertises", label: "Nos expertises" },
  { href: "#realisations", label: "Réalisations" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-soft bg-navy-900 pt-18">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-6 pb-14 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <a href="#" className="flex items-center gap-2.5 font-heading text-lg font-bold">
            <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-gradient-accent">
              <Lightning weight="fill" className="h-5 w-5 text-white" />
            </span>
            SUPPLY <span className="text-accent-500">POWER</span>
          </a>
          <p className="mt-4 max-w-[260px] text-sm text-text-mute">
            L&apos;énergie globale au service de votre puissance industrielle.
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
          <p className="mb-2.5 text-sm text-text-mute">
            Avenue Nyamuragira 59, Gombe
            <br />
            Kinshasa — Immeuble Beautour
          </p>
          <p className="mb-2.5 text-sm text-text-mute">+243 816 283 633</p>
          <p className="mb-2.5 text-sm text-text-mute">contact@supplypowergroup.com</p>
        </div>

        <div>
          <h5 className="mb-4 text-sm uppercase tracking-wide text-text-faint">Partenariat</h5>
          <p className="text-sm text-text-mute">
            Collaboration technique &amp; opérationnelle avec{" "}
            <strong className="text-text-main">MAT DUREST</strong> pour la réalisation de vos
            infrastructures énergétiques.
          </p>
        </div>
      </div>

      <div className="border-t border-border-soft py-6">
        <p className="text-center text-[0.82rem] text-text-faint">
          © {year} SUPPLY POWER GROUP. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
