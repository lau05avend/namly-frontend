export const STACK_SCREENS = new Set(["/home", "/notifications"]);

export type StackMotionDirection = 1 | -1 | 0;

export function getStackMotionDirection(
  fromPath: string,
  toPath: string,
): StackMotionDirection {
  if (fromPath === "/home" && toPath === "/notifications") {
    return 1;
  }

  if (fromPath === "/notifications" && toPath === "/home") {
    return -1;
  }

  return 0;
}

export const STACK_PAGE_TRANSITION = {
  duration: 0.99,
  ease: [0.26, 1, 0.6, 1] as const,
};
