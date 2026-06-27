"use client";

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { HistoryScrollToTodayButton } from "@/features/history/components/history-scroll-to-today-button";
import { HistoryTimelineMonth } from "@/features/history/components/history-timeline-month";
import { HISTORY_COPY } from "@/features/history/constants/history-copy";
import { useHistoryTimeline } from "@/features/history/queries/use-history-timeline";
import { cn } from "@/lib/utils";

type HistoryTimelineCalendarProps = {
  initialMonth: Date;
  onDayPress: (date: Date) => void;
};

export type HistoryTimelineCalendarHandle = {
  scrollToToday: () => void;
};

function TimelineSentinel({
  onVisible,
  className,
}: {
  onVisible: () => void;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          onVisible();
        }
      },
      { rootMargin: "280px 0px" },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [onVisible]);

  return <div ref={ref} className={cn("h-px w-full", className)} aria-hidden />;
}

export const HistoryTimelineCalendar = forwardRef<
  HistoryTimelineCalendarHandle,
  HistoryTimelineCalendarProps
>(function HistoryTimelineCalendar({ initialMonth, onDayPress }, ref) {
  const bottomAnchorRef = useRef<HTMLDivElement>(null);
  const didInitialScrollRef = useRef(false);
  const scrollHeightBeforeOlderRef = useRef(0);
  const [isCalendarReady, setIsCalendarReady] = useState(false);
  const [showScrollToToday, setShowScrollToToday] = useState(false);

  const scrollToToday = useCallback(() => {
    bottomAnchorRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      scrollToToday,
    }),
    [scrollToToday],
  );

  const {
    data,
    isPending,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useHistoryTimeline(initialMonth);

  const months = data?.pages ?? [];
  const monthsChronological = [...months].reverse();

  useEffect(() => {
    if (isPending || didInitialScrollRef.current || months.length === 0) {
      return;
    }

    didInitialScrollRef.current = true;
    bottomAnchorRef.current?.scrollIntoView({ block: "end" });
    setIsCalendarReady(true);
  }, [isPending, months.length]);

  useEffect(() => {
    if (!isCalendarReady) {
      return;
    }

    const anchor = bottomAnchorRef.current;

    if (!anchor) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowScrollToToday(!entry?.isIntersecting);
      },
      { rootMargin: "120px 0px 0px 0px", threshold: 0 },
    );

    observer.observe(anchor);

    return () => observer.disconnect();
  }, [isCalendarReady, months.length]);

  useEffect(() => {
    if (scrollHeightBeforeOlderRef.current === 0 || isFetchingNextPage) {
      return;
    }

    const previousHeight = scrollHeightBeforeOlderRef.current;
    const newHeight = document.documentElement.scrollHeight;
    const scrollDelta = newHeight - previousHeight;

    if (scrollDelta > 0) {
      window.scrollBy({ top: scrollDelta });
    }

    scrollHeightBeforeOlderRef.current = 0;
  }, [isFetchingNextPage, months.length]);

  const loadOlderMonths = () => {
    if (!hasNextPage || isFetchingNextPage) {
      return;
    }

    scrollHeightBeforeOlderRef.current = document.documentElement.scrollHeight;
    void fetchNextPage();
  };

  return (
    <>
      <HistoryScrollToTodayButton
        visible={showScrollToToday}
        onClick={scrollToToday}
      />

      <div className="flex flex-col gap-5 pb-4 pt-2">
        {hasNextPage ? <TimelineSentinel onVisible={loadOlderMonths} /> : null}

        {isFetchingNextPage ? (
          <p className="text-center text-xs text-foreground/40">Cargando…</p>
        ) : null}

        {isPending ? (
          <div className="flex flex-col gap-8">
            <div className="h-5 w-28 animate-pulse rounded-md bg-foreground/8" />
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 28 }).map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-1 rounded-2xl px-1 py-1.5"
                >
                  <div className="size-9 animate-pulse rounded-full bg-foreground/6" />
                  <div className="size-1.5" />
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {isError ? (
          <p className="text-center text-sm text-foreground/60">
            {HISTORY_COPY.loadError}
          </p>
        ) : null}

        {monthsChronological.map((month) => (
          <HistoryTimelineMonth
            key={month.monthKey}
            monthKey={month.monthKey}
            timeline={month}
            onDayPress={onDayPress}
          />
        ))}

        <div ref={bottomAnchorRef} aria-hidden className="h-px w-full" />
      </div>
    </>
  );
});
