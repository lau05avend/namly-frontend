import type {
  NextMealDetail,
  RegisteredTodaySummary,
  UpcomingMealItem,
} from "@/features/home/types/home.types";
import type {
  PlannerEntry,
  PlannerRegisteredSummary,
} from "@/features/planner/types/planner.types";

export function mapNextMealToPlannerEntry(meal: NextMealDetail): PlannerEntry {
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
    kind: "meal",
    slot: meal.slot,
    slotLabel: meal.slotLabel.toUpperCase(),
    timeLabel: meal.timeLabel,
    title: meal.title,
    countdownLabel: meal.countdownLabel,
    items,
    status: "next",
    variant: "featured",
  };
}

export function mapUpcomingMealToPlannerEntry(
  meal: UpcomingMealItem,
): PlannerEntry {
  return {
    id: meal.id,
    kind: "meal",
    slot: meal.slot,
    slotLabel: meal.slotLabel.toUpperCase(),
    timeLabel: meal.timeLabel,
    title: meal.title,
    items: meal.items,
    status: "upcoming",
    variant: "default",
  };
}

export function mapRegisteredTodayToPlannerSummary(
  summary: RegisteredTodaySummary,
): PlannerRegisteredSummary {
  return {
    count: summary.count,
    subtitle: summary.label,
    meals:
      summary.meals?.map((meal) => ({
        ...meal,
        isExpress: false,
      })) ?? [],
  };
}
