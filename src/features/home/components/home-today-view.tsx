import { NextMealCard } from "@/components/meal/next-meal-card";
import { StreakCard } from "@/components/progress/streak-card";
import { SectionHeader } from "@/components/ui/section-header";
import { RegisteredSummaryCard } from "@/components/timeline/registered-summary-card";
import { UpcomingMealRow } from "@/components/timeline/upcoming-meal-item";
import { RecommendationCard } from "@/features/home/components/recommendation-card";
import { HOME_COPY } from "@/features/home/constants/home-copy";
import type { HomeSummary } from "@/features/home/types/home.types";

type HomeTodayViewProps = {
  summary: HomeSummary;
};

export function HomeTodayView({ summary }: HomeTodayViewProps) {
  return (
    <div className="flex flex-col gap-7">
      <section className="grid grid-cols-5 gap-3">
        <div className="col-span-3">
          <NextMealCard
            meal={summary.nextMeal}
            sectionLabel={HOME_COPY.sections.nextMeal}
            className="h-full min-h-[220px]"
          />
        </div>
        <div className="col-span-2">
          <StreakCard
            days={summary.streak.currentDays}
            contextLabel={summary.streak.contextLabel}
            personalBestLabel={`${summary.streak.personalBest} · ${HOME_COPY.streak.personalBest}`}
            progressLabel={HOME_COPY.streak.mealsProgress(
              summary.streak.mealsLoggedToday,
              summary.streak.mealsGoalToday,
            )}
            progressPercent={
              summary.streak.mealsGoalToday > 0
                ? Math.round(
                    (summary.streak.mealsLoggedToday /
                      summary.streak.mealsGoalToday) *
                      100,
                  )
                : 0
            }
            className="h-full"
          />
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <SectionHeader title={HOME_COPY.sections.upcoming} />
        <ul className="flex flex-col gap-2">
          {summary.upcomingMeals.map((meal) => (
            <li key={meal.id}>
              <UpcomingMealRow meal={meal} />
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-3">
        <SectionHeader title={HOME_COPY.sections.registered} />
        <RegisteredSummaryCard summary={summary.registeredToday} />
      </section>

      <RecommendationCard
        recommendation={summary.recommendation}
        sectionTitle={HOME_COPY.sections.recommendation}
      />
    </div>
  );
}
