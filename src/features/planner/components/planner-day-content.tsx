import { PlannedEntryCard } from "@/components/meal/planned-entry-card";
import { SectionHeader } from "@/components/ui/section-header";
import { PlannerSummaryCard } from "@/features/planner/components/planner-summary-card";
import type { PlannerDayPlan } from "@/features/planner/types/planner.types";

type PlannerDayContentProps = {
  dayPlan?: PlannerDayPlan;
};

export function PlannerDayContent({ dayPlan }: PlannerDayContentProps) {
  if (!dayPlan) return null;

  return (
    <div className="flex flex-col gap-7 pb-4">
      {dayPlan.registeredSummary ? (
        <PlannerSummaryCard summary={dayPlan.registeredSummary} />
      ) : null}

      {dayPlan.sections.map((section) => (
        <section key={section.id} className="flex flex-col gap-4">
          <SectionHeader title={section.title} />
          {section.entries.length > 0 ? (
            <ul className="flex flex-col gap-5">
              {section.entries.map((entry) => (
                <li key={entry.id}>
                  <PlannedEntryCard entry={entry} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-foreground/50">
              Nada planificado aún — añade algo cuando quieras.
            </p>
          )}
        </section>
      ))}
    </div>
  );
}
