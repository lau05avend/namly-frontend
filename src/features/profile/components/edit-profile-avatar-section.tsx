"use client";

import { MediaPreparingOverlay } from "@/components/media/media-preparing-overlay";
import { ProfileAvatar } from "@/features/profile/components/profile-avatar";
import { PROFILE_COPY } from "@/features/profile/constants/profile-copy";
import { AVATAR_IMAGE_ACCEPT } from "@/features/profile/services/avatar-storage.service";
import { cn } from "@/lib/utils";
import { Loader2, Pencil } from "lucide-react";

type EditProfileAvatarSectionProps = {
  displayName: string;
  avatarUrl: string;
  previewUrl: string | null;
  isSaving: boolean;
  isPreparing?: boolean;
  galleryInputRef: React.RefObject<HTMLInputElement | null>;
  cameraInputRef: React.RefObject<HTMLInputElement | null>;
  onOpenMediaPicker: () => void;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClearSelection: () => void;
};

export function EditProfileAvatarSection({
  displayName,
  avatarUrl,
  previewUrl,
  isSaving,
  isPreparing = false,
  galleryInputRef,
  cameraInputRef,
  onOpenMediaPicker,
  onFileChange,
  onClearSelection,
}: EditProfileAvatarSectionProps) {
  const hasLocalPreview = Boolean(previewUrl);
  const persistedUrl = avatarUrl.trim() || undefined;
  const isBusy = isSaving || isPreparing;

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={onOpenMediaPicker}
        disabled={isBusy}
        aria-label={PROFILE_COPY.changePhoto}
        className={cn(
          "group relative size-28 shrink-0 cursor-pointer rounded-full",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-card",
          "disabled:cursor-not-allowed disabled:opacity-70",
        )}
      >
        {hasLocalPreview && previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- local preview only
          <img
            src={previewUrl}
            alt=""
            className="size-full rounded-full border border-foreground/8 object-cover shadow-sm shadow-foreground/5"
          />
        ) : (
          <ProfileAvatar
            displayName={displayName}
            avatarUrl={persistedUrl}
            size="lg"
            className="size-28 shadow-sm shadow-foreground/5"
          />
        )}

        {!isBusy ? (
          <span
            className={cn(
              "absolute right-0.5 bottom-0.5 flex size-8 items-center justify-center rounded-full",
              "border-2 border-card bg-primary text-white shadow-sm shadow-primary/20",
              "transition-transform group-hover:scale-105 group-active:scale-95",
            )}
            aria-hidden
          >
            <Pencil className="size-3.5" strokeWidth={2.25} />
          </span>
        ) : null}

        {isPreparing ? <MediaPreparingOverlay variant="circle" /> : null}

        {isSaving ? (
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-foreground/20">
            <Loader2 className="size-6 animate-spin text-white" aria-hidden />
          </div>
        ) : null}
      </button>

      <input
        ref={galleryInputRef}
        type="file"
        accept={AVATAR_IMAGE_ACCEPT}
        className="sr-only"
        onChange={onFileChange}
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept={AVATAR_IMAGE_ACCEPT}
        capture="environment"
        className="sr-only"
        onChange={onFileChange}
      />

      {hasLocalPreview ? (
        <button
          type="button"
          onClick={onClearSelection}
          disabled={isBusy}
          className={cn(
            "cursor-pointer text-xs font-medium text-foreground/45 transition-colors",
            "hover:text-foreground/65 disabled:cursor-not-allowed disabled:opacity-50",
          )}
        >
          {PROFILE_COPY.removePhoto}
        </button>
      ) : null}
    </div>
  );
}
