"use client";

import type { ReactNode } from "react";
import { PlannerDashedAddButton } from "@/components/planner/planner-dashed-add-button";
import {
  PLAN_COMPACT_ROW_VARIANTS,
  type PlanCompactRowVariant,
} from "@/components/meal/plan-compact-row";
import { REGISTER_MEAL_COPY } from "@/features/meal-register/constants/register-meal-copy";
import { resolveSuggestionSecondaryLine } from "@/features/meal-register/mappers/register-meal.mapper";
import type { PlanLinkStatus } from "@/features/meal-register/schemas/register-meal.schema";
import type { ScheduledMealSuggestion } from "@/features/meal-register/types/register-meal.types";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { Search, X } from "lucide-react";

type PlanMatchCardProps = {
  status: PlanLinkStatus;
  suggestion?: ScheduledMealSuggestion;
  onLink: () => void;
  onUnlink: () => void;
  onSearchPlans: () => void;
  className?: string;
};

type PlanMatchHeaderActionsProps = {
  status: PlanCompactRowVariant;
  onLink?: () => void;
  onUnlink?: () => void;
  linkAsBadge?: boolean;
};

function PlanMatchHeaderActions({
  status,
  onLink,
  onUnlink,
  linkAsBadge = false,
}: PlanMatchHeaderActionsProps) {
  if (status === "suggested" && onLink) {
    const linkClassName =
      "shrink-0 rounded-md bg-primary/10 px-2 py-1 text-[11px] font-semibold text-primary";

    if (linkAsBadge) {
      return (
        <span aria-hidden className={linkClassName}>
          {REGISTER_MEAL_COPY.plan.link}
        </span>
      );
    }

    return (
      <button
        type="button"
        onClick={onLink}
        className={cn(linkClassName, "cursor-pointer transition-colors hover:bg-primary/15 active:bg-primary/20")}
      >
        {REGISTER_MEAL_COPY.plan.link}
      </button>
    );
  }

  if (status === "linked" && onUnlink) {
    return (
      <button
        type="button"
        onClick={onUnlink}
        aria-label={REGISTER_MEAL_COPY.plan.unlinkAria}
        className="flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-full text-foreground/30 transition-colors hover:bg-foreground/5 hover:text-foreground/55"
      >
        <X className="size-3.5" strokeWidth={2} aria-hidden />
      </button>
    );
  }

  return null;
}

type PlanMatchCardShellProps = {
  variant: PlanCompactRowVariant;
  label: string;
  secondaryLine: string;
  onPress?: () => void;
  pressAriaLabel?: string;
  headerActions?: ReactNode;
};

function PlanMatchCardShell({
  variant,
  label,
  secondaryLine,
  onPress,
  pressAriaLabel,
  headerActions,
}: PlanMatchCardShellProps) {
  const config = PLAN_COMPACT_ROW_VARIANTS[variant];
  const Icon = config.Icon;

  const shellClassName = cn(
    "rounded-2xl border px-3 py-3 shadow-sm shadow-foreground/5 transition-[colors,opacity] duration-300",
    variant === "suggested"
      ? "border-foreground/10 bg-card"
      : config.rowClass,
    onPress &&
      "w-full cursor-pointer text-left hover:opacity-95 active:opacity-90",
  );

  const content = (
    <div className="flex items-start gap-2">
      <span
        className={cn(
          "flex size-7 shrink-0 items-center justify-center",
          config.iconWrap,
        )}
      >
        <Icon className={config.iconClass} strokeWidth={2} aria-hidden />
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p
              className={cn(
                "text-xs font-semibold leading-none",
                variant === "suggested"
                  ? "text-foreground/70"
                  : config.labelClass,
              )}
            >
              {label}
            </p>
            <p className="mt-1 text-xs leading-snug text-foreground/75">
              {secondaryLine}
            </p>
          </div>

          {headerActions}
        </div>
      </div>
    </div>
  );

  if (onPress) {
    return (
      <button
        type="button"
        onClick={onPress}
        aria-label={pressAriaLabel}
        className={shellClassName}
      >
        {content}
      </button>
    );
  }

  return <div className={shellClassName}>{content}</div>;
}

function PlanSearchButton({ onClick }: { onClick: () => void }) {
  return (
    <PlannerDashedAddButton
      label={REGISTER_MEAL_COPY.plan.seeOthers}
      onClick={onClick}
      icon={Search}
      className="rounded-xl border-dashed border-foreground/10 bg-card/25 px-3 py-2 text-xs font-medium text-foreground/42 shadow-none transition-colors hover:border-foreground/12 hover:bg-card/40 hover:text-foreground/55"
    />
  );
}

type ActivePlanMatchCardProps = {
  status: PlanCompactRowVariant;
  suggestion: ScheduledMealSuggestion;
  onLink: () => void;
  onUnlink: () => void;
  onSearchPlans: () => void;
  className?: string;
};

function ActivePlanMatchCard({
  status,
  suggestion,
  onLink,
  onUnlink,
  onSearchPlans,
  className,
}: ActivePlanMatchCardProps) {
  const secondaryLine = resolveSuggestionSecondaryLine(suggestion);
  const label =
    status === "linked"
      ? REGISTER_MEAL_COPY.plan.linkedLabel
      : REGISTER_MEAL_COPY.plan.suggestedLabel;

  return (
    <div className={cn("flex flex-col gap-2.5", className)}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={status}
          initial={{ opacity: 0.85 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <PlanMatchCardShell
            variant={status}
            label={label}
            secondaryLine={secondaryLine}
            onPress={status === "suggested" ? onLink : undefined}
            pressAriaLabel={
              status === "suggested"
                ? `${REGISTER_MEAL_COPY.plan.link}: ${secondaryLine}`
                : undefined
            }
            headerActions={
              <PlanMatchHeaderActions
                status={status}
                onLink={onLink}
                onUnlink={onUnlink}
                linkAsBadge={status === "suggested"}
              />
            }
          />
        </motion.div>
      </AnimatePresence>

      <PlanSearchButton onClick={onSearchPlans} />
    </div>
  );
}

export function PlanMatchCard({
  status,
  suggestion,
  onLink,
  onUnlink,
  onSearchPlans,
  className,
}: PlanMatchCardProps) {
  if ((status === "linked" || status === "suggested") && suggestion) {
    return (
      <ActivePlanMatchCard
        status={status}
        suggestion={suggestion}
        onLink={onLink}
        onUnlink={onUnlink}
        onSearchPlans={onSearchPlans}
        className={className}
      />
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
