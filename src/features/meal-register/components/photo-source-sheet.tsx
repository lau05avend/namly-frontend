"use client";

import { BottomSheet } from "@/components/ui/bottom-sheet";
import { Button } from "@/components/ui/button";
import { REGISTER_MEAL_COPY } from "@/features/meal-register/constants/register-meal-copy";
import { Camera, ImageIcon } from "lucide-react";

type PhotoSourceSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTakePhoto: () => void;
  onChooseFromGallery: () => void;
};

export function PhotoSourceSheet({
  open,
  onOpenChange,
  onTakePhoto,
  onChooseFromGallery,
}: PhotoSourceSheetProps) {
  const handleTakePhoto = () => {
    onOpenChange(false);
    onTakePhoto();
  };

  const handleChooseFromGallery = () => {
    onOpenChange(false);
    onChooseFromGallery();
  };

  return (
    <BottomSheet
      open={open}
      onOpenChange={onOpenChange}
      title={REGISTER_MEAL_COPY.photo.sourceSheetTitle}
      description={REGISTER_MEAL_COPY.photo.sourceSheetDescription}
      footer={
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onOpenChange(false)}
        >
          {REGISTER_MEAL_COPY.photo.cancel}
        </Button>
      }
    >
      <div className="flex flex-col gap-2 pb-2">
        <button
          type="button"
          data-vaul-no-drag
          onClick={handleTakePhoto}
          className="flex w-full cursor-pointer items-center gap-3 rounded-xl border border-foreground/8 bg-card/40 px-4 py-3.5 text-left transition-colors hover:bg-mint/15"
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-mint text-primary">
            <Camera className="size-5" aria-hidden />
          </span>
          <span className="text-sm font-semibold text-foreground">
            {REGISTER_MEAL_COPY.photo.takePhoto}
          </span>
        </button>

        <button
          type="button"
          data-vaul-no-drag
          onClick={handleChooseFromGallery}
          className="flex w-full cursor-pointer items-center gap-3 rounded-xl border border-foreground/8 bg-card/40 px-4 py-3.5 text-left transition-colors hover:bg-mint/15"
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-mint text-primary">
            <ImageIcon className="size-5" aria-hidden />
          </span>
          <span className="text-sm font-semibold text-foreground">
            {REGISTER_MEAL_COPY.photo.chooseFromGallery}
          </span>
        </button>
      </div>
    </BottomSheet>
  );
}
