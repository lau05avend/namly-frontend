import { RHYTHM_COPY } from "@/features/rhythm/constants/rhythm-copy";
import type {
  RhythmAnalyticsApiDto,
  RhythmHabitsApiDto,
  RhythmLifetimeApiDto,
  RhythmWeekApiDto,
} from "@/features/rhythm/types/rhythm-api.types";
import type {
  RhythmActivityDay,
  RhythmActivityIntensity,
  RhythmHabitInsight,
  RhythmHabits,
  RhythmInsightIcon,
  RhythmInsightTone,
  RhythmLifetime,
  RhythmSummary,
  RhythmTimeSlotDistribution,
  RhythmTimeSlotId,
  RhythmWeeklySummary,
} from "@/features/rhythm/types/rhythm.types";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

const TIME_SLOT_CONFIG: {
  apiKey: keyof RhythmHabitsApiDto["timeSlotDistribution"];
  slot: RhythmTimeSlotId;
  label: string;
}[] = [
  { apiKey: "morning", slot: "morning", label: "Mañana" },
  { apiKey: "midday", slot: "midday", label: "Mediodía" },
  { apiKey: "afternoon", slot: "afternoon", label: "Tarde" },
  { apiKey: "night", slot: "evening", label: "Noche" },
];

const INSIGHT_ICON_ALIASES: Record<string, RhythmInsightIcon> = {
  meal: "meal",
  sun: "meal",
  breakfast: "meal",
  clock: "clock",
  time: "clock",
  variety: "variety",
  diverse: "variety",
  sparkles: "variety",
  recipe: "recipe",
  chef: "recipe",
  cooking: "recipe",
  explore: "explore",
  compass: "explore",
};

const INSIGHT_TONE_ALIASES: Record<string, RhythmInsightTone> = {
  warm: "warm",
  calm: "calm",
  neutral: "neutral",
  positive: "positive",
  soft: "calm",
};

const MAX_INSIGHTS = 3;
const TIME_SLOT_DOT_COUNT = 5;

function clampIntensity(value: number): RhythmActivityIntensity {
  if (value <= 0) {
    return 0;
  }

  if (value >= 3) {
    return 3;
  }

  return value as RhythmActivityIntensity;
}

function resolveInsightIcon(icon: string): RhythmInsightIcon {
  const normalized = icon.trim().toLowerCase();
  return INSIGHT_ICON_ALIASES[normalized] ?? "variety";
}

function resolveInsightTone(tone: string): RhythmInsightTone {
  const normalized = tone.trim().toLowerCase();
  return INSIGHT_TONE_ALIASES[normalized] ?? "neutral";
}

function mapActivityDay(day: RhythmWeekApiDto["days"][number]): RhythmActivityDay {
  const parsedDate = parseISO(day.date);

  return {
    dayLabel: format(parsedDate, "EEEEE", { locale: es }).toUpperCase(),
    intensity: clampIntensity(day.intensity),
    isToday: day.isToday,
  };
}

function mapWeeklySummary(week: RhythmWeekApiDto): RhythmWeeklySummary {
  return {
    consistencyMessage: week.summary.message,
    activeDays: week.activeDays,
    totalDays: week.totalDays,
    activeDaysLabel: RHYTHM_COPY.weekly.activeDays(
      week.activeDays,
      week.totalDays,
    ),
    averageCompletion: week.averageCompletion,
    averageCompletionLabel: RHYTHM_COPY.weekly.averageCompletionLabel,
    weekComparison: week.comparison.deltaPercentage,
    weekComparisonLabel: week.comparison.message,
    activityDays: week.days.map(mapActivityDay),
  };
}

function mapTimeSlotDistribution(
  distribution: RhythmHabitsApiDto["timeSlotDistribution"],
): RhythmTimeSlotDistribution[] | undefined {
  const values = TIME_SLOT_CONFIG.map((slot) => distribution[slot.apiKey] ?? 0);
  const peak = Math.max(...values, 0);

  if (peak === 0) {
    return undefined;
  }

  return TIME_SLOT_CONFIG.map((slot, index) => {
    const value = values[index] ?? 0;
    const level =
      value === 0 ? 0 : Math.max(1, Math.round((value / peak) * TIME_SLOT_DOT_COUNT));

    return {
      slot: slot.slot,
      label: slot.label,
      level,
      maxLevel: TIME_SLOT_DOT_COUNT,
    };
  });
}

function mapInsight(insight: RhythmHabitsApiDto["insights"][number]): RhythmHabitInsight {
  return {
    id: insight.id,
    icon: resolveInsightIcon(insight.icon),
    tone: resolveInsightTone(insight.tone),
    message: insight.message,
  };
}

function mapHabits(habits: RhythmHabitsApiDto): RhythmHabits {
  const insights = habits.insights.slice(0, MAX_INSIGHTS).map(mapInsight);
  const timeSlotDistribution = mapTimeSlotDistribution(
    habits.timeSlotDistribution,
  );

  return {
    hasEnoughData: insights.length > 0 || Boolean(timeSlotDistribution),
    insights,
    timeSlotDistribution,
  };
}

function mapLifetime(lifetime: RhythmLifetimeApiDto): RhythmLifetime {
  return {
    longestStreak: lifetime.longestStreak,
    longestStreakLabel: RHYTHM_COPY.lifetime.longestStreak(
      lifetime.longestStreak,
    ),
    bestWeekCompletion: lifetime.bestWeekCompletion,
    bestWeekCompletionLabel: RHYTHM_COPY.lifetime.bestWeek(
      lifetime.bestWeekCompletion,
    ),
    totalMealsLogged: lifetime.totalMealsLogged,
    totalMealsLoggedLabel: RHYTHM_COPY.lifetime.totalMeals(
      lifetime.totalMealsLogged,
    ),
  };
}

export function mapRhythmApiResponse(raw: RhythmAnalyticsApiDto): RhythmSummary {
  return {
    weeklySummary: raw.week ? mapWeeklySummary(raw.week) : null,
    habits: raw.habits ? mapHabits(raw.habits) : null,
    lifetime: raw.lifetime ? mapLifetime(raw.lifetime) : null,
  };
}
