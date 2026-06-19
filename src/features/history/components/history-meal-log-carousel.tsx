"use client";

import { useCallback, useEffect, useRef } from "react";
import { HistoryMealLogDetailContent } from "@/features/history/components/history-meal-log-detail-content";
import { cn } from "@/lib/utils";

type HistoryMealLogCarouselProps = {
  logIds: string[];
  activeLogId: string;
  onActiveLogChange: (logId: string) => void;
  className?: string;
};

export function HistoryMealLogCarousel({
  logIds,
  activeLogId,
  onActiveLogChange,
  className,
}: HistoryMealLogCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScroll = useRef(false);
  const activeIndex = logIds.indexOf(activeLogId);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element || activeIndex < 0) {
      return;
    }

    isProgrammaticScroll.current = true;
    element.scrollTo({
      left: activeIndex * element.clientWidth,
      behavior: "instant",
    });

    const frame = requestAnimationFrame(() => {
      isProgrammaticScroll.current = false;
    });

    return () => cancelAnimationFrame(frame);
  }, [activeIndex]);

  const handleScroll = useCallback(() => {
    if (isProgrammaticScroll.current) {
      return;
    }

    const element = scrollRef.current;
    if (!element || element.clientWidth === 0) {
      return;
    }

    const index = Math.round(element.scrollLeft / element.clientWidth);
    const nextId = logIds[index];

    if (nextId && nextId !== activeLogId) {
      onActiveLogChange(nextId);
    }
  }, [activeLogId, logIds, onActiveLogChange]);

  return (
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      className={cn(
        "flex snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      {logIds.map((logId, index) => (
        <section
          key={logId}
          className="w-full shrink-0 snap-center"
          aria-label={`Registro ${index + 1} de ${logIds.length}`}
        >
          <HistoryMealLogDetailContent logId={logId} />
        </section>
      ))}
    </div>
  );
}
