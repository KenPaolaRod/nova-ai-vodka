import { Container } from "@/components/shared/container";
import { PRESS_OUTLETS, PRESS_QUOTE } from "@/data/press";
import { cn } from "@/lib/cn";

export function Press() {
  return (
    <section
      aria-label="Press"
      className="border-y border-line bg-bg py-[120px]"
    >
      <Container>
        <blockquote
          className="mb-[60px] max-w-[1100px] italic leading-[1.2]"
          style={{
            fontFamily: "var(--font-instrument)",
            fontSize: "clamp(28px, 3vw, 48px)",
          }}
        >
          <span className="text-accent not-italic" style={{ fontFamily: "var(--font-display)" }}>
            &ldquo;
          </span>
          {PRESS_QUOTE.body}
          <em>{PRESS_QUOTE.accent}</em>
          {PRESS_QUOTE.tail}
          <span className="text-accent not-italic" style={{ fontFamily: "var(--font-display)" }}>
            &rdquo;
          </span>
        </blockquote>

        <ul className="grid grid-cols-2 items-center gap-10 md:grid-cols-4">
          {PRESS_OUTLETS.map((outlet) => (
            <li
              key={outlet.name}
              className={cn(
                "text-center text-ink-dim transition-colors duration-300 hover:text-ink",
                outlet.serif
                  ? "text-[30px] italic tracking-[-0.01em]"
                  : "font-display text-[24px] uppercase tracking-[0.04em]"
              )}
              style={
                outlet.serif
                  ? { fontFamily: "var(--font-instrument)" }
                  : undefined
              }
            >
              {outlet.name}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
