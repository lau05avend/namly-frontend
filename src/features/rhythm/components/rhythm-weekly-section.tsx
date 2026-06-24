import { SectionHeader } from "@/components/ui/section-header";
import { RhythmMetricCard } from "@/features/rhythm/components/rhythm-metric-card";
import { RhythmWeeklyActivityRow } from "@/features/rhythm/components/rhythm-weekly-activity-row";
import { RHYTHM_COPY } from "@/features/rhythm/constants/rhythm-copy";
import type { RhythmWeeklySummary } from "@/features/rhythm/types/rhythm.types";

type RhythmWeeklySectionProps = {
  summary: RhythmWeeklySummary;
};

export function RhythmWeeklySection({ summary }: RhythmWeeklySectionProps) {
  return (
    <section className="flex flex-col gap-7">
      <SectionHeader title={RHYTHM_COPY.sections.thisWeek} />

      <div className="flex flex-col gap-7">
        <p className="max-w-[20rem] text-xl font-semibold leading-snug text-foreground">
          {summary.consistencyMessage}
        </p>

        <div className="flex flex-col gap-3.5">
          <RhythmWeeklyActivityRow days={summary.activityDays} />
          <p className="text-sm text-foreground/55">{summary.activeDaysLabel}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <RhythmMetricCard
          value={RHYTHM_COPY.weekly.weekComparisonValue(summary.weekComparison)}
          label={summary.weekComparisonLabel}
        />
        <RhythmMetricCard
          value={RHYTHM_COPY.weekly.averageCompletionValue(
            summary.averageCompletion,
          )}
          label={summary.averageCompletionLabel}
        />
      </div>
    </section>
  );
}
