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
  className,
}: {
  url: string;
  id: number;
  name: string;
  className?: string;
}) => {
  return (
    <div className={`vertical-line py-1 space-grotesk ${className}`}>
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

  const columnStarts = [
    "col-span-12 md:col-start-1 md:col-span-2",
    "col-span-12 md:col-start-4 md:col-span-2",
    "col-span-12 md:col-start-7 md:col-span-2",
  ];

  return (
    <main className="min-h-screen">
      <Header imageUrl={"/img/headers/home.webp"} />
      <PageHeading>Školní časopis</PageHeading>

      <Section pt="20px">
        <div className="col-span-8 col-start-3">
          {years.length > 0 && (
            <SchoolYearSelect years={years} current={activeYear} />
          )}
        </div>
        <div className="col-span-8 col-start-3">
          {issues.length === 0 ? (
            <div className="rounded-md border p-4">
              Pro tento školní rok zatím nejsou dostupná čísla.
            </div>
          ) : (
            <div className="grid grid-cols-8 gap-4 gap-y-16 mt-10">
              {issues.map((issue, index) => (
                <SchoolMagazineBlock
                  key={issue.id}
                  id={issue.id}
                  name={issue.name}
                  url={issue.url}
                  className={columnStarts[index % 3]}
                />
              ))}
            </div>
          )}
        </div>
      </Section>
    </main>
  );
}
