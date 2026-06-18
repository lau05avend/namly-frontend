"use client";

import { Controller, useFormContext } from "react-hook-form";
import { MealLogTagPicker } from "@/features/meal-register/components/meal-log-tag-picker";
import { PlannerSection } from "@/components/planner/planner-section";
import { REGISTER_MEAL_COPY } from "@/features/meal-register/constants/register-meal-copy";
import type { RegisterMealFormValues } from "@/features/meal-register/schemas/register-meal.schema";
import { useMealLogTags } from "@/features/tags/queries/use-meal-log-tags";

export function RegisterTagsSection() {
  const { control } = useFormContext<RegisterMealFormValues>();
  const {
    data: availableTags = [],
    isPending,
    isError,
  } = useMealLogTags();

  return (
    <PlannerSection label={REGISTER_MEAL_COPY.sections.tags}>
      <Controller
        name="tags"
        control={control}
        render={({ field }) => (
          <MealLogTagPicker
            availableTags={availableTags}
            selectedTags={field.value}
            onChange={field.onChange}
            isLoading={isPending}
            isError={isError}
          />
        )}
      />
    </PlannerSection>
  );
}
