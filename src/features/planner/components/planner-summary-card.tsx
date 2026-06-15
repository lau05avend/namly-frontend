"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SurfaceCard } from "@/components/ui/surface-card";
import type {
  PlannerRegisteredMeal,
  PlannerRegisteredSummary,
} from "@/features/planner/types/planner.types";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

type PlannerSummaryCardProps = {
  summary: PlannerRegisteredSummary;
};

function RegisteredMealItem({ meal }: { meal: PlannerRegisteredMeal }) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center text-primary">
        <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-foreground/75">
          {meal.mealTypeName}
        </p>
        <p className="mt-0.5 text-xs text-foreground/45">{meal.timeLabel}</p>
        {meal.detail ? (
          <p className="mt-1 text-sm leading-relaxed text-foreground/65">
            {meal.detail}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export function PlannerSummaryCard({ summary }: PlannerSummaryCardProps) {
  const [expanded, setExpanded] = useState(false);
  const canExpand = summary.meals.length > 0;

  const handleToggle = () => {
    if (!canExpand) {
      return;
    }

    setExpanded((value) => !value);
  };

  return (
    <SurfaceCard className="overflow-hidden border-mint/80 bg-mint/30 p-4">
      <button
        type="button"
        onClick={handleToggle}
        disabled={!canExpand}
        aria-expanded={expanded}
        className="flex w-full items-center gap-3 text-left disabled:cursor-default"
      >
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-white">
          <Check className="size-4" strokeWidth={3} aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-foreground/75">{summary.label}</p>
          {!expanded ? (
            <p className="text-xs text-foreground/45">{summary.hint}</p>
          ) : null}
        </div>
        {canExpand ? (
          expanded ? (
            <ChevronUp
              className="size-4 shrink-0 text-foreground/35"
              aria-hidden="true"
            />
          ) : (
            <ChevronDown
              className="size-4 shrink-0 text-foreground/35"
              aria-hidden="true"
            />
          )
        ) : null}
      </button>

      <AnimatePresence initial={false}>
        {expanded ? (
          <motion.div
            key="registered-meals"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-4 flex flex-col gap-4 border-t border-foreground/8 pt-4">
              {summary.meals.map((meal, index) => (
                <div key={meal.id}>
                  {index > 0 ? (
                    <div
                      className="mb-4 border-t border-foreground/6"
                      aria-hidden
                    />
                  ) : null}
                  <RegisteredMealItem meal={meal} />
                </div>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </SurfaceCard>
  );
}
