"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { homeQueryKeys } from "@/features/home/constants/query-keys";
import {
  plannerQueryKeys,
  toMonthKey,
} from "@/features/planner/constants/query-keys";
import { deleteScheduledMeal } from "@/features/planner/services/planner.service";

type DeleteScheduledMealVariables = {
  scheduledMealId: string;
  entryDate: string;
};

export function useDeleteScheduledMeal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ scheduledMealId }: DeleteScheduledMealVariables) =>
      deleteScheduledMeal(scheduledMealId),
    onSuccess: async (_data, variables) => {
      const monthKey = toMonthKey(
        new Date(`${variables.entryDate}T00:00:00`),
      );

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: homeQueryKeys.all }),
        queryClient.invalidateQueries({
          queryKey: plannerQueryKeys.day(variables.entryDate),
        }),
        queryClient.invalidateQueries({
          queryKey: plannerQueryKeys.monthActivity(monthKey),
        }),
        queryClient.removeQueries({
          queryKey: plannerQueryKeys.scheduledMeal(variables.scheduledMealId),
        }),
      ]);
    },
  });
}
