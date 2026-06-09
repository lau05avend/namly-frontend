import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type SurfaceCardProps = HTMLAttributes<HTMLDivElement> & {
  muted?: boolean;
};

export function SurfaceCard({
  className,
  muted = false,
  ...props
}: SurfaceCardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-foreground/5 bg-card p-4 shadow-sm shadow-foreground/5",
        muted && "opacity-60",
        className,
      )}
      {...props}
    />
  );
}
