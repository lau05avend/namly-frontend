"use client";

import { useProfile } from "@/features/profile/queries/use-profile";

/**
 * Keeps the profile query warm app-wide so displayName and avatar
 * stay in the TanStack Query cache after the first authenticated fetch.
 */
export function ProfileCacheSync() {
  useProfile();
  return null;
}
