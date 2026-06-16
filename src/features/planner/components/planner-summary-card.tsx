"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SurfaceCard } from "@/components/ui/surface-card";
import { PLANNER_COPY } from "@/features/planner/constants/planner-copy";
import type {
  PlannerRegisteredMeal,
  PlannerRegisteredSummary,
} from "@/features/planner/types/planner.types";
import { Check, ChevronDown, ChevronUp, Sparkles } from "lucide-react";

type PlannerSummaryCardProps = {
  summary: PlannerRegisteredSummary;
};

function CompletedCheckIcon({ size = "md" }: { size?: "md" | "sm" }) {
  const isSmall = size === "sm";

  return (
    <span
      className={
        isSmall
          ? "flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
          : "flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary"
      }
    >
      <Check
        className={isSmall ? "size-3" : "size-3.5"}
        strokeWidth={2.5}
        aria-hidden="true"
      />
    </span>
  );
}

function RegisteredMealItem({ meal }: { meal: PlannerRegisteredMeal }) {
  return (
    <div className="flex gap-3 py-3">
      <CompletedCheckIcon size="sm" />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <p className="text-sm font-medium text-foreground/65">
            {meal.mealTypeName}
          </p>
          <p className="text-xs text-foreground/38">{meal.timeLabel}</p>
        </div>
        {meal.detail ? (
          <p className="mt-0.5 text-xs leading-relaxed text-foreground/48">
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
    <SurfaceCard className="overflow-hidden border-foreground/7 bg-card/50 p-0 shadow-none">
      <button
        type="button"
        onClick={handleToggle}
        disabled={!canExpand}
        aria-expanded={expanded}
        className="flex w-full items-center gap-3 px-3.5 py-3.5 text-left disabled:cursor-default"
      >
        <CompletedCheckIcon />
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1.5 text-sm font-medium text-foreground/70">
            {summary.subtitle}
            <Sparkles
              className="size-3.5 shrink-0 text-primary"
              aria-hidden="true"
            />
          </p>
        </div>
        {canExpand ? (
          expanded ? (
            <ChevronUp
              className="size-4 shrink-0 text-foreground/28"
              aria-hidden="true"
            />
          ) : (
            <ChevronDown
              className="size-4 shrink-0 text-foreground/28"
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
            <div className="border-t border-foreground/6 px-3.5">
              {summary.meals.map((meal, index) => (
                <div key={meal.id}>
                  {index > 0 ? (
                    <div
                      className="border-t border-foreground/6"
                      aria-hidden="true"
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
