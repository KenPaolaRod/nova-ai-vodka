"use client";

import { useState } from "react";
import { Container } from "@/components/shared/container";

const LINK_COLUMNS = [
  {
    title: "Shop",
    links: [
      { label: "NOVA 750ml", href: "#" },
      { label: "Gift Edition", href: "#" },
      { label: "Subscribe", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our Story", href: "#" },
      { label: "The Distillery", href: "#" },
      { label: "Press", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Follow",
    links: [
      { label: "Instagram", href: "#" },
      { label: "X / Twitter", href: "#" },
      { label: "TikTok", href: "#" },
    ],
  },
];

export function Footer() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <footer className="relative overflow-hidden bg-bg px-0 pb-10 pt-[100px]">
      <Container>
        <div
          className="font-display mb-[60px] text-center leading-[0.78] tracking-[-0.03em] text-accent"
          style={{ fontSize: "clamp(120px, 22vw, 360px)" }}
        >
          NOVA
          <br />
          <span className="block text-transparent [-webkit-text-stroke:2px_var(--color-accent)]">
            VODKA
          </span>
        </div>

        <div className="mx-auto mb-20 max-w-[720px] text-center">
          <p
            className="mb-6 text-[22px] italic text-ink-dim"
            style={{ fontFamily: "var(--font-instrument)" }}
          >
            The batch drops when the model says it&apos;s ready.{" "}
            <em className="text-ink">Don&apos;t miss it.</em>
          </p>
          <form
            className="flex gap-0 border-b border-ink pb-1"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
              setEmail("");
            }}
          >
            <label htmlFor="footer-email" className="sr-only">
              Email
            </label>
            <input
              id="footer-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={submitted ? "◉ You're on the list." : "your email"}
              className="flex-1 border-0 bg-transparent py-3.5 text-[20px] text-ink outline-none placeholder:italic placeholder:text-ink-ghost"
              style={{ fontFamily: "var(--font-instrument)" }}
            />
            <button
              type="submit"
              className="nova-arrow-btn font-display inline-flex cursor-pointer items-center gap-2.5 border-0 bg-transparent py-3.5 pl-6 pr-0 text-[13px] uppercase tracking-[0.12em] text-ink"
            >
              Subscribe{" "}
              <span aria-hidden className="nova-arrow inline-block transition-transform duration-300">
                →
              </span>
            </button>
            <style>{`
              .nova-arrow-btn:hover .nova-arrow { transform: translateX(4px); }
            `}</style>
          </form>
        </div>

        <div className="grid grid-cols-2 gap-10 border-t border-line pt-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <h4
              className="mb-4 text-[10px] uppercase tracking-[0.15em] text-ink-dim"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              NOVA
            </h4>
            <p
              className="max-w-[320px] text-[18px] leading-[1.3] text-ink-dim"
              style={{ fontFamily: "var(--font-instrument)" }}
            >
              Distilled in Warsaw. Designed by intelligence. Drink slow, question
              everything.
            </p>
          </div>
          {LINK_COLUMNS.map((col) => (
            <div key={col.title}>
              <h4
                className="mb-4 text-[10px] uppercase tracking-[0.15em] text-ink-dim"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {col.title}
              </h4>
              <ul className="list-none">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="block py-1.5 text-[18px] text-ink no-underline transition-opacity hover:opacity-70"
                      style={{ fontFamily: "var(--font-instrument)" }}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="mt-14 flex flex-col items-center justify-between gap-4 text-[10px] uppercase tracking-[0.15em] text-ink-dim md:flex-row"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <span>© 2026 NOVA Distillery · Warsaw, PL</span>
          <span>Please drink responsibly · 21+</span>
          <span>Batch 000.014</span>
        </div>
      </Container>
    </footer>
  );
}
