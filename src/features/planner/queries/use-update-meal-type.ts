"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { plannerQueryKeys } from "@/features/planner/constants/query-keys";
import { updateMealType } from "@/features/planner/services/meal-types.service";
import type { UpdateMealTypePayload } from "@/features/planner/types/meal-type-api.types";

type UpdateMealTypeVariables = {
  mealTypeId: string;
  payload: UpdateMealTypePayload;
};

export function useUpdateMealType() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ mealTypeId, payload }: UpdateMealTypeVariables) =>
      updateMealType(mealTypeId, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: plannerQueryKeys.mealTypes(),
      });
    },
  });
}
