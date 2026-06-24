"use client";

import { useQuery } from "@tanstack/react-query";
import { plannerQueryKeys } from "@/features/planner/constants/query-keys";
import { useMealTypes } from "@/features/planner/queries/use-meal-types";
import { buildPlanMealDefaults } from "@/features/planner/utils/plan-meal-defaults";
import type { PlanMealDefaultsParams } from "@/features/planner/types/plan-meal.types";

export function usePlanMealDefaults(params?: PlanMealDefaultsParams) {
  const mealTypesQuery = useMealTypes();

  return useQuery({
    queryKey: plannerQueryKeys.planDefaults(
      params?.date,
      params?.mealTypeId ?? params?.mealSlot,
    ),
    queryFn: () => buildPlanMealDefaults(mealTypesQuery.data!, params),
    enabled: Boolean(mealTypesQuery.data?.length),
  });
}
