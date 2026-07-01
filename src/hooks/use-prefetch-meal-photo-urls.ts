"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { prefetchMealPhotoUrls } from "@/lib/media/prefetch-media-urls";

export function usePrefetchMealPhotoUrls(
  mediaRefs: (string | null | undefined)[],
) {
  const queryClient = useQueryClient();
  const fingerprint = mediaRefs
    .map((ref) => ref?.trim() ?? "")
    .filter(Boolean)
    .join("\0");

  useEffect(() => {
    if (!fingerprint) {
      return;
    }

    void prefetchMealPhotoUrls(queryClient, fingerprint.split("\0"));
  }, [queryClient, fingerprint]);
}
