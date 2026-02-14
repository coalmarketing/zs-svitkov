import { zssFetch } from "../fetcher";

export type SchoolPartner = {
  id: number;
  name: string;
  url: string;
  logoUrl: string;
};

export async function getSchoolPartners() {
  return zssFetch<SchoolPartner[]>("/api/school-partners", {
    cache: "no-store",
    tags: ["school-partners"],
  });
}
