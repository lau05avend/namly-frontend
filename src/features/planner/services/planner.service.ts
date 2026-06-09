import { simulateLatency } from "@/lib/api/simulate-latency";
import {
  getMockPlannerDay,
  getMockPlannerMonthActivity,
} from "@/features/planner/services/mock-planner-data";
import type {
  PlannerDayPlan,
  PlannerMonthActivity,
} from "@/features/planner/types/planner.types";

export async function fetchPlannerDay(
  dateKey: string,
): Promise<PlannerDayPlan> {
  await simulateLatency();

  // TODO: Replace mocked response with real API integration
  // Example:
  // return apiClient.get<PlannerDayPlan>(`/planner/days/${dateKey}`);

  return getMockPlannerDay(dateKey);
}

export async function fetchPlannerMonthActivity(
  month: Date,
): Promise<PlannerMonthActivity> {
  await simulateLatency(250);

  // TODO: Replace mocked response with real API integration
  // Example:
  // return apiClient.get<PlannerMonthActivity>("/planner/month", {
  //   params: { month: format(month, "yyyy-MM") },
  // });

  return getMockPlannerMonthActivity(month);
}
