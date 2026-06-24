export const rhythmQueryKeys = {
  all: ["rhythm"] as const,
  summary: () => [...rhythmQueryKeys.all, "summary"] as const,
};
