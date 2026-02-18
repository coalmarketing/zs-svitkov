"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

export default function DirectorySelect({
  items,
  current,
}: {
  items: { code: string; title: string }[];
  current?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  function setDir(next?: string) {
    const nextSp = new URLSearchParams(sp.toString());
    if (next && next !== "") nextSp.set("dir", next);
    else nextSp.delete("dir");
    // optional: reset page param if you ever add paging
    const qs = nextSp.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  }

  return (
    <div className="col-span-4 mb-6 lg:w-1/3 relative">
      <label className="sr-only">Rozcestník</label>
      <select
        className="bg-brand hover:bg-brand-dark transition rounded-lg
             px-4 py-2.5 min-h-11 w-full
             appearance-none 
             space-grotesk font-semibold text-left"
        value={current ?? ""}
        onChange={(e) => setDir(e.target.value)}
      >
        <option value="">Vyberte podkategorii</option>
        {items.map((i) => (
          <option key={i.code} value={i.code}>
            {i.title}
          </option>
        ))}
      </select>
      <Image
        src={"/img/icons/Arrow_D.svg"}
        alt="Arrow"
        width={24}
        height={24}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/70"
      />
    </div>
  );
}
