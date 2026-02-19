import Header from "@/components/layout/header";
import Section from "@/components/layout/section";
import { PageHeading } from "@/components/ui/text";
import { DownloadButton } from "@/components/ui/buttons";
import { getDocumentsGrouped } from "@/lib/api/endpoints/documents";
import AccordionSection from "@/components/ui/accordionSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Dokumenty ke stažení | ZŠ Svítkov Pardubice – žádosti, formuláře, informace",
  description:
    "Stáhněte si důležité dokumenty ZŠ Svítkov v Pardubicích. Najdete zde žádosti, formuláře pro rodiče, omluvenky i další informace pro žáky a zákonné zástupce.",
  alternates: { canonical: "/dokumenty" },
};

export default async function DocumentsPage() {
  const groups = await getDocumentsGrouped();

  const sorted = [...groups].sort(
    (a, b) => (a.category.order ?? 9999) - (b.category.order ?? 9999),
  );

  return (
    <main className="min-h-screen pb-20 max-w-screen overflow-x-hidden">
      <Header imageUrl={"/img/headers/dokumenty.webp"} />
      <PageHeading>Dokumenty ke stažení</PageHeading>

      <Section pt="20px">
        {/* Mobile: full width (4-col grid). LG+: centered (8 cols starting at 3) */}
        <div className="col-span-4 lg:col-span-8 lg:col-start-3">
          {/* Mobile: stacked. LG+: 2-column grid like your alternating layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-10 lg:gap-x-12">
            {sorted.map((group, idx) => (
              <AccordionSection
                key={group.category.id}
                label={group.category.name}
                open={idx === 0}
              >
                <div className="flex flex-col gap-3 pl-4 md:pl-0 mb-5">
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
              </AccordionSection>
            ))}
          </div>
        </div>
      </Section>
    </main>
  );
}
