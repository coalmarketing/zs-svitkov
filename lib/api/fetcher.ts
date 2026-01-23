import "server-only";

const BASE_URL = process.env.ZSS_BASE_URL!;
const TOKEN = process.env.ZSS_API_TOKEN!;

type FetchOpts = {
  revalidate?: number;
  tags?: string[];
  cache?: RequestCache;
};

export async function zssFetch<T>(
  path: string,
  opts: FetchOpts = {},
): Promise<T> {
  const url = new URL(path, BASE_URL);

  const res = await fetch(url, {
    headers: {
      "X-AUTH-TOKEN": TOKEN,
      Accept: "application/json",
    },
    cache: opts.cache ?? "force-cache",
    next: {
      revalidate: opts.revalidate ?? 60,
      tags: opts.tags,
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API error ${res.status} for ${url.pathname}: ${text}`);
  }

  return res.json() as Promise<T>;
}
