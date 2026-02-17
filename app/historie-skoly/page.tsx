import Header from "@/components/header";
import Section from "@/components/section";
import { PageHeading } from "@/components/text";
import { getSchoolHistory } from "@/lib/api/endpoints/history";
import HistoryTimelineClient from "./galleryClient";
import { DownloadButton } from "@/components/buttons";

export default async function HistoryPage() {
  const events = await getSchoolHistory();
  const sorted = [...events].sort((a, b) => a.year - b.year);

  return (
    <main className="min-h-screen pb-20 max-w-screen overflow-x-hidden">
      <Header imageUrl={"/img/headers/home.webp"} />
      <PageHeading>Historie školy</PageHeading>

      <Section>
        <div className="flex justify-start col-span-12 md:hidden flex-col gap-4 mb-20">
          <DownloadButton
            fileUrl={"/documents/history/svitkov_history.pdf"}
            target="_blank"
          >
            Dokument ke stažení
          </DownloadButton>
        </div>

        {sorted.length === 0 ? (
          <div className="col-span-8 col-start-3 text-center text-xl font-bold space-grotesk">
            Historie zatím není k dispozici.
          </div>
        ) : (
          <HistoryTimelineClient events={sorted} />
        )}

        <div className="hidden col-span-5 col-start-5 md:flex flex-col gap-4 pl-6 mb-20">
          <h2 className="text-2xl font-bold mb-3">Dokumenty ke stažení</h2>

          <DownloadButton
            fileUrl={"/documents/history/svitkov_history.pdf"}
            target="_blank"
          >
            Dokument ke stažení
          </DownloadButton>
        </div>
      </Section>
    </main>
  );
}
