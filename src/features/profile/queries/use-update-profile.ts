"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { profileQueryKeys } from "@/features/profile/constants/query-keys";
import { updateProfile } from "@/features/profile/services/profile.service";
import type { UpdateProfilePayload } from "@/features/profile/types/profile.types";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) => updateProfile(payload),
    onSuccess: (data) => {
      queryClient.setQueryData(profileQueryKeys.detail(), data);
      queryClient.invalidateQueries({ queryKey: profileQueryKeys.all });
    },
  });
}
