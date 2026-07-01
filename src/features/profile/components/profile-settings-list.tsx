"use client";

import { ProfileSettingsGroup } from "@/features/profile/components/profile-settings-group";
import { ProfileSettingsRow } from "@/features/profile/components/profile-settings-row";
import { PROFILE_COPY } from "@/features/profile/constants/profile-copy";
import {
  Languages,
  LayoutList,
  LogOut,
  Palette,
  Ruler,
  ShieldAlert,
  UserRound,
} from "lucide-react";

type ProfileSettingsListProps = {
  onEditProfile: () => void;
  onEditPreferences: () => void;
  onManageMealTypes: () => void;
  onSignOut: () => void;
  isSigningOut?: boolean;
  showMealTypesManagement?: boolean;
};

export function ProfileSettingsList({
  onEditProfile,
  onEditPreferences,
  onManageMealTypes,
  onSignOut,
  isSigningOut = false,
  showMealTypesManagement = true,
}: ProfileSettingsListProps) {
  return (
    <div className="flex flex-col gap-5">
      <ProfileSettingsGroup title={PROFILE_COPY.sections.account}>
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
          isLast
        />
      </ProfileSettingsGroup>

      <ProfileSettingsGroup title={PROFILE_COPY.sections.personalPreferences}>
        <ProfileSettingsRow
          title={PROFILE_COPY.allergies.title}
          subtitle={PROFILE_COPY.allergies.subtitle}
          icon={ShieldAlert}
          onSelect={onEditPreferences}
          isLast
        />
      </ProfileSettingsGroup>

      {showMealTypesManagement ? (
        <ProfileSettingsGroup title={PROFILE_COPY.sections.mealTypes}>
          <ProfileSettingsRow
            title={PROFILE_COPY.mealTypes.title}
            subtitle={PROFILE_COPY.mealTypes.subtitle}
            icon={LayoutList}
            onSelect={onManageMealTypes}
            isLast
          />
        </ProfileSettingsGroup>
      ) : null}

      <ProfileSettingsGroup title={PROFILE_COPY.sections.appPreferences}>
        <ProfileSettingsRow
          title={PROFILE_COPY.units.title}
          icon={Ruler}
          valueLabel={PROFILE_COPY.units.value}
        />
        <ProfileSettingsRow
          title={PROFILE_COPY.language.title}
          icon={Languages}
          valueLabel={PROFILE_COPY.language.value}
        />
        <ProfileSettingsRow
          title={PROFILE_COPY.theme.title}
          icon={Palette}
          valueLabel={PROFILE_COPY.theme.value}
          isLast
        />
      </ProfileSettingsGroup>
    </div>
  );
}
