import { HomeUpcomingMealRow } from "@/features/home/components/home-upcoming-meal-row";
import type { UpcomingMealItem } from "@/features/home/types/home.types";

type UpcomingMealRowProps = {
  meal: UpcomingMealItem;
  onSelect?: () => void;
};

export function UpcomingMealRow({ meal, onSelect }: UpcomingMealRowProps) {
  return <HomeUpcomingMealRow meal={meal} onPress={onSelect} />;
}
