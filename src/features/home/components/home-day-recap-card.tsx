"use client";

import { useRouter } from "next/navigation";
import { buildMealLogPath, HOME_PATH } from "@/lib/navigation/meal-routes";
import { CompletedMealItem } from "@/components/meal/completed-meal-item";
import { HOME_COPY } from "@/features/home/constants/home-copy";
import { HOME_SECTION_SURFACES } from "@/features/home/constants/home-hero-surfaces";
import type { RegisteredTodaySummary } from "@/features/home/types/home.types";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, ChevronDown } from "lucide-react";
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
    <div className={cn("overflow-hidden", HOME_SECTION_SURFACES.recap, className)}>
      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        aria-expanded={expanded}
        className="flex w-full cursor-pointer items-center gap-2.5 px-3.5 py-1.5 text-left transition-colors active:bg-mint/25"
      >
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-mint/50 ring-1 ring-primary/10">
          <CheckCircle2
            className="size-3.5 text-primary/70"
            strokeWidth={2}
            aria-hidden="true"
          />
        </span>

        <p className="min-w-0 flex-1 text-xs font-medium leading-snug text-foreground/65">
          {HOME_COPY.sections.dayRecapSubtitle(registeredToday.count)}
        </p>

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
            <div className="border-t border-foreground/6 px-3.5 pb-0.5">
              <ul className="flex flex-col">
                {completedMeals.map((meal, index) => (
                  <li
                    key={meal.id}
                    className={
                      index > 0 ? "border-t border-foreground/6" : undefined
                    }
                  >
                    <CompletedMealItem
                      variant="home"
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
  );
}
