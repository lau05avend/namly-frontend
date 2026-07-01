import { NOTIFICATIONS_COPY } from "@/features/notifications/constants/notifications-copy";
import { Bell } from "lucide-react";

type NotificationsEmptyStateProps = {
  variant?: "all" | "unread";
};

export function NotificationsEmptyState({
  variant = "all",
}: NotificationsEmptyStateProps) {
  const isUnreadFilter = variant === "unread";

  return (
    <div className="flex flex-col items-center gap-3 px-4 py-10 text-center">
      <span className="flex size-14 shrink-0 items-center justify-center rounded-3xl bg-mint/70 text-primary">
        <Bell className="size-6" strokeWidth={2} aria-hidden />
      </span>

      <div className="flex flex-col items-center gap-1.5">
        <p className="text-sm font-medium leading-relaxed text-foreground/70">
          {isUnreadFilter
            ? NOTIFICATIONS_COPY.emptyUnreadTitle
            : NOTIFICATIONS_COPY.emptyTitle}
        </p>
        <p className="max-w-xs text-sm leading-relaxed text-foreground/45">
          {isUnreadFilter
            ? NOTIFICATIONS_COPY.emptyUnreadDescription
            : NOTIFICATIONS_COPY.emptyDescription}
        </p>
      </div>
    </div>
  );
}
