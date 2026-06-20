import { HistoryMealLogScreen } from "@/features/history/components/history-meal-log-screen";
import { parseDateKey } from "@/features/calendar/utils/date";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Comida · Namly",
  description: "Revive el recuerdo de una comida registrada.",
};

type HistoryMealLogPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    date?: string;
  }>;
};

export default async function HistoryMealLogPage({
  params,
  searchParams,
}: HistoryMealLogPageProps) {
  const { id } = await params;
  const { date } = await searchParams;

  if (!id.trim()) {
    redirect("/history");
  }

  if (!date || !parseDateKey(date)) {
    redirect("/history");
  }

  return <HistoryMealLogScreen logId={id} dateKey={date} />;
}
