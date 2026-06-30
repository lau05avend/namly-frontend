import { Suspense } from "react";
import { PlannerEntryDetailScreen } from "@/features/planner/components/planner-entry-detail/planner-entry-detail-screen";
import { PlannerLoading } from "@/features/planner/components/planner-loading";
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
    returnTo?: string;
  }>;
};

export default async function PlannerEntryDetailPage({
  params,
  searchParams,
}: PlannerEntryDetailPageProps) {
  const { id } = await params;
  const { date, returnTo } = await searchParams;

  if (!id.trim()) {
    redirect("/planner");
  }

  if (!date || !parseDateKey(date)) {
    redirect("/planner");
  }

  return (
    <Suspense
      fallback={
        <div className="mx-auto min-h-dvh w-full max-w-lg px-4 py-10">
          <PlannerLoading variant="compact" />
        </div>
      }
    >
      <PlannerEntryDetailScreen
        scheduledMealId={id}
        dateKey={date}
        returnTo={returnTo}
      />
    </Suspense>
  );
}
