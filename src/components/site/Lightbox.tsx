import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";
import { SafeImage } from "./primitives";
import { cn } from "@/lib/utils";

export type LightboxItem = { src: string; alt: string; caption?: string };

export function Lightbox({
  items,
  index,
  onIndexChange,
  onClose,
  contain = true,
}: {
  items: LightboxItem[];
  index: number;
  onIndexChange: (i: number) => void;
  onClose: () => void;
  contain?: boolean;
}) {
  const [zoomed, setZoomed] = useState(false);
  const touchX = useRef<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const go = useCallback(
    (dir: 1 | -1) => {
      setZoomed(false);
      onIndexChange((index + dir + items.length) % items.length);
    },
    [index, items.length, onIndexChange],
  );

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [go, onClose]);

  const item = items[index];
  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      className="fixed inset-0 z-100 flex flex-col bg-background/95 backdrop-blur-xl"
      onClick={onClose}
    >
      <div className="flex items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <p className="truncate font-mono text-xs tracking-widest text-muted-foreground uppercase">
          {item.caption ?? item.alt} · {index + 1}/{items.length}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={zoomed ? "Zoom out" : "Zoom in"}
            onClick={(e) => {
              e.stopPropagation();
              setZoomed((z) => !z);
            }}
            className="glass grid size-10 place-items-center rounded-full text-foreground transition hover:text-accent"
          >
            {zoomed ? (
              <ZoomOut className="size-4" />
            ) : (
              <ZoomIn className="size-4" />
            )}
          </button>
          <button
            ref={closeRef}
            type="button"
            aria-label="Close viewer"
            onClick={onClose}
            className="glass grid size-10 place-items-center rounded-full text-foreground transition hover:text-accent"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>

      <div
        className="relative flex flex-1 items-center justify-center overflow-auto px-3 pb-6 sm:px-14"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => {
          touchX.current = e.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(e) => {
          const start = touchX.current;
          const end = e.changedTouches[0]?.clientX ?? null;
          if (start != null && end != null && Math.abs(end - start) > 50)
            go(end < start ? 1 : -1);
          touchX.current = null;
        }}
      >
        {items.length > 1 && (
          <button
            type="button"
            aria-label="Previous image"
            onClick={() => go(-1)}
            className="glass absolute left-1 z-10 grid size-11 place-items-center rounded-full transition hover:text-accent sm:left-3"
          >
            <ChevronLeft className="size-5" />
          </button>
        )}

        <SafeImage
          key={item.src}
          src={item.src}
          alt={item.alt}
          label="Add this image to see it here"
          contain={contain}
          loading="eager"
          className={cn(
            "glass glow-ring h-full max-h-[75vh] w-full max-w-5xl rounded-2xl transition-transform duration-500",
            zoomed && "scale-[1.6] cursor-zoom-out",
          )}
          imgClassName={zoomed ? "cursor-zoom-out" : "cursor-zoom-in"}
        />

        {items.length > 1 && (
          <button
            type="button"
            aria-label="Next image"
            onClick={() => go(1)}
            className="glass absolute right-1 z-10 grid size-11 place-items-center rounded-full transition hover:text-accent sm:right-3"
          >
            <ChevronRight className="size-5" />
          </button>
        )}
      </div>

      {items.length > 1 && (
        <div
          className="flex justify-center gap-2 pb-6"
          onClick={(e) => e.stopPropagation()}
        >
          {items.map((it, i) => (
            <button
              key={it.src}
              type="button"
              aria-label={`Go to image ${i + 1}`}
              onClick={() => {
                setZoomed(false);
                onIndexChange(i);
              }}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === index ? "w-8 bg-accent" : "w-3 bg-border",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
