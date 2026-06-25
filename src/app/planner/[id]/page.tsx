import { PlannerEntryDetailScreen } from "@/features/planner/components/planner-entry-detail/planner-entry-detail-screen";
import { parseDateKey } from "@/features/calendar/utils/date";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Planeación",
  description: "Detalle de una comida planificada.",
};

type PlannerEntryDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    date?: string;
  }>;
};

export default async function PlannerEntryDetailPage({
  params,
  searchParams,
}: PlannerEntryDetailPageProps) {
  const { id } = await params;
  const { date } = await searchParams;

  if (!id.trim()) {
    redirect("/planner");
  }

  if (!date || !parseDateKey(date)) {
    redirect("/planner");
  }

  return <PlannerEntryDetailScreen scheduledMealId={id} dateKey={date} />;
}
