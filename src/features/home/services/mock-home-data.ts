import { format } from "date-fns";
import { es } from "date-fns/locale";
import type { HomeSummary } from "@/features/home/types/home.types";

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function buildSummary(referenceDate: Date): HomeSummary {
  const date = referenceDate.toISOString().slice(0, 10);

  return {
    date,
    displayDate: capitalize(
      format(referenceDate, "EEEE d", { locale: es }),
    ),
    greeting: "Qué bueno verte otra vez, Laura 🌿",
    nextMeal: {
      id: "meal-next",
      slot: "lunch",
      slotLabel: "Almuerzo",
      timeLabel: "12:30 PM",
      title: "Sudado de pollo",
      countdownLabel: "En 45 min",
      items: [
        { id: "item-1", label: "Sudado de pollo" },
        { id: "item-2", label: "Arroz blanco" },
      ],
      moreCount: 1,
    },
    streak: {
      currentDays: 12,
      contextLabel: "días seguidos",
      personalBest: 18,
      mealsLoggedToday: 1,
      mealsGoalToday: 3,
    },
    upcomingMeals: [
      {
        id: "meal-up-1",
        title: "Cena",
        meta: "7:30 PM · 2 recetas",
      },
      {
        id: "meal-up-2",
        title: "Snack",
        meta: "5:00 PM · 1 receta",
      },
    ],
    registeredToday: {
      count: 1,
      label: "1 comida registrada",
    },
    recommendation: {
      id: "rec-1",
      title: "Ensalada de quinoa y aguacate",
      meta: "Colombiana · Vegetariana · 20 min",
    },
  };
}

export function getMockHomeSummary(referenceDate?: string): HomeSummary {
  const date = referenceDate ? new Date(referenceDate) : new Date();
  return buildSummary(date);
}
