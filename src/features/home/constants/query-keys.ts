export const homeQueryKeys = {
  all: ["home"] as const,
  summary: (date?: string) => [...homeQueryKeys.all, "summary", date ?? "today"] as const,
};
