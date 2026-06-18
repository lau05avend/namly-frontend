"use client";

import { useFormContext } from "react-hook-form";
import { PlanMatchCard } from "@/components/meal-register/plan-match-card";
import { PlannerSection } from "@/components/planner/planner-section";
import { REGISTER_MEAL_COPY } from "@/features/meal-register/constants/register-meal-copy";
import { toPlanMatchSuggestion } from "@/features/meal-register/mappers/register-meal.mapper";
import type {
  PlanLinkStatus,
  RegisterMealFormValues,
} from "@/features/meal-register/schemas/register-meal.schema";
import type { ScheduledMealSuggestion } from "@/features/meal-register/types/register-meal.types";

type RegisterPlanSectionProps = {
  suggestion?: ScheduledMealSuggestion;
  planStatus: PlanLinkStatus;
  onLinkSuggestion: (suggestion: ScheduledMealSuggestion) => void;
  onDismissSuggestion?: () => void;
};

export function RegisterPlanSection({
  suggestion,
  planStatus,
  onLinkSuggestion,
  onDismissSuggestion,
}: RegisterPlanSectionProps) {
  const { setValue } = useFormContext<RegisterMealFormValues>();
  const planMatchSuggestion = suggestion
    ? toPlanMatchSuggestion(suggestion)
    : undefined;

  return (
    <PlannerSection label={REGISTER_MEAL_COPY.sections.plan}>
      <PlanMatchCard
        status={planStatus}
        suggestion={planMatchSuggestion}
        onLink={() => {
          if (suggestion) {
            onLinkSuggestion(suggestion);
          }
        }}
        onDismiss={() => {
          setValue("planLinkStatus", "dismissed", { shouldDirty: true });
          onDismissSuggestion?.();
        }}
        onSearchPlans={() => {
          // TODO: open plan picker modal
        }}
      />
    </PlannerSection>
  );
}
