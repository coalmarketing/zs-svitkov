import { notFound } from "next/navigation";

import Header from "@/components/layout/header";
import Section from "@/components/layout/section";
import { PageHeading } from "@/components/ui/text";
import { Button, DownloadButton } from "@/components/ui/buttons";
import ImageGallery from "@/components/imageGallery";
import DirectorySelect from "@/app/[code]/directorySelect";

import { getPage } from "@/lib/api/endpoints/pages";
import { getNewsCategoriesGrouped } from "@/lib/api/endpoints/news";
import { UNIVERSAL_PAGES, slugToApiCode } from "@/lib/webGlobals";

import { ZssHttpError } from "@/lib/api/fetcher";

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

  let page: Awaited<ReturnType<typeof getPage>>;
  let newsCats: Awaited<ReturnType<typeof getNewsCategoriesGrouped>>;

  try {
    [page, newsCats] = await Promise.all([
      getPage(apiCode),
      getNewsCategoriesGrouped(),
    ]);
  } catch (e) {
    if (e instanceof ZssHttpError && e.status === 404) {
      notFound();
    }
    throw e; // keep other errors as 500s
  }

  const matchedNewsCategoryCode = findNewsCategoryCodeForPageSlug(
    newsCats as NewsCategory[],
    code,
  );

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
    <main className="min-h-screen pb-20 max-w-screen overflow-x-hidden">
      <Header
        imageUrl={
          page.headerImage ? page.headerImage : "/img/headers/home.webp"
        }
      />
      <PageHeading>{page.title}</PageHeading>

      <Section pt={"0"} pb={"8rem"}>
        <div className="col-span-12 col-start-1 lg:col-span-8 lg:col-start-3 grid grid-cols-4 gap-4 lg:flex lg:flex-wrap lg:gap-16 lg:justify-center">
          {(page.directory?.length ?? 0) > 0 && (
            <DirectorySelect
              items={page.directory.map((d) => ({
                code: d.code,
                title: d.title,
              }))}
              current={dir}
            />
          )}

          <Button
            href="/kontakty"
            className={`w-full lg:w-1/3 ${matchedNewsCategoryCode ? "col-span-2" : "col-span-4"}`}
          >
            Kontakty
          </Button>

          {matchedNewsCategoryCode && (
            <Button
              href={`/nastenka?page=1&categoryCode=${encodeURIComponent(
                matchedNewsCategoryCode,
              )}`}
              className="w-full col-span-2 lg:w-1/3"
            >
              Nástěnka
            </Button>
          )}
        </div>

        {galleryImages.length > 0 && (
          <div className="col-span-4 lg:col-span-8 lg:col-start-3 mt-8">
            <ImageGallery images={galleryImages} />
          </div>
        )}

        <div className="col-span-12 lg:col-span-8 lg:col-start-3 flex flex-col gap-4 gap-y-16 mt-12">
          {blocksToRender.map((b, idx) => (
            <div key={`${b.heading}-${idx}`}>
              <h2 className="text-2xl font-bold mb-3 vertical-line ml-4 md:ml-0">
                {b.heading}
              </h2>
              <div
                className="prose prose-sm prose-a:text-brand prose-a:underline w-full"
                dangerouslySetInnerHTML={{ __html: b.content }}
              />
            </div>
          ))}
        </div>

        {(page.documents?.length ?? 0) > 0 && (
          <div className="col-span-4 lg:col-span-8 lg:col-start-3 mt-10 flex flex-col gap-4">
            <h2 className="text-2xl font-bold mb-3 vertical-line ml-4 md:ml-0">
              Dokumenty ke stažení
            </h2>
            {page.documents.map((doc, idx) => (
              <DownloadButton key={doc.url + " " + idx} fileUrl={doc.url}>
                {doc.name}
              </DownloadButton>
            ))}
          </div>
        )}

        {/* {(page.links?.length ?? 0) > 0 && (
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
        )} */}
      </Section>
    </main>
  );
}
