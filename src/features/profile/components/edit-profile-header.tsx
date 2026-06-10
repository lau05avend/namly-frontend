"use client";

import { PROFILE_COPY } from "@/features/profile/constants/profile-copy";
import { ArrowLeft } from "lucide-react";

type EditProfileHeaderProps = {
  onCancel: () => void;
};

export function EditProfileHeader({ onCancel }: EditProfileHeaderProps) {
  return (
    <header className="sticky top-0 z-30 -mx-4 flex items-center gap-3 border-b border-foreground/5 bg-background/95 px-4 py-3 backdrop-blur-sm pt-safe">
      <button
        type="button"
        onClick={onCancel}
        aria-label={PROFILE_COPY.back}
        className="flex size-10 cursor-pointer items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-mint/50"
      >
        <ArrowLeft className="size-5" />
      </button>
      <h1 className="flex-1 text-center text-base font-bold text-foreground">
        {PROFILE_COPY.editTitle}
      </h1>
      <span className="size-10" aria-hidden />
    </header>
  );
}
