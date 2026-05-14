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
      className="relative bg-transparent py-24 md:py-[200px]"
    >
      <Container>
        <div className="mb-10 flex flex-col items-start justify-between gap-8 md:mb-20 md:flex-row md:items-end md:gap-14">
          <div>
            <SectionLabel>Manifesto — N°01</SectionLabel>
            <h2
              id="manifesto-title"
              className="font-display mt-5 text-[28px] leading-[0.9] tracking-[0.01em] md:text-[32px]"
            >
              For the new era of spirits
            </h2>
          </div>
          <div className="font-mono-ui max-w-[280px] text-ink-dim">
            A letter from the distillery /<br />
            <span className="text-accent">— The founders</span>
          </div>
        </div>

        {/* Mobile-only bottle showcase: dedicated empty area where the
            fixed bottle lands so the body text below has no overlap. */}
        <div
          data-manifesto-bottle-anchor
          aria-hidden
          className="mb-10 h-[45vh] min-h-[300px] md:hidden"
        />

        <div
          ref={bodyRef}
          className="max-w-[1100px] leading-[1.05] tracking-[-0.02em]"
          style={{
            fontFamily: "var(--font-instrument), serif",
            fontSize: "clamp(28px, 4.4vw, 68px)",
          }}
        >
          {MANIFESTO_LINES.map((line, li) => (
            <span
              key={li}
              data-manifesto-first-line={li === 0 ? "" : undefined}
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

        <div data-manifesto-foot className="mt-16 border-t border-line pt-6 md:mt-24 md:pt-8">
          <div className="mb-10 flex items-center justify-between md:mb-14">
            <SectionLabel>The Numbers</SectionLabel>
            <div className="font-mono-ui text-[11px] tracking-[0.14em] text-ink-dim">
              DATA · 03 /
            </div>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr] md:items-center md:gap-16">
            {(() => {
              const featured = MANIFESTO_STATS.find((s) => "featured" in s && s.featured);
              const rest = MANIFESTO_STATS.filter((s) => s !== featured);
              return (
                <>
                  {featured ? (
                    <div className="md:self-center">
                      <StatCounter
                        target={featured.target}
                        label={featured.label}
                        eyebrow={featured.eyebrow}
                        featured
                      />
                    </div>
                  ) : null}
                  <div className="flex flex-col gap-10 md:gap-12 md:border-l md:border-line md:pl-10">
                    {rest.map((stat, i) => (
                      <div
                        key={stat.label}
                        className={i > 0 ? "border-t border-line pt-10 md:pt-12" : ""}
                      >
                        <StatCounter
                          target={stat.target}
                          label={stat.label}
                          eyebrow={stat.eyebrow}
                        />
                      </div>
                    ))}
                  </div>
                </>
              );
            })()}
          </div>

          <div className="mt-12 flex items-center justify-between border-t border-line pt-5 md:mt-16">
            <div className="font-mono-ui text-[10px] tracking-[0.18em] text-ink-dim md:text-[11px]">
              GEOMETRY BY NEURAL NET · BUILT IN WARSAW
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
