import Header from "@/components/header";
import Section from "@/components/section";
import { Heading, PageHeading } from "@/components/text";
import Link from "next/link";

import {
  getContactsGrouped,
  type ContactsGroup,
  type ContactPerson,
  type SchoolInfo,
} from "@/lib/api/endpoints/contacts";

function ContactCard({ person }: { person: ContactPerson }) {
  return (
    <div className="w-full text-sm">
      {person.position ? (
        <>
          <div className="font-bold text-brand">{person.position}</div>
        </>
      ) : (
        <div className="font-bold text-brand">{person.name}</div>
      )}

      <div className="grid gap-1 mt-1 grid-cols-5">
        {person.position && <p className="">{person.name}</p>}
        {person.email && (
          <a className="text-black underline" href={`mailto:${person.email}`}>
            {person.email}
          </a>
        )}
        {person.phone && (
          <a
            className="text-black underline"
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
    <div className="rounded-md border p-4">
      <div className="text-lg font-bold">{info.name}</div>

      <dl className="mt-3 grid gap-2">
        {info.street && (
          <div className="grid grid-cols-[160px_1fr] gap-3">
            <dt className="font-semibold">Ulice</dt>
            <dd>{info.street}</dd>
          </div>
        )}
        {info.city && (
          <div className="grid grid-cols-[160px_1fr] gap-3">
            <dt className="font-semibold">Město</dt>
            <dd>{info.city}</dd>
          </div>
        )}
        {info.ico && (
          <div className="grid grid-cols-[160px_1fr] gap-3">
            <dt className="font-semibold">IČO</dt>
            <dd>{info.ico}</dd>
          </div>
        )}
        {info.dataBox && (
          <div className="grid grid-cols-[160px_1fr] gap-3">
            <dt className="font-semibold">Datová schránka</dt>
            <dd>{info.dataBox}</dd>
          </div>
        )}
      </dl>

      {(info.bankAccounts?.length ?? 0) > 0 && (
        <div className="mt-4">
          <div className="font-semibold mb-2">Bankovní účty</div>
          <ul className="list-disc pl-5">
            {info.bankAccounts!.map((acc) => (
              <li key={`${acc.label}-${acc.accountNumber}`}>
                <span className="font-semibold">{acc.label}:</span>{" "}
                {acc.accountNumber}
              </li>
            ))}
          </ul>
        </div>
      )}

      {info.cashDeskUrl && (
        <div className="mt-4">
          <Link
            className="text-brand underline font-semibold"
            href={info.cashDeskUrl}
          >
            Pokladna
          </Link>
        </div>
      )}
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

      <div className="grid gap-1 mt-1 grid-cols-5">
        {items.map((s) => (
          <p key={s}>{s}</p>
        ))}
      </div>
    </div>
  );
}

function ContactsGroupSection({ group }: { group: ContactsGroup }) {
  const { category } = group;

  return (
    <section>
      <Heading>{category.name}</Heading>

      {category.type === "contacts" && (
        <div className="flex flex-col gap-6 ">
          {(group.contacts ?? []).map((p) => (
            <ContactCard key={p.id} person={p} />
          ))}
        </div>
      )}

      {category.type === "info" && group.info && (
        <SchoolInfoBlock info={group.info} />
      )}

      {category.type === "generic" && (group.items?.length ?? 0) > 0 && (
        <GenericItems items={group.items!} heading={group.category.name} />
      )}

      {/* Defensive fallbacks */}
      {category.type === "contacts" &&
        (!group.contacts || group.contacts.length === 0) && (
          <div className="rounded-md border p-4">
            Žádné kontakty k zobrazení.
          </div>
        )}
      {category.type === "info" && !group.info && (
        <div className="rounded-md border p-4">
          Informace nejsou k dispozici.
        </div>
      )}
      {category.type === "generic" &&
        (!group.items || group.items.length === 0) && (
          <div className="rounded-md border p-4">
            Žádné položky k zobrazení.
          </div>
        )}
    </section>
  );
}

export default async function ContactsPage() {
  const groups = await getContactsGrouped();
  const genericItems = groups.filter((g) => g.category.type === "generic");

  const sorted = [...groups.filter((g) => g.category.type !== "generic")].sort(
    (a, b) => (a.category.order ?? 9999) - (b.category.order ?? 9999),
  );

  return (
    <main className="min-h-screen">
      <Header imageUrl={"/img/headers/home.webp"} />
      <PageHeading>Kontakty</PageHeading>

      <Section pt={"2em"}>
        <Heading>Užitečné odkazy</Heading>
        <div className="flex flex-col gap-6 mb-12">
          {genericItems.length > 0 ? (
            genericItems.map((g) => (
              <GenericItems
                key={g.category.id}
                items={g.items ?? []}
                heading={g.category.name}
              />
            ))
          ) : (
            <div className="rounded-md border p-4">
              Žádné položky k zobrazení.
            </div>
          )}
        </div>

        <div className="flex flex-col gap-10">
          {sorted.map((g) => (
            <ContactsGroupSection key={g.category.id} group={g} />
          ))}
        </div>
      </Section>
    </main>
  );
}
