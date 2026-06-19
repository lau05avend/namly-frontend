import { useQuery } from "@tanstack/react-query";
import { registerMealQueryKeys } from "@/features/meal-register/constants/query-keys";
import { fetchRegisterPlanPickerMeals } from "@/features/meal-register/services/register-meal.service";

export function useRegisterPlanPicker(dateKey: string, enabled: boolean) {
  return useQuery({
    queryKey: registerMealQueryKeys.planPicker(dateKey),
    queryFn: () => fetchRegisterPlanPickerMeals(dateKey),
    enabled: enabled && Boolean(dateKey),
  });
}
