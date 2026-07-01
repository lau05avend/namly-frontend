"use client";

import { useMemo, useState } from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { PlannerDashedAddButton } from "@/components/planner/planner-dashed-add-button";
import { PlannerSection } from "@/components/planner/planner-section";
import { AddReminderSheet } from "@/features/planner/components/plan-meal/add-reminder-sheet";
import { PlanReminderRow } from "@/features/planner/components/plan-meal/plan-reminder-row";
import { PlanRemindersInfoHint } from "@/features/planner/components/plan-meal/plan-reminders-info-hint";
import { MAX_PLAN_REMINDERS } from "@/features/planner/constants/plan-reminder-presets";
import { PLAN_MEAL_COPY } from "@/features/planner/constants/plan-meal-copy";
import type { PlanMealFormValues } from "@/features/planner/schemas/plan-meal.schema";
import { createPlanItemId } from "@/features/planner/utils/plan-meal-id";
import { sortRemindersByOffsetDesc } from "@/features/planner/utils/plan-reminder-sort.utils";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

type PlanRemindersSwitchProps = {
  checked: boolean;
  onToggle: () => void;
};

function PlanRemindersSwitch({ checked, onToggle }: PlanRemindersSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={PLAN_MEAL_COPY.reminders.enable}
      onClick={onToggle}
      className={cn(
        "relative h-6 w-10 shrink-0 rounded-full transition-colors",
        checked ? "bg-primary" : "bg-foreground/12",
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 size-5 rounded-full bg-white shadow-sm transition-transform",
          checked ? "left-4.5" : "left-0.5",
        )}
      />
    </button>
  );
}

type PlanRemindersAddLinkProps = {
  label: string;
  onClick: () => void;
};

function PlanRemindersAddLink({ label, onClick }: PlanRemindersAddLinkProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex w-fit shrink-0 cursor-pointer items-center gap-1 text-[13px] font-medium text-primary/60 transition-colors hover:text-primary"
    >
      <Plus className="size-3.5" strokeWidth={2.25} aria-hidden />
      {label}
    </button>
  );
}

export function PlanMealRemindersSection() {
  const { control, setValue } = useFormContext<PlanMealFormValues>();
  const remindersEnabled = useWatch({ control, name: "remindersEnabled" });
  const reminders = useWatch({ control, name: "reminders" });
  const [sheetOpen, setSheetOpen] = useState(false);

  const { fields, remove } = useFieldArray({
    control,
    name: "reminders",
  });

  const sortedFields = useMemo(
    () =>
      [...fields].sort((a, b) => b.offsetMinutes - a.offsetMinutes),
    [fields],
  );

  const selectedOffsets = useMemo(
    () => (reminders ?? []).map((reminder) => reminder.offsetMinutes),
    [reminders],
  );

  const addButtonLabel =
    fields.length === 0
      ? PLAN_MEAL_COPY.reminders.add
      : PLAN_MEAL_COPY.reminders.addAnother;

  const handleToggleEnabled = () => {
    if (remindersEnabled) {
      setValue("remindersEnabled", false, { shouldDirty: true });
      setValue("reminders", [], { shouldDirty: true });
      setSheetOpen(false);
      return;
    }

    setValue("remindersEnabled", true, { shouldDirty: true });
  };

  const handleAddReminder = (offsetMinutes: number) => {
    if (fields.length >= MAX_PLAN_REMINDERS) {
      return;
    }

    const nextReminders = sortRemindersByOffsetDesc([
      ...(reminders ?? []),
      {
        id: createPlanItemId(),
        offsetMinutes,
      },
    ]);

    setValue("reminders", nextReminders, { shouldDirty: true });
  };

  const handleRemoveReminder = (id: string) => {
    const index = fields.findIndex((field) => field.id === id);

    if (index === -1) {
      return;
    }

    remove(index);
  };

  return (
    <>
      <PlannerSection
        label={PLAN_MEAL_COPY.sections.reminders}
        headerAccessory={<PlanRemindersInfoHint />}
        headerTrailing={
          <PlanRemindersSwitch
            checked={remindersEnabled}
            onToggle={handleToggleEnabled}
          />
        }
        className="pt-2"
      >
        {remindersEnabled ? (
          <div className="flex flex-col gap-3 rounded-2xl border border-foreground/5 bg-mint/10 p-3">
            {sortedFields.length > 0 ? (
              <div className="flex flex-col gap-3">
                {sortedFields.map((field) => (
                  <PlanReminderRow
                    key={field.id}
                    offsetMinutes={field.offsetMinutes}
                    onRemove={() => handleRemoveReminder(field.id)}
                  />
                ))}
              </div>
            ) : null}

            {fields.length < MAX_PLAN_REMINDERS ? (
              fields.length === 0 ? (
                <PlannerDashedAddButton
                  label={addButtonLabel}
                  onClick={() => setSheetOpen(true)}
                />
              ) : (
                <PlanRemindersAddLink
                  label={addButtonLabel}
                  onClick={() => setSheetOpen(true)}
                />
              )
            ) : null}
          </div>
        ) : null}
      </PlannerSection>

      <AddReminderSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        selectedOffsets={selectedOffsets}
        onSelect={handleAddReminder}
      />
    </>
  );
}
