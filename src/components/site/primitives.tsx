import { useEffect, useRef, useState, type ReactNode } from "react";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/** Fade-up on scroll. Cheap IntersectionObserver, no animation library. */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;

    const check = () => {
      const r = el.getBoundingClientRect();
      // Visible once any part has entered the viewport, or once scrolled past.
      if (r.top < window.innerHeight - 40 && r.bottom > 0) {
        setVisible(true);
        cleanup();
      } else if (r.bottom <= 0) {
        setVisible(true);
        cleanup();
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(check);
    };

    const cleanup = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    check();

    return () => {
      cancelAnimationFrame(frame);
      cleanup();
    };
  }, []);

  return (
    <Tag
      ref={ref as never}
      data-visible={visible}
      className={cn("reveal", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/**
 * Image that never breaks the layout: if the file at `src` is missing,
 * an elegant branded placeholder is rendered instead.
 */
export function SafeImage({
  src,
  alt,
  label,
  className,
  imgClassName,
  contain = false,
  loading = "lazy",
}: {
  src: string;
  alt: string;
  label?: string;
  className?: string;
  imgClassName?: string;
  contain?: boolean;
  loading?: "lazy" | "eager";
}) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // The image may already have failed before hydration attached onError.
  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, [src]);

  return (
    <div className={cn("relative overflow-hidden bg-surface-2", className)}>
      {failed ? (
        <div className="bg-grid absolute inset-0 flex flex-col items-center justify-center gap-2 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,oklch(0.68_0.17_250/22%),transparent_65%)]" />
          <ImageIcon className="relative size-6 text-accent/80" aria-hidden />
          {label !== "" && (
            <p className="relative hidden px-4 font-mono text-[11px] tracking-widest text-muted-foreground uppercase @[8rem]:block">
              {label ?? "Image placeholder"}
            </p>
          )}
        </div>
      ) : (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          onError={() => setFailed(true)}
          className={cn(
            "size-full transition-transform duration-700",
            contain ? "object-contain" : "object-cover",
            imgClassName,
          )}
        />
      )}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal
      className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}
    >
      <p className="font-mono text-xs tracking-[0.28em] text-accent uppercase">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-semibold text-balance sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-base text-pretty text-muted-foreground">
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  );
}
