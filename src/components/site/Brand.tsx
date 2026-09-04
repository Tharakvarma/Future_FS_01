import { Reveal } from "./primitives";

export function Brand() {
  return (
    <section className="relative isolate overflow-hidden py-28 md:py-36">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]" />
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <svg
          viewBox="0 0 800 300"
          preserveAspectRatio="xMidYMid slice"
          className="size-full opacity-40"
        >
          <defs>
            <linearGradient id="brand-edge" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="oklch(0.68 0.17 250)" />
              <stop offset="100%" stopColor="oklch(0.85 0.13 195)" />
            </linearGradient>
          </defs>
          {Array.from({ length: 26 }, (_, i) => {
            const x1 = (i * 61) % 800;
            const y1 = (i * 97) % 300;
            const x2 = (i * 131 + 90) % 800;
            const y2 = (i * 53 + 40) % 300;
            return (
              <g key={i}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="url(#brand-edge)"
                  strokeWidth="0.6"
                  opacity="0.35"
                />
                <circle cx={x1} cy={y1} r="1.8" fill="oklch(0.85 0.13 195)">
                  <animate
                    attributeName="opacity"
                    values="0.2;0.9;0.2"
                    dur={`${3 + (i % 5)}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            );
          })}
        </svg>
      </div>

      <Reveal className="relative mx-auto w-full max-w-4xl px-5 text-center sm:px-8">
        <h2 className="font-display text-3xl leading-[1.08] font-bold text-balance sm:text-5xl md:text-6xl">
          Learn. Build. <span className="text-gradient">Experiment.</span> Evolve.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-muted-foreground">
          Exploring Artificial Intelligence and emerging technologies while
          building practical solutions and continuously developing my technical
          skills.
        </p>
      </Reveal>
    </section>
  );
}
