"use client";

import { useLayoutEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { PhotoMealCard } from "@/components/meal-register/photo-meal-card";
import { MediaSourcePicker } from "@/components/media/media-source-picker";
import { REGISTER_MEAL_COPY } from "@/features/meal-register/constants/register-meal-copy";
import {
  MEAL_PHOTO_ACCEPT,
  type MealPhotoPickerActions,
  type MealPhotoPickerRefs,
  type MealPhotoPickerState,
} from "@/features/meal-register/hooks/use-meal-photo-picker";
import { getRecentMealPhotoThumbnail } from "@/features/meal-register/utils/recent-meal-photo-cache";
import type { RegisterMealFormValues } from "@/features/meal-register/schemas/register-meal.schema";

type RegisterPhotoSectionProps = {
  refs: MealPhotoPickerRefs;
  state: MealPhotoPickerState;
  actions: MealPhotoPickerActions;
};

export function RegisterPhotoSection({
  refs,
  state,
  actions,
}: RegisterPhotoSectionProps) {
  const [isSourceOpen, setIsSourceOpen] = useState(false);
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<RegisterMealFormValues>();
  const photoUrl = watch("photoUrl");
  const { galleryInputRef, cameraInputRef } = refs;
  const { previewUrl, pickError, isPreparing } = state;
  const { openGallery, openCamera, handleFileChange } = actions;
  const photoError = pickError ?? errors.photoUrl?.message;
  const displayPhotoUrl = previewUrl ?? photoUrl ?? undefined;

  const galleryThumbnail = useMemo(
    () => (isSourceOpen ? getRecentMealPhotoThumbnail() : null),
    [isSourceOpen],
  );

  useLayoutEffect(() => {
    if (!previewUrl) {
      return;
    }

    if (photoUrl === previewUrl) {
      return;
    }

    setValue("photoUrl", previewUrl, {
      shouldDirty: true,
      shouldValidate: true,
    });
  }, [photoUrl, previewUrl, setValue]);

  return (
    <div className="flex flex-col gap-3">
      <input
        ref={galleryInputRef}
        type="file"
        accept={MEAL_PHOTO_ACCEPT}
        className="sr-only"
        onChange={handleFileChange}
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept={MEAL_PHOTO_ACCEPT}
        capture="environment"
        className="sr-only"
        onChange={handleFileChange}
      />

      <PhotoMealCard
        photoUrl={displayPhotoUrl}
        isPreparing={isPreparing}
        onPickPhoto={() => setIsSourceOpen(true)}
        error={photoError}
      />

      <MediaSourcePicker
        open={isSourceOpen}
        onOpenChange={setIsSourceOpen}
        context="meal"
        onTakePhoto={openCamera}
        onChooseFromGallery={openGallery}
        galleryThumbnail={galleryThumbnail}
      />
    </div>
  );
}
