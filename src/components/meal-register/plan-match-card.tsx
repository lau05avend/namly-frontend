"use client";

import { SurfaceCard } from "@/components/ui/surface-card";
import { REGISTER_MEAL_COPY } from "@/features/meal-register/constants/register-meal-copy";
import type { PlanLinkStatus } from "@/features/meal-register/schemas/register-meal.schema";
import type { PlanMatchSuggestion } from "@/features/meal-register/types/register-meal.types";
import { cn } from "@/lib/utils";
import { CalendarDays, Check } from "lucide-react";

type PlanMatchCardProps = {
  status: PlanLinkStatus;
  suggestion?: PlanMatchSuggestion;
  onLink: () => void;
  onDismiss: () => void;
  onSearchPlans: () => void;
};

export function PlanMatchCard({
  status,
  suggestion,
  onLink,
  onDismiss,
  onSearchPlans,
}: PlanMatchCardProps) {
  if (status === "linked" && suggestion) {
    return (
      <SurfaceCard className="border-primary/20 bg-mint/20 p-4">
        <p className="mb-3 text-sm font-semibold text-primary">
          {REGISTER_MEAL_COPY.plan.linked}
        </p>
        <div className="flex items-center gap-2 rounded-2xl bg-card p-3">
          <Check className="size-4 text-primary" aria-hidden />
          <span className="text-sm text-foreground">{suggestion.detail}</span>
        </div>
      </SurfaceCard>
    );
  }

  if (status === "suggested" && suggestion) {
    return (
      <SurfaceCard className="border-primary/25 p-4">
        <p className="mb-3 text-sm font-semibold text-foreground">
          {REGISTER_MEAL_COPY.plan.matchTitle}
        </p>
        <SurfaceCard className="mb-4 flex items-start gap-3 bg-mint/30 p-3 shadow-none">
          <CalendarDays
            className="mt-0.5 size-4 shrink-0 text-primary"
            aria-hidden
          />
          <div>
            <p className="text-sm font-semibold text-foreground">
              {suggestion.meta}
            </p>
            <p className="text-sm text-foreground/60">{suggestion.detail}</p>
          </div>
        </SurfaceCard>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onLink}
            className="flex-1 rounded-full bg-primary py-2.5 text-sm font-semibold text-white"
          >
            {REGISTER_MEAL_COPY.plan.link}
          </button>
          <button
            type="button"
            onClick={onDismiss}
            className="flex-1 rounded-full bg-mint py-2.5 text-sm font-semibold text-primary"
          >
            {REGISTER_MEAL_COPY.plan.seeOthers}
          </button>
        </div>
      </SurfaceCard>
    );
  }

  return (
    <SurfaceCard className="p-4">
      <p className="mb-2 text-sm text-foreground/60">
        {REGISTER_MEAL_COPY.plan.noMatch}
      </p>
      <button
        type="button"
        onClick={onSearchPlans}
        className={cn(
          "w-full rounded-full border border-dashed border-primary/30 py-2.5 text-sm font-semibold text-primary",
        )}
      >
        {REGISTER_MEAL_COPY.plan.searchPlan}
      </button>
    </SurfaceCard>
  );
}
