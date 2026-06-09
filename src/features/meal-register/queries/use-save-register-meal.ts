"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { homeQueryKeys } from "@/features/home/constants/query-keys";
import { plannerQueryKeys } from "@/features/planner/constants/query-keys";
import { saveRegisterMeal } from "@/features/meal-register/services/register-meal.service";
import type { SaveRegisterMealPayload } from "@/features/meal-register/types/register-meal.types";

export function useSaveRegisterMeal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SaveRegisterMealPayload) => saveRegisterMeal(payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: homeQueryKeys.all });
      queryClient.invalidateQueries({
        queryKey: plannerQueryKeys.day(variables.date),
      });
      queryClient.invalidateQueries({ queryKey: plannerQueryKeys.all });
    },
  });
}
