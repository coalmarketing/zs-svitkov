import "server-only";

const BASE_URL = process.env.ZSS_BASE_URL;
const TOKEN = process.env.ZSS_API_TOKEN;

if (!BASE_URL) throw new Error("Missing ZSS_BASE_URL");
if (!TOKEN) throw new Error("Missing ZSS_API_TOKEN");

const TOKEN_VALUE = TOKEN as string;

export class ZssHttpError extends Error {
  status: number;
  pathname: string;
  body?: string;

  constructor(status: number, pathname: string, body?: string) {
    super(`API error ${status} for ${pathname}${body ? `: ${body}` : ""}`);
    this.name = "ZssHttpError";
    this.status = status;
    this.pathname = pathname;
    this.body = body;
  }
}

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
    // If you want Next caching, prefer setting cache via opts (or next: { revalidate/tags })
    cache: "no-store",
    ...opts,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new ZssHttpError(res.status, url.pathname, text || undefined);
  }

  return (await res.json()) as T;
}
