import type { MeasurementUnit } from "@/features/recipes/types/measurement-unit.types";
import { apiClient } from "@/lib/api/api-client";

export async function fetchMeasurementUnits(): Promise<MeasurementUnit[]> {
  return apiClient<MeasurementUnit[]>("/api/v1/measurement-units");
}
