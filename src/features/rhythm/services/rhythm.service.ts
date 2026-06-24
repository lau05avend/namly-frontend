import { getMockRhythmSummary } from "@/features/rhythm/services/mock-rhythm-data";
import type { RhythmSummary } from "@/features/rhythm/types/rhythm.types";
import { simulateLatency } from "@/lib/api/simulate-latency";

export async function fetchRhythmSummary(): Promise<RhythmSummary> {
  await simulateLatency();

  // TODO: Replace mocked response with real API integration
  return getMockRhythmSummary();
}
