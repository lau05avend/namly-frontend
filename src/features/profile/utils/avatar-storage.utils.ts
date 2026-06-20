import { SUPABASE_AVATAR_BUCKET, SUPABASE_URL } from "@/lib/env/supabase";

export const AVATAR_SIGNED_URL_TTL_SECONDS = 3600;

const SUPABASE_SIGNED_OBJECT_PATH_PATTERN =
  /\/storage\/v1\/object\/(?:sign|authenticated|public)\/[^/]+\/(.+)$/;

const SUPABASE_OBJECT_PATH_PATTERN =
  /\/storage\/v1\/object\/([^/]+)\/(.+)$/;

const SUPABASE_OBJECT_MODIFIERS = new Set(["sign", "authenticated", "public"]);

export function isRemoteImageUrl(url: string): boolean {
  return url.startsWith("https://") || url.startsWith("http://");
}

/**
 * Builds the canonical object URL persisted in the backend (no signed token).
 * Example: https://{project}.supabase.co/storage/v1/object/{bucket}/{path}
 */
export function buildAvatarObjectUrl(storagePath: string): string {
  const base = SUPABASE_URL.replace(/\/$/, "");
  const normalizedPath = storagePath.replace(/^\/+/, "");

  return `${base}/storage/v1/object/${SUPABASE_AVATAR_BUCKET}/${normalizedPath}`;
}

/**
 * Returns a bare storage path when `avatarRef` is a path or a Supabase storage URL.
 * Returns null for external URLs that are not in our bucket.
 */
export function extractAvatarStoragePath(avatarRef: string): string | null {
  const trimmed = avatarRef.trim();
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

      if (bucket !== SUPABASE_AVATAR_BUCKET) {
        return null;
      }

      return decodeURIComponent(objectMatch[2]);
    }
  } catch {
    return null;
  }

  return null;
}

export function avatarNeedsSignedUrl(avatarRef: string): boolean {
  return extractAvatarStoragePath(avatarRef) !== null;
}

export function isSupabaseStorageImageUrl(url: string): boolean {
  return url.includes(".supabase.co/storage/v1/object/");
}
