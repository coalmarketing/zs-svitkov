import { zssFetch } from "../fetcher";

export type PageImage = {
  url: string;
  alt?: string;
};

export type PageResponse = {
  images?: PageImage[];
  blocks?: unknown[];
  documents?: unknown[];
  links?: unknown[];
};

export async function getPage(code: string) {
  return zssFetch<PageResponse>(`/api/page/${code}`, {
    revalidate: 3600,
    tags: [`page:${code}`],
  });
}
