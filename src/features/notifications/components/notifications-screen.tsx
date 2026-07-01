"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FormScreenHeader } from "@/components/navigation/form-screen-header";
import { TabBar } from "@/components/navigation/tab-bar";
import { NotificationListItem } from "@/features/notifications/components/notification-list-item";
import { NotificationsEmptyState } from "@/features/notifications/components/notifications-empty-state";
import { NOTIFICATIONS_COPY } from "@/features/notifications/constants/notifications-copy";
import { useMarkAllNotificationsRead } from "@/features/notifications/queries/use-mark-all-notifications-read";
import { useMarkNotificationRead } from "@/features/notifications/queries/use-mark-notification-read";
import { useNotifications } from "@/features/notifications/queries/use-notifications";
import type { Notification } from "@/features/notifications/types/notifications.types";
import { resolveNotificationHref } from "@/features/notifications/utils/resolve-notification-href";
import { navigateToInternalPath } from "@/lib/navigation/to-app-navigation-href";
import { HOME_PATH } from "@/lib/navigation/meal-routes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type NotificationFilter = "all" | "unread";

function NotificationsListSkeleton() {
  return (
    <div className="flex flex-col gap-2" aria-busy="true">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex items-start gap-3 rounded-2xl px-3 py-3.5">
          <Skeleton circle width={8} height={8} />
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <Skeleton width="70%" height={14} borderRadius={6} />
            <Skeleton width="90%" height={12} borderRadius={6} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function NotificationsScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState<NotificationFilter>("all");
  const { data: notifications = [], isPending, isError } = useNotifications();
  const markReadMutation = useMarkNotificationRead();
  const markAllReadMutation = useMarkAllNotificationsRead();

  const unreadCount = useMemo(
    () => notifications.filter((notification) => !notification.isRead).length,
    [notifications],
  );

  const visibleNotifications = useMemo(
    () =>
      filter === "unread"
        ? notifications.filter((notification) => !notification.isRead)
        : notifications,
    [filter, notifications],
  );

  const hasUnread = unreadCount > 0;

  const filterTabs = useMemo(
    () => [
      { id: "all" as const, label: NOTIFICATIONS_COPY.filters.all },
      {
        id: "unread" as const,
        label:
          unreadCount > 0
            ? `${NOTIFICATIONS_COPY.filters.unread} (${unreadCount})`
            : NOTIFICATIONS_COPY.filters.unread,
      },
    ],
    [unreadCount],
  );

  const handleBack = () => {
    router.push(HOME_PATH);
  };

  const handleNotificationPress = async (notification: Notification) => {
    const href = await resolveNotificationHref(notification, "/notifications");

    if (!href) {
      return;
    }

    if (!notification.isRead) {
      markReadMutation.mutate(notification.id);
    }

    navigateToInternalPath(router, href, "push");
  };

  const handleMarkAllRead = () => {
    if (!hasUnread || markAllReadMutation.isPending) {
      return;
    }

    markAllReadMutation.mutate();
  };

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col bg-background">
      <FormScreenHeader
        title={NOTIFICATIONS_COPY.title}
        backLabel={NOTIFICATIONS_COPY.back}
        onBack={handleBack}
        hideSave
      />

      <main className="flex min-h-0 flex-1 flex-col px-4 pt-3 pb-safe">
        <div className="mb-4 flex flex-col gap-3">
          <TabBar
            items={filterTabs}
            activeId={filter}
            onChange={setFilter}
            align="stretch"
            className="-mx-4 px-4"
          />

          {hasUnread ? (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleMarkAllRead}
                disabled={markAllReadMutation.isPending}
                className="cursor-pointer text-sm font-medium text-primary transition-colors hover:text-primary/80 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {NOTIFICATIONS_COPY.markAllRead}
              </button>
            </div>
          ) : null}
        </div>

        {isPending ? <NotificationsListSkeleton /> : null}

        {isError ? (
          <p className="py-10 text-center text-sm text-foreground/55">
            {NOTIFICATIONS_COPY.loadError}
          </p>
        ) : null}

        {!isPending && !isError && visibleNotifications.length === 0 ? (
          <NotificationsEmptyState variant={filter} />
        ) : null}

        {!isPending && !isError && visibleNotifications.length > 0 ? (
          <ul className="flex flex-col gap-1">
            {visibleNotifications.map((notification) => (
              <li key={notification.id}>
                <NotificationListItem
                  notification={notification}
                  onPress={handleNotificationPress}
                />
              </li>
            ))}
          </ul>
        ) : null}
      </main>
    </div>
  );
}
