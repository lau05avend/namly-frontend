import { isRemoteImageUrl } from "@/features/profile/utils/avatar-storage.utils";
import {
  SUPABASE_MEAL_PHOTO_BUCKET,
  SUPABASE_URL,
} from "@/lib/env/supabase";

export const MEAL_PHOTO_SIGNED_URL_TTL_SECONDS = 3600;

const SUPABASE_SIGNED_OBJECT_PATH_PATTERN =
  /\/storage\/v1\/object\/(?:sign|authenticated|public)\/[^/]+\/(.+)$/;

const SUPABASE_OBJECT_PATH_PATTERN =
  /\/storage\/v1\/object\/([^/]+)\/(.+)$/;

const SUPABASE_OBJECT_MODIFIERS = new Set(["sign", "authenticated", "public"]);

/**
 * Builds the canonical object URL persisted in the backend (no signed token).
 * Example: https://{project}.supabase.co/storage/v1/object/{bucket}/{path}
 */
export function buildMealPhotoObjectUrl(storagePath: string): string {
  const base = SUPABASE_URL.replace(/\/$/, "");
  const normalizedPath = storagePath.replace(/^\/+/, "");

  return `${base}/storage/v1/object/${SUPABASE_MEAL_PHOTO_BUCKET}/${normalizedPath}`;
}

/**
 * Returns a bare storage path when `mediaRef` is a path or a Supabase storage URL.
 * Returns null for external URLs that are not in our bucket.
 */
export function extractMealPhotoStoragePath(mediaRef: string): string | null {
  const trimmed = mediaRef.trim();
  if (!trimmed) {
    return null;
  }

  if (!isRemoteImageUrl(trimmed)) {
    return trimmed;
  }

  try {
    const url = new URL(trimmed);
    const signedMatch = url.pathname.match(SUPABASE_SIGNED_OBJECT_PATH_PATTERN);
    if (signedMatch?.[1]) {
      return decodeURIComponent(signedMatch[1]);
    }

    const objectMatch = url.pathname.match(SUPABASE_OBJECT_PATH_PATTERN);
    if (objectMatch?.[1] && objectMatch[2]) {
      const bucket = objectMatch[1];

      if (SUPABASE_OBJECT_MODIFIERS.has(bucket)) {
        return null;
      }

      if (bucket !== SUPABASE_MEAL_PHOTO_BUCKET) {
        return null;
      }

      return decodeURIComponent(objectMatch[2]);
    }
  } catch {
    return null;
  }

  return null;
}

export function mealPhotoNeedsSignedUrl(mediaRef: string): boolean {
  return extractMealPhotoStoragePath(mediaRef) !== null;
}
