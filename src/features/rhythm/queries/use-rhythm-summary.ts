"use client";

import { useQuery } from "@tanstack/react-query";
import { rhythmQueryKeys } from "@/features/rhythm/constants/query-keys";
import { fetchRhythmSummary } from "@/features/rhythm/services/rhythm.service";

export function useRhythmSummary() {
  return useQuery({
    queryKey: rhythmQueryKeys.summary(),
    queryFn: fetchRhythmSummary,
  });
}
