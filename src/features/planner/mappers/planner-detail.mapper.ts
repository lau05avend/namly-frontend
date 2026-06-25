import { format } from "date-fns";
import { es } from "date-fns/locale";
import { parseDateKey } from "@/features/calendar/utils/date";
import { PLANNER_COPY } from "@/features/planner/constants/planner-copy";
import { formatPlannedTimeLabel } from "@/features/planner/mappers/planner.mapper";
import type {
  ScheduledMealCompletionMealLogApiDto,
  ScheduledMealDetailApiDto,
} from "@/features/planner/types/planner-api.types";
import type {
  PlannerCompletionMealLog,
  PlannerScheduledMealDetail,
} from "@/features/planner/types/planner-detail.types";

function capitalizeFirst(value: string): string {
  if (!value) {
    return value;
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}

function formatPlannerDateLabel(dateKey: string): string {
  const date = parseDateKey(dateKey);

  if (!date) {
    return dateKey;
  }

  const isCurrentYear = date.getFullYear() === new Date().getFullYear();
  const pattern = isCurrentYear
    ? "EEEE, d 'de' MMMM"
    : "EEEE, d 'de' MMMM 'de' yyyy";

  return capitalizeFirst(format(date, pattern, { locale: es }));
}

function resolveStatusLabel(status: ScheduledMealDetailApiDto["status"]): string {
  return PLANNER_COPY.detail.status[status];
}

function formatLoggedAtTime(loggedAt: string): string {
  return format(new Date(loggedAt), "h:mm a", { locale: es });
}

function mapCompletionMealLog(
  log: ScheduledMealCompletionMealLogApiDto,
): PlannerCompletionMealLog {
  return {
    id: log.id,
    mediaUrl: log.mediaUrl,
    loggedAt: log.loggedAt,
    loggedAtTime: formatLoggedAtTime(log.loggedAt),
    dateKey: log.loggedAt.slice(0, 10),
    content: log.content,
    tags: log.tags,
  };
}

function resolveHeadline(meal: ScheduledMealDetailApiDto): string {
  if (meal.isExpress) {
    return meal.expressNote?.trim() || meal.mealType.name;
  }

  const recipes = meal.recipes ?? [];

  if (recipes.length === 1) {
    return recipes[0].title;
  }

  if (recipes.length > 1) {
    return `${recipes.length} recetas`;
  }

  return meal.mealType.name;
}

export function mapScheduledMealDetail(
  meal: ScheduledMealDetailApiDto,
): PlannerScheduledMealDetail {
  const recipes = meal.recipes ?? [];

  return {
    id: meal.id,
    mealTypeId: meal.mealTypeId,
    entryDate: meal.entryDate,
    plannedTime: meal.plannedTime,
    timeLabel: formatPlannedTimeLabel(meal.plannedTime),
    dateLabel: formatPlannerDateLabel(meal.entryDate),
    mealTypeName: meal.mealType.name,
    status: meal.status,
    statusLabel: resolveStatusLabel(meal.status),
    isExpress: meal.isExpress,
    expressNote: meal.expressNote,
    recipes: recipes.map((recipe) => ({
      id: recipe.id,
      recipeId: recipe.recipeId,
      title: recipe.title,
      coverUrl: recipe.coverUrl,
    })),
    headline: resolveHeadline(meal),
    completionMealLog: meal.completionMealLog
      ? mapCompletionMealLog(meal.completionMealLog)
      : null,
  };
}
