"use client";

import { useSyncMealTimeOnOpen } from "@/components/meal/hooks/use-sync-meal-time-on-open";
import { useState } from "react";
import { FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";
import { PlanMealContent } from "@/features/planner/components/plan-meal/plan-meal-content";
import { FormAlert } from "@/components/ui/form-alert";
import { PlanMealHeader } from "@/features/planner/components/plan-meal/plan-meal-header";
import { PlannerLoading } from "@/features/planner/components/planner-loading";
import { getUserFacingErrorMessage } from "@/lib/api/get-user-facing-error-message";
import { PLAN_MEAL_COPY } from "@/features/planner/constants/plan-meal-copy";
import { usePlanMealForm } from "@/features/planner/hooks/use-plan-meal-form";
import { useMealTypes } from "@/features/planner/queries/use-meal-types";
import { usePlanMealDefaults } from "@/features/planner/queries/use-plan-meal-defaults";
import { useSavePlanMeal } from "@/features/planner/queries/use-save-plan-meal";
import { useUpdatePlanMeal } from "@/features/planner/queries/use-update-plan-meal";
import type {
  PlanMealDefaults,
  PlanMealDefaultsParams,
} from "@/features/planner/types/plan-meal.types";
import type { MealSlot } from "@/constants/meal-slots";
import { MEAL_SLOTS } from "@/constants/meal-slots";

type PlanMealScreenProps = {
  initialDate?: string;
  initialSlot?: string;
  editId?: string;
};

type PlanMealFormProps = {
  defaults: PlanMealDefaults;
  editId?: string;
  previousEntryDate?: string;
};

function parseMealSlot(value?: string): MealSlot | undefined {
  if (!value) return undefined;
  return MEAL_SLOTS.includes(value as MealSlot)
    ? (value as MealSlot)
    : undefined;
}

function PlanMealForm({ defaults, editId, previousEntryDate }: PlanMealFormProps) {
  const router = useRouter();
  const [saveError, setSaveError] = useState<string | null>(null);
  const form = usePlanMealForm(defaults);
  const isEditMode = Boolean(editId);
  useSyncMealTimeOnOpen(form.setValue, !isEditMode);
  const saveMutation = useSavePlanMeal();
  const updateMutation = useUpdatePlanMeal();
  const isSaving = saveMutation.isPending || updateMutation.isPending;

  const handleSave = form.handleSubmit(async (values) => {
    setSaveError(null);

    try {
      if (editId) {
        await updateMutation.mutateAsync({
          scheduledMealId: editId,
          payload: values,
          previousEntryDate,
        });
        router.replace(`/planner/${editId}?date=${values.date}`);
        return;
      }

      await saveMutation.mutateAsync(values);
      const params = new URLSearchParams({ date: values.date });
      router.push(`/planner?${params.toString()}`);
    } catch (error) {
      setSaveError(
        getUserFacingErrorMessage(error, PLAN_MEAL_COPY.errors.save),
      );
    }
  });

  return (
    <FormProvider {...form}>
      <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col bg-background">
        <PlanMealHeader
          onSave={handleSave}
          isSaving={isSaving}
          isEditMode={isEditMode}
        />
        {saveError ? (
          <FormAlert message={saveError} centered className="mx-4 mt-3" />
        ) : null}
        <PlanMealContent />
      </div>
    </FormProvider>
  );
}

export function PlanMealScreen({
  initialDate,
  initialSlot,
  editId,
}: PlanMealScreenProps) {
  const params: PlanMealDefaultsParams = {
    date: initialDate,
    mealSlot: parseMealSlot(initialSlot),
    scheduledMealId: editId,
  };

  const {
    isPending: mealTypesPending,
    isError: mealTypesError,
  } = useMealTypes();
  const {
    data: defaults,
    isPending: defaultsPending,
    isError: defaultsError,
  } = usePlanMealDefaults(params);

  const isLoading = (mealTypesPending || defaultsPending) && !defaults;
  const isEditMode = Boolean(editId);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-lg px-4 pt-safe">
        <PlannerLoading variant="form" />
      </div>
    );
  }

  if ((!isEditMode && mealTypesError) || defaultsError || !defaults) {
    return (
      <p className="px-4 pt-10 text-center text-sm text-foreground/60">
        {PLAN_MEAL_COPY.errors.loadForm}
      </p>
    );
  }

  return (
    <PlanMealForm
      key={`${editId ?? ""}-${initialDate ?? ""}-${initialSlot ?? ""}`}
      defaults={defaults}
      editId={editId}
      previousEntryDate={isEditMode ? defaults.date : undefined}
    />
  );
}
