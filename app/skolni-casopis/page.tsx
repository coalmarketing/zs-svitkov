import Header from "@/components/header";
import Section from "@/components/section";
import { PageHeading } from "@/components/text";
import { DownloadButton } from "@/components/buttons";
import SchoolYearSelect from "@/components/magazineYearSelect";

import {
  getSchoolMagazine,
  getSchoolMagazineYears,
} from "@/lib/api/endpoints/schoolMagazine";

export default async function SchoolMagazinePage({
  searchParams,
}: {
  searchParams: Promise<{ schoolYear?: string }>;
}) {
  const params = await searchParams;

  const years = await getSchoolMagazineYears();

  // Choose year:
  // - if URL specifies one and it exists, use it
  // - otherwise use the first year from API (usually newest if backend returns it that way)
  const requested = params.schoolYear;
  const activeYear =
    requested && years.includes(requested) ? requested : (years[0] ?? "");

  const issues = await getSchoolMagazine(activeYear);

  return (
    <main className="min-h-screen">
      <Header imageUrl={"/img/headers/home.webp"} />
      <PageHeading>Školní časopis</PageHeading>

      <Section>
        {years.length > 0 && (
          <SchoolYearSelect years={years} current={activeYear} />
        )}

        {issues.length === 0 ? (
          <div className="rounded-md border p-4">
            Pro tento školní rok zatím nejsou dostupná čísla.
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {issues.map((issue) => (
              <DownloadButton
                key={issue.id}
                fileUrl={issue.url}
                target="_blank"
              >
                {issue.name}
              </DownloadButton>
            ))}
          </div>
        )}
      </Section>
    </main>
  );
}
