import { NamlyLogotype } from "@/components/brand";
import { WELCOME_COPY } from "@/features/auth/constants/welcome-copy";

export function WelcomeBranding() {
  return (
    <header className="flex flex-col items-center gap-4 text-center">
      <NamlyLogotype width={168} height={52} className="w-[168px]" />

      <div className="flex max-w-xs flex-col gap-2">
        <h1 className="text-xl font-bold leading-snug text-foreground">
          {WELCOME_COPY.headline}
        </h1>
        <p className="text-sm leading-relaxed text-foreground/60">
          {WELCOME_COPY.subline}
        </p>
      </div>
    </header>
  );
}
