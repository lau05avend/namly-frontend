export const AVATAR_SIGNED_URL_TTL_SECONDS = 3600;

export function isRemoteImageUrl(url: string): boolean {
  return url.startsWith("https://") || url.startsWith("http://");
}

/**
 * Returns a bare storage path only (legacy). Complete URLs are not paths.
 */
export function extractAvatarStoragePath(avatarRef: string): string | null {
  const trimmed = avatarRef.trim();
  if (!trimmed || isRemoteImageUrl(trimmed)) {
    return null;
  }

  return trimmed;
}

export function isSupabaseStorageImageUrl(url: string): boolean {
  return url.includes(".supabase.co/storage/v1/object/");
}
