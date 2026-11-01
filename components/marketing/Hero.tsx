import { StatsBar } from "@/components/marketing/StatsBar";
import { ButtonLink } from "@/components/ui/Button";
import { SiteImage } from "@/components/ui/SiteImage";
import type { SiteContent } from "@/lib/content/schema";

export function Hero({
  content,
  stats,
}: {
  content: SiteContent["hero"];
  stats: SiteContent["stats"];
}) {
  return (
    <section id="hero" className="relative">
      <div className="relative min-h-[600px] w-full sm:min-h-[640px] md:min-h-[700px]">
        <SiteImage
          src={content.image.url}
          alt={content.image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/65 to-ink-900/25" />

        <div className="relative z-10 mx-auto max-w-[1100px] px-6">
          <div className="max-w-[600px] pb-16 pt-28 md:pb-24 md:pt-32">
            <h1 className="mb-5 whitespace-pre-line font-heading text-4xl font-bold leading-[1.1] text-white md:text-6xl">
              {content.title}
            </h1>
            <p className="mb-8 max-w-[520px] whitespace-pre-line text-base text-white/80 md:text-lg">
              {content.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <ButtonLink href="#contact" variant="primary" size="lg">
                {content.primaryCta}
              </ButtonLink>
              <a
                href="#simulateur"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/15"
              >
                {content.secondaryCta}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-20 mx-auto max-w-[1000px] px-6">
        <div className="mt-6 md:-mt-16">
          <StatsBar items={stats.items} />
        </div>
      </div>
    </section>
  );
}
