import type {
  RhythmInsightIcon,
  RhythmInsightTone,
  RhythmTimeSlotId,
} from "@/features/rhythm/types/rhythm.types";

export const RHYTHM_INSIGHT_ICON_COLORS: Record<RhythmInsightIcon, string> = {
  meal: "text-cta",
  clock: "text-primary",
  variety: "text-highlight",
  recipe: "text-primary",
  explore: "text-cta",
};

export const RHYTHM_INSIGHT_TONE_COLORS: Record<RhythmInsightTone, string> = {
  warm: "text-cta",
  calm: "text-primary",
  neutral: "text-foreground/55",
  positive: "text-primary",
};

export const RHYTHM_TIME_SLOT_DOT_COLORS: Record<
  RhythmTimeSlotId,
  { active: string; inactive: string }
> = {
  morning: {
    active: "bg-highlight/80",
    inactive: "bg-foreground/8",
  },
  midday: {
    active: "bg-primary",
    inactive: "bg-foreground/8",
  },
  afternoon: {
    active: "bg-cta/75",
    inactive: "bg-foreground/8",
  },
  evening: {
    active: "bg-primary/45",
    inactive: "bg-foreground/8",
  },
};

export const RHYTHM_LIFETIME_ICON_COLORS = {
  streak: "text-highlight",
  bestWeek: "text-highlight",
  totalMeals: "text-primary",
} as const;
