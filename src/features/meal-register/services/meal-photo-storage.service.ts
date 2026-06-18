import { validateAvatarFile } from "@/features/profile/services/avatar-storage.service";
import { isRemoteImageUrl } from "@/features/profile/utils/avatar-storage.utils";
import {
  buildMealPhotoObjectUrl,
  extractMealPhotoStoragePath,
  MEAL_PHOTO_SIGNED_URL_TTL_SECONDS,
} from "@/features/meal-register/utils/meal-photo-storage.utils";
import { SUPABASE_MEAL_PHOTO_BUCKET } from "@/lib/env/supabase";
import { supabase } from "@/lib/supabase/client";

export { validateAvatarFile as validateMealPhotoFile };

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
  const validationError = validateAvatarFile(file);
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
