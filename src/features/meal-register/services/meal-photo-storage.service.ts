import { isRemoteImageUrl } from "@/features/profile/utils/avatar-storage.utils";
import { REGISTER_MEAL_COPY } from "@/features/meal-register/constants/register-meal-copy";
import {
  buildMealPhotoObjectUrl,
  extractMealPhotoStoragePath,
  MEAL_PHOTO_SIGNED_URL_TTL_SECONDS,
} from "@/features/meal-register/utils/meal-photo-storage.utils";
import { SUPABASE_MEAL_PHOTO_BUCKET } from "@/lib/env/supabase";
import { supabase } from "@/lib/supabase/client";

const MEAL_PHOTO_ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const MEAL_PHOTO_EXTENSION_TO_MIME: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
};

function inferMealPhotoMimeType(file: File): string {
  if (file.type && MEAL_PHOTO_ALLOWED_TYPES.has(file.type)) {
    return file.type;
  }

  const extension = file.name.split(".").pop()?.toLowerCase();
  if (extension && MEAL_PHOTO_EXTENSION_TO_MIME[extension]) {
    return MEAL_PHOTO_EXTENSION_TO_MIME[extension];
  }

  if (!file.type) {
    return "image/jpeg";
  }

  return file.type;
}

export const MEAL_PHOTO_MAX_SIZE_BYTES = 5 * 1024 * 1024;

export function normalizeMealPhotoFile(file: File): File {
  const type = inferMealPhotoMimeType(file);

  if (!type || type === file.type) {
    return file;
  }

  return new File([file], file.name, {
    type,
    lastModified: file.lastModified,
  });
}

export function validateMealPhotoType(file: File): string | null {
  const mimeType = inferMealPhotoMimeType(file);

  if (!MEAL_PHOTO_ALLOWED_TYPES.has(mimeType)) {
    return REGISTER_MEAL_COPY.photo.errors.invalidType;
  }

  return null;
}

export function validateMealPhotoFileSize(file: File): string | null {
  if (file.size > MEAL_PHOTO_MAX_SIZE_BYTES) {
    return REGISTER_MEAL_COPY.photo.errors.tooLarge;
  }

  return null;
}

export function validateMealPhotoFile(file: File): string | null {
  return validateMealPhotoType(file) ?? validateMealPhotoFileSize(file);
}

export async function createMealPhotoSignedUrl(
  storagePath: string,
  expiresIn = MEAL_PHOTO_SIGNED_URL_TTL_SECONDS,
): Promise<string> {
  const { data, error } = await supabase.storage
    .from(SUPABASE_MEAL_PHOTO_BUCKET)
    .createSignedUrl(storagePath, expiresIn);

  if (error || !data?.signedUrl) {
    throw error ?? new Error("No se pudo obtener la URL de la foto.");
  }

  return data.signedUrl;
}

export async function resolveMealPhotoDisplayUrl(
  mediaRef: string,
): Promise<string | undefined> {
  const trimmed = mediaRef.trim();
  if (!trimmed) {
    return undefined;
  }

  if (trimmed.startsWith("blob:")) {
    return trimmed;
  }

  const storagePath = extractMealPhotoStoragePath(trimmed);
  if (storagePath) {
    return createMealPhotoSignedUrl(storagePath);
  }

  if (isRemoteImageUrl(trimmed)) {
    return trimmed;
  }

  return undefined;
}

/** Uploads to the private bucket and returns the object URL to persist (no token). */
export async function uploadMealPhoto(
  file: File,
  userId: string,
): Promise<string> {
  const validationError = validateMealPhotoFile(file);
  if (validationError) {
    throw new Error(validationError);
  }

  const extension = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const safeExtension = extension === "jpeg" ? "jpg" : extension;
  const path = `${userId}/meal-${Date.now()}.${safeExtension}`;

  const { error: uploadError } = await supabase.storage
    .from(SUPABASE_MEAL_PHOTO_BUCKET)
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

  return buildMealPhotoObjectUrl(path);
}
