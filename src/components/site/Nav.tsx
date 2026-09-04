import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "./data";
import { cn } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("home");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const h = document.body.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    NAV_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "transition-all duration-500",
          scrolled
            ? "glass border-b border-glass-border shadow-soft"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <nav
          aria-label="Main"
          className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8"
        >
          <a
            href="#home"
            className="group flex items-center gap-2"
            aria-label="Tharak Gumpu — home"
          >
            <span className="glass glow-ring grid size-10 place-items-center rounded-xl font-display text-sm font-bold tracking-widest text-gradient">
              TG
            </span>
            <span className="hidden font-display text-sm font-semibold tracking-[0.2em] uppercase sm:block">
              Tharak
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  aria-current={active === l.id ? "true" : undefined}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm transition-colors",
                    active === l.id
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {l.label}
                  <span
                    className={cn(
                      "absolute inset-x-4 -bottom-0.5 h-px bg-accent transition-transform duration-300",
                      active === l.id ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden rounded-full border border-glass-border bg-[image:var(--gradient-brand)] px-5 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 sm:inline-block"
            >
              Hire Me
            </a>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="glass grid size-10 place-items-center rounded-xl lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>

        <div
          className="h-px origin-left bg-[image:var(--gradient-brand)] transition-transform duration-150"
          style={{ transform: `scaleX(${progress / 100})` }}
          aria-hidden
        />
      </div>

      <div
        className={cn(
          "glass overflow-hidden border-b border-glass-border transition-[max-height,opacity] duration-400 lg:hidden",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <ul className="mx-auto flex w-full max-w-7xl flex-col px-5 py-3 sm:px-8">
          {NAV_LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                className={cn(
                  "block border-b border-border/50 py-3 text-sm transition-colors last:border-0",
                  active === l.id ? "text-accent" : "text-muted-foreground",
                )}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
