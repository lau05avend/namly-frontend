import { SectionHeader } from "@/components/ui/section-header";
import { RhythmMetricCard } from "@/features/rhythm/components/rhythm-metric-card";
import { RhythmWeeklyActivityRow } from "@/features/rhythm/components/rhythm-weekly-activity-row";
import { RHYTHM_COPY } from "@/features/rhythm/constants/rhythm-copy";
import { RHYTHM_SURFACES } from "@/features/rhythm/constants/rhythm-surfaces";
import type { RhythmWeeklySummary } from "@/features/rhythm/types/rhythm.types";
import { cn } from "@/lib/utils";

type RhythmWeeklySectionProps = {
  summary: RhythmWeeklySummary;
};

export function RhythmWeeklySection({ summary }: RhythmWeeklySectionProps) {
  return (
    <section className={cn("flex flex-col gap-5", RHYTHM_SURFACES.sectionCard)}>
      <SectionHeader
        title={RHYTHM_COPY.sections.thisWeek}
        className="text-primary/60"
      />

      <p className="max-w-[20rem] text-lg font-semibold leading-snug text-foreground">
        {summary.consistencyMessage}
      </p>

      <div className="flex flex-col gap-3">
        <RhythmWeeklyActivityRow days={summary.activityDays} />
        <p className="text-sm text-foreground/45">{summary.activeDaysLabel}</p>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <RhythmMetricCard
          variant="comparison"
          trend={summary.weekComparison}
          value={RHYTHM_COPY.weekly.weekComparisonValue(summary.weekComparison)}
          label={summary.weekComparisonLabel}
        />
        <RhythmMetricCard
          variant="average"
          value={RHYTHM_COPY.weekly.averageCompletionValue(
            summary.averageCompletion,
          )}
          label={summary.averageCompletionLabel}
        />
      </div>
    </section>
  );
}
