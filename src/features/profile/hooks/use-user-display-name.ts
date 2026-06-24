"use client";

import { useMemo } from "react";
import { useProfile } from "@/features/profile/queries/use-profile";

export function useUserDisplayName(): string | null {
  const { data: profile } = useProfile();

  return useMemo(() => {
    const trimmed = profile?.displayName?.trim();
    return trimmed || null;
  }, [profile?.displayName]);
}
