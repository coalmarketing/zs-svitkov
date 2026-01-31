import { zssFetch } from "../fetcher";

export type HistoryEvent = {
  id: number;
  year: number;
  text: string;
  imageUrl?: string | null; // may be relative
};

function toAbsoluteUrl(url: string) {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  const base = process.env.ZSS_BASE_URL ?? "https://testadmin.zssvitkov.cz";
  return `${base}${url.startsWith("/") ? "" : "/"}${url}`;
}

export async function getSchoolHistory() {
  const events = await zssFetch<HistoryEvent[]>(`/api/school-history`, {
    revalidate: 3600,
    tags: ["school-history"],
  });

  return events.map((e) => ({
    ...e,
    imageUrl: toAbsoluteUrl(e.imageUrl ?? ""),
  }));
}
