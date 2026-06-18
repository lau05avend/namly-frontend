import { HistoryScreen } from "@/features/history/components/history-screen";
import type { HistoryViewMode } from "@/features/history/types/history.types";

export const metadata = {
  title: "Mis comidas · Namly",
  description: "Revisa tus comidas registradas con calma y claridad.",
};

type HistoryPageProps = {
  searchParams: Promise<{
    view?: HistoryViewMode;
  }>;
};

function resolveViewMode(view?: string): HistoryViewMode {
  return view === "agenda" ? "agenda" : "calendar";
}

export default async function HistoryPage({ searchParams }: HistoryPageProps) {
  const params = await searchParams;

  return (
    <HistoryScreen initialView={resolveViewMode(params.view)} />
  );
}
