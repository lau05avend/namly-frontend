import type { QueryClient } from "@tanstack/react-query";
import { registerMealQueryKeys } from "@/features/meal-register/constants/query-keys";
import { createMealPhotoSignedUrl } from "@/features/meal-register/services/meal-photo-storage.service";
import {
  extractMealPhotoStoragePath,
  MEAL_PHOTO_SIGNED_URL_TTL_SECONDS,
} from "@/features/meal-register/utils/meal-photo-storage.utils";
import { recipeQueryKeys } from "@/features/recipes/constants/query-keys";
import {
  isLegacyRecipeCoverInMealPhotoBucket,
  resolveRecipeCoverDisplayUrlSync,
} from "@/features/recipes/utils/recipe-cover-storage.utils";
import { getMediaUrlQueryOptions } from "@/lib/media/media-url-query-options";
import { warmImageCache } from "@/lib/media/warm-image-cache";

const MEAL_PHOTO_STALE_MS = (MEAL_PHOTO_SIGNED_URL_TTL_SECONDS - 300) * 1000;
const RECIPE_COVER_STALE_MS = 55 * 60 * 1000;

function uniqueMediaRefs(
  refs: Iterable<string | null | undefined>,
): string[] {
  const seen = new Set<string>();

  for (const ref of refs) {
    const trimmed = ref?.trim();
    if (trimmed) {
      seen.add(trimmed);
    }
  }

  return [...seen];
}

export async function prefetchMealPhotoUrls(
  queryClient: QueryClient,
  mediaRefs: Iterable<string | null | undefined>,
): Promise<void> {
  const refs = uniqueMediaRefs(mediaRefs);
  const directUrls: string[] = [];
  const signingTasks: Promise<void>[] = [];

  for (const ref of refs) {
    const storagePath = extractMealPhotoStoragePath(ref);

    if (!storagePath) {
      if (ref.startsWith("blob:") || ref.startsWith("http")) {
        directUrls.push(ref);
      }
      continue;
    }

    signingTasks.push(
      queryClient
        .fetchQuery({
          queryKey: registerMealQueryKeys.mealPhotoDisplayUrl(ref),
          queryFn: () => createMealPhotoSignedUrl(storagePath),
          ...getMediaUrlQueryOptions(MEAL_PHOTO_STALE_MS),
        })
        .then((signedUrl) => {
          warmImageCache([signedUrl]);
        })
        .catch(() => {
          // Stale ref or deleted object — skip prefetch silently.
        }),
    );
  }

  warmImageCache(directUrls);
  await Promise.allSettled(signingTasks);
}

export async function prefetchRecipeCoverUrls(
  queryClient: QueryClient,
  coverUrls: Iterable<string | null | undefined>,
): Promise<void> {
  const refs = uniqueMediaRefs(coverUrls);
  const syncUrls: string[] = [];
  const signingTasks: Promise<void>[] = [];

  for (const ref of refs) {
    const syncUrl = resolveRecipeCoverDisplayUrlSync(ref);

    if (syncUrl) {
      syncUrls.push(syncUrl);
      continue;
    }

    if (!isLegacyRecipeCoverInMealPhotoBucket(ref)) {
      continue;
    }

    const storagePath = extractMealPhotoStoragePath(ref);
    if (!storagePath) {
      continue;
    }

    signingTasks.push(
      queryClient
        .fetchQuery({
          queryKey: recipeQueryKeys.coverDisplayUrl(ref),
          queryFn: () => createMealPhotoSignedUrl(storagePath),
          ...getMediaUrlQueryOptions(RECIPE_COVER_STALE_MS),
        })
        .then((signedUrl) => {
          warmImageCache([signedUrl]);
        })
        .catch(() => {
          // Stale ref or deleted object — skip prefetch silently.
        }),
    );
  }

  warmImageCache(syncUrls);
  await Promise.allSettled(signingTasks);
}
