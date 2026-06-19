"use client";

import { PlannerDashedAddButton } from "@/components/planner/planner-dashed-add-button";
import { PlanCompactRow } from "@/components/meal/plan-compact-row";
import { REGISTER_MEAL_COPY } from "@/features/meal-register/constants/register-meal-copy";
import { resolveSuggestionSecondaryLine } from "@/features/meal-register/mappers/register-meal.mapper";
import type { PlanLinkStatus } from "@/features/meal-register/schemas/register-meal.schema";
import type { ScheduledMealSuggestion } from "@/features/meal-register/types/register-meal.types";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

type PlanMatchCardProps = {
  status: PlanLinkStatus;
  suggestion?: ScheduledMealSuggestion;
  onLink: () => void;
  onUnlink: () => void;
  onSearchPlans: () => void;
  className?: string;
};

export function PlanMatchCard({
  status,
  suggestion,
  onLink,
  onUnlink,
  onSearchPlans,
  className,
}: PlanMatchCardProps) {
  if (status === "linked" && suggestion) {
    return (
      <div className={className}>
        <PlanCompactRow
          variant="linked"
          label={REGISTER_MEAL_COPY.plan.linkedLabel}
          secondaryLine={resolveSuggestionSecondaryLine(suggestion)}
          trailing={
            <button
              type="button"
              onClick={onUnlink}
              aria-label={REGISTER_MEAL_COPY.plan.unlinkAria}
              className="flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-full text-foreground/30 transition-colors hover:bg-foreground/5 hover:text-foreground/55"
            >
              <X className="size-3.5" strokeWidth={2} aria-hidden />
            </button>
          }
        />
      </div>
    );
  }

  if (status === "suggested" && suggestion) {
    return (
      <div
        className={cn(
          "overflow-hidden rounded-lg border border-primary/12 bg-mint/15",
          className,
        )}
      >
        <PlanCompactRow
          variant="suggested"
          label={REGISTER_MEAL_COPY.plan.suggestedLabel}
          secondaryLine={resolveSuggestionSecondaryLine(suggestion)}
          className="border-0 bg-transparent"
        />
        <div className="flex gap-2 border-t border-primary/10 px-2.5 pb-2.5 pt-2">
          <button
            type="button"
            onClick={onLink}
            className="flex-1 cursor-pointer rounded-lg border border-primary/25 bg-mint/35 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-mint/45 active:bg-mint/50"
          >
            {REGISTER_MEAL_COPY.plan.link}
          </button>
          <button
            type="button"
            onClick={onSearchPlans}
            className="flex-1 cursor-pointer rounded-lg border border-primary/12 bg-card/80 py-1.5 text-xs font-semibold text-primary/70 transition-colors hover:border-primary/20 hover:bg-mint/15 hover:text-primary active:bg-mint/20"
          >
            {REGISTER_MEAL_COPY.plan.seeOthers}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <p className="text-sm text-foreground/50">
        {REGISTER_MEAL_COPY.plan.noMatch}
      </p>
      <PlannerDashedAddButton
        label={REGISTER_MEAL_COPY.plan.searchPlan}
        onClick={onSearchPlans}
      />
    </div>
  );
}
