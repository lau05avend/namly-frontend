/** Paired hero card surfaces — action (green) vs growth (warm cream/peach). */
export const HOME_HERO_SURFACES = {
  nextMeal: "rounded-2xl border-primary/14 bg-mint shadow-none",
  nextMealEmpty: "rounded-2xl border-primary/12 bg-mint shadow-none",
  streak: "rounded-2xl border-cta/10 bg-card shadow-none",
} as const;

/** Shared section cards on Home — solid surfaces, no glass layering. */
export const HOME_SECTION_SURFACES = {
  recap: "rounded-2xl border border-foreground/6 bg-card shadow-none",
  upcomingEmpty: "rounded-2xl border border-foreground/6 shadow-none",
  recommendation: "rounded-2xl border border-foreground/6 bg-card shadow-none",
} as const;

/** Fixed height so próxima comida and racha hero cards stay symmetric. */
export const HOME_HERO_CARD_HEIGHT = "h-[11.25rem]";
