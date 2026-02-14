import { zssFetch } from "../fetcher";

export type PageBlock = {
  heading: string;
  content: string; // HTML
};

export type PageImage = {
  url: string;
  alt?: string;
};

export type PageDirectoryItem = {
  code: string;
  title: string;
  content: string; // HTML
};

export type PageDocument = {
  name: string;
  url: string;
};

export type PageLink = {
  name: string;
  url: string;
};

export type UniversalPage = {
  code: string;
  title: string;
  headerImage: string;
  blocks: PageBlock[];
  images: PageImage[];
  directory: PageDirectoryItem[];
  documents: PageDocument[];
  links: PageLink[];
};

export type PageResponse = {
  images?: PageImage[];
  blocks?: unknown[];
  documents?: unknown[];
  links?: unknown[];
};

export async function getPage(code: string) {
  return zssFetch<UniversalPage>(`/api/page/${encodeURIComponent(code)}`, {
    cache: "no-store",
    tags: [`page:${code}`],
  });
}
