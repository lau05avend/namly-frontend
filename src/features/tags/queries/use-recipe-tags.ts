"use client";

import { useQuery } from "@tanstack/react-query";
import { tagQueryKeys } from "@/features/tags/constants/query-keys";
import { fetchRecipeTags } from "@/features/tags/services/tags.service";
import { useAuth } from "@/hooks/use-auth";

export function useRecipeTags(enabled = true) {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: tagQueryKeys.byCategory("recipes"),
    queryFn: fetchRecipeTags,
    enabled: isAuthenticated && enabled,
  });
}
