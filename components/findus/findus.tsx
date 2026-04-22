"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/shared/container";
import { SectionLabel } from "@/components/shared/section-label";
import { BARS } from "@/data/bars";

export function FindUs() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return BARS;
    return BARS.filter(
      (b) =>
        b.city.toLowerCase().includes(q) ||
        b.name.toLowerCase().includes(q) ||
        b.address.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <section
      id="findus"
      aria-labelledby="findus-title"
      className="bg-bg py-40"
    >
      <Container>
        <header className="mb-20 flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <SectionLabel>Find Us</SectionLabel>
            <h2
              id="findus-title"
              className="font-display mt-4 leading-[0.85] tracking-[-0.02em]"
              style={{ fontSize: "clamp(64px, 10vw, 160px)" }}
            >
              Bars pouring
              <br />
              NOVA, today.
            </h2>
          </div>

          <div className="relative min-w-[320px]">
            <span
              aria-hidden
              className="pointer-events-none absolute left-1 top-1/2 -translate-y-1/2 text-[18px] text-accent"
            >
              ◎
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="City or postal code"
              aria-label="Search bars"
              className="w-full border-0 border-b border-line bg-transparent py-3.5 pl-7 text-[20px] text-ink outline-none placeholder:italic placeholder:text-ink-ghost"
              style={{ fontFamily: "var(--font-instrument)" }}
            />
          </div>
        </header>

        {filtered.length > 0 ? (
          <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((bar) => (
              <li
                key={bar.name}
                className="flex cursor-pointer flex-col gap-2.5 bg-bg px-7 py-8 transition-colors duration-300 hover:bg-bg-2"
              >
                <span
                  className="text-[10px] uppercase tracking-[0.15em] text-accent"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {bar.city}
                </span>
                <span
                  className="font-display text-[26px] leading-none uppercase"
                >
                  {bar.name}
                </span>
                <span
                  className="mt-auto text-[15px] italic text-ink-dim"
                  style={{ fontFamily: "var(--font-instrument)" }}
                >
                  {bar.address}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p
            className="rounded-lg border border-dashed border-line px-7 py-20 text-center text-[20px] italic text-ink-dim"
            style={{ fontFamily: "var(--font-instrument)" }}
          >
            No bars matched &ldquo;{query}&rdquo; — try another city.
          </p>
        )}
      </Container>
    </section>
  );
}
