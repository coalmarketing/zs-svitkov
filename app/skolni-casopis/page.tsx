import Header from "@/components/header";
import Section from "@/components/section";
import { PageHeading } from "@/components/text";
import SchoolYearSelect from "@/components/magazineYearSelect";

import {
  getSchoolMagazine,
  getSchoolMagazineYears,
} from "@/lib/api/endpoints/schoolMagazine";

const SchoolMagazineBlock = ({
  url,

  name,
}: {
  url: string;
  id: number;
  name: string;
}) => {
  return (
    <div className="border-l-[3px] border-black pl-4 py-1 space-grotesk">
      <p className="font-bold text-brand text-base mb-2">Školní časopis</p>
      <h3 className="font-bold text-3xl mb-2">{name}</h3>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-brand text-sm underline font-bold"
      >
        Stáhnout číslo
      </a>
    </div>
  );
};

export default async function SchoolMagazinePage({
  searchParams,
}: {
  searchParams: Promise<{ schoolYear?: string }>;
}) {
  const params = await searchParams;

  const years = await getSchoolMagazineYears();

  const requested = params.schoolYear;
  const activeYear =
    requested && years.includes(requested) ? requested : (years[0] ?? "");

  const issues = await getSchoolMagazine(activeYear);

  return (
    <main className="min-h-screen">
      <Header imageUrl={"/img/headers/home.webp"} />
      <PageHeading>Školní časopis</PageHeading>

      <Section pt="2em">
        {years.length > 0 && (
          <SchoolYearSelect years={years} current={activeYear} />
        )}

        {issues.length === 0 ? (
          <div className="rounded-md border p-4">
            Pro tento školní rok zatím nejsou dostupná čísla.
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-6 gap-y-14 mt-10">
            {issues.map((issue) => (
              <SchoolMagazineBlock
                key={issue.id}
                id={issue.id}
                name={issue.name}
                url={issue.url}
              />
            ))}
          </div>
        )}
      </Section>
    </main>
  );
}
