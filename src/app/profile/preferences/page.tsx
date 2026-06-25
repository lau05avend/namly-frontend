import { OnboardingPreferencesScreen } from "@/features/profile/components/onboarding-preferences-screen";
import { PROFILE_COPY } from "@/features/profile/constants/profile-copy";

export const metadata = {
  title: PROFILE_COPY.preferences.title,
};

export default function OnboardingPreferencesPage() {
  return <OnboardingPreferencesScreen />;
}
