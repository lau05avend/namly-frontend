"use client";

import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { MealTypeFormPicker } from "@/features/planner/components/meal-types/meal-type-form-picker";
import { MealTypeHabitualInfoHint } from "@/features/planner/components/meal-types/meal-type-habitual-info-hint";
import { MealTypeViewAllLink } from "@/features/planner/components/meal-types/meal-type-quick-chip";
import { SelectMealTypeSheet } from "@/features/planner/components/meal-types/select-meal-type-sheet";
import { RegisterFormSection } from "@/features/meal-register/components/register-form-section";
import { REGISTER_MEAL_COPY } from "@/features/meal-register/constants/register-meal-copy";
import type { RegisterMealFormValues } from "@/features/meal-register/schemas/register-meal.schema";

export function RegisterTypeSection() {
  const { control } = useFormContext<RegisterMealFormValues>();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <Controller
      name="mealTypeId"
      control={control}
      render={({ field }) => (
        <>
          <RegisterFormSection
            title={REGISTER_MEAL_COPY.sections.mealType}
            headerAccessory={<MealTypeHabitualInfoHint />}
            headerTrailing={
              <MealTypeViewAllLink onPress={() => setIsSheetOpen(true)} />
            }
          >
            <MealTypeFormPicker value={field.value} onChange={field.onChange} />
          </RegisterFormSection>

          <SelectMealTypeSheet
            open={isSheetOpen}
            onOpenChange={setIsSheetOpen}
            selectedId={field.value}
            onSelect={field.onChange}
          />
        </>
      )}
    />
  );
}
