import type { Notification } from "@/features/notifications/types/notifications.types";
import { formatNotificationTime } from "@/features/notifications/utils/format-notification-time";
import { cn } from "@/lib/utils";
type NotificationListItemProps = {
  notification: Notification;
  onPress: (notification: Notification) => void;
};

export function NotificationListItem({
  notification,
  onPress,
}: NotificationListItemProps) {
  const timeLabel = formatNotificationTime(notification.createdAt);

  return (
    <button
      type="button"
      onClick={() => onPress(notification)}
      className={cn(
        "flex w-full cursor-pointer items-start gap-3 rounded-2xl px-3 py-3.5 text-left transition-colors",
        notification.isRead
          ? "hover:bg-foreground/[0.03]"
          : "bg-mint/15 hover:bg-mint/25",
      )}
    >
      <span
        className={cn(
          "mt-2 size-2 shrink-0 rounded-full",
          notification.isRead ? "bg-transparent" : "bg-primary",
        )}
        aria-hidden
      />

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <p
            className={cn(
              "text-sm leading-snug text-foreground",
              !notification.isRead && "font-semibold",
            )}
          >
            {notification.title}
          </p>
          {timeLabel ? (
            <span className="shrink-0 text-xs text-foreground/45">{timeLabel}</span>
          ) : null}
        </div>

        {notification.body ? (
          <p className="mt-1 text-sm leading-snug text-foreground/55">
            {notification.body}
          </p>
        ) : null}
      </div>
    </button>
  );
}
