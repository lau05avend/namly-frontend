"use client";

import { useQuery } from "@tanstack/react-query";
import { plannerQueryKeys } from "@/features/planner/constants/query-keys";
import { fetchPlannerScheduledMeal } from "@/features/planner/services/planner.service";
import { useAuth } from "@/hooks/use-auth";

export function usePlannerScheduledMeal(scheduledMealId: string) {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: plannerQueryKeys.scheduledMeal(scheduledMealId),
    queryFn: () => fetchPlannerScheduledMeal(scheduledMealId),
    enabled: isAuthenticated && Boolean(scheduledMealId),
  });
}
