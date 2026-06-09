"use client";

import { AnimatePresence, motion } from "motion/react";
import { useFormContext, useWatch } from "react-hook-form";
import { PlanMealDateSection } from "@/features/planner/components/plan-meal/plan-meal-date-section";
import { PlanMealExpressSection } from "@/features/planner/components/plan-meal/plan-meal-express-section";
import { PlanMealModeSection } from "@/features/planner/components/plan-meal/plan-meal-mode-section";
import { PlanMealRecipesSection } from "@/features/planner/components/plan-meal/plan-meal-recipes-section";
import { PlanMealRemindersSection } from "@/features/planner/components/plan-meal/plan-meal-reminders-section";
import { PlanMealTypeSection } from "@/features/planner/components/plan-meal/plan-meal-type-section";
import type { PlanMealFormValues } from "@/features/planner/schemas/plan-meal.schema";

export function PlanMealContent() {
  const { control } = useFormContext<PlanMealFormValues>();
  const entryMode = useWatch({ control, name: "entryMode" });

  return (
    <div className="flex flex-col gap-6 px-4 pb-10">
      <PlanMealDateSection />
      <PlanMealTypeSection />
      <PlanMealModeSection />

      <AnimatePresence mode="wait" initial={false}>
        {entryMode === "recipe" ? (
          <motion.div
            key="recipe"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
          >
            <PlanMealRecipesSection />
          </motion.div>
        ) : (
          <motion.div
            key="express"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
          >
            <PlanMealExpressSection />
          </motion.div>
        )}
      </AnimatePresence>

      <PlanMealRemindersSection />
    </div>
  );
}
