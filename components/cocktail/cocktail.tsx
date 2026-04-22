"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/shared/container";
import { SectionLabel } from "@/components/shared/section-label";
import { ChipGroup } from "./chip-group";
import {
  COMPLEXITY_OPTIONS,
  FLAVOR_OPTIONS,
  MOOD_OPTIONS,
  generateCocktail,
  type Cocktail,
  type CocktailInput,
  type Complexity,
  type Flavor,
  type Mood,
} from "@/data/cocktails";

const STATUS_STEPS = [
  "Listening",
  "Parsing palate",
  "Routing through model",
  "Pouring",
];

export function CocktailGenerator() {
  const [mood, setMood] = useState<Mood>("contemplative");
  const [complexity, setComplexity] = useState<Complexity>("balanced");
  const [flavor, setFlavor] = useState<Flavor>("smoky");
  const [notes, setNotes] = useState("");
  const [result, setResult] = useState<Cocktail | null>(null);
  const [serial, setSerial] = useState<string>("—");
  const [status, setStatus] = useState<string>("Standby");
  const [isPending, startTransition] = useTransition();

  const handleGenerate = () => {
    if (isPending) return;
    const input: CocktailInput = { mood, complexity, flavor, notes };

    // Walk through status messages for theatre.
    setResult(null);
    setStatus(STATUS_STEPS[0]);
    STATUS_STEPS.forEach((s, i) => {
      setTimeout(() => setStatus(s), i * 220);
    });

    window.setTimeout(() => {
      startTransition(() => {
        setResult(generateCocktail(input));
        setSerial(
          (Math.floor(Math.random() * 900) + 100)
            .toString()
            .concat("·")
            .concat(new Date().getFullYear().toString().slice(2))
        );
        setStatus("Poured");
      });
    }, STATUS_STEPS.length * 220 + 80);
  };

  return (
    <section
      id="cocktail"
      aria-labelledby="cocktail-title"
      className="relative py-40"
      style={{
        background:
          "radial-gradient(circle at 20% 40%, rgba(192, 68, 30, 0.25), transparent 40%), radial-gradient(circle at 80% 60%, rgba(192, 68, 30, 0.15), transparent 50%), var(--color-bg)",
      }}
    >
      <Container>
        <div className="grid grid-cols-1 items-start gap-20 lg:grid-cols-[1.1fr_0.9fr]">
          {/* LEFT — form */}
          <div>
            <SectionLabel>AI Bartender — Live</SectionLabel>
            <h2
              id="cocktail-title"
              className="font-display mt-4 mb-8 leading-[0.85] tracking-[-0.02em]"
              style={{ fontSize: "clamp(56px, 8vw, 140px)" }}
            >
              Tell us
              <br />
              your{" "}
              <em
                className="text-accent"
                style={{
                  fontFamily: "var(--font-instrument)",
                  fontStyle: "italic",
                  letterSpacing: "-0.02em",
                  textTransform: "none",
                }}
              >
                mood
              </em>
              .<br />
              We&apos;ll pour.
            </h2>
            <p
              className="mb-12 max-w-[520px] leading-[1.4] text-ink-dim"
              style={{ fontFamily: "var(--font-instrument)", fontSize: "22px" }}
            >
              Pick a vibe, adjust the knobs, describe anything else you want. Our model
              will design a cocktail using NOVA and whatever you&apos;ve got at home.
            </p>

            <div className="grid gap-5">
              <ChipGroup
                label="Mood"
                options={MOOD_OPTIONS}
                value={mood}
                onChange={setMood}
              />
              <ChipGroup
                label="Complexity"
                options={COMPLEXITY_OPTIONS}
                value={complexity}
                onChange={setComplexity}
              />
              <ChipGroup
                label="Flavor lean"
                options={FLAVOR_OPTIONS}
                value={flavor}
                onChange={setFlavor}
              />

              <label className="block">
                <span className="font-mono-ui mb-2.5 block text-ink-dim">
                  Anything else? (optional)
                </span>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder='"no dairy, it&apos;s raining, I&apos;m reading Didion"'
                  className="w-full border-0 border-b border-line bg-transparent py-3 text-[24px] text-ink outline-none transition-colors focus:border-accent placeholder:italic placeholder:text-ink-ghost"
                  style={{ fontFamily: "var(--font-instrument)" }}
                />
              </label>

              <motion.button
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                onClick={handleGenerate}
                disabled={isPending}
                className="font-display mt-5 inline-flex cursor-pointer items-center gap-3.5 justify-self-start rounded-full border-0 bg-accent px-9 py-5 text-[14px] uppercase tracking-[0.12em] text-bg transition-[background] duration-300 hover:bg-accent-glow disabled:opacity-60"
              >
                Pour me something
                <motion.span
                  aria-hidden
                  className="inline-block"
                  initial={false}
                  animate={{ x: 0 }}
                  whileHover={{ x: 4 }}
                >
                  →
                </motion.span>
              </motion.button>
            </div>
          </div>

          {/* RIGHT — result card */}
          <aside
            className="sticky top-24 flex min-h-[520px] flex-col rounded-3xl border border-line p-10 backdrop-blur-md"
            style={{ background: "rgba(10, 9, 8, 0.7)" }}
            aria-live="polite"
          >
            <header className="mb-6 flex items-center justify-between border-b border-line pb-5">
              <div className="font-mono-ui text-ink-dim">
                Cocktail N° <span>{serial}</span>
              </div>
              <div
                className={`font-mono-ui inline-flex items-center gap-2 ${
                  result ? "text-ink" : "text-ink-dim"
                }`}
              >
                <span
                  className={`inline-block h-[7px] w-[7px] rounded-full ${
                    result || isPending ? "animate-pulse-dot bg-accent shadow-[0_0_8px_#C0441E]" : "bg-ink-dim"
                  }`}
                />
                <span>{status}</span>
              </div>
            </header>

            <AnimatePresence mode="wait">
              {!result ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="m-auto flex max-w-[340px] flex-1 items-center justify-center text-center text-[20px] italic leading-[1.35] text-ink-dim"
                  style={{ fontFamily: "var(--font-instrument)" }}
                >
                  Waiting for your signal. The bartender is watching the rain.
                </motion.div>
              ) : (
                <motion.div
                  key={result.name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-1 flex-col"
                >
                  <h3
                    className="font-display mb-3 leading-[0.9] tracking-[-0.01em]"
                    style={{ fontSize: "48px" }}
                  >
                    {result.name}
                  </h3>
                  <p
                    className="mb-7 text-[18px] italic leading-[1.3] text-ink-dim"
                    style={{ fontFamily: "var(--font-instrument)" }}
                  >
                    {result.subtitle}
                  </p>

                  <h4
                    className="mb-3.5 text-[10px] font-normal uppercase tracking-[0.15em] text-accent"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    Ingredients
                  </h4>
                  <ul className="mb-7 list-none">
                    {result.ingredients.map((ing) => (
                      <li
                        key={ing.item}
                        className="flex justify-between border-b border-dashed border-ink-ghost py-2.5 text-[17px]"
                        style={{ fontFamily: "var(--font-instrument)" }}
                      >
                        <span>{ing.item}</span>
                        <span
                          className="text-[12px] tracking-[0.05em] text-ink-dim"
                          style={{ fontFamily: "var(--font-mono)" }}
                        >
                          {ing.amount}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <h4
                    className="mb-3.5 text-[10px] font-normal uppercase tracking-[0.15em] text-accent"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    Method
                  </h4>
                  <p className="text-[16px] leading-[1.5]" style={{ fontFamily: "var(--font-instrument)" }}>
                    {result.method}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </aside>
        </div>
      </Container>
    </section>
  );
}
