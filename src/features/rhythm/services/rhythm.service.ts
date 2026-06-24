import { mapRhythmApiResponse } from "@/features/rhythm/mappers/rhythm.mapper";
import type { RhythmAnalyticsApiDto } from "@/features/rhythm/types/rhythm-api.types";
import type { RhythmSummary } from "@/features/rhythm/types/rhythm.types";
import { getCurrentWeekStart } from "@/features/rhythm/utils/rhythm-week.utils";
import { apiClient } from "@/lib/api/api-client";

export async function fetchRhythmAnalytics(
  weekStart?: string,
): Promise<RhythmSummary> {
  const resolvedWeekStart = weekStart ?? getCurrentWeekStart();
  const raw = await apiClient<RhythmAnalyticsApiDto>(
    `/api/v1/analytics/rhythm?weekStart=${encodeURIComponent(resolvedWeekStart)}`,
  );

  return mapRhythmApiResponse(raw);
}
