import { PlanMealScreen } from "@/features/planner/components/plan-meal/plan-meal-screen";

export const metadata = {
  title: "Planear comida",
  description: "Planifica una comida con calma y flexibilidad.",
};

type PlanMealPageProps = {
  searchParams: Promise<{
    date?: string;
    slot?: string;
    edit?: string;
  }>;
};

export default async function PlanMealPage({
  searchParams,
}: PlanMealPageProps) {
  const params = await searchParams;

  return (
    <PlanMealScreen
      initialDate={params.date}
      initialSlot={params.slot}
      editId={params.edit}
    />
  );
}
