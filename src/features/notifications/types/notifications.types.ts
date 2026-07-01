export type Notification = {
  id: string;
  type: string;
  title: string;
  body: string;
  isRead: boolean;
  createdAt: string;
  readAt: string | null;
  relatedEntityType: string | null;
  scheduledMealId?: string;
  entryDate?: string;
};
