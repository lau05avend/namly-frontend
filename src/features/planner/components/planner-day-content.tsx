"use client";

import { useRouter } from "next/navigation";
import { PlannedEntryCard } from "@/components/meal/planned-entry-card";
import { CompletedMealItem } from "@/components/meal/completed-meal-item";
import { PLANNER_COPY } from "@/features/planner/constants/planner-copy";
import { PlannerDayEmpty } from "@/features/planner/components/planner-day-empty";
import { PlannerDaySection } from "@/features/planner/components/planner-day-section";
import type { PlannerDayPlan } from "@/features/planner/types/planner.types";
import { resolvePlannerDayPeriod } from "@/features/planner/utils/resolve-planner-day-period";
import { resolveIncompleteSectionDefaultExpanded } from "@/features/planner/utils/resolve-incomplete-section-expanded";
import {
  CheckCircle2,
  CircleDashed,
  Clock,
  ListOrdered,
  Sparkles,
} from "lucide-react";

type PlannerDayContentProps = {
  dayPlan?: PlannerDayPlan;
};

export function PlannerDayContent({ dayPlan }: PlannerDayContentProps) {
  const router = useRouter();

  if (!dayPlan) return null;

  const handleEntryPress = (entryId: string) => {
    const params = new URLSearchParams({ date: dayPlan.date });
    router.push(`/planner/${entryId}?${params.toString()}`);
  };

  const nextSection = dayPlan.sections.find((section) => section.id === "next");
  const upcomingSection = dayPlan.sections.find(
    (section) => section.id === "upcoming",
  );
  const missedSection = dayPlan.sections.find(
    (section) => section.id === "missed",
  );

  const dayPeriod = resolvePlannerDayPeriod(dayPlan.date);

  const incompleteDefaultExpanded = resolveIncompleteSectionDefaultExpanded(
    dayPeriod,
    {
      next: nextSection?.entries.length ?? 0,
      upcoming: upcomingSection?.entries.length ?? 0,
      missed: missedSection?.entries.length ?? 0,
      completed: dayPlan.registeredSummary?.count ?? 0,
    },
  );

  const hasContent =
    nextSection ||
    upcomingSection?.entries.length ||
    missedSection?.entries.length ||
    dayPlan.registeredSummary;

  if (!hasContent) {
    return (
      <PlannerDayEmpty period={dayPeriod} />
    );
  }

  return (
    <div className="flex flex-col gap-6 pb-4">
      {nextSection ? (
        <PlannerDaySection
          title={nextSection.title}
          tone="primary"
          icon={Clock}
          collapsible
          defaultExpanded
        >
          <ul className="flex flex-col gap-3">
            {nextSection.entries.map((entry) => (
              <li key={entry.id}>
                <PlannedEntryCard
                  entry={entry}
                  onSelect={() => handleEntryPress(entry.id)}
                />
              </li>
            ))}
          </ul>
        </PlannerDaySection>
      ) : null}

      {upcomingSection && upcomingSection.entries.length > 0 ? (
        <PlannerDaySection
          title={upcomingSection.title}
          tone="default"
          surface={false}
          icon={ListOrdered}
          collapsible
          defaultExpanded
        >
          <ul className="flex flex-col gap-1.5">
            {upcomingSection.entries.map((entry) => (
              <li key={entry.id}>
                <PlannedEntryCard
                  entry={entry}
                  onSelect={() => handleEntryPress(entry.id)}
                />
              </li>
            ))}
          </ul>
        </PlannerDaySection>
      ) : null}

      {missedSection && missedSection.entries.length > 0 ? (
        <PlannerDaySection
          title={missedSection.title}
          tone="muted"
          surface={false}
          icon={CircleDashed}
          collapsible
          defaultExpanded={incompleteDefaultExpanded}
        >
          <ul className="flex flex-col gap-1.5">
            {missedSection.entries.map((entry) => (
              <li key={entry.id}>
                <PlannedEntryCard
                  entry={entry}
                  onSelect={() => handleEntryPress(entry.id)}
                />
              </li>
            ))}
          </ul>
        </PlannerDaySection>
      ) : null}

      {dayPlan.registeredSummary ? (
        <PlannerDaySection
          title={PLANNER_COPY.sections.completed.title}
          subtitle={dayPlan.registeredSummary.subtitle}
          subtitleInline
          subtitleTrailingIcon={Sparkles}
          tone="muted"
          surface={false}
          icon={CheckCircle2}
          collapsible
          defaultExpanded={false}
        >
          <ul className="flex flex-col pl-5">
            {dayPlan.registeredSummary.meals.map((meal, index) => (
              <li
                key={meal.id}
                className={index > 0 ? "border-t border-foreground/6" : undefined}
              >
                <CompletedMealItem
                  meal={meal}
                  onSelect={() => handleEntryPress(meal.id)}
                />
              </li>
            ))}
          </ul>
        </PlannerDaySection>
      ) : null}
    </div>
  );
}
