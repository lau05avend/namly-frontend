"use client";

import { useQuery } from "@tanstack/react-query";
import { historyQueryKeys } from "@/features/history/constants/query-keys";
import { fetchHistoryDay } from "@/features/history/services/history.service";
import { useAuth } from "@/hooks/use-auth";

export function useHistoryDay(dateKey: string) {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: historyQueryKeys.day(dateKey),
    queryFn: () => fetchHistoryDay(dateKey),
    enabled: isAuthenticated && Boolean(dateKey),
  });
}
