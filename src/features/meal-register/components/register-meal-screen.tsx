"use client";

import { useSyncMealTimeOnOpen } from "@/components/meal/hooks/use-sync-meal-time-on-open";
import { useCallback, useMemo, useRef, useState } from "react";
import { FormProvider, useWatch } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { RegisterMealContent } from "@/features/meal-register/components/register-meal-content";
import { RegisterMealHeader } from "@/features/meal-register/components/register-meal-header";
import { RegisterPlanDateResetSheet } from "@/features/meal-register/components/register-plan-date-reset-sheet";
import type { RegisterWhenChangePayload } from "@/features/meal-register/components/sections/register-when-section";
import { REGISTER_MEAL_COPY } from "@/features/meal-register/constants/register-meal-copy";
import { useMealPhotoPicker } from "@/features/meal-register/hooks/use-meal-photo-picker";
import { useRegisterMealForm } from "@/features/meal-register/hooks/use-register-meal-form";
import {
  mapMealLogDetailToFormValues,
  mapMealLogDetailToLinkedSuggestion,
} from "@/features/meal-register/mappers/edit-meal-log.mapper";
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
import { useHistoryMealLog } from "@/features/history/queries/use-history-meal-log";
import { PlannerLoading } from "@/features/planner/components/planner-loading";
import { useMealTypes } from "@/features/planner/queries/use-meal-types";
import { getUserFacingErrorMessage } from "@/lib/api/get-user-facing-error-message";

type RegisterMealScreenProps = {
  initialDate?: string;
  editLogId?: string;
};

type RegisterMealFormProps = {
  defaults: RegisterMealFormValues;
  editLogId?: string;
  editScheduledMealId?: string | null;
  editScheduledMealEntryDate?: string | null;
  initialLinkedSuggestion?: ScheduledMealSuggestion | null;
  initialRemoteMediaUrl?: string | null;
};

type PreLinkSnapshot = {
  mealTypeId: string;
  recipes: RegisterMealFormValues["recipes"];
};

type PendingDateChange = {
  previousDate: string;
  nextDate: string;
};

type OriginalBdLinkSnapshot = {
  suggestion: ScheduledMealSuggestion;
  entryDate: string;
  mealId: string;
};

type ResetPlanLinkOptions = {
  dismissSuggestions?: boolean;
  restoreSnapshot?: boolean;
};

