export type ProcessStep = {
  num: string;
  label: string;
  title: string;
  description: string;
  tag: string;
  caption: string;
  visual: "data" | "design" | "taste" | "ship";
};

export const PROCESS_STEPS: ReadonlyArray<ProcessStep> = [
  {
    num: "01",
    label: "— Step One",
    title: "We feed it history.",
    description:
      "A corpus of 4,287 recipes, tasting notes from Michelin somms, and mass spectrometry of every vodka distilled in the last century. The model learns what *smooth* actually means at a molecular level.",
    tag: "01 · DATA",
    caption: "4,287 RECIPES · 1.2M DATAPOINTS",
    visual: "data",
  },
  {
    num: "02",
    label: "— Step Two",
    title: "It designs the still.",
    description:
      "The model proposes geometries our master distiller never would — 11 plates instead of 9, a cooler condensation curve, triple filtration through volcanic charcoal *and* silver. We build what it recommends.",
    tag: "02 · DESIGN",
    caption: "GEOMETRY BY NEURAL NET · BUILT IN WARSAW",
    visual: "design",
  },
  {
    num: "03",
    label: "— Step Three",
    title: "We taste. It listens.",
    description:
      "Every batch is blind-tested by twelve human palates. Their notes — too sweet, metallic finish, echoes of rye — feed back into the model. It re-tunes. We re-distill. After 47 iterations, something new.",
    tag: "03 · TASTE",
    caption: "12 HUMAN PALATES · 47 BATCHES",
    visual: "taste",
  },
  {
    num: "04",
    label: "— Step Four",
    title: "The bottle ships.",
    description:
      "Each bottle carries a unique batch signature. Scan it, and the model tells you exactly which iteration you're drinking — and generates a cocktail tuned to *your* palate. That's next.",
    tag: "04 · SHIP",
    caption: "BATCH 000.014 · SCAN TO UNLOCK",
    visual: "ship",
  },
];
