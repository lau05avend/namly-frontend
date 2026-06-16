import { PlannedEntryCard } from "@/components/meal/planned-entry-card";
import { PLANNER_COPY } from "@/features/planner/constants/planner-copy";
import { PlannerDayEmpty } from "@/features/planner/components/planner-day-empty";
import { PlannerDaySection } from "@/features/planner/components/planner-day-section";
import type {
  PlannerDayPlan,
  PlannerRegisteredMeal,
} from "@/features/planner/types/planner.types";
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

function CompletedMealItem({ meal }: { meal: PlannerRegisteredMeal }) {
  return (
    <div className="flex items-start gap-3 py-2.5">
      <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary">
        <CheckCircle2 className="size-3" strokeWidth={2.5} aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <p className="text-sm font-medium text-foreground/70">{meal.mealTypeName}</p>
          <p className="text-xs text-foreground/40">{meal.timeLabel}</p>
        </div>
        {meal.detail ? (
          <p className="mt-0.5 text-xs leading-relaxed text-foreground/50">
            {meal.detail}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export function PlannerDayContent({ dayPlan }: PlannerDayContentProps) {
  if (!dayPlan) return null;

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
                <PlannedEntryCard entry={entry} />
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
                <PlannedEntryCard entry={entry} />
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
                <PlannedEntryCard entry={entry} />
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
                <CompletedMealItem meal={meal} />
              </li>
            ))}
          </ul>
        </PlannerDaySection>
      ) : null}
    </div>
  );
}
