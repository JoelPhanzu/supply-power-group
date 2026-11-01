import { Logo } from "@/components/ui/Logo";
import type { SiteContent } from "@/lib/content/schema";

export function Footer({
  content,
  logo,
}: {
  content: SiteContent["footer"];
  logo?: SiteContent["brand"]["logoDark"];
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 pt-16">
      <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-10 px-6 pb-14 sm:grid-cols-2 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <a href="/">
            <Logo theme="dark" size="sm" image={logo} />
          </a>
          <p className="mt-4 max-w-[280px] text-sm text-text-mute">{content.description}</p>
          <p className="mt-4 whitespace-pre-line text-sm text-text-mute">{content.address}</p>
        </div>

        <div>
          <h5 className="mb-4 text-sm uppercase tracking-wide text-text-faint">Navigation</h5>
          {content.links.map((link, i) => (
            <a
              key={`${link.href}-${i}`}
              href={link.href}
              className="mb-2.5 block text-sm text-text-mute hover:text-accent-500"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div>
          <h5 className="mb-4 text-sm uppercase tracking-wide text-text-faint">Coordonnées</h5>
          <p className="mb-2.5 text-sm text-text-mute">{content.phone}</p>
          <p className="mb-2.5 text-sm text-text-mute">{content.email}</p>
        </div>
      </div>

      <div className="border-t border-border-soft py-6">
        <p className="text-center text-[0.82rem] text-text-faint">
          © {year} {content.copyright}
          <br className="sm:hidden" /> {content.partnerLine}
        </p>
      </div>
    </footer>
  );
}
