"use client";

import { MediaPreparingOverlay } from "@/components/media/media-preparing-overlay";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { ProfileAvatar } from "@/features/profile/components/profile-avatar";
import { PROFILE_COPY } from "@/features/profile/constants/profile-copy";
import { AVATAR_IMAGE_ACCEPT } from "@/features/profile/services/avatar-storage.service";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

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

  return (
    <section className="flex flex-col gap-4">
      <SectionHeader title={PROFILE_COPY.avatarSection} />

      <div className="flex items-center gap-4">
        <div className="relative size-24 shrink-0">
          {hasLocalPreview && previewUrl ? (
            // eslint-disable-next-line @next/next/no-img-element -- local preview only
            <img
              src={previewUrl}
              alt={PROFILE_COPY.avatarAlt}
              className="size-full rounded-full border border-foreground/8 object-cover"
            />
          ) : (
            <ProfileAvatar
              displayName={displayName}
              avatarUrl={persistedUrl}
              size="lg"
              className="size-24"
            />
          )}

          {isPreparing ? <MediaPreparingOverlay variant="circle" /> : null}

          {isSaving ? (
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-foreground/20">
              <Loader2 className="size-6 animate-spin text-white" aria-hidden />
            </div>
          ) : null}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-2">
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

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onOpenMediaPicker}
            disabled={isSaving || isPreparing}
            className="w-auto self-start rounded-2xl px-4"
          >
            {PROFILE_COPY.changePhoto}
          </Button>

          {hasLocalPreview ? (
            <button
              type="button"
              onClick={onClearSelection}
              disabled={isSaving || isPreparing}
              className={cn(
                "w-fit cursor-pointer text-sm font-medium text-foreground/55 transition-colors",
                "hover:text-foreground disabled:opacity-50",
              )}
            >
              {PROFILE_COPY.removePhoto}
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
