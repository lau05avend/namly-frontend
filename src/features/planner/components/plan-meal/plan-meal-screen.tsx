"use client";

import { useEffect } from "react";
import { FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";
import { PlanMealContent } from "@/features/planner/components/plan-meal/plan-meal-content";
import { PlanMealHeader } from "@/features/planner/components/plan-meal/plan-meal-header";
import { PlannerLoading } from "@/features/planner/components/planner-loading";
import { usePlanMealForm } from "@/features/planner/hooks/use-plan-meal-form";
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
  const params: PlanMealDefaultsParams = {
    date: initialDate,
    mealSlot: parseMealSlot(initialSlot),
  };

  const { data: defaults, isPending, isError } = usePlanMealDefaults(params);
  const saveMutation = useSavePlanMeal();

  const form = usePlanMealForm(
    defaults ?? {
      date: initialDate ?? "",
      time: "12:00",
      mealSlot: parseMealSlot(initialSlot) ?? "lunch",
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
    await saveMutation.mutateAsync(values);
    router.push("/planner");
  });

  if (isPending && !defaults) {
    return (
      <div className="mx-auto max-w-lg px-4 pt-safe">
        <PlannerLoading />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="px-4 pt-10 text-center text-sm text-foreground/60">
        No pudimos preparar el formulario. Intenta de nuevo.
      </p>
    );
  }

  return (
    <FormProvider {...form}>
      <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col bg-background">
        <PlanMealHeader onSave={handleSave} isSaving={saveMutation.isPending} />
        <PlanMealContent />
      </div>
    </FormProvider>
  );
}
