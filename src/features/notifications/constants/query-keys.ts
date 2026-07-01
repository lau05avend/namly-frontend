export const notificationsQueryKeys = {
  all: ["notifications"] as const,
  list: (limit?: number) =>
    [...notificationsQueryKeys.all, "list", limit ?? 50] as const,
  unreadCount: () => [...notificationsQueryKeys.all, "unread-count"] as const,
};
