import { SurfaceCard } from "@/components/ui/surface-card";
import type { HistoryMealLog } from "@/features/history/types/history.types";
import { cn } from "@/lib/utils";
import { ChevronRight, ImageIcon } from "lucide-react";

type HistoryLogCardProps = {
  log: HistoryMealLog;
  className?: string;
};

export function HistoryLogCard({ log, className }: HistoryLogCardProps) {
  return (
    <SurfaceCard
      className={cn(
        "flex items-center gap-3.5 border-foreground/8 bg-card px-3 py-3 shadow-none",
        className,
      )}
    >
      <div className="relative size-14 shrink-0 overflow-hidden rounded-xl border border-foreground/8 bg-foreground/[0.03]">
        {log.mediaUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={log.mediaUrl} alt="" className="size-full object-cover" />
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
  );
}
