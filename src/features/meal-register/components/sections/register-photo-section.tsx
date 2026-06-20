"use client";

import { useLayoutEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { PhotoMealCard } from "@/components/meal-register/photo-meal-card";
import { PlannerSection } from "@/components/planner/planner-section";
import { PhotoSourceSheet } from "@/features/meal-register/components/photo-source-sheet";
import { REGISTER_MEAL_COPY } from "@/features/meal-register/constants/register-meal-copy";
import {
  MEAL_PHOTO_ACCEPT,
  type MealPhotoPickerActions,
  type MealPhotoPickerRefs,
  type MealPhotoPickerState,
} from "@/features/meal-register/hooks/use-meal-photo-picker";
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
  const { previewUrl, pickError } = state;
  const { openGallery, openCamera, handleFileChange } = actions;
  const photoError = pickError ?? errors.photoUrl?.message;
  const displayPhotoUrl = previewUrl ?? photoUrl ?? undefined;

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
    <PlannerSection label={REGISTER_MEAL_COPY.sections.photo}>
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
        onPickPhoto={() => {
          if (displayPhotoUrl) {
            setIsSourceOpen(true);
            return;
          }

          openCamera();
        }}
        error={photoError}
      />

      <PhotoSourceSheet
        open={isSourceOpen}
        onOpenChange={setIsSourceOpen}
        onTakePhoto={openCamera}
        onChooseFromGallery={openGallery}
      />
    </PlannerSection>
  );
}
