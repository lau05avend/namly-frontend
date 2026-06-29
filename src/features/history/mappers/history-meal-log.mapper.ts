import { format } from "date-fns";
import { es } from "date-fns/locale";
import { HISTORY_COPY } from "@/features/history/constants/history-copy";
import type {
  MealLogDetailApiDto,
  MealLogDetailRecipeApiDto,
  MealLogScheduledMealApiDto,
  MealLogTagApiDto,
} from "@/features/history/types/history-api.types";
import type {
  HistoryMealLogDetail,
  HistoryMealLogRecipe,
  HistoryMealLogScheduledMeal,
  HistoryMealLogTag,
} from "@/features/history/types/history.types";

function formatLoggedAtTime(loggedAt: string, loggedAtTime?: string): string {
  if (loggedAtTime?.trim()) {
    return loggedAtTime;
  }

  return format(new Date(loggedAt), "h:mm a", { locale: es });
}

function mapRecipe(recipe: MealLogDetailRecipeApiDto): HistoryMealLogRecipe {
  return {
    id: recipe.id,
    recipeId: recipe.recipeId,
    title: recipe.title,
    coverUrl: recipe.coverUrl,
    sortOrder: recipe.sortOrder,
    durationMinutes: recipe.durationMinutes ?? null,
  };
}

function mapScheduledMeal(
  scheduledMeal: MealLogScheduledMealApiDto,
): HistoryMealLogScheduledMeal {
  return {
    id: scheduledMeal.id,
    entryDate: scheduledMeal.entryDate,
    plannedTime: scheduledMeal.plannedTime,
    isExpress: scheduledMeal.isExpress,
    expressNote: scheduledMeal.expressNote,
    mealTypeName: scheduledMeal.mealType.name,
    recipes: scheduledMeal.recipes
      .map(mapRecipe)
      .sort((left, right) => left.sortOrder - right.sortOrder),
  };
}

function mapTag(tag: MealLogTagApiDto): HistoryMealLogTag {
  return {
    id: tag.id,
    name: tag.name,
    iconName: tag.iconName,
  };
}

export function mapMealLogDetail(raw: MealLogDetailApiDto): HistoryMealLogDetail {
  const scheduledMeal = raw.scheduledMeal
    ? mapScheduledMeal(raw.scheduledMeal)
    : null;

  return {
    id: raw.id,
    mediaUrl: raw.mediaUrl,
    content: raw.content?.trim() ? raw.content.trim() : null,
    score: raw.score,
    loggedAt: raw.loggedAt,
    loggedAtTime: formatLoggedAtTime(raw.loggedAt, raw.loggedAtTime),
    mealTypeName: raw.mealType?.name ?? HISTORY_COPY.mealTitleFallback,
    mealTypeId: raw.mealType?.id ?? null,
    scheduledMeal,
    isLinkedToPlan: raw.isLinkedToPlan ?? scheduledMeal !== null,
    recipes: raw.recipes
      .map(mapRecipe)
      .sort((left, right) => left.sortOrder - right.sortOrder),
    tags: raw.tags.map(mapTag),
  };
}
