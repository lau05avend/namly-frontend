import { REGISTER_MEAL_COPY } from "@/features/meal-register/constants/register-meal-copy";
import type { PlanLinkStatus } from "@/features/meal-register/schemas/register-meal.schema";
import type { ScheduledMealSuggestion } from "@/features/meal-register/types/register-meal.types";
import { formatPlannedTimeLabel } from "@/features/history/utils/history-meal-log-plan.utils";

const summaryCopy = REGISTER_MEAL_COPY.context.collapsedSummary;

type BuildMealContextCollapsedSummaryParams = {
  planStatus: PlanLinkStatus;
  planSuggestion?: ScheduledMealSuggestion | null;
  mealTypeName: string | null;
  recipeTitles: string[];
};

export type MealContextCollapsedSummaryLayout = "linked" | "default";

export type MealContextCollapsedSummary = {
  hasContent: boolean;
  layout: MealContextCollapsedSummaryLayout;
  linkedPlanTime: string | null;
  mealLine: string | null;
  gapsLine: string | null;
};

function isPlanLinked(
  planStatus: PlanLinkStatus,
  planSuggestion?: ScheduledMealSuggestion | null,
): planSuggestion is ScheduledMealSuggestion {
  return planStatus === "linked" && planSuggestion != null;
}

function isPlanSuggested(
  planStatus: PlanLinkStatus,
  planSuggestion?: ScheduledMealSuggestion | null,
): planSuggestion is ScheduledMealSuggestion {
  return planStatus === "suggested" && planSuggestion != null;
}

function buildPlanSegment(
  planStatus: PlanLinkStatus,
  planSuggestion?: ScheduledMealSuggestion | null,
): string | null {
  if (
    (planStatus === "linked" || planStatus === "suggested") &&
    planSuggestion != null
  ) {
    const time = formatPlannedTimeLabel(planSuggestion.plannedTime);
    const label =
      planStatus === "linked"
        ? REGISTER_MEAL_COPY.plan.linkedLabel
        : REGISTER_MEAL_COPY.plan.suggestedLabel;

    return `${label} · ${time}`;
  }

  return null;
}

function resolveExpressNote(
  planSuggestion?: ScheduledMealSuggestion | null,
): string | null {
  if (!planSuggestion?.isExpress) {
    return null;
  }

  const note = planSuggestion.expressNote?.trim();
  return note || REGISTER_MEAL_COPY.plan.expressDetail;
}

function buildMealLine(
  mealTypeName: string | null,
  recipeTitles: string[],
  planSuggestion?: ScheduledMealSuggestion | null,
): string | null {
  const expressNote = resolveExpressNote(planSuggestion);
  const recipeCount = recipeTitles
    .map((title) => title.trim())
    .filter(Boolean).length;

  if (mealTypeName && expressNote) {
    if (recipeCount > 0) {
      return `${mealTypeName} · ${expressNote} · ${summaryCopy.recipesSelected(recipeCount)}`;
    }
    return `${mealTypeName} · ${expressNote}`;
  }

  if (mealTypeName && recipeCount > 0) {
    return `${mealTypeName} · ${summaryCopy.recipesSelected(recipeCount)}`;
  }

  if (mealTypeName) {
    return mealTypeName;
  }

  if (expressNote) {
    return expressNote;
  }

  if (recipeCount > 0) {
    return summaryCopy.recipesSelected(recipeCount);
  }

  return null;
}

function buildSuggestedPrimaryLine(
  planSuggestion: ScheduledMealSuggestion,
  mealTypeName: string | null,
  recipeTitles: string[],
): string {
  const parts = [
    buildPlanSegment("suggested", planSuggestion),
    buildMealLine(mealTypeName, recipeTitles, planSuggestion),
  ].filter((part): part is string => part != null);

  return parts.join(" · ");
}

function buildMealGapsLine(
  mealTypeName: string | null,
  recipeTitles: string[],
): string | null {
  const parts: string[] = [];
  const hasRecipes = recipeTitles.some((title) => title.trim().length > 0);

  if (!mealTypeName) {
    parts.push(summaryCopy.noMealType);
  }

  if (!hasRecipes) {
    parts.push(summaryCopy.noRecipes);
  }

  return parts.length > 0 ? parts.join(" · ") : null;
}

function buildDefaultGapsLine({
  planStatus,
  planSuggestion,
  mealTypeName,
  recipeTitles,
}: BuildMealContextCollapsedSummaryParams): string {
  const parts: string[] = [
    buildPlanSegment(planStatus, planSuggestion) ?? summaryCopy.noPlan,
  ];

  const hasRecipes = recipeTitles.some((title) => title.trim().length > 0);

  if (!mealTypeName) {
    parts.push(summaryCopy.noMealType);
  }

  if (!hasRecipes) {
    parts.push(summaryCopy.noRecipes);
  }

  return parts.join(" · ");
}

export function buildMealContextCollapsedSummary({
  planStatus,
  planSuggestion,
  mealTypeName,
  recipeTitles,
}: BuildMealContextCollapsedSummaryParams): MealContextCollapsedSummary {
  const linked = isPlanLinked(planStatus, planSuggestion);
  const suggested = isPlanSuggested(planStatus, planSuggestion);
  const hasPlanPreview =
    (planStatus === "linked" || planStatus === "suggested") &&
    planSuggestion != null;
  const hasRecipes = recipeTitles.some((title) => title.trim().length > 0);
  const hasUserContextData =
    hasPlanPreview || mealTypeName != null || hasRecipes;

  if (!hasUserContextData) {
    return {
      hasContent: false,
      layout: "default",
      linkedPlanTime: null,
      mealLine: null,
      gapsLine: null,
    };
  }

  if (linked) {
    return {
      hasContent: true,
      layout: "linked",
      linkedPlanTime: formatPlannedTimeLabel(planSuggestion.plannedTime),
      mealLine: buildMealLine(mealTypeName, recipeTitles, planSuggestion),
      gapsLine: buildMealGapsLine(mealTypeName, recipeTitles),
    };
  }

  if (suggested) {
    return {
      hasContent: true,
      layout: "default",
      linkedPlanTime: null,
      mealLine: buildSuggestedPrimaryLine(
        planSuggestion,
        mealTypeName,
        recipeTitles,
      ),
      gapsLine: buildMealGapsLine(mealTypeName, recipeTitles),
    };
  }

  return {
    hasContent: true,
    layout: "default",
    linkedPlanTime: null,
    mealLine: buildMealLine(mealTypeName, recipeTitles, planSuggestion),
    gapsLine: buildDefaultGapsLine({
      planStatus,
      planSuggestion,
      mealTypeName,
      recipeTitles,
    }),
  };
}
