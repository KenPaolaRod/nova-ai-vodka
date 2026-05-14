"use client";

import { useEffect, useRef, useState } from "react";
import { formatScramble } from "@/lib/animations";

export function StatCounter({
  target,
  label,
  eyebrow,
  featured = false,
}: {
  target: string;
  label: string;
  eyebrow?: string;
  featured?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(() => formatScramble(target, 0));

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let rafId = 0;
    let startedAt = 0;
    const DURATION = 1600;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          startedAt = performance.now();
          const tick = (t: number) => {
            const elapsed = t - startedAt;
            const p = Math.min(1, elapsed / DURATION);
            // ease-out-cubic
            const eased = 1 - (1 - p) ** 3;
            setValue(formatScramble(target, eased));
            if (p < 1) rafId = requestAnimationFrame(tick);
          };
          rafId = requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(node);

    return () => {
      cancelAnimationFrame(rafId);
      io.disconnect();
    };
  }, [target]);

  const numberSize = featured
    ? "clamp(72px, 14vw, 140px)"
    : "clamp(40px, 6vw, 64px)";

  return (
    <div ref={ref} className="flex flex-col gap-3">
      {eyebrow ? (
        <div className="font-mono-ui text-[11px] tracking-[0.14em] text-ink-dim">
          {eyebrow}
        </div>
      ) : null}
      <div
        className="font-display text-accent tabular-nums"
        style={{ fontSize: numberSize, lineHeight: 0.95 }}
      >
        {value}
      </div>
      <div
        className="max-w-[320px] text-[15px] italic leading-[1.35] text-ink-dim md:text-[16px]"
        style={{ fontFamily: "var(--font-instrument)" }}
      >
        {label}
      </div>
    </div>
  );
}
