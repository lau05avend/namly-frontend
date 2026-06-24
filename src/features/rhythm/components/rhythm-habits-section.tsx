import { ModuleEmptyState } from "@/components/ui/module-empty-state";
import { SectionHeader } from "@/components/ui/section-header";
import { RhythmInsightItem } from "@/features/rhythm/components/rhythm-insight-item";
import { RhythmTimeSlotDistributionView } from "@/features/rhythm/components/rhythm-time-slot-distribution";
import { RHYTHM_COPY } from "@/features/rhythm/constants/rhythm-copy";
import { RHYTHM_SURFACES } from "@/features/rhythm/constants/rhythm-surfaces";
import type { RhythmHabits } from "@/features/rhythm/types/rhythm.types";
import { cn } from "@/lib/utils";

type RhythmHabitsSectionProps = {
  habits: RhythmHabits;
};

export function RhythmHabitsSection({ habits }: RhythmHabitsSectionProps) {
  const hasInsights = habits.insights.length > 0;
  const hasTimeSlots =
    habits.timeSlotDistribution && habits.timeSlotDistribution.length > 0;

  if (!habits.hasEnoughData) {
    return (
      <section className={cn("flex flex-col gap-4", RHYTHM_SURFACES.sectionCard)}>
        <SectionHeader
          title={RHYTHM_COPY.sections.habits}
          className="text-primary/60"
        />
        <ModuleEmptyState
          module="home"
          variant="inline"
          title={RHYTHM_COPY.habits.emptyTitle}
          description={RHYTHM_COPY.habits.emptyDescription}
          className="py-1"
        />
      </section>
    );
  }

  return (
    <section className={cn("flex flex-col gap-4", RHYTHM_SURFACES.sectionCard)}>
      <SectionHeader
        title={RHYTHM_COPY.sections.habits}
        className="text-primary/60"
      />

      {hasInsights ? (
        <div className="flex flex-col">
          {habits.insights.map((insight) => (
            <RhythmInsightItem
              key={insight.id}
              icon={insight.icon}
              tone={insight.tone}
              message={insight.message}
            />
          ))}
        </div>
      ) : (
        <ModuleEmptyState
          module="home"
          variant="inline"
          title={RHYTHM_COPY.habits.emptyTitle}
          description={RHYTHM_COPY.habits.emptyDescription}
          className="py-1"
        />
      )}

      {hasTimeSlots ? (
        <RhythmTimeSlotDistributionView
          distribution={habits.timeSlotDistribution!}
        />
      ) : null}
    </section>
  );
}
