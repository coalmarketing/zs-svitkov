import { zssFetch } from "../fetcher";

export type ImportantLink = {
  id: number;
  name: string;
  url: string;
  logoUrl: string;
};

export async function getImportantLinks() {
  return zssFetch<ImportantLink[]>("/api/important-links", {
    cache: "no-store",
    tags: ["important-links"],
  });
}