function RegisterMealForm({
  defaults,
  editLogId,
  editScheduledMealId = null,
  editScheduledMealEntryDate = null,
  initialLinkedSuggestion = null,
  initialRemoteMediaUrl = null,
}: RegisterMealFormProps) {
  const router = useRouter();
  const isEditing = Boolean(editLogId);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [linkedSuggestion, setLinkedSuggestion] =
    useState<ScheduledMealSuggestion | null>(initialLinkedSuggestion);
  const [linkedPlanEntryDate, setLinkedPlanEntryDate] = useState<string | null>(
    editScheduledMealEntryDate ?? defaults.date,
  );
  const [initialPhotoFile] = useState(() =>
    isEditing ? null : resolveInitialRegisterPhoto(),
  );
  const photoPicker = useMealPhotoPicker({
    initialFile: initialPhotoFile,
    initialRemoteMediaUrl: isEditing ? initialRemoteMediaUrl : null,
  });
  const form = useRegisterMealForm(defaults);
  const saveMutation = useSaveRegisterMeal();
  const { control, setValue, getValues } = form;
  useSyncMealTimeOnOpen(setValue, !isEditing);
  const preLinkSnapshotRef = useRef<PreLinkSnapshot | null>(null);
  const isConfirmingDateResetRef = useRef(false);
  const lastConfirmedDateRef = useRef(defaults.date);
  const [pendingDateChange, setPendingDateChange] =
    useState<PendingDateChange | null>(null);
  const [isDateResetSheetOpen, setIsDateResetSheetOpen] = useState(false);
  const [originalBdLink] = useState<OriginalBdLinkSnapshot | null>(() => {
    if (!isEditing || !editScheduledMealId || !initialLinkedSuggestion) {
      return null;
    }

    return {
      suggestion: initialLinkedSuggestion,
      entryDate: editScheduledMealEntryDate ?? defaults.date,
      mealId: editScheduledMealId,
    };
  });

  const [date, time, planLinkStatus] = useWatch({
    control,
    name: ["date", "time", "planLinkStatus"],
  });
  const loggedAt = useMemo(
    () => (date && time ? buildLoggedAtParam(date, time) : undefined),
    [date, time],
  );

  const bdEntryDate = editScheduledMealEntryDate ?? defaults.date;

  const suggestionsScheduledMealId = useMemo(() => {
    if (!isEditing || !editScheduledMealId) {
      return undefined;
    }

    const currentDate = (date || defaults.date).slice(0, 10);
    const savedDate = bdEntryDate.slice(0, 10);

    if (currentDate !== savedDate) {
      return undefined;
    }

    return editScheduledMealId;
  }, [isEditing, editScheduledMealId, date, defaults.date, bdEntryDate]);

  const { data: planSuggestions = [] } = useMealLogSuggestions(loggedAt, {
    scheduledMealId: suggestionsScheduledMealId,
  });
  const primarySuggestion = planSuggestions[0];

  const displayPlanStatus = useMemo((): PlanLinkStatus => {
    if (planLinkStatus === "linked") return "linked";
    if (planLinkStatus === "dismissed") return "dismissed";
    if (primarySuggestion) return "suggested";
    return "none";
  }, [planLinkStatus, primarySuggestion]);

  const resetPlanLink = useCallback(
    (options?: ResetPlanLinkOptions) => {
      const snapshot = preLinkSnapshotRef.current;

      setLinkedSuggestion(null);
      setLinkedPlanEntryDate(null);
      setValue("linkedPlanId", undefined, { shouldDirty: true });
      setValue(
        "planLinkStatus",
        options?.dismissSuggestions ? "dismissed" : "none",
        { shouldDirty: true },
      );

      if (options?.restoreSnapshot) {
        if (snapshot) {
          setValue("mealTypeId", snapshot.mealTypeId, { shouldDirty: true });
          setValue("recipes", snapshot.recipes, { shouldDirty: true });
        } else if (isEditing) {
          setValue("mealTypeId", defaults.mealTypeId, { shouldDirty: true });
          setValue("recipes", defaults.recipes, { shouldDirty: true });
        }
      }

      preLinkSnapshotRef.current = null;
    },
    [defaults.mealTypeId, defaults.recipes, isEditing, setValue],
  );

  const handleDateChangeAttempt = useCallback(
    (nextDate: string): boolean => {
      const previousDate = lastConfirmedDateRef.current;

      if (nextDate === previousDate) {
        return true;
      }

      const hasLinkage = getValues().planLinkStatus === "linked";

      if (isEditing && hasLinkage) {
        setPendingDateChange((current) =>
          current
            ? { previousDate: current.previousDate, nextDate }
            : { previousDate, nextDate },
        );
        setIsDateResetSheetOpen(true);
        return false;
      }

      return true;
    },
    [getValues, isEditing],
  );

  const handleWhenChange = useCallback(
    ({ date: nextDate }: RegisterWhenChangePayload) => {
      const previousDate = lastConfirmedDateRef.current;

      if (nextDate === previousDate) {
        return;
      }

      const hasLinkage = getValues().planLinkStatus === "linked";

      if (isEditing && hasLinkage) {
        return;
      }

      resetPlanLink({ restoreSnapshot: true });
      lastConfirmedDateRef.current = nextDate;
    },
    [getValues, isEditing, resetPlanLink],
  );

  const handleDateResetSheetOpenChange = useCallback((open: boolean) => {
    if (!open && !isConfirmingDateResetRef.current) {
      setPendingDateChange(null);
    }

    if (!open) {
      isConfirmingDateResetRef.current = false;
    }

    setIsDateResetSheetOpen(open);
  }, []);

  const handleConfirmDateReset = useCallback(() => {
    isConfirmingDateResetRef.current = true;
    const nextDate = pendingDateChange?.nextDate;

    resetPlanLink({ dismissSuggestions: true, restoreSnapshot: true });

    if (nextDate) {
      setValue("date", nextDate, { shouldDirty: true });
      lastConfirmedDateRef.current = nextDate;
    }

    setPendingDateChange(null);
    setIsDateResetSheetOpen(false);
  }, [pendingDateChange, resetPlanLink, setValue]);

  const handleLinkSuggestion = (
    suggestion: ScheduledMealSuggestion,
    planEntryDate: string,
  ) => {
    const currentValues = getValues();
    preLinkSnapshotRef.current = {
      mealTypeId: currentValues.mealTypeId,
      recipes: currentValues.recipes,
    };
    setLinkedSuggestion(suggestion);
    setLinkedPlanEntryDate(planEntryDate);
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
    setLinkedPlanEntryDate(null);
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

  const linkedEntryDate =
    displayPlanStatus === "linked"
      ? (linkedPlanEntryDate ?? date ?? defaults.date)
      : null;

  const handleSave = form.handleSubmit(async (values) => {
    setSaveError(null);
    photoPicker.actions.clearPickError();

    const photoFile = photoPicker.actions.getPendingFile();
    const existingMediaUrl = photoPicker.actions.getExistingMediaUrl();

    if (!photoFile && !existingMediaUrl) {
      const message = REGISTER_MEAL_COPY.errors.photoRequired;
      setSaveError(message);
      toast.error(message);
      return;
    }

    try {
      const response = await saveMutation.mutateAsync({
        values,
        photoFile: photoFile ?? undefined,
        existingMediaUrl: existingMediaUrl ?? undefined,
        logId: editLogId,
      });

      if (isEditing) {
        const returnUrl = `/history/meals/${response.id}?date=${values.date}`;
        const dateChanged = values.date !== defaults.date;

        if (dateChanged) {
          router.replace(returnUrl);
        } else {
          router.back();
        }
        return;
      }

      router.push("/history");
    } catch (error) {
      const message = getUserFacingErrorMessage(
        error,
        REGISTER_MEAL_COPY.errors.save,
      );
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
          title={
            isEditing ? REGISTER_MEAL_COPY.editTitle : REGISTER_MEAL_COPY.title
          }
          saveLabel={
            isEditing ? REGISTER_MEAL_COPY.saveEdit : REGISTER_MEAL_COPY.save
          }
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
          onDateChangeAttempt={handleDateChangeAttempt}
          editScheduledMealId={originalBdLink?.mealId ?? editScheduledMealId}
          activeLinkedPlanId={
            displayPlanStatus === "linked" ? linkedSuggestion?.id : null
          }
          linkedPlanEntryDate={
            displayPlanStatus === "linked" ? linkedPlanEntryDate : null
          }
          originalScheduledSuggestion={originalBdLink?.suggestion ?? null}
          originalScheduledEntryDate={originalBdLink?.entryDate ?? null}
          pinnedSuggestion={
            displayPlanStatus === "linked" ? linkedSuggestion : null
          }
          pinnedEntryDate={linkedEntryDate}
        />
        <RegisterPlanDateResetSheet
          open={isDateResetSheetOpen}
          onOpenChange={handleDateResetSheetOpenChange}
          onConfirm={handleConfirmDateReset}
        />
      </div>
    </FormProvider>
  );
}

export function RegisterMealScreen({
  initialDate,
  editLogId,
}: RegisterMealScreenProps) {
  const isEditing = Boolean(editLogId);
  const {
    data: editLog,
    isPending: editLogPending,
    isError: editLogError,
  } = useHistoryMealLog(editLogId ?? "");
  const {
    data: mealTypes,
    isPending: mealTypesPending,
    isError: mealTypesError,
  } = useMealTypes();

  const createDefaults = useMemo(() => {
    if (!mealTypes?.length) {
      return null;
    }

    return buildRegisterMealDefaults(mealTypes, { date: initialDate });
  }, [initialDate, mealTypes]);

  const editDefaults = useMemo(() => {
    if (!isEditing || !editLog || !mealTypes?.length) {
      return null;
    }

    return mapMealLogDetailToFormValues(editLog);
  }, [editLog, isEditing, mealTypes]);

  const editLinkedSuggestion = useMemo(() => {
    if (!editLog) {
      return null;
    }

    return mapMealLogDetailToLinkedSuggestion(editLog);
  }, [editLog]);

  const editScheduledMealId = editLog?.scheduledMeal?.id ?? null;
  const editScheduledMealEntryDate = editLog?.scheduledMeal?.entryDate ?? null;

  const defaults = isEditing ? editDefaults : createDefaults;
  const isLoading =
    mealTypesPending || (isEditing && editLogPending) || !defaults;

  if (isLoading) {
    return (
      <div className="mx-auto max-w-lg px-4 pt-safe">
        <PlannerLoading variant="form" />
      </div>
    );
  }

  if (mealTypesError || (isEditing && editLogError)) {
    return (
      <p className="px-4 pt-10 text-center text-sm text-foreground/60">
        {REGISTER_MEAL_COPY.errors.load}
      </p>
    );
  }

  return (
    <RegisterMealForm
      defaults={defaults}
      editLogId={editLogId}
      editScheduledMealId={editScheduledMealId}
      editScheduledMealEntryDate={editScheduledMealEntryDate}
      initialLinkedSuggestion={editLinkedSuggestion}
      initialRemoteMediaUrl={editLog?.mediaUrl ?? null}
    />
  );
}
