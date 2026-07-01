export type NotificationApiDto = {
  id: string;
  type: string;
  title: string;
  body: string;
  isRead: boolean;
  createdAt: string;
  readAt?: string | null;
  relatedEntityId?: string | null;
  relatedEntityType?: string | null;
  scheduledMealId?: string;
  entryDate?: string;
  metadata?: NotificationMetadataApiDto | null;
};

export type NotificationMetadataApiDto = {
  scheduledMealId?: string;
  entryDate?: string;
};

export type NotificationsListApiDto = NotificationApiDto[];

export type UnreadNotificationsCountApiDto = {
  unreadCount?: number;
  count?: number;
};
