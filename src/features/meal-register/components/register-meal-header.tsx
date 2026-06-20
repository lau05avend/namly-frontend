"use client";

import { useRouter } from "next/navigation";
import { REGISTER_MEAL_COPY } from "@/features/meal-register/constants/register-meal-copy";
import { ArrowLeft, Check } from "lucide-react";

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
    <header className="sticky top-0 z-30 -mx-4 flex items-center justify-between gap-3 border-b border-foreground/5 bg-background/95 px-4 py-3 backdrop-blur-sm pt-safe">
      <button
        type="button"
        onClick={() => router.back()}
        aria-label={REGISTER_MEAL_COPY.back}
        className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-mint text-primary"
      >
        <ArrowLeft className="size-5" />
      </button>
      <h1 className="flex-1 text-center text-base font-bold text-foreground">
        {title}
      </h1>
      <button
        type="button"
        onClick={onSave}
        disabled={isSaving}
        aria-label={saveLabel}
        className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-primary text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Check className="size-5" strokeWidth={2.5} />
      </button>
    </header>
  );
}
