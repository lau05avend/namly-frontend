"use client";

import { AnimatePresence, motion } from "motion/react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { RegisterRecipeRow } from "@/components/meal-register/register-recipe-row";
import { PlannerDashedAddButton } from "@/components/planner/planner-dashed-add-button";
import { PlannerSection } from "@/components/planner/planner-section";
import { REGISTER_MEAL_COPY } from "@/features/meal-register/constants/register-meal-copy";
import type { RegisterMealFormValues } from "@/features/meal-register/schemas/register-meal.schema";
import { createRegisterItemId } from "@/features/meal-register/utils/register-item-id";

export function RegisterRecipesSection() {
  const { control } = useFormContext<RegisterMealFormValues>();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "recipes",
  });

  return (
    <PlannerSection label={REGISTER_MEAL_COPY.sections.recipes}>
      <div className="flex flex-col gap-2">
        <AnimatePresence initial={false}>
          {fields.map((field, index) => (
            <motion.div
              key={field.id}
              layout
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
            >
              <RegisterRecipeRow
                title={field.title}
                onTitleChange={(title) => update(index, { ...field, title })}
                onRemove={() => remove(index)}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        <PlannerDashedAddButton
          label={REGISTER_MEAL_COPY.recipes.add}
          onClick={() => append({ id: createRegisterItemId(), title: "" })}
        />
      </div>
    </PlannerSection>
  );
}
