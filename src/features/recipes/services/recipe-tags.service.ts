import type { CreateRecipeTagFormValue } from "@/features/recipes/schemas/create-recipe.schema";
import { createRecipeTags } from "@/features/tags/services/tags.service";

/** Fallback for recipe save if any pending tags remain in form state. */
export async function resolveRecipeTagIds(
  tags: CreateRecipeTagFormValue[],
): Promise<string[]> {
  const pending = tags.filter((tag) => tag.isPending);

  if (pending.length === 0) {
    return tags.map((tag) => tag.id);
  }

  const created = await createRecipeTags(
    pending.map((tag) => ({
      name: tag.name.trim(),
      iconName: null,
    })),
  );

  const pendingIds = new Set(pending.map((tag) => tag.id));
  const existingIds = tags
    .filter((tag) => !pendingIds.has(tag.id))
    .map((tag) => tag.id);

  return [...existingIds, ...created.map((tag) => tag.id)];
}
