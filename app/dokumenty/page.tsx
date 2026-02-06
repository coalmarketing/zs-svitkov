import Header from "@/components/header";
import Section from "@/components/section";
import { PageHeading } from "@/components/text";
import { DownloadButton } from "@/components/buttons";
import { getDocumentsGrouped } from "@/lib/api/endpoints/documents";

export default async function DocumentsPage() {
  const groups = await getDocumentsGrouped();

  const sorted = [...groups].sort(
    (a, b) => (a.category.order ?? 9999) - (b.category.order ?? 9999),
  );

  return (
    <main className="min-h-screen">
      <Header imageUrl={"/img/headers/home.webp"} />
      <PageHeading>Dokumenty ke stažení</PageHeading>

      <Section pt="20px">
        <div className="col-span-8 col-start-3 gap-x-4 gap-y-16 grid grid-cols-8">
          {sorted.map((group, index) => (
            <section
              key={group.category.id}
              className={
                index % 2 === 0
                  ? "col-start-1 col-span-3"
                  : "col-start-6 col-span-3"
              }
            >
              <h2 className="text-2xl font-bold mb-4 vertical-line p-0">
                {group.category.name}
              </h2>

              <div className="flex flex-col gap-3">
                {group.documents.map((doc) => (
                  <DownloadButton
                    key={doc.id}
                    fileUrl={doc.url}
                    target="_blank"
                  >
                    {doc.name}
                  </DownloadButton>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Section>
    </main>
  );
}
