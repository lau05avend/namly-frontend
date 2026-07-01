import { NamlyLogotype } from "@/components/brand";
import { NotificationsBell } from "@/features/notifications/components/notifications-bell";
import { cn } from "@/lib/utils";

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
        <NotificationsBell className="justify-self-end" />
      </div>
      <h1 className="text-xl font-bold leading-snug text-foreground">
        {greeting}
      </h1>
    </header>
  );
}
