"use client";

import { RhythmHabitsSection } from "@/features/rhythm/components/rhythm-habits-section";
import { RhythmLifetimeSection } from "@/features/rhythm/components/rhythm-lifetime-section";
import { RhythmLoading } from "@/features/rhythm/components/rhythm-loading";
import { RhythmWeeklySection } from "@/features/rhythm/components/rhythm-weekly-section";
import { RHYTHM_COPY } from "@/features/rhythm/constants/rhythm-copy";
import { useRhythmAnalytics } from "@/features/rhythm/queries/use-rhythm-analytics";

export function RhythmView() {
  const { data, isPending, isError, refetch } = useRhythmAnalytics();

  if (isPending) {
    return <RhythmLoading />;
  }

  if (isError && !data) {
    return (
      <div className="flex flex-col items-center gap-3 py-10 text-center">
        <p className="text-sm text-foreground/60">{RHYTHM_COPY.loadError}</p>
        <button
          type="button"
          onClick={() => void refetch()}
          className="cursor-pointer text-sm font-semibold text-primary underline-offset-2 hover:underline"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const hasContent =
    data.weeklySummary || data.habits || data.lifetime;

  if (!hasContent) {
    return (
      <div className="py-10 text-center">
        <p className="text-sm text-foreground/60">{RHYTHM_COPY.loadError}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 pb-2">
      {data.weeklySummary ? (
        <RhythmWeeklySection summary={data.weeklySummary} />
      ) : null}
      {data.habits ? <RhythmHabitsSection habits={data.habits} /> : null}
      {data.lifetime ? (
        <RhythmLifetimeSection lifetime={data.lifetime} />
      ) : null}
    </div>
  );
}
