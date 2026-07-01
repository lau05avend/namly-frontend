"use client";

import { createContext } from "react";
import type { BootstrapUserResponse } from "@/features/profile/types/profile.types";
import type { Session, User } from "@/lib/supabase/types";

export type AuthContextValue = {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isGuest: boolean;
  guestExpiresAt: string | null;
  isRegisteredUser: boolean;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  applyBootstrapResult: (bootstrap: BootstrapUserResponse) => void;
  clearGuestSession: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
