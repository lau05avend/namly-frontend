"use client";

import { REGISTER_MEAL_COPY } from "@/features/meal-register/constants/register-meal-copy";
import type { PlanLinkStatus } from "@/features/meal-register/schemas/register-meal.schema";
import type { ScheduledMealSuggestion } from "@/features/meal-register/types/register-meal.types";
import { buildMealContextCollapsedSummary } from "@/features/meal-register/utils/build-meal-context-summary.utils";
import { CircleCheck } from "lucide-react";

type RegisterMealContextCollapsedPreviewProps = {
  planStatus: PlanLinkStatus;
  planSuggestion?: ScheduledMealSuggestion;
  mealTypeName: string | null;
  recipeTitles: string[];
};

export function RegisterMealContextCollapsedPreview({
  planStatus,
  planSuggestion,
  mealTypeName,
  recipeTitles,
}: RegisterMealContextCollapsedPreviewProps) {
  const summary = buildMealContextCollapsedSummary({
    planStatus,
    planSuggestion,
    mealTypeName,
    recipeTitles,
  });

  if (!summary.hasContent) {
    return (
      <p className="mt-3 text-sm leading-snug text-foreground/40">
        {REGISTER_MEAL_COPY.context.collapsedEmpty}
      </p>
    );
  }

  return (
    <div className="mt-3 flex flex-col gap-0.5">
      {summary.layout === "linked" && summary.linkedPlanTime ? (
        <p className="inline-flex items-center gap-1 text-xs font-medium leading-snug text-primary">
          <CircleCheck className="size-3 shrink-0" strokeWidth={2} aria-hidden />
          <span>
            {REGISTER_MEAL_COPY.plan.linkedLabel} · {summary.linkedPlanTime}
          </span>
        </p>
      ) : null}

      {summary.mealLine ? (
        <p className="text-sm leading-snug text-foreground/60">{summary.mealLine}</p>
      ) : null}

      {summary.gapsLine ? (
        <p className="text-xs leading-snug text-foreground/35">{summary.gapsLine}</p>
      ) : null}
    </div>
  );
}
