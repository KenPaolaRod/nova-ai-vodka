"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/shared/container";
import { SectionLabel } from "@/components/shared/section-label";
import { StatCounter } from "./stat-counter";
import { MANIFESTO_LINES, MANIFESTO_STATS } from "@/data/manifesto";
import { registerGsap, ScrollTrigger } from "@/lib/gsap";

export function Manifesto() {
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const node = bodyRef.current;
    if (!node) return;

    const trigger = ScrollTrigger.create({
      trigger: node,
      start: "top 75%",
      once: true,
      onEnter: () => node.classList.add("is-visible"),
    });
    return () => trigger.kill();
  }, []);

  return (
    <section
      id="manifesto"
      aria-labelledby="manifesto-title"
      className="relative bg-transparent py-[200px]"
    >
      <Container>
        <div className="mb-20 flex items-end justify-between gap-14">
          <div>
            <SectionLabel>Manifesto — N°01</SectionLabel>
            <h2
              id="manifesto-title"
              className="font-display mt-5 text-[32px] leading-[0.9] tracking-[0.01em]"
            >
              For the new era of spirits
            </h2>
          </div>
          <div className="font-mono-ui max-w-[280px] text-ink-dim">
            A letter from the distillery /<br />
            <span className="text-accent">— The founders</span>
          </div>
        </div>

        <div
          ref={bodyRef}
          className="max-w-[1100px] leading-[1.05] tracking-[-0.02em]"
          style={{
            fontFamily: "var(--font-instrument), serif",
            fontSize: "clamp(34px, 4.4vw, 68px)",
          }}
        >
          {MANIFESTO_LINES.map((line, li) => (
            <span
              key={li}
              className="split-line block overflow-hidden"
              style={{ transitionDelay: `${li * 0.08}s` } as React.CSSProperties}
            >
              <span>
                {line.map((part, pi) =>
                  part.accent ? (
                    <em
                      key={pi}
                      className="text-accent"
                      style={{ fontStyle: "italic" }}
                    >
                      {part.text}
                    </em>
                  ) : (
                    <span key={pi}>{part.text}</span>
                  )
                )}
              </span>
            </span>
          ))}
        </div>

        <div
          data-manifesto-foot
          className="mt-20 grid grid-cols-1 gap-12 border-t border-line pt-10 md:grid-cols-3"
        >
          {MANIFESTO_STATS.map((stat) => (
            <StatCounter key={stat.label} target={stat.target} label={stat.label} />
          ))}
        </div>
      </Container>
    </section>
  );
}
