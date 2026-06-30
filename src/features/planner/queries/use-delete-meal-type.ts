"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { plannerQueryKeys } from "@/features/planner/constants/query-keys";
import { deleteMealType } from "@/features/planner/services/meal-types.service";

export function useDeleteMealType() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (mealTypeId: string) => deleteMealType(mealTypeId),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: plannerQueryKeys.mealTypes(),
      });
    },
  });
}
