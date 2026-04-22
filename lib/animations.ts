"use client";

import { ScrollTrigger, registerGsap } from "./gsap";

type RevealOptions = {
  selector?: string;
  start?: string;
  stagger?: number;
};

/**
 * Observe elements matching `selector` within `root` and add `is-visible`
 * when they enter the viewport. Returns a cleanup fn.
 */
export function observeReveal(
  root: Element | Document = document,
  { selector = ".reveal", start = "top 85%" }: RevealOptions = {}
) {
  registerGsap();
  const nodes = Array.from(root.querySelectorAll<HTMLElement>(selector));
  const triggers = nodes.map((el) =>
    ScrollTrigger.create({
      trigger: el,
      start,
      once: true,
      onEnter: () => el.classList.add("is-visible"),
    })
  );
  return () => triggers.forEach((t) => t.kill());
}

/**
 * Format numbers the way the reference template presents stats
 * (supports comma-separated integers, % suffix, and dotted batch numbers).
 */
export function formatScramble(target: string, progress: number): string {
  // Extract trailing suffix (e.g. '%').
  const suffixMatch = target.match(/[^0-9.,]+$/);
  const suffix = suffixMatch ? suffixMatch[0] : "";
  const numericPart = suffix ? target.slice(0, -suffix.length) : target;

  // Preserve separators (dots, commas).
  const hasComma = numericPart.includes(",");
  const hasDot = numericPart.includes(".");
  const raw = numericPart.replace(/[,]/g, "");
  const asNumber = Number.parseFloat(raw);
  if (Number.isNaN(asNumber)) return target;

  const current = asNumber * progress;

  if (hasDot && !hasComma) {
    // Batch-style "000.014" — keep the dot, preserve left-pad width.
    const [left, right] = numericPart.split(".");
    const totalLen = left.length + right.length;
    const padded = Math.floor(current * 10 ** right.length)
      .toString()
      .padStart(totalLen, "0");
    return `${padded.slice(0, left.length)}.${padded.slice(left.length)}${suffix}`;
  }

  if (hasComma) {
    return `${Math.floor(current).toLocaleString("en-US")}${suffix}`;
  }

  // Percent / single decimal style.
  const decimals = hasDot ? numericPart.split(".")[1].length : 0;
  return `${current.toFixed(decimals)}${suffix}`;
}
