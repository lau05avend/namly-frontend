import { PlannerSummaryCard } from "@/features/planner/components/planner-summary-card";
import { mapRegisteredTodayToPlannerSummary } from "@/features/home/mappers/home-planner-entry.mapper";
import type { RegisteredTodaySummary } from "@/features/home/types/home.types";

type RegisteredSummaryCardProps = {
  summary: RegisteredTodaySummary;
};

export function RegisteredSummaryCard({ summary }: RegisteredSummaryCardProps) {
  return (
    <PlannerSummaryCard summary={mapRegisteredTodayToPlannerSummary(summary)} />
  );
}
