"use client";

import { useRouter } from "next/navigation";
import { FormScreenHeader } from "@/components/navigation/form-screen-header";
import { REGISTER_MEAL_COPY } from "@/features/meal-register/constants/register-meal-copy";

type RegisterMealHeaderProps = {
  onSave: () => void;
  isSaving?: boolean;
  title?: string;
  saveLabel?: string;
};

export function RegisterMealHeader({
  onSave,
  isSaving = false,
  title = REGISTER_MEAL_COPY.title,
  saveLabel = REGISTER_MEAL_COPY.save,
}: RegisterMealHeaderProps) {
  const router = useRouter();

  return (
    <FormScreenHeader
      title={title}
      backLabel={REGISTER_MEAL_COPY.back}
      saveLabel={saveLabel}
      onBack={() => router.back()}
      onSave={onSave}
      isSaving={isSaving}
    />
  );
}
