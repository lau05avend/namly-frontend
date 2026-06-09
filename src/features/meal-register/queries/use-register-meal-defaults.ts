"use client";

import { useQuery } from "@tanstack/react-query";
import { registerMealQueryKeys } from "@/features/meal-register/constants/query-keys";
import { fetchRegisterMealDefaults } from "@/features/meal-register/services/register-meal.service";
import type { RegisterMealDefaultsParams } from "@/features/meal-register/types/register-meal.types";

export function useRegisterMealDefaults(params?: RegisterMealDefaultsParams) {
  return useQuery({
    queryKey: registerMealQueryKeys.defaults(params?.date),
    queryFn: () => fetchRegisterMealDefaults(params),
  });
}
