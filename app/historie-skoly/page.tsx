import Header from "@/components/header";
import Section from "@/components/section";
import { PageHeading } from "@/components/text";
import Image from "next/image";
import { getSchoolHistory } from "@/lib/api/endpoints/history";

export default async function HistoryPage() {
  const events = await getSchoolHistory();

  const sorted = [...events].sort((a, b) => a.year - b.year);

  return (
    <main className="min-h-screen">
      <Header imageUrl={"/img/headers/home.webp"} />
      <PageHeading>Historie školy</PageHeading>

      <Section>
        {sorted.length === 0 ? (
          <div className="rounded-md border p-4">
            Historie zatím není k dispozici.
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            {sorted.map((e, idx) => (
              <div key={e.id} className="grid grid-cols-[24px_1fr] gap-4">
                {/* Timeline spine */}
                <div className="relative flex justify-center">
                  <span className="absolute top-2 h-4 w-4 rounded-full border-2 border-black bg-black" />
                  {/* vertical line */}
                  {idx !== sorted.length - 1 ? (
                    <span className="absolute top-5 -bottom-10 w-0.75 bg-black" />
                  ) : (
                    <>
                      <span className="absolute top-5 bottom-1/2 w-0.75 bg-black" />
                      <span className="absolute top-[52%] bottom-[46%] w-0.75 bg-black opacity-80" />
                      <span className="absolute top-[56%] bottom-[42%] w-0.75 bg-black opacity-60" />
                      <span className="absolute top-[60%] bottom-[38%] w-0.75 bg-black opacity-40" />
                      <span className="absolute top-[64%] bottom-[34%] w-0.75 bg-black opacity-20" />
                    </>
                  )}
                </div>

                {/* Content */}
                <div className="pb-20 px-10">
                  <div className="text-brand font-extrabold text-4xl">
                    {e.year}
                  </div>
                  <p className="text-base leading-relaxed">{e.text}</p>

                  {e.imageUrl && (
                    <div className="mt-4 overflow-hidden rounded-2xl border border-black/20">
                      <Image
                        src={e.imageUrl}
                        alt={`${e.year} – fotografie`}
                        width={1200}
                        height={700}
                        className="h-auto w-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>
    </main>
  );
}
