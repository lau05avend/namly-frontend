"use client";

import { useSearchParams } from "next/navigation";
import { WELCOME_COPY } from "@/features/auth/constants/welcome-copy";

export function GuestExpiredNotice() {
  const searchParams = useSearchParams();
  const isExpired = searchParams.get("guest_expired") === "1";

  if (!isExpired) {
    return null;
  }

  return (
    <div
      role="status"
      className="rounded-2xl border border-foreground/10 bg-mint/15 px-4 py-3 text-sm text-foreground/75"
    >
      {WELCOME_COPY.guestExpiredMessage}
    </div>
  );
}
