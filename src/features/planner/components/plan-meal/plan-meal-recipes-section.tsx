"use client";

import { AnimatePresence, motion } from "motion/react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { PlannerDashedAddButton } from "@/components/planner/planner-dashed-add-button";
import { PlannerSection } from "@/components/planner/planner-section";
import { RecipePlanCard } from "@/components/planner/recipe-plan-card";
import { PLAN_MEAL_COPY } from "@/features/planner/constants/plan-meal-copy";
import type { PlanMealFormValues } from "@/features/planner/schemas/plan-meal.schema";
import { createPlanItemId } from "@/features/planner/utils/plan-meal-id";

export function PlanMealRecipesSection() {
  const {
    control,
    formState: { errors },
  } = useFormContext<PlanMealFormValues>();

  const { fields, append, remove, move, update } = useFieldArray({
    control,
    name: "recipes",
  });

  const addRecipe = () => {
    append({
      id: createPlanItemId(),
      title: "",
      subtitle: "",
    });
  };

  return (
    <PlannerSection label={PLAN_MEAL_COPY.sections.recipes}>
      <div className="flex flex-col gap-3">
        <AnimatePresence initial={false}>
          {fields.map((field, index) => (
            <motion.div
              key={field.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <RecipePlanCard
                recipe={field}
                index={index}
                total={fields.length}
                onTitleChange={(title) =>
                  update(index, { ...field, title })
                }
                onSubtitleChange={(subtitle) =>
                  update(index, { ...field, subtitle })
                }
                onRemove={() => remove(index)}
                onMoveUp={() => move(index, index - 1)}
                onMoveDown={() => move(index, index + 1)}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {fields.length === 0 ? (
          <p className="text-sm text-foreground/50">{PLAN_MEAL_COPY.recipes.empty}</p>
        ) : null}

        <PlannerDashedAddButton
          label={PLAN_MEAL_COPY.recipes.add}
          onClick={addRecipe}
        />

        {errors.recipes?.message ? (
          <p className="text-xs text-cta">{String(errors.recipes.message)}</p>
        ) : null}
      </div>
    </PlannerSection>
  );
}
