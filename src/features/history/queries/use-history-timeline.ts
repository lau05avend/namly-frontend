"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { startOfMonth, subMonths } from "date-fns";
import { historyQueryKeys } from "@/features/history/constants/query-keys";
import { fetchHistoryMonthTimeline } from "@/features/history/services/history.service";
import { useAuth } from "@/hooks/use-auth";

export function useHistoryTimeline(anchorMonth: Date) {
  const { isAuthenticated } = useAuth();
  const anchor = startOfMonth(anchorMonth);

  return useInfiniteQuery({
    queryKey: [...historyQueryKeys.timeline(), anchor.toISOString()],
    queryFn: ({ pageParam }) => fetchHistoryMonthTimeline(pageParam),
    initialPageParam: anchor,
    getNextPageParam: (_lastPage, _pages, lastPageParam) =>
      subMonths(lastPageParam, 1),
    enabled: isAuthenticated,
  });
}
