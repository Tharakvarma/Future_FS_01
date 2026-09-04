import { GraduationCap, MapPin } from "lucide-react";
import { EDUCATION } from "./data";
import { Reveal, SectionHeading } from "./primitives";

export function Education() {
  return (
    <section id="education" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="Education" title="Where I'm Learning." />

        <ol className="relative mt-12 max-w-3xl border-l border-border pl-8 sm:pl-10">
          <span
            className="absolute top-0 -left-px h-full w-px bg-[image:var(--gradient-brand)] opacity-40"
            aria-hidden
          />
          {EDUCATION.map((e, i) => (
            <Reveal as="li" key={e.school} delay={i * 120} className="relative pb-10 last:pb-0">
              <span className="glass absolute -left-[3.05rem] grid size-9 place-items-center rounded-full text-accent sm:-left-[3.55rem]">
                <GraduationCap className="size-4" />
              </span>
              <div className="glass rounded-2xl p-6 transition duration-500 hover:glow-ring">
                <h3 className="font-display text-lg font-semibold sm:text-xl">
                  {e.school}
                </h3>
                <p className="mt-1 text-sm text-accent">{e.program}</p>
                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
                  <span>{e.score}</span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="size-3.5" />
                    {e.location}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
