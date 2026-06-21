export const RECIPES_VIEW_TRANSITION = {
  duration: 0.42,
  ease: [0.32, 0.72, 0, 1] as const,
};

export const RECIPES_VIEW_SLIDE = 36;

export const RECIPES_VIEW_SPRING = {
  type: "spring" as const,
  stiffness: 280,
  damping: 32,
  mass: 0.85,
};
