"use client";

import { useQuery } from "@tanstack/react-query";
import { plannerQueryKeys } from "@/features/planner/constants/query-keys";
import { fetchAllMealTypes } from "@/features/planner/services/meal-types.service";
import { useAuth } from "@/hooks/use-auth";

export function useMealTypes() {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: plannerQueryKeys.mealTypesAll(),
    queryFn: fetchAllMealTypes,
    enabled: isAuthenticated,
  });
}
