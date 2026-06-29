"use client";

import { RegisterMoodSection } from "@/features/meal-register/components/sections/register-mood-section";
import { RegisterNoteSection } from "@/features/meal-register/components/sections/register-note-section";
import { RegisterPhotoSection } from "@/features/meal-register/components/sections/register-photo-section";
import { RegisterPlanSection } from "@/features/meal-register/components/sections/register-plan-section";
import { RegisterRecipesSection } from "@/features/meal-register/components/sections/register-recipes-section";
import { RegisterTagsSection } from "@/features/meal-register/components/sections/register-tags-section";
import { RegisterTypeSection } from "@/features/meal-register/components/sections/register-type-section";
import {
  RegisterWhenSection,
  type RegisterWhenChangePayload,
} from "@/features/meal-register/components/sections/register-when-section";
import type { MealPhotoPicker } from "@/features/meal-register/hooks/use-meal-photo-picker";
import type { PlanLinkStatus } from "@/features/meal-register/schemas/register-meal.schema";
import type { ScheduledMealSuggestion } from "@/features/meal-register/types/register-meal.types";

type RegisterMealContentProps = {
  photoPicker: MealPhotoPicker;
  planSuggestion?: ScheduledMealSuggestion;
  planStatus: PlanLinkStatus;
  defaultPickerDate: string;
  onLinkSuggestion: (
    suggestion: ScheduledMealSuggestion,
    planEntryDate: string,
  ) => void;
  onUnlink: () => void;
  onWhenChange?: (when: RegisterWhenChangePayload) => void;
  onDateChangeAttempt?: (nextDate: string) => boolean;
  editScheduledMealId?: string | null;
  activeLinkedPlanId?: string | null;
  linkedPlanEntryDate?: string | null;
  originalScheduledSuggestion?: ScheduledMealSuggestion | null;
  originalScheduledEntryDate?: string | null;
  pinnedSuggestion?: ScheduledMealSuggestion | null;
  pinnedEntryDate?: string | null;
};

export function RegisterMealContent({
  photoPicker,
  planSuggestion,
  planStatus,
  defaultPickerDate,
  onLinkSuggestion,
  onUnlink,
  onWhenChange,
  onDateChangeAttempt,
  editScheduledMealId = null,
  activeLinkedPlanId = null,
  linkedPlanEntryDate = null,
  originalScheduledSuggestion = null,
  originalScheduledEntryDate = null,
  pinnedSuggestion = null,
  pinnedEntryDate = null,
}: RegisterMealContentProps) {
  return (
    <div className="flex w-full min-w-0 flex-col gap-6 overflow-x-hidden px-4 pt-3 pb-12">
      <RegisterPhotoSection
        refs={photoPicker.refs}
        state={photoPicker.state}
        actions={photoPicker.actions}
      />
      <RegisterWhenSection
        onWhenChange={onWhenChange}
        onDateChangeAttempt={onDateChangeAttempt}
      />
      <RegisterMoodSection />
      <RegisterNoteSection />
      <RegisterPlanSection
        suggestion={planSuggestion}
        planStatus={planStatus}
        defaultPickerDate={defaultPickerDate}
        onLinkSuggestion={onLinkSuggestion}
        onUnlink={onUnlink}
        editScheduledMealId={editScheduledMealId}
        activeLinkedPlanId={activeLinkedPlanId}
        linkedPlanEntryDate={linkedPlanEntryDate}
        originalScheduledSuggestion={originalScheduledSuggestion}
        originalScheduledEntryDate={originalScheduledEntryDate}
        pinnedSuggestion={pinnedSuggestion}
        pinnedEntryDate={pinnedEntryDate}
      />
      <RegisterTypeSection />
      <RegisterRecipesSection />
      <RegisterTagsSection />
    </div>
  );
}
