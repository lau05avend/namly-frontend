import type { MealSlot } from "@/constants/meal-slots";
import type { StreakGrowthStageId } from "@/features/home/constants/streak-growth-stages";
import { HOME_COPY } from "@/features/home/constants/home-copy";
import type {
  HomeRecommendationApiDto,
  HomeScheduledMealApiDto,
  HomeSummaryApiDto,
} from "@/features/home/types/home-api.types";
import type {
  HomeRecommendation,
  HomeStreak,
  HomeSummary,
  NextMealDetail,
  NextMealKind,
  RegisteredTodaySummary,
  UpcomingMealItem,
} from "@/features/home/types/home.types";
import {
  formatCountdownLabel,
  formatLoggedAtTimeLabel,
  formatPlannedTimeLabel,
} from "@/features/home/utils/home-time.utils";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const MEAL_TYPE_NAME_TO_SLOT: Record<string, MealSlot> = {
  Desayuno: "breakfast",
  "Media mañana": "snack",
  Almuerzo: "lunch",
  Merienda: "snack",
  Cena: "dinner",
  Snack: "snack",
};

function resolveMealSlot(mealTypeName: string): MealSlot {
  return MEAL_TYPE_NAME_TO_SLOT[mealTypeName] ?? "snack";
}

function resolveMealKind(isExpress: boolean): NextMealKind {
  return isExpress ? "note" : "meal";
}

function formatDisplayDate(dateKey: string): string {
  const date = new Date(`${dateKey}T12:00:00`);
  const formatted = format(date, "EEEE d", { locale: es });
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

function clampGrowthStageId(stageId: number): StreakGrowthStageId {
  if (stageId >= 1 && stageId <= 5) {
    return stageId as StreakGrowthStageId;
  }

  return 1;
}

function mapScheduledMealToNextMeal(
  meal: HomeScheduledMealApiDto,
): NextMealDetail {
  return {
    id: meal.id,
    kind: resolveMealKind(meal.isExpress),
    slot: resolveMealSlot(meal.mealType.name),
    slotLabel: meal.mealType.name,
    timeLabel: formatPlannedTimeLabel(meal.plannedTime),
    title: meal.title,
    countdownLabel: formatCountdownLabel(meal.entryDate, meal.plannedTime),
    items: meal.items,
    moreCount: meal.moreCount > 0 ? meal.moreCount : undefined,
    totalDurationMinutes: meal.totalDurationMinutes ?? null,
  };
}

function mapScheduledMealToUpcoming(
  meal: HomeSummaryApiDto["upcomingMeals"][number],
): UpcomingMealItem {
  return {
    id: meal.id,
    kind: resolveMealKind(meal.isExpress),
    slot: resolveMealSlot(meal.mealType.name),
    slotLabel: meal.mealType.name,
    timeLabel: formatPlannedTimeLabel(meal.plannedTime),
    title: meal.title,
    items: meal.items,
    moreCount: meal.moreCount > 0 ? meal.moreCount : undefined,
    totalDurationMinutes: meal.totalDurationMinutes ?? null,
  };
}

function mapStreak(streak: HomeSummaryApiDto["streak"]): HomeStreak {
  return {
    currentDays: streak.currentDays,
    mealsLoggedToday: streak.mealsLoggedToday,
    mealsGoalToday: streak.mealsGoalToday,
    growthStageId: clampGrowthStageId(streak.growthStageId),
  };
}

function mapRegisteredToday(
  registeredToday: HomeSummaryApiDto["registeredToday"],
): RegisteredTodaySummary {
  return {
    count: registeredToday.count,
    meals: (registeredToday.meals ?? []).map((meal) => ({
      id: meal.id,
      mealTypeName: meal.mealTypeName,
      timeLabel: formatLoggedAtTimeLabel(meal.loggedAt),
      detail: meal.detail,
      mediaUrl: meal.mediaUrl,
    })),
  };
}

function mapRecommendation(
  recommendation: HomeRecommendationApiDto,
): HomeRecommendation {
  return {
    id: recommendation.id,
    title: recommendation.title,
    meta: recommendation.meta,
    imageUrl: recommendation.imageUrl,
    totalDurationMinutes: recommendation.totalDurationMinutes ?? null,
  };
}

export function mapHomeApiResponse(raw: HomeSummaryApiDto): HomeSummary {
  return {
    date: raw.date,
    displayDate: formatDisplayDate(raw.date),
    nextMeal: raw.nextMeal ? mapScheduledMealToNextMeal(raw.nextMeal) : null,
    streak: mapStreak(raw.streak),
    upcomingMeals: (raw.upcomingMeals ?? []).map(mapScheduledMealToUpcoming),
    registeredToday: mapRegisteredToday(raw.registeredToday),
    recommendation: raw.recommendation
      ? mapRecommendation(raw.recommendation)
      : null,
  };
}

export function mapRegisteredTodaySubtitle(count: number): string {
  return HOME_COPY.sections.dayRecapSubtitle(count);
}
