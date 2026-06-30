const META_SEPARATOR = /[·•|/]/;

export function getRecommendationHighlightTags(
  meta: string,
  maxTags = 3,
): string[] {
  return meta
    .split(META_SEPARATOR)
    .map((tag) => tag.trim())
    .filter(Boolean)
    .slice(0, maxTags);
}

export function formatRecommendationTagLine(meta: string, maxTags = 3): string {
  return getRecommendationHighlightTags(meta, maxTags).join(" · ");
}
