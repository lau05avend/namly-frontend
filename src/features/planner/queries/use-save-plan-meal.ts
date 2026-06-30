"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { homeQueryKeys } from "@/features/home/constants/query-keys";
import {
  plannerQueryKeys,
  toMonthKey,
} from "@/features/planner/constants/query-keys";
import { savePlanMeal } from "@/features/planner/services/plan-meal.service";
import type { SavePlanMealPayload } from "@/features/planner/types/plan-meal.types";

export function useSavePlanMeal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SavePlanMealPayload) => savePlanMeal(payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: homeQueryKeys.all });
      queryClient.invalidateQueries({
        queryKey: plannerQueryKeys.day(variables.date),
      });

      const monthKey = toMonthKey(new Date(`${variables.date}T00:00:00`));
      queryClient.invalidateQueries({
        queryKey: plannerQueryKeys.monthActivity(monthKey),
      });
    },
  });
}
