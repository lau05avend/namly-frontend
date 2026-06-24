import { ModuleEmptyState } from "@/components/ui/module-empty-state";
import { SectionHeader } from "@/components/ui/section-header";
import { RhythmInsightItem } from "@/features/rhythm/components/rhythm-insight-item";
import { RhythmTimeSlotDistributionView } from "@/features/rhythm/components/rhythm-time-slot-distribution";
import { RHYTHM_COPY } from "@/features/rhythm/constants/rhythm-copy";
import type { RhythmHabits } from "@/features/rhythm/types/rhythm.types";

type RhythmHabitsSectionProps = {
  habits: RhythmHabits;
};

export function RhythmHabitsSection({ habits }: RhythmHabitsSectionProps) {
  return (
    <section className="flex flex-col gap-4">
      <SectionHeader title={RHYTHM_COPY.sections.habits} />

      {!habits.hasEnoughData ? (
        <ModuleEmptyState
          module="home"
          variant="inline"
          title={RHYTHM_COPY.habits.emptyTitle}
          description={RHYTHM_COPY.habits.emptyDescription}
          className="py-4"
        />
      ) : (
        <>
          <div className="flex flex-col">
            {habits.insights.map((insight) => (
              <RhythmInsightItem
                key={insight.id}
                icon={insight.icon}
                message={insight.message}
              />
            ))}
          </div>

          {habits.timeSlotDistribution &&
          habits.timeSlotDistribution.length > 0 ? (
            <RhythmTimeSlotDistributionView
              distribution={habits.timeSlotDistribution}
            />
          ) : null}
        </>
      )}
    </section>
  );
}
