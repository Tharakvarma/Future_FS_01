import { Brain, Cpu, Sparkles } from "lucide-react";
import { HIGHLIGHTS, PROFILE } from "./data";
import { Reveal, SectionHeading } from "./primitives";

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="About"
          title="Curious Mind. Constant Learner. Future AI Engineer."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="text-lg leading-relaxed text-pretty text-muted-foreground">
              {PROFILE.about}
            </p>
            <ul className="mt-8 space-y-4">
              {[
                { Icon: Brain, text: "Exploring AI, ML and emerging technologies" },
                { Icon: Cpu, text: "Building practical projects to sharpen my skills" },
                { Icon: Sparkles, text: "Looking for hands-on industry experience" },
              ].map(({ Icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <span className="glass mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg text-accent">
                    <Icon className="size-4" />
                  </span>
                  <span className="text-sm text-muted-foreground">{text}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            {HIGHLIGHTS.map((h, i) => (
              <Reveal key={h.label} delay={i * 90}>
                <div className="glass group relative h-full overflow-hidden rounded-2xl p-6 transition duration-500 hover:glow-ring">
                  <div className="pointer-events-none absolute -top-16 -right-10 size-32 rounded-full bg-[radial-gradient(circle,oklch(0.68_0.17_250/25%),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <p className="font-display text-3xl font-bold text-gradient sm:text-4xl">
                    {h.value}
                  </p>
                  <p className="mt-2 font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
                    {h.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
