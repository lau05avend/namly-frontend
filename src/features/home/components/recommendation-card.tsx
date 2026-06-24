import { SurfaceCard } from "@/components/ui/surface-card";
import type { HomeRecommendation } from "@/features/home/types/home.types";
import { Sparkles } from "lucide-react";
import Image from "next/image";

type RecommendationCardProps = {
  recommendation: HomeRecommendation;
};

export function RecommendationCard({ recommendation }: RecommendationCardProps) {
  return (
    <SurfaceCard className="flex items-center gap-3 border-foreground/6 bg-card/40 p-3 shadow-none">
      <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-linear-to-br from-highlight/35 via-mint/40 to-card">
        {recommendation.imageUrl ? (
          <Image
            src={recommendation.imageUrl}
            alt=""
            fill
            className="object-cover"
            sizes="56px"
          />
        ) : (
          <span className="flex size-full items-center justify-center">
            <Sparkles
              className="size-5 text-primary/45"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-semibold leading-snug text-foreground">
          {recommendation.title}
        </h3>
        <p className="mt-0.5 truncate text-xs text-foreground/50">
          {recommendation.meta}
        </p>
      </div>
    </SurfaceCard>
  );
}
