"use client";

import { useQuery } from "@tanstack/react-query";
import { registerMealQueryKeys } from "@/features/meal-register/constants/query-keys";
import { fetchMealLogSuggestions } from "@/features/meal-register/services/register-meal.service";
import { useAuth } from "@/hooks/use-auth";

type UseMealLogSuggestionsOptions = {
  scheduledMealId?: string;
  enabled?: boolean;
};

export function useMealLogSuggestions(
  loggedAt?: string,
  options?: UseMealLogSuggestionsOptions,
) {
  const { isAuthenticated } = useAuth();
  const scheduledMealId = options?.scheduledMealId;
  const enabled = options?.enabled ?? true;

  return useQuery({
    queryKey: registerMealQueryKeys.suggestions(
      loggedAt ?? "",
      scheduledMealId,
    ),
    queryFn: () => fetchMealLogSuggestions(loggedAt!, scheduledMealId),
    enabled: enabled && isAuthenticated && Boolean(loggedAt),
    staleTime: 0,
  });
}
