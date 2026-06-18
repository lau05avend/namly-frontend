"use client";

import { useQuery } from "@tanstack/react-query";
import { registerMealQueryKeys } from "@/features/meal-register/constants/query-keys";
import { fetchMealLogSuggestions } from "@/features/meal-register/services/register-meal.service";
import { useAuth } from "@/hooks/use-auth";

export function useMealLogSuggestions(loggedAt?: string) {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: registerMealQueryKeys.suggestions(loggedAt ?? ""),
    queryFn: () => fetchMealLogSuggestions(loggedAt!),
    enabled: isAuthenticated && Boolean(loggedAt),
    staleTime: 0,
  });
}
