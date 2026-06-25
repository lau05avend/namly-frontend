"use client";

import { useQuery } from "@tanstack/react-query";
import { plannerQueryKeys } from "@/features/planner/constants/query-keys";
import { useMealTypes } from "@/features/planner/queries/use-meal-types";
import { fetchPlannerScheduledMeal } from "@/features/planner/services/planner.service";
import { buildPlanMealDefaults } from "@/features/planner/utils/plan-meal-defaults";
import { buildPlanMealDefaultsFromDetail } from "@/features/planner/utils/plan-meal-edit-defaults";
import type { PlanMealDefaultsParams } from "@/features/planner/types/plan-meal.types";

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
        return buildPlanMealDefaultsFromDetail(detail);
      }

      return buildPlanMealDefaults(mealTypesQuery.data!, params);
    },
    enabled: isEditMode || Boolean(mealTypesQuery.data?.length),
  });
}
