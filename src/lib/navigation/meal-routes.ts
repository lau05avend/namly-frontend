export const HOME_PATH = "/home";

export function buildMealLogPath(
  logId: string,
  dateKey: string,
  returnTo?: string | null,
): string {
  const params = new URLSearchParams({ date: dateKey });

  if (returnTo?.trim()) {
    params.set("returnTo", returnTo.trim());
  }

  return `/history/meals/${logId}?${params.toString()}`;
}

export function buildPlannerEntryPath(
  scheduledMealId: string,
  dateKey: string,
  returnTo?: string | null,
): string {
  const params = new URLSearchParams({ date: dateKey });

  if (returnTo?.trim()) {
    params.set("returnTo", returnTo.trim());
  }

  return `/planner/${scheduledMealId}?${params.toString()}`;
}

export function buildPlanMealEditPath(
  scheduledMealId: string,
  returnTo?: string | null,
): string {
  const params = new URLSearchParams({ edit: scheduledMealId });

  if (returnTo?.trim()) {
    params.set("returnTo", returnTo.trim());
  }

  return `/planner/plan?${params.toString()}`;
}

export function buildRecipeDetailPath(
  recipeId: string,
  returnTo?: string | null,
): string {
  if (!returnTo?.trim()) {
    return `/recipes/${recipeId}`;
  }

  const params = new URLSearchParams({ returnTo: returnTo.trim() });
  return `/recipes/${recipeId}?${params.toString()}`;
}

export function buildRecipeEditPath(
  recipeId: string,
  returnTo?: string | null,
): string {
  if (!returnTo?.trim()) {
    return `/recipes/${recipeId}/edit`;
  }

  const params = new URLSearchParams({ returnTo: returnTo.trim() });
  return `/recipes/${recipeId}/edit?${params.toString()}`;
}
