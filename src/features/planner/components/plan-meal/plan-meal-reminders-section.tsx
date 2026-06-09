"use client";

import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { CollapsiblePlannerCard } from "@/components/planner/collapsible-planner-card";
import { PlannerDashedAddButton } from "@/components/planner/planner-dashed-add-button";
import { ReminderRow } from "@/components/planner/reminder-row";
import { PLAN_MEAL_COPY } from "@/features/planner/constants/plan-meal-copy";
import { useRemindersPanel } from "@/features/planner/hooks/use-reminders-panel";
import type { PlanMealFormValues } from "@/features/planner/schemas/plan-meal.schema";
import { createPlanItemId } from "@/features/planner/utils/plan-meal-id";
import { cn } from "@/lib/utils";

const MAX_REMINDERS = 3;

export function PlanMealRemindersSection() {
  const { control, setValue } = useFormContext<PlanMealFormValues>();
  const entryMode = useWatch({ control, name: "entryMode" });
  const remindersEnabled = useWatch({ control, name: "remindersEnabled" });
  const { expanded, toggle } = useRemindersPanel(entryMode);

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "reminders",
  });

  const addReminder = () => {
    if (fields.length >= MAX_REMINDERS) return;
    append({
      id: createPlanItemId(),
      label: "",
      enabled: true,
    });
  };

  return (
    <CollapsiblePlannerCard
      title={PLAN_MEAL_COPY.sections.reminders}
      hint={PLAN_MEAL_COPY.reminders.collapsedHint}
      expanded={expanded}
      onToggle={toggle}
      trailing={
        <button
          type="button"
          role="switch"
          aria-checked={remindersEnabled}
          onClick={(event) => {
            event.stopPropagation();
            setValue("remindersEnabled", !remindersEnabled);
          }}
          className={cn(
            "relative h-7 w-12 shrink-0 rounded-full transition-colors",
            remindersEnabled ? "bg-primary" : "bg-foreground/15",
          )}
        >
          <span
            className={cn(
              "absolute top-0.5 size-6 rounded-full bg-white shadow-sm transition-transform",
              remindersEnabled ? "left-5" : "left-0.5",
            )}
          />
        </button>
      }
    >
      {remindersEnabled ? (
        <div className="flex flex-col gap-3">
          {fields.map((field, index) => (
            <ReminderRow
              key={field.id}
              reminder={field}
              onLabelChange={(label) => update(index, { ...field, label })}
              onToggleEnabled={(enabled) =>
                update(index, { ...field, enabled })
              }
              onRemove={() => remove(index)}
            />
          ))}

          <PlannerDashedAddButton
            label={PLAN_MEAL_COPY.reminders.add}
            onClick={addReminder}
            disabled={fields.length >= MAX_REMINDERS}
          />

          {fields.length >= MAX_REMINDERS ? (
            <p className="text-xs text-foreground/45">
              {PLAN_MEAL_COPY.reminders.maxReached}
            </p>
          ) : null}
        </div>
      ) : (
        <p className="text-sm text-foreground/50">
          Los recordatorios están desactivados para este plan.
        </p>
      )}
    </CollapsiblePlannerCard>
  );
}
