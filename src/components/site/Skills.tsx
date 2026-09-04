import {
  BarChart3,
  Bot,
  Code2,
  Globe,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { SKILL_GROUPS } from "./data";
import { Reveal, SectionHeading } from "./primitives";

const ICONS: Record<string, LucideIcon> = {
  Programming: Code2,
  "Web Development": Globe,
  "Cyber Security": ShieldCheck,
  "AI Tools": Bot,
  "Data & Visualization": BarChart3,
};

export function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_50%_50%,black,transparent_70%)]" />
      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Skills"
          title="Technology & Skills Hub"
          subtitle="The tools and languages I work with while exploring AI and building projects."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SKILL_GROUPS.map((group, i) => {
            const Icon = ICONS[group.category] ?? Code2;
            return (
              <Reveal key={group.category} delay={i * 80}>
                <article className="glass group relative h-full overflow-hidden rounded-2xl p-6 transition duration-500 hover:-translate-y-1 hover:glow-ring">
                  <div className="pointer-events-none absolute inset-x-0 -top-24 h-40 bg-[radial-gradient(circle,oklch(0.85_0.13_195/18%),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative flex items-center gap-3">
                    <span className="grid size-11 place-items-center rounded-xl border border-glass-border bg-surface-2 text-accent transition-colors group-hover:text-foreground">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-base font-semibold">
                        {group.category}
                      </h3>
                      <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                        {group.items.length} skill
                        {group.items.length > 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                  <ul className="relative mt-5 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-glass-border bg-surface px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
