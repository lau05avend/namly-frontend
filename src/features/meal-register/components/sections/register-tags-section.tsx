"use client";

import { Controller, useFormContext } from "react-hook-form";
import { TagSelector } from "@/components/meal-register/tag-selector";
import { PlannerSection } from "@/components/planner/planner-section";
import { REGISTER_MEAL_COPY } from "@/features/meal-register/constants/register-meal-copy";
import type { RegisterMealFormValues } from "@/features/meal-register/schemas/register-meal.schema";

export function RegisterTagsSection() {
  const { control, setValue, watch } = useFormContext<RegisterMealFormValues>();
  const tags = watch("tags");

  const toggleTag = (tag: string) => {
    const next = tags.includes(tag)
      ? tags.filter((item) => item !== tag)
      : [...tags, tag];
    setValue("tags", next, { shouldDirty: true });
  };

  return (
    <PlannerSection label={REGISTER_MEAL_COPY.sections.tags}>
      <Controller
        name="tags"
        control={control}
        render={() => <TagSelector selected={tags} onToggle={toggleTag} />}
      />
    </PlannerSection>
  );
}
