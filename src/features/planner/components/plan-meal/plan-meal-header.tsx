"use client";

import { useRouter } from "next/navigation";
import { FormScreenHeader } from "@/components/navigation/form-screen-header";
import { PLAN_MEAL_COPY } from "@/features/planner/constants/plan-meal-copy";

type PlanMealHeaderProps = {
  onSave: () => void;
  isSaving?: boolean;
  isEditMode?: boolean;
};

export function PlanMealHeader({
  onSave,
  isSaving = false,
  isEditMode = false,
}: PlanMealHeaderProps) {
  const router = useRouter();

  return (
    <FormScreenHeader
      title={isEditMode ? PLAN_MEAL_COPY.editTitle : PLAN_MEAL_COPY.title}
      backLabel={PLAN_MEAL_COPY.back}
      saveLabel={isEditMode ? PLAN_MEAL_COPY.update : PLAN_MEAL_COPY.save}
      onBack={() => router.back()}
      onSave={onSave}
      isSaving={isSaving}
    />
  );
}
