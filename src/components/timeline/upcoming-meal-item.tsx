import { PlannedEntryCard } from "@/components/meal/planned-entry-card";
import { mapUpcomingMealToPlannerEntry } from "@/features/home/mappers/home-planner-entry.mapper";
import type { UpcomingMealItem } from "@/features/home/types/home.types";

type UpcomingMealRowProps = {
  meal: UpcomingMealItem;
  onSelect?: () => void;
};

export function UpcomingMealRow({ meal, onSelect }: UpcomingMealRowProps) {
  return (
    <PlannedEntryCard
      entry={mapUpcomingMealToPlannerEntry(meal)}
      onSelect={onSelect}
    />
  );
}
