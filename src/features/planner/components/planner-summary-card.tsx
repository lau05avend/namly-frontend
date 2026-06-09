import { SurfaceCard } from "@/components/ui/surface-card";
import type { PlannerRegisteredSummary } from "@/features/planner/types/planner.types";
import { Check, ChevronDown } from "lucide-react";

type PlannerSummaryCardProps = {
  summary: PlannerRegisteredSummary;
  onToggle?: () => void;
};

export function PlannerSummaryCard({
  summary,
  onToggle,
}: PlannerSummaryCardProps) {
  return (
    <SurfaceCard
      className="flex flex-row items-center gap-3 border-mint/80 bg-mint/30 p-4"
      role={onToggle ? "button" : undefined}
      tabIndex={onToggle ? 0 : undefined}
      onClick={onToggle}
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-white">
        <Check className="size-4" strokeWidth={3} aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-foreground">{summary.label}</p>
        <p className="text-sm text-foreground/55">{summary.hint}</p>
      </div>
      <ChevronDown className="size-4 shrink-0 text-foreground/35" aria-hidden />
    </SurfaceCard>
  );
}
