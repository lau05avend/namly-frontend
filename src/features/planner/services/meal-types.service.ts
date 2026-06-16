import type { MealType } from "@/features/planner/types/meal-type.types";
import { apiClient } from "@/lib/api/api-client";

export async function fetchMealTypes(): Promise<MealType[]> {
  const mealTypes = await apiClient<MealType[]>("/api/v1/meal-types");

  return [...mealTypes].sort((left, right) => left.sortOrder - right.sortOrder);
}
