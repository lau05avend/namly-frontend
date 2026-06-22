import {
  normalizeMealPhotoFile,
  uploadMealPhoto,
  validateMealPhotoFile,
} from "@/features/meal-register/services/meal-photo-storage.service";
import { buildMealPhotoObjectUrl } from "@/features/meal-register/utils/meal-photo-storage.utils";
import { SUPABASE_MEAL_PHOTO_BUCKET } from "@/lib/env/supabase";
import { supabase } from "@/lib/supabase/client";

export async function uploadRecipeCover(
  file: File,
  userId: string,
): Promise<string> {
  const normalized = normalizeMealPhotoFile(file);
  const validationError = validateMealPhotoFile(normalized);
  if (validationError) {
    throw new Error(validationError);
  }

  const extension = normalized.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const safeExtension = extension === "jpeg" ? "jpg" : extension;
  const path = `${userId}/recipe-cover-${Date.now()}.${safeExtension}`;

  const { error: uploadError } = await supabase.storage
    .from(SUPABASE_MEAL_PHOTO_BUCKET)
    .upload(path, normalized, {
      cacheControl: "3600",
      upsert: false,
      contentType: normalized.type,
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
