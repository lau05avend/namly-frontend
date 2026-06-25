"use client";

import { Input } from "@/components/ui/input";
import { ONBOARDING_COPY } from "@/features/onboarding/constants/onboarding-copy";
import { cn } from "@/lib/utils";
import { PenLine } from "lucide-react";

type OnboardingCustomInputProps = {
  value: string;
  onChange: (value: string) => void;
  density?: "default" | "embedded";
};

export function OnboardingCustomInput({
  value,
  onChange,
  density = "default",
}: OnboardingCustomInputProps) {
  const isEmbedded = density === "embedded";

  return (
    <div className="relative">
      <PenLine
        className={cn(
          "pointer-events-none absolute top-1/2 -translate-y-1/2 text-foreground/35",
          isEmbedded ? "left-2.5 size-3" : "left-4 size-4",
        )}
        aria-hidden
      />
      <Input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={ONBOARDING_COPY.wizard.customPlaceholder}
        className={cn(
          isEmbedded
            ? "h-9 rounded-xl border-foreground/[0.06] bg-foreground/[0.04] pl-8 text-xs placeholder:text-foreground/35 focus-visible:ring-1 focus-visible:ring-primary/25 focus-visible:ring-offset-0"
            : "pl-11",
        )}
      />
    </div>
  );
}
