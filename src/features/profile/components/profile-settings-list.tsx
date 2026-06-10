"use client";

import { SectionHeader } from "@/components/ui/section-header";
import { ProfileSettingsRow } from "@/features/profile/components/profile-settings-row";
import { PROFILE_COPY } from "@/features/profile/constants/profile-copy";
import { LogOut, UserRound } from "lucide-react";

type ProfileSettingsListProps = {
  onEditProfile: () => void;
  onSignOut: () => void;
  isSigningOut?: boolean;
};

export function ProfileSettingsList({
  onEditProfile,
  onSignOut,
  isSigningOut = false,
}: ProfileSettingsListProps) {
  return (
    <section className="flex flex-col gap-3">
      <SectionHeader title={PROFILE_COPY.accountSection} />

      <div className="flex flex-col gap-2">
        <ProfileSettingsRow
          title={PROFILE_COPY.editProfile.title}
          subtitle={PROFILE_COPY.editProfile.subtitle}
          icon={UserRound}
          onSelect={onEditProfile}
        />

        <ProfileSettingsRow
          title={PROFILE_COPY.signOut.title}
          subtitle={
            isSigningOut
              ? PROFILE_COPY.signOut.confirming
              : PROFILE_COPY.signOut.subtitle
          }
          icon={LogOut}
          onSelect={onSignOut}
          disabled={isSigningOut}
          destructive
        />
      </div>
    </section>
  );
}
