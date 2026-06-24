"use client";

import { useQuery } from "@tanstack/react-query";
import { rhythmQueryKeys } from "@/features/rhythm/constants/query-keys";
import { fetchRhythmAnalytics } from "@/features/rhythm/services/rhythm.service";
import { getCurrentWeekStart } from "@/features/rhythm/utils/rhythm-week.utils";

type UseRhythmAnalyticsOptions = {
  weekStart?: string;
};

export function useRhythmAnalytics(options: UseRhythmAnalyticsOptions = {}) {
  const weekStart = options.weekStart ?? getCurrentWeekStart();

  return useQuery({
    queryKey: rhythmQueryKeys.analytics(weekStart),
    queryFn: () => fetchRhythmAnalytics(weekStart),
  });
}
