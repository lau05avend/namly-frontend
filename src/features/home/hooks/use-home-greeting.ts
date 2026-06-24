"use client";

import { useEffect, useMemo } from "react";
import { HOME_COPY } from "@/features/home/constants/home-copy";
import {
  hasVisitedHome,
  markHomeVisited,
} from "@/features/home/utils/home-greeting-storage";
import { useUserDisplayName } from "@/features/profile/hooks/use-user-display-name";
import { useAuth } from "@/hooks/use-auth";

export function useHomeGreeting(): string {
  const { user } = useAuth();
  const displayName = useUserDisplayName();
  const userId = user?.id;

  const isReturningUser = useMemo(() => {
    if (!userId) {
      return false;
    }

    return hasVisitedHome(userId);
  }, [userId]);

  useEffect(() => {
    if (!userId || hasVisitedHome(userId)) {
      return;
    }

    markHomeVisited(userId);
  }, [userId]);

  return useMemo(
    () => HOME_COPY.greeting({ displayName, isReturningUser }),
    [displayName, isReturningUser],
  );
}
