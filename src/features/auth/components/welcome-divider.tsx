import { WELCOME_COPY } from "@/features/auth/constants/welcome-copy";

export function WelcomeDivider() {
  return (
    <div className="flex items-center gap-4 py-1">
      <span className="h-px flex-1 bg-foreground/10" aria-hidden="true" />
      <span className="text-sm text-foreground/45">{WELCOME_COPY.divider}</span>
      <span className="h-px flex-1 bg-foreground/10" aria-hidden="true" />
    </div>
  );
}
