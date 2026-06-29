"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { PlanMatchCard } from "@/components/meal-register/plan-match-card";
import { LinkPlanSheet } from "@/features/meal-register/components/link-plan-sheet";
import { REGISTER_MEAL_COPY } from "@/features/meal-register/constants/register-meal-copy";
import type {
  PlanLinkStatus,
  RegisterMealFormValues,
} from "@/features/meal-register/schemas/register-meal.schema";
import type { ScheduledMealSuggestion } from "@/features/meal-register/types/register-meal.types";

type PickerDraftState = {
  browseDate: string;
  selectedId: string | null;
  linkedPlanId: string;
  linkedEntryDate: string;
};

function isPickerDraftValid(
  draft: PickerDraftState | null,
  linkedPlanId: string | null,
  linkedEntryDate: string | null,
): draft is PickerDraftState {
  if (!draft || !linkedPlanId || !linkedEntryDate) {
    return false;
  }

  return (
    draft.linkedPlanId === linkedPlanId &&
    draft.linkedEntryDate === linkedEntryDate
  );
}

type PinnedPlanMeal = {
  suggestion: ScheduledMealSuggestion;
  entryDate: string;
};

type RegisterPlanSectionProps = {
  suggestion?: ScheduledMealSuggestion;
  planStatus: PlanLinkStatus;
  defaultPickerDate: string;
  onLinkSuggestion: (
    suggestion: ScheduledMealSuggestion,
    planEntryDate: string,
  ) => void;
  onUnlink: () => void;
  editScheduledMealId?: string | null;
  activeLinkedPlanId?: string | null;
  linkedPlanEntryDate?: string | null;
  originalScheduledSuggestion?: ScheduledMealSuggestion | null;
  originalScheduledEntryDate?: string | null;
  pinnedSuggestion?: ScheduledMealSuggestion | null;
  pinnedEntryDate?: string | null;
};

function buildPinnedMeals({
  savedBdMealId,
  originalScheduledSuggestion,
  originalScheduledEntryDate,
  currentSuggestion,
  currentEntryDate,
  fallbackEntryDate,
}: {
  savedBdMealId?: string | null;
  originalScheduledSuggestion?: ScheduledMealSuggestion | null;
  originalScheduledEntryDate?: string | null;
  currentSuggestion?: ScheduledMealSuggestion | null;
  currentEntryDate?: string | null;
  fallbackEntryDate: string;
}): PinnedPlanMeal[] {
  const pins: PinnedPlanMeal[] = [];
  const resolvedOriginalEntryDate =
    originalScheduledEntryDate ?? fallbackEntryDate;

  if (
    savedBdMealId &&
    originalScheduledSuggestion &&
    originalScheduledSuggestion.id === savedBdMealId
  ) {
    pins.push({
      suggestion: originalScheduledSuggestion,
      entryDate: resolvedOriginalEntryDate,
    });
  } else if (originalScheduledSuggestion && originalScheduledEntryDate) {
    pins.push({
      suggestion: originalScheduledSuggestion,
      entryDate: originalScheduledEntryDate,
    });
  }

  if (
    currentSuggestion &&
    currentEntryDate &&
    !pins.some((pin) => pin.suggestion.id === currentSuggestion.id)
  ) {
    pins.push({
      suggestion: currentSuggestion,
      entryDate: currentEntryDate,
    });
  }

  return pins;
}

