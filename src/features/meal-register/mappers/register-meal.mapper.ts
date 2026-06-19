import { REGISTER_MEAL_COPY } from "@/features/meal-register/constants/register-meal-copy";
import type { RegisterMealFormValues } from "@/features/meal-register/schemas/register-meal.schema";
import type {
  CreateMealLogApiPayload,
  ScheduledMealSuggestionApiDto,
} from "@/features/meal-register/types/register-meal-api.types";
import type {
  PlanMatchSuggestion,
  ScheduledMealSuggestion,
} from "@/features/meal-register/types/register-meal.types";
import { buildLoggedAtParam } from "@/features/meal-register/utils/register-meal-defaults";
import type { ScheduledMealApiDto } from "@/features/planner/types/planner-api.types";
import { formatPlannedTimeLabel } from "@/features/history/utils/history-meal-log-plan.utils";

export function resolveSuggestionDetail(
  suggestion: ScheduledMealSuggestion,
): string | null {
  if (suggestion.isExpress) {
    const note = suggestion.expressNote?.trim();
    return note || REGISTER_MEAL_COPY.plan.expressDetail;
  }

  if (suggestion.recipes.length > 0) {
    return suggestion.recipes.map((recipe) => recipe.title).join(", ");
  }

  return null;
}

export function resolveSuggestionSecondaryLine(
  suggestion: ScheduledMealSuggestion,
): string {
  const time = formatPlannedTimeLabel(suggestion.plannedTime);
  const detail = resolveSuggestionDetail(suggestion);

  if (detail) {
    return `${time} · ${detail}`;
  }

  return time;
}

export function mapScheduledMealApiToSuggestion(
  meal: ScheduledMealApiDto,
): ScheduledMealSuggestion {
  return {
    id: meal.id,
    plannedTime: meal.plannedTime,
    mealType: meal.mealType,
    recipes: (meal.recipes ?? []).map((recipe) => ({
      id: recipe.id,
      recipeId: recipe.recipeId,
      title: recipe.title,
      coverUrl: recipe.coverUrl,
      sortOrder: recipe.sortOrder,
    })),
    isExpress: meal.isExpress,
    expressNote: meal.expressNote,
  };
}

export function mapSuggestionApiToDomain(
  suggestion: ScheduledMealSuggestionApiDto,
): ScheduledMealSuggestion {
  return {
    id: suggestion.id,
    plannedTime: suggestion.plannedTime,
    mealType: suggestion.mealType,
    recipes: suggestion.recipes,
    isExpress: suggestion.isExpress,
    expressNote: suggestion.expressNote,
  };
}

export function toPlanMatchSuggestion(
  suggestion: ScheduledMealSuggestion,
): PlanMatchSuggestion {
  const detail =
    resolveSuggestionDetail(suggestion) ?? suggestion.mealType.name;

  return {
    id: suggestion.id,
    title: REGISTER_MEAL_COPY.plan.suggestedLabel,
    meta: `${suggestion.mealType.name} · ${formatPlannedTimeLabel(suggestion.plannedTime)}`,
    detail,
  };
}

export function mapSuggestionRecipesToForm(
  suggestion: ScheduledMealSuggestion,
): RegisterMealFormValues["recipes"] {
  return suggestion.recipes.map((recipe) => ({
    id: recipe.recipeId ?? recipe.id,
    title: recipe.title,
    coverUrl: recipe.coverUrl,
  }));
}

export function mapFormToCreateMealLogPayload(
  values: RegisterMealFormValues,
  mediaUrl: string,
  tagIds: string[] = [],
): CreateMealLogApiPayload {
  const payload: CreateMealLogApiPayload = {
    mediaUrl,
    loggedAt: buildLoggedAtParam(values.date, values.time),
  };

  if (values.planLinkStatus === "linked" && values.linkedPlanId) {
    payload.scheduledMealId = values.linkedPlanId;
  } else if (values.mealTypeId) {
    payload.mealTypeId = values.mealTypeId;
  }

  const note = values.note.trim();
  if (note) {
    payload.content = note;
  }

  if (values.recipes.length > 0) {
    payload.recipeIds = values.recipes.map((recipe) => recipe.id);
  }

  if (tagIds.length > 0) {
    payload.tagIds = tagIds;
  }

  return payload;
}
