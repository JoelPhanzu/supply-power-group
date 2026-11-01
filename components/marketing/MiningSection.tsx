import { SiteImage } from "@/components/ui/SiteImage";
import type { SiteContent } from "@/lib/content/schema";

export function MiningSection({ content }: { content: SiteContent["mining"] }) {
  const [main, ...others] = content.images.filter((img) => img?.url);

  return (
    <section id="realisations" className="bg-surface-page py-28">
      <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-center gap-14 px-6 md:grid-cols-2">
        <div className="grid grid-cols-2 gap-4">
          {main && (
            <div className="relative col-span-2 h-[200px] overflow-hidden rounded-[24px]">
              <SiteImage
                src={main.url}
                alt={main.alt}
                fill
                sizes="(min-width: 768px) 550px, 100vw"
                className="object-cover"
              />
            </div>
          )}
          {others.map((img, i) => (
            <div key={`${img.url}-${i}`} className="relative h-[160px] overflow-hidden rounded-[24px]">
              <SiteImage
                src={img.url}
                alt={img.alt}
                fill
                sizes="(min-width: 768px) 270px, 50vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-accent-500">
            {content.eyebrow}
          </p>
          <h2 className="mb-5 font-heading text-3xl font-bold text-ink-900 md:text-[2.3rem]">
            {content.title}
          </h2>
          {content.paragraphs.map((p, i) => (
            <p
              key={i}
              className={`whitespace-pre-line text-ink-600 ${
                i === content.paragraphs.length - 1 ? "mb-7" : "mb-4"
              }`}
            >
              {p}
            </p>
          ))}
          <div className="grid grid-cols-2 gap-4">
            {content.blocks.map((block, i) => (
              <div
                key={`${block.label}-${i}`}
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
