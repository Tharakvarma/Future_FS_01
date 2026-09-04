import { useState } from "react";
import { Award, Expand } from "lucide-react";
import { CERTIFICATIONS } from "./data";
import { Reveal, SafeImage, SectionHeading } from "./primitives";
import { Lightbox } from "./Lightbox";

export function Certifications() {
  const [viewer, setViewer] = useState<number | null>(null);
  const items = CERTIFICATIONS.map((c) => ({
    src: c.image,
    alt: `${c.title} certificate — ${c.issuer}`,
    caption: `${c.title} · ${c.issuer}`,
  }));

  return (
    <section
      id="certifications"
      className="relative scroll-mt-24 py-24 md:py-32"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Certifications"
          title="Learning Beyond the Classroom."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CERTIFICATIONS.map((c, i) => (
            <Reveal key={c.title} delay={i * 80}>
              <button
                type="button"
                onClick={() => setViewer(i)}
                className="glass group h-full w-full overflow-hidden rounded-2xl text-left transition duration-500 hover:-translate-y-1 hover:glow-ring"
                aria-label={`View ${c.title} certificate`}
              >
                <div className="relative bg-surface-2">
                  <SafeImage
                    src={c.image}
                    alt={`${c.title} certificate`}
                    label="Certificate image"
                    contain
                    className="aspect-[4/3] w-full"
                    imgClassName="p-3 group-hover:scale-[1.03]"
                  />
                  <span className="absolute top-3 right-3 grid size-9 place-items-center rounded-full bg-background/70 text-accent opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                    <Expand className="size-4" />
                  </span>
                </div>
                <div className="flex items-start gap-3 p-5">
                  <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg border border-glass-border bg-surface text-accent">
                    <Award className="size-4" />
                  </span>
                  <div>
                    <h3 className="font-display text-sm leading-snug font-semibold text-balance">
                      {c.title}
                    </h3>
                    <p className="mt-1 font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
                      {c.issuer}
                    </p>
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {viewer !== null && (
        <Lightbox
          items={items}
          index={viewer}
          onIndexChange={setViewer}
          onClose={() => setViewer(null)}
        />
      )}
    </section>
  );
}
