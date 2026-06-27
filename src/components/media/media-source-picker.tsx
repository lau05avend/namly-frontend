"use client";

import { BottomSheet } from "@/components/ui/bottom-sheet";
import {
  getMediaSourcePickerSubtitle,
  MEDIA_SOURCE_PICKER_COPY,
  type MediaSourcePickerContext,
} from "@/components/media/media-source-picker-copy";
import { cn } from "@/lib/utils";
import { Camera, Image as ImageIcon } from "lucide-react";
import type { ReactNode } from "react";

type MediaSourcePickerTileProps = {
  label: string;
  ariaLabel: string;
  onClick: () => void;
  iconClassName?: string;
  children: ReactNode;
};

function MediaSourcePickerTile({
  label,
  ariaLabel,
  onClick,
  iconClassName,
  children,
}: MediaSourcePickerTileProps) {
  return (
    <button
      type="button"
      data-vaul-no-drag
      onClick={onClick}
      aria-label={ariaLabel}
      className="flex w-[8.25rem] shrink-0 cursor-pointer flex-col items-center gap-2 rounded-xl py-3 transition-[transform,background-color] active:scale-[0.98] active:bg-foreground/[0.03]"
    >
      <span
        className={cn(
          "flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full",
          iconClassName,
        )}
      >
        {children}
      </span>
      <span className="text-[13px] font-semibold leading-none text-foreground">
        {label}
      </span>
    </button>
  );
}

export type MediaSourcePickerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTakePhoto: () => void;
  onChooseFromGallery: () => void;
  context?: MediaSourcePickerContext;
  title?: string;
  subtitle?: string;
  cameraLabel?: string;
  galleryLabel?: string;
  galleryThumbnail?: string | null;
};

export function MediaSourcePicker({
  open,
  onOpenChange,
  onTakePhoto,
  onChooseFromGallery,
  context = "meal",
  title = MEDIA_SOURCE_PICKER_COPY.title,
  subtitle,
  cameraLabel = MEDIA_SOURCE_PICKER_COPY.cameraLabel,
  galleryLabel = MEDIA_SOURCE_PICKER_COPY.galleryLabel,
  galleryThumbnail,
}: MediaSourcePickerProps) {
  const resolvedSubtitle = subtitle ?? getMediaSourcePickerSubtitle(context);
  const handleTakePhoto = () => {
    onOpenChange(false);
    onTakePhoto();
  };

  const handleChooseFromGallery = () => {
    onOpenChange(false);
    onChooseFromGallery();
  };

  const trimmedThumbnail = galleryThumbnail?.trim() ?? "";

  return (
    <BottomSheet
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={resolvedSubtitle}
      compact
      scrollableContent={false}
      contentClassName="pb-safe"
    >
      <div className="mt-1 flex justify-center gap-7">
        <MediaSourcePickerTile
          label={cameraLabel}
          ariaLabel={cameraLabel}
          onClick={handleTakePhoto}
          iconClassName="bg-primary"
        >
          <Camera className="size-5 text-white" strokeWidth={2} aria-hidden />
        </MediaSourcePickerTile>

        <MediaSourcePickerTile
          label={galleryLabel}
          ariaLabel={galleryLabel}
          onClick={handleChooseFromGallery}
          iconClassName={cn(
            trimmedThumbnail
              ? "border border-foreground/15 bg-card"
              : "bg-mint",
          )}
        >
          {trimmedThumbnail ? (
            <span className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full">
              {/* eslint-disable-next-line @next/next/no-img-element -- blob/data URL from local cache */}
              <img
                src={trimmedThumbnail}
                alt=""
                className="size-full object-cover"
              />
            </span>
          ) : (
            <ImageIcon
              className="size-5.5 text-primary/80"
              strokeWidth={1.75}
              aria-hidden
            />
          )}
        </MediaSourcePickerTile>
      </div>

      <button
        type="button"
        data-vaul-no-drag
        onClick={() => onOpenChange(false)}
        className="mt-3 w-full py-2 text-sm font-medium text-foreground/45 transition-colors active:text-foreground/65"
      >
        {MEDIA_SOURCE_PICKER_COPY.cancel}
      </button>
    </BottomSheet>
  );
}
