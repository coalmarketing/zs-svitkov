import ContactsAccordionSection from "@/app/kontakty/contactAccordion";
import Header from "@/components/layout/header";
import Section from "@/components/layout/section";
import { Heading, PageHeading } from "@/components/ui/text";

import {
  getContactsGrouped,
  type ContactsGroup,
  type ContactPerson,
  type SchoolInfo,
} from "@/lib/api/endpoints/contacts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Kontakt | ZŠ Svítkov Pardubice – adresa, telefon, informace pro rodiče",
  description:
    "Kontaktujte ZŠ Svítkov v Pardubicích. Zde najdete adresu školy, telefonní kontakty i důležité informace pro rodiče a veřejnost.",
  alternates: { canonical: "/kontakty" },
};

function ContactCard({ person }: { person: ContactPerson }) {
  const title = person.position?.trim() ? person.position : person.name;

  return (
    <div className="w-full text-sm">
      <div className="font-bold text-brand">{title}</div>

      {/* Mobile: stacked. LG+: 8-col grid like before */}
      <div className="mt-1 flex flex-col gap-1 lg:grid lg:grid-cols-8 lg:gap-4">
        {person.name?.trim() && <p className="lg:col-span-2">{person.name}</p>}

        {person.email && (
          <a
            className="text-black underline hover:text-brand transition lg:col-span-2"
            href={`mailto:${person.email}`}
          >
            {person.email}
          </a>
        )}

        {person.phone && (
          <a
            className="text-black underline hover:text-brand transition lg:col-span-2"
            href={`tel:${person.phone.replace(/\s+/g, "")}`}
          >
            {person.phone}
          </a>
        )}
      </div>
    </div>
  );
}

function SchoolInfoBlock({ info }: { info: SchoolInfo }) {
  return (
    <div className="text-sm grid grid-cols-2 gap-4">
      <div>
        <div className="">
          <h4 className="font-bold text-brand">Adresa</h4>
          <p className="">
            {info.name}
            <br />
            {info.street && (
              <>
                {info.street}
                <br />
                {info.city}
              </>
            )}
          </p>
        </div>
        {info.ico && (
          <div className="mt-8">
            <h4 className="font-bold text-brand">IČO</h4>
            <p className="">{info.ico}</p>
          </div>
        )}

        {info.cashDeskUrl && (
          <div className="mt-8">
            <h4 className="font-bold text-brand">Školní pokladna</h4>
            <a
              href={info.cashDeskUrl}
              className="text-black underline hover:text-brand transition"
              target="_blank"
            >
              Vstup do školní pokladny
            </a>
          </div>
        )}
      </div>
      <div>
        {info.dataBox && (
          <div className="">
            <h4 className="font-bold text-brand">Datová schránka</h4>
            <p className="">{info.dataBox}</p>
          </div>
        )}

        {(info.bankAccounts?.length ?? 0) > 0 && (
          <div className="mt-8">
            <h4 className="font-bold text-brand">Bankovní účty</h4>
            <ul className="">
              {info.bankAccounts!.map((acc) => (
                <li key={`${acc.label}-${acc.accountNumber}`}>
                  <span className="font-semibold">{acc.label}:</span>{" "}
                  {acc.accountNumber}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

function GenericItems({
  items,
  heading,
}: {
  items: string[];
  heading: string;
}) {
  return (
    <div className="text-sm">
      <div className="font-bold text-brand">{heading}</div>

      {/* Mobile: stacked. LG+: grid */}
      <div className="mt-1 flex flex-col gap-1 lg:grid lg:grid-cols-8 lg:gap-4">
        {items.map((s) => (
          <p key={s} className="lg:col-span-2">
            {s}
          </p>
        ))}
      </div>
    </div>
  );
}

function ContactsGroupBody({ group }: { group: ContactsGroup }) {
  const { category } = group;

  if (category.type === "contacts") {
    if (!group.contacts || group.contacts.length === 0) {
      return <div className="text-sm">Žádné kontakty k zobrazení.</div>;
    }
    return (
      <div className="flex flex-col gap-6">
        {group.contacts.map((p) => (
          <ContactCard key={p.id} person={p} />
        ))}
      </div>
    );
  }

  if (category.type === "info") {
    if (!group.info) {
      return <div className="text-sm">Informace nejsou k dispozici.</div>;
    }
    return <SchoolInfoBlock info={group.info} />;
  }

  if (category.type === "generic") {
    if (!group.items || group.items.length === 0) {
      return <div className="text-sm">Žádné položky k zobrazení.</div>;
    }
    return <GenericItems items={group.items} heading={group.category.name} />;
  }

  return null;
}

export default async function ContactsPage() {
  const groups = await getContactsGrouped();
  const genericItems = groups.filter((g) => g.category.type === "generic");

  const sorted = [...groups.filter((g) => g.category.type !== "generic")].sort(
    (a, b) => (a.category.order ?? 9999) - (b.category.order ?? 9999),
  );

  return (
    <main className="min-h-screen pb-20 max-w-screen overflow-x-hidden">
      <Header imageUrl={"/img/headers/kontakty.webp"} />
      <PageHeading>Kontakty</PageHeading>

      <Section pt={"2em"} pb={"10em"}>
        <div className="col-span-4 lg:col-span-8 lg:col-start-3 flex flex-col gap-10">
          {sorted.map((g) => (
            <ContactsAccordionSection
              key={g.category.name}
              group={g}
              open={g.category.name === "Důležité kontakty"}
            >
              <ContactsGroupBody group={g} />
            </ContactsAccordionSection>
          ))}
        </div>

        {genericItems.length > 0 && (
          <>
            <div className="mt-4 ml-4 md:ml-0 col-span-4 lg:col-span-8 lg:col-start-3">
              <Heading>Další kontakty</Heading>
            </div>

            <div className="col-span-4 lg:col-span-8 lg:col-start-3 flex flex-col gap-6 mb-12">
              {genericItems.map((g) => (
                <ContactsAccordionSection key={g.category.id} group={g}>
                  <ContactsGroupBody group={g} />
                </ContactsAccordionSection>
              ))}
            </div>
          </>
        )}
      </Section>
    </main>
  );
}
