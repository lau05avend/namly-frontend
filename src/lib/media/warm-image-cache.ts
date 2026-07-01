/**
 * Starts browser image downloads ahead of render so cached bytes are ready
 * when <img> mounts (public URLs and already-resolved signed URLs).
 */
export function warmImageCache(urls: Iterable<string>): void {
  const seen = new Set<string>();

  for (const url of urls) {
    const trimmed = url.trim();
    if (!trimmed || seen.has(trimmed)) {
      continue;
    }

    seen.add(trimmed);
    const image = new Image();
    image.decoding = "async";
    image.src = trimmed;
  }
}
