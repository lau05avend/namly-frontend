import { getMediaUrlQueryRetryCount } from "@/lib/env/media-url";

export function getMediaUrlQueryOptions(staleTime: number) {
  return {
    staleTime,
    retry: getMediaUrlQueryRetryCount(),
  } as const;
}
