"use client";

import { useQuery } from "@tanstack/react-query";
import { plannerQueryKeys } from "@/features/planner/constants/query-keys";
import { fetchPlannerDay } from "@/features/planner/services/planner.service";
import { useAuth } from "@/hooks/use-auth";

export function usePlannerDay(dateKey: string) {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: plannerQueryKeys.day(dateKey),
    queryFn: () => fetchPlannerDay(dateKey),
    enabled: isAuthenticated && Boolean(dateKey),
  });
}
