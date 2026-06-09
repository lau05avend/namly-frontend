"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  planMealFormSchema,
  type PlanMealFormValues,
} from "@/features/planner/schemas/plan-meal.schema";

export function usePlanMealForm(defaultValues: PlanMealFormValues) {
  return useForm<PlanMealFormValues>({
    resolver: zodResolver(planMealFormSchema),
    defaultValues,
    mode: "onSubmit",
  });
}
