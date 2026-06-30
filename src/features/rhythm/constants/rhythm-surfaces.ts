/** Rhythm tab surfaces — translucent cards that blend with the page background. */
export const RHYTHM_SURFACES = {
  sectionCard:
    "rounded-[1.75rem] border border-foreground/[0.06] bg-card/35 px-5 py-5 shadow-none",
  nestedCard:
    "rounded-2xl border border-foreground/[0.05] bg-card/55 shadow-none",
  metricComparison: "rounded-2xl border border-primary/10 bg-mint/45",
  metricAverage: "rounded-2xl border border-cta/12 bg-cta/[0.07]",
  insightIconWarm: "bg-cta/12 text-cta",
  insightIconCalm: "bg-mint/70 text-primary",
  insightIconPositive: "bg-mint/70 text-primary",
  insightIconNeutral: "bg-foreground/[0.05] text-foreground/45",
  lifetimeIconStreak: "bg-highlight/30 text-foreground/70",
  lifetimeIconBestWeek: "bg-highlight/30 text-foreground/70",
  lifetimeIconMeals: "bg-mint/70 text-primary",
} as const;
