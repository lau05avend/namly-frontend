import type { MealSlot } from "@/constants/meal-slots";
import { PLANNER_COPY } from "@/features/planner/constants/planner-copy";
import type {
  ScheduledMealApiDto,
  ScheduledMealStatusApi,
  ScheduledMealsCalendarApiResponse,
} from "@/features/planner/types/planner-api.types";
import type {
  PlannerDayPlan,
  PlannerEntry,
  PlannerEntryStatus,
  PlannerMonthActivity,
  PlannerRegisteredMeal,
  PlannerSection,
} from "@/features/planner/types/planner.types";

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

export function formatPlannedTimeLabel(plannedTime: string): string {
  const [hours, minutes] = plannedTime.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);

  return date.toLocaleTimeString("es", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function formatCountdown(
  entryDate: string,
  plannedTime: string,
): string | undefined {
  const [year, month, day] = entryDate.split("-").map(Number);
  const [hours, minutes] = plannedTime.split(":").map(Number);
  const planned = new Date(year, month - 1, day, hours, minutes);
  const diffMs = planned.getTime() - Date.now();

  if (diffMs <= 0) {
    return undefined;
  }

  const diffMin = Math.round(diffMs / 60_000);

  if (diffMin < 60) {
    return `En ${diffMin} min`;
  }

  const diffHours = Math.floor(diffMin / 60);
  const remainingMinutes = diffMin % 60;

  if (remainingMinutes === 0) {
    return `En ${diffHours} h`;
  }

  return `En ${diffHours} h ${remainingMinutes} min`;
}

function toEntryStatus(status: ScheduledMealStatusApi): PlannerEntryStatus {
  switch (status) {
    case "next":
      return "next";
    case "missed":
      return "missed";
    case "upcoming":
    case "completed":
      return "upcoming";
  }
}

function mapMealToEntry(
  meal: ScheduledMealApiDto,
  variant: PlannerEntry["variant"],
): PlannerEntry {
  const slot = resolveMealSlot(meal.mealType.name);
  const isExpress = meal.isExpress;
  const recipes = meal.recipes ?? [];
  const status = toEntryStatus(meal.status);

  return {
    id: meal.id,
    kind: isExpress ? "note" : "meal",
    slot,
    slotLabel: meal.mealType.name.toUpperCase(),
    timeLabel: formatPlannedTimeLabel(meal.plannedTime),
    title: isExpress
      ? (meal.expressNote ?? "")
      : (recipes[0]?.title ?? meal.mealType.name),
    items: isExpress
      ? undefined
      : recipes.map((recipe) => ({
          id: recipe.id,
          label: recipe.title,
        })),
    countdownLabel:
      status === "next"
        ? formatCountdown(meal.entryDate, meal.plannedTime)
        : undefined,
    badge: isExpress ? PLANNER_COPY.quickNoteBadge : undefined,
    status,
    variant: isExpress ? (variant === "featured" ? "featured" : "note") : variant,
  };
}

function mapCompletedMealToRegistered(
  meal: ScheduledMealApiDto,
): PlannerRegisteredMeal {
  const recipes = meal.recipes ?? [];

  let detail: string;

  if (meal.isExpress) {
    detail = meal.expressNote?.trim() ?? "";
  } else if (recipes.length > 0) {
    detail = recipes.map((recipe) => recipe.title).join(", ");
  } else {
    detail = meal.mealType.name;
  }

  return {
    id: meal.id,
    mealTypeName: meal.mealType.name,
    timeLabel: formatPlannedTimeLabel(meal.plannedTime),
    detail,
    isExpress: meal.isExpress,
  };
}

function sortByPlannedTime(
  left: ScheduledMealApiDto,
  right: ScheduledMealApiDto,
): number {
  return left.plannedTime.localeCompare(right.plannedTime);
}

export function mapCalendarResponse(
  raw: ScheduledMealsCalendarApiResponse,
  monthKey: string,
): PlannerMonthActivity {
  return {
    month: monthKey,
    days: raw.days.map((date) => ({
      date,
      hasPlanned: true,
      hasCompleted: false,
    })),
  };
}

export function mapDayResponse(
  meals: ScheduledMealApiDto[],
  dateKey: string,
): PlannerDayPlan {
  const completedMeals = meals
    .filter((meal) => meal.status === "completed")
    .sort(sortByPlannedTime);
  const completedCount = completedMeals.length;
  const nextMeals = meals
    .filter((meal) => meal.status === "next")
    .sort(sortByPlannedTime);
  const upcomingMeals = meals
    .filter((meal) => meal.status === "upcoming")
    .sort(sortByPlannedTime);
  const missedMeals = meals
    .filter((meal) => meal.status === "missed")
    .sort(sortByPlannedTime);

  const sections: PlannerSection[] = [];

  if (nextMeals.length > 0) {
    sections.push({
      id: "next",
      title: PLANNER_COPY.sections.nextMeal,
      entries: nextMeals.map((meal) => mapMealToEntry(meal, "featured")),
    });
  }

  if (upcomingMeals.length > 0) {
    sections.push({
      id: "upcoming",
      title: PLANNER_COPY.sections.upcoming,
      entries: upcomingMeals.map((meal) => mapMealToEntry(meal, "default")),
    });
  }

  if (missedMeals.length > 0) {
    sections.push({
      id: "missed",
      title: PLANNER_COPY.sections.incomplete.title,
      entries: missedMeals.map((meal) => mapMealToEntry(meal, "default")),
    });
  }

  const dayPlan: PlannerDayPlan = {
    date: dateKey,
    sections,
  };

  if (completedCount > 0) {
    dayPlan.registeredSummary = {
      count: completedCount,
      subtitle: PLANNER_COPY.sections.completed.subtitle(completedCount),
      meals: completedMeals.map(mapCompletedMealToRegistered),
    };
  }

  return dayPlan;
}
