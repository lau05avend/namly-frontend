"use client";

import { useRouter } from "next/navigation";
import { PLAN_MEAL_COPY } from "@/features/planner/constants/plan-meal-copy";
import { ArrowLeft, Check } from "lucide-react";

type PlanMealHeaderProps = {
  onSave: () => void;
  isSaving?: boolean;
};

export function PlanMealHeader({
  onSave,
  isSaving = false,
}: PlanMealHeaderProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-30 -mx-4 flex items-center justify-between gap-3 border-b border-foreground/5 bg-background/95 px-4 py-3 backdrop-blur-sm pt-safe">
      <button
        type="button"
        onClick={() => router.back()}
        aria-label={PLAN_MEAL_COPY.back}
        className="flex size-10 items-center justify-center rounded-full text-foreground/70"
      >
        <ArrowLeft className="size-5" />
      </button>
      <h1 className="flex-1 text-center text-base font-bold text-foreground">
        {PLAN_MEAL_COPY.title}
      </h1>
      <button
        type="button"
        onClick={onSave}
        disabled={isSaving}
        aria-label={PLAN_MEAL_COPY.save}
        className="flex size-10 items-center justify-center rounded-full bg-primary text-white disabled:opacity-50"
      >
        <Check className="size-5" strokeWidth={2.5} />
      </button>
    </header>
  );
}
