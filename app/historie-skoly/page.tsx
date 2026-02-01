import Header from "@/components/header";
import Section from "@/components/section";
import { PageHeading } from "@/components/text";
import { getSchoolHistory } from "@/lib/api/endpoints/history";
import HistoryTimelineClient from "./galleryClient";

export default async function HistoryPage() {
  const events = await getSchoolHistory();
  const sorted = [...events].sort((a, b) => a.year - b.year);

  return (
    <main className="min-h-screen">
      <Header imageUrl={"/img/headers/home.webp"} />
      <PageHeading>Historie školy</PageHeading>

      <Section>
        {sorted.length === 0 ? (
          <div className="rounded-md border p-4">
            Historie zatím není k dispozici.
          </div>
        ) : (
          <HistoryTimelineClient events={sorted} />
        )}
      </Section>
    </main>
  );
}
