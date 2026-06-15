import { addDays, format, startOfMonth } from "date-fns";
import { toDateKey } from "@/features/calendar/utils/date";
import type {
  PlannerDayPlan,
  PlannerMonthActivity,
} from "@/features/planner/types/planner.types";

function buildDayPlan(dateKey: string): PlannerDayPlan | null {
  const todayKey = toDateKey(new Date());

  const plans: Record<string, PlannerDayPlan> = {
    [todayKey]: {
      date: todayKey,
      registeredSummary: {
        count: 1,
        label: "1 comida registrada",
        hint: "Toca para ver el detalle",
        meals: [
          {
            id: "registered-breakfast",
            mealTypeName: "Desayuno",
            timeLabel: "08:00 AM",
            detail: "Huevos con arepa",
            isExpress: false,
          },
        ],
      },
      sections: [
        {
          id: "next",
          title: "Próxima comida",
          entries: [
            {
              id: "lunch-1",
              kind: "meal",
              slot: "lunch",
              slotLabel: "ALMUERZO",
              timeLabel: "12:30 PM",
              title: "Sudado de pollo",
              countdownLabel: "En 45 min",
              variant: "featured",
              items: [
                { id: "i1", label: "Sudado de pollo" },
                { id: "i2", label: "Arroz blanco" },
              ],
            },
          ],
        },
        {
          id: "upcoming",
          title: "Lo que sigue",
          entries: [
            {
              id: "snack-note",
              kind: "note",
              slot: "snack",
              slotLabel: "SNACK",
              timeLabel: "4:00 PM",
              title: "Algo rápido para la tarde",
              badge: "Nota rápida",
              variant: "note",
            },
            {
              id: "dinner-1",
              kind: "meal",
              slot: "dinner",
              slotLabel: "CENA",
              timeLabel: "7:30 PM",
              title: "Sopa de lentejas",
              variant: "default",
              items: [{ id: "d1", label: "Sopa de lentejas" }],
            },
          ],
        },
      ],
    },
  };

  return plans[dateKey] ?? null;
}

function buildDefaultDayPlan(dateKey: string): PlannerDayPlan {
  return {
    date: dateKey,
    sections: [
      {
        id: "upcoming",
        title: "Lo que sigue",
        entries: [],
      },
    ],
  };
}

export function getMockPlannerDay(dateKey: string): PlannerDayPlan {
  return buildDayPlan(dateKey) ?? buildDefaultDayPlan(dateKey);
}

export function getMockPlannerMonthActivity(month: Date): PlannerMonthActivity {
  const monthStart = startOfMonth(month);
  const monthKey = format(monthStart, "yyyy-MM");
  const days = Array.from({ length: 31 }, (_, index) => {
    const date = addDays(monthStart, index);
    if (date.getMonth() !== monthStart.getMonth()) return null;
    const key = toDateKey(date);
    const dayOfMonth = date.getDate();
    const hasPlanned = dayOfMonth >= 11 && dayOfMonth <= 14;
    const hasCompleted = dayOfMonth === 11 || dayOfMonth === 12;

    return {
      date: key,
      hasPlanned,
      hasCompleted,
    };
  }).filter((day): day is NonNullable<typeof day> => day !== null);

  return { month: monthKey, days };
}
