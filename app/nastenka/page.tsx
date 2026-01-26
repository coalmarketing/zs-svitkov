import ArticleBlock from "@/components/articleBlock";
import Header from "@/components/header";
import Section from "@/components/section";
import { PageHeading } from "@/components/text";
import NewsFilters from "@/components/newsFilters";
import { getNews, getNewsCategoriesGrouped } from "@/lib/api/endpoints/news";

export default async function NoticeboardPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    categoryCode?: string;
    labelCode?: string;
  }>;
}) {
  const params = await searchParams; // ✅ unwrap once
  const page = Number(params.page ?? "1");

  const [cats, news] = await Promise.all([
    getNewsCategoriesGrouped(),
    getNews({
      page,
      limit: 10,
      categoryCode: params.categoryCode,
      labelCode: params.labelCode,
    }),
  ]);

  console.clear();

  return (
    <main className="min-h-screen">
      <Header imageUrl={"/img/headers/home.webp"} />
      <PageHeading>Nástěnka</PageHeading>

      <Section>
        <NewsFilters
          categories={cats}
          currentCategoryCode={params.categoryCode}
          currentLabelCode={params.labelCode}
        />

        <div className="mb-6 grid grid-cols-2 gap-4">
          {news.items.map((item) => (
            <ArticleBlock
              key={item.id}
              title={item.name}
              href={`/${item.slug}`}
              date={item.date}
              hasImage={item.images && item.images.length > 0}
              hasAttachment={item.documents && item.documents.length > 0}
              labels={item.labels}
            >
              <div dangerouslySetInnerHTML={{ __html: item.content }} />
            </ArticleBlock>
          ))}
        </div>
      </Section>
    </main>
  );
}
