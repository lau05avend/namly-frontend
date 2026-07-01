"use client";

import { useRouter } from "next/navigation";
import { SurfaceCard } from "@/components/ui/surface-card";
import { HOME_COPY } from "@/features/home/constants/home-copy";
import { HOME_SECTION_SURFACES } from "@/features/home/constants/home-hero-surfaces";
import type { HomeRecommendation } from "@/features/home/types/home.types";
import { getRecommendationHighlightTags } from "@/features/home/utils/recommendation-meta.utils";
import { RecipeCoverImage } from "@/features/recipes/components/recipe-cover-image";
import {
  formatRecipeDuration,
  formatRecipeDurationAriaLabel,
} from "@/features/recipes/utils/format-recipe-duration";
import { HOME_PATH } from "@/lib/navigation/meal-routes";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

type RecommendationCardProps = {
  recommendation: HomeRecommendation;
};

function RecommendationMetadata({
  tags,
  durationLabel,
  durationAria,
}: {
  tags: string[];
  durationLabel: string | null;
  durationAria: string | null;
}) {
  const hasDuration = Boolean(durationLabel && durationAria);
  const hasTags = tags.length > 0;

  if (!hasDuration && !hasTags) {
    return null;
  }

  return (
    <p className="line-clamp-2 text-xs leading-relaxed text-foreground/50">
      {hasDuration ? (
        <span aria-label={durationAria ?? undefined}>
          <span className="tabular-nums">{durationLabel}</span>
        </span>
      ) : null}
      {tags.map((tag, index) => (
        <span key={`${tag}-${index}`}>
          {hasDuration || index > 0 ? (
            <span className="text-cta/50" aria-hidden>
              {" · "}
            </span>
          ) : null}
          {tag}
        </span>
      ))}
    </p>
  );
}

export function RecommendationCard({ recommendation }: RecommendationCardProps) {
  const router = useRouter();
  const hasImage = Boolean(recommendation.imageUrl?.trim());
  const highlightTags = getRecommendationHighlightTags(recommendation.meta);
  const durationLabel = formatRecipeDuration(recommendation.totalDurationMinutes);
  const durationAria = formatRecipeDurationAriaLabel(
    recommendation.totalDurationMinutes,
  );

  const handlePress = () => {
    const params = new URLSearchParams({
      returnTo: HOME_PATH,
    });
    router.push(`/recipes/${recommendation.id}?${params.toString()}`);
  };

  return (
    <SurfaceCard
      className={cn(
        "flex cursor-pointer flex-col overflow-hidden p-0 transition-transform active:scale-[0.99]",
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
      <div className="relative aspect-[11/4] w-full shrink-0 overflow-hidden bg-card">
        {hasImage ? (
          <RecipeCoverImage
            coverUrl={recommendation.imageUrl}
            priority
            placeholderBackgroundClassName="bg-card"
            placeholderIconClassName="size-8 text-foreground/12"
          />
        ) : (
          <span className="flex size-full items-center justify-center">
            <Sparkles
              className="size-8 text-foreground/12"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </span>
        )}

        <span
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-9 bg-gradient-to-t from-background via-background/15 to-transparent"
          aria-hidden
        />
      </div>

      <div className="flex flex-col gap-1 px-4 pt-5 pb-5">
        <h3 className="line-clamp-2 text-[17px] font-semibold leading-snug text-foreground">
          {recommendation.title}
        </h3>

        <RecommendationMetadata
          tags={highlightTags}
          durationLabel={durationLabel}
          durationAria={durationAria}
        />
      </div>
    </SurfaceCard>
  );
}
