import { REGISTER_MEAL_COPY } from "@/features/meal-register/constants/register-meal-copy";
import {
  MEAL_PHOTO_MAX_SIZE_BYTES,
  normalizeMealPhotoFile,
  validateMealPhotoFile,
  validateMealPhotoType,
} from "@/features/meal-register/services/meal-photo-storage.service";

const MAX_DIMENSION = 2048;
const OUTPUT_MIME_TYPE = "image/jpeg";
const QUALITY_STEPS = [0.85, 0.75, 0.65, 0.55, 0.45] as const;
const DIMENSION_STEPS = [2048, 1600, 1280, 1024] as const;

function scaleToFit(
  width: number,
  height: number,
  maxEdge: number,
): { width: number; height: number } {
  const longestEdge = Math.max(width, height);

  if (longestEdge <= maxEdge) {
    return { width, height };
  }

  const scale = maxEdge / longestEdge;

  return {
    width: Math.round(width * scale),
    height: Math.round(height * scale),
  };
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  quality: number,
): Promise<Blob | null> {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), OUTPUT_MIME_TYPE, quality);
  });
}

function shouldCompressMealPhoto(
  file: File,
  dimensions: { width: number; height: number },
): boolean {
  if (file.size > MEAL_PHOTO_MAX_SIZE_BYTES) {
    return true;
  }

  return Math.max(dimensions.width, dimensions.height) > MAX_DIMENSION;
}

async function compressRasterImage(bitmap: ImageBitmap): Promise<Blob> {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error(REGISTER_MEAL_COPY.photo.errors.prepareFailed);
  }

  try {
    for (const maxEdge of DIMENSION_STEPS) {
      const { width, height } = scaleToFit(
        bitmap.width,
        bitmap.height,
        maxEdge,
      );
      canvas.width = width;
      canvas.height = height;
      context.drawImage(bitmap, 0, 0, width, height);

      for (const quality of QUALITY_STEPS) {
        const blob = await canvasToBlob(canvas, quality);

        if (blob && blob.size <= MEAL_PHOTO_MAX_SIZE_BYTES) {
          return blob;
        }
      }
    }
  } finally {
    canvas.width = 0;
    canvas.height = 0;
  }

  throw new Error(REGISTER_MEAL_COPY.photo.errors.compressFailed);
}

function toPreparedFile(file: File, blob: Blob): File {
  const baseName = file.name.replace(/\.[^.]+$/, "") || "meal-photo";

  return new File([blob], `${baseName}.jpg`, {
    type: OUTPUT_MIME_TYPE,
    lastModified: file.lastModified,
  });
}

export async function prepareMealPhotoFile(file: File): Promise<File> {
  const normalizedFile = normalizeMealPhotoFile(file);
  const typeError = validateMealPhotoType(normalizedFile);
  if (typeError) {
    throw new Error(typeError);
  }

  if (normalizedFile.type === "image/gif") {
    if (normalizedFile.size > MEAL_PHOTO_MAX_SIZE_BYTES) {
      throw new Error(REGISTER_MEAL_COPY.photo.errors.tooLarge);
    }

    return normalizedFile;
  }

  const bitmap = await createImageBitmap(normalizedFile);

  try {
    const dimensions = {
      width: bitmap.width,
      height: bitmap.height,
    };

    if (!shouldCompressMealPhoto(normalizedFile, dimensions)) {
      return normalizedFile;
    }

    const compressedBlob = await compressRasterImage(bitmap);
    const preparedFile = toPreparedFile(normalizedFile, compressedBlob);
    const sizeError = validateMealPhotoFile(preparedFile);

    if (sizeError) {
      throw new Error(sizeError);
    }

    return preparedFile;
  } finally {
    bitmap.close();
  }
}
