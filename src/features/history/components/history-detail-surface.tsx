import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type HistoryDetailSurfaceProps = HTMLAttributes<HTMLDivElement>;

export function HistoryDetailSurface({
  className,
  children,
  ...props
}: HistoryDetailSurfaceProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-foreground/8 bg-card shadow-none",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
