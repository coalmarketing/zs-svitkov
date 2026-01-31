import Header from "@/components/header";
import Section from "@/components/section";
import { PageHeading } from "@/components/text";
import Link from "next/link";

import {
  getContactsGrouped,
  type ContactsGroup,
  type ContactPerson,
  type SchoolInfo,
} from "@/lib/api/endpoints/contacts";

function ContactCard({ person }: { person: ContactPerson }) {
  return (
    <div className="rounded-md border p-4">
      <div className="font-bold">{person.name}</div>
      {person.position && (
        <div className="text-sm opacity-80">{person.position}</div>
      )}

      <div className="mt-3 flex flex-col gap-1 text-sm">
        {person.email && (
          <a className="text-brand underline" href={`mailto:${person.email}`}>
            {person.email}
          </a>
        )}
        {person.phone && (
          <a
            className="text-brand underline"
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

function GenericItems({ items }: { items: string[] }) {
  return (
    <ul className="list-disc pl-6">
      {items.map((s) => (
        <li key={s}>{s}</li>
      ))}
    </ul>
  );
}

function ContactsGroupSection({ group }: { group: ContactsGroup }) {
  const { category } = group;

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4 pl-3 border-l-2 border-black">
        {category.name}
      </h2>

      {category.type === "contacts" && (
        <div className="grid gap-4 md:grid-cols-2">
          {(group.contacts ?? []).map((p) => (
            <ContactCard key={p.id} person={p} />
          ))}
        </div>
      )}

      {category.type === "info" && group.info && (
        <SchoolInfoBlock info={group.info} />
      )}

      {category.type === "generic" && (group.items?.length ?? 0) > 0 && (
        <GenericItems items={group.items!} />
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

  const sorted = [...groups].sort(
    (a, b) => (a.category.order ?? 9999) - (b.category.order ?? 9999),
  );

  return (
    <main className="min-h-screen">
      <Header imageUrl={"/img/headers/home.webp"} />
      <PageHeading>Kontakty</PageHeading>

      <Section>
        <div className="flex flex-col gap-10">
          {sorted.map((g) => (
            <ContactsGroupSection key={g.category.id} group={g} />
          ))}
        </div>
      </Section>
    </main>
  );
}
