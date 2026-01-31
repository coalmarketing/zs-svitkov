import { zssFetch } from "../fetcher";

export type ImportantLink = {
  id: number;
  name: string;
  url: string;
  logoUrl: string;
};

export async function getImportantLinks() {
  return zssFetch<ImportantLink[]>(`/api/important-links`, {
    revalidate: 3600,
    tags: ["important-links"],
  });
}
