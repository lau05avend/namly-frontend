"use client";

import { useRouter } from "next/navigation";
import { FormScreenHeader } from "@/components/navigation/form-screen-header";
import { PLAN_MEAL_COPY } from "@/features/planner/constants/plan-meal-copy";

type PlanMealHeaderProps = {
  onSave: () => void;
  isSaving?: boolean;
};

export function PlanMealHeader({
  onSave,
  isSaving = false,
}: PlanMealHeaderProps) {
  const router = useRouter();

  return (
    <FormScreenHeader
      title={PLAN_MEAL_COPY.title}
      backLabel={PLAN_MEAL_COPY.back}
      saveLabel={PLAN_MEAL_COPY.save}
      onBack={() => router.back()}
      onSave={onSave}
      isSaving={isSaving}
    />
  );
}
