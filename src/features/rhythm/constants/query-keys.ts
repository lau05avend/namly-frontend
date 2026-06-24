export const rhythmQueryKeys = {
  all: ["rhythm"] as const,
  analytics: (weekStart: string) =>
    [...rhythmQueryKeys.all, "analytics", weekStart] as const,
};
