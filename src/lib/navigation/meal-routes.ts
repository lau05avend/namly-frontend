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
