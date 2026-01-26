import { notFound } from "next/navigation";
import Header from "@/components/header";
import Section from "@/components/section";
import { PageHeading } from "@/components/text";
import { DownloadButton } from "@/components/buttons";
import ImageGallery from "@/components/imageGallery";
import { getPage } from "@/lib/api/endpoints/pages";
import { UNIVERSAL_PAGES, slugToApiCode } from "@/lib/webGlobals";
// import { sanitize } from "@/lib/zss/html/sanitize"; // recommended

export async function generateStaticParams() {
  return UNIVERSAL_PAGES.map((p) => ({ code: p.code }));
}

export default async function UniversalPageRoute({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;

  const apiCode = slugToApiCode(code);
  if (!apiCode) notFound();

  const page = await getPage(apiCode);

  const galleryImages =
    page.images?.map((img, i) => ({
      url: img.url,
      alt: img.alt ?? `${page.title} – obrázek ${i + 1}`,
    })) ?? [];

  return (
    <main className="min-h-screen">
      <Header imageUrl={"/img/headers/home.webp"} />
      <PageHeading>{page.title}</PageHeading>

      <Section>
        {/* Optional gallery */}
        {galleryImages.length > 0 && (
          <div className="mb-8">
            <ImageGallery images={galleryImages} />
          </div>
        )}

        {/* Blocks */}
        <div className="flex flex-col gap-10">
          {(page.blocks ?? []).map((b, idx) => (
            <div key={`${b.heading}-${idx}`}>
              <h2 className="text-2xl font-bold mb-3">{b.heading}</h2>
              <div
                className="prose prose-sm prose-a:text-brand prose-a:underline"
                dangerouslySetInnerHTML={{
                  __html: b.content, // or sanitize(b.content)
                }}
              />
            </div>
          ))}
        </div>

        {/* Directory (like poradentvi sub-sections) */}
        {(page.directory?.length ?? 0) > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Rozcestník</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {page.directory.map((d) => (
                <a
                  key={d.code}
                  href={`/${code}#${d.code}`}
                  className="rounded-md border p-4 hover:bg-black/5"
                >
                  <div className="font-bold">{d.title}</div>
                </a>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-8">
              {page.directory.map((d) => (
                <div key={d.code} id={d.code}>
                  <h3 className="text-xl font-bold mb-2">{d.title}</h3>
                  <div
                    className="prose prose-sm prose-a:text-brand prose-a:underline"
                    dangerouslySetInnerHTML={{
                      __html: d.content, // or sanitize(d.content)
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Documents */}
        {(page.documents?.length ?? 0) > 0 && (
          <div className="mt-10 flex flex-col gap-3">
            {page.documents.map((doc) => (
              <DownloadButton key={doc.url} fileUrl={doc.url}>
                {doc.name}
              </DownloadButton>
            ))}
          </div>
        )}

        {/* Links */}
        {(page.links?.length ?? 0) > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Odkazy</h2>
            <ul className="list-disc pl-6">
              {page.links.map((l) => (
                <li key={l.url}>
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
