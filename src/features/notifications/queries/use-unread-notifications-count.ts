"use client";

import { useQuery } from "@tanstack/react-query";
import { notificationsQueryKeys } from "@/features/notifications/constants/query-keys";
import { fetchUnreadNotificationsCount } from "@/features/notifications/services/notifications.service";
import { useAuth } from "@/hooks/use-auth";

export function useUnreadNotificationsCount() {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: notificationsQueryKeys.unreadCount(),
    queryFn: fetchUnreadNotificationsCount,
    enabled: isAuthenticated,
    staleTime: 30_000,
    refetchOnWindowFocus: true,
  });
}
