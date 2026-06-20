"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { historyQueryKeys } from "@/features/history/constants/query-keys";
import { deleteHistoryMealLog } from "@/features/history/services/history.service";
import { homeQueryKeys } from "@/features/home/constants/query-keys";
import { plannerQueryKeys } from "@/features/planner/constants/query-keys";
import { useAuth } from "@/hooks/use-auth";

type DeleteMealLogVariables = {
  logId: string;
  dateKey: string;
};

export function useDeleteMealLog() {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();

  return useMutation({
    mutationFn: ({ logId }: DeleteMealLogVariables) => {
      if (!isAuthenticated) {
        throw new Error("Debes iniciar sesión para eliminar.");
      }

      return deleteHistoryMealLog(logId);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: homeQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: plannerQueryKeys.all });
      queryClient.invalidateQueries({
        queryKey: historyQueryKeys.day(variables.dateKey),
      });
      queryClient.invalidateQueries({ queryKey: historyQueryKeys.timeline() });
      queryClient.invalidateQueries({ queryKey: historyQueryKeys.all });
      queryClient.removeQueries({
        queryKey: historyQueryKeys.mealLog(variables.logId),
      });
    },
  });
}
