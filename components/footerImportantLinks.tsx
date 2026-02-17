import Image from "next/image";
import { getImportantLinks } from "@/lib/api/endpoints/importantLinks";
import { getSchoolPartners } from "@/lib/api/endpoints/schoolPartners";

export default async function FooterImportantLinks() {
  const links = await getImportantLinks();
  if (!links?.length) return null;

  return (
    <div className="flex flex-wrap flex-row justify-between lg:grid lg:grid-cols-6 gap-4">
      {links.map(
        (l) =>
          l.logoUrl && (
            <a
              key={l.id}
              href={l.url}
              target="_blank"
              rel="noreferrer"
              title={l.name}
              className="opacity-80 transition hover:opacity-100"
            >
              <Image
                src={l.logoUrl}
                alt={l.name}
                width={160}
                height={80}
                className="h-14 w-20 object-contain object-left"
              />
            </a>
          ),
      )}
    </div>
  );
}

export async function FooterSchoolPartners() {
  const links = await getSchoolPartners();
  if (!links?.length) return null;

  return (
    <div className="flex flex-wrap flex-row justify-between lg:grid lg:grid-cols-6 gap-4">
      {links.map(
        (l) =>
          l.logoUrl && (
            <a
              key={l.id}
              href={l.url}
              target="_blank"
              rel="noreferrer"
              title={l.name}
              className="opacity-80 transition hover:opacity-100"
            >
              <Image
                src={l.logoUrl}
                alt={l.name}
                width={160}
                height={80}
                className="h-14 w-20 object-contain object-left"
              />
            </a>
          ),
      )}
    </div>
  );
}
