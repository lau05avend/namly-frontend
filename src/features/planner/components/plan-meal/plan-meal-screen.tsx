"use client";

import { useEffect, useState } from "react";
import { FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";
import { PlanMealContent } from "@/features/planner/components/plan-meal/plan-meal-content";
import { PlanMealHeader } from "@/features/planner/components/plan-meal/plan-meal-header";
import { PlannerLoading } from "@/features/planner/components/planner-loading";
import { PLAN_MEAL_COPY } from "@/features/planner/constants/plan-meal-copy";
import { usePlanMealForm } from "@/features/planner/hooks/use-plan-meal-form";
import { useMealTypes } from "@/features/planner/queries/use-meal-types";
import { usePlanMealDefaults } from "@/features/planner/queries/use-plan-meal-defaults";
import { useSavePlanMeal } from "@/features/planner/queries/use-save-plan-meal";
import type { PlanMealDefaultsParams } from "@/features/planner/types/plan-meal.types";
import type { MealSlot } from "@/constants/meal-slots";
import { MEAL_SLOTS } from "@/constants/meal-slots";

type PlanMealScreenProps = {
  initialDate?: string;
  initialSlot?: string;
};

function parseMealSlot(value?: string): MealSlot | undefined {
  if (!value) return undefined;
  return MEAL_SLOTS.includes(value as MealSlot)
    ? (value as MealSlot)
    : undefined;
}

export function PlanMealScreen({
  initialDate,
  initialSlot,
}: PlanMealScreenProps) {
  const router = useRouter();
  const [saveError, setSaveError] = useState<string | null>(null);
  const params: PlanMealDefaultsParams = {
    date: initialDate,
    mealSlot: parseMealSlot(initialSlot),
  };

  const {
    isPending: mealTypesPending,
    isError: mealTypesError,
  } = useMealTypes();
  const { data: defaults, isPending: defaultsPending, isError: defaultsError } =
    usePlanMealDefaults(params);
  const saveMutation = useSavePlanMeal();

  const form = usePlanMealForm(
    defaults ?? {
      date: initialDate ?? "",
      time: "12:00",
      mealTypeId: "",
      entryMode: "recipe",
      expressNote: "",
      recipes: [],
      remindersEnabled: true,
      reminders: [],
    },
  );
  const { reset } = form;

  useEffect(() => {
    if (defaults) {
      reset(defaults);
    }
  }, [defaults, reset]);

  const handleSave = form.handleSubmit(async (values) => {
    setSaveError(null);

    try {
      await saveMutation.mutateAsync(values);
      const params = new URLSearchParams({ date: values.date });
      router.push(`/planner?${params.toString()}`);
    } catch {
      setSaveError(PLAN_MEAL_COPY.errors.save);
    }
  });

  const isLoading =
    (mealTypesPending || defaultsPending) && !defaults;

  if (isLoading) {
    return (
      <div className="mx-auto max-w-lg px-4 pt-safe">
        <PlannerLoading />
      </div>
    );
  }

  if (mealTypesError || defaultsError) {
    return (
      <p className="px-4 pt-10 text-center text-sm text-foreground/60">
        {PLAN_MEAL_COPY.errors.loadForm}
      </p>
    );
  }

  return (
    <FormProvider {...form}>
      <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col bg-background">
        <PlanMealHeader onSave={handleSave} isSaving={saveMutation.isPending} />
        {saveError ? (
          <p className="px-4 pt-3 text-center text-sm text-cta">{saveError}</p>
        ) : null}
        <PlanMealContent />
      </div>
    </FormProvider>
  );
}
