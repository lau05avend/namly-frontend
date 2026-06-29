"use client";

import { useQuery } from "@tanstack/react-query";
import { plannerQueryKeys } from "@/features/planner/constants/query-keys";
import { useMealTypes } from "@/features/planner/queries/use-meal-types";
import { fetchPlannerScheduledMeal } from "@/features/planner/services/planner.service";
import { buildPlanMealDefaults } from "@/features/planner/utils/plan-meal-defaults";
import { buildPlanMealDefaultsFromDetail } from "@/features/planner/utils/plan-meal-edit-defaults";
import type {
  PlanMealDefaults,
  PlanMealDefaultsParams,
} from "@/features/planner/types/plan-meal.types";
import { fetchRecipes } from "@/features/recipes/services/recipes.service";
import type { RecipeListItem } from "@/features/recipes/types/recipe.types";

function enrichRecipesWithDurations(
  defaults: PlanMealDefaults,
  catalog: RecipeListItem[],
): PlanMealDefaults {
  if (defaults.recipes.length === 0) {
    return defaults;
  }

  const durationById = new Map(
    catalog.map((recipe) => [recipe.id, recipe.durationMinutes]),
  );

  return {
    ...defaults,
    recipes: defaults.recipes.map((recipe) => ({
      ...recipe,
      durationMinutes: durationById.get(recipe.id) ?? null,
    })),
  };
}

export function usePlanMealDefaults(params?: PlanMealDefaultsParams) {
  const mealTypesQuery = useMealTypes();
  const scheduledMealId = params?.scheduledMealId;
  const isEditMode = Boolean(scheduledMealId);

  return useQuery({
    queryKey: plannerQueryKeys.planDefaults(
      params?.date,
      params?.mealTypeId ?? params?.mealSlot,
      scheduledMealId,
    ),
    queryFn: async () => {
      if (scheduledMealId) {
        const detail = await fetchPlannerScheduledMeal(scheduledMealId);
        const defaults = buildPlanMealDefaultsFromDetail(detail);

        if (defaults.recipes.length === 0) {
          return defaults;
        }

        const catalog = await fetchRecipes();
        return enrichRecipesWithDurations(defaults, catalog);
      }

      return buildPlanMealDefaults(mealTypesQuery.data!, params);
    },
    enabled: isEditMode || Boolean(mealTypesQuery.data?.length),
  });
}
