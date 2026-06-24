import { cn } from "@/lib/utils";

type RhythmMetricCardProps = {
  value: string;
  label: string;
  className?: string;
};

export function RhythmMetricCard({
  value,
  label,
  className,
}: RhythmMetricCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl bg-foreground/[0.03] px-3.5 py-3.5",
        className,
      )}
    >
      <p className="text-base font-semibold leading-none text-foreground">
        {value}
      </p>
      <p className="mt-2 text-xs leading-relaxed text-foreground/50">
        {label}
      </p>
    </div>
  );
}
