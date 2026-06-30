"use client";

import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { PlannerSection } from "@/components/planner/planner-section";
import { MealTypeFormPicker } from "@/features/planner/components/meal-types/meal-type-form-picker";
import { MealTypeHabitualInfoHint } from "@/features/planner/components/meal-types/meal-type-habitual-info-hint";
import { MealTypeViewAllLink } from "@/features/planner/components/meal-types/meal-type-quick-chip";
import { SelectMealTypeSheet } from "@/features/planner/components/meal-types/select-meal-type-sheet";

type MealTypeFormSectionProps = {
  label: string;
};

export function MealTypeFormSection({ label }: MealTypeFormSectionProps) {
  const { control } = useFormContext<{ mealTypeId: string }>();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <Controller
      name="mealTypeId"
      control={control}
      render={({ field }) => (
        <>
          <PlannerSection
            label={label}
            headerAccessory={<MealTypeHabitualInfoHint placement="bottom" />}
            headerTrailing={
              <MealTypeViewAllLink onPress={() => setIsSheetOpen(true)} />
            }
          >
            <MealTypeFormPicker value={field.value} onChange={field.onChange} />
          </PlannerSection>

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
