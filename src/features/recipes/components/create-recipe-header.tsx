"use client";

import { useRouter } from "next/navigation";
import { RECIPES_COPY } from "@/features/recipes/constants/recipes-copy";
import { ArrowLeft, Check } from "lucide-react";

type CreateRecipeHeaderProps = {
  onSave: () => void;
  isSaving?: boolean;
};

export function CreateRecipeHeader({
  onSave,
  isSaving = false,
}: CreateRecipeHeaderProps) {
  const router = useRouter();
  const copy = RECIPES_COPY.create;

  return (
    <header className="sticky top-0 z-30 -mx-4 flex items-center justify-between gap-3 border-b border-foreground/5 bg-background/95 px-4 py-3 backdrop-blur-sm pt-safe">
      <button
        type="button"
        onClick={() => router.back()}
        aria-label={copy.back}
        className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-mint text-primary"
      >
        <ArrowLeft className="size-5" aria-hidden />
      </button>
      <h1 className="flex-1 text-center text-base font-bold text-foreground">
        {copy.title}
      </h1>
      <button
        type="button"
        onClick={onSave}
        disabled={isSaving}
        aria-label={copy.save}
        className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-primary text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Check className="size-5" strokeWidth={2.5} aria-hidden />
      </button>
    </header>
  );
}
