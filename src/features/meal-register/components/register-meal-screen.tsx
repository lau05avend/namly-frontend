"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { FormProvider, useWatch } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { RegisterMealContent } from "@/features/meal-register/components/register-meal-content";
import type { RegisterWhenChangePayload } from "@/features/meal-register/components/sections/register-when-section";
import { RegisterMealHeader } from "@/features/meal-register/components/register-meal-header";
import { REGISTER_MEAL_COPY } from "@/features/meal-register/constants/register-meal-copy";
import { registerMealQueryKeys } from "@/features/meal-register/constants/query-keys";
import { useMealPhotoPicker } from "@/features/meal-register/hooks/use-meal-photo-picker";
import { useRegisterMealForm } from "@/features/meal-register/hooks/use-register-meal-form";
import { mapSuggestionRecipesToForm } from "@/features/meal-register/mappers/register-meal.mapper";
import { useMealLogSuggestions } from "@/features/meal-register/queries/use-meal-log-suggestions";
import { useSaveRegisterMeal } from "@/features/meal-register/queries/use-save-register-meal";
import { fetchMealLogSuggestions } from "@/features/meal-register/services/register-meal.service";
import type {
  PlanLinkStatus,
  RegisterMealFormValues,
} from "@/features/meal-register/schemas/register-meal.schema";
import type { ScheduledMealSuggestion } from "@/features/meal-register/types/register-meal.types";
import {
  buildLoggedAtParam,
  buildRegisterMealDefaults,
} from "@/features/meal-register/utils/register-meal-defaults";
import { PlannerLoading } from "@/features/planner/components/planner-loading";
import { useMealTypes } from "@/features/planner/queries/use-meal-types";
import { useAuth } from "@/hooks/use-auth";

type RegisterMealScreenProps = {
  initialDate?: string;
};

type RegisterMealFormProps = {
  defaults: RegisterMealFormValues;
};

function RegisterMealForm({ defaults }: RegisterMealFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();
  const [saveError, setSaveError] = useState<string | null>(null);
  const [linkedSuggestion, setLinkedSuggestion] =
    useState<ScheduledMealSuggestion | null>(null);
  const [planSuggestions, setPlanSuggestions] = useState<
    ScheduledMealSuggestion[]
  >([]);
  const photoPicker = useMealPhotoPicker();
  const form = useRegisterMealForm(defaults);
  const saveMutation = useSaveRegisterMeal();
  const { control, setValue } = form;

  const [date, time, planLinkStatus] = useWatch({
    control,
    name: ["date", "time", "planLinkStatus"],
  });
  const loggedAt = useMemo(
    () => (date && time ? buildLoggedAtParam(date, time) : undefined),
    [date, time],
  );

  const { data: querySuggestions = [] } = useMealLogSuggestions(loggedAt);
  const primarySuggestion = planSuggestions[0];

  useEffect(() => {
    setPlanSuggestions(querySuggestions);
  }, [querySuggestions]);

  const displayPlanStatus = useMemo((): PlanLinkStatus => {
    if (planLinkStatus === "linked") return "linked";
    if (planLinkStatus === "dismissed") return "dismissed";
    if (primarySuggestion) return "suggested";
    return "none";
  }, [planLinkStatus, primarySuggestion?.id]);

  const handleWhenChange = useCallback(
    async ({ date: nextDate, time: nextTime }: RegisterWhenChangePayload) => {
      const nextLoggedAt = buildLoggedAtParam(nextDate, nextTime);

      setPlanSuggestions([]);
      setLinkedSuggestion(null);
      setValue("linkedPlanId", undefined, { shouldDirty: false });
      setValue("planLinkStatus", "none", { shouldDirty: false });

      if (!isAuthenticated || !nextLoggedAt) {
        return;
      }

      const nextSuggestions = await queryClient.fetchQuery({
        queryKey: registerMealQueryKeys.suggestions(nextLoggedAt),
        queryFn: () => fetchMealLogSuggestions(nextLoggedAt),
      });

      setPlanSuggestions(nextSuggestions);
    },
    [isAuthenticated, queryClient, setValue],
  );

  const handleLinkSuggestion = (suggestion: ScheduledMealSuggestion) => {
    setLinkedSuggestion(suggestion);
    setValue("planLinkStatus", "linked", { shouldDirty: true });
    setValue("linkedPlanId", suggestion.id, { shouldDirty: true });
    setValue("mealTypeId", suggestion.mealType.id, { shouldDirty: true });
    setValue("recipes", mapSuggestionRecipesToForm(suggestion), {
      shouldDirty: true,
    });
  };

  const planSuggestion =
    displayPlanStatus === "linked"
      ? linkedSuggestion ?? primarySuggestion
      : displayPlanStatus === "suggested"
        ? primarySuggestion
        : undefined;

  const handleSave = form.handleSubmit(async (values) => {
    setSaveError(null);
    photoPicker.clearPickError();

    const photoFile = photoPicker.getPendingFile();
    if (!photoFile) {
      setSaveError(REGISTER_MEAL_COPY.errors.photoRequired);
      return;
    }

    try {
      await saveMutation.mutateAsync({ values, photoFile });
      router.push("/history");
    } catch {
      setSaveError(REGISTER_MEAL_COPY.errors.save);
    }
  });

  return (
    <FormProvider {...form}>
      <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col bg-background">
        <RegisterMealHeader
          onSave={handleSave}
          isSaving={saveMutation.isPending}
        />
        {saveError ? (
          <p className="px-4 pt-3 text-center text-sm text-cta">{saveError}</p>
        ) : null}
        <RegisterMealContent
          photoPicker={photoPicker}
          planSuggestion={planSuggestion}
          planStatus={displayPlanStatus}
          onLinkSuggestion={handleLinkSuggestion}
          onDismissSuggestion={() => setLinkedSuggestion(null)}
          onWhenChange={handleWhenChange}
        />
      </div>
    </FormProvider>
  );
}

export function RegisterMealScreen({ initialDate }: RegisterMealScreenProps) {
  const {
    data: mealTypes,
    isPending: mealTypesPending,
    isError: mealTypesError,
  } = useMealTypes();

  const defaults = useMemo(() => {
    if (!mealTypes?.length) {
      return null;
    }

    return buildRegisterMealDefaults(mealTypes, { date: initialDate });
  }, [initialDate, mealTypes]);

  if (mealTypesPending || !defaults) {
    return (
      <div className="mx-auto max-w-lg px-4 pt-safe">
        <PlannerLoading />
      </div>
    );
  }

  if (mealTypesError) {
    return (
      <p className="px-4 pt-10 text-center text-sm text-foreground/60">
        {REGISTER_MEAL_COPY.errors.load}
      </p>
    );
  }

  return <RegisterMealForm defaults={defaults} />;
}
