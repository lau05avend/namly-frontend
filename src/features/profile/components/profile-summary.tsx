import { ProfileAvatar } from "@/features/profile/components/profile-avatar";
import type { Profile } from "@/features/profile/types/profile.types";

type ProfileSummaryProps = {
  profile: Profile;
};

export function ProfileSummary({ profile }: ProfileSummaryProps) {
  return (
    <section className="flex flex-col items-center gap-3 pt-2 text-center">
      <ProfileAvatar
        displayName={profile.displayName}
        avatarUrl={profile.avatarUrl || undefined}
        size="lg"
      />
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold text-foreground">
          {profile.displayName}
        </h2>
        <p className="text-sm text-foreground/50">{profile.email}</p>
      </div>
    </section>
  );
}
