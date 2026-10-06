const requests = new Map();

export function latestReleaseUrl(id) {
  return `https://github.com/xresloader/${id}/releases/latest`;
}

export function latestRelease(id, { fresh = false } = {}) {
  if (fresh || !requests.has(id) || Date.now() - requests.get(id).started > 60000) {
    const request = (async () => {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 8000);
      try {
        const response = await fetch(
          `https://api.github.com/repos/xresloader/${id}/releases/latest`,
          {
            cache: "no-store",
            signal: controller.signal,
            headers: { Accept: "application/vnd.github+json" },
          },
        );
        if (!response.ok) {
          const error = new Error(`HTTP ${response.status}`);
          error.status = response.status;
          throw error;
        }
        const release = await response.json();
        if (!release || !Array.isArray(release.assets) ||
          typeof release.tag_name !== "string" || !release.tag_name.trim() ||
          release.draft || release.prerelease)
          throw new Error("Invalid release");
        return release;
      } finally {
        clearTimeout(timer);
      }
    })();
    requests.set(id, { request, started: Date.now() });
  }
  return requests.get(id).request;
}

