"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { registerGsap, gsap, ScrollTrigger } from "@/lib/gsap";
import { BottleImage } from "./bottle-image";

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsap();
    if (!ref.current) return;

    const root = ref.current;
    const ctx = gsap.context(() => {
      // Parallax layers based on data-attrs
      gsap.utils.toArray<HTMLElement>("[data-parallax-y]").forEach((el) => {
        const amount = Number.parseFloat(el.dataset.parallaxY ?? "0");
        gsap.to(el, {
          yPercent: amount * 100,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // Hero type scales slightly as user scrolls
      gsap.to("[data-parallax-scale]", {
        scale: 0.92,
        opacity: 0.0,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Fade out remaining hero ornaments (top meta, badge, CTA) so they
      // don't bleed through transparent sections below.
      gsap.to("[data-hero-fade]", {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Line reveal on mount
      gsap.to(".hero-split.split-line", {
        onStart: () => {
          document
            .querySelectorAll(".hero-split.split-line")
            .forEach((el) => el.classList.add("is-in"));
        },
        delay: 0.15,
        duration: 0.01,
      });
    }, root);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <>
      {/* Fixed bottle layer — visible through transparent sections below */}
      <div className="pointer-events-none fixed inset-0 z-[50] h-screen w-full">
        <BottleImage />
      </div>

      <section
        ref={ref}
        id="hero"
        aria-label="Hero"
        className="pointer-events-none fixed inset-0 top-0 z-[1] h-screen overflow-hidden"
      >
        {/* Giant parallax NOVA type behind bottle */}
        <div
          data-parallax-y="-0.25"
          data-parallax-scale="0.4"
          className="absolute inset-0 z-[1] flex items-center justify-center will-change-transform"
        >
          <span
            aria-hidden
            className="font-display absolute whitespace-nowrap leading-[0.82] text-transparent [-webkit-text-stroke:2px_rgba(192,68,30,0.28)]"
            style={{ fontSize: "clamp(140px, 38vw, 640px)", letterSpacing: "-0.03em" }}
          >
            NOVA
          </span>
          <span
            aria-hidden
            className="font-display absolute whitespace-nowrap leading-[0.82] text-accent"
            style={{ fontSize: "clamp(140px, 38vw, 640px)", letterSpacing: "-0.03em" }}
          >
            NOVA
          </span>
          <h1 className="sr-only">NOVA — The first vodka distilled by intelligence</h1>
        </div>

        {/* Top meta */}
        <div
          data-parallax-y="0.08"
          data-hero-fade
          className="absolute left-5 right-5 top-[80px] z-[4] hidden justify-between gap-4 will-change-transform md:left-9 md:right-9 md:top-[100px] md:flex"
        >
          <div className="font-mono-ui text-[10px] text-ink-dim md:text-[11px]">
            N°001 — LIMITED DROP
            <br />
            <span className="text-accent">■</span> BATCH 000.014
          </div>
          <div className="font-mono-ui text-right text-[10px] text-ink-dim md:text-[11px]">
            EST. 2026 / DISTILLED BY
            <br />
            NEURAL NETWORK
          </div>
        </div>

        {/* Spinning badge */}
        <div
          data-parallax-y="0.35"
          data-hero-fade
          className="animate-spin-slow absolute right-[4%] top-[16%] z-[4] h-[78px] w-[78px] will-change-transform sm:right-[6%] sm:top-[20%] sm:h-[100px] sm:w-[100px] md:right-[8%] md:top-[26%] md:h-[130px] md:w-[130px]"
          aria-hidden
        >
          <svg viewBox="0 0 130 130" width="100%" height="100%">
            <defs>
              <path
                id="badge-circle"
                d="M 65, 65 m -50, 0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0"
              />
            </defs>
            <text
              fontFamily="var(--font-display), Impact, sans-serif"
              fontSize="10"
              fill="#EFE6D2"
              letterSpacing="3"
            >
              <textPath href="#badge-circle">
                NEURAL DISTILLED · LIMITED BATCH · NEURAL DISTILLED · LIMITED BATCH ·{" "}
              </textPath>
            </text>
            <circle cx="65" cy="65" r="28" fill="#C0441E" />
            <text
              x="65"
              y="62"
              textAnchor="middle"
              fill="#EFE6D2"
              fontFamily="var(--font-display), Impact, sans-serif"
              fontSize="11"
              letterSpacing="1"
            >
              NEW
            </text>
            <text
              x="65"
              y="75"
              textAnchor="middle"
              fill="#EFE6D2"
              fontFamily="var(--font-instrument), serif"
              fontStyle="italic"
              fontSize="8"
            >
              batch 14
            </text>
          </svg>
        </div>

        {/* Bottom meta */}
        <div
          data-parallax-scale="0.4"
          className="absolute bottom-28 left-5 right-5 z-[4] flex flex-col items-start justify-between gap-10 md:left-9 md:right-9 lg:bottom-10 lg:flex-row lg:items-end"
        >
          <p
            className="hero-split split-line max-w-[380px] text-[16px] italic leading-[1.3] text-ink-dim md:text-[20px] md:leading-[1.25]"
            style={{ fontFamily: "var(--font-instrument), serif" }}
          >
            <span>
              Distilled from winter wheat and a neural network trained on 4,000 years of
              spirit-making. <em className="text-ink">Precise. Smooth. Intelligent.</em>
            </span>
          </p>
        </div>

        {/* Centered CTA */}
        <div
          data-hero-fade
          className="pointer-events-none absolute bottom-8 left-1/2 z-[5] -translate-x-1/2 md:bottom-10"
        >
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            className="font-display pointer-events-auto inline-flex cursor-pointer items-center gap-3 whitespace-nowrap rounded-full border-0 bg-accent px-6 py-3.5 text-[12px] uppercase tracking-[0.12em] text-bg transition-[transform,background] duration-300 hover:bg-accent-glow md:px-7 md:py-4 md:text-[13px]"
          >
            <span className="animate-pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-bg" />
            Reserve a bottle
          </motion.button>
        </div>
      </section>
    </>
  );
}
