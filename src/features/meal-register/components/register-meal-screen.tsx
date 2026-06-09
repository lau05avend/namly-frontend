"use client";

import { useEffect } from "react";
import { FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";
import { RegisterMealContent } from "@/features/meal-register/components/register-meal-content";
import { RegisterMealHeader } from "@/features/meal-register/components/register-meal-header";
import { useRegisterMealForm } from "@/features/meal-register/hooks/use-register-meal-form";
import { useRegisterMealDefaults } from "@/features/meal-register/queries/use-register-meal-defaults";
import { useSaveRegisterMeal } from "@/features/meal-register/queries/use-save-register-meal";
import { toDateKey } from "@/features/calendar/utils/date";
import { getMockRegisterMealDefaults } from "@/features/meal-register/services/mock-register-meal-data";
import type { RegisterMealDefaults } from "@/features/meal-register/types/register-meal.types";
import type { RegisterMealFormValues } from "@/features/meal-register/schemas/register-meal.schema";
import { PlannerLoading } from "@/features/planner/components/planner-loading";

type RegisterMealScreenProps = {
  initialDate?: string;
};

function toFormValues(source: RegisterMealDefaults): RegisterMealFormValues {
  const { planSuggestion: _ignored, ...formValues } = source;
  return formValues;
}

export function RegisterMealScreen({ initialDate }: RegisterMealScreenProps) {
  const router = useRouter();
  const {
    data: defaults,
    isPending,
    isError,
  } = useRegisterMealDefaults({
    date: initialDate,
  });
  const saveMutation = useSaveRegisterMeal();

  const form = useRegisterMealForm(
    toFormValues(
      defaults ??
        getMockRegisterMealDefaults({
          date: initialDate ?? toDateKey(new Date()),
        }),
    ),
  );
  const { reset } = form;

  useEffect(() => {
    if (defaults) {
      reset(toFormValues(defaults));
    }
  }, [defaults, reset]);

  const handleSave = form.handleSubmit(async (values) => {
    await saveMutation.mutateAsync(values);
    router.push("/home");
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
        No pudimos abrir el registro. Intenta de nuevo.
      </p>
    );
  }

  return (
    <FormProvider {...form}>
      <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col bg-background">
        <RegisterMealHeader
          onSave={handleSave}
          isSaving={saveMutation.isPending}
        />
        <RegisterMealContent planSuggestion={defaults?.planSuggestion} />
      </div>
    </FormProvider>
  );
}
