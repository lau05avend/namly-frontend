import { PlannerScreen } from "@/features/planner/components/planner-screen";

export const metadata = {
  title: "Planificador",
  description: "Organiza tus comidas con calma y continuidad.",
};

type PlannerPageProps = {
  searchParams: Promise<{
    date?: string;
  }>;
};

export default async function PlannerPage({ searchParams }: PlannerPageProps) {
  const params = await searchParams;

  return <PlannerScreen initialDate={params.date} />;
}
