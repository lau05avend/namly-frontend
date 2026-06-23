export const measurementUnitQueryKeys = {
  all: ["measurement-units"] as const,
  list: () => [...measurementUnitQueryKeys.all, "list"] as const,
};
