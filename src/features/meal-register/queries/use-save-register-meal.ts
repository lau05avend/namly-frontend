"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { historyQueryKeys } from "@/features/history/constants/query-keys";
import { homeQueryKeys } from "@/features/home/constants/query-keys";
import { plannerQueryKeys } from "@/features/planner/constants/query-keys";
import { tagQueryKeys } from "@/features/tags/constants/query-keys";
import { MEAL_LOG_TAG_CATEGORY } from "@/features/tags/services/tags.service";
import { saveRegisterMeal } from "@/features/meal-register/services/register-meal.service";
import type { SaveRegisterMealInput } from "@/features/meal-register/types/register-meal.types";
import { useAuth } from "@/hooks/use-auth";

type SaveRegisterMealVariables = SaveRegisterMealInput;

export function useSaveRegisterMeal() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: (input: SaveRegisterMealVariables) => {
      if (!user) {
        throw new Error("Debes iniciar sesión para guardar.");
      }

      return saveRegisterMeal(input, user.id);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: homeQueryKeys.all });
      queryClient.invalidateQueries({
        queryKey: plannerQueryKeys.day(variables.values.date),
      });
      queryClient.invalidateQueries({ queryKey: plannerQueryKeys.all });
      queryClient.invalidateQueries({
        queryKey: historyQueryKeys.day(variables.values.date),
      });
      queryClient.invalidateQueries({ queryKey: historyQueryKeys.timeline() });
      queryClient.invalidateQueries({ queryKey: historyQueryKeys.all });
      queryClient.invalidateQueries({
        queryKey: tagQueryKeys.byCategory(MEAL_LOG_TAG_CATEGORY),
      });

      if (variables.logId) {
        queryClient.invalidateQueries({
          queryKey: historyQueryKeys.mealLog(variables.logId),
        });
      }
    },
  });
}
