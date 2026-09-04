import { useEffect, useRef, useState } from "react";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { PROFILE } from "./data";
import { SafeImage } from "./primitives";

function NeuralVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setTilt({
        x: ((e.clientX - (r.left + r.width / 2)) / r.width) * 12,
        y: ((e.clientY - (r.top + r.height / 2)) / r.height) * -12,
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const nodes = [
    [50, 12],
    [18, 32],
    [82, 32],
    [10, 62],
    [50, 50],
    [90, 62],
    [28, 86],
    [72, 86],
  ];
  const edges: Array<[number, number]> = [
    [0, 1],
    [0, 2],
    [1, 4],
    [2, 4],
    [1, 3],
    [2, 5],
    [3, 6],
    [5, 7],
    [4, 6],
    [4, 7],
    [4, 3],
    [4, 5],
  ];

  return (
    <div
      ref={ref}
      className="relative mx-auto aspect-square w-full max-w-[26rem]"
      style={{
        transform: `perspective(900px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
        transition: "transform 400ms ease-out",
      }}
      aria-hidden
    >
      <div className="absolute inset-6 rounded-full bg-[radial-gradient(circle,oklch(0.68_0.17_250/30%),transparent_65%)] blur-2xl animate-pulse-glow" />
      <div className="absolute inset-4 rounded-full border border-glass-border animate-spin-slow" />
      <div className="absolute inset-12 rounded-full border border-accent/20" />
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full">
        <defs>
          <linearGradient id="edge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.68 0.17 250)" />
            <stop offset="100%" stopColor="oklch(0.85 0.13 195)" />
          </linearGradient>
        </defs>
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a]![0]}
            y1={nodes[a]![1]}
            x2={nodes[b]![0]}
            y2={nodes[b]![1]}
            stroke="url(#edge)"
            strokeWidth="0.35"
            opacity="0.55"
          />
        ))}
        {nodes.map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="2.6" fill="url(#edge)" opacity="0.25" />
            <circle cx={x} cy={y} r="1.2" fill="oklch(0.9 0.1 200)">
              <animate
                attributeName="opacity"
                values="0.35;1;0.35"
                dur={`${2.5 + i * 0.4}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}
      </svg>
    </div>
  );
}

function Particles() {
  const dots = Array.from({ length: 18 }, (_, i) => ({
    left: (i * 37) % 100,
    top: (i * 53) % 100,
    delay: (i % 7) * 0.8,
    size: (i % 3) + 1,
  }));
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {dots.map((d, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-accent/50 animate-float"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            animationDelay: `${d.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden pt-28 pb-20 sm:pt-32 md:pt-40 md:pb-28"
    >
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_72%)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 size-[42rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.68_0.17_250/18%),transparent_65%)]" />
      <Particles />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-[11px] tracking-widest uppercase">
            <span className="size-1.5 rounded-full bg-accent animate-pulse-glow" />
            Open to Opportunities
          </span>

          <h1 className="mt-6 font-display text-4xl leading-[1.05] font-bold sm:text-6xl xl:text-7xl">
            <span className="block">Tharak</span>
            <span className="block text-gradient">Gumpu</span>
          </h1>

          <p className="mt-4 font-mono text-xs tracking-[0.2em] text-accent uppercase sm:text-sm">
            {PROFILE.title}
          </p>

          <p className="mt-6 max-w-xl text-xl font-medium text-pretty sm:text-2xl">
            “{PROFILE.headline}”
          </p>
          <p className="mt-4 max-w-xl text-pretty text-muted-foreground">
            {PROFILE.bio}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-brand)] px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Explore My Projects
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition hover:text-accent"
            >
              Let&apos;s Connect
              <ArrowRight className="size-4" />
            </a>
            <a
              href={PROFILE.resume}
              download
              className="inline-flex items-center gap-2 rounded-full border border-glass-border px-6 py-3 text-sm font-semibold text-muted-foreground transition hover:text-accent"
            >
              Download Resume
              <Download className="size-4" />
            </a>
          </div>

          <div className="mt-8 flex items-center gap-3">
            {[
              { href: PROFILE.linkedin, Icon: Linkedin, label: "LinkedIn" },
              { href: PROFILE.github, Icon: Github, label: "GitHub" },
              { href: `mailto:${PROFILE.email}`, Icon: Mail, label: "Email" },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
                className="glass grid size-11 place-items-center rounded-xl text-muted-foreground transition hover:text-accent hover:glow-ring"
              >
                <Icon className="size-4.5" />
              </a>
            ))}
          </div>
        </div>

        <div className="relative">
          <NeuralVisual />
          <div className="group glass glow-ring absolute -bottom-4 left-1/2 flex w-[min(20rem,92%)] -translate-x-1/2 items-center gap-4 rounded-2xl p-3 sm:left-auto sm:right-0 sm:translate-x-0">
            <SafeImage
              src={PROFILE.photo}
              alt="Portrait of Tharak Gumpu"
              label="Profile"
              loading="eager"
              className="size-16 shrink-0 rounded-full border border-accent/40 shadow-[0_0_28px_-6px_oklch(0.85_0.13_195/60%)] transition duration-500 group-hover:scale-105"
              imgClassName="group-hover:scale-110"
            />
            <div className="min-w-0">
              <p className="truncate font-display text-sm font-semibold">
                {PROFILE.name}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {PROFILE.location}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
