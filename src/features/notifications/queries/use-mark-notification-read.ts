"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationsQueryKeys } from "@/features/notifications/constants/query-keys";
import { markNotificationRead } from "@/features/notifications/services/notifications.service";

export function useMarkNotificationRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markNotificationRead,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: notificationsQueryKeys.all }),
      ]);
    },
  });
}
