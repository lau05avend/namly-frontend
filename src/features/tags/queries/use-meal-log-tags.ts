"use client";

import { useQuery } from "@tanstack/react-query";
import { tagQueryKeys } from "@/features/tags/constants/query-keys";
import {
  fetchMealLogTags,
  MEAL_LOG_TAG_CATEGORY,
} from "@/features/tags/services/tags.service";
import { useAuth } from "@/hooks/use-auth";

export function useMealLogTags(enabled = true) {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: tagQueryKeys.byCategory(MEAL_LOG_TAG_CATEGORY),
    queryFn: fetchMealLogTags,
    enabled: isAuthenticated && enabled,
  });
}
