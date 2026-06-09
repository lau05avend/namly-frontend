"use client";

import { Controller, useFormContext } from "react-hook-form";
import { PhotoMealCard } from "@/components/meal-register/photo-meal-card";
import { PlannerSection } from "@/components/planner/planner-section";
import { REGISTER_MEAL_COPY } from "@/features/meal-register/constants/register-meal-copy";
import type { RegisterMealFormValues } from "@/features/meal-register/schemas/register-meal.schema";

export function RegisterPhotoSection() {
  const { control, setValue, watch } = useFormContext<RegisterMealFormValues>();
  const photoUrl = watch("photoUrl");

  const handlePickPhoto = () => {
    // TODO: integrate camera / gallery picker
    setValue("photoUrl", "mock-photo", { shouldDirty: true });
  };

  return (
    <PlannerSection label={REGISTER_MEAL_COPY.sections.photo}>
      <Controller
        name="photoUrl"
        control={control}
        render={() => (
          <PhotoMealCard photoUrl={photoUrl} onPickPhoto={handlePickPhoto} />
        )}
      />
    </PlannerSection>
  );
}
