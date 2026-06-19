"use client";

import { useCallback, useRef, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { REGISTER_MEAL_COPY } from "@/features/meal-register/constants/register-meal-copy";
import { MEAL_PHOTO_ACCEPT } from "@/features/meal-register/hooks/use-meal-photo-picker";
import {
  prepareMealPhotoFile,
  shouldShowMealPhotoPreparing,
} from "@/features/meal-register/utils/compress-meal-photo";
import { showMealPhotoPickError } from "@/features/meal-register/utils/meal-photo-feedback";
import { setPendingRegisterLaunch } from "@/features/meal-register/utils/register-meal-launch";

type OpenRegisterWithCameraOptions = {
  date?: string;
};

export function useRegisterMealLaunch() {
  const router = useRouter();
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const launchDateRef = useRef<string | undefined>(undefined);

  const openRegisterWithCamera = useCallback(
    (options?: OpenRegisterWithCameraOptions) => {
      launchDateRef.current = options?.date;
      cameraInputRef.current?.click();
    },
    [],
  );

  const handleCameraChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      event.target.value = "";

      if (!file) {
        return;
      }

      const shouldShowPreparing = shouldShowMealPhotoPreparing(file);
      const toastId = shouldShowPreparing
        ? toast.loading(REGISTER_MEAL_COPY.photo.preparing)
        : undefined;

      try {
        const preparedFile = await prepareMealPhotoFile(file);
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

  const cameraInput: ReactNode = (
    <input
      ref={cameraInputRef}
      type="file"
      accept={MEAL_PHOTO_ACCEPT}
      capture="environment"
      className="sr-only"
      tabIndex={-1}
      aria-hidden
      onChange={handleCameraChange}
    />
  );

  return {
    openRegisterWithCamera,
    cameraInput,
  };
}
