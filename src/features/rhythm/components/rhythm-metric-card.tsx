import { RhythmSparkline } from "@/features/rhythm/components/rhythm-sparkline";
import { RHYTHM_SURFACES } from "@/features/rhythm/constants/rhythm-surfaces";
import { cn } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";

type RhythmMetricCardVariant = "comparison" | "average";

type RhythmMetricCardProps = {
  value: string;
  label: string;
  variant: RhythmMetricCardVariant;
  trend?: number;
  className?: string;
};

export function RhythmMetricCard({
  value,
  label,
  variant,
  trend,
  className,
}: RhythmMetricCardProps) {
  const isComparison = variant === "comparison";
  const trendDirection =
    trend === undefined ? null : trend > 0 ? "up" : trend < 0 ? "down" : null;

  return (
    <div
      className={cn(
        "relative flex min-h-[5.5rem] flex-col justify-between overflow-hidden px-3.5 py-3.5",
        isComparison
          ? RHYTHM_SURFACES.metricComparison
          : RHYTHM_SURFACES.metricAverage,
        className,
      )}
    >
      <RhythmSparkline
        className={cn(
          "absolute right-2 bottom-2",
          isComparison ? "text-primary/35" : "text-cta/40",
        )}
      />

      <div className="relative z-10 flex items-center gap-1">
        {isComparison && trendDirection ? (
          trendDirection === "up" ? (
            <TrendingUp
              className="size-3.5 shrink-0 text-primary/70"
              strokeWidth={2.5}
              aria-hidden
            />
          ) : (
            <TrendingDown
              className="size-3.5 shrink-0 text-primary/70"
              strokeWidth={2.5}
              aria-hidden
            />
          )
        ) : null}
        <p className="text-base font-semibold leading-none text-foreground">
          {value}
        </p>
      </div>

      <p className="relative z-10 max-w-[8.5rem] text-xs leading-relaxed text-foreground/50">
        {label}
      </p>
    </div>
  );
}
