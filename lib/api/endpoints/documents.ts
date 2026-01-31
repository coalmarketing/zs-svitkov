import { zssFetch } from "../fetcher";

export type DocumentCategory = {
  id: number;
  name: string;
  order: number;
};

export type DocumentItem = {
  id: number;
  name: string;
  url: string; // may be relative
};

export type DocumentsGroup = {
  category: DocumentCategory;
  documents: DocumentItem[];
};

function toAbsoluteUrl(url: string) {
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  const base = process.env.ZSS_BASE_URL ?? "https://testadmin.zssvitkov.cz";
  return `${base}${url.startsWith("/") ? "" : "/"}${url}`;
}

export async function getDocumentsGrouped() {
  const groups = await zssFetch<DocumentsGroup[]>(`/api/documents`, {
    revalidate: 3600,
    tags: ["documents"],
  });

  // Normalize URLs to absolute so your DownloadButton can just use fileUrl
  return groups.map((g) => ({
    ...g,
    documents: g.documents.map((d) => ({ ...d, url: toAbsoluteUrl(d.url) })),
  }));
}

export async function getDocumentCategories() {
  return zssFetch<DocumentCategory[]>(`/api/document-categories`, {
    revalidate: 3600,
    tags: ["document-categories"],
  });
}

export async function getDocumentsByCategory(categoryId: number) {
  const docs = await zssFetch<DocumentItem[]>(
    `/api/documents/by-category/${categoryId}`,
    {
      revalidate: 3600,
      tags: ["documents", `documents:${categoryId}`],
    },
  );

  return docs.map((d) => ({ ...d, url: toAbsoluteUrl(d.url) }));
}
