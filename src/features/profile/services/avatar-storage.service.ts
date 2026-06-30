import {
  AVATAR_SIGNED_URL_TTL_SECONDS,
  buildAvatarObjectUrl,
  extractAvatarStoragePath,
  isRemoteImageUrl,
} from "@/features/profile/utils/avatar-storage.utils";
import { SUPABASE_AVATAR_BUCKET } from "@/lib/env";
import { supabase } from "@/lib/supabase/client";

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

export const AVATAR_IMAGE_ACCEPT =
  "image/jpeg,image/png,image/webp,image/gif" as const;

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

function getFileExtension(file: File): string {
  const fromName = file.name.split(".").pop()?.toLowerCase();
  if (fromName && ["jpg", "jpeg", "png", "webp", "gif"].includes(fromName)) {
    return fromName === "jpeg" ? "jpg" : fromName;
  }

  const mimeMap: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
  };

  return mimeMap[file.type] ?? "jpg";
}

export function validateAvatarFile(file: File): string | null {
  if (!ALLOWED_TYPES.has(file.type)) {
    return "Usa una imagen JPG, PNG, WebP o GIF.";
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return "La imagen no puede superar 5 MB.";
  }

  return null;
}

export async function createAvatarSignedUrl(
  storagePath: string,
  expiresIn = AVATAR_SIGNED_URL_TTL_SECONDS,
): Promise<string> {
  const { data, error } = await supabase.storage
    .from(SUPABASE_AVATAR_BUCKET)
    .createSignedUrl(storagePath, expiresIn);

  if (error || !data?.signedUrl) {
    throw error ?? new Error("No se pudo obtener la URL del avatar.");
  }

  return data.signedUrl;
}

export async function resolveAvatarDisplayUrl(
  avatarRef: string,
): Promise<string | undefined> {
  const trimmed = avatarRef.trim();
  if (!trimmed) {
    return undefined;
  }

  if (trimmed.startsWith("blob:")) {
    return trimmed;
  }

  const storagePath = extractAvatarStoragePath(trimmed);
  if (storagePath) {
    return createAvatarSignedUrl(storagePath);
  }

  if (isRemoteImageUrl(trimmed)) {
    return trimmed;
  }

  return undefined;
}

/** Uploads to the private bucket and returns the object URL to persist (no token). */
export async function uploadAvatar(
  file: File,
  userId: string,
): Promise<string> {
  const validationError = validateAvatarFile(file);
  if (validationError) {
    throw new Error(validationError);
  }

  const extension = getFileExtension(file);
  const path = `${userId}/avatar-${Date.now()}.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from(SUPABASE_AVATAR_BUCKET)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    });

  if (uploadError) {
    throw new Error(
      uploadError.message.includes("row-level security")
        ? "No tienes permiso para subir la foto."
        : uploadError.message,
    );
  }

  return buildAvatarObjectUrl(path);
}
