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
          <div className="space-y-10">
            {sorted.map((e, idx) => (
              <div key={e.id} className="grid grid-cols-[90px_24px_1fr] gap-4">
                {/* Year */}
                <div className="text-brand font-extrabold text-lg">
                  {e.year}
                </div>

                {/* Timeline spine */}
                <div className="relative flex justify-center">
                  <span className="absolute top-2 h-3 w-3 rounded-full border-2 border-black bg-white" />
                  {/* vertical line */}
                  {idx !== sorted.length - 1 && (
                    <span className="absolute top-5 bottom-[-40px] w-px bg-black/30" />
                  )}
                </div>

                {/* Content */}
                <div className="rounded-md border p-4">
                  <p className="text-base leading-relaxed">{e.text}</p>

                  {e.imageUrl && (
                    <div className="mt-4 overflow-hidden rounded-md border">
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
