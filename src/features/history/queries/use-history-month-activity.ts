"use client";

import { useQuery } from "@tanstack/react-query";
import {
  historyQueryKeys,
  toMonthKey,
} from "@/features/history/constants/query-keys";
import { fetchHistoryMonthActivity } from "@/features/history/services/history.service";
import { useAuth } from "@/hooks/use-auth";

export function useHistoryMonthActivity(visibleMonth: Date) {
  const { isAuthenticated } = useAuth();
  const monthKey = toMonthKey(visibleMonth);

  return useQuery({
    queryKey: historyQueryKeys.monthActivity(monthKey),
    queryFn: () => fetchHistoryMonthActivity(visibleMonth),
    enabled: isAuthenticated,
  });
}
