import { getMediaUrlQueryRetryCount } from "@/lib/env/media-url";
import { isStorageObjectNotFoundError } from "@/lib/media/is-storage-object-not-found-error";

export function getMediaUrlQueryOptions(staleTime: number) {
  const maxRetries = getMediaUrlQueryRetryCount();

  return {
    staleTime,
    gcTime: staleTime * 2,
    retry: (failureCount: number, error: unknown) =>
      !isStorageObjectNotFoundError(error) && failureCount < maxRetries,
    placeholderData: (previousData: string | undefined) => previousData,
  } as const;
}
