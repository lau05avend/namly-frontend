import type { MealSlot } from "@/constants/meal-slots";
import { PLANNER_COPY } from "@/features/planner/constants/planner-copy";
import type {
  ScheduledMealApiDto,
  ScheduledMealsCalendarApiResponse,
} from "@/features/planner/types/planner-api.types";
import type {
  PlannerDayPlan,
  PlannerEntry,
  PlannerMonthActivity,
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

function formatPlannedTimeLabel(plannedTime: string): string {
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

function mapMealToEntry(
  meal: ScheduledMealApiDto,
  variant: PlannerEntry["variant"],
): PlannerEntry {
  const slot = resolveMealSlot(meal.mealType.name);
  const isExpress = meal.isExpress;
  const recipes = meal.recipes ?? [];

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
      meal.status === "next"
        ? formatCountdown(meal.entryDate, meal.plannedTime)
        : undefined,
    badge: isExpress ? PLANNER_COPY.quickNoteBadge : undefined,
    variant: isExpress ? "note" : variant,
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
  const completedCount = meals.filter(
    (meal) => meal.status === "completed",
  ).length;
  const nextMeals = meals
    .filter((meal) => meal.status === "next")
    .sort(sortByPlannedTime);
  const upcomingMeals = meals
    .filter((meal) => meal.status === "upcoming" || meal.status === "missed")
    .sort(sortByPlannedTime);

  const sections: PlannerSection[] = [];

  if (nextMeals.length > 0) {
    sections.push({
      id: "next",
      title: PLANNER_COPY.sections.nextMeal,
      entries: nextMeals.map((meal) => mapMealToEntry(meal, "featured")),
    });
  }

  sections.push({
    id: "upcoming",
    title: PLANNER_COPY.sections.upcoming,
    entries: upcomingMeals.map((meal) => mapMealToEntry(meal, "default")),
  });

  const dayPlan: PlannerDayPlan = {
    date: dateKey,
    sections,
  };

  if (completedCount > 0) {
    dayPlan.registeredSummary = {
      count: completedCount,
      label:
        completedCount === 1
          ? "1 comida registrada"
          : `${completedCount} comidas registradas`,
      hint: "Toca para ver el detalle",
    };
  }

  return dayPlan;
}
