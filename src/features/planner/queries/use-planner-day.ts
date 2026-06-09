"use client";

import { useQuery } from "@tanstack/react-query";
import { plannerQueryKeys } from "@/features/planner/constants/query-keys";
import { fetchPlannerDay } from "@/features/planner/services/planner.service";

export function usePlannerDay(dateKey: string) {
  return useQuery({
    queryKey: plannerQueryKeys.day(dateKey),
    queryFn: () => fetchPlannerDay(dateKey),
    enabled: Boolean(dateKey),
  });
}
