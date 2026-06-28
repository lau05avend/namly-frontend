"use client";

import { useQuery } from "@tanstack/react-query";
import { HABITUAL_MEAL_TYPES_LIMIT } from "@/features/planner/constants/meal-type.constants";
import { plannerQueryKeys } from "@/features/planner/constants/query-keys";
import { fetchFrequentMealTypes } from "@/features/planner/services/meal-types.service";
import { useAuth } from "@/hooks/use-auth";

export function useFrequentMealTypes(
  limit: number = HABITUAL_MEAL_TYPES_LIMIT,
) {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: plannerQueryKeys.mealTypesFrequent(limit),
    queryFn: () => fetchFrequentMealTypes(limit),
    enabled: isAuthenticated,
  });
}
