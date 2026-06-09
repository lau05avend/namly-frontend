"use client";

import { useQuery } from "@tanstack/react-query";
import { plannerQueryKeys } from "@/features/planner/constants/query-keys";
import { fetchPlanMealDefaults } from "@/features/planner/services/plan-meal.service";
import type { PlanMealDefaultsParams } from "@/features/planner/types/plan-meal.types";

export function usePlanMealDefaults(params?: PlanMealDefaultsParams) {
  return useQuery({
    queryKey: plannerQueryKeys.planDefaults(params?.date, params?.mealSlot),
    queryFn: () => fetchPlanMealDefaults(params),
  });
}
