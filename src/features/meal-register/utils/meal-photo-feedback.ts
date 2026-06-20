import { toast } from "sonner";
import { REGISTER_MEAL_COPY } from "@/features/meal-register/constants/register-meal-copy";

export function showMealPhotoPickError(message: string) {
  toast.error(REGISTER_MEAL_COPY.photo.errors.title, {
    description: message,
    duration: 6000,
  });
}
