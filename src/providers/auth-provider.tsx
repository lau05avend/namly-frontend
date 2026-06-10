"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { AuthContext, type AuthContextValue } from "@/contexts/auth-context";
import { signInWithGoogleOAuth, signOutSession } from "@/lib/api/auth";
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
      setLoading(false);
    };

    void initializeSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, nextSession) => {
      if (
        event !== "INITIAL_SESSION" &&
        event !== "SIGNED_IN" &&
        event !== "SIGNED_OUT" &&
        event !== "TOKEN_REFRESHED"
      ) {
        return;
      }

      applySession(nextSession, setSession, setUser);
      setLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signInWithGoogle = useCallback(async () => {
    await signInWithGoogleOAuth();
  }, []);

  const signOut = useCallback(async () => {
    await signOutSession();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      session,
      isAuthenticated: session !== null,
      loading,
      signInWithGoogle,
      signOut,
    }),
    [user, session, loading, signInWithGoogle, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
