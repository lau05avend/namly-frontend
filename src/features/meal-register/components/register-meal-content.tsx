"use client";

import { RegisterMoodSection } from "@/features/meal-register/components/sections/register-mood-section";
import { RegisterNoteSection } from "@/features/meal-register/components/sections/register-note-section";
import { RegisterPhotoSection } from "@/features/meal-register/components/sections/register-photo-section";
import { RegisterPlanSection } from "@/features/meal-register/components/sections/register-plan-section";
import { RegisterRecipesSection } from "@/features/meal-register/components/sections/register-recipes-section";
import { RegisterTagsSection } from "@/features/meal-register/components/sections/register-tags-section";
import { RegisterTypeSection } from "@/features/meal-register/components/sections/register-type-section";
import { RegisterWhenSection } from "@/features/meal-register/components/sections/register-when-section";
import type { PlanMatchSuggestion } from "@/features/meal-register/types/register-meal.types";

type RegisterMealContentProps = {
  planSuggestion?: PlanMatchSuggestion;
};

export function RegisterMealContent({
  planSuggestion,
}: RegisterMealContentProps) {
  return (
    <div className="flex flex-col gap-6 px-4 pb-10">
      <RegisterPhotoSection />
      <RegisterNoteSection />
      <RegisterMoodSection />
      <RegisterWhenSection />
      <RegisterPlanSection planSuggestion={planSuggestion} />
      <RegisterTypeSection />
      <RegisterRecipesSection />
      <RegisterTagsSection />
    </div>
  );
}
