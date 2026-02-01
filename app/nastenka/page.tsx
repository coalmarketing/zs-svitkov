import Header from "@/components/header";
import Section from "@/components/section";
import { PageHeading } from "@/components/text";
import ArticleBlock from "@/components/articleBlock";
import NewsFilters from "@/components/newsFilters";
import { DownloadButton } from "@/components/buttons";

import {
  getNews,
  getNewsCategoriesGrouped,
  getNewsDetail,
  type NewsItem,
} from "@/lib/api/endpoints/news";
import { sanitise } from "@/lib/api/html/sanitize";

import GalleryClient from "./galleryClient";

function buildOpenHref(params: {
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
          <div dangerouslySetInnerHTML={{ __html: sanitise(item.content) }} />

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
          {images.length > 0 && <GalleryClient images={images} />}
        </ArticleBlock>

        <div className="flex items-center justify-between px-10 pb-10">
          <a
            className="text-xs font-semibold underline-offset-4 bg-brand rounded-md px-2 py-1 text-white hover:bg-brand-dark transition-colors"
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

  return (
    <main className="min-h-screen">
      <Header imageUrl={"/img/headers/home.webp"} />
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
        {opened && <PinnedArticle item={opened} baseParams={params} />}

        {/* List */}
        <div className="mb-6 grid grid-cols-2 gap-4">
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
              <div
                dangerouslySetInnerHTML={{ __html: sanitise(item.content) }}
              />
            </ArticleBlock>
          ))}
        </div>
      </Section>
    </main>
  );
};

export default NoticeboardPage;
