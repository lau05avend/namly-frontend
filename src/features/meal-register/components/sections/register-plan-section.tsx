"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { PlanMatchCard } from "@/components/meal-register/plan-match-card";
import { PlannerSection } from "@/components/planner/planner-section";
import { LinkPlanSheet } from "@/features/meal-register/components/link-plan-sheet";
import { RegisterPlanInfoHint } from "@/features/meal-register/components/register-plan-info-hint";
import { REGISTER_MEAL_COPY } from "@/features/meal-register/constants/register-meal-copy";
import type {
  PlanLinkStatus,
  RegisterMealFormValues,
} from "@/features/meal-register/schemas/register-meal.schema";
import type { ScheduledMealSuggestion } from "@/features/meal-register/types/register-meal.types";

type RegisterPlanSectionProps = {
  suggestion?: ScheduledMealSuggestion;
  planStatus: PlanLinkStatus;
  defaultPickerDate: string;
  onLinkSuggestion: (suggestion: ScheduledMealSuggestion) => void;
  onUnlink: () => void;
};

export function RegisterPlanSection({
  suggestion,
  planStatus,
  defaultPickerDate,
  onLinkSuggestion,
  onUnlink,
}: RegisterPlanSectionProps) {
  const { watch } = useFormContext<RegisterMealFormValues>();
  const formDate = watch("date");
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [pickerSession, setPickerSession] = useState(0);

  return (
    <>
      <PlannerSection
        label={REGISTER_MEAL_COPY.sections.plan}
        headerAccessory={<RegisterPlanInfoHint />}
      >
        <PlanMatchCard
          status={planStatus}
          suggestion={suggestion}
          onLink={() => {
            if (suggestion) {
              onLinkSuggestion(suggestion);
            }
          }}
          onUnlink={onUnlink}
          onSearchPlans={() => {
            setPickerSession((session) => session + 1);
            setIsPickerOpen(true);
          }}
        />
      </PlannerSection>

      <LinkPlanSheet
        key={pickerSession}
        open={isPickerOpen}
        onOpenChange={setIsPickerOpen}
        defaultDate={formDate || defaultPickerDate}
        onConfirm={onLinkSuggestion}
      />
    </>
  );
}
