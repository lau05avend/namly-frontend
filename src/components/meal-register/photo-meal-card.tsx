"use client";

import { NamlyLogo } from "@/components/brand";
import { REGISTER_MEAL_COPY } from "@/features/meal-register/constants/register-meal-copy";
import { Camera } from "lucide-react";

type PhotoMealCardProps = {
  photoUrl?: string;
  onPickPhoto: () => void;
};

export function PhotoMealCard({ photoUrl, onPickPhoto }: PhotoMealCardProps) {
  if (!photoUrl) {
    return (
      <button
        type="button"
        onClick={onPickPhoto}
        className="flex aspect-[16/10] w-full flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-foreground/15 bg-card/60 p-6"
      >
        <span className="flex size-12 items-center justify-center rounded-full bg-mint text-primary">
          <Camera className="size-6" aria-hidden />
        </span>
        <span className="text-sm font-semibold text-foreground">
          {REGISTER_MEAL_COPY.photo.add}
        </span>
        <span className="text-xs text-foreground/45">
          {REGISTER_MEAL_COPY.photo.emptyHint}
        </span>
      </button>
    );
  }

  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-linear-to-br from-mint via-mint/70 to-highlight/40">
      <div className="flex h-full items-center justify-center">
        <NamlyLogo size={80} className="opacity-90" />
      </div>
      <button
        type="button"
        onClick={onPickPhoto}
        className="absolute right-3 bottom-3 rounded-full bg-card/95 px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm"
      >
        {REGISTER_MEAL_COPY.photo.change}
      </button>
    </div>
  );
}
