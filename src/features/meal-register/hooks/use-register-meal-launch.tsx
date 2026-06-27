"use client";

import { useCallback, useMemo, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MediaSourcePicker } from "@/components/media/media-source-picker";
import { REGISTER_MEAL_COPY } from "@/features/meal-register/constants/register-meal-copy";
import { MEAL_PHOTO_ACCEPT } from "@/features/meal-register/hooks/use-meal-photo-picker";
import {
  prepareMealPhotoFile,
  shouldShowMealPhotoPreparing,
} from "@/features/meal-register/utils/compress-meal-photo";
import { showMealPhotoPickError } from "@/features/meal-register/utils/meal-photo-feedback";
import { cacheRecentMealPhotoThumbnail, getRecentMealPhotoThumbnail } from "@/features/meal-register/utils/recent-meal-photo-cache";
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

  const navigateWithPreparedFile = useCallback(
    async (file: File) => {
      const shouldShowPreparing = shouldShowMealPhotoPreparing(file);
      const toastId = shouldShowPreparing
        ? toast.loading(REGISTER_MEAL_COPY.photo.preparing)
        : undefined;

      try {
        const preparedFile = await prepareMealPhotoFile(file);
        void cacheRecentMealPhotoThumbnail(preparedFile);

        const date = launchDateRef.current;
        launchDateRef.current = undefined;

        setPendingRegisterLaunch({ file: preparedFile, date });

        const params = new URLSearchParams();
        if (date) {
          params.set("date", date);
        }

        const query = params.toString();
        router.push(query ? `/meals/register?${query}` : "/meals/register");
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : REGISTER_MEAL_COPY.photo.errors.prepareFailed;

        showMealPhotoPickError(message);
      } finally {
        if (toastId !== undefined) {
          toast.dismiss(toastId);
        }
      }
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

      void navigateWithPreparedFile(file);
    },
    [navigateWithPreparedFile],
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