"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";
import { AuthContext, type AuthContextValue } from "@/contexts/auth-context";
import type { BootstrapUserResponse } from "@/features/profile/types/profile.types";
import { bootstrapUser } from "@/features/profile/services/profile.service";
import {
  signInWithGoogleOAuth,
  signOutSession,
} from "@/lib/api/auth";
import {
  clearGuestSessionState,
  loadGuestSessionState,
  saveGuestSessionState,
} from "@/lib/auth/guest-session";
import { getOrCreateDeviceId } from "@/lib/auth/device-id";
import {
  getGoogleSignInErrorMessage,
  logManualLinkingSetupHint,
} from "@/lib/auth/guest-mode";
import type { Session, User } from "@/lib/supabase/types";
import { supabase } from "@/lib/supabase/client";

type AuthProviderProps = {
  children: ReactNode;
};

function applySession(
  session: Session | null,
  setSession: (session: Session | null) => void,
  setUser: (user: User | null) => void,
) {
  setSession(session);
  setUser(session?.user ?? null);
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);
  const [guestExpiresAt, setGuestExpiresAt] = useState<string | null>(null);

  const applyBootstrapResult = useCallback((bootstrap: BootstrapUserResponse) => {
    setIsGuest(bootstrap.isGuest);
    setGuestExpiresAt(bootstrap.guestExpiresAt);
    saveGuestSessionState({
      isGuest: bootstrap.isGuest,
      guestExpiresAt: bootstrap.guestExpiresAt,
    });
  }, []);

  const clearGuestSession = useCallback(() => {
    setIsGuest(false);
    setGuestExpiresAt(null);
    clearGuestSessionState();
  }, []);

  const syncGuestSessionFromApi = useCallback(async () => {
    try {
      const bootstrap = await bootstrapUser({
        deviceId: getOrCreateDeviceId(),
      });
      applyBootstrapResult(bootstrap);
    } catch {
      const stored = loadGuestSessionState();
      if (stored) {
        setIsGuest(stored.isGuest);
        setGuestExpiresAt(stored.guestExpiresAt);
      }
    }
  }, [applyBootstrapResult]);

  useEffect(() => {
    let isMounted = true;

    const initializeSession = async () => {
      const {
        data: { session: initialSession },
      } = await supabase.auth.getSession();

      if (!isMounted) {
        return;
      }

      applySession(initialSession, setSession, setUser);

      if (initialSession) {
        await syncGuestSessionFromApi();
      } else {
        clearGuestSession();
      }

      if (isMounted) {
        setLoading(false);
      }
    };

    void initializeSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, nextSession) => {
      if (
        event !== "INITIAL_SESSION" &&
        event !== "SIGNED_IN" &&
        event !== "SIGNED_OUT" &&
        event !== "TOKEN_REFRESHED" &&
        event !== "USER_UPDATED"
      ) {
        return;
      }

      applySession(nextSession, setSession, setUser);

      if (nextSession) {
        void syncGuestSessionFromApi();
      } else {
        clearGuestSession();
      }

      setLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [clearGuestSession, syncGuestSessionFromApi]);

  const signInWithGoogle = useCallback(async () => {
    try {
      await signInWithGoogleOAuth();
    } catch (error) {
      logManualLinkingSetupHint(error);
      console.error("[auth] signInWithGoogle failed", error);
      toast.error(getGoogleSignInErrorMessage(error));
      throw error;
    }
  }, []);

  const signOut = useCallback(async () => {
    clearGuestSession();
    await signOutSession();
  }, [clearGuestSession]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      session,
      isAuthenticated: session !== null,
      isGuest,
      guestExpiresAt,
      isRegisteredUser: session !== null && !isGuest,
      loading,
      signInWithGoogle,
      signOut,
      applyBootstrapResult,
      clearGuestSession,
    }),
    [
      user,
      session,
      isGuest,
      guestExpiresAt,
      loading,
      signInWithGoogle,
      signOut,
      applyBootstrapResult,
      clearGuestSession,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
