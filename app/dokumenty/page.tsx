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

      <Section>
        <div className="flex flex-col gap-10">
          {sorted.map((group) => (
            <section key={group.category.id}>
              <h2 className="text-2xl font-bold mb-4 pl-3 border-l-2 border-black">
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
