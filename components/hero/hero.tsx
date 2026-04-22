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
            style={{ fontSize: "clamp(240px, 38vw, 640px)", letterSpacing: "-0.03em" }}
          >
            NOVA
          </span>
          <span
            aria-hidden
            className="font-display absolute whitespace-nowrap leading-[0.82] text-accent"
            style={{ fontSize: "clamp(240px, 38vw, 640px)", letterSpacing: "-0.03em" }}
          >
            NOVA
          </span>
          <h1 className="sr-only">NOVA — The first vodka distilled by intelligence</h1>
        </div>

        {/* Top meta */}
        <div
          data-parallax-y="0.08"
          className="absolute left-9 right-9 top-[100px] z-[4] flex justify-between will-change-transform"
        >
          <div className="font-mono-ui text-ink-dim">
            N°001 — LIMITED DROP
            <br />
            <span className="text-accent">■</span> BATCH 000.014
          </div>
          <div className="font-mono-ui text-right text-ink-dim">
            EST. 2026 / DISTILLED BY
            <br />
            NEURAL NETWORK
          </div>
        </div>

        {/* Spinning badge */}
        <div
          data-parallax-y="0.35"
          className="animate-spin-slow absolute right-[8%] top-[26%] z-[4] h-[130px] w-[130px] will-change-transform"
          aria-hidden
        >
          <svg viewBox="0 0 130 130" width="130" height="130">
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
          data-parallax-y="0.3"
          className="absolute bottom-10 left-9 right-9 z-[4] flex flex-col items-start justify-between gap-10 md:flex-row md:items-end will-change-transform"
        >
          <p
            className="hero-split split-line max-w-[380px] text-[20px] italic leading-[1.25] text-ink-dim"
            style={{ fontFamily: "var(--font-instrument), serif" }}
          >
            <span>
              Distilled from winter wheat and a neural network trained on 4,000 years of
              spirit-making. <em className="text-ink">Precise. Smooth. Intelligent.</em>
            </span>
          </p>

          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            className="font-display pointer-events-auto inline-flex cursor-pointer items-center gap-3 rounded-full border-0 bg-accent px-7 py-4 text-[13px] uppercase tracking-[0.12em] text-bg transition-[transform,background] duration-300 hover:bg-accent-glow"
          >
            <span className="animate-pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-bg" />
            Reserve a bottle
          </motion.button>

          <div className="font-mono-ui text-right text-ink-dim">
            SCROLL TO ENTER
            <br />
            <span className="text-accent">↓</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-[30px] left-1/2 z-[3] flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] tracking-[0.2em] text-ink-dim font-mono">
          <span style={{ fontFamily: "var(--font-mono)" }}>SCROLL</span>
          <span className="animate-drop-bar block h-10 w-px bg-gradient-to-b from-transparent to-ink-dim" />
        </div>
      </section>
    </>
  );
}
