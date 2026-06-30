import { format } from "date-fns";
import { es } from "date-fns/locale";
import { toDateKey } from "@/features/calendar/utils/date";
import type { HomeSummary } from "@/features/home/types/home.types";

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function buildSummary(referenceDate: Date): HomeSummary {
  const date = toDateKey(referenceDate);

  return {
    date,
    displayDate: capitalize(
      format(referenceDate, "EEEE d", { locale: es }),
    ),
    nextMeal: {
      id: "meal-next",
      kind: "meal",
      slot: "lunch",
      slotLabel: "Almuerzo",
      timeLabel: "12:30 p. m.",
      title: "Sudado de pollo",
      countdownLabel: "En 45 min",
      items: [
        { id: "item-1", label: "Sudado de pollo" },
        { id: "item-2", label: "Arroz blanco" },
        { id: "item-3", label: "Ensalada" },
        { id: "item-4", label: "Agua" },
        { id: "item-5", label: "Pan" },
        { id: "item-6", label: "Leche" },
        { id: "item-7", label: "Yogurt" },
        { id: "item-8", label: "Frutos rojos" },
        { id: "item-9", label: "Naranja" },
        { id: "item-10", label: "Manzana" },
        { id: "item-11", label: "Plátano" },
      ],
      moreCount: 1,
      totalDurationMinutes: 45,
    },
    streak: {
      currentDays: 12,
      mealsLoggedToday: 2,
      mealsGoalToday: 3,
      growthStageId: 4,
    },
    upcomingMeals: [
      {
        id: "meal-up-1",
        slot: "dinner",
        slotLabel: "Cena",
        timeLabel: "7:30 PM",
        title: "Sopa de lentejas",
        items: [
          { id: "up-1", label: "Sopa de lentejas" },
          { id: "up-2", label: "Pan integral" },
        ],
        totalDurationMinutes: 35,
      },
      {
        id: "meal-up-2",
        slot: "snack",
        slotLabel: "Snack",
        timeLabel: "5:00 PM",
        title: "Yogurt con frutos rojos",
        items: [{ id: "up-3", label: "Yogurt con frutos rojos" }],
        totalDurationMinutes: null,
      },
    ],
    registeredToday: {
      count: 3,
      meals: [
        {
          id: "registered-breakfast",
          mealTypeName: "Desayuno",
          timeLabel: "9:07 a.m.",
          detail: "Canelazo Caliente, Lulada Vallecaucana, Champus Vallecaucano",
        },
        {
          id: "registered-mid-morning",
          mealTypeName: "Media mañana",
          timeLabel: "11:00 a.m.",
          detail: "Canelazo Caliente, Lulada Vallecaucana, Champus Vallecaucano",
        },
        {
          id: "registered-lunch",
          mealTypeName: "Almuerzo",
          timeLabel: "1:30 p.m.",
          detail: "Sudado de pollo, Arroz blanco, Ensalada",
        },
      ],
    },
    recommendation: {
      id: "rec-1",
      title: "Ensalada de quinoa y aguacate",
      meta: "Colombiana · Vegetariana · Sin horno",
      totalDurationMinutes: 20,
      imageUrl:
        "https://ngixldapgdqvhmznylpw.supabase.co/storage/v1/object/sign/meal-logs-photos/65c752ed-7e71-45d0-9cb8-42b5ea2c3881/ensalada-de-quinoa-con-aguacate-y-cherrys.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xMWM0MDA5Yi1hNjE1LTQ0ZjgtYjNkYi04OWU3N2Y0NTVjNGMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWFsLWxvZ3MtcGhvdG9zLzY1Yzc1MmVkLTdlNzEtNDVkMC05Y2I4LTQyYjVlYTJjMzg4MS9lbnNhbGFkYS1kZS1xdWlub2EtY29uLWFndWFjYXRlLXktY2hlcnJ5cy5qcGVnIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4MjI2NzkwMywiZXhwIjoxODEzODAzOTAzfQ.VfN6NRXAvdC8zGPgTCWwGgXgELlYEyPEqD6PdGJaupQ",
    },
  };
}

export function getMockHomeSummary(referenceDate?: string): HomeSummary {
  const date = referenceDate ? new Date(referenceDate) : new Date();
  return buildSummary(date);
}
