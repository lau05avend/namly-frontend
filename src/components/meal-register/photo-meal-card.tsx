"use client";

import { REGISTER_MEAL_COPY } from "@/features/meal-register/constants/register-meal-copy";
import { Camera } from "lucide-react";

type PhotoMealCardProps = {
  photoUrl?: string;
  onPickPhoto: () => void;
  error?: string | null;
};

function PhotoMealCardError({ message }: { message: string }) {
  return (
    <p
      role="alert"
      className="rounded-xl border border-cta/25 bg-cta/8 px-3 py-2.5 text-xs leading-relaxed font-medium text-cta"
    >
      {message}
    </p>
  );
}

export function PhotoMealCard({
  photoUrl,
  onPickPhoto,
  error,
}: PhotoMealCardProps) {
  if (!photoUrl) {
    return (
      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={onPickPhoto}
          className="flex aspect-[16/10] w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-foreground/15 bg-card/60 p-6"
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
        {error ? <PhotoMealCardError message={error} /> : null}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-foreground/5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photoUrl}
          alt=""
          className="size-full object-cover"
        />
        <button
          type="button"
          onClick={onPickPhoto}
          className="absolute right-3 bottom-3 cursor-pointer rounded-full bg-card/95 px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm"
        >
          {REGISTER_MEAL_COPY.photo.change}
        </button>
      </div>
      {error ? <PhotoMealCardError message={error} /> : null}
    </div>
  );
}
