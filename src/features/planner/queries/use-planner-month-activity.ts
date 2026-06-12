"use client";

import { useQuery } from "@tanstack/react-query";
import {
  plannerQueryKeys,
  toMonthKey,
} from "@/features/planner/constants/query-keys";
import { fetchPlannerMonthActivity } from "@/features/planner/services/planner.service";
import { useAuth } from "@/hooks/use-auth";

export function usePlannerMonthActivity(visibleMonth: Date) {
  const { isAuthenticated } = useAuth();
  const monthKey = toMonthKey(visibleMonth);

  return useQuery({
    queryKey: plannerQueryKeys.monthActivity(monthKey),
    queryFn: () => fetchPlannerMonthActivity(visibleMonth),
    enabled: isAuthenticated,
  });
}
