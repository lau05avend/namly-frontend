import type { PlannerScheduledMealDetail } from "@/features/planner/types/planner-detail.types";
import type { PlanMealDefaults } from "@/features/planner/types/plan-meal.types";

export function normalizePlannedTimeForForm(plannedTime: string): string {
  const [hours, minutes] = plannedTime.split(":");

  if (!hours || !minutes) {
    return plannedTime;
  }

  return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
}

export function buildPlanMealDefaultsFromDetail(
  detail: PlannerScheduledMealDetail,
): PlanMealDefaults {
  return {
    date: detail.entryDate,
    time: normalizePlannedTimeForForm(detail.plannedTime),
    mealTypeId: detail.mealTypeId,
    entryMode: detail.isExpress ? "express" : "recipe",
    expressNote: detail.expressNote ?? "",
    recipes: detail.recipes.map((recipe) => ({
      id: recipe.recipeId ?? recipe.id,
      title: recipe.title,
      coverUrl: recipe.coverUrl,
    })),
    remindersEnabled: false,
    reminders: [],
  };
}
