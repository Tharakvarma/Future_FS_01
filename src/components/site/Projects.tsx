import { useState } from "react";
import { ArrowUpRight, Github, Images, X } from "lucide-react";
import { PROJECTS, type Project } from "./data";
import { Reveal, SafeImage, SectionHeading } from "./primitives";
import { Lightbox } from "./Lightbox";

const isPlaceholder = (v: string) => v.trim().startsWith("[");

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [viewer, setViewer] = useState<number | null>(null);
  const images = [
    { src: project.preview, alt: `${project.title} preview`, caption: "Preview" },
    ...project.screenshots.map((s, i) => ({
      src: s,
      alt: `${project.title} screenshot ${i + 1}`,
      caption: `Screenshot ${i + 1}`,
    })),
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      className="fixed inset-0 z-90 overflow-y-auto bg-background/85 p-4 backdrop-blur-lg sm:p-8"
      onClick={onClose}
    >
      <div
        className="glass glow-ring mx-auto max-w-4xl rounded-3xl p-5 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] tracking-widest text-accent uppercase">
              Project {project.index} · {project.period}
            </p>
            <h3 className="mt-2 font-display text-2xl font-semibold text-balance sm:text-3xl">
              {project.title}
            </h3>
          </div>
          <button
            type="button"
            aria-label="Close project details"
            onClick={onClose}
            className="glass grid size-10 shrink-0 place-items-center rounded-full transition hover:text-accent"
          >
            <X className="size-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => setViewer(0)}
          className="group mt-6 block w-full overflow-hidden rounded-2xl border border-glass-border"
          aria-label="Open preview image full screen"
        >
          <SafeImage
            src={project.preview}
            alt={`${project.title} preview`}
            label="preview.jpg"
            className="aspect-video w-full"
            imgClassName="group-hover:scale-105"
          />
        </button>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <p className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
              Description
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {project.description}
            </p>
          </div>
          <div>
            <p className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
              Technologies
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {project.technologies}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <p className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
            Screenshots
          </p>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {project.screenshots.map((s, i) => (
              <button
                key={s}
                type="button"
                onClick={() => setViewer(i + 1)}
                className="group overflow-hidden rounded-xl border border-glass-border"
                aria-label={`Open screenshot ${i + 1} full screen`}
              >
                <SafeImage
                  src={s}
                  alt={`${project.title} screenshot ${i + 1}`}
                  label={`screenshot${i + 1}.jpg`}
                  className="aspect-video w-full"
                  imgClassName="group-hover:scale-110"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          {isPlaceholder(project.github) ? (
            <span className="rounded-full border border-dashed border-border px-5 py-2.5 text-sm text-muted-foreground">
              {project.github}
            </span>
          ) : (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer noopener"
              className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition hover:text-accent"
            >
              <Github className="size-4" /> GitHub
            </a>
          )}
          {isPlaceholder(project.demo) ? (
            <span className="rounded-full border border-dashed border-border px-5 py-2.5 text-sm text-muted-foreground">
              {project.demo}
            </span>
          ) : (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-brand)] px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Live Demo <ArrowUpRight className="size-4" />
            </a>
          )}
        </div>
      </div>

      {viewer !== null && (
        <Lightbox
          items={images}
          index={viewer}
          onIndexChange={setViewer}
          onClose={() => setViewer(null)}
          contain={false}
        />
      )}
    </div>
  );
}

export function Projects() {
  const [open, setOpen] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Projects"
          title="Things I've Built"
          subtitle="Exploring technology by turning ideas into practical projects."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <Reveal as="article" key={p.slug} delay={i * 100}>
              <button
                type="button"
                onClick={() => setOpen(p)}
                className="glass group h-full w-full overflow-hidden rounded-3xl text-left transition duration-500 hover:-translate-y-1 hover:glow-ring"
              >
                <div className="relative">
                  <SafeImage
                    src={p.preview}
                    alt={`${p.title} preview`}
                    label="preview.jpg"
                    className="aspect-[16/10] w-full"
                    imgClassName="group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 rounded-full bg-background/70 px-3 py-1 font-mono text-[11px] tracking-widest text-accent uppercase backdrop-blur">
                    {p.index}
                  </span>
                  <span className="absolute right-4 bottom-4 inline-flex items-center gap-1.5 rounded-full bg-background/70 px-3 py-1 font-mono text-[11px] text-muted-foreground backdrop-blur">
                    <Images className="size-3.5" />
                    {p.screenshots.length + 1}
                  </span>
                </div>
                <div className="p-6">
                  <p className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
                    {p.period}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-semibold text-balance">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {p.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent">
                    View project
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {open && <ProjectModal project={open} onClose={() => setOpen(null)} />}
    </section>
  );
}
