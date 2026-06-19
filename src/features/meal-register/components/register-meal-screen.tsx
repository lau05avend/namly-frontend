"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { FormProvider, useWatch } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { RegisterMealContent } from "@/features/meal-register/components/register-meal-content";
import { RegisterMealHeader } from "@/features/meal-register/components/register-meal-header";
import { REGISTER_MEAL_COPY } from "@/features/meal-register/constants/register-meal-copy";
import { useMealPhotoPicker } from "@/features/meal-register/hooks/use-meal-photo-picker";
import { useRegisterMealForm } from "@/features/meal-register/hooks/use-register-meal-form";
import { mapSuggestionRecipesToForm } from "@/features/meal-register/mappers/register-meal.mapper";
import { useMealLogSuggestions } from "@/features/meal-register/queries/use-meal-log-suggestions";
import { useSaveRegisterMeal } from "@/features/meal-register/queries/use-save-register-meal";
import type {
  PlanLinkStatus,
  RegisterMealFormValues,
} from "@/features/meal-register/schemas/register-meal.schema";
import type { ScheduledMealSuggestion } from "@/features/meal-register/types/register-meal.types";
import {
  buildLoggedAtParam,
  buildRegisterMealDefaults,
} from "@/features/meal-register/utils/register-meal-defaults";
import { resolveInitialRegisterPhoto } from "@/features/meal-register/utils/register-meal-launch";
import { PlannerLoading } from "@/features/planner/components/planner-loading";
import { useMealTypes } from "@/features/planner/queries/use-meal-types";

type RegisterMealScreenProps = {
  initialDate?: string;
};

type RegisterMealFormProps = {
  defaults: RegisterMealFormValues;
};

type PreLinkSnapshot = {
  mealTypeId: string;
  recipes: RegisterMealFormValues["recipes"];
};

function RegisterMealForm({ defaults }: RegisterMealFormProps) {
  const router = useRouter();
  const [saveError, setSaveError] = useState<string | null>(null);
  const [linkedSuggestion, setLinkedSuggestion] =
    useState<ScheduledMealSuggestion | null>(null);
  const [initialPhotoFile] = useState(() => resolveInitialRegisterPhoto());
  const photoPicker = useMealPhotoPicker(initialPhotoFile);
  const form = useRegisterMealForm(defaults);
  const saveMutation = useSaveRegisterMeal();
  const { control, setValue, getValues } = form;
  const preLinkSnapshotRef = useRef<PreLinkSnapshot | null>(null);

  const [date, time, planLinkStatus] = useWatch({
    control,
    name: ["date", "time", "planLinkStatus"],
  });
  const loggedAt = useMemo(
    () => (date && time ? buildLoggedAtParam(date, time) : undefined),
    [date, time],
  );

  const { data: planSuggestions = [] } = useMealLogSuggestions(loggedAt);
  const primarySuggestion = planSuggestions[0];

  const displayPlanStatus = useMemo((): PlanLinkStatus => {
    if (planLinkStatus === "linked") return "linked";
    if (planLinkStatus === "dismissed") return "dismissed";
    if (primarySuggestion) return "suggested";
    return "none";
  }, [planLinkStatus, primarySuggestion]);

  const handleWhenChange = useCallback(() => {
      setLinkedSuggestion(null);
      preLinkSnapshotRef.current = null;
      setValue("linkedPlanId", undefined, { shouldDirty: false });
      setValue("planLinkStatus", "none", { shouldDirty: false });
  }, [setValue]);

  const handleLinkSuggestion = (suggestion: ScheduledMealSuggestion) => {
    const currentValues = getValues();
    preLinkSnapshotRef.current = {
      mealTypeId: currentValues.mealTypeId,
      recipes: currentValues.recipes,
    };
    setLinkedSuggestion(suggestion);
    setValue("planLinkStatus", "linked", { shouldDirty: true });
    setValue("linkedPlanId", suggestion.id, { shouldDirty: true });
    setValue("mealTypeId", suggestion.mealType.id, { shouldDirty: true });
    setValue("recipes", mapSuggestionRecipesToForm(suggestion), {
      shouldDirty: true,
    });
  };

  const handleUnlink = () => {
    const snapshot = preLinkSnapshotRef.current;

    setLinkedSuggestion(null);
    setValue("planLinkStatus", "none", { shouldDirty: true });
    setValue("linkedPlanId", undefined, { shouldDirty: true });

    if (snapshot) {
      setValue("mealTypeId", snapshot.mealTypeId, { shouldDirty: true });
      setValue("recipes", snapshot.recipes, { shouldDirty: true });
    }

    preLinkSnapshotRef.current = null;
  };

  const planSuggestion =
    displayPlanStatus === "linked"
      ? (linkedSuggestion ?? primarySuggestion)
      : displayPlanStatus === "suggested"
        ? primarySuggestion
        : undefined;

  const handleSave = form.handleSubmit(async (values) => {
    setSaveError(null);
    photoPicker.actions.clearPickError();

    const photoFile = photoPicker.actions.getPendingFile();
    if (!photoFile) {
      const message = REGISTER_MEAL_COPY.errors.photoRequired;
      setSaveError(message);
      toast.error(message);
      return;
    }

    try {
      await saveMutation.mutateAsync({ values, photoFile });
      router.push("/history");
    } catch (error) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : REGISTER_MEAL_COPY.errors.save;
      setSaveError(message);
      toast.error(message, { duration: 6000 });
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
          defaultPickerDate={defaults.date}
          onLinkSuggestion={handleLinkSuggestion}
          onUnlink={handleUnlink}
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
        <PlannerLoading variant="form" />
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
