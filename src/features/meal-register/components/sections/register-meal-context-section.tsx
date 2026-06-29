"use client";

import { useMemo, useState, type KeyboardEvent, type MouseEvent, type PointerEvent } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { RegisterContextDivider } from "@/features/meal-register/components/register-context-divider";
import { RegisterContextInfoHint } from "@/features/meal-register/components/register-context-info-hint";
import { RegisterMealContextCollapsedPreview } from "@/features/meal-register/components/register-meal-context-collapsed-preview";
import { RegisterPlanSection } from "@/features/meal-register/components/sections/register-plan-section";
import { RegisterRecipesSection } from "@/features/meal-register/components/sections/register-recipes-section";
import { RegisterTypeSection } from "@/features/meal-register/components/sections/register-type-section";
import { REGISTER_MEAL_COPY } from "@/features/meal-register/constants/register-meal-copy";
import type {
  PlanLinkStatus,
  RegisterMealFormValues,
} from "@/features/meal-register/schemas/register-meal.schema";
import type { ScheduledMealSuggestion } from "@/features/meal-register/types/register-meal.types";
import { useMealTypes } from "@/features/planner/queries/use-meal-types";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";

type RegisterMealContextSectionProps = {
  planSuggestion?: ScheduledMealSuggestion;
  planStatus: PlanLinkStatus;
  defaultPickerDate: string;
  onLinkSuggestion: (
    suggestion: ScheduledMealSuggestion,
    planEntryDate: string,
  ) => void;
  onUnlink: () => void;
  editScheduledMealId?: string | null;
  activeLinkedPlanId?: string | null;
  linkedPlanEntryDate?: string | null;
  originalScheduledSuggestion?: ScheduledMealSuggestion | null;
  originalScheduledEntryDate?: string | null;
  pinnedSuggestion?: ScheduledMealSuggestion | null;
  pinnedEntryDate?: string | null;
  defaultExpanded?: boolean;
};

type ContextCardHeaderProps = {
  expanded: boolean;
};

function stopHintToggle(event: MouseEvent | PointerEvent) {
  event.stopPropagation();
}

function ContextCardHeader({ expanded }: ContextCardHeaderProps) {
  return (
    <div className="flex w-full items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-1.5">
        <h2 className="text-[11px] font-semibold tracking-wider text-foreground uppercase">
          {REGISTER_MEAL_COPY.sections.context}
        </h2>
        <div onClick={stopHintToggle} onPointerDown={stopHintToggle}>
          <RegisterContextInfoHint />
        </div>
      </div>

      <ChevronDown
        className={cn(
          "size-4 shrink-0 text-primary/45 transition-transform duration-200",
          expanded && "rotate-180",
        )}
        aria-hidden
      />
    </div>
  );
}

export function RegisterMealContextSection({
  planSuggestion,
  planStatus,
  defaultPickerDate,
  onLinkSuggestion,
  onUnlink,
  editScheduledMealId = null,
  activeLinkedPlanId = null,
  linkedPlanEntryDate = null,
  originalScheduledSuggestion = null,
  originalScheduledEntryDate = null,
  pinnedSuggestion = null,
  pinnedEntryDate = null,
  defaultExpanded = true,
}: RegisterMealContextSectionProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const { control } = useFormContext<RegisterMealFormValues>();
  const mealTypeId = useWatch({ control, name: "mealTypeId" });
  const recipes = useWatch({ control, name: "recipes" }) ?? [];
  const { data: mealTypes = [] } = useMealTypes();

  const mealTypeName = useMemo(() => {
    const fromSuggestion = planSuggestion?.mealType.name;
    if (fromSuggestion) {
      return fromSuggestion;
    }

    return mealTypes.find((type) => type.id === mealTypeId)?.name ?? null;
  }, [mealTypeId, mealTypes, planSuggestion?.mealType.name]);

  const expand = () => setExpanded(true);
  const collapse = () => setExpanded(false);

  const handleToggleKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
    action: () => void,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      action();
    }
  };

  return (
    <section
      className={cn(
        "rounded-[22px] border border-foreground/9 px-4",
        expanded ? "py-5" : "py-4",
      )}
    >
      {!expanded ? (
        <div
          role="button"
          tabIndex={0}
          onClick={expand}
          onKeyDown={(event) => handleToggleKeyDown(event, expand)}
          aria-expanded={false}
          aria-label={REGISTER_MEAL_COPY.context.expandAriaLabel}
          className="w-full cursor-pointer text-left"
        >
          <ContextCardHeader expanded={false} />
          <RegisterMealContextCollapsedPreview
            planStatus={planStatus}
            planSuggestion={planSuggestion}
            mealTypeName={mealTypeName}
            recipeTitles={recipes.map((recipe) => recipe.title)}
          />
        </div>
      ) : (
        <div
          role="button"
          tabIndex={0}
          onClick={collapse}
          onKeyDown={(event) => handleToggleKeyDown(event, collapse)}
          aria-expanded
          aria-label={REGISTER_MEAL_COPY.context.collapseAriaLabel}
          className="-mx-1 mb-0 cursor-pointer rounded-lg px-1 py-1 text-left transition-colors"
        >
          <ContextCardHeader expanded />
        </div>
      )}

      <AnimatePresence initial={false}>
        {expanded ? (
          <motion.div
            key="meal-context-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-5 pt-5">
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

              <RegisterContextDivider />

              <RegisterTypeSection />

              <RegisterContextDivider />

              <RegisterRecipesSection />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
