import { HistoryDayRedirect } from "@/features/history/components/history-day-redirect";
import { parseDateKey } from "@/features/calendar/utils/date";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Día",
  description: "Revisa tus comidas registradas en este día.",
};

type HistoryDayPageProps = {
  params: Promise<{
    date: string;
  }>;
};

export default async function HistoryDayPage({ params }: HistoryDayPageProps) {
  const { date } = await params;

  if (!parseDateKey(date)) {
    redirect("/history");
  }

  return <HistoryDayRedirect dateKey={date} />;
}
