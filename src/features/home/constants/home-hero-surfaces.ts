/** Paired hero card surfaces — action (green) vs growth (warm cream/peach). */
export const HOME_HERO_SURFACES = {
  nextMeal:
    "rounded-2xl border-primary/14 bg-linear-to-br from-mint via-mint/90 to-primary/14 shadow-none",
  streak:
    "rounded-2xl border-foreground/5 bg-linear-to-br from-card via-highlight/10 to-cta/8 shadow-none",
} as const;

/** Fixed height so próxima comida and racha hero cards stay symmetric. */
export const HOME_HERO_CARD_HEIGHT = "h-[11.25rem]";
