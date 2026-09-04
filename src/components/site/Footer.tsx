import { Github, Linkedin, Mail } from "lucide-react";
import { PROFILE } from "./data";

export function Footer() {
  return (
    <footer className="relative border-t border-glass-border py-12">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-6 px-5 text-center sm:px-8">
        <div>
          <p className="font-display text-lg font-bold tracking-[0.18em] uppercase">
            Tharak Gumpu
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            “Building. Learning. Exploring AI.”
          </p>
        </div>

        <div className="flex items-center gap-3">
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
              className="glass grid size-10 place-items-center rounded-xl text-muted-foreground transition hover:text-accent"
            >
              <Icon className="size-4" />
            </a>
          ))}
        </div>

        <p className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
          © 2026 Tharak Gumpu. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
