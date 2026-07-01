import type { Notification } from "@/features/notifications/types/notifications.types";
import { fetchPlannerScheduledMeal } from "@/features/planner/services/planner.service";
import { buildPlannerEntryPath } from "@/lib/navigation/meal-routes";

function resolveNotificationEntryDate(notification: Notification): string | undefined {
  if (notification.entryDate) {
    return notification.entryDate;
  }

  if (!notification.createdAt) {
    return undefined;
  }

  const datePrefix = notification.createdAt.slice(0, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(datePrefix) ? datePrefix : undefined;
}

export async function resolveNotificationHref(
  notification: Notification,
  returnTo?: string,
): Promise<string | null> {
  if (!notification.scheduledMealId) {
    return null;
  }

  let entryDate = resolveNotificationEntryDate(notification);

  if (!entryDate) {
    try {
      const detail = await fetchPlannerScheduledMeal(notification.scheduledMealId);
      entryDate = detail.entryDate;
    } catch {
      return null;
    }
  }

  return buildPlannerEntryPath(
    notification.scheduledMealId,
    entryDate,
    returnTo,
  );
}
