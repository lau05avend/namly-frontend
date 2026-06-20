import { cn } from "@/lib/utils";

type StepProgressProps = {
  current: number;
  total: number;
  className?: string;
};

export function StepProgress({ current, total, className }: StepProgressProps) {
  return (
    <div className={cn("flex items-center justify-center gap-1.5", className)}>
      {Array.from({ length: total }, (_, index) => {
        const step = index + 1;
        const isActive = step === current;
        const isCompleted = step < current;

        return (
          <span
            key={step}
            aria-hidden
            className={cn(
              "rounded-full transition-all",
              isActive
                ? "h-1.5 w-6 bg-primary"
                : isCompleted
                  ? "size-1.5 bg-primary/50"
                  : "size-1.5 bg-foreground/15",
            )}
          />
        );
      })}
    </div>
  );
}
