import { NamlyLogotype } from "@/components/brand";
import { cn } from "@/lib/utils";
import { Bell } from "lucide-react";
import { HOME_COPY } from "@/features/home/constants/home-copy";

type HomeHeaderProps = {
  displayDate: string;
  greeting: string;
  className?: string;
};

export function HomeHeader({
  displayDate,
  greeting,
  className,
}: HomeHeaderProps) {
  return (
    <header className={cn("flex flex-col gap-5 pt-safe", className)}>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        <NamlyLogotype width={72} height={24} className="w-[72px] justify-self-start" />
        <p className="text-sm font-medium text-foreground/50">{displayDate}</p>
        <button
          type="button"
          aria-label={HOME_COPY.notifications}
          className="flex size-10 cursor-pointer items-center justify-center justify-self-end rounded-full bg-card text-foreground/60 transition-colors hover:bg-mint/50"
        >
          <Bell className="size-5" aria-hidden="true" />
        </button>
      </div>
      <h1 className="text-2xl font-bold leading-snug text-foreground">
        {greeting}
      </h1>
    </header>
  );
}
