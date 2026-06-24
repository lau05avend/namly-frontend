import { RHYTHM_TIME_SLOT_DOT_COLORS } from "@/features/rhythm/constants/rhythm-theme";
import type { RhythmTimeSlotDistribution } from "@/features/rhythm/types/rhythm.types";
import { cn } from "@/lib/utils";

type RhythmTimeSlotDistributionProps = {
  distribution: RhythmTimeSlotDistribution[];
  className?: string;
};

export function RhythmTimeSlotDistributionView({
  distribution,
  className,
}: RhythmTimeSlotDistributionProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2.5 rounded-2xl border border-foreground/6 bg-card px-3.5 py-3.5",
        className,
      )}
      aria-label="Distribución por momento del día"
    >
      {distribution.map((slot) => {
        const colors = RHYTHM_TIME_SLOT_DOT_COLORS[slot.slot];

        return (
          <div
            key={slot.slot}
            className="grid grid-cols-[5.5rem_1fr] items-center gap-3"
          >
            <span className="text-xs text-foreground/55">{slot.label}</span>
            <span className="flex items-center gap-1" aria-hidden>
              {Array.from({ length: slot.maxLevel }, (_, index) => (
                <span
                  key={index}
                  className={cn(
                    "size-1.5 rounded-full",
                    index < slot.level ? colors.active : colors.inactive,
                  )}
                />
              ))}
            </span>
          </div>
        );
      })}
    </div>
  );
}
