import { zssFetch } from "../fetcher";

export type MagazineIssue = {
  id: number;
  name: string;
  url: string; // may be relative
  schoolYear: string;
};

function toAbsoluteUrl(url: string) {
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  const base = process.env.ZSS_BASE_URL ?? "https://testadmin.zssvitkov.cz";
  return `${base}${url.startsWith("/") ? "" : "/"}${url}`;
}

export async function getSchoolMagazineYears() {
  return zssFetch<string[]>(`/api/school-magazine/years`, {
    cache: "no-store",
    tags: ["school-magazine-years"],
  });
}

export async function getSchoolMagazine(schoolYear?: string) {
  const qs = schoolYear ? `?schoolYear=${encodeURIComponent(schoolYear)}` : "";
  const issues = await zssFetch<MagazineIssue[]>(`/api/school-magazine${qs}`, {
    cache: "no-store",
    tags: [
      "school-magazine",
      schoolYear ? `school-magazine:${schoolYear}` : "school-magazine:current",
    ],
  });

  return issues.map((i) => ({ ...i, url: toAbsoluteUrl(i.url) }));
}
