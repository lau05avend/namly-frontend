import { RHYTHM_SURFACES } from "@/features/rhythm/constants/rhythm-surfaces";
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
    // <div
    //   className={cn(
    //     "flex flex-col gap-3 px-4 py-3.5",
    //     RHYTHM_SURFACES.nestedCard,
    //     className,
    //   )}
    //   aria-label="Distribución por momento del día"
    // >
    //   {distribution.map((slot) => {
    //     const colors = RHYTHM_TIME_SLOT_DOT_COLORS[slot.slot];

    //     return (
    //       <div
    //         key={slot.slot}
    //         className="grid grid-cols-[5.25rem_1fr] items-center gap-3"
    //       >
    //         <span className="text-xs text-foreground/50">{slot.label}</span>
    //         <span className="flex items-center gap-1.5" aria-hidden>
    //           {Array.from({ length: slot.maxLevel }, (_, index) => (
    //             <span
    //               key={index}
    //               className={cn(
    //                 "size-2 rounded-full",
    //                 index < slot.level ? colors.active : colors.inactive,
    //               )}
    //             />
    //           ))}
    //         </span>
    //       </div>
    //     );
    //   })}
    // </div>
    <div></div>
  );
}
