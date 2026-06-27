import { extractMealPhotoStoragePath } from "@/features/meal-register/utils/meal-photo-storage.utils";
import { isRemoteImageUrl } from "@/features/profile/utils/avatar-storage.utils";
import {
  SUPABASE_RECIPE_COVER_BUCKET,
  SUPABASE_URL,
} from "@/lib/env/supabase";

const SUPABASE_OBJECT_PATH_PATTERN =
  /\/storage\/v1\/object\/([^/]+)\/(.+)$/;

const SUPABASE_OBJECT_MODIFIERS = new Set(["sign", "authenticated", "public"]);

/**
 * Public bucket URL persisted after upload.
 * Example: https://{project}.supabase.co/storage/v1/object/public/recipe-covers/{path}
 */
export function buildRecipeCoverPublicUrl(storagePath: string): string {
  const base = SUPABASE_URL.replace(/\/$/, "");
  const normalizedPath = storagePath.replace(/^\/+/, "");

  return `${base}/storage/v1/object/public/${SUPABASE_RECIPE_COVER_BUCKET}/${normalizedPath}`;
}

export function extractRecipeCoverStoragePath(coverRef: string): string | null {
  const trimmed = coverRef.trim();
  if (!trimmed) {
    return null;
  }

  if (!isRemoteImageUrl(trimmed)) {
    return trimmed;
  }

  try {
    const url = new URL(trimmed);
    const publicBucketPattern = new RegExp(
      `/storage/v1/object/public/${SUPABASE_RECIPE_COVER_BUCKET}/(.+)$`,
    );
    const publicMatch = url.pathname.match(publicBucketPattern);
    if (publicMatch?.[1]) {
      return decodeURIComponent(publicMatch[1]);
    }

    const objectMatch = url.pathname.match(SUPABASE_OBJECT_PATH_PATTERN);
    if (objectMatch?.[1] && objectMatch[2]) {
      const segment = objectMatch[1];

      if (segment === SUPABASE_RECIPE_COVER_BUCKET) {
        return decodeURIComponent(objectMatch[2]);
      }

      if (
        SUPABASE_OBJECT_MODIFIERS.has(segment) &&
        objectMatch[2].startsWith(`${SUPABASE_RECIPE_COVER_BUCKET}/`)
      ) {
        return decodeURIComponent(
          objectMatch[2].slice(SUPABASE_RECIPE_COVER_BUCKET.length + 1),
        );
      }
    }
  } catch {
    return null;
  }

  return null;
}

export function isLegacyRecipeCoverInMealPhotoBucket(coverRef: string): boolean {
  return extractMealPhotoStoragePath(coverRef) !== null;
}

export function resolveRecipeCoverDisplayUrlSync(
  coverRef: string,
): string | undefined {
  const trimmed = coverRef.trim();
  if (!trimmed) {
    return undefined;
  }

  if (trimmed.startsWith("blob:")) {
    return trimmed;
  }

  const storagePath = extractRecipeCoverStoragePath(trimmed);
  if (storagePath) {
    return buildRecipeCoverPublicUrl(storagePath);
  }

  if (isRemoteImageUrl(trimmed) && !isLegacyRecipeCoverInMealPhotoBucket(trimmed)) {
    return trimmed;
  }

  return undefined;
}
