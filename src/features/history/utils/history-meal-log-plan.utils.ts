import type { HistoryMealLogScheduledMeal } from "@/features/history/types/history.types";

export function formatPlannedTimeLabel(plannedTime: string): string {
  const [hours, minutes] = plannedTime.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);

  return date.toLocaleTimeString("es", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function resolveScheduledMealDetail(
  scheduledMeal: HistoryMealLogScheduledMeal,
): string | null {
  if (scheduledMeal.isExpress && scheduledMeal.expressNote?.trim()) {
    return scheduledMeal.expressNote.trim();
  }

  if (scheduledMeal.recipes.length > 0) {
    return scheduledMeal.recipes.map((recipe) => recipe.title).join(", ");
  }

  return null;
}
