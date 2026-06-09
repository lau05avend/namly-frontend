import { SurfaceCard } from "@/components/ui/surface-card";
import type { RegisteredTodaySummary } from "@/features/home/types/home.types";
import { cn } from "@/lib/utils";
import { Check, ChevronRight } from "lucide-react";

type RegisteredSummaryCardProps = {
  summary: RegisteredTodaySummary;
  onSelect?: () => void;
};

export function RegisteredSummaryCard({
  summary,
  onSelect,
}: RegisteredSummaryCardProps) {
  return (
    <SurfaceCard
      className={cn(
        "flex flex-row items-center gap-3 p-4",
        onSelect && "cursor-pointer active:scale-[0.99]",
      )}
      role={onSelect ? "button" : undefined}
      tabIndex={onSelect ? 0 : undefined}
      onClick={onSelect}
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-white">
        <Check className="size-4" strokeWidth={3} aria-hidden="true" />
      </span>
      <p className="flex-1 font-medium text-foreground">{summary.label}</p>
      <ChevronRight
        className="size-4 shrink-0 text-foreground/30"
        aria-hidden
      />
    </SurfaceCard>
  );
}
