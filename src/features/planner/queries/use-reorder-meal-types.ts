"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { plannerQueryKeys } from "@/features/planner/constants/query-keys";
import { updateMealType } from "@/features/planner/services/meal-types.service";
import type { MealType } from "@/features/planner/types/meal-type.types";
import { getMealTypeReorderPatches } from "@/features/planner/utils/meal-type-order";

type ReorderMealTypesVariables = {
  original: MealType[];
  reordered: MealType[];
};

export function useReorderMealTypes() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ original, reordered }: ReorderMealTypesVariables) => {
      const patches = getMealTypeReorderPatches(original, reordered);

      await Promise.all(
        patches.map((patch) =>
          updateMealType(patch.mealTypeId, patch.payload),
        ),
      );

      return reordered;
    },
    onMutate: async ({ reordered }) => {
      await queryClient.cancelQueries({
        queryKey: plannerQueryKeys.mealTypes(),
      });

      const previous = queryClient.getQueryData<MealType[]>(
        plannerQueryKeys.mealTypesAll(),
      );

      queryClient.setQueryData(plannerQueryKeys.mealTypesAll(), reordered);

      return { previous };
    },
    onError: (_error, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(
          plannerQueryKeys.mealTypesAll(),
          context.previous,
        );
      }
    },
    onSettled: () => {
      void queryClient.invalidateQueries({
        queryKey: plannerQueryKeys.mealTypes(),
      });
    },
  });
}
