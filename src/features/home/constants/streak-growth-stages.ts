import {
  Apple,
  Cherry,
  Leaf,
  Sparkles,
  Sprout,
  type LucideIcon,
} from "lucide-react";

export type StreakGrowthStageId = 1 | 2 | 3 | 4 | 5;

export type StreakGrowthStage = {
  id: StreakGrowthStageId;
  label: string;
  Icon: LucideIcon;
  accentIcon?: LucideIcon;
  iconContainerClass: string;
  iconClass: string;
  labelClass: string;
};

export const STREAK_GROWTH_STAGES: readonly StreakGrowthStage[] = [
  {
    id: 1,
    label: "Comenzando",
    Icon: Sprout,
    iconContainerClass: "bg-highlight/25 ring-1 ring-highlight/40",
    iconClass: "text-foreground/70",
    labelClass: "text-foreground/70",
  },
  {
    id: 2,
    label: "Creciendo",
    Icon: Leaf,
    iconContainerClass: "bg-highlight/30 ring-1 ring-highlight/45",
    iconClass: "text-foreground/75",
    labelClass: "text-foreground/75",
  },
  {
    id: 3,
    label: "Tomando forma",
    Icon: Apple,
    iconContainerClass: "bg-highlight/35 ring-1 ring-highlight/50",
    iconClass: "text-foreground/80",
    labelClass: "text-foreground/80",
  },
  {
    id: 4,
    label: "En su punto",
    Icon: Cherry,
    iconContainerClass: "bg-highlight/30 ring-1 ring-highlight/45",
    iconClass: "text-foreground/75",
    labelClass: "text-foreground/75",
  },
  {
    id: 5,
    label: "Radiante",
    Icon: Cherry,
    accentIcon: Sparkles,
    iconContainerClass: "bg-highlight/35 ring-1 ring-highlight/50",
    iconClass: "text-foreground/80",
    labelClass: "text-foreground/80",
  },
] as const;

export function getStreakGrowthStage(
  stageId: StreakGrowthStageId,
): StreakGrowthStage {
  return (
    STREAK_GROWTH_STAGES.find((stage) => stage.id === stageId) ??
    STREAK_GROWTH_STAGES[0]
  );
}
