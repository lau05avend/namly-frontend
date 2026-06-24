import { HomeNextMealCard } from "@/features/home/components/home-next-meal-card";
import { HomeDayRecapCard } from "@/features/home/components/home-day-recap-card";
import { HomeSection } from "@/features/home/components/home-section";
import { HomeSectionTitle } from "@/features/home/components/home-section-title";
import { HomeStreakCard } from "@/features/home/components/home-streak-card";
import { RecommendationCard } from "@/features/home/components/recommendation-card";
import { HOME_COPY } from "@/features/home/constants/home-copy";
import { HOME_HERO_CARD_HEIGHT } from "@/features/home/constants/home-hero-surfaces";
import {
  mapUpcomingMealToPlannerEntry,
} from "@/features/home/mappers/home-planner-entry.mapper";
import type { HomeSummary } from "@/features/home/types/home.types";
import { PlannedEntryCard } from "@/components/meal/planned-entry-card";

type HomeTodayViewProps = {
  summary: HomeSummary;
};

export function HomeTodayView({ summary }: HomeTodayViewProps) {
  const progressPercent =
    summary.streak.mealsGoalToday > 0
      ? Math.round(
          (summary.streak.mealsLoggedToday / summary.streak.mealsGoalToday) *
            100,
        )
      : 0;

  return (
    <div className="flex flex-col gap-6 pb-2">
      <section aria-label="Resumen del día">
        <div className="grid grid-cols-5 grid-rows-[auto_1fr] gap-x-3 gap-y-2">
          <div className="col-span-3" aria-hidden />

          <div className="col-span-2">
            <HomeSectionTitle title={HOME_COPY.sections.streakShort} />
          </div>

          <div className="col-span-3">
            <HomeNextMealCard
              meal={summary.nextMeal}
              className={HOME_HERO_CARD_HEIGHT}
            />
          </div>

          <div className="col-span-2">
            <HomeStreakCard
              days={summary.streak.currentDays}
              progressLabel={HOME_COPY.streak.mealsProgressShort(
                summary.streak.mealsLoggedToday,
                summary.streak.mealsGoalToday,
              )}
              progressPercent={progressPercent}
              className={HOME_HERO_CARD_HEIGHT}
            />
          </div>
        </div>
      </section>

      <HomeSection title={HOME_COPY.sections.upcoming}>
        <ul className="flex flex-col gap-2">
          {summary.upcomingMeals.map((meal) => (
            <li key={meal.id}>
              <PlannedEntryCard entry={mapUpcomingMealToPlannerEntry(meal)} />
            </li>
          ))}
        </ul>
      </HomeSection>

      <HomeDayRecapCard registeredToday={summary.registeredToday} />

      <HomeSection title={HOME_COPY.sections.recommendation}>
        <RecommendationCard recommendation={summary.recommendation} />
      </HomeSection>
    </div>
  );
}
