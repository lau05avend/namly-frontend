import { SectionHeader } from "@/components/ui/section-header";
import { PROFILE_SURFACES } from "@/features/profile/constants/profile-surfaces";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type ProfileSettingsGroupProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

export function ProfileSettingsGroup({
  title,
  children,
  className,
}: ProfileSettingsGroupProps) {
  return (
    <section className={cn("flex flex-col gap-2.5", className)}>
      <SectionHeader title={title} className="text-primary/60" />

      <div className={PROFILE_SURFACES.settingsCard}>{children}</div>
    </section>
  );
}
