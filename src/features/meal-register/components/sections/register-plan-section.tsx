"use client";

import { useFormContext } from "react-hook-form";
import { PlanMatchCard } from "@/components/meal-register/plan-match-card";
import { PlannerSection } from "@/components/planner/planner-section";
import { REGISTER_MEAL_COPY } from "@/features/meal-register/constants/register-meal-copy";
import type { RegisterMealFormValues } from "@/features/meal-register/schemas/register-meal.schema";
import type { PlanMatchSuggestion } from "@/features/meal-register/types/register-meal.types";

type RegisterPlanSectionProps = {
  planSuggestion?: PlanMatchSuggestion;
};

export function RegisterPlanSection({
  planSuggestion,
}: RegisterPlanSectionProps) {
  const { watch, setValue } = useFormContext<RegisterMealFormValues>();
  const planLinkStatus = watch("planLinkStatus");

  return (
    <PlannerSection label={REGISTER_MEAL_COPY.sections.plan}>
      <PlanMatchCard
        status={planLinkStatus}
        suggestion={planSuggestion}
        onLink={() => {
          setValue("planLinkStatus", "linked", { shouldDirty: true });
          setValue("linkedPlanId", planSuggestion?.id, { shouldDirty: true });
        }}
        onDismiss={() => {
          setValue("planLinkStatus", "dismissed", { shouldDirty: true });
        }}
        onSearchPlans={() => {
          // TODO: open plan picker sheet
          console.info("[register-meal] search plans");
        }}
      />
    </PlannerSection>
  );
}
