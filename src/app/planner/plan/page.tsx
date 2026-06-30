import { Suspense } from "react";
import { PlanMealScreen } from "@/features/planner/components/plan-meal/plan-meal-screen";
import { PlannerLoading } from "@/features/planner/components/planner-loading";

export const metadata = {
  title: "Planear comida",
  description: "Planifica una comida con calma y flexibilidad.",
};

type PlanMealPageProps = {
  searchParams: Promise<{
    date?: string;
    slot?: string;
    edit?: string;
    returnTo?: string;
  }>;
};

function PlanMealPageFallback() {
  return (
    <div className="mx-auto max-w-lg px-4 pt-safe">
      <PlannerLoading variant="form" />
    </div>
  );
}

export default async function PlanMealPage({
  searchParams,
}: PlanMealPageProps) {
  const params = await searchParams;

  return (
    <Suspense fallback={<PlanMealPageFallback />}>
      <PlanMealScreen
        initialDate={params.date}
        initialSlot={params.slot}
        editId={params.edit}
        returnTo={params.returnTo}
      />
    </Suspense>
  );
}
