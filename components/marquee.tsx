import { MARQUEE_ITEMS } from "@/data/nav";
import { Fragment } from "react";

export function Marquee() {
  // Double the sequence so the -50% translate loops seamlessly.
  const sequence = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div
      className="overflow-hidden border-y border-line bg-bg py-6"
      aria-hidden
      role="presentation"
    >
      <div className="animate-marquee font-display flex gap-16 whitespace-nowrap text-[52px] uppercase tracking-[0.02em] text-ink">
        {sequence.map((item, i) => (
          <Fragment key={`${item}-${i}`}>
            <span className={i % 2 === 1 ? "text-transparent [-webkit-text-stroke:1px_var(--color-ink)]" : undefined}>
              {item}
            </span>
            <span className="inline-flex items-center text-accent">◉</span>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
