/** Paired hero card surfaces — action (green) vs growth (warm yellow). */
export const HOME_HERO_SURFACES = {
  nextMeal:
    "rounded-2xl border border-primary/20 bg-mint/25 shadow-none ring-1 ring-primary/10",
  nextMealEmpty:
    "rounded-2xl border border-primary/16 bg-mint/15 shadow-none ring-1 ring-primary/8",
  streak:
    "rounded-2xl border border-highlight/35 bg-highlight/12 shadow-none ring-1 ring-highlight/15",
} as const;

/** Shared section cards on Home — solid surfaces, no glass layering. */
export const HOME_SECTION_SURFACES = {
  recap:
    "overflow-hidden rounded-2xl border border-foreground/6 bg-background shadow-none",
  upcomingEmpty: "rounded-2xl border border-foreground/6 shadow-none",
  recommendation:
    "overflow-hidden rounded-2xl border border-foreground/6 bg-background shadow-sm shadow-cta/[0.12]",
} as const;

/** Fixed height so próxima comida and racha hero cards stay symmetric. */
export const HOME_HERO_CARD_HEIGHT = "h-[11.25rem]";
