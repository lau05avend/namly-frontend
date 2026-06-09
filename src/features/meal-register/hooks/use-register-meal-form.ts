"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  registerMealFormSchema,
  type RegisterMealFormValues,
} from "@/features/meal-register/schemas/register-meal.schema";

export function useRegisterMealForm(defaultValues: RegisterMealFormValues) {
  return useForm<RegisterMealFormValues>({
    resolver: zodResolver(registerMealFormSchema),
    defaultValues,
    mode: "onSubmit",
  });
}
