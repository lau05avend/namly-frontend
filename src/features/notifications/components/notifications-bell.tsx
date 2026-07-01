"use client";

import { useRouter } from "next/navigation";
import { NOTIFICATIONS_COPY } from "@/features/notifications/constants/notifications-copy";
import { useUnreadNotificationsCount } from "@/features/notifications/queries/use-unread-notifications-count";
import { cn } from "@/lib/utils";
import { Bell } from "lucide-react";

type NotificationsBellProps = {
  className?: string;
};

export function NotificationsBell({ className }: NotificationsBellProps) {
  const router = useRouter();
  const { data: unreadCount = 0 } = useUnreadNotificationsCount();
  const showBadge = unreadCount > 0;
  const badgeLabel =
    unreadCount > 9 ? "9+" : unreadCount > 0 ? String(unreadCount) : null;

  return (
    <button
      type="button"
      aria-label={
        showBadge
          ? NOTIFICATIONS_COPY.unreadBadge(unreadCount)
          : NOTIFICATIONS_COPY.bellAriaLabel
      }
      onClick={() => router.push("/notifications")}
      className={cn(
        "relative flex size-10 cursor-pointer items-center justify-center rounded-full bg-card text-foreground/60 transition-colors hover:bg-mint/50",
        className,
      )}
    >
      <Bell className="size-5" aria-hidden="true" />

      {badgeLabel ? (
        <span className="absolute -top-0.5 -right-0.5 flex min-w-4 items-center justify-center rounded-full bg-cta px-1 py-0.5 text-[10px] font-bold leading-none text-white">
          {badgeLabel}
        </span>
      ) : null}
    </button>
  );
}
