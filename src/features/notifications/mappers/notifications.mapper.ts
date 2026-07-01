import type {
  NotificationApiDto,
  NotificationsListApiDto,
  UnreadNotificationsCountApiDto,
} from "@/features/notifications/types/notifications-api.types";
import type { Notification } from "@/features/notifications/types/notifications.types";

function resolveScheduledMealId(dto: NotificationApiDto): string | undefined {
  if (dto.relatedEntityType === "scheduled_meal" && dto.relatedEntityId) {
    return dto.relatedEntityId;
  }

  return dto.scheduledMealId ?? dto.metadata?.scheduledMealId;
}

export function mapNotification(dto: NotificationApiDto): Notification {
  return {
    id: dto.id,
    type: dto.type,
    title: dto.title,
    body: dto.body,
    isRead: dto.isRead,
    createdAt: dto.createdAt,
    readAt: dto.readAt ?? null,
    relatedEntityType: dto.relatedEntityType ?? null,
    scheduledMealId: resolveScheduledMealId(dto),
    entryDate: dto.entryDate ?? dto.metadata?.entryDate,
  };
}

export function mapNotificationsList(
  response: NotificationsListApiDto,
): Notification[] {
  return response.map(mapNotification);
}

export function mapUnreadNotificationsCount(
  response: UnreadNotificationsCountApiDto,
): number {
  return response.unreadCount ?? response.count ?? 0;
}
