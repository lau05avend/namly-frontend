"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { HistoryLoading } from "@/features/history/components/history-loading";
import { HISTORY_COPY } from "@/features/history/constants/history-copy";
import { useHistoryDay } from "@/features/history/queries/use-history-day";

type HistoryDayRedirectProps = {
  dateKey: string;
};

export function HistoryDayRedirect({ dateKey }: HistoryDayRedirectProps) {
  const router = useRouter();
  const { data, isPending, isError } = useHistoryDay(dateKey);

  useEffect(() => {
    const firstLog = data?.logs[0];
    if (firstLog) {
      router.replace(`/history/meals/${firstLog.id}?date=${dateKey}`);
    }
  }, [data, dateKey, router]);

  if (isError) {
    return (
      <p className="px-4 py-10 text-center text-sm text-foreground/60">
        {HISTORY_COPY.loadError}
      </p>
    );
  }

  if (data && data.logs.length === 0) {
    return (
      <p className="px-4 py-10 text-center text-sm text-foreground/60">
        {HISTORY_COPY.dayEmpty}
      </p>
    );
  }

  if (isPending || data) {
    return (
      <div className="px-4 py-2">
        <HistoryLoading />
      </div>
    );
  }

  return null;
}
