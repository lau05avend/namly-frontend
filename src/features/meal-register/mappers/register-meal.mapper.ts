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

export function mapSuggestionApiToDomain(
  suggestion: ScheduledMealSuggestionApiDto,
): ScheduledMealSuggestion {
  return {
    id: suggestion.id,
    plannedTime: suggestion.plannedTime,
    mealType: suggestion.mealType,
    recipes: suggestion.recipes,
    isExpress: suggestion.isExpress,
  };
}

export function toPlanMatchSuggestion(
  suggestion: ScheduledMealSuggestion,
): PlanMatchSuggestion {
  const recipeTitles = suggestion.recipes
    .map((recipe) => recipe.title.trim())
    .filter(Boolean);

  const detail = suggestion.isExpress
    ? REGISTER_MEAL_COPY.plan.expressDetail
    : recipeTitles.length > 0
      ? recipeTitles.join(", ")
      : suggestion.mealType.name;

  return {
    id: suggestion.id,
    title: REGISTER_MEAL_COPY.plan.matchTitle,
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
