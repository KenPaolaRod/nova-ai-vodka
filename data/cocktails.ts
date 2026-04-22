export type Mood =
  | "contemplative"
  | "celebratory"
  | "dangerous"
  | "cozy"
  | "heartbroken";
export type Complexity = "minimal" | "balanced" | "ornate";
export type Flavor = "citrus" | "herbal" | "smoky" | "bitter" | "sweet";

export type CocktailInput = {
  mood: Mood;
  complexity: Complexity;
  flavor: Flavor;
  notes?: string;
};

export type Cocktail = {
  name: string;
  subtitle: string;
  ingredients: ReadonlyArray<{ item: string; amount: string }>;
  method: string;
};

const NAMES: Record<Mood, Record<Flavor, string>> = {
  contemplative: {
    citrus: "Quiet Equator",
    herbal: "The Reading Hour",
    smoky: "Static on the Record",
    bitter: "Didion's Margin",
    sweet: "Lamplight Noir",
  },
  celebratory: {
    citrus: "Fireworks, Translated",
    herbal: "Confetti Garden",
    smoky: "After-Party Oracle",
    bitter: "Champagne Debate",
    sweet: "A Toast to the Algorithm",
  },
  dangerous: {
    citrus: "Neon Alibi",
    herbal: "Green Room Felony",
    smoky: "Cigarette in the Rain",
    bitter: "Third Act Antagonist",
    sweet: "Strawberry Revolver",
  },
  cozy: {
    citrus: "Sunroom in December",
    herbal: "Slow Sunday",
    smoky: "The Cabin Hour",
    bitter: "Armchair Philosopher",
    sweet: "Honey & Wool",
  },
  heartbroken: {
    citrus: "Lemon Silence",
    herbal: "Empty Chair",
    smoky: "The Message Unread",
    bitter: "Certified Fine",
    sweet: "Saccharine Apology",
  },
};

const INGREDIENT_LIBRARY: Record<Flavor, ReadonlyArray<{ item: string; amount: string }>> = {
  citrus: [
    { item: "NOVA Vodka", amount: "60 ml" },
    { item: "Fresh lemon", amount: "22 ml" },
    { item: "Pink-grapefruit cordial", amount: "15 ml" },
    { item: "Verjus", amount: "10 ml" },
    { item: "Lemon oil, expressed", amount: "garnish" },
  ],
  herbal: [
    { item: "NOVA Vodka", amount: "55 ml" },
    { item: "Chartreuse verte", amount: "10 ml" },
    { item: "Thyme-black pepper shrub", amount: "15 ml" },
    { item: "Lime, freshly pressed", amount: "15 ml" },
    { item: "Rosemary sprig", amount: "garnish" },
  ],
  smoky: [
    { item: "NOVA Vodka, lapsang-washed", amount: "55 ml" },
    { item: "Amaro Nonino", amount: "15 ml" },
    { item: "Roasted tomato water", amount: "20 ml" },
    { item: "Mezcal mist", amount: "2 spritz" },
    { item: "Black sea salt", amount: "half rim" },
  ],
  bitter: [
    { item: "NOVA Vodka", amount: "50 ml" },
    { item: "Campari", amount: "15 ml" },
    { item: "White vermouth", amount: "20 ml" },
    { item: "Grapefruit peel", amount: "expressed" },
    { item: "Saline solution", amount: "2 drops" },
  ],
  sweet: [
    { item: "NOVA Vodka", amount: "55 ml" },
    { item: "Honey-chamomile syrup", amount: "20 ml" },
    { item: "Crémant de Loire", amount: "top" },
    { item: "Yuzu, fresh", amount: "10 ml" },
    { item: "Candied ginger", amount: "garnish" },
  ],
};

const METHOD_BY_COMPLEXITY: Record<Complexity, string> = {
  minimal:
    "Stir NOVA with the lead modifier over a single large-format ice block for exactly 18 rotations. Strain into a chilled coupe. Express the citrus oil, discard the peel.",
  balanced:
    "Combine everything but the garnish in a mixing tin with cracked ice. Shake just long enough to dilute 22%. Double-strain into a chilled coupe, sit the garnish on the rim, walk slowly to the table.",
  ornate:
    "Fat-wash the NOVA the night before. Build in a rocks glass over a hand-cut cube, stir until the glass sweats, then float the top modifier. Finish with a mist from 30 cm, bitters in a deliberate cross, and a low whisper.",
};

const SUBS: Record<Mood, string> = {
  contemplative:
    "A drink that wants to be read, not finished. Pair with a window and something unresolved.",
  celebratory:
    "Loud glass, loud mouth. Built to survive the first toast and set up the second.",
  dangerous:
    "High-voltage refreshment. Don't drive, don't argue, don't lie about your feelings.",
  cozy: "Low and slow. Built for wool socks, second chapters, and a fire that's been burning a while.",
  heartbroken:
    "An honest drink. Acknowledges the thing, doesn't try to fix it, leaves the rest to you.",
};

function ingredientCount(c: Complexity): number {
  if (c === "minimal") return 3;
  if (c === "balanced") return 5;
  return 5; // the library tops out at 5 — ornate re-uses all five with a flourish in method
}

export function generateCocktail({ mood, complexity, flavor, notes }: CocktailInput): Cocktail {
  const baseIngredients = INGREDIENT_LIBRARY[flavor].slice(0, ingredientCount(complexity));
  const ingredients = notes && notes.trim().length > 0
    ? [...baseIngredients, { item: `Tuned for — ${notes.trim()}`, amount: "custom" }]
    : baseIngredients;

  return {
    name: NAMES[mood][flavor],
    subtitle: SUBS[mood],
    ingredients,
    method: METHOD_BY_COMPLEXITY[complexity],
  };
}

export const MOOD_OPTIONS: ReadonlyArray<{ value: Mood; label: string }> = [
  { value: "contemplative", label: "Contemplative" },
  { value: "celebratory", label: "Celebratory" },
  { value: "dangerous", label: "Dangerous" },
  { value: "cozy", label: "Cozy" },
  { value: "heartbroken", label: "Heartbroken" },
];

export const COMPLEXITY_OPTIONS: ReadonlyArray<{ value: Complexity; label: string }> = [
  { value: "minimal", label: "3 ingredients" },
  { value: "balanced", label: "5 ingredients" },
  { value: "ornate", label: "Everything you've got" },
];

export const FLAVOR_OPTIONS: ReadonlyArray<{ value: Flavor; label: string }> = [
  { value: "citrus", label: "Citrus & bright" },
  { value: "herbal", label: "Herbal & green" },
  { value: "smoky", label: "Smoky & deep" },
  { value: "bitter", label: "Bitter & bracing" },
  { value: "sweet", label: "Sweet & floral" },
];
