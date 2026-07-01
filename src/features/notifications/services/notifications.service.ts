import {
  mapNotificationsList,
  mapUnreadNotificationsCount,
} from "@/features/notifications/mappers/notifications.mapper";
import type {
  NotificationsListApiDto,
  UnreadNotificationsCountApiDto,
} from "@/features/notifications/types/notifications-api.types";
import type { Notification } from "@/features/notifications/types/notifications.types";
import { apiClient } from "@/lib/api/api-client";

const DEFAULT_LIMIT = 50;
const MIN_LIMIT = 1;
const MAX_LIMIT = 50;

function clampLimit(limit: number): number {
  return Math.min(MAX_LIMIT, Math.max(MIN_LIMIT, limit));
}

export async function fetchNotifications(
  limit = DEFAULT_LIMIT,
): Promise<Notification[]> {
  const safeLimit = clampLimit(limit);
  const response = await apiClient<NotificationsListApiDto>(
    `/api/v1/notifications?limit=${safeLimit}`,
  );

  return mapNotificationsList(response);
}

export async function fetchUnreadNotificationsCount(): Promise<number> {
  const response = await apiClient<UnreadNotificationsCountApiDto>(
    "/api/v1/notifications/unread-count",
  );

  return mapUnreadNotificationsCount(response);
}

export async function markNotificationRead(notificationId: string): Promise<void> {
  await apiClient<void>(`/api/v1/notifications/${notificationId}/read`, {
    method: "PATCH",
  });
}

export async function markAllNotificationsRead(): Promise<void> {
  await apiClient<void>("/api/v1/notifications/read-all", {
    method: "PATCH",
  });
}
