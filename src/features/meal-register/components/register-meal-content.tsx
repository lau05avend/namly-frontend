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
import type { useMealPhotoPicker } from "@/features/meal-register/hooks/use-meal-photo-picker";
import type { PlanLinkStatus } from "@/features/meal-register/schemas/register-meal.schema";
import type { ScheduledMealSuggestion } from "@/features/meal-register/types/register-meal.types";

type RegisterMealContentProps = {
  photoPicker: ReturnType<typeof useMealPhotoPicker>;
  planSuggestion?: ScheduledMealSuggestion;
  planStatus: PlanLinkStatus;
  defaultPickerDate: string;
  onLinkSuggestion: (suggestion: ScheduledMealSuggestion) => void;
  onUnlink: () => void;
  onWhenChange?: (when: RegisterWhenChangePayload) => void;
};

export function RegisterMealContent({
  photoPicker,
  planSuggestion,
  planStatus,
  defaultPickerDate,
  onLinkSuggestion,
  onUnlink,
  onWhenChange,
}: RegisterMealContentProps) {
  return (
    <div className="flex flex-col gap-6 px-4 pb-10">
      <RegisterPhotoSection photoPicker={photoPicker} />
      <RegisterNoteSection />
      <RegisterMoodSection />
      <RegisterWhenSection onWhenChange={onWhenChange} />
      <RegisterPlanSection
        suggestion={planSuggestion}
        planStatus={planStatus}
        defaultPickerDate={defaultPickerDate}
        onLinkSuggestion={onLinkSuggestion}
        onUnlink={onUnlink}
      />
      <RegisterTypeSection />
      <RegisterRecipesSection />
      <RegisterTagsSection />
    </div>
  );
}
