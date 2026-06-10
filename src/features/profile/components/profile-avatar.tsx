import Image from "next/image";
import { UserRound } from "lucide-react";
import { cn } from "@/lib/utils";
import { PROFILE_COPY } from "@/features/profile/constants/profile-copy";
import { useResolvedAvatarUrl } from "@/features/profile/hooks/use-resolved-avatar-url";
import {
  isRemoteImageUrl,
  isSupabaseStorageImageUrl,
} from "@/features/profile/utils/avatar-storage.utils";

type ProfileAvatarProps = {
  displayName: string;
  avatarUrl?: string;
  size?: "md" | "lg";
  className?: string;
};

const SIZE_CLASSES = {
  md: "size-20",
  lg: "size-24",
} as const;

const IMAGE_SIZES = {
  md: 80,
  lg: 96,
} as const;

const ICON_SIZES = {
  md: "size-8",
  lg: "size-10",
} as const;

export function ProfileAvatar({
  displayName,
  avatarUrl,
  size = "md",
  className,
}: ProfileAvatarProps) {
  const { displayUrl, isResolving } = useResolvedAvatarUrl(avatarUrl);

  const initials = displayName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  const pixelSize = IMAGE_SIZES[size];
  const showImage = Boolean(displayUrl) && !isResolving;

  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-full border border-foreground/8 bg-mint",
        SIZE_CLASSES[size],
        className,
      )}
    >
      {showImage && displayUrl ? (
        isRemoteImageUrl(displayUrl) ? (
          <Image
            src={displayUrl}
            alt={PROFILE_COPY.avatarAlt}
            fill
            sizes={`${pixelSize}px`}
            className="object-cover"
            unoptimized={
              displayUrl.startsWith("blob:") ||
              isSupabaseStorageImageUrl(displayUrl)
            }
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element -- non-http local refs
          <img
            src={displayUrl}
            alt={PROFILE_COPY.avatarAlt}
            className="size-full object-cover"
          />
        )
      ) : (
        <div className="flex size-full items-center justify-center text-primary">
          {initials ? (
            <span className="text-xl font-semibold">{initials}</span>
          ) : (
            <UserRound className={ICON_SIZES[size]} aria-hidden />
          )}
        </div>
      )}
    </div>
  );
}
