const STORAGE_KEY = "namly-recent-meal-photo-thumb";
const THUMB_MAX_EDGE = 96;

export function getRecentMealPhotoThumbnail(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(STORAGE_KEY);
}

export async function cacheRecentMealPhotoThumbnail(file: File): Promise<void> {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const dataUrl = await createThumbnailDataUrl(file);
    window.localStorage.setItem(STORAGE_KEY, dataUrl);
  } catch {
    // Non-critical — launcher falls back to gallery icon.
  }
}

async function createThumbnailDataUrl(file: File): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const { width, height } = scaleToFit(bitmap.width, bitmap.height, THUMB_MAX_EDGE);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");
  if (!context) {
    bitmap.close();
    throw new Error("Canvas unavailable");
  }

  context.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  return canvas.toDataURL("image/jpeg", 0.72);
}

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
