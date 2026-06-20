"use client";

import { useRouter } from "next/navigation";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { parseDateKey } from "@/features/calendar";
import { HistoryDayContent } from "@/features/history/components/history-day-content";
import { HistoryLoading } from "@/features/history/components/history-loading";
import { HISTORY_COPY } from "@/features/history/constants/history-copy";
import { useHistoryDay } from "@/features/history/queries/use-history-day";
import { formatHistoryDayHeading } from "@/features/history/utils/format-history-date";
import { ArrowLeft } from "lucide-react";

type HistoryDayScreenProps = {
  dateKey: string;
};

export function HistoryDayScreen({ dateKey }: HistoryDayScreenProps) {
  const router = useRouter();
  const { data, isPending, isError } = useHistoryDay(dateKey);
  const parsedDate = parseDateKey(dateKey);
  const heading = parsedDate
    ? formatHistoryDayHeading(dateKey)
    : HISTORY_COPY.dayDetailTitle;

  return (
    <div className="relative min-h-dvh bg-background pb-28">
      <div className="fixed inset-x-0 top-0 z-30 border-b border-foreground/8 bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-lg items-center gap-3 px-4 py-3 pt-safe">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label={HISTORY_COPY.back}
            className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-mint text-primary"
          >
            <ArrowLeft className="size-5" aria-hidden />
          </button>
          <h1 className="min-w-0 flex-1 truncate text-center text-base font-bold text-foreground">
            {heading}
          </h1>
          <span className="size-10 shrink-0" aria-hidden />
        </div>
      </div>

      <main className="mx-auto w-full max-w-lg px-4 pt-[calc(env(safe-area-inset-top)+4.25rem)]">
        {isPending ? <HistoryLoading /> : null}

        {isError ? (
          <p className="py-10 text-center text-sm text-foreground/60">
            {HISTORY_COPY.loadError}
          </p>
        ) : null}

        {data && !isPending ? <HistoryDayContent day={data} /> : null}
      </main>

      <BottomNav activeId="history" />
    </div>
  );
}