export function RegisterPlanSection({
  suggestion,
  planStatus,
  defaultPickerDate,
  onLinkSuggestion,
  onUnlink,
  editScheduledMealId = null,
  activeLinkedPlanId = null,
  linkedPlanEntryDate = null,
  originalScheduledSuggestion = null,
  originalScheduledEntryDate = null,
  pinnedSuggestion = null,
  pinnedEntryDate = null,
}: RegisterPlanSectionProps) {
  const { getValues } = useFormContext<RegisterMealFormValues>();
  const formDate = useWatch({ name: "date" });
  const formTime = useWatch({ name: "time" });
  const linkedPlanId = useWatch({ name: "linkedPlanId" });
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [pickerSession, setPickerSession] = useState(0);
  const [pickerBrowseDate, setPickerBrowseDate] = useState<string | null>(null);
  const [pickerDraft, setPickerDraft] = useState<PickerDraftState | null>(null);

  const linkContextKey = `${activeLinkedPlanId ?? ""}:${linkedPlanEntryDate ?? ""}:${planStatus}`;
  const prevLinkContextKeyRef = useRef(linkContextKey);

  useEffect(() => {
    if (linkContextKey !== prevLinkContextKeyRef.current) {
      setPickerDraft(null);
      setPickerSession((session) => session + 1);
      prevLinkContextKeyRef.current = linkContextKey;
    }
  }, [linkContextKey]);

  const pickerConfig = useMemo(() => {
    const resolvedFormDate = formDate || defaultPickerDate;
    const resolvedBrowseDate = pickerBrowseDate ?? resolvedFormDate;
    const resolvedLinkedId =
      activeLinkedPlanId ??
      linkedPlanId ??
      suggestion?.id ??
      null;
    const resolvedLinkedEntryDate =
      linkedPlanEntryDate ?? pinnedEntryDate ?? null;
    const currentSuggestion = pinnedSuggestion ?? suggestion ?? null;

    const pinnedMeals = buildPinnedMeals({
      savedBdMealId: editScheduledMealId,
      originalScheduledSuggestion,
      originalScheduledEntryDate,
      currentSuggestion,
      currentEntryDate: resolvedLinkedEntryDate,
      fallbackEntryDate: resolvedFormDate,
    });

    if (planStatus === "linked") {
      const validDraft = isPickerDraftValid(
        pickerDraft,
        resolvedLinkedId,
        resolvedLinkedEntryDate,
      );

      const entryDate =
        (validDraft ? pickerDraft.browseDate : null) ??
        resolvedLinkedEntryDate ??
        resolvedFormDate;

      const initialSelectedId =
        validDraft &&
        pickerDraft.browseDate === entryDate &&
        pickerDraft.selectedId
          ? pickerDraft.selectedId
          : resolvedLinkedId;

      return {
        initialDate: entryDate,
        initialSelectedId,
        selectionEntryDate: resolvedLinkedEntryDate ?? entryDate,
        pinnedMeals,
        badgeMealId: editScheduledMealId,
        badgeMealLabel: editScheduledMealId
          ? REGISTER_MEAL_COPY.plan.pickerCurrentLabel
          : null,
      };
    }

    if (planStatus === "suggested" && suggestion) {
      return {
        initialDate: resolvedBrowseDate,
        initialSelectedId: null,
        selectionEntryDate: null,
        pinnedMeals: buildPinnedMeals({
          savedBdMealId: editScheduledMealId,
          originalScheduledSuggestion,
          originalScheduledEntryDate,
          currentSuggestion: suggestion,
          currentEntryDate: resolvedBrowseDate,
          fallbackEntryDate: resolvedBrowseDate,
        }),
        badgeMealId: suggestion.id,
        badgeMealLabel: REGISTER_MEAL_COPY.plan.suggestedLabel,
      };
    }

    return {
      initialDate: resolvedBrowseDate,
      initialSelectedId: null,
      selectionEntryDate: null,
      pinnedMeals: buildPinnedMeals({
        savedBdMealId: editScheduledMealId,
        originalScheduledSuggestion,
        originalScheduledEntryDate,
        fallbackEntryDate: resolvedBrowseDate,
      }),
      badgeMealId: null,
      badgeMealLabel: null,
    };
  }, [
    activeLinkedPlanId,
    defaultPickerDate,
    editScheduledMealId,
    formDate,
    linkedPlanEntryDate,
    linkedPlanId,
    originalScheduledEntryDate,
    originalScheduledSuggestion,
    pickerBrowseDate,
    pickerDraft,
    pinnedEntryDate,
    pinnedSuggestion,
    planStatus,
    suggestion,
  ]);

  const handlePickerConfirm = (
    meal: ScheduledMealSuggestion,
    entryDate: string,
  ) => {
    setPickerDraft(null);
    setIsPickerOpen(false);
    onLinkSuggestion(meal, entryDate);
  };

  const handlePickerDismiss = (
    browseDate: string,
    selectedId: string | null,
  ) => {
    if (planStatus !== "linked") {
      return;
    }

    const linkedId =
      activeLinkedPlanId ?? linkedPlanId ?? suggestion?.id ?? null;
    const linkedEntryDate =
      linkedPlanEntryDate ??
      pinnedEntryDate ??
      formDate ??
      defaultPickerDate;

    if (!linkedId || !linkedEntryDate) {
      return;
    }

    setPickerDraft({
      browseDate,
      selectedId,
      linkedPlanId: linkedId,
      linkedEntryDate,
    });
  };

  const planContent = (
    <PlanMatchCard
      status={planStatus}
      suggestion={suggestion}
      onLink={() => {
        if (suggestion) {
          onLinkSuggestion(suggestion, formDate || defaultPickerDate);
        }
      }}
      onUnlink={() => {
        setPickerDraft(null);
        onUnlink();
      }}
      onSearchPlans={() => {
        setPickerBrowseDate(getValues("date") || defaultPickerDate);
        setPickerSession((session) => session + 1);
        setIsPickerOpen(true);
      }}
    />
  );

  return (
    <>
      {planContent}

      <LinkPlanSheet
        key={`picker-${pickerSession}`}
        open={isPickerOpen}
        onOpenChange={setIsPickerOpen}
        defaultDate={pickerConfig.initialDate}
        initialSelectedId={pickerConfig.initialSelectedId}
        selectionEntryDate={pickerConfig.selectionEntryDate}
        pinnedMeals={pickerConfig.pinnedMeals}
        badgeMealId={pickerConfig.badgeMealId}
        badgeMealLabel={pickerConfig.badgeMealLabel}
        bdScheduledMealId={editScheduledMealId}
        bdScheduledMealEntryDate={
          originalScheduledEntryDate ?? defaultPickerDate
        }
        suggestionTime={formTime}
        onConfirm={handlePickerConfirm}
        onDismiss={handlePickerDismiss}
      />
    </>
  );
}
