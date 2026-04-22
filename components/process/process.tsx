"use client";

import { useEffect, useRef, useState } from "react";
import { SectionLabel } from "@/components/shared/section-label";
import { PROCESS_STEPS } from "@/data/process-steps";
import { FormattedText } from "./formatted-text";
import { ProcessVisual, VISUAL_BACKGROUNDS } from "./process-visuals";
import { registerGsap, gsap, ScrollTrigger } from "@/lib/gsap";

export function Process() {
  const pinRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    registerGsap();
    const root = pinRef.current;
    if (!root) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 900px)", () => {
      const stage = root.querySelector<HTMLElement>("[data-stage]");
      if (!stage) return;

      const trigger = ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: () => `+=${root.offsetHeight - window.innerHeight}`,
        scrub: true,
        onUpdate: ({ progress }) => {
          const step = Math.min(
            PROCESS_STEPS.length - 1,
            Math.floor(progress * PROCESS_STEPS.length)
          );
          setActiveIndex(step);
        },
      });
      return () => trigger.kill();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className="relative bg-bg"
    >
      <div ref={pinRef} className="relative md:h-[500vh]">
        <div
          data-stage
          className="box-border flex min-h-[100vh] flex-col gap-10 overflow-hidden px-6 pb-20 pt-[120px] md:sticky md:top-0 md:grid md:h-screen md:grid-cols-[minmax(360px,38%)_1fr] md:px-12"
        >
          {/* LEFT: copy that cross-fades between steps */}
          <aside className="relative z-[2] flex min-w-0 flex-col justify-between">
            <div>
              <SectionLabel>The Process</SectionLabel>
              <h2
                id="process-title"
                className="font-display mt-6 mb-10 leading-[0.95] tracking-[-0.02em]"
                style={{ fontSize: "clamp(44px, 4.5vw, 76px)" }}
              >
                How a machine
                <br />
                learns to{" "}
                <em
                  className="text-accent"
                  style={{
                    fontFamily: "var(--font-instrument)",
                    fontStyle: "italic",
                    textTransform: "none",
                  }}
                >
                  taste
                </em>
                .
              </h2>

              <div className="relative min-h-[260px]">
                {PROCESS_STEPS.map((step, i) => (
                  <article
                    key={step.num}
                    className="inset-0 transition-[opacity,transform] duration-500 md:absolute"
                    style={{
                      opacity: activeIndex === i ? 1 : 0,
                      transform:
                        activeIndex === i ? "translateY(0)" : "translateY(24px)",
                      pointerEvents: activeIndex === i ? "auto" : "none",
                      transitionTimingFunction: "cubic-bezier(0.2, 0.8, 0.2, 1)",
                    }}
                    aria-hidden={activeIndex !== i}
                  >
                    <div
                      className="font-display text-accent mb-4 leading-[0.85] tracking-[-0.04em]"
                      style={{ fontSize: "clamp(88px, 9vw, 148px)" }}
                    >
                      {step.num}
                    </div>
                    <div className="font-mono-ui mb-3.5 text-ink-dim">{step.label}</div>
                    <h3
                      className="font-display mb-4 max-w-[480px] leading-none tracking-[-0.01em]"
                      style={{ fontSize: "clamp(28px, 2.6vw, 44px)" }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="max-w-[460px] leading-[1.45] text-[rgba(239,230,210,0.78)]"
                      style={{
                        fontFamily: "var(--font-instrument)",
                        fontSize: "clamp(17px, 1.2vw, 21px)",
                      }}
                    >
                      <FormattedText text={step.description} />
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-7 flex items-center gap-5">
              <span
                className="min-w-[78px] text-[13px] tracking-[2px] text-[rgba(239,230,210,0.7)]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {PROCESS_STEPS[activeIndex].num}
                <span className="mx-1 text-[rgba(239,230,210,0.3)]">/</span>
                {String(PROCESS_STEPS.length).padStart(2, "0")}
              </span>
              <div className="relative h-px flex-1 overflow-hidden bg-line">
                <div
                  className="absolute inset-y-0 left-0 bg-accent transition-[width] duration-500"
                  style={{
                    width: `${((activeIndex + 1) / PROCESS_STEPS.length) * 100}%`,
                    transitionTimingFunction: "cubic-bezier(0.2, 0.8, 0.2, 1)",
                  }}
                />
              </div>
            </div>
          </aside>

          {/* RIGHT: card reel */}
          <div className="relative flex h-full w-full items-center justify-center overflow-visible">
            {PROCESS_STEPS.map((step, i) => {
              const offset = i - activeIndex;
              const isActive = offset === 0;
              return (
                <article
                  key={step.num}
                  className="flex flex-col gap-3.5 transition-all duration-700 md:absolute md:left-1/2 md:top-1/2"
                  style={{
                    width: "min(48vw, 560px)",
                    height: "min(72vh, 720px)",
                    transform: `translate(-50%, -50%) translateX(${offset * 40}px) scale(${isActive ? 1 : 0.94})`,
                    opacity: isActive ? 1 : Math.abs(offset) > 1 ? 0 : 0.25,
                    zIndex: isActive ? 10 : 1,
                    willChange: "transform, opacity",
                    transitionTimingFunction: "cubic-bezier(0.2, 0.8, 0.2, 1)",
                  }}
                  aria-hidden={!isActive}
                >
                  <div
                    className="relative flex flex-1 items-center justify-center overflow-hidden rounded-sm border border-dashed border-[rgba(239,230,210,0.18)]"
                    style={{ background: VISUAL_BACKGROUNDS[step.visual] }}
                  >
                    <span
                      className="mix-blend-difference absolute left-5 top-4 text-[11px] tracking-[3px] text-[rgba(239,230,210,0.7)] z-[2]"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {step.tag}
                    </span>
                    <ProcessVisual kind={step.visual} />
                  </div>
                  <div
                    className="text-center text-[11px] tracking-[2.5px] text-ink-dim opacity-80"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {step.caption}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
