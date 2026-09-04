import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { toast } from "sonner";
import { PROFILE } from "./data";
import { Reveal, SectionHeading } from "./primitives";

export function Contact() {
  const [sending, setSending] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");

    setSending(true);
    // No backend yet: hand the message to the visitor's mail client.
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    toast.success("Opening your email app to send the message.");
    form.reset();
    setSending(false);
  };

  const inputCls =
    "w-full rounded-xl border border-glass-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 transition focus:border-accent/60 focus:outline-none";

  return (
    <section id="contact" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Let's Build Something Intelligent."
          subtitle="Have an idea, opportunity, or project in mind? Let's connect and explore what we can build together."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <form
              onSubmit={onSubmit}
              className="glass space-y-4 rounded-3xl p-6 sm:p-8"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-xs font-medium">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-xs font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    className={inputCls}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-xs font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about the idea or opportunity…"
                  className={`${inputCls} resize-y`}
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="group inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-brand)] px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
              >
                Send Message
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          </Reveal>

          <Reveal delay={120} className="space-y-4">
            <ul className="glass space-y-4 rounded-3xl p-6 sm:p-8">
              {[
                {
                  Icon: Mail,
                  label: PROFILE.email,
                  href: `mailto:${PROFILE.email}`,
                },
                {
                  Icon: Phone,
                  label: PROFILE.phone,
                  href: `tel:${PROFILE.phone}`,
                },
                { Icon: MapPin, label: PROFILE.location, href: null },
              ].map(({ Icon, label, href }) => (
                <li key={label} className="flex items-center gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-glass-border bg-surface text-accent">
                    <Icon className="size-4" />
                  </span>
                  {href ? (
                    <a
                      href={href}
                      className="text-sm break-all text-muted-foreground transition hover:text-accent"
                    >
                      {label}
                    </a>
                  ) : (
                    <span className="text-sm text-muted-foreground">{label}</span>
                  )}
                </li>
              ))}
            </ul>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { href: PROFILE.linkedin, Icon: Linkedin, label: "LinkedIn" },
                { href: PROFILE.github, Icon: Github, label: "GitHub" },
                { href: `mailto:${PROFILE.email}`, Icon: Mail, label: "Email" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
                  className="glass group flex items-center justify-between gap-2 rounded-2xl px-5 py-4 text-sm font-medium transition hover:glow-ring hover:text-accent"
                >
                  <span className="inline-flex items-center gap-2">
                    <Icon className="size-4" />
                    {label}
                  </span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </a>
              ))}
            </div>

            <a
              href={PROFILE.resume}
              download
              className="glass flex items-center justify-between gap-2 rounded-2xl px-5 py-4 text-sm font-semibold transition hover:glow-ring hover:text-accent"
            >
              Download Resume
              <Download className="size-4" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
