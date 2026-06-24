import type {
  NextMealDetail,
  RegisteredTodaySummary,
  UpcomingMealItem,
} from "@/features/home/types/home.types";
import { mapRegisteredTodaySubtitle } from "@/features/home/mappers/home.mapper";
import type {
  PlannerEntry,
  PlannerRegisteredSummary,
} from "@/features/planner/types/planner.types";

export function mapNextMealToPlannerEntry(meal: NextMealDetail): PlannerEntry {
  const kind = meal.kind ?? "meal";
  const items = [...meal.items];

  if (meal.moreCount && meal.moreCount > 0) {
    for (let index = 0; index < meal.moreCount; index += 1) {
      items.push({
        id: `more-${index}`,
        label: `Receta ${items.length + 1}`,
      });
    }
  }

  return {
    id: meal.id,
    kind,
    slot: meal.slot,
    slotLabel: meal.slotLabel.toUpperCase(),
    timeLabel: meal.timeLabel,
    title: meal.title,
    countdownLabel: meal.countdownLabel || undefined,
    items: kind === "note" ? undefined : items,
    status: "next",
    variant: kind === "note" ? "featured" : "featured",
  };
}

export function mapUpcomingMealToPlannerEntry(
  meal: UpcomingMealItem,
): PlannerEntry {
  const kind = meal.kind ?? "meal";

  return {
    id: meal.id,
    kind,
    slot: meal.slot,
    slotLabel: meal.slotLabel.toUpperCase(),
    timeLabel: meal.timeLabel,
    title: meal.title,
    items: kind === "note" ? undefined : meal.items,
    status: "upcoming",
    variant: kind === "note" ? "note" : "default",
  };
}

export function mapRegisteredTodayToPlannerSummary(
  summary: RegisteredTodaySummary,
): PlannerRegisteredSummary {
  return {
    count: summary.count,
    subtitle: mapRegisteredTodaySubtitle(summary.count),
    meals:
      summary.meals?.map((meal) => ({
        ...meal,
        isExpress: false,
      })) ?? [],
  };
}
