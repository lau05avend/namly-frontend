import type { Tag } from "@/features/tags/types/tag.types";
import { apiClient } from "@/lib/api/api-client";

const RECIPE_TAG_CATEGORY = "recipes";

export async function fetchRecipeTags(): Promise<Tag[]> {
  return apiClient<Tag[]>(
    `/api/v1/tags?category=${encodeURIComponent(RECIPE_TAG_CATEGORY)}`,
  );
}
