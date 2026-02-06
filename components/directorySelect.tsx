"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
    <div className="mb-6 w-1/3">
      <label className="sr-only">Rozcestník</label>
      <select
        className="bg-brand hover:bg-brand-dark transition rounded-lg px-4 py-2.5 space-grotesk font-semibold text-center w-full"
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
    </div>
  );
}
