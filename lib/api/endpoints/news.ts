import { zssFetch } from "../fetcher";

export type NewsQuery = {
  page?: number;
  limit?: number;
  categoryId?: number;
  categoryCode?: string;
  labelId?: number;
  labelCode?: string;
};

function qs(params: Record<string, string | number | undefined>) {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== "") sp.set(k, String(v));
  }
  const s = sp.toString();
  return s ? `?${s}` : "";
}

export async function getNews(query: NewsQuery = {}) {
  return zssFetch<{
    items: any[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }>(`/api/news${qs(query)}`, { revalidate: 60, tags: ["news-list"] });
}

export async function getNewsDetail(slug: string) {
  return zssFetch<any>(`/api/news/${encodeURIComponent(slug)}`, {
    revalidate: 300,
    tags: ["news-detail", `news:${slug}`],
  });
}

export async function getNewsCategoriesGrouped() {
  return zssFetch<any>(`/api/news-categories/grouped`, {
    revalidate: 3600,
    tags: ["news-categories"],
  });
}
