import Header from "@/components/layout/header";
import Section from "@/components/layout/section";
import { PageHeading } from "@/components/ui/text";
import ArticleBlock from "@/app/nastenka/articleBlock";
import NewsFilters from "@/app/nastenka/newsFilters";
import { DownloadButton } from "@/components/ui/buttons";

import {
  getNews,
  getNewsCategoriesGrouped,
  getNewsDetail,
  type NewsItem,
} from "@/lib/api/endpoints/news";

import GalleryClient from "./galleryClient";
import Pagination from "@/components/ui/pagination";
import ImageGallery from "@/components/imageGallery";

export function buildOpenHref(params: {
  page?: string;
  categoryCode?: string;
  labelCode?: string;
  open?: string;
}) {
  const sp = new URLSearchParams();
  if (params.page) sp.set("page", params.page);
  if (params.categoryCode) sp.set("categoryCode", params.categoryCode);
  if (params.labelCode) sp.set("labelCode", params.labelCode);
  if (params.open) sp.set("open", params.open);
  return `/nastenka?${sp.toString()}`;
}

const PinnedArticle = ({
  item,
  baseParams,
}: {
  item: NewsItem;
  baseParams: {
    page?: string;
    categoryCode?: string;
    labelCode?: string;
    open?: string;
  };
}) => {
  const images = (item.images ?? []).slice(0, 4).map((img, idx) => ({
    url: img.url,
    alt: img.alt ?? `${item.title} – obrázek ${idx + 1}`,
  }));

  const closeHref = buildOpenHref({
    page: baseParams.page ?? "1",
    categoryCode: baseParams.categoryCode,
    labelCode: baseParams.labelCode,
    open: "",
  });

  return (
    <>
      <div id="pin" className="mb-10 border-b border-black/10">
        <ArticleBlock
          title={item.title}
          href={closeHref}
          date={item.date}
          labels={item.labels}
          hasImage={item.images?.length > 0}
          hasAttachment={item.documents?.length > 0}
          expanded
        >
          <div dangerouslySetInnerHTML={{ __html: item.content }} />

          {/* Attachments */}
          {item.documents?.length > 0 && (
            <div className="my-6 flex flex-col gap-3">
              {item.documents.map((doc) => (
                <DownloadButton
                  key={doc.url}
                  fileUrl={doc.url}
                  target="_blank"
                  download
                >
                  {doc.name}
                </DownloadButton>
              ))}
            </div>
          )}

          {/* Images */}
          {images.length > 0 && (
            <>
              <div className="hidden lg:block">
                <GalleryClient images={images} />
              </div>
              <div className="lg:hidden my-4">
                <ImageGallery
                  images={images}
                  showThumbnails={false}
                  aspectClassName="aspect-square"
                />
              </div>
            </>
          )}
        </ArticleBlock>

        <div className="flex items-center justify-between pt-4 pb-10">
          <a
            className="text-xs font-semibold underline underline-offset-4 py-1 text-brand hover:text-brand-dark transition-colors"
            href={closeHref}
          >
            ✕ Skrýt aktualitu
          </a>
        </div>
      </div>
    </>
  );
};

const NoticeboardPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    categoryCode?: string;
    labelCode?: string;
    open?: string;
  }>;
}) => {
  const params = await searchParams;
  const page = Number(params.page ?? "1");

  const [cats, news, opened] = await Promise.all([
    getNewsCategoriesGrouped(),
    getNews({
      page,
      limit: 10,
      categoryCode: params.categoryCode,
      labelCode: params.labelCode,
    }),
    params.open
      ? getNewsDetail(params.open).catch(() => null)
      : Promise.resolve(null),
  ]);

  const items = opened
    ? news.items.filter((i) => i.slug !== opened.slug)
    : news.items;

  const totalPages = news.pagination.totalPages;

  return (
    <main className="min-h-screen pb-20 max-w-screen overflow-x-hidden">
      <Header imageUrl={"/img/headers/nastenka.webp"} />
      <PageHeading>Nástěnka</PageHeading>
      <Section pt="0" pb="0">
        <NewsFilters
          categories={cats}
          currentCategoryCode={params.categoryCode}
          currentLabelCode={params.labelCode}
        />
      </Section>

      <Section>
        {/* Pinned opened article */}
        {opened && (
          <div className="col-span-12 lg:col-span-10 lg:col-start-3">
            <PinnedArticle item={opened} baseParams={params} />
          </div>
        )}

        {/* List */}
        <div className="col-span-12 lg:col-span-10 lg:col-start-3 grid grid-cols-1 lg:grid-cols-2 gap-4 gap-y-16">
          {items.map((item) => (
            <ArticleBlock
              key={item.id}
              title={item.title}
              date={item.date}
              labels={item.labels}
              hasImage={item.images?.length > 0}
              hasAttachment={item.documents?.length > 0}
              href={buildOpenHref({
                page: String(page),
                categoryCode: params.categoryCode,
                labelCode: params.labelCode,
                open: item.slug,
              })}
            >
              <div dangerouslySetInnerHTML={{ __html: item.content }} />
            </ArticleBlock>
          ))}
        </div>

        {/* Pagination */}
        <div className="col-span-8 col-start-3">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            categoryCode={params.categoryCode}
            labelCode={params.labelCode}
          />
        </div>
      </Section>
    </main>
  );
};

export default NoticeboardPage;
