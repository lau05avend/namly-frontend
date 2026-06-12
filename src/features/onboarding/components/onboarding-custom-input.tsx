"use client";

import { Input } from "@/components/ui/input";
import { ONBOARDING_COPY } from "@/features/onboarding/constants/onboarding-copy";
import { PenLine } from "lucide-react";

type OnboardingCustomInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export function OnboardingCustomInput({
  value,
  onChange,
}: OnboardingCustomInputProps) {
  return (
    <div className="relative">
      <PenLine
        className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-foreground/35"
        aria-hidden
      />
      <Input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={ONBOARDING_COPY.wizard.customPlaceholder}
        className="pl-11"
      />
    </div>
  );
}
