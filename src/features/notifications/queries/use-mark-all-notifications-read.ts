"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationsQueryKeys } from "@/features/notifications/constants/query-keys";
import { markAllNotificationsRead } from "@/features/notifications/services/notifications.service";

export function useMarkAllNotificationsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markAllNotificationsRead,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: notificationsQueryKeys.all }),
      ]);
    },
  });
}
