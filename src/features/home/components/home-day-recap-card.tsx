"use client";

import { useRouter } from "next/navigation";
import { buildMealLogPath, HOME_PATH } from "@/lib/navigation/meal-routes";
import { CompletedMealItem } from "@/components/meal/completed-meal-item";
import { HOME_COPY } from "@/features/home/constants/home-copy";
import { HOME_SECTION_SURFACES } from "@/features/home/constants/home-hero-surfaces";
import type { RegisteredTodaySummary } from "@/features/home/types/home.types";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Sparkles } from "lucide-react";
import { useState } from "react";

type HomeDayRecapCardProps = {
  registeredToday: RegisteredTodaySummary;
  dateKey: string;
  defaultExpanded?: boolean;
  className?: string;
};

export function HomeDayRecapCard({
  registeredToday,
  dateKey,
  defaultExpanded = false,
  className,
}: HomeDayRecapCardProps) {
  const router = useRouter();
  const [expanded, setExpanded] = useState(defaultExpanded);
  const completedMeals = registeredToday.meals ?? [];

  const handleRegisteredMealPress = (mealLogId: string) => {
    router.push(buildMealLogPath(mealLogId, dateKey, HOME_PATH));
  };

  return (
    <section
      aria-label={HOME_COPY.sections.dayRecap}
      className={className}
    >
      <div className={cn("overflow-hidden", HOME_SECTION_SURFACES.recap)}>
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          className="flex w-full cursor-pointer items-center justify-between gap-2.5 px-3.5 py-2.5 text-left transition-colors active:bg-foreground/3"
        >
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <p className="text-[13px] font-semibold leading-snug text-foreground/82">
              {HOME_COPY.sections.dayRecap}
            </p>
            <p className="flex items-center gap-1 text-xs leading-snug text-foreground/52">
              {HOME_COPY.sections.dayRecapSubtitle(registeredToday.count)}
              <Sparkles
                className="size-3 shrink-0 text-highlight"
                strokeWidth={2}
                aria-hidden="true"
              />
            </p>
          </div>
          <ChevronDown
            className={cn(
              "size-4 shrink-0 text-foreground/35 transition-transform duration-200",
              expanded && "rotate-180",
            )}
            aria-hidden
          />
        </button>

        <AnimatePresence initial={false}>
          {expanded && completedMeals.length > 0 ? (
            <motion.div
              key="day-recap-meals"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden"
            >
              <div className="border-t border-foreground/6 px-3 pb-0.5">
                <ul className="flex flex-col">
                  {completedMeals.map((meal, index) => (
                    <li
                      key={meal.id}
                      className={
                        index > 0 ? "border-t border-foreground/6" : undefined
                      }
                    >
                      <CompletedMealItem
                        meal={{
                          ...meal,
                          isExpress: false,
                        }}
                        onSelect={() => handleRegisteredMealPress(meal.id)}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}
