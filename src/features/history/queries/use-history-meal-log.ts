"use client";

import { useQuery } from "@tanstack/react-query";
import { historyQueryKeys } from "@/features/history/constants/query-keys";
import { fetchHistoryMealLog } from "@/features/history/services/history.service";
import { useAuth } from "@/hooks/use-auth";

export function useHistoryMealLog(logId: string) {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: historyQueryKeys.mealLog(logId),
    queryFn: () => fetchHistoryMealLog(logId),
    enabled: isAuthenticated && Boolean(logId),
  });
}
