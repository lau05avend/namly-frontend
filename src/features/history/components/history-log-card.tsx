"use client";

import Link from "next/link";
import { SurfaceCard } from "@/components/ui/surface-card";
import { MealPhotoImage } from "@/features/meal-register/components/meal-photo-image";
import type { HistoryMealLog } from "@/features/history/types/history.types";
import { cn } from "@/lib/utils";
import { ChevronRight, ImageIcon } from "lucide-react";

type HistoryLogCardProps = {
  log: HistoryMealLog;
  dateKey?: string;
  className?: string;
};

export function HistoryLogCard({ log, dateKey, className }: HistoryLogCardProps) {
  const href = dateKey
    ? `/history/meals/${log.id}?date=${dateKey}`
    : `/history/meals/${log.id}`;

  return (
    <Link href={href} className="block cursor-pointer">
      <SurfaceCard
        className={cn(
          "flex items-center gap-3.5 border-foreground/8 bg-card px-3 py-3 shadow-none transition-colors hover:bg-card/80",
          className,
        )}
      >
      <div className="relative size-14 shrink-0 overflow-hidden rounded-xl border border-foreground/8 bg-foreground/[0.03]">
        {log.mediaUrl ? (
          <MealPhotoImage
            mediaRef={log.mediaUrl}
            className="size-full"
            imageClassName="size-full"
          />
        ) : (
          <span className="flex size-full items-center justify-center text-foreground/20">
            <ImageIcon
              className="size-5"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-foreground">
          {log.mealTypeName}
        </p>
        <p className="text-xs text-foreground/50">{log.loggedAtTime}</p>
      </div>

      <ChevronRight
        className="size-4 shrink-0 text-foreground/25"
        aria-hidden="true"
      />
      </SurfaceCard>
    </Link>
  );
}
