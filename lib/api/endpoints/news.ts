import { zssFetch } from "../fetcher";

/** Shared */
export type ApiImage = {
  url: string;
  alt?: string;
};

export type ApiDocument = {
  name: string;
  url: string;
};

/** Categories / labels */
export type NewsLabel = {
  id: number;
  code: string;
  name: string;
};

export type NewsSubcategory = {
  id: number;
  code: string;
  name: string;
  labels: NewsLabel[];
};

export type NewsCategory = {
  id: number;
  code: string;
  name: string;
  subcategories: NewsSubcategory[];
};

/** News items */
export type NewsCategoryRef = {
  id: number;
  code: string;
  name: string;
};

export type NewsItem = {
  id: number;
  slug: string;
  title: string; // API uses `name` (not title)
  date: string; // keep as string unless API guarantees ISO
  perex?: string | null; // optional if exists
  content: string; // HTML string

  category: NewsCategoryRef; // level 1
  subcategory?: NewsCategoryRef | null; // level 2

  labels: NewsLabel[];

  images: ApiImage[];
  documents: ApiDocument[];
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type NewsListResponse = {
  items: NewsItem[];
  pagination: Pagination;
};

/** Query */
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

/** Endpoints */
export async function getNews(query: NewsQuery = {}) {
  return zssFetch<NewsListResponse>(`/api/news${qs(query)}`, {
    revalidate: 60,
    tags: ["news-list"],
  });
}

export async function getNewsDetail(slug: string) {
  return zssFetch<NewsItem>(`/api/news/${encodeURIComponent(slug)}`, {
    revalidate: 300,
    tags: ["news-detail", `news:${slug}`],
  });
}

export async function getNewsCategoriesGrouped() {
  return zssFetch<NewsCategory[]>(`/api/news-categories/grouped`, {
    revalidate: 3600,
    tags: ["news-categories"],
  });
}
