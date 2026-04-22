"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const RAD_TO_DEG = 180 / Math.PI;
const UNIT_VH = 22;
const UNIT_VW = 22;

function heroKey(t: number) {
  return {
    rx: -0.05 + t * 0.1,
    ry: -0.3 + t * 1.4,
    rz: -0.25 + t * 1.5,
    sc: 0.85 + t * 0.25,
    px: -0.2 + t * 0.1,
    py: 0.2 - t * 0.8,
  };
}

function manifestoKey(t: number) {
  return {
    rx: 0,
    ry: 1.1 - t * 1.1,
    rz: 1.3 + t * 0.27,
    sc: 1.0 - t * 0.55,
    px: 0 + t * 2.6,
    py: -0.8 + t * 2.0,
  };
}

export function BottleImage() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const cur = {
      rx: -0.05,
      ry: -0.3,
      rz: -0.25,
      sc: 0.85,
      px: -0.2,
      py: 0.2,
      op: 0,
    };

    let rafId = 0;

    const tick = () => {
      const vh = window.innerHeight;
      const scrollY = window.scrollY;

      const heroProgress = clamp01(scrollY / (vh * 1.5));

      let manifestoProgress = 0;
      let fadeOut = 0;
      const manifestoEl = document.getElementById("manifesto");
      if (manifestoEl) {
        const rect = manifestoEl.getBoundingClientRect();
        manifestoProgress = clamp01((vh - rect.top) / (vh - vh * 0.2));

        const foot = manifestoEl.querySelector<HTMLElement>("[data-manifesto-foot]");
        if (foot) {
          const fRect = foot.getBoundingClientRect();
          fadeOut = clamp01((vh * 1.2 - fRect.top) / (vh * 1.2 - vh * 0.55));
        }
      }

      const h = heroKey(heroProgress);
      const m = manifestoKey(manifestoProgress);
      const w = manifestoProgress;

      const target = {
        rx: h.rx * (1 - w) + m.rx * w,
        ry: h.ry * (1 - w) + m.ry * w,
        rz: h.rz * (1 - w) + m.rz * w,
        sc: h.sc * (1 - w) + m.sc * w,
        px: h.px * (1 - w) + m.px * w,
        py: h.py * (1 - w) + m.py * w,
        op: 1 - fadeOut,
      };

      const k = 0.12;
      cur.rx += (target.rx - cur.rx) * k;
      cur.ry += (target.ry - cur.ry) * k;
      cur.rz += (target.rz - cur.rz) * k;
      cur.sc += (target.sc - cur.sc) * k;
      cur.px += (target.px - cur.px) * k;
      cur.py += (target.py - cur.py) * k;
      cur.op += (target.op - cur.op) * k;

      el.style.transform = [
        `translate3d(${cur.px * UNIT_VW}vw, ${-cur.py * UNIT_VH}vh, 0)`,
        `scale(${cur.sc})`,
        `rotateX(${cur.rx * RAD_TO_DEG}deg)`,
        `rotateY(${cur.ry * RAD_TO_DEG}deg)`,
        `rotate(${cur.rz * RAD_TO_DEG}deg)`,
      ].join(" ");
      el.style.opacity = String(cur.op);

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
      style={{ perspective: "1400px" }}
    >
      <div
        ref={wrapperRef}
        className="relative aspect-[1000/620] w-[min(72vw,1100px)] will-change-transform"
        style={{
          filter: "drop-shadow(0 40px 60px rgba(0,0,0,0.55))",
          transformStyle: "preserve-3d",
          opacity: 0,
        }}
      >
        <Image
          src="/images/bottle.png"
          alt="NOVA bottle — neural-distilled premium vodka"
          fill
          priority
          sizes="(max-width: 900px) 92vw, 1100px"
          className="object-contain"
        />
      </div>
    </div>
  );
}
