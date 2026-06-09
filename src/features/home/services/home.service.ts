import { simulateLatency } from "@/lib/api/simulate-latency";
import { getMockHomeSummary } from "@/features/home/services/mock-home-data";
import type { HomeSummary } from "@/features/home/types/home.types";

export async function fetchHomeSummary(
  referenceDate?: string,
): Promise<HomeSummary> {
  await simulateLatency();

  // TODO: Replace mocked response with real API integration
  // Example:
  // return apiClient.get<HomeSummar56py>("/home/summary", {
  //   params: { date: referenceDate },
  // });

  return getMockHomeSummary(referenceDate);
}
