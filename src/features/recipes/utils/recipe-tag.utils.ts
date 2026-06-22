export function normalizeRecipeTagName(name: string): string {
  return name.trim().toLocaleLowerCase("es");
}

export function recipeTagNameExists(
  name: string,
  availableNames: Iterable<string>,
  selectedNames: Iterable<string>,
): boolean {
  const normalized = normalizeRecipeTagName(name);
  if (!normalized) {
    return false;
  }

  for (const candidate of availableNames) {
    if (normalizeRecipeTagName(candidate) === normalized) {
      return true;
    }
  }

  for (const candidate of selectedNames) {
    if (normalizeRecipeTagName(candidate) === normalized) {
      return true;
    }
  }

  return false;
}

export function recipeTagNameExistsExcluding(
  name: string,
  excludeTagId: string,
  availableTags: Iterable<{ id: string; name: string }>,
  draftTags: Iterable<{ id: string; name: string }>,
): boolean {
  const normalized = normalizeRecipeTagName(name);
  if (!normalized) {
    return false;
  }

  for (const tag of availableTags) {
    if (
      tag.id !== excludeTagId &&
      normalizeRecipeTagName(tag.name) === normalized
    ) {
      return true;
    }
  }

  for (const tag of draftTags) {
    if (
      tag.id !== excludeTagId &&
      normalizeRecipeTagName(tag.name) === normalized
    ) {
      return true;
    }
  }

  return false;
}
