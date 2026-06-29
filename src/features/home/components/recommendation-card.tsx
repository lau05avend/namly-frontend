"use client";

import { useRouter } from "next/navigation";
import { SurfaceCard } from "@/components/ui/surface-card";
import { HOME_COPY } from "@/features/home/constants/home-copy";
import { HOME_SECTION_SURFACES } from "@/features/home/constants/home-hero-surfaces";
import type { HomeRecommendation } from "@/features/home/types/home.types";
import { useResolvedRecipeCoverUrl } from "@/features/recipes/hooks/use-resolved-recipe-cover-url";
import { HOME_PATH } from "@/lib/navigation/meal-routes";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

type RecommendationCardProps = {
  recommendation: HomeRecommendation;
};

export function RecommendationCard({ recommendation }: RecommendationCardProps) {
  const router = useRouter();
  const hasImage = Boolean(recommendation.imageUrl?.trim());
  const { displayUrl, isResolving } = useResolvedRecipeCoverUrl(
    recommendation.imageUrl ?? undefined,
  );
  const showImage = Boolean(displayUrl) && !isResolving;

  const handlePress = () => {
    const params = new URLSearchParams({
      returnTo: HOME_PATH,
    });
    router.push(`/recipes/${recommendation.id}?${params.toString()}`);
  };

  return (
    <SurfaceCard
      className={cn(
        "flex cursor-pointer items-center gap-3 rounded-2xl p-3 shadow-none transition-transform active:scale-[0.99]",
        HOME_SECTION_SURFACES.recommendation,
      )}
      role="button"
      tabIndex={0}
      aria-label={HOME_COPY.sections.recommendationOpenAria(recommendation.title)}
      onClick={handlePress}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handlePress();
        }
      }}
    >
      <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-mint">
        {showImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={displayUrl}
            alt=""
            className="size-full object-cover"
          />
        ) : hasImage && isResolving ? (
          <span className="block size-full bg-foreground/5" aria-hidden />
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
