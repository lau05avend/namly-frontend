"use client";

import { useQuery } from "@tanstack/react-query";
import { measurementUnitQueryKeys } from "@/features/recipes/constants/measurement-unit-query-keys";
import { fetchMeasurementUnits } from "@/features/recipes/services/measurement-units.service";

export function useMeasurementUnits() {
  return useQuery({
    queryKey: measurementUnitQueryKeys.list(),
    queryFn: fetchMeasurementUnits,
    staleTime: 1000 * 60 * 30,
  });
}
