"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { PlannerSection } from "@/components/planner/planner-section";
import { PLANNER_COPY } from "@/features/planner/constants/planner-copy";
import { PLANNER_DETAIL_SECTION_CLASS } from "@/features/planner/constants/planner-detail-surfaces";
import { formatReminderOffsetLabel } from "@/features/planner/utils/plan-reminder-label.utils";
import type { PlannerScheduledMealReminder } from "@/features/planner/types/planner-detail.types";
import {
  buildPlanMealEditPath,
  buildPlannerEntryPath,
} from "@/lib/navigation/meal-routes";
import { cn } from "@/lib/utils";
import { ChevronRight, Clock } from "lucide-react";

type PlannerEntryDetailRemindersProps = {
  reminders: PlannerScheduledMealReminder[];
  scheduledMealId: string;
  dateKey: string;
  returnTo?: string | null;
  className?: string;
};

type PlannerDetailRemindersEditLinkProps = {
  label: string;
  onPress: () => void;
};

function PlannerDetailRemindersEditLink({
  label,
  onPress,
}: PlannerDetailRemindersEditLinkProps) {
  return (
    <button
      type="button"
      onClick={onPress}
      className={cn(
        "inline-flex shrink-0 cursor-pointer items-center gap-0.5 text-xs font-semibold text-primary transition-colors",
        "underline-offset-2 hover:text-primary/85 hover:underline",
      )}
    >
      {label}
      <ChevronRight className="size-4" strokeWidth={2.25} aria-hidden />
    </button>
  );
}

function PlannerEntryDetailReminderRow({
  offsetMinutes,
}: {
  offsetMinutes: number;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <Clock
        className="size-3.5 shrink-0 text-foreground/40"
        strokeWidth={2}
        aria-hidden
      />
      <p className="text-sm font-medium text-foreground/75">
        {formatReminderOffsetLabel(offsetMinutes)}
      </p>
    </div>
  );
}

export function PlannerEntryDetailReminders({
  reminders,
  scheduledMealId,
  dateKey,
  returnTo,
  className,
}: PlannerEntryDetailRemindersProps) {
  const router = useRouter();

  const sortedReminders = useMemo(
    () => [...reminders].sort((a, b) => b.offsetMinutes - a.offsetMinutes),
    [reminders],
  );

  const hasReminders = sortedReminders.length > 0;

  const handleEdit = () => {
    router.push(
      buildPlanMealEditPath(
        scheduledMealId,
        buildPlannerEntryPath(scheduledMealId, dateKey, returnTo),
      ),
    );
  };

  return (
    <PlannerSection
      label={PLANNER_COPY.detail.remindersLabel}
      description={
        hasReminders
          ? PLANNER_COPY.detail.remindersCount(sortedReminders.length)
          : PLANNER_COPY.detail.remindersEmpty
      }
      headerTrailing={
        <PlannerDetailRemindersEditLink
          label={
            hasReminders
              ? PLANNER_COPY.detail.editReminders
              : PLANNER_COPY.detail.configureReminders
          }
          onPress={handleEdit}
        />
      }
      className={cn(PLANNER_DETAIL_SECTION_CLASS, className)}
    >
      {hasReminders ? (
        <div className="flex flex-col gap-3 rounded-2xl border border-foreground/5 bg-mint/10 p-3">
          {sortedReminders.map((reminder) => (
            <PlannerEntryDetailReminderRow
              key={reminder.offsetMinutes}
              offsetMinutes={reminder.offsetMinutes}
            />
          ))}
        </div>
      ) : null}
    </PlannerSection>
  );
}
