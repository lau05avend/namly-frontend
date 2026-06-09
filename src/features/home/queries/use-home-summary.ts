"use client";

import { useQuery } from "@tanstack/react-query";
import { homeQueryKeys } from "@/features/home/constants/query-keys";
import { fetchHomeSummary } from "@/features/home/services/home.service";

type UseHomeSummaryOptions = {
  referenceDate?: string;
};

export function useHomeSummary(options: UseHomeSummaryOptions = {}) {
  const { referenceDate } = options;

  return useQuery({
    queryKey: homeQueryKeys.summary(referenceDate),
    queryFn: () => fetchHomeSummary(referenceDate),
  });
}
