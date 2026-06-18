"use client";

import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { PhotoMealCard } from "@/components/meal-register/photo-meal-card";
import { PlannerSection } from "@/components/planner/planner-section";
import { REGISTER_MEAL_COPY } from "@/features/meal-register/constants/register-meal-copy";
import type { useMealPhotoPicker } from "@/features/meal-register/hooks/use-meal-photo-picker";
import type { RegisterMealFormValues } from "@/features/meal-register/schemas/register-meal.schema";

type RegisterPhotoSectionProps = {
  photoPicker: ReturnType<typeof useMealPhotoPicker>;
};

export function RegisterPhotoSection({ photoPicker }: RegisterPhotoSectionProps) {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<RegisterMealFormValues>();
  const photoUrl = watch("photoUrl");

  useEffect(() => {
    if (photoPicker.previewUrl) {
      setValue("photoUrl", photoPicker.previewUrl, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  }, [photoPicker.previewUrl, setValue]);

  return (
    <PlannerSection label={REGISTER_MEAL_COPY.sections.photo}>
      <input
        ref={photoPicker.inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="sr-only"
        onChange={photoPicker.handleFileChange}
      />
      <PhotoMealCard
        photoUrl={photoUrl}
        onPickPhoto={photoPicker.openFilePicker}
        error={photoPicker.pickError ?? errors.photoUrl?.message}
      />
    </PlannerSection>
  );
}
