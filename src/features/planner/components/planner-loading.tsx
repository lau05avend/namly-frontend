import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { cn } from "@/lib/utils";

type PlannerLoadingProps = {
  variant?: "day" | "compact" | "form";
  className?: string;
};

function CompactMealRowSkeleton() {
  return (
    <div className="flex items-start gap-2.5 rounded-xl border border-foreground/8 px-3 py-2.5">
      <Skeleton circle width={28} height={28} />
      <div className="flex min-w-0 flex-1 flex-col gap-1.5 pt-0.5">
        <Skeleton width="35%" height={10} borderRadius={6} />
        <Skeleton width="70%" height={12} borderRadius={6} />
      </div>
    </div>
  );
}

export function PlannerLoading({
  variant = "day",
  className,
}: PlannerLoadingProps) {
  if (variant === "compact") {
    return (
      <div
        className={cn("flex flex-col gap-2 pb-2", className)}
        aria-busy="true"
        aria-label="Cargando comidas planificadas"
      >
        <CompactMealRowSkeleton />
        <CompactMealRowSkeleton />
        <CompactMealRowSkeleton />
      </div>
    );
  }

  if (variant === "form") {
    return (
      <div
        className={cn("flex flex-col gap-5 py-2", className)}
        aria-busy="true"
        aria-label="Cargando formulario"
      >
        <Skeleton height={112} borderRadius={16} />
        <Skeleton height={52} borderRadius={16} />
        <Skeleton height={64} borderRadius={16} />
        <Skeleton height={44} borderRadius={16} />
      </div>
    );
  }

  return (
    <div
      className={cn("flex flex-col gap-5 pb-4", className)}
      aria-busy="true"
      aria-label="Cargando plan del día"
    >
      <div className="flex flex-col gap-2">
        <Skeleton width={96} height={12} borderRadius={6} />
        <Skeleton height={84} borderRadius={16} />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton width={112} height={12} borderRadius={6} />
        <CompactMealRowSkeleton />
        <CompactMealRowSkeleton />
      </div>
    </div>
  );
}
