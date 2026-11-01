import { Phone, EnvelopeSimple } from "@phosphor-icons/react/ssr";
import { SiteImage } from "@/components/ui/SiteImage";
import type { SiteContent } from "@/lib/content/schema";

export function Leadership({ content }: { content: SiteContent["leadership"] }) {
  const tel = content.phone.replace(/[^\d+]/g, "");

  return (
    <section id="synergie" className="bg-surface-page py-28">
      <div className="mx-auto max-w-[1100px] px-6">
        <div className="grid grid-cols-1 gap-10 rounded-[28px] border border-border-light bg-surface-card p-9 shadow-[0_10px_30px_rgba(18,21,31,0.05)] md:grid-cols-[1.3fr_1fr] md:p-12">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-accent-500">
              {content.eyebrow}
            </p>
            <h2 className="mb-5 font-heading text-2xl font-bold text-ink-900 md:text-3xl">
              {content.title}
            </h2>
            <p className="whitespace-pre-line text-ink-600">{content.body}</p>
          </div>

          <div className="rounded-2xl border border-border-light bg-surface-page p-7">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.1em] text-ink-400">
              {content.cardEyebrow}
            </p>
            <div className="mb-5 flex items-center gap-3.5">
              <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-full">
                <SiteImage
                  src={content.personPhoto.url}
                  alt={content.personPhoto.alt}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-heading font-bold text-ink-900">{content.personName}</p>
                <p className="text-sm text-ink-400">{content.personRole}</p>
              </div>
            </div>

            <blockquote className="mb-5 text-[0.95rem] italic leading-relaxed text-ink-600">
              « {content.quote} »
            </blockquote>

            <div className="flex flex-col gap-2 border-t border-border-light pt-4">
              <a
                href={`tel:${tel}`}
                className="flex items-center gap-2 text-sm text-ink-600 hover:text-accent-500"
              >
                <Phone className="h-4 w-4" /> {content.phone}
              </a>
              <a
                href={`mailto:${content.email}`}
                className="flex items-center gap-2 text-sm text-ink-600 hover:text-accent-500"
              >
                <EnvelopeSimple className="h-4 w-4" /> {content.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
