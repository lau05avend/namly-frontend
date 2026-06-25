"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { ProfileLoading } from "@/features/profile/components/profile-loading";
import { ProfileSettingsList } from "@/features/profile/components/profile-settings-list";
import { ProfileSummary } from "@/features/profile/components/profile-summary";
import { PROFILE_COPY } from "@/features/profile/constants/profile-copy";
import { useProfile } from "@/features/profile/queries/use-profile";
import { useAuth } from "@/hooks/use-auth";

export function ProfileScreen() {
  const router = useRouter();
  const { signOut } = useAuth();
  const { data: profile, isPending, isError, refetch } = useProfile();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    if (isSigningOut) {
      return;
    }

    setIsSigningOut(true);

    try {
      await signOut();
    } catch (error) {
      console.error("[profile] signOut failed", error);
      setIsSigningOut(false);
    }
  };

  return (
    <div className="relative min-h-dvh bg-background pb-28">
      <main className="mx-auto flex w-full max-w-lg flex-col gap-6 px-4 pt-safe">
        <header>
          <h1 className="text-center text-lg font-bold text-foreground">
            {PROFILE_COPY.title}
          </h1>
        </header>

        {isPending ? <ProfileLoading /> : null}

        {isError ? (
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <p className="text-sm text-foreground/60">
              {PROFILE_COPY.loadError}
            </p>
            <button
              type="button"
              onClick={() => void refetch()}
              className="cursor-pointer text-sm font-semibold text-primary underline-offset-2 hover:underline"
            >
              Reintentar
            </button>
          </div>
        ) : null}

        {profile ? (
          <>
            <ProfileSummary profile={profile} />
            <ProfileSettingsList
              onEditProfile={() => router.push("/profile/edit")}
              onEditPreferences={() => router.push("/profile/preferences")}
              onSignOut={() => void handleSignOut()}
              isSigningOut={isSigningOut}
            />
          </>
        ) : null}
      </main>

      <BottomNav activeId="profile" />
    </div>
  );
}
