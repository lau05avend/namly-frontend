import { HOME_COPY } from "@/features/home/constants/home-copy";
import { HOME_SECTION_SURFACES } from "@/features/home/constants/home-hero-surfaces";
import { cn } from "@/lib/utils";
import { CalendarHeart } from "lucide-react";

type HomeUpcomingEmptyCardProps = {
  className?: string;
};

export function HomeUpcomingEmptyCard({ className }: HomeUpcomingEmptyCardProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 px-4 py-3.5",
        HOME_SECTION_SURFACES.upcomingEmpty,
        className,
      )}
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-cta/10 ring-1 ring-cta/15">
        <CalendarHeart
          className="size-4 text-cta"
          strokeWidth={1.75}
          aria-hidden="true"
        />
      </span>
      <div className="min-w-0 flex flex-col gap-1 pt-0.5">
        <p className="text-sm font-semibold leading-snug text-foreground/82">
          {HOME_COPY.sections.upcomingEmptyTitle}
        </p>
        <p className="text-sm leading-snug text-foreground/52">
          {HOME_COPY.sections.upcomingEmptyHint}
        </p>
      </div>
    </div>
  );
}
