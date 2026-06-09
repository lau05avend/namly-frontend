import { SurfaceCard } from "@/components/ui/surface-card";
import { SectionHeader } from "@/components/ui/section-header";
import type { HomeRecommendation } from "@/features/home/types/home.types";
import { Sparkles } from "lucide-react";

type RecommendationCardProps = {
  recommendation: HomeRecommendation;
  sectionTitle: string;
};

export function RecommendationCard({
  recommendation,
  sectionTitle,
}: RecommendationCardProps) {
  return (
    <article className="flex flex-col gap-3">
      <SurfaceCard className="overflow-hidden p-0">
        <div className="relative flex aspect-[16/10] items-center justify-center bg-linear-to-br from-highlight via-highlight/80 to-cta/70">
          <Sparkles
            className="size-10 text-white/70"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </div>
        <div className="flex flex-col gap-2 p-4">
          <SectionHeader title={sectionTitle} />
          <h3 className="text-base font-bold text-foreground">
            {recommendation.title}
          </h3>
          <p className="text-sm text-foreground/55">{recommendation.meta}</p>
        </div>
      </SurfaceCard>
    </article>
  );
}
