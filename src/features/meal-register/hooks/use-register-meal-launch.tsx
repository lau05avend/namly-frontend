"use client";

import { useCallback, useMemo, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { MediaSourcePicker } from "@/components/media/media-source-picker";
import {
  MEAL_PHOTO_ACCEPT,
} from "@/features/meal-register/hooks/use-meal-photo-picker";
import {
  normalizeMealPhotoFile,
  validateMealPhotoType,
} from "@/features/meal-register/services/meal-photo-storage.service";
import { showMealPhotoPickError } from "@/features/meal-register/utils/meal-photo-feedback";
import { getRecentMealPhotoThumbnail } from "@/features/meal-register/utils/recent-meal-photo-cache";
import { setPendingRegisterLaunch } from "@/features/meal-register/utils/register-meal-launch";

type OpenRegisterWithCameraOptions = {
  date?: string;
};

export function useRegisterMealLaunch() {
  const router = useRouter();
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const launchDateRef = useRef<string | undefined>(undefined);
  const [isLauncherOpen, setIsLauncherOpen] = useState(false);

  const galleryThumbnail = useMemo(
    () => (isLauncherOpen ? getRecentMealPhotoThumbnail() : null),
    [isLauncherOpen],
  );

  const openRegisterWithCamera = useCallback(
    (options?: OpenRegisterWithCameraOptions) => {
      launchDateRef.current = options?.date;
      setIsLauncherOpen(true);
    },
    [],
  );

  const navigateWithFile = useCallback(
    (file: File) => {
      const normalizedFile = normalizeMealPhotoFile(file);
      const typeError = validateMealPhotoType(normalizedFile);

      if (typeError) {
        showMealPhotoPickError(typeError);
        return;
      }

      const date = launchDateRef.current;
      launchDateRef.current = undefined;

      setPendingRegisterLaunch({ file: normalizedFile, date });

      const params = new URLSearchParams();
      if (date) {
        params.set("date", date);
      }

      const query = params.toString();
      router.push(query ? `/meals/register?${query}` : "/meals/register");
    },
    [router],
  );

  const handlePhotoChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      event.target.value = "";

      if (!file) {
        return;
      }

      navigateWithFile(file);
    },
    [navigateWithFile],
  );

  const openCamera = useCallback(() => {
    cameraInputRef.current?.click();
  }, []);

  const openGallery = useCallback(() => {
    galleryInputRef.current?.click();
  }, []);

  const launchUi: ReactNode = (
    <>
      <input
        ref={galleryInputRef}
        type="file"
        accept={MEAL_PHOTO_ACCEPT}
        className="sr-only"
        tabIndex={-1}
        aria-hidden
        onChange={handlePhotoChange}
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept={MEAL_PHOTO_ACCEPT}
        capture="environment"
        className="sr-only"
        tabIndex={-1}
        aria-hidden
        onChange={handlePhotoChange}
      />
      <MediaSourcePicker
        open={isLauncherOpen}
        onOpenChange={setIsLauncherOpen}
        context="meal"
        onTakePhoto={openCamera}
        onChooseFromGallery={openGallery}
        galleryThumbnail={galleryThumbnail}
      />
    </>
  );

  return {
    openRegisterWithCamera,
    launchUi,
  };
}
