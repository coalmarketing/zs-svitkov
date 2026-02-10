import "server-only";

const BASE_URL = process.env.ZSS_BASE_URL;
const TOKEN = process.env.ZSS_API_TOKEN;

if (!BASE_URL) throw new Error("Missing ZSS_BASE_URL");
if (!TOKEN) throw new Error("Missing ZSS_API_TOKEN");

const TOKEN_VALUE = TOKEN as string;

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

  const res = await fetch(url.toString(), {
    headers: {
      "X-AUTH-TOKEN": TOKEN_VALUE,
      Accept: "application/json",
    },
    cache: "no-store",
    ...opts,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API error ${res.status} for ${url.pathname}: ${text}`);
  }

  return res.json() as Promise<T>;
}
