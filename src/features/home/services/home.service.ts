import { toDateKey } from "@/features/calendar/utils/date";
import { mapHomeApiResponse } from "@/features/home/mappers/home.mapper";
import type { HomeSummaryApiDto } from "@/features/home/types/home-api.types";
import type { HomeSummary } from "@/features/home/types/home.types";
import { apiClient } from "@/lib/api/api-client";

function resolveReferenceDate(referenceDate?: string): string {
  const debugDate = process.env.NEXT_PUBLIC_HOME_DEBUG_DATE?.trim();
  if (debugDate) {
    return debugDate;
  }

  return referenceDate ?? toDateKey(new Date());
}

export async function fetchHomeSummary(
  referenceDate?: string,
): Promise<HomeSummary> {
  const date = resolveReferenceDate(referenceDate);
  const raw = await apiClient<HomeSummaryApiDto>(
    `/api/v1/home?date=${encodeURIComponent(date)}`,
  );

  return mapHomeApiResponse(raw);
}
