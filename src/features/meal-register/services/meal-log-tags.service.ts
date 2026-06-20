import type { RegisterTagFormValue } from "@/features/meal-register/schemas/register-meal.schema";
import { createMealLogTags } from "@/features/tags/services/tags.service";

export async function resolveMealLogTagIds(
  tags: RegisterTagFormValue[],
): Promise<string[]> {
  const existingIds = tags
    .filter((tag) => !tag.isPending)
    .map((tag) => tag.id);

  const pendingTags = tags.filter((tag) => tag.isPending);
  if (pendingTags.length === 0) {
    return existingIds;
  }

  const created = await createMealLogTags(
    pendingTags.map((tag) => ({
      name: tag.name.trim(),
      iconName: null,
    })),
  );

  return [...existingIds, ...created.map((tag) => tag.id)];
}
