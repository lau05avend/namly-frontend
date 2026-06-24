import { RHYTHM_COPY } from "@/features/rhythm/constants/rhythm-copy";
import type { RhythmSummary } from "@/features/rhythm/types/rhythm.types";

export function getMockRhythmSummary(): RhythmSummary {
  const activeDays = 5;
  const totalDays = 7;
  const averageCompletion = 72;
  const weekComparison = 12;

  return {
    weeklySummary: {
      consistencyMessage: "Tu ritmo ha sido muy estable esta semana",
      activeDays,
      totalDays,
      activeDaysLabel: RHYTHM_COPY.weekly.activeDays(activeDays, totalDays),
      averageCompletion,
      averageCompletionLabel: RHYTHM_COPY.weekly.averageCompletionLabel,
      weekComparison,
      weekComparisonLabel: RHYTHM_COPY.weekly.weekComparisonLabel,
      activityDays: [
        { dayLabel: "L", intensity: 1, isToday: false },
        { dayLabel: "M", intensity: 1, isToday: false },
        { dayLabel: "M", intensity: 0.5, isToday: false },
        { dayLabel: "J", intensity: 0, isToday: false },
        { dayLabel: "V", intensity: 1, isToday: true },
        { dayLabel: "S", intensity: 0, isToday: false },
        { dayLabel: "D", intensity: 0, isToday: false },
      ],
    },
    habits: {
      hasEnoughData: true,
      mostConsistentMealType: "Desayuno",
      preferredTimeSlot: "Mediodía",
      diversityInsight: "Tus comidas fueron más variadas que la semana pasada",
      tagInsight: "Predominaron recetas caseras esta semana",
      insights: [
        {
          id: "insight-meal",
          icon: "meal",
          message: "Tu desayuno es tu comida más constante",
        },
        {
          id: "insight-recipe",
          icon: "recipe",
          message: "Predominaron recetas caseras esta semana",
        },
        {
          id: "insight-clock",
          icon: "clock",
          message: "La mayoría de tus registros ocurren entre 12 y 2 p. m.",
        },
      ],
      timeSlotDistribution: [
        { slot: "morning", label: "Mañana", level: 2, maxLevel: 5 },
        { slot: "midday", label: "Mediodía", level: 5, maxLevel: 5 },
        { slot: "afternoon", label: "Tarde", level: 3, maxLevel: 5 },
        { slot: "evening", label: "Noche", level: 1, maxLevel: 5 },
      ],
    },
    lifetime: {
      longestStreak: 18,
      longestStreakLabel: RHYTHM_COPY.lifetime.longestStreak(18),
      bestWeekCompletion: 91,
      bestWeekCompletionLabel: RHYTHM_COPY.lifetime.bestWeek(91),
      totalMealsLogged: 246,
      totalMealsLoggedLabel: RHYTHM_COPY.lifetime.totalMeals(246),
    },
  };
}

export function getMockRhythmSummaryEmptyHabits(): RhythmSummary {
  const summary = getMockRhythmSummary();

  return {
    ...summary,
    habits: {
      hasEnoughData: false,
      insights: [],
    },
  };
}
