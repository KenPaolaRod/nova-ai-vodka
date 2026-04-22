export const MANIFESTO_LINES: ReadonlyArray<ReadonlyArray<{ text: string; accent?: boolean }>> = [
  [{ text: "We trained a neural network on four" }],
  [{ text: "thousand years of " }, { text: "spirit-making", accent: true }, { text: "." }],
  [{ text: "It studied every still, every grain," }],
  [{ text: "every mistake and masterpiece —" }],
  [{ text: "then designed a vodka that shouldn't" }],
  [{ text: "exist. " }, { text: "So we built it.", accent: true }],
];

export const MANIFESTO_STATS = [
  {
    target: "4,287",
    label: "distillation simulations run before the first drop",
  },
  {
    target: "97.4%",
    label: "mouthfeel correlation vs. human master blender",
  },
  {
    target: "000.014",
    label: "current batch, distilled in Warsaw, Poland",
  },
] as const;
