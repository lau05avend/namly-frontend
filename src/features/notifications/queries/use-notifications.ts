"use client";

import { useQuery } from "@tanstack/react-query";
import { notificationsQueryKeys } from "@/features/notifications/constants/query-keys";
import { fetchNotifications } from "@/features/notifications/services/notifications.service";
import { useAuth } from "@/hooks/use-auth";

type UseNotificationsOptions = {
  enabled?: boolean;
  limit?: number;
};

export function useNotifications({
  enabled = true,
  limit = 50,
}: UseNotificationsOptions = {}) {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: notificationsQueryKeys.list(limit),
    queryFn: () => fetchNotifications(limit),
    enabled: isAuthenticated && enabled,
    staleTime: 30_000,
  });
}
