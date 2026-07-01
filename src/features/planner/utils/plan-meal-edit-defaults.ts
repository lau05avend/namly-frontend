import type { PlannerScheduledMealDetail } from "@/features/planner/types/planner-detail.types";
import type { PlanMealDefaults } from "@/features/planner/types/plan-meal.types";
import { parseDateKey, toDateKey } from "@/features/calendar/utils/date";
import { createPlanItemId } from "@/features/planner/utils/plan-meal-id";
import { sortRemindersByOffsetDesc } from "@/features/planner/utils/plan-reminder-sort.utils";

export function normalizePlannedTimeForForm(plannedTime: string): string {
  const [hours, minutes] = plannedTime.split(":");

  if (!hours || !minutes) {
    return plannedTime;
  }

  return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
}

function normalizeEntryDateForForm(entryDate: string): string {
  const dateKey = entryDate.slice(0, 10);

  if (parseDateKey(dateKey)) {
    return dateKey;
  }

  return toDateKey(new Date());
}

export function buildPlanMealDefaultsFromDetail(
  detail: PlannerScheduledMealDetail,
): PlanMealDefaults {
  const reminders = sortRemindersByOffsetDesc(
    (detail.reminders ?? []).map((reminder) => ({
      id: createPlanItemId(),
      offsetMinutes: reminder.offsetMinutes,
    })),
  );

  return {
    date: normalizeEntryDateForForm(detail.entryDate),
    time: normalizePlannedTimeForForm(detail.plannedTime),
    mealTypeId: detail.mealTypeId,
    entryMode: detail.isExpress ? "express" : "recipe",
    expressNote: detail.expressNote ?? "",
    recipes: detail.recipes.map((recipe) => ({
      id: recipe.recipeId ?? recipe.id,
      title: recipe.title,
      coverUrl: recipe.coverUrl,
    })),
    remindersEnabled: reminders.length > 0,
    reminders,
  };
}
