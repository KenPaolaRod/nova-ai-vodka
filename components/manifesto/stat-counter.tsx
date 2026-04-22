"use client";

import { useEffect, useRef, useState } from "react";
import { formatScramble } from "@/lib/animations";

export function StatCounter({ target, label }: { target: string; label: string }) {
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

  return (
    <div ref={ref} className="flex flex-col gap-2">
      <div
        className="font-display text-accent tabular-nums"
        style={{ fontSize: "72px", lineHeight: 1 }}
      >
        {value}
      </div>
      <div className="max-w-[220px] text-[16px] italic text-ink-dim" style={{ fontFamily: "var(--font-instrument)" }}>
        {label}
      </div>
    </div>
  );
}
