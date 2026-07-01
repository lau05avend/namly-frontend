"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { homeQueryKeys } from "@/features/home/constants/query-keys";
import {
  plannerQueryKeys,
  toMonthKey,
} from "@/features/planner/constants/query-keys";
import type { PlanMealReminderDirtyFields } from "@/features/planner/utils/plan-meal-payload.mapper";
import type { SavePlanMealPayload } from "@/features/planner/types/plan-meal.types";
import { updatePlanMeal } from "@/features/planner/services/plan-meal.service";

type UpdatePlanMealVariables = {
  scheduledMealId: string;
  payload: SavePlanMealPayload;
  previousEntryDate?: string;
  dirtyFields?: PlanMealReminderDirtyFields;
};

export function useUpdatePlanMeal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      scheduledMealId,
      payload,
      dirtyFields,
    }: UpdatePlanMealVariables) =>
      updatePlanMeal(scheduledMealId, payload, { dirtyFields }),
    onSuccess: async (_data, variables) => {
      const dates = [variables.payload.date, variables.previousEntryDate].filter(
        (dateKey): dateKey is string => Boolean(dateKey),
      );

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: homeQueryKeys.all }),
        queryClient.invalidateQueries({
          queryKey: plannerQueryKeys.scheduledMeal(variables.scheduledMealId),
        }),
        ...dates.map((dateKey) =>
          queryClient.invalidateQueries({
            queryKey: plannerQueryKeys.day(dateKey),
          }),
        ),
        ...dates.map((dateKey) => {
          const monthKey = toMonthKey(new Date(`${dateKey}T00:00:00`));

          return queryClient.invalidateQueries({
            queryKey: plannerQueryKeys.monthActivity(monthKey),
          });
        }),
      ]);
    },
  });
}
