import type { MealType } from "@/features/planner/types/meal-type.types";
import type {
  CreateMealTypePayload,
  UpdateMealTypePayload,
} from "@/features/planner/types/meal-type-api.types";
import { apiClient } from "@/lib/api/api-client";

type MealTypeApiResponse = {
  id: string;
  name: string;
  sortOrder: number;
  isFrequent?: boolean;
  isHabitual?: boolean;
  frequent?: boolean;
};

type MealTypeListParams = {
  view: "frequent" | "all";
  limit?: number;
};

function mapMealType(mealType: MealTypeApiResponse): MealType {
  return {
    id: mealType.id,
    name: mealType.name,
    sortOrder: mealType.sortOrder,
    isFrequent:
      mealType.isFrequent ?? mealType.isHabitual ?? mealType.frequent,
  };
}

function mapMealTypes(mealTypes: MealTypeApiResponse[]): MealType[] {
  return mealTypes.map(mapMealType);
}

function buildMealTypesEndpoint(params?: MealTypeListParams): string {
  if (!params) {
    return "/api/v1/meal-types";
  }

  const search = new URLSearchParams({ view: params.view });

  if (params.limit !== undefined) {
    search.set("limit", String(params.limit));
  }

  return `/api/v1/meal-types?${search.toString()}`;
}

export async function fetchFrequentMealTypes(
  limit: number,
): Promise<MealType[]> {
  const mealTypes = await apiClient<MealTypeApiResponse[]>(
    buildMealTypesEndpoint({ view: "frequent", limit }),
  );

  return mapMealTypes(mealTypes);
}

export async function fetchAllMealTypes(): Promise<MealType[]> {
  const mealTypes = await apiClient<MealTypeApiResponse[]>(
    buildMealTypesEndpoint({ view: "all" }),
  );

  return mapMealTypes(mealTypes).sort(
    (left, right) => left.sortOrder - right.sortOrder,
  );
}

export async function createMealType(
  payload: CreateMealTypePayload,
): Promise<MealType> {
  return apiClient<MealType>("/api/v1/meal-types", {
    method: "POST",
    body: {
      name: payload.name.trim(),
      sortOrder: payload.sortOrder,
    },
  });
}

export async function updateMealType(
  mealTypeId: string,
  payload: UpdateMealTypePayload,
): Promise<MealType> {
  return apiClient<MealType>(`/api/v1/meal-types/${mealTypeId}`, {
    method: "PATCH",
    body: {
      name: payload.name.trim(),
      sortOrder: payload.sortOrder,
    },
  });
}

export async function deleteMealType(mealTypeId: string): Promise<void> {
  await apiClient<void>(`/api/v1/meal-types/${mealTypeId}`, {
    method: "DELETE",
  });
}
