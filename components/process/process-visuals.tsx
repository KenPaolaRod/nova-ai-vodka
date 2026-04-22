import Image from "next/image";
import type { ProcessStep } from "@/data/process-steps";

/** Visuals for the process carousel — real photos for data/design, inline SVG for the generative steps. */
export function ProcessVisual({ kind }: { kind: ProcessStep["visual"] }) {
  switch (kind) {
    case "data":
      return (
        <Image
          src="/images/process-data.png"
          alt="Close-up of red-lacquered nails holding a rocks glass of vodka on ice"
          fill
          sizes="(max-width: 900px) 100vw, 560px"
          className="object-cover"
        />
      );
    case "design":
      return (
        <Image
          src="/images/process-design.png"
          alt="Hand-drawn distillation column blueprint with compass and ink bottle"
          fill
          sizes="(max-width: 900px) 100vw, 560px"
          className="object-cover"
        />
      );
    case "taste":
      return (
        <svg
          viewBox="0 0 400 300"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid meet"
          style={{ padding: 48, boxSizing: "border-box" }}
        >
          <g fill="#0a0908">
            {Array.from({ length: 36 }).map((_, i) => {
              const x = 10 + i * 10;
              const h = 20 + ((i * 131 + 43) % 200);
              const y = 250 - h;
              return <rect key={i} x={x} y={y} width={4} height={h} />;
            })}
          </g>
          <text
            x="10"
            y="285"
            fill="#0a0908"
            fontFamily="var(--font-mono)"
            fontSize="9"
            letterSpacing="1"
          >
            FEEDBACK LOOP · 47 ITERATIONS
          </text>
        </svg>
      );
    case "ship":
      return (
        <svg
          viewBox="0 0 300 300"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid meet"
          style={{ padding: 48, boxSizing: "border-box" }}
        >
          {Array.from({ length: 8 }).map((_, row) =>
            Array.from({ length: 8 }).map((_, col) => {
              const seed = (row * 73 + col * 31 + 11) % 7;
              if (seed === 0) return null;
              const size = seed > 4 ? 24 : 12;
              return (
                <rect
                  key={`${row}-${col}`}
                  x={30 + col * 30}
                  y={30 + row * 30}
                  width={size}
                  height={size}
                  fill="#EFE6D2"
                />
              );
            })
          )}
          <circle cx="150" cy="150" r="38" fill="#C0441E" />
          <text
            x="150"
            y="148"
            textAnchor="middle"
            fill="#EFE6D2"
            fontFamily="var(--font-display)"
            fontSize="14"
          >
            SCAN
          </text>
          <text
            x="150"
            y="162"
            textAnchor="middle"
            fill="#EFE6D2"
            fontFamily="var(--font-instrument)"
            fontStyle="italic"
            fontSize="11"
          >
            your batch
          </text>
        </svg>
      );
  }
}

export const VISUAL_BACKGROUNDS: Record<ProcessStep["visual"], string> = {
  data: "linear-gradient(165deg, #1a0f0b 0%, #2a1810 100%)",
  design: "linear-gradient(165deg, #0f0d0c 0%, #1a1713 100%)",
  taste: "linear-gradient(165deg, #C0441E 0%, #8a2f14 100%)",
  ship: "linear-gradient(165deg, #14100e 0%, #2a1810 100%)",
};
