import { format } from "date-fns";
import type { HistoryMealLogDetail } from "@/features/history/types/history.types";
import type { RegisterMealFormValues } from "@/features/meal-register/schemas/register-meal.schema";
import type { ScheduledMealSuggestion } from "@/features/meal-register/types/register-meal.types";
import { mapScoreToMood } from "@/features/meal-register/utils/mood.utils";

export function mapMealLogDetailToFormValues(
  log: HistoryMealLogDetail,
): RegisterMealFormValues {
  const loggedAt = new Date(log.loggedAt);
  const isLinked = log.isLinkedToPlan && log.scheduledMeal !== null;

  return {
    photoUrl: log.mediaUrl ?? "",
    note: log.content ?? "",
    mood: mapScoreToMood(log.score),
    date: log.loggedAt.slice(0, 10),
    time: format(loggedAt, "HH:mm"),
    mealTypeId: log.mealTypeId ?? "",
    planLinkStatus: isLinked ? "linked" : "none",
    linkedPlanId: log.scheduledMeal?.id,
    recipes: log.recipes.map((recipe) => ({
      id: recipe.recipeId,
      title: recipe.title,
      coverUrl: recipe.coverUrl,
      durationMinutes: null,
    })),
    tags: log.tags.map((tag) => ({
      id: tag.id,
      name: tag.name,
      iconName: tag.iconName,
    })),
  };
}

export function mapMealLogDetailToLinkedSuggestion(
  log: HistoryMealLogDetail,
): ScheduledMealSuggestion | null {
  if (!log.scheduledMeal || !log.mealTypeId) {
    return null;
  }

  const { scheduledMeal } = log;

  return {
    id: scheduledMeal.id,
    plannedTime: scheduledMeal.plannedTime,
    mealType: {
      id: log.mealTypeId,
      name: scheduledMeal.mealTypeName,
      sortOrder: 0,
    },
    recipes: scheduledMeal.recipes.map((recipe) => ({
      id: recipe.id,
      recipeId: recipe.recipeId,
      title: recipe.title,
      coverUrl: recipe.coverUrl,
      sortOrder: recipe.sortOrder,
    })),
    isExpress: scheduledMeal.isExpress,
    expressNote: scheduledMeal.expressNote,
  };
}
