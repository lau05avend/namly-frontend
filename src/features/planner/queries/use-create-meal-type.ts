"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { plannerQueryKeys } from "@/features/planner/constants/query-keys";
import { createMealType } from "@/features/planner/services/meal-types.service";
import type { CreateMealTypePayload } from "@/features/planner/types/meal-type-api.types";

export function useCreateMealType() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateMealTypePayload) => createMealType(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: plannerQueryKeys.mealTypes(),
      });
    },
  });
}
