import type {
  CreateTagInput,
  CreateTagsPayload,
  Tag,
} from "@/features/tags/types/tag.types";
import { apiClient } from "@/lib/api/api-client";

export const RECIPE_TAG_CATEGORY = "recipes";
export const MEAL_LOG_TAG_CATEGORY = "meal_logs";

export async function fetchTagsByCategory(category: string): Promise<Tag[]> {
  return apiClient<Tag[]>(
    `/api/v1/tags?category=${encodeURIComponent(category)}`,
  );
}

export async function fetchRecipeTags(): Promise<Tag[]> {
  return fetchTagsByCategory(RECIPE_TAG_CATEGORY);
}

export async function fetchMealLogTags(): Promise<Tag[]> {
  return fetchTagsByCategory(MEAL_LOG_TAG_CATEGORY);
}

export async function createMealLogTags(
  tags: CreateTagInput[],
): Promise<Tag[]> {
  if (tags.length === 0) {
    return [];
  }

  const payload: CreateTagsPayload = {
    category: MEAL_LOG_TAG_CATEGORY,
    tags,
  };

  return apiClient<Tag[]>("/api/v1/tags", {
    method: "POST",
    body: payload,
  });
}
