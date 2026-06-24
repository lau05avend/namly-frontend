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
    iconContainerClass: "bg-cta/5 ring-1 ring-cta/15",
    iconClass: "text-cta",
    labelClass: "text-cta/85",
  },
  {
    id: 2,
    label: "Creciendo",
    Icon: Leaf,
    iconContainerClass: "bg-cta/5 ring-1 ring-cta/20",
    iconClass: "text-cta",
    labelClass: "text-cta",
  },
  {
    id: 3,
    label: "Tomando forma",
    Icon: Apple,
    iconContainerClass: "bg-cta/5 ring-1 ring-cta/25",
    iconClass: "text-cta",
    labelClass: "text-cta/85",
  },
  {
    id: 4,
    label: "En su punto",
    Icon: Cherry,
    iconContainerClass: "bg-cta/5 ring-1 ring-cta/15",
    iconClass: "text-cta",
    labelClass: "text-cta/85",
  },
  {
    id: 5,
    label: "Radiante",
    Icon: Cherry,
    accentIcon: Sparkles,
    iconContainerClass: "bg-cta/5 ring-1 ring-cta/20",
    iconClass: "text-cta",
    labelClass: "text-cta/85",
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
