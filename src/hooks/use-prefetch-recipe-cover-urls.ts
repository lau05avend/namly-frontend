"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { prefetchRecipeCoverUrls } from "@/lib/media/prefetch-media-urls";

export function usePrefetchRecipeCoverUrls(
  coverUrls: (string | null | undefined)[],
) {
  const queryClient = useQueryClient();
  const fingerprint = coverUrls
    .map((url) => url?.trim() ?? "")
    .filter(Boolean)
    .join("\0");

  useEffect(() => {
    if (!fingerprint) {
      return;
    }

    void prefetchRecipeCoverUrls(
      queryClient,
      fingerprint.split("\0"),
    );
  }, [queryClient, fingerprint]);
}
