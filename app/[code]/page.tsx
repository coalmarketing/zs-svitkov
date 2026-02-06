import { notFound } from "next/navigation";
import Link from "next/link";

import Header from "@/components/header";
import Section from "@/components/section";
import { PageHeading } from "@/components/text";
import { Button, DownloadButton } from "@/components/buttons";
import ImageGallery from "@/components/imageGallery";
import DirectorySelect from "@/components/directorySelect";

import { getPage } from "@/lib/api/endpoints/pages";
import { getNewsCategoriesGrouped } from "@/lib/api/endpoints/news";
import { UNIVERSAL_PAGES, slugToApiCode } from "@/lib/webGlobals";

type NewsLabel = { id: number; code: string; name: string };
type NewsSubcategory = {
  id: number;
  code: string;
  name: string;
  labels: NewsLabel[];
};
type NewsCategory = {
  id: number;
  code: string;
  name: string;
  subcategories: NewsSubcategory[];
};

/**
 * If your page slug matches a news category/subcategory code, return that code,
 * otherwise return null. This enables an automatic “Nástěnka” button.
 */
function findNewsCategoryCodeForPageSlug(
  categories: NewsCategory[],
  slug: string,
) {
  for (const cat of categories ?? []) {
    if (cat.code === slug) return cat.code;

    for (const sub of cat.subcategories ?? []) {
      if (sub.code === slug) return sub.code;
    }
  }
  return null;
}

export async function generateStaticParams() {
  // Your UNIVERSAL_PAGES should contain the route slugs you use in /[code]
  return UNIVERSAL_PAGES.map((p) => ({ code: p.code }));
}

export default async function UniversalPageRoute({
  params,
  searchParams,
}: {
  params: Promise<{ code: string }>;
  searchParams: Promise<{ dir?: string }>;
}) {
  const { code } = await params;
  const { dir } = await searchParams;

  const apiCode = slugToApiCode(code);
  if (!apiCode) notFound();

  const [page, newsCats] = await Promise.all([
    getPage(apiCode),
    getNewsCategoriesGrouped(),
  ]);

  const matchedNewsCategoryCode = findNewsCategoryCodeForPageSlug(
    newsCats as NewsCategory[],
    code,
  );

  // Directory filtering: if ?dir=... is present, show ONLY that directory item's content as a single block
  const selectedDir = dir
    ? (page.directory?.find((d) => d.code === dir) ?? null)
    : null;

  const blocksToRender = selectedDir
    ? [{ heading: selectedDir.title, content: selectedDir.content }]
    : (page.blocks ?? []);

  const galleryImages =
    page.images?.map((img, i) => ({
      url: img.url,
      alt: img.alt ?? `${page.title} – obrázek ${i + 1}`,
    })) ?? [];

  return (
    <main className="min-h-screen">
      <Header imageUrl={"/img/headers/home.webp"} />
      <PageHeading>{page.title}</PageHeading>

      <Section pt={"0"} pb={"8rem"}>
        {/* Top buttons */}
        <div className="col-span-8 col-start-3 flex flex-wrap gap-16 justify-center">
          {(page.directory?.length ?? 0) > 0 && (
            <DirectorySelect
              items={page.directory.map((d) => ({
                code: d.code,
                title: d.title,
              }))}
              current={dir}
            />
          )}
          <Button href="/kontakty" className="w-1/3">
            Kontakty
          </Button>

          {matchedNewsCategoryCode && (
            <Button
              href={`/nastenka?page=1&categoryCode=${encodeURIComponent(matchedNewsCategoryCode)}`}
              className="w-1/3"
            >
              Nástěnka
            </Button>
          )}
        </div>

        {/* Directory dropdown: switches page content to ONLY the selected directory item */}

        {/* Optional gallery */}
        {galleryImages.length > 0 && (
          <div className="col-span-8 col-start-3 mb-8">
            <ImageGallery images={galleryImages} />
          </div>
        )}

        {/* Blocks (full or filtered via directory selection) */}
        <div className="col-span-8 col-start-3 flex flex-col gap-4 gap-y-16">
          {blocksToRender.map((b, idx) => (
            <div key={`${b.heading}-${idx}`}>
              <h2 className="text-2xl font-bold mb-3 vertical-line">
                {b.heading}
              </h2>
              <div
                className="prose prose-sm prose-a:text-brand prose-a:underline"
                dangerouslySetInnerHTML={{ __html: b.content }}
              />
            </div>
          ))}
        </div>

        {/* Documents */}
        {(page.documents?.length ?? 0) > 0 && (
          <div className="col-span-8 col-start-3 mt-10 flex flex-col gap-4">
            <h2 className="text-2xl font-bold mb-3 vertical-line">
              Dokumenty ke stažení
            </h2>
            {page.documents.map((doc, idx) => (
              <DownloadButton key={doc.url + " " + idx} fileUrl={doc.url}>
                {doc.name}
              </DownloadButton>
            ))}
          </div>
        )}

        {/* Links */}
        {(page.links?.length ?? 0) > 0 && (
          <div className="col-span-8 col-start-3 mt-10">
            <h2 className="text-2xl font-bold mb-3 vertical-line">Odkazy</h2>
            <ul className="list-disc pl-6">
              {page.links.map((l, idx) => (
                <li key={l.url + " " + idx}>
                  <a
                    className="text-brand underline"
                    href={l.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {l.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Section>
    </main>
  );
}
