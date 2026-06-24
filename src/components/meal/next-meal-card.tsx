import { PlannedEntryCard } from "@/components/meal/planned-entry-card";
import { mapNextMealToPlannerEntry } from "@/features/home/mappers/home-planner-entry.mapper";
import type { NextMealDetail } from "@/features/home/types/home.types";
import { cn } from "@/lib/utils";

type NextMealCardProps = {
  meal: NextMealDetail;
  sectionLabel?: string;
  className?: string;
};

export function NextMealCard({ meal, className }: NextMealCardProps) {
  return (
    <div className={cn(className)}>
      <PlannedEntryCard entry={mapNextMealToPlannerEntry(meal)} />
    </div>
  );
}
